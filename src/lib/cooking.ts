import { ingredients } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';
import { combinedItems, formatItemAmount, recipeItems } from './meals';
import type { CustomRecipe } from './custom-data';

export type CookingItem = { name: string; amount: string };
export type CookFor = 'me' | 'him' | 'both';

export const COOK_FOR_LABELS: Record<CookFor, string> = {
  me: 'Dla mnie',
  him: 'Dla chłopaka',
  both: 'Razem dla 2',
};

/** Lista składników widoczna w trybie gotowania — te same gramatury co na stronie przepisu. */
export function originalCookingItems(recipe: Recipe, mode: CookFor, protein: boolean, servings: number): CookingItem[] {
  const items = mode === 'both' ? combinedItems(recipe, protein, servings) : recipeItems(recipe, mode === 'him', protein);
  const scale = mode === 'me' ? servings : 1;
  return items.map(([id, grams, note]) => ({
    name: ingredients[id].name + (note ? ` (${note})` : ''),
    amount: formatItemAmount(id, grams * scale),
  }));
}

/** Własny przepis: składniki przeliczone na wybraną liczbę porcji, z dodatkami wersji dla chłopaka. */
export function ownCookingItems(recipe: CustomRecipe, mode: CookFor, portions: number): CookingItem[] {
  const scale = portions / recipe.servings;
  return [...recipe.ingredients, ...(mode === 'me' ? [] : recipe.partner?.extra ?? [])].map(i => ({
    name: i.name,
    amount: `${Number((i.amount * scale).toFixed(2)).toLocaleString('pl')} ${i.unit}`,
  }));
}
