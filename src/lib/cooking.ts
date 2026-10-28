import { ingredients } from '@/data/ingredients';
import type { Recipe } from '@/data/recipes';
import { formatItemAmount, recipeItems } from './meals';
import type { CustomRecipe } from './custom-data';

export type CookingItem = { name: string; amount: string };

/** Lista składników widoczna w trybie gotowania — te same gramatury co na stronie przepisu. */
export function originalCookingItems(recipe: Recipe, forHim: boolean, protein: boolean, servings: number): CookingItem[] {
  return recipeItems(recipe, forHim, protein).map(([id, grams, note]) => ({
    name: ingredients[id].name + (note ? ` (${note})` : ''),
    amount: formatItemAmount(id, grams * (forHim ? 1 : servings)),
  }));
}

/** Własny przepis: składniki przeliczone na wybraną liczbę porcji, z dodatkami wersji dla chłopaka. */
export function ownCookingItems(recipe: CustomRecipe, partner: boolean, portions: number): CookingItem[] {
  const scale = portions / recipe.servings;
  return [...recipe.ingredients, ...(partner ? recipe.partner?.extra ?? [] : [])].map(i => ({
    name: i.name,
    amount: `${Number((i.amount * scale).toFixed(2)).toLocaleString('pl')} ${i.unit}`,
  }));
}
