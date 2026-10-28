import { describe, it, expect } from 'vitest';
import { bakingRecipes } from '@/data/recipes-baking';
import { recipes, recipeById, weeks } from '@/data/recipes';
import { ingredients } from '@/data/ingredients';
import { computeMacros, portionMacros, recipeItems, searchRecipes, shoppingList } from '@/lib/meals';
import { recipeViews, slotPool } from '@/lib/recipe-tools';
import { blankWeek, customShopping, copyOriginal } from '@/lib/custom-data';
import { originalAssignments } from './original-weeks-fixture';

const byId = (id: string) => { const r = recipeById[`wypieki-${id}`]; if (!r) throw new Error(`missing ${id}`); return r; };

describe('28 nowych przepisów: ryby, owsianki, shake'i, ciasteczka, pieczywo', () => {
  it('ma 28 unikalnych przepisów w 5 kolekcjach', () => {
    expect(bakingRecipes).toHaveLength(28);
    expect(new Set(recipes.map(r => r.id)).size).toBe(recipes.length);
    for (const [name, count] of [['Ryby', 6], ['Owsianki', 7], ["Shake'i", 6], ['Ciasteczka', 5], ['Pieczywo', 4]] as const)
      expect(searchRecipes('', { collection: name })).toHaveLength(count);
    for (const r of bakingRecipes) expect(recipeById[r.id]).toBe(r);
  });
  it('każdy przepis ma kompletne makro z tabeli, kroki i sprzęt', () => {
    for (const r of bakingRecipes) {
      expect(r.steps.length).toBeGreaterThanOrEqual(4);
      expect(r.equipment?.length).toBeGreaterThan(0);
      for (const items of [r.ingredients, ...(r.partner ? [recipeItems(r, true)] : []), ...(r.proteinVariant ? [recipeItems(r, false, true)] : [])]) {
        const m = computeMacros(items);
        expect(m.missing).toEqual([]);
        expect(m.kcal).toBeGreaterThan(0);
      }
    }
  });
  it('ryby i pieczywo zawierają wskazówki przechowywania w krokach', () => {
    for (const r of bakingRecipes.filter(r => r.collection === 'Ryby' || r.collection === 'Pieczywo'))
      expect(r.steps.join(' ')).toMatch(/[Pp]rzechow/);
  });
  it('ciasteczka: partia 10–16 sztuk, makro partii = makro sztuki × liczba sztuk', () => {
    for (const r of bakingRecipes.filter(r => r.collection === 'Ciasteczka')) {
      expect(r.yield?.unit).toBe('szt.');
      expect(r.yield!.count).toBeGreaterThanOrEqual(10);
      expect(r.yield!.count).toBeLessThanOrEqual(16);
      const piece = computeMacros(r.ingredients);
      const batch = portionMacros(r, r.yield!.count);
      for (const key of ['kcal', 'p', 'f', 'c'] as const) {
        const sum = r.ingredients.reduce((n, [id, g]) => n + (ingredients[id][key] ?? 0) * g / 100, 0) * r.yield!.count;
        expect(batch[key]).toBe(key === 'kcal' ? Math.round(sum) : Math.round(sum * 10) / 10);
        expect(batch[key]).toBeGreaterThanOrEqual(piece[key]);
      }
    }
  });
  it('pieczywo: 12–16 kromek/kawałków z wagą po wypieku i spójnym makro na 100 g', () => {
    for (const r of bakingRecipes.filter(r => r.collection === 'Pieczywo')) {
      expect(r.yield?.count).toBeGreaterThanOrEqual(12);
      expect(r.yield?.count).toBeLessThanOrEqual(16);
      expect(r.yield?.bakedGrams).toBeGreaterThan(0);
      const batch = portionMacros(r, r.yield!.count);
      const per100 = batch.kcal / r.yield!.bakedGrams! * 100;
      expect(per100).toBeGreaterThan(150);
      expect(per100).toBeLessThan(400);
      // kromka nigdy nie jest równa całemu bochenkowi
      expect(computeMacros(r.ingredients).kcal).toBeLessThan(batch.kcal / 2);
    }
  });
  it('zakupy skalują się ze sztukami: 2 kromki ≠ cały bochenek, 3 ciastka = 3× sztuka', () => {
    const chleb = byId('chleb-orkiszowy');
    const w = blankWeek('Pieczywo'); const d = w.days[0]!; d.sniadanie = chleb.id;
    const one = customShopping(w, []).find(r => r.name === 'Mąka orkiszowa')!.amount;
    expect(one).toBe(29); // 1 kromka, nie całe 400 g bochenka
    d.portions = undefined; w.portions = [{ sniadanie: 2 }];
    expect(customShopping(w, []).find(r => r.name === 'Mąka orkiszowa')!.amount).toBe(58);
    const ciastka = byId('ciastka-owsiane');
    const w2 = blankWeek('Ciastka'); w2.days[0]!.deser = ciastka.id; w2.portions = [{ deser: 3 }];
    expect(customShopping(w2, []).find(r => r.name === 'Płatki owsiane')!.amount).toBeCloseTo(22.5);
    expect(customShopping(w2, []).find(r => r.name === 'Płatki owsiane')!.amount).toBe(7.5 * 3);
  });
  it('gotowe tygodnie 1–6 pozostają nietknięte, a lista zakupów tygodnia bez zmian', () => {
    expect(weeks).toHaveLength(6);
    expect(weeks.filter(w => w.n <= 4).flatMap(w => w.days.map(d => [d.sniadanie, d.obiad, d.deser, d.kolacja]))).toEqual(originalAssignments);
    expect(shoppingList(1, 1).find(r => r.id === 'jajko')!.grams).toBeGreaterThan(0);
  });
  it('integracja: wyszukiwarka, generator, planer, kopia jako własny', () => {
    const views = recipeViews([]);
    for (const r of bakingRecipes) {
      expect(searchRecipes(r.name)).toContain(r);
      expect(searchRecipes('', { favs: [r.id] })).toEqual([r]);
      expect(slotPool(views, r.type).some(v => v.id === r.id)).toBe(true);
    }
    const copy = copyOriginal('wypieki-focaccia');
    expect(copy?.ingredients.find(i => i.name === 'Mąka pszenna')?.amount).toBe(33.5);
  });
  it('shake'i mają wariant z odżywką i makro wyższe o białko odżywki', () => {
    for (const r of bakingRecipes.filter(r => r.collection === "Shake'i")) {
      expect(r.proteinVariant?.extra).toEqual([['bialko_serwatkowe', 15]]);
      const base = computeMacros(r.ingredients);
      const boosted = computeMacros(recipeItems(r, false, true));
      expect(boosted.p - base.p).toBeCloseTo(12);
      expect(boosted.kcal - base.kcal).toBe(57);
    }
  });
});
