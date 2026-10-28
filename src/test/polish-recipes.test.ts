import { describe, it, expect } from 'vitest';
import { polishRecipes, polishCollection } from '@/data/recipes-polish';
import { ingredients } from '@/data/ingredients';
import { recipes, recipeById } from '@/data/recipes';
import { recipeEquipment } from '@/data/equipment';
import { computeMacros, recipeItems, searchRecipes } from '@/lib/meals';
import { blankWeek, copyOriginal, customShopping, parseImport, emptyData } from '@/lib/custom-data';

const quantities: [string, number[]][] = [
 ['schabowy',[170,30,25,10,7,220,180,70,5]],
 ['golabki',[220,180,45,60,220,5,50]],
 ['pulpety',[190,25,15,220,120,70,100,10,5]],
 ['poledwiczki',[190,200,60,70,220,150,7]],
 ['placek',[260,55,20,8,170,120,70,130,70]],
 ['de-volaille',[190,12,5,10,30,25,220,150,5]],
 ['pierogi',[90,45,140,130,70,7,80]],
 ['udka',[200,240,130,130,10]],
 ['ziemniaczana',[230,180,130,60,55,70,5]],
 ['bagietka',[100,160,90,60,30,40]],
 ['makaronowa',[65,180,180,60,90,5]],
 ['papryki',[250,190,45,180,45,50,5]],
 ['stripsy',[190,35,30,10,230,100,8,100]],
 ['kalafior',[280,130,70,55,90,150,5]],
 ['racuchy',[55,55,100,140,5,180,5]],
 ['gofry-twarogowe',[150,55,45,60,5,100,100,3]],
 ['serniczki',[180,55,30,120,100,5]],
 ['ryz-jablka',[55,150,160,180,2,5]],
 ['nalesniki',[55,55,130,150,70,120,5]],
 ['gofry-wytrawne',[55,55,100,90,35,120,5,3]],
];
function requireRecipe(id: string) { const r = recipeById[`polskie-${id}`]; if (!r) throw new Error(id); return r; }
describe('Polish collection', () => {
 it('adds exactly 20 unique indexed recipes, preserving existing IDs', () => {
  expect(polishRecipes).toHaveLength(20);
  expect(new Set(recipes.map(r=>r.id)).size).toBe(recipes.length);
  for (const r of polishRecipes) expect(recipeById[r.id]).toBe(r);
  expect(polishRecipes.filter(r=>r.type==='sniadanie')).toHaveLength(5);
  expect(polishRecipes.filter(r=>r.partner)).toHaveLength(15);
 });
 for (const [id, grams] of quantities) it(`preserves user raw quantities: ${id}`, () => {
  const r=requireRecipe(id); expect(r.ingredients.map(([,g])=>g)).toEqual(grams);
 });
 it('uses complete profiles including every oil and addition for both portions', () => {
  for(const r of polishRecipes) {
   expect(r.rawWeights).toBe(true); expect(r.collection).toBe(polishCollection);
   for(const items of [r.ingredients,...(r.partner?[recipeItems(r,true)]:[])]) {
    const actual=computeMacros(items); expect(actual.missing).toEqual([]);
    for(const key of ['kcal','p','f','c'] as const) {
     for(const [id] of items) expect(ingredients[id][key]).not.toBeNull();
     const sum=items.reduce((n,[id,g])=>n+(ingredients[id][key]??0)*g/100,0);
     expect(actual[key]).toBe(key==='kcal'?Math.round(sum):Math.round(sum*10)/10);
    }
   }
  }
 });
 it('applies meat +40–60 g, starch +50–100%, and larger vegetables without double counting', () => {
  const meat=['pl_schab','n_indyk','pl_poledwiczka','pl_lopatka','n_kurczak','pl_udko','n_szynka'];
  const starch=['n_ziemniak','n_ryz','makaron','pl_bagietka','pl_maka'];
  const veg=['n_ogorek','pl_kapusta','n_marchew','pl_groszek','n_pieczarki','n_cebula','n_papryka','n_brokul','pl_kalafior','n_pomidor','pl_burak','pl_burak_surowy'];
  for(const r of polishRecipes.filter(r=>r.type!=='sniadanie')) {
   const partner=r.partner?.ingredients; if(!partner) throw new Error(r.id);
   expect(recipeItems(r,true)).toBe(partner); expect(r.partner?.extra).toEqual([]);
   expect(partner).not.toEqual(r.ingredients);
   for(const [id,g] of r.ingredients) {
    const row=partner.find(([pid])=>pid===id); if(!row) throw new Error(id); const pg=row[1];
    if(meat.includes(id)) {expect(pg-g).toBeGreaterThanOrEqual(40);expect(pg-g).toBeLessThanOrEqual(60);}
    // Breading flour is not the main starch for meat dishes.
    if(starch.includes(id) && !(id==='pl_maka' && meat.some(m=>r.ingredients.some(([i])=>i===m)) && r.id!=='polskie-gofry-wytrawne')) {expect(pg/g).toBeGreaterThanOrEqual(1.5);expect(pg/g).toBeLessThanOrEqual(2);}
    if(veg.includes(id)) expect(pg).toBeGreaterThan(g);
   }
   expect(computeMacros(partner).kcal).toBeGreaterThan(computeMacros(r.ingredients).kcal);
  }
 });
 it('calculates a concrete schabowy sum including oil and mizeria', () => {
  // Independent sum using the declared table values and user quantities.
  expect(computeMacros(requireRecipe('schabowy').ingredients).kcal).toBe(Math.round(143*1.7+143*.3+351*.25+364*.1+884*.07+77*2.2+15*1.8+73*.7+43*.05));
 });
 it('searches collection and accents, and filters all new favorites', () => {
  expect(searchRecipes('Polskie klasyki i zapiekanki')).toHaveLength(20);
  expect(searchRecipes('golabki')).toContain(requireRecipe('golabki'));
  for(const r of polishRecipes) expect(searchRecipes('',{favs:[r.id]})).toEqual([r]);
 });
 it('filters old and new equipment without changing source recipes', () => {
  expect(searchRecipes('',{equipment:'oven'}).map(r=>r.id)).toContain('muffinki-jajeczne');
  expect(searchRecipes('',{equipment:'stovetop'}).map(r=>r.id)).toContain('jajecznica-serek');
  expect(searchRecipes('',{equipment:'waffle',collection:polishCollection})).toHaveLength(2);
  expect(searchRecipes('',{equipment:'grill',collection:polishCollection})).toEqual([requireRecipe('bagietka')]);
  const overnight=recipeById['owsianka-nocna'];if(!overnight)throw new Error('overnight');expect(recipeEquipment(overnight)).toEqual([]);
 });
 it('keeps old local JSON valid and preserves explicit equipment through export/import', () => {
  const copy=copyOriginal('polskie-gofry-wytrawne');if(!copy)throw new Error('copy');
  const d={...emptyData,recipes:[copy]};expect(parseImport(JSON.stringify(d))).toEqual(d);
  expect(copy.equipment).toEqual(['waffle']);expect(copy.partner?.macros?.kcal).toBe(computeMacros(recipeItems(requireRecipe('gofry-wytrawne'),true)).kcal);
  expect(parseImport(JSON.stringify(emptyData))).toEqual(emptyData);
 });
 it('adds new recipes to weeks and aggregates identical ingredients across collections', () => {
  const w=blankWeek('Klasyki');const day=w.days[0];if(!day)throw new Error('day');
  day.obiad='polskie-schabowy';day.kolacja='nowe-kurczak-toskanski';
  const rows=customShopping(w,[]);expect(rows.find(r=>r.name==='Ziemniaki')?.amount).toBe(220);
  expect(rows.find(r=>r.name==='Oliwa z oliwek')?.amount).toBe(5);
  day.kolacja='polskie-pulpety';expect(customShopping(w,[]).find(r=>r.name==='Ziemniaki')?.amount).toBe(440);
  expect(parseImport(JSON.stringify({...emptyData,weeks:[w]})).weeks[0]?.days[0]?.obiad).toBe('polskie-schabowy');
 });
});