// Tabela składników — wartości na 100 g produktu (orientacyjne, typowe wartości
// z ogólnodostępnych tabel żywieniowych). Popraw je wg etykiet produktów, które kupujesz.
// Pole ustawione na null = brak danych → w aplikacji pokaże się "do uzupełnienia".

import { newNutrition } from './nutrition-new';
import { polishNutrition } from './nutrition-polish';
import { collectionNutrition } from './nutrition-collections';

export type Ingredient = {
  name: string;
  /** dział w liście zakupów */
  aisle: "Mięso i ryby" | "Nabiał i jajka" | "Warzywa i owoce" | "Suche i puszki" | "Pieczywo" | "Sosy i dodatki";
  kcal: number | null;
  p: number | null; // białko
  f: number | null; // tłuszcz
  c: number | null; // węglowodany
};

export const ingredients = {
  ...collectionNutrition,
  ...polishNutrition,
  ...newNutrition,
  // Mięso i ryby
  piers_kurczaka: { name: "Pierś z kurczaka", aisle: "Mięso i ryby", kcal: 110, p: 23, f: 1.5, c: 0 },
  udka_kurczaka: { name: "Udka z kurczaka (bez kości)", aisle: "Mięso i ryby", kcal: 180, p: 18, f: 12, c: 0 },
  mielone_wolowe: { name: "Mięso mielone wołowe", aisle: "Mięso i ryby", kcal: 250, p: 17, f: 20, c: 0 },
  mielony_indyk: { name: "Mięso mielone z indyka", aisle: "Mięso i ryby", kcal: 150, p: 19, f: 8, c: 0 },
  piers_indyka: { name: "Pierś z indyka", aisle: "Mięso i ryby", kcal: 105, p: 24, f: 1, c: 0 },
  wolowina_paski: { name: "Wołowina chuda (paski)", aisle: "Mięso i ryby", kcal: 150, p: 21, f: 7, c: 0 },
  losos: { name: "Łosoś (filet)", aisle: "Mięso i ryby", kcal: 208, p: 20, f: 13, c: 0 },
  krewetki: { name: "Krewetki", aisle: "Mięso i ryby", kcal: 85, p: 18, f: 1, c: 0 },
  tunczyk: { name: "Tuńczyk w sosie własnym", aisle: "Mięso i ryby", kcal: 116, p: 26, f: 1, c: 0 },
  parowki: { name: "Parówki (wysokomięsne)", aisle: "Mięso i ryby", kcal: 250, p: 12, f: 22, c: 2 },
  pasztet: { name: "Pasztet drobiowy", aisle: "Mięso i ryby", kcal: 300, p: 11, f: 27, c: 3 },
  szynka: { name: "Szynka drobiowa", aisle: "Mięso i ryby", kcal: 100, p: 19, f: 2, c: 1.5 },

  // Nabiał i jajka
  jajko: { name: "Jajka", aisle: "Nabiał i jajka", kcal: 143, p: 12.6, f: 9.5, c: 0.7 },
  serek_smietankowy: { name: "Serek śmietankowy", aisle: "Nabiał i jajka", kcal: 250, p: 5, f: 24, c: 3 },
  serek_wiejski: { name: "Serek wiejski", aisle: "Nabiał i jajka", kcal: 98, p: 11, f: 4.3, c: 3.4 },
  twarog_chudy: { name: "Twaróg chudy", aisle: "Nabiał i jajka", kcal: 99, p: 18, f: 0.5, c: 3.5 },
  skyr: { name: "Skyr naturalny", aisle: "Nabiał i jajka", kcal: 63, p: 11, f: 0.2, c: 4 },
  smietana18: { name: "Śmietana 18%", aisle: "Nabiał i jajka", kcal: 186, p: 2.5, f: 18, c: 3.6 },
  mleko: { name: "Mleko 2%", aisle: "Nabiał i jajka", kcal: 50, p: 3.4, f: 2, c: 4.8 },
  mozzarella_light: { name: "Mozzarella light", aisle: "Nabiał i jajka", kcal: 165, p: 20, f: 9, c: 2 },
  ser_zolty: { name: "Ser żółty (gouda)", aisle: "Nabiał i jajka", kcal: 356, p: 25, f: 27, c: 2 },
  parmezan: { name: "Parmezan", aisle: "Nabiał i jajka", kcal: 431, p: 38, f: 29, c: 4 },
  mascarpone: { name: "Mascarpone", aisle: "Nabiał i jajka", kcal: 430, p: 4.6, f: 44, c: 3 },
  maslo: { name: "Masło", aisle: "Nabiał i jajka", kcal: 717, p: 0.9, f: 81, c: 0.1 },

  // Warzywa i owoce
  pieczarki: { name: "Pieczarki", aisle: "Warzywa i owoce", kcal: 22, p: 3.1, f: 0.3, c: 3.3 },
  cebula: { name: "Cebula", aisle: "Warzywa i owoce", kcal: 40, p: 1.1, f: 0.1, c: 9 },
  czosnek: { name: "Czosnek", aisle: "Warzywa i owoce", kcal: 149, p: 6.4, f: 0.5, c: 33 },
  brokul: { name: "Brokuł", aisle: "Warzywa i owoce", kcal: 34, p: 2.8, f: 0.4, c: 7 },
  cukinia: { name: "Cukinia", aisle: "Warzywa i owoce", kcal: 17, p: 1.2, f: 0.3, c: 3.1 },
  kalafior: { name: "Kalafior", aisle: "Warzywa i owoce", kcal: 25, p: 1.9, f: 0.3, c: 5 },
  marchew: { name: "Marchew", aisle: "Warzywa i owoce", kcal: 41, p: 0.9, f: 0.2, c: 9.6 },
  ziemniak: { name: "Ziemniaki", aisle: "Warzywa i owoce", kcal: 77, p: 2, f: 0.1, c: 17 },
  szpinak: { name: "Szpinak", aisle: "Warzywa i owoce", kcal: 23, p: 2.9, f: 0.4, c: 3.6 },
  kapusta: { name: "Kapusta biała", aisle: "Warzywa i owoce", kcal: 25, p: 1.3, f: 0.1, c: 5.8 },
  pomidor: { name: "Pomidory świeże", aisle: "Warzywa i owoce", kcal: 18, p: 0.9, f: 0.2, c: 3.9 },
  ogorek: { name: "Ogórek", aisle: "Warzywa i owoce", kcal: 15, p: 0.7, f: 0.1, c: 3.6 },
  ogorek_kiszony: { name: "Ogórek kiszony", aisle: "Warzywa i owoce", kcal: 12, p: 0.5, f: 0.1, c: 2 },
  salata: { name: "Sałata", aisle: "Warzywa i owoce", kcal: 15, p: 1.4, f: 0.2, c: 2.9 },
  papryka: { name: "Papryka czerwona", aisle: "Warzywa i owoce", kcal: 31, p: 1, f: 0.3, c: 6 },
  seler: { name: "Seler korzeniowy", aisle: "Warzywa i owoce", kcal: 42, p: 1.5, f: 0.3, c: 9 },
  mrozonka_jarzynowa: { name: "Mieszanka warzyw (mrożona)", aisle: "Warzywa i owoce", kcal: 60, p: 3, f: 0.5, c: 10 },
  awokado: { name: "Awokado", aisle: "Warzywa i owoce", kcal: 160, p: 2, f: 15, c: 9 },
  maliny: { name: "Maliny (świeże/mrożone)", aisle: "Warzywa i owoce", kcal: 52, p: 1.2, f: 0.7, c: 12 },
  banan: { name: "Banan", aisle: "Warzywa i owoce", kcal: 89, p: 1.1, f: 0.3, c: 23 },
  koperek: { name: "Koperek", aisle: "Warzywa i owoce", kcal: 43, p: 3.5, f: 1.1, c: 7 },
  szczypiorek: { name: "Szczypiorek / dymka", aisle: "Warzywa i owoce", kcal: 30, p: 3.3, f: 0.7, c: 4.4 },

  // Suche i puszki
  makaron_konjac: { name: "Makaron konjac (odsączony)", aisle: "Suche i puszki", kcal: 10, p: 0, f: 0, c: 3 },
  makaron: { name: "Makaron pszenny (suchy)", aisle: "Suche i puszki", kcal: 357, p: 12, f: 1.5, c: 72 },
  makaron_ryzowy: { name: "Makaron ryżowy (suchy)", aisle: "Suche i puszki", kcal: 360, p: 6, f: 0.6, c: 80 },
  makaron_ramen: { name: "Makaron ramen (suchy)", aisle: "Suche i puszki", kcal: 350, p: 11, f: 1.5, c: 72 },
  ryz: { name: "Ryż biały (suchy)", aisle: "Suche i puszki", kcal: 350, p: 7, f: 0.6, c: 78 },
  platki_owsiane: { name: "Płatki owsiane", aisle: "Suche i puszki", kcal: 380, p: 13, f: 7, c: 60 },
  passata: { name: "Passata pomidorowa", aisle: "Suche i puszki", kcal: 33, p: 1.5, f: 0.2, c: 6 },
  pomidory_puszka: { name: "Pomidory krojone (puszka)", aisle: "Suche i puszki", kcal: 21, p: 1.1, f: 0.2, c: 4 },
  fasola: { name: "Fasola czerwona (puszka, odsączona)", aisle: "Suche i puszki", kcal: 100, p: 7, f: 0.5, c: 16 },
  kukurydza: { name: "Kukurydza (puszka)", aisle: "Suche i puszki", kcal: 80, p: 3, f: 1, c: 16 },
  mleko_kokosowe: { name: "Mleczko kokosowe", aisle: "Suche i puszki", kcal: 197, p: 2, f: 21, c: 3 },
  wiorki_kokosowe: { name: "Wiórki kokosowe", aisle: "Suche i puszki", kcal: 660, p: 7, f: 65, c: 24 },
  bialko_serwatkowe: { name: "Odżywka białkowa", aisle: "Suche i puszki", kcal: 380, p: 80, f: 6, c: 8 },
  kakao: { name: "Kakao naturalne", aisle: "Suche i puszki", kcal: 230, p: 20, f: 14, c: 58 },
  gorzka_czekolada: { name: "Gorzka czekolada 70%", aisle: "Suche i puszki", kcal: 550, p: 7, f: 42, c: 30 },
  maslo_orzechowe: { name: "Masło orzechowe", aisle: "Suche i puszki", kcal: 588, p: 25, f: 50, c: 20 },
  orzechy_laskowe: { name: "Orzechy laskowe", aisle: "Suche i puszki", kcal: 630, p: 15, f: 61, c: 17 },
  orzeszki_ziemne: { name: "Orzeszki ziemne", aisle: "Suche i puszki", kcal: 567, p: 26, f: 49, c: 16 },
  erytrytol: { name: "Erytrytol", aisle: "Suche i puszki", kcal: 0, p: 0, f: 0, c: 0 },
  biszkopty: { name: "Biszkopty", aisle: "Suche i puszki", kcal: 390, p: 8, f: 4, c: 80 },
  kawa: { name: "Kawa espresso (napar)", aisle: "Suche i puszki", kcal: 2, p: 0.1, f: 0, c: 0 },
  nasiona_sezamu: { name: "Sezam", aisle: "Suche i puszki", kcal: 573, p: 18, f: 50, c: 23 },

  // Pieczywo
  tortilla: { name: "Tortilla pszenna", aisle: "Pieczywo", kcal: 300, p: 8, f: 7, c: 50 },
  chleb: { name: "Chleb żytni razowy", aisle: "Pieczywo", kcal: 240, p: 7, f: 1.5, c: 45 },

  // Sosy i dodatki
  oliwa: { name: "Oliwa z oliwek", aisle: "Sosy i dodatki", kcal: 884, p: 0, f: 100, c: 0 },
  sos_sojowy: { name: "Sos sojowy", aisle: "Sosy i dodatki", kcal: 53, p: 8, f: 0.6, c: 5 },
  miod: { name: "Miód", aisle: "Sosy i dodatki", kcal: 304, p: 0.3, f: 0, c: 82 },
  ketchup: { name: "Ketchup", aisle: "Sosy i dodatki", kcal: 100, p: 1.5, f: 0.1, c: 23 },
  musztarda: { name: "Musztarda", aisle: "Sosy i dodatki", kcal: 66, p: 4, f: 3.3, c: 5 },
  majonez_light: { name: "Majonez light", aisle: "Sosy i dodatki", kcal: 300, p: 1, f: 30, c: 7 },
  pesto: { name: "Pesto bazyliowe", aisle: "Sosy i dodatki", kcal: 450, p: 5, f: 45, c: 6 },
  bulion: { name: "Bulion warzywny (płyn)", aisle: "Sosy i dodatki", kcal: 5, p: 0.3, f: 0.2, c: 0.5 },
  // brak danych — przykłady pozycji do uzupełnienia wg etykiety:
  pasta_curry: { name: "Pasta curry", aisle: "Sosy i dodatki", kcal: null, p: null, f: null, c: null },
  gochujang: { name: "Gochujang", aisle: "Sosy i dodatki", kcal: null, p: null, f: null, c: null },
  sos_teriyaki: { name: "Sos teriyaki", aisle: "Sosy i dodatki", kcal: null, p: null, f: null, c: null },
  sriracha: { name: "Sriracha", aisle: "Sosy i dodatki", kcal: null, p: null, f: null, c: null },
  nori: { name: "Nori (płatki)", aisle: "Sosy i dodatki", kcal: null, p: null, f: null, c: null },
} satisfies Record<string, Ingredient>;

export type IngredientId = keyof typeof ingredients;
