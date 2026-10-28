import { describe, expect, it } from 'vitest';
import { originalCookingItems, ownCookingItems } from '@/lib/cooking';
import { recipeById } from '@/data/recipes';
import type { CustomRecipe } from '@/lib/custom-data';

const recipe = (id: string) => { const r = recipeById[id]; if (!r) throw new Error(`Brak przepisu ${id}`); return r; };
const dorsz = recipe('wypieki-dorsz-pomidorowy');
const tacos = recipe('wypieki-fish-tacos');

describe('lista składników w trybie gotowania', () => {
  it('pokazuje wszystkie składniki i przelicza je z liczbą porcji', () => {
    const one = originalCookingItems(dorsz, 'me', false, 1);
    expect(one).toHaveLength(6);
    expect(one.find(i => i.name === 'Dorsz (filet)')!.amount).toBe('180 g');
    expect(originalCookingItems(dorsz, 'me', false, 2).find(i => i.name === 'Dorsz (filet)')!.amount).toBe('360 g');
  });

  it('zachowuje opis porcji przy składniku', () => {
    expect(originalCookingItems(tacos, 'me', false, 1).find(i => i.name.startsWith('Tortilla'))!.name).toContain('(2 małe)');
  });

  it('dla chłopaka używa jego gramatur i nie mnoży ich przez porcje', () => {
    const his = originalCookingItems(dorsz, 'him', false, 2);
    expect(his.find(i => i.name === 'Dorsz (filet)')!.amount).toBe('230 g');
    expect(his.find(i => i.name === 'Ryż biały (suchy)')!.amount).toBe('110 g');
  });

  it('razem dla 2 osób sumuje Twoją i jego porcję w jednej liście', () => {
    const both = originalCookingItems(dorsz, 'both', false, 1);
    expect(both).toHaveLength(6);
    expect(both.find(i => i.name === 'Dorsz (filet)')!.amount).toBe('410 g');
    expect(both.find(i => i.name === 'Ryż biały (suchy)')!.amount).toBe('170 g');
    expect(both.find(i => i.name === 'Passata pomidorowa')!.amount).toBe('550 g');
  });

  it('razem dla 2 osób skaluje tylko Twoją część', () => {
    const both = originalCookingItems(dorsz, 'both', false, 2);
    expect(both.find(i => i.name === 'Dorsz (filet)')!.amount).toBe('590 g');
    expect(both.find(i => i.name === 'Ryż biały (suchy)')!.amount).toBe('230 g');
  });

  it('własny przepis skaluje składniki na wybraną liczbę porcji i dokłada wersję dla chłopaka', () => {
    const r: CustomRecipe = {
      id: 'own-test', name: 'Twarożek', category: 'Śniadanie', type: 'sniadanie', minutes: 5, servings: 2,
      ingredients: [{ name: 'Twaróg', amount: 100, unit: 'g' }, { name: 'Rzodkiewka', amount: 3, unit: 'szt.' }],
      steps: ['Wymieszaj'], macros: { kcal: 200, p: 20, f: 5, c: 8 },
      partner: { note: 'Więcej twarogu', extra: [{ name: 'Twaróg', amount: 50, unit: 'g' }] },
    };
    expect(ownCookingItems(r, 'me', 4)).toEqual([
      { name: 'Twaróg', amount: '200 g' },
      { name: 'Rzodkiewka', amount: '6 szt.' },
    ]);
    expect(ownCookingItems(r, 'both', 2)).toEqual([
      { name: 'Twaróg', amount: '100 g' },
      { name: 'Rzodkiewka', amount: '3 szt.' },
      { name: 'Twaróg', amount: '50 g' },
    ]);
  });
});
