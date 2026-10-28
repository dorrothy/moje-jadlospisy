import { describe, it, expect } from 'vitest';
import { extraRecipes } from '@/data/recipes-extra';
import { bakingRecipes } from '@/data/recipes-baking';
import { recipes, recipeById, weeks } from '@/data/recipes';
import { computeMacros, portionMacros, recipeItems, searchRecipes } from '@/lib/meals';
import { recipeViews, slotPool } from '@/lib/recipe-tools';
import { originalAssignments } from './original-weeks-fixture';

describe('rozszerzenie: śniadania na słono, bowle, loaded fries, zapiekanki, sosy', () => {
  it('dodaje 47 przepisów bez duplikatów ID i bez utraty partii wypieków', () => {
    expect(extraRecipes).toHaveLength(47);
    expect(bakingRecipes).toHaveLength(28);
    expect(new Set(recipes.map(r => r.id)).size).toBe(recipes.length);
    for (const r of [...extraRecipes, ...bakingRecipes]) expect(recipeById[r.id]).toBe(r);
  });
  it('kolekcje mają oczekiwane liczności', () => {
    for (const [c, n] of [['Śniadania na słono', 10], ['Bowle', 5], ['Loaded fries', 4], ['Zapiekanki', 7], ['Sosy i dodatki', 6]] as const)
      expect(searchRecipes('', { collection: c })).toHaveLength(n);
  });
  it('każdy przepis ma pełne makro z tabeli, kroki i sprzęt', () => {
    for (const r of extraRecipes) {
      const m = computeMacros(r.ingredients);
      expect(m.missing, r.id).toEqual([]);
      expect(r.steps.length).toBeGreaterThanOrEqual(4);
      expect(r.equipment?.length).toBeGreaterThan(0);
    }
  });
  it('porcja chłopaka liczona z większych gramatur', () => {
    for (const r of extraRecipes.filter(r => r.partner))
      expect(computeMacros(recipeItems(r, true, false)).kcal).toBeGreaterThan(computeMacros(r.ingredients).kcal);
  });
  it('zapiekanka 4-porcjowa: 1 porcja to ćwierć blachy', () => {
    const r = recipeById['ext-zapiekanka-ryzowa']!;
    expect(r.yield?.count).toBe(4);
    expect(portionMacros(r, 4).kcal).toBeCloseTo(computeMacros(r.ingredients).kcal * 4, 5);
  });
  it('wyszukiwanie po tagu i bez polskich znaków', () => {
    expect(searchRecipes('lunchboxa').some(r => r.id === 'ext-burrito-bowl')).toBe(true);
    expect(searchRecipes('sniadanie burrito').length + searchRecipes('burrito sniadaniowe').length).toBeGreaterThan(0);
  });
  it('sosy nie trafiają do planera, nowe dania tak', () => {
    const views = recipeViews([]);
    const pools = (['sniadanie', 'obiad', 'deser', 'kolacja'] as const).flatMap(t => slotPool(views, t).map(v => v.id));
    expect(pools.some(id => id.startsWith('ext-sos') || id === 'ext-tzatziki')).toBe(false);
    expect(pools).toContain('ext-kebab-bowl');
    expect(pools).toContain('ext-jajka-po-turecku');
  });
  it('oryginalne tygodnie bez zmian', () => {
    expect(weeks.filter(w => w.n <= 4).flatMap(w => w.days.map(d => [d.sniadanie, d.obiad, d.deser, d.kolacja]))).toEqual(originalAssignments);
  });
});
