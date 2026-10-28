import type { Week, MealType } from './recipes';

// Porcje dotyczą wyłącznie użytkowniczki. Gramatury bazowych przepisów nie zmieniają się.
const day = (ids: string[]): Record<MealType, string> => {
  const [sniadanie, obiad, deser, kolacja] = ids;
  if (!sniadanie || !obiad || !deser || !kolacja) throw new Error('Niepełny dzień');
  return { sniadanie, obiad, deser, kolacja };
};
const portions = (values: number[][]) => values.map(([sniadanie = 1, obiad = 1, deser = 1, kolacja = 1]) => ({ sniadanie, obiad, deser, kolacja }));
export const additionalWeeks: Week[] = [
  { n: 5, title: 'Świeżo i kolorowo', subtitle: 'Sałatki, lekkie zupy i różnorodne desery', emoji: '🥗', days: [
    day(['nowe-placuszki-twarogowe', 'kolekcje-grecka', 'kolekcje-lotus', 'polskie-bagietka']),
    day(['nowe-owsianka-brownie', 'krem-brokulowy', 'kolekcje-chia-mango', 'kolekcje-tunczyk-jajko']),
    day(['nowe-bajgiel-jajko', 'kolekcje-halloumi-granat', 'kolekcje-mus-czekoladowy', 'polskie-udka']),
    day(['nowe-tosty-francuskie', 'pomidorowa', 'kolekcje-crumble', 'kolekcje-cezar']),
    day(['nowe-kanapki-pasztet', 'kolekcje-makaronowa-pesto', 'kolekcje-tiramisu', 'polskie-kalafior']),
    day(['nowe-miska-serek-wiejski', 'paprykowa', 'kolekcje-kinder-bueno', 'kolekcje-azjatycka-chrupiaca']),
    day(['nowe-quesadilla-sniadaniowa', 'jarzynowa', 'kolekcje-brownie-fasola', 'polskie-golabki']),
  ], portions: portions([[.75,1,1,.75],[1,1,1.25,1],[.75,.75,1,1],[1,1,1,1],[1,.75,.75,.75],[1,1,1.25,1],[1,.75,1,1]]) },
  { n: 6, title: 'Azja i Włochy', subtitle: 'Azjatyckie i włoskie kolacje, polskie śniadania', emoji: '🍜', days: [
    day(['polskie-racuchy', 'krem-brokulowy', 'kolekcje-lotus', 'kolekcje-bibimbap']),
    day(['polskie-gofry-twarogowe', 'paprykowa', 'kolekcje-chia-mango', 'kolekcje-orzo']),
    day(['polskie-ryz-jablka', 'kolekcje-cezar', 'kolekcje-mus-czekoladowy', 'kolekcje-satay']),
    day(['polskie-serniczki', 'marchewkowa', 'kolekcje-tiramisu', 'kolekcje-gnocchi-sorrentina']),
    day(['polskie-nalesniki', 'krem-cukinia', 'kolekcje-crumble', 'kolekcje-udon']),
    day(['polskie-racuchy', 'pieczarkowa', 'kolekcje-baskijski', 'kolekcje-makaron-kremowy']),
    day(['polskie-ryz-jablka', 'pomidorowa', 'kolekcje-kinder-bueno', 'kolekcje-risotto']),
  ], portions: portions([[.75,1.25,1,1],[1,1,.75,1],[.75,.75,1,1],[1.25,1,1,.75],[1.25,1,.75,.75],[1,1,.75,1],[1,1,.75,1]]) },
];