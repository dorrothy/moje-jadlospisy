import {describe,it,expect} from 'vitest';
import {newRecipes} from '@/data/recipes-new';
import {newNutrition} from '@/data/nutrition-new';
import {recipes,weeks,type Item} from '@/data/recipes';
import {ingredients} from '@/data/ingredients';
import {computeMacros,recipeItems,searchRecipes} from '@/lib/meals';
import {blankWeek,customShopping,copyOriginal} from '@/lib/custom-data';
import {expectedGrams} from './new-recipes-fixture';
import {originalAssignments} from './original-weeks-fixture';
function required<T>(x:T|undefined):T{if(x===undefined)throw new Error('Missing expected data');return x;}
describe('24 added recipes',()=>{
 it('has exactly 12 breakfasts and 12 dinners, all indexed with unique IDs',()=>{expect(newRecipes).toHaveLength(24);expect(newRecipes.filter(r=>r.type==='sniadanie')).toHaveLength(12);expect(newRecipes.filter(r=>r.type==='kolacja')).toHaveLength(12);expect(new Set(recipes.map(r=>r.id)).size).toBe(recipes.length);for(const r of newRecipes)expect(recipes).toContain(r);});
 for(const f of expectedGrams)it(`preserves exact user gram amounts: ${f.id}`,()=>{const r=required(newRecipes.find(r=>r.id===f.id));expect(r.ingredients.map(([,g])=>g)).toEqual(f.grams);});
 it('keeps the previous 4 weeks exactly unchanged',()=>{expect(weeks).toHaveLength(4);expect(weeks.flatMap(w=>w.days.map(d=>[d.sniadanie,d.obiad,d.deser,d.kolacja]))).toEqual(originalAssignments);});
 it('uses complete finite per-100g nutrition and no buckwheat',()=>{for(const r of newRecipes){for(const [id,g] of [...r.ingredients,...(r.partner?.ingredients??[])]){expect(g).toBeGreaterThan(0);expect(ingredients[id].name.toLowerCase()).not.toContain('grycz');for(const key of ['kcal','p','f','c'] as const){expect(ingredients[id][key]).not.toBeNull();expect(Number.isFinite(ingredients[id][key])).toBe(true);}}}});
 for(const r of newRecipes.filter(r=>r.type==='kolacja'))it(`applies separate partner gram rules: ${r.id}`,()=>{
  const partner=required(r.partner?.ingredients);expect(recipeItems(r,true)).toEqual(partner);expect(r.partner?.extra).toEqual([]);
  for(const [id,g] of r.ingredients){const pg=required(partner.find(([k])=>k===id))?.[1];if(['n_kurczak','n_indyk','n_losos','n_mielony_kurczak','n_wolowina'].includes(id))expect(pg-g).toBeGreaterThanOrEqual(40),expect(pg-g).toBeLessThanOrEqual(50);
   else if(id==='n_ryz')expect([110,115]).toContain(pg);else if(id==='n_ziemniak')expect([380,400]).toContain(pg);else if(id==='n_lasagne')expect(pg).toBe(110);else if(id==='n_gnocchi')expect(pg).toBe(280);else if(id==='n_tortilla')expect(pg).toBe(120);else{expect(pg).toBeGreaterThanOrEqual(g);expect(pg).toBeLessThanOrEqual(g*1.3);}}
 });
 it('calculates every macro from actual ingredients before rounding',()=>{for(const r of newRecipes)for(const items of [r.ingredients,...(r.partner?[recipeItems(r,true)]:[])]){const m=computeMacros(items);expect(m.missing).toEqual([]);for(const key of ['kcal','p','f','c'] as const){const sum=items.reduce((acc,[id,g])=>acc+(ingredients[id][key]??0)*g/100,0);expect(m[key]).toBe(key==='kcal'?Math.round(sum):Math.round(sum*10)/10);}}});
 it('computes concrete Tuscan portions without double counting',()=>{const r=required(newRecipes.find(r=>r.id==='nowe-kurczak-toskanski'));expect(computeMacros(r.ingredients)).toEqual({kcal:711,p:57.8,f:31.7,c:44.2,missing:[]});expect(computeMacros(recipeItems(r,true))).toEqual({kcal:998,p:73.6,f:33.4,c:94.9,missing:[]});});
 it('searches all added recipes and filters favorites',()=>{for(const r of newRecipes){expect(searchRecipes(r.name)).toContain(r);expect(searchRecipes('',{favs:[r.id]}).map(x=>x.id)).toEqual([r.id]);}});
 it('aggregates new and existing recipes in own week shopping',()=>{const w=blankWeek('Test');const d=required(w.days[0]);d.sniadanie='nowe-bajgiel-jajko';d.kolacja='nowe-kurczak-toskanski';const rows=customShopping(w,[]);expect(rows.find(r=>r.name==='Jajka')?.amount).toBe(55);expect(rows.find(r=>r.name==='Ryż biały (suchy)')?.amount).toBe(45);});
 it('copies full partner portion into editable extra ingredients and macros',()=>{const copy=required(copyOriginal('nowe-kurczak-toskanski'));expect(copy.partner?.extra.find(i=>i.name==='Ryż biały (suchy)')?.amount).toBe(65);expect(copy.partner?.extra.find(i=>i.name==='Pierś z kurczaka')?.amount).toBe(50);expect(copy.partner?.macros?.kcal).toBe(998);});
});
