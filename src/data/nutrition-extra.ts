import type { Ingredient } from './ingredients';
// Na 100 g produktu (surowe/suche, jak w opisie). Typowe wartości z USDA FoodData Central
// i polskich etykiet; W = węglowodany przyswajalne. Oddzielne klucze nie zmieniają starej bazy.
export const extraNutrition = {
  x_kimchi: { name: 'Kimchi', aisle: 'Sosy i dodatki', kcal: 23, p: 1.1, f: 0.5, c: 2.4 },
  x_tortellini: { name: 'Tortellini z serem (świeże, chłodzone)', aisle: 'Suche i puszki', kcal: 280, p: 11, f: 8, c: 40 },
  x_kuskus: { name: 'Kuskus (suchy)', aisle: 'Suche i puszki', kcal: 360, p: 12.8, f: 0.6, c: 72 },
  x_papier: { name: 'Papier ryżowy', aisle: 'Suche i puszki', kcal: 330, p: 6, f: 0.5, c: 80 },
  x_miso: { name: 'Pasta miso', aisle: 'Sosy i dodatki', kcal: 200, p: 12, f: 6, c: 26 },
  x_batat: { name: 'Bataty', aisle: 'Warzywa i owoce', kcal: 86, p: 1.6, f: 0.1, c: 17 },
  x_bbq: { name: 'Sos BBQ', aisle: 'Sosy i dodatki', kcal: 170, p: 1, f: 0.5, c: 40 },
  x_sriracha: { name: 'Sriracha', aisle: 'Sosy i dodatki', kcal: 93, p: 1.9, f: 0.9, c: 19 },
  x_nori: { name: 'Nori (arkusze/płatki)', aisle: 'Suche i puszki', kcal: 280, p: 40, f: 3, c: 10 },
  x_ocet: { name: 'Ocet jabłkowy', aisle: 'Sosy i dodatki', kcal: 20, p: 0, f: 0, c: 1 },
  x_tortilla_pszenna: { name: 'Tortilla pszenna duża', aisle: 'Pieczywo', kcal: 310, p: 8.5, f: 7.5, c: 51 },
} satisfies Record<string, Ingredient>;
