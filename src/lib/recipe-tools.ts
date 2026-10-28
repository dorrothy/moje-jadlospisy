import { ingredients } from '@/data/ingredients';
import { recipes, type MealType } from '@/data/recipes';
import { recipeEquipment, type Equipment } from '@/data/equipment';
import { computeMacros, normalize, ingredientUnit } from './meals';
import type { CustomRecipe, CustomIngredient, LocalData } from './custom-data';

export type RecipeView={id:string;name:string;type:MealType;category:string;minutes:number;equipment:Equipment[];items:CustomIngredient[];macros:{kcal:number;p:number;f:number;c:number};complete:boolean;spices:string};
export function recipeViews(custom:CustomRecipe[]):RecipeView[]{return [...recipes.map(r=>{const m=computeMacros(r.ingredients);return {id:r.id,name:r.name,type:r.type,category:r.category,minutes:r.minutes,equipment:recipeEquipment(r),items:r.ingredients.map(([id,amount])=>({name:ingredients[id].name,amount,unit:ingredientUnit(id)})),macros:m,complete:!m.missing.length,spices:r.spices??''};}),...custom.map(r=>({id:r.id,name:r.name,type:r.type,category:r.category,minutes:r.minutes,equipment:recipeEquipment(r),items:r.ingredients.map(i=>({...i,amount:i.amount/r.servings})),macros:r.macros,complete:true,spices:''}))];}
// Only explicitly equivalent names; do not equate dry/cooked, cream strengths or different cuts.
const aliases:Record<string,string>={ 'jajka':'jajko','jaja':'jajko','pomidory':'pomidor','pomidory swieze':'pomidor','ogorki':'ogorek','ogorek swiezy':'ogorek','ziemniaki':'ziemniak','kartofle':'ziemniak','kartofel':'ziemniak','piers z kurczaka':'piers kurczaka','filet z kurczaka':'piers kurczaka','oliwa z oliwek':'oliwa','olej rzepakowy':'olej rzepakowy','ryz bialy (suchy)':'ryz suchy','ryz bialy suchy':'ryz suchy','makaron pszenny (suchy)':'makaron suchy','pieczarki':'pieczarka','brokul':'brokuly','skyr naturalny':'skyr','maka':'maka pszenna','koperek swiezy':'koperek'};
export function ingredientKey(s:string){const n=normalize(s).replace(/\s+/g,' ');return aliases[n]??n;}
export function unitAmount(amount:number,unit:string){return {amount:amount*(unit==='kg'||unit==='l'?1000:1),unit:unit==='kg'?'g':unit==='l'?'ml':unit};}
export type Pantry=NonNullable<LocalData['pantry']>;
export function matchFridge(r:RecipeView,pantry:Pantry){
 const needed=new Map<string,CustomIngredient>();for(const i of r.items){const u=unitAmount(i.amount,i.unit);const k=`${ingredientKey(i.name)}:${u.unit}`;const old=needed.get(k);needed.set(k,{...i,unit:u.unit as CustomIngredient['unit'],amount:u.amount+(old?.amount??0)});}
 const rows=[...needed.values()].map(i=>{const same=pantry.filter(p=>ingredientKey(p.name)===ingredientKey(i.name));const available=same.filter(p=>p.amount!==undefined&&unitAmount(p.amount,p.unit).unit===i.unit).reduce((n,p)=>n+unitAmount(p.amount??0,p.unit).amount,0);const unknown=same.some(p=>p.amount===undefined||unitAmount(p.amount,p.unit).unit!==i.unit);const deficit=Math.max(0,i.amount-available);return {item:i,available,deficit,status:!deficit?'available':unknown?'unknown':'missing'};});
 const missing=rows.filter(x=>x.status==='missing');const unknown=rows.filter(x=>x.status==='unknown');return {recipe:r,rows,missing,unknown,available:rows.filter(x=>x.status==='available').length,ready:missing.length===0&&unknown.length===0};
}
export function fridgeRanking(all:RecipeView[],pantry:Pantry){return all.map(r=>matchFridge(r,pantry)).sort((a,b)=>(a.missing.length+a.unknown.length)-(b.missing.length+b.unknown.length)||b.available-a.available||a.recipe.name.localeCompare(b.recipe.name,'pl'));}
export type Goals={kcalMin:number;kcalMax:number;pMin:number;pMax:number;maxMinutes:number;equipment:Equipment[];mealPrep:boolean;onlyFavorites:boolean;excluded:string[]};
export const defaultGoals:Goals={kcalMin:1700,kcalMax:1800,pMin:120,pMax:145,maxMinutes:120,equipment:[],mealPrep:false,onlyFavorites:false,excluded:[]};
export function isSoup(r:RecipeView){return r.type==='obiad'&&/zup|krem|soup|ramen/.test(normalize(`${r.name} ${r.category}`));}
export function eligibleRecipes(all:RecipeView[],g:Goals,favs:string[]){return all.filter(r=>r.complete&&r.minutes<=g.maxMinutes&&(!g.onlyFavorites||favs.includes(r.id))&&(!g.equipment.length||r.equipment.every(e=>g.equipment.includes(e)))&&!g.excluded.some(ex=>[...r.items.map(i=>i.name),r.spices].some(n=>ingredientKey(n)===ingredientKey(ex)||normalize(n).includes(normalize(ex)))));}
export function slotPool(all:RecipeView[],type:MealType){return all.filter(r=>r.category!=='Sosy i dodatki'&&(type==='obiad'?isSoup(r):type==='kolacja'?r.type==='kolacja'||(r.type==='obiad'&&!isSoup(r)):r.type===type));}
export function totals(day:Record<MealType,string|null>,all:RecipeView[]){return Object.values(day).reduce((m,id)=>{const r=all.find(r=>r.id===id);return {kcal:m.kcal+(r?.macros.kcal??0),p:m.p+(r?.macros.p??0)};},{kcal:0,p:0});}
function distance(n:number,min:number,max:number){return n<min?min-n:n>max?n-max:0;}
export function generatePlan(all:RecipeView[],g:Goals,favs:string[],offset=0){
 if(![g.kcalMin,g.kcalMax,g.pMin,g.pMax,g.maxMinutes].every(n=>Number.isFinite(n)&&n>0)||g.kcalMin>g.kcalMax||g.pMin>g.pMax)throw new Error('Sprawdź zakresy celów i czas.');
 const types:MealType[]=['sniadanie','obiad','deser','kolacja'];const eligible=eligibleRecipes(all,g,favs);const pools=types.map(t=>slotPool(eligible,t));const missing=types.filter((_,i)=>!pools[i]?.length);if(missing.length)return {days:[],missing};
 const usage=new Map<string,number>();const days:Record<MealType,string|null>[]=[];
 for(let d=0;d<7;d++){
  // Beam search balances calorie/protein error with modest variety/preference penalties.
  let beam=[{ids:[] as string[],kcal:0,p:0,penalty:0}];
  pools.forEach((pool,index)=>{const candidates=beam.flatMap(b=>pool.map((r,k)=>({ids:[...b.ids,r.id],kcal:b.kcal+r.macros.kcal,p:b.p+r.macros.p,penalty:b.penalty+(usage.get(r.id)??0)*.015+(favs.includes(r.id)?-.008:0)+(g.mealPrep&&/meal prep|pudel|muffin/.test(normalize(`${r.category} ${r.name}`))?-.025:0)+((k+offset+d)%pool.length)*.00001})));const frac=(index+1)/4;candidates.sort((a,b)=>score(a,frac)-score(b,frac));beam=candidates.slice(0,100);});
  function score(b:{kcal:number;p:number;penalty:number},frac:number){return distance(b.kcal,g.kcalMin*frac,g.kcalMax*frac)/1750+distance(b.p,g.pMin*frac,g.pMax*frac)/130+b.penalty;}
  const best=beam[0];if(!best)break;const day={sniadanie:best.ids[0]??null,obiad:best.ids[1]??null,deser:best.ids[2]??null,kolacja:best.ids[3]??null};days.push(day);for(const id of best.ids)usage.set(id,(usage.get(id)??0)+1);
 }
 return {days,missing};
}