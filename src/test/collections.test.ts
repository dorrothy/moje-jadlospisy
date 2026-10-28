import { describe,it,expect } from 'vitest';
import { collectionRecipes } from '@/data/recipes-collections';
import { recipes,recipeById } from '@/data/recipes';
import { ingredients } from '@/data/ingredients';
import { computeMacros,recipeItems,searchRecipes } from '@/lib/meals';
import { recipeViews,slotPool } from '@/lib/recipe-tools';
import { blankWeek,copyOriginal,customShopping,emptyData,parseImport } from '@/lib/custom-data';

const amounts = [
 [150,120,100,15,30,70,8,10,5,3], [130,60,150,150,100,30,25,6,10],
 [60,80,150,50,20,100], [80,100,60,100,100,40,70,10],
 [120,55,160,120,120,70,60,8,5], [160,120,80,100,70,20,25,12,8,5,10],
 [170,80,20,12,20], [180,35,25,50,5,10], [180,20,8,70,30],
 [170,50,22,10,5], [25,140,130,120,5], [170,35,15,8,2,150],
 [120,55,15,80,15,4,100], [140,100,55,15,8],
 [150,60,70,70,80,80,55,15,12,5], [180,55,20,70,12,15,100,80],
 [160,170,130,100,18,12,8,5,5], [200,55,15,30,12,150,6,5],
 [170,110,55,90,15,12,100,10], [65,170,100,20,60,150,20,5],
 [180,200,90,15,10,5,5], [70,160,40,70,20,50,5,80],
 [65,170,180,50,20,300,8,5], [250,200,100,20,8,10,130],
];
describe('Four additive collections',()=>{
 it('indexes 24 stable unique IDs with 6 salads, 8 desserts and 5 dishes per cuisine',()=>{
  expect(collectionRecipes).toHaveLength(24);
  expect(new Set(recipes.map(r=>r.id)).size).toBe(recipes.length);
  for(const [name,count] of [['Sałatki',6],['Deserki',8],['Azjatyckie',5],['Włoskie',5]] as const)
   expect(searchRecipes('',{collection:name})).toHaveLength(count);
  for(const r of collectionRecipes)expect(recipeById[r.id]).toBe(r);
 });
 collectionRecipes.forEach((r,index)=>it(`keeps exact user quantities for ${r.id}`,()=>{
  expect(r.ingredients.map(([,amount])=>amount)).toEqual(amounts[index]);
 }));
 it('calculates every macro from complete per-100 profiles for both actual portions',()=>{
  for(const r of collectionRecipes){
   expect(r.steps.length).toBeGreaterThanOrEqual(4);expect(r.steps.length).toBeLessThanOrEqual(6);
   expect(r.rawWeights).toBe(true);expect(r.equipment?.length).toBeGreaterThan(0);
   for(const items of [r.ingredients,...(r.partner?[recipeItems(r,true)]:[])]){
    const m=computeMacros(items);expect(m.missing).toEqual([]);
    for(const key of ['kcal','p','f','c'] as const){
     const sum=items.reduce((n,[id,g])=>n+(ingredients[id][key]??0)*g/100,0);
     expect(m[key]).toBe(key==='kcal'?Math.round(sum):Math.round(sum*10)/10);
    }
   }
   if(r.partner)expect(computeMacros(recipeItems(r,true)).c).toBeGreaterThan(computeMacros(r.ingredients).c);
  }
 });
 it('computes Caesar including 5g oil and all sauce ingredients',()=>{
  const r=collectionRecipes[0];if(!r)throw Error('Caesar');
  expect(computeMacros(r.ingredients).kcal).toBe(Math.round(120*1.5+17*1.2+18+402*.15+407*.3+63*.7+66*.08+29*.1+884*.05+149*.03));
 });
 it('keeps chicken variant independent and materializes 120g chicken in a transferable recipe',()=>{
  const r=recipeById['kolekcje-gnocchi-sorrentina'];if(!r)throw Error('gnocchi');
  expect(r.ingredients.some(([id])=>id==='n_kurczak')).toBe(false);
  expect(r.proteinVariant?.extra).toEqual([['n_kurczak',120]]);
  const variant=computeMacros(recipeItems(r,false,true));
  expect(variant.kcal-computeMacros(r.ingredients).kcal).toBe(144);
  const copy=copyOriginal(r.id,true);if(!copy)throw Error('copy');
  expect(copy.ingredients.find(i=>i.name==='Pierś z kurczaka')?.amount).toBe(120);
  expect(copy.macros.p).toBe(variant.p);
  expect(parseImport(JSON.stringify({...emptyData,recipes:[copy]})).recipes[0]).toEqual(copy);
  const w=blankWeek('Gnocchi');const day=w.days[0];if(!day)throw Error('day');day.kolacja=copy.id;
  expect(customShopping(w,[copy]).find(i=>i.name==='Pierś z kurczaka')?.amount).toBe(120);
 });
 it('exposes all recipes to favorites, generator and shopping with explicit liquid units',()=>{
  const views=recipeViews([]);
  for(const r of collectionRecipes){
   expect(searchRecipes('',{favs:[r.id]})).toEqual([r]);
   expect(slotPool(views,r.type).some(v=>v.id===r.id)).toBe(true);
   const w=blankWeek('Nowe');const day=w.days[0];if(!day)throw Error('day');day[r.type]=r.id;
   expect(customShopping(w,[])).toHaveLength(r.ingredients.length);
  }
  const w=blankWeek('Bulion');const day=w.days[0];if(!day)throw Error('day');day.kolacja='kolekcje-risotto';
  expect(customShopping(w,[]).find(i=>i.name==='Bulion warzywny (ml)')).toMatchObject({amount:300,unit:'ml'});
  expect(copyOriginal('kolekcje-grecka')?.equipment).toEqual(['no-cook']);
 });
});