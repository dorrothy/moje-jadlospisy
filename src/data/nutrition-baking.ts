import type { Ingredient } from './ingredients';
// Na 100 g części jadalnej, surowe; W = węglowodany przyswajalne bez błonnika.
// Referencja: USDA FoodData Central https://fdc.nal.usda.gov/ (generic foods)
// i typowe europejskie etykiety mąk. Oddzielne klucze nie zmieniają makro starej bazy.
export const bakingNutrition = {
  b_dorsz: { name: 'Dorsz (filet)', aisle: 'Mięso i ryby', kcal: 82, p: 18, f: 0.7, c: 0 },
  b_wisnie: { name: 'Wiśnie (świeże/mrożone, bez pestek)', aisle: 'Warzywa i owoce', kcal: 50, p: 1, f: 0.3, c: 12.2 },
  b_jagody: { name: 'Jagody (świeże/mrożone)', aisle: 'Warzywa i owoce', kcal: 57, p: 0.7, f: 0.3, c: 14.5 },
  b_maka_orkiszowa: { name: 'Mąka orkiszowa', aisle: 'Suche i puszki', kcal: 340, p: 13, f: 2, c: 66 },
  b_ziarna: { name: 'Mieszanka ziaren (słonecznik, len, dynia)', aisle: 'Suche i puszki', kcal: 560, p: 20, f: 45, c: 10 },
  b_drozdze: { name: 'Drożdże świeże', aisle: 'Suche i puszki', kcal: 105, p: 12, f: 2, c: 12 },
} satisfies Record<string, Ingredient>;
