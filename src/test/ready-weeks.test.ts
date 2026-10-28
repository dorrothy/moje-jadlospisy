import { describe, it, expect } from 'vitest';
import { weeks, recipeById, mealSlots, type Week } from '@/data/recipes';
import { ingredients } from '@/data/ingredients';
import { portionItems, portionMacros, weekDayMacros, averageMacros, shoppingList, recipeItems, searchRecipes } from '@/lib/meals';
import { copyWeek, customShopping, dataForBackup, parseImport, mergeImport, emptyData } from '@/lib/custom-data';
import { originalAssignments } from './original-weeks-fixture';
function getWeek(n: number): Week { const w=weeks.find(w=>w.n===n); if(!w)throw new Error('Missing week');return w; }
describe('ready weeks 5 and 6',()=>{
  it('preserves all 112 original assignments and adds named weeks 5/6',()=>{
    expect(weeks.filter(w=>w.n<=4).flatMap(w=>w.days.map(d=>[d.sniadanie,d.obiad,d.deser,d.kolacja]))).toEqual(originalAssignments);
    expect(getWeek(5).title).toBe('Świeżo i kolorowo');expect(getWeek(6).title).toBe('Azja i Włochy');
  });
  it('has seven days of four existing meals at the four requested times',()=>{
    expect(mealSlots.map(s=>s.time)).toEqual(['10:00','13:00','16:00','18:00']);
    for(const n of [5,6]){const w=getWeek(n);expect(w.days).toHaveLength(7);for(const d of w.days){expect(Object.keys(d)).toHaveLength(4);for(const id of Object.values(d))expect(recipeById[id]).toBeDefined();}}
  });
  for(const n of [5,6])for(let index=0;index<7;index++){
    it(`week ${n} day ${index+1}: 1700–1800 kcal from actual scaled ingredient tables`,()=>{
      const w=getWeek(n);const m=weekDayMacros(w,index);expect(m.missing).toEqual([]);expect(m.kcal).toBeGreaterThanOrEqual(1700);expect(m.kcal).toBeLessThanOrEqual(1800);
      const d=w.days[index];if(!d)throw new Error('Missing day');
      for(const slot of mealSlots){const r=recipeById[d[slot.type]];if(!r)throw new Error('Missing recipe');const portion=w.portions?.[index]?.[slot.type]??1;const pm=portionMacros(r,portion);
        for(const key of ['kcal','p','f','c'] as const){const raw=portionItems(r,portion).reduce((sum,[id,g])=>sum+(ingredients[id][key]??0)*g/100,0);expect(pm[key]).toBe(key==='kcal'?Math.round(raw):Math.round(raw*10)/10);}
      }
    });
    it(`week ${n} day ${index+1}: 120–145 g protein excluding partner portions`,()=>{
      const m=weekDayMacros(getWeek(n),index);expect(m.p).toBeGreaterThanOrEqual(120);expect(m.p).toBeLessThanOrEqual(145);
    });
  }
  it('uses reasonable 0.75–1.5 portions, breakfasts/desserts and several salads with limited repetition',()=>{
    for(const n of [5,6]){const w=getWeek(n);const counts=new Map<string,number>();for(const [i,d] of w.days.entries()){
      expect(recipeById[d.sniadanie]?.type).toBe('sniadanie');expect(recipeById[d.deser]?.type).toBe('deser');
      for(const s of mealSlots){const p=w.portions?.[i]?.[s.type]??1;expect(p).toBeGreaterThanOrEqual(.75);expect(p).toBeLessThanOrEqual(1.5);const id=d[s.type];counts.set(id,(counts.get(id)??0)+1);}
    }expect(Math.max(...counts.values())).toBeLessThanOrEqual(2);}
    expect(getWeek(5).days.filter(d=>[d.obiad,d.kolacja].some(id=>recipeById[id]?.collection==='Sałatki')).length).toBeGreaterThanOrEqual(4);
  });
  it('computes concrete day values and weekly averages rather than a fixed target',()=>{
    expect(weekDayMacros(getWeek(5),0)).toEqual({kcal:1765,p:129,f:56.3,c:165.5,missing:[]});
    expect(averageMacros(getWeek(5).days.map((_,i)=>weekDayMacros(getWeek(5),i)))).toEqual({kcal:1760,p:131,f:61.8,c:154.2,missing:[]});
    expect(averageMacros(getWeek(6).days.map((_,i)=>weekDayMacros(getWeek(6),i)))).toEqual({kcal:1764,p:126.9,f:56.1,c:178.2,missing:[]});
  });
  it('preserves larger partner dinners independently of user portion multipliers',()=>{
    for(const n of [5,6])for(const d of getWeek(n).days){const r=recipeById[d.kolacja];if(!r)throw new Error('Missing dinner');expect(r.partner).toBeDefined();expect(recipeItems(r,true)).not.toEqual(r.ingredients);}
  });
  it('shopping uses actual per-meal portions and matches copied-week shopping',()=>{
    for(const n of [5,6]){const w=getWeek(n);const copied=copyWeek(w);const own=customShopping(copied,[]);for(const row of shoppingList(n,1))expect(own.find(i=>i.name===row.name)?.amount).toBeCloseTo(row.grams,8);
      for(const row of shoppingList(n,2))expect(row.grams).toBeCloseTo((shoppingList(n,1).find(i=>i.id===row.id)?.grams??0)*2,8);
    }
  });
  it('roundtrips portions in JSON and imports additively without changing current plans',()=>{
    const w=copyWeek(getWeek(5));const current={...emptyData,weeks:[w]};const backup=dataForBackup(current);const parsed=parseImport(JSON.stringify(backup));
    expect(parsed.weeks.find(w=>w.id==='week-original-5')?.portions).toEqual(getWeek(5).portions);
    expect(parsed.weeks.find(w=>w.id==='week-original-6')?.days).toEqual(getWeek(6).days);
    const merged=mergeImport(current,parsed);expect(merged.weeks[0]).toEqual(w);expect(merged.weeks.length).toBe(4);
  });
  it('finds meals by each new week and rejects invalid multipliers without breaking legacy backups',()=>{
    for(const n of [5,6])for(const d of getWeek(n).days)for(const id of Object.values(d))expect(searchRecipes('',{week:n}).map(r=>r.id)).toContain(id);
    const copy=copyWeek(getWeek(5));expect(()=>parseImport(JSON.stringify({...emptyData,weeks:[{...copy,portions:Array.from({length:7},()=>({obiad:0}))}]}))).toThrow();
    expect(parseImport(JSON.stringify(emptyData))).toEqual(emptyData);
  });
});