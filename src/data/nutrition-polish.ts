import type { Ingredient } from './ingredients';

// Na 100 g części jadalnej; surowe, poza wyraźnie oznaczonymi buraczkami.
// Referencja: USDA FoodData Central https://fdc.nal.usda.gov/ (generic foods),
// uśrednione etykiety europejskie dla pieczywa, nabiału i proszku do pieczenia.
// W = węglowodany przyswajalne bez błonnika. Profile nie są analizą konkretnej marki.
// Oddzielne identyfikatory chronią wartości wszystkich wcześniejszych przepisów.
export const polishNutrition = {
  pl_schab: { name: 'Schab wieprzowy bez kości', aisle: 'Mięso i ryby', kcal: 143, p: 22, f: 6, c: 0 },
  pl_poledwiczka: { name: 'Polędwiczka wieprzowa', aisle: 'Mięso i ryby', kcal: 120, p: 21, f: 4, c: 0 },
  pl_lopatka: { name: 'Chuda łopatka wieprzowa', aisle: 'Mięso i ryby', kcal: 160, p: 20, f: 9, c: 0 },
  pl_udko: { name: 'Mięso z udka kurczaka bez kości i skóry', aisle: 'Mięso i ryby', kcal: 144, p: 19.7, f: 7, c: 0 },
  pl_maka: { name: 'Mąka pszenna', aisle: 'Suche i puszki', kcal: 364, p: 10, f: 1, c: 73 },
  pl_bulka: { name: 'Bułka tarta', aisle: 'Suche i puszki', kcal: 351, p: 11, f: 3, c: 68 },
  pl_koperek: { name: 'Koperek', aisle: 'Warzywa i owoce', kcal: 43, p: 3.5, f: 1.1, c: 4.9 },
  pl_pietruszka: { name: 'Natka pietruszki', aisle: 'Warzywa i owoce', kcal: 36, p: 3, f: 0.8, c: 3 },
  pl_kapusta: { name: 'Liście kapusty białej', aisle: 'Warzywa i owoce', kcal: 25, p: 1.3, f: 0.1, c: 3.3 },
  pl_groszek: { name: 'Groszek zielony', aisle: 'Warzywa i owoce', kcal: 81, p: 5.4, f: 0.4, c: 9.8 },
  pl_smietanka: { name: 'Śmietanka 12%', aisle: 'Nabiał i jajka', kcal: 134, p: 3, f: 12, c: 4 },
  pl_burak: { name: 'Buraczki gotowane bez dodatków', aisle: 'Warzywa i owoce', kcal: 44, p: 1.7, f: 0.2, c: 8 },
  pl_burak_surowy: { name: 'Buraki surowe', aisle: 'Warzywa i owoce', kcal: 43, p: 1.6, f: 0.2, c: 6.8 },
  pl_bagietka: { name: 'Bagietka pszenna', aisle: 'Pieczywo', kcal: 275, p: 9, f: 1.5, c: 55 },
  pl_kalafior: { name: 'Kalafior', aisle: 'Warzywa i owoce', kcal: 25, p: 1.9, f: 0.3, c: 3 },
  pl_jablko: { name: 'Jabłko', aisle: 'Warzywa i owoce', kcal: 52, p: 0.3, f: 0.2, c: 11.4 },
  pl_proszek: { name: 'Proszek do pieczenia', aisle: 'Suche i puszki', kcal: 100, p: 0, f: 0, c: 25 },
  pl_skyr_wanilia: { name: 'Skyr waniliowy', aisle: 'Nabiał i jajka', kcal: 82, p: 9, f: 0.2, c: 11 },
  pl_cynamon: { name: 'Cynamon', aisle: 'Sosy i dodatki', kcal: 247, p: 4, f: 1.2, c: 27.5 },
  pl_woda: { name: 'Woda', aisle: 'Sosy i dodatki', kcal: 0, p: 0, f: 0, c: 0 },
} satisfies Record<string, Ingredient>;