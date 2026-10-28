import { ingredients, type IngredientId } from "@/data/ingredients";
import { recipes, weeks, recipeById, type Item, type MealType, type Recipe } from "@/data/recipes";

export type Macros = { kcal: number; p: number; f: number; c: number; missing: string[] };

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Sumuje makro z tabeli składników; składniki bez danych trafiają do `missing`. */
export function computeMacros(items: Item[]): Macros {
  const out: Macros = { kcal: 0, p: 0, f: 0, c: 0, missing: [] };
  for (const [id, g] of items) {
    const ing = ingredients[id];
    if (ing.kcal == null || ing.p == null || ing.f == null || ing.c == null) {
      if (!out.missing.includes(ing.name)) out.missing.push(ing.name);
      continue;
    }
    out.kcal += (ing.kcal * g) / 100;
    out.p += (ing.p * g) / 100;
    out.f += (ing.f * g) / 100;
    out.c += (ing.c * g) / 100;
  }
  return { kcal: Math.round(out.kcal), p: r1(out.p), f: r1(out.f), c: r1(out.c), missing: out.missing };
}

export function itemMacros([id, g]: Item) {
  const ing = ingredients[id];
  if (ing.kcal == null) return null;
  return { kcal: Math.round((ing.kcal * g) / 100), p: r1(((ing.p ?? 0) * g) / 100), f: r1(((ing.f ?? 0) * g) / 100), c: r1(((ing.c ?? 0) * g) / 100) };
}

/** Normalizacja do wyszukiwania bez polskich znaków. */
export function normalize(s: string) {
  return s.toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

export const typeLabel: Record<MealType, string> = {
  sniadanie: "Śniadanie",
  obiad: "Zupa / obiad",
  deser: "Deser",
  kolacja: "Kolacja",
};

export function weeksOfRecipe(id: string) {
  return weeks.filter((w) => w.days.some((d) => Object.values(d).includes(id))).map((w) => w.n);
}

export function searchRecipes(q: string, opts: { week?: number; type?: MealType; favs?: string[] } = {}) {
  const nq = normalize(q);
  return recipes.filter((r) => {
    if (opts.type && r.type !== opts.type) return false;
    if (opts.week && !weeksOfRecipe(r.id).includes(opts.week)) return false;
    if (opts.favs && !opts.favs.includes(r.id)) return false;
    if (!nq) return true;
    const hay = normalize([r.name, r.category, r.spices ?? "", ...r.ingredients.map(([id]) => ingredients[id].name)].join(" "));
    return nq.split(/\s+/).every((t) => hay.includes(t));
  });
}

export type ShoppingRow = { id: IngredientId; name: string; aisle: string; grams: number; recipes: Recipe[] };

/** Lista zakupów: suma gramatur z całego tygodnia × liczba porcji. */
export function shoppingList(weekN: number, servings: number): ShoppingRow[] {
  const week = weeks.find((w) => w.n === weekN);
  if (!week) return [];
  const map = new Map<IngredientId, ShoppingRow>();
  for (const day of week.days) {
    for (const rid of Object.values(day)) {
      const rec = recipeById[rid];
      for (const [id, g] of rec.ingredients) {
        const row = map.get(id) ?? { id, name: ingredients[id].name, aisle: ingredients[id].aisle, grams: 0, recipes: [] };
        row.grams += g * servings;
        if (!row.recipes.includes(rec)) row.recipes.push(rec);
        map.set(id, row);
      }
    }
  }
  return [...map.values()].sort((a, b) => a.aisle.localeCompare(b.aisle) || a.name.localeCompare(b.name));
}

export function formatGrams(g: number) {
  return g >= 1000 ? `${(g / 1000).toFixed(g % 1000 === 0 ? 0 : 2).replace(".", ",")} kg` : `${Math.round(g)} g`;
}
