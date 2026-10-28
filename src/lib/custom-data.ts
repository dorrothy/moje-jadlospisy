import { z } from 'zod';
import { recipes, mealSlots, type MealType } from '@/data/recipes';
import { ingredients } from '@/data/ingredients';
import { computeMacros, normalize, recipeItems, ingredientUnit } from '@/lib/meals';
import { recipeEquipment } from '@/data/equipment';

export const macroSchema = z.object({ kcal: z.number().finite().nonnegative(), p: z.number().finite().nonnegative(), f: z.number().finite().nonnegative(), c: z.number().finite().nonnegative() });
export const ingredientSchema = z.object({ name: z.string().trim().min(1), amount: z.number().finite().positive(), unit: z.enum(['g', 'kg', 'ml', 'l', 'szt.', 'łyżka', 'łyżeczka']) });
export const customRecipeSchema = z.object({ id: z.string().startsWith('own-'), name: z.string().trim().min(1), category: z.string().trim().min(1), collection: z.string().optional(), equipment: z.array(z.enum(['air-fryer','oven','grill','waffle','stovetop','no-cook','blender'])).optional(), type: z.enum(['sniadanie','obiad','deser','kolacja']), minutes: z.number().finite().int().positive(), servings: z.number().finite().int().positive(), ingredients: z.array(ingredientSchema).min(1), steps: z.array(z.string().trim().min(1)).min(1), macros: macroSchema, partner: z.object({ note: z.string().trim().min(1), extra: z.array(ingredientSchema), macros: macroSchema.optional() }).optional() });
const daySchema = z.object({ sniadanie: z.string().nullable(), obiad: z.string().nullable(), deser: z.string().nullable(), kolacja: z.string().nullable() });
export const WEEK_COLORS = ['week-1','week-2','week-3','week-4','week-5','week-6'] as const;
export type WeekColor = (typeof WEEK_COLORS)[number];
export const WEEK_EMOJIS = ['🍳','🥗','🍲','🍝','🍜','🍱','🥑','🍎','🍰','🥘','🧇','🍣'] as const;
export const WEEK_COLOR_LABELS: Record<WeekColor,string> = {'week-1':'kremowy','week-2':'zielony','week-3':'brzoskwiniowy','week-4':'błękitny','week-5':'lawendowy','week-6':'morski'};
const WEEK_BG: Record<WeekColor,string> = {'week-1':'bg-week-1','week-2':'bg-week-2','week-3':'bg-week-3','week-4':'bg-week-4','week-5':'bg-week-5','week-6':'bg-week-6'};
export const customWeekSchema = z.object({ id: z.string().startsWith('week-'), name: z.string().trim().min(1), days: z.array(daySchema).length(7), emoji: z.string().trim().min(1).max(8).optional(), color: z.enum(WEEK_COLORS).optional() });
export function weekBgClass(w:{color?:WeekColor,id:string}):string{ return WEEK_BG[w.color ?? WEEK_COLORS[[...w.id].reduce((a,c)=>a+c.charCodeAt(0),0)%WEEK_COLORS.length]]; }
export function weekEmoji(w:{emoji?:string}):string{ return w.emoji ?? '🍽️'; }
export const reviewSchema = z.object({ rating:z.number().int().min(1).max(5).optional(), note:z.string(), cooked:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v=>{const d=new Date(v);return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v;}).or(z.literal('')) });
export const pantrySchema = z.object({name:z.string().trim().min(1),amount:z.number().finite().positive().optional(),unit:ingredientSchema.shape.unit});
export const extraShopSchema = ingredientSchema.extend({checked:z.boolean().optional()});
export const heroSchema = z.object({ eyebrow:z.string().trim().min(1).max(80), title:z.string().trim().min(1).max(60), subtitle:z.string().trim().min(1).max(120) }).partial();
export const dataSchema = z.object({ version: z.literal(1), recipes: z.array(customRecipeSchema), weeks: z.array(customWeekSchema), reviews:z.record(reviewSchema).optional(), pantry:z.array(pantrySchema).optional(), extraShopping:z.array(extraShopSchema).optional(), hero:heroSchema.optional() }).superRefine((data, ctx) => {
  for (const key of ['recipes', 'weeks'] as const) if (new Set(data[key].map(x => x.id)).size !== data[key].length) ctx.addIssue({code:'custom', message:'Powtarzające się identyfikatory'});
  const ids = new Set([...recipes.map(r => r.id), ...data.recipes.map(r => r.id)]);
  for (const w of data.weeks) for (const d of w.days) for (const id of Object.values(d)) if (id && !ids.has(id)) ctx.addIssue({ code:'custom', message:'Tydzień wskazuje nieistniejący przepis' });
});
export type CustomIngredient = z.infer<typeof ingredientSchema>;
export type CustomRecipe = z.infer<typeof customRecipeSchema>;
export type CustomWeek = z.infer<typeof customWeekSchema>;
export type LocalData = z.infer<typeof dataSchema>;
export const emptyData: LocalData = { version: 1, recipes: [], weeks: [] };
export const newId = (kind: 'own' | 'week') => `${kind}-${crypto.randomUUID()}`;
export function blankWeek(name: string): CustomWeek { return { id:newId('week'), name, days:Array.from({length:7}, () => ({sniadanie:null,obiad:null,deser:null,kolacja:null})) }; }
export function deleteRecipe(data: LocalData, id: string): LocalData { const reviews={...data.reviews};delete reviews[id];return {...data,...(data.reviews?{reviews}:{}), recipes:data.recipes.filter(r => r.id !== id), weeks:data.weeks.map(w => ({...w,days:w.days.map(d => Object.fromEntries(Object.entries(d).map(([slot,rid]) => [slot, rid === id ? null : rid])) as CustomWeek['days'][number])}))}; }
export function parseImport(text: string): LocalData { return dataSchema.parse(JSON.parse(text)); }
export function mergeImport(current: LocalData, incoming: LocalData, recipeRemap?: Map<string,string>): LocalData {
  // Import is additive: remap colliding IDs, including every week assignment.
  const ids = new Set(current.recipes.map(r=>r.id)); const remap = new Map<string,string>();
  const added = incoming.recipes.map(r => { const id=ids.has(r.id)?newId('own'):r.id; ids.add(id); remap.set(r.id,id); return {...r,id}; });
  for(const [oldId,id] of remap)recipeRemap?.set(oldId,id);
  const weekIds = new Set(current.weeks.map(w=>w.id));
  const reviews={...current.reviews};for(const [rid,review] of Object.entries(incoming.reviews??{})){const id=remap.get(rid)??rid;const old=reviews[id];reviews[id]=old?{...old,note:old.note===review.note?old.note:[old.note,review.note&&`Import: ${review.note}`].filter(Boolean).join('\n'),cooked:old.cooked||review.cooked,...(!old.rating&&review.rating?{rating:review.rating}:{})}:review;}
  return {...current,...(current.reviews||incoming.reviews?{reviews}:{}),...(incoming.pantry?{pantry:[...(current.pantry??[]),...incoming.pantry]}:{}),...(incoming.extraShopping?{extraShopping:[...(current.extraShopping??[]),...incoming.extraShopping]}:{}), recipes:[...current.recipes,...added], weeks:[...current.weeks,...incoming.weeks.map(w=>{ const id=weekIds.has(w.id)?newId('week'):w.id; weekIds.add(id); return {...w,id,days:w.days.map(d=>Object.fromEntries(Object.entries(d).map(([s,r])=>[s,r ? remap.get(r) ?? r : null])) as CustomWeek['days'][number])}; })]};
}
export function matchesCustom(r: CustomRecipe, q: string) { const hay=normalize([r.name,r.category,r.collection ?? '',r.partner?.note ?? '',...r.ingredients.map(i=>i.name)].join(' ')); return normalize(q).split(/\s+/).every(t=>hay.includes(t)); }
export function copyOriginal(id: string, protein = false): CustomRecipe | undefined {
  const r=recipes.find(r=>r.id===id); if(!r) return;
  const convert = (items: typeof r.ingredients): CustomIngredient[] => items.map(([id,amount]) => ({name:ingredients[id].name,amount,unit:ingredientUnit(id)}));
  const selected=recipeItems(r,false,protein);
  const m=computeMacros(selected);
  const extra = r.partner?.ingredients ? r.partner.ingredients.map(([id,g]) => [id,g - (r.ingredients.find(([base])=>base===id)?.[1] ?? 0)] as typeof r.ingredients[number]).filter(([,g])=>g>0) : r.partner?.extra ?? [];
  const pm = r.partner ? computeMacros(recipeItems(r,true,protein)) : undefined;
  return { id:newId('own'),name:`${r.name}${protein ? " z kurczakiem" : ""} — kopia`,category:r.category,collection:r.collection,equipment:recipeEquipment(r),type:r.type,minutes:r.minutes,servings:1,ingredients:convert(selected),steps:[...r.steps,...(protein && r.proteinVariant ? [r.proteinVariant.note] : [])],macros:{kcal:m.kcal,p:m.p,f:m.f,c:m.c},partner:r.partner ? {note:r.partner.note,extra:convert(extra),macros:pm ? {kcal:pm.kcal,p:pm.p,f:pm.f,c:pm.c} : undefined} : undefined };
}
export type ShopItem = { id:string; name:string; amount:number; unit:string };
export function customShopping(w: CustomWeek, custom: CustomRecipe[], portions=1): ShopItem[] {
  const map=new Map<string,ShopItem>();
  for (const day of w.days) for (const slot of mealSlots) {
    const id=day[slot.type]; if(!id) continue;
    const own=custom.find(r=>r.id===id); const original=recipes.find(r=>r.id===id);
    const items: CustomIngredient[]=own ? own.ingredients : original?.ingredients.map(([iid,g])=>({name:ingredients[iid].name,amount:g,unit:ingredientUnit(iid)})) ?? [];
    for (const i of items) {
      const unit=i.unit==='kg'?'g':i.unit==='l'?'ml':i.unit;
      const amount=i.amount*(i.unit==='kg'||i.unit==='l'?1000:1)*portions/(own?.servings ?? 1);
      const key=`${normalize(i.name)}:${unit}`; const prev=map.get(key);
      map.set(key,{id:key,name:prev?.name ?? i.name,unit,amount:(prev?.amount ?? 0)+amount});
    }
  }
  return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name,'pl'));
}
