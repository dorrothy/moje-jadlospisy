// ✏️ EDYTOWALNY PLIK DANYCH
// Gramatury podane są na JEDNĄ porcję. Makro liczy się automatycznie
// z tabeli w ingredients.ts — zmień gramy tutaj, a wartości w ingredients.ts.
import type { IngredientId } from "./ingredients";
import { newRecipes } from './recipes-new';
import { polishRecipes } from './recipes-polish';
import { collectionRecipes } from './recipes-collections';
import type { Equipment } from './equipment';

export type MealType = "sniadanie" | "obiad" | "deser" | "kolacja";
export type Item = [IngredientId, number, string?]; // [składnik, gramy, uwaga]

export type Recipe = {
  id: string;
  name: string;
  type: MealType;
  minutes: number;
  category: string;
  collection?: string;
  equipment?: Equipment[];
  ingredients: Item[];
  spices?: string; // przyprawy bez wpływu na makro
  steps: string[];
  rawWeights?: boolean;
  proteinVariant?: { note: string; extra: Item[] };
  partner?: { note: string; extra: Item[]; ingredients?: Item[] };
};

export const mealSlots: { type: MealType; time: string; label: string }[] = [
  { type: "sniadanie", time: "10:00", label: "Śniadanie" },
  { type: "obiad", time: "13:00", label: "Zupa / lekki obiad" },
  { type: "deser", time: "16:00", label: "Proteinowy deser" },
  { type: "kolacja", time: "18:00", label: "Kolacja" },
];

const rice = (g = 80): NonNullable<Recipe["partner"]> => ({ note: `Dla chłopaka: dodatkowa porcja ryżu (${g} g suchego), ten sam sos.`, extra: [["ryz", g]] });
const pasta = (g = 90): NonNullable<Recipe["partner"]> => ({ note: `Dla chłopaka: zamiast konjac makaron pszenny (${g} g suchego), wspólny sos.`, extra: [["makaron", g]] });
const potato = (g = 250): NonNullable<Recipe["partner"]> => ({ note: `Dla chłopaka: ${g} g gotowanych ziemniaków do tej samej porcji.`, extra: [["ziemniak", g]] });

export const recipes: Recipe[] = [
  ...collectionRecipes,
  ...polishRecipes,
  ...newRecipes,
  // ───────── ŚNIADANIA ─────────
  { id: "jajecznica-serek", name: "Jajecznica z serkiem śmietankowym", type: "sniadanie", minutes: 10, category: "Low-carb",
    ingredients: [["jajko", 180, "3 szt."], ["serek_smietankowy", 30], ["maslo", 5], ["szczypiorek", 10], ["pomidor", 100]],
    spices: "sól, pieprz",
    steps: ["Rozgrzej masło na patelni na małym ogniu.", "Wbij jajka, mieszaj powoli szpatułką.", "Gdy jajka zaczną się ścinać, dodaj serek i wymieszaj do kremowej konsystencji.", "Posyp szczypiorkiem, podaj z pokrojonym pomidorem."] },
  { id: "twarozek-warzywa", name: "Twarożek z rzodkiewką i ogórkiem", type: "sniadanie", minutes: 5, category: "Low-carb",
    ingredients: [["twarog_chudy", 150], ["skyr", 50], ["ogorek", 100], ["szczypiorek", 10], ["chleb", 40, "1 kromka"]],
    spices: "sól, pieprz",
    steps: ["Rozgnieć twaróg widelcem ze skyrem.", "Dodaj pokrojony ogórek i szczypiorek, dopraw.", "Podawaj z kromką chleba."] },
  { id: "omlet-szpinak", name: "Omlet ze szpinakiem i fetą-light (mozzarella)", type: "sniadanie", minutes: 12, category: "Low-carb",
    ingredients: [["jajko", 180, "3 szt."], ["szpinak", 50], ["mozzarella_light", 30], ["oliwa", 5]],
    spices: "sól, pieprz, czosnek granulowany",
    steps: ["Roztrzep jajka z przyprawami.", "Na oliwie podsmaż szpinak 1 min.", "Wlej jajka, posyp mozzarellą, smaż pod przykryciem 4–5 min.", "Złóż na pół i podaj."] },
  { id: "parowki-jajko", name: "Parówki z jajkiem sadzonym i warzywami", type: "sniadanie", minutes: 10, category: "Szybkie",
    ingredients: [["parowki", 100, "2 szt."], ["jajko", 60, "1 szt."], ["musztarda", 10], ["ogorek", 80], ["pomidor", 80]],
    steps: ["Parówki zalej wrzątkiem i podgrzej 5 min.", "Usmaż jajko sadzone na suchej patelni z powłoką.", "Podaj z musztardą i pokrojonymi warzywami."],
    partner: { note: "Dla chłopaka: dodatkowo 2 kromki chleba.", extra: [["chleb", 80]] } },
  { id: "kanapka-pasztet", name: "Kanapki z pasztetem i ogórkiem kiszonym", type: "sniadanie", minutes: 5, category: "Szybkie",
    ingredients: [["chleb", 80, "2 kromki"], ["pasztet", 40], ["ogorek_kiszony", 60], ["salata", 20]],
    steps: ["Posmaruj chleb pasztetem.", "Ułóż sałatę i plasterki ogórka kiszonego."] },
  { id: "wrap-sniadaniowy", name: "Wrap śniadaniowy z jajkiem i szynką", type: "sniadanie", minutes: 10, category: "Meal prep",
    ingredients: [["tortilla", 60, "1 szt."], ["jajko", 120, "2 szt."], ["szynka", 40], ["ser_zolty", 15], ["salata", 20], ["pomidor", 50]],
    steps: ["Usmaż jajecznicę z 2 jajek.", "Na tortilli ułóż sałatę, szynkę, jajecznicę, ser i pomidor.", "Zwiń ciasno, zawiń w folię — wytrzyma 2 dni w lodówce.", "Rano podgrzej na suchej patelni po 1 min z każdej strony."] },
  { id: "owsianka-nocna", name: "Owsianka nocna proteinowa z malinami", type: "sniadanie", minutes: 5, category: "Meal prep",
    ingredients: [["platki_owsiane", 50], ["skyr", 150], ["mleko", 100], ["bialko_serwatkowe", 15], ["maliny", 80]],
    steps: ["W słoiku wymieszaj płatki, skyr, mleko i odżywkę.", "Na wierzch wyłóż maliny.", "Zakręć i wstaw na noc do lodówki (do 3 dni)."] },
  { id: "kanapki-jajko", name: "Kanapki z pastą jajeczną", type: "sniadanie", minutes: 12, category: "Meal prep",
    ingredients: [["chleb", 80, "2 kromki"], ["jajko", 120, "2 szt."], ["skyr", 30], ["musztarda", 5], ["szczypiorek", 10]],
    spices: "sól, pieprz",
    steps: ["Jajka ugotuj na twardo (9 min), ostudź i obierz.", "Posiekaj, wymieszaj ze skyrem, musztardą i szczypiorkiem.", "Posmaruj pieczywo. Pasta wytrzyma 3 dni w lodówce."] },
  { id: "muffinki-jajeczne", name: "Muffinki jajeczne z warzywami", type: "sniadanie", minutes: 25, category: "Meal prep",
    ingredients: [["jajko", 180, "3 szt. = 3 muffinki"], ["papryka", 50], ["szpinak", 30], ["szynka", 30], ["ser_zolty", 15]],
    spices: "sól, pieprz, oregano",
    steps: ["Nagrzej piekarnik do 180°C.", "Roztrzep jajka z przyprawami, dodaj pokrojoną paprykę, szpinak i szynkę.", "Przelej do foremek, posyp serem.", "Piecz 18–20 min. Przechowuj w pudełku do 4 dni."] },

  // ───────── ZUPY / LEKKI OBIAD ─────────
  { id: "salatka-tunczyk", name: "Sałatka z tuńczykiem i jajkiem", type: "obiad", minutes: 10, category: "Low-carb",
    ingredients: [["tunczyk", 120, "1 puszka"], ["jajko", 60, "1 szt."], ["salata", 80], ["ogorek", 80], ["pomidor", 80], ["kukurydza", 30], ["oliwa", 5]],
    spices: "sok z cytryny, sól, pieprz",
    steps: ["Ugotuj jajko na twardo.", "Porwij sałatę, pokrój warzywa.", "Dodaj odsączonego tuńczyka, kukurydzę i jajko.", "Skrop oliwą i cytryną, dopraw."] },
  { id: "krem-brokulowy", name: "Krem z brokułów", type: "obiad", minutes: 25, category: "Zupy",
    ingredients: [["brokul", 250], ["ziemniak", 50], ["cebula", 30], ["bulion", 300], ["serek_smietankowy", 20], ["oliwa", 5]],
    spices: "sól, pieprz, gałka muszkatołowa",
    steps: ["Na oliwie zeszklij cebulę.", "Dodaj brokuła, ziemniaka i bulion, gotuj 15 min.", "Zmiksuj z serkiem na gładki krem, dopraw."] },
  { id: "pomidorowa", name: "Zupa pomidorowa z kurczakiem", type: "obiad", minutes: 30, category: "Zupy",
    ingredients: [["passata", 200], ["bulion", 250], ["piers_kurczaka", 80], ["marchew", 50], ["smietana18", 20]],
    spices: "sól, pieprz, liść laurowy, bazylia",
    steps: ["Gotuj kurczaka z marchewką w bulionie 15 min.", "Wyjmij kurczaka, porwij na kawałki.", "Dodaj passatę, gotuj 5 min, zabiel śmietaną.", "Włóż mięso z powrotem i dopraw."],
    partner: { note: "Dla chłopaka: z makaronem (50 g suchego).", extra: [["makaron", 50]] } },
  { id: "krem-cukinia", name: "Krem z cukinii", type: "obiad", minutes: 20, category: "Zupy",
    ingredients: [["cukinia", 300], ["cebula", 30], ["czosnek", 5], ["bulion", 250], ["serek_smietankowy", 25]],
    spices: "sól, pieprz, tymianek",
    steps: ["Podsmaż cebulę i czosnek na suchym garnku z odrobiną bulionu.", "Dodaj pokrojoną cukinię i bulion, gotuj 12 min.", "Zmiksuj z serkiem, dopraw."] },
  { id: "kalafiorowa", name: "Zupa kalafiorowa", type: "obiad", minutes: 25, category: "Zupy",
    ingredients: [["kalafior", 250], ["marchew", 50], ["ziemniak", 50], ["bulion", 300], ["koperek", 5], ["smietana18", 15]],
    spices: "sól, pieprz, ziele angielskie",
    steps: ["Pokrój warzywa, zalej bulionem.", "Gotuj 15–18 min do miękkości.", "Zabiel śmietaną, posyp koperkiem."] },
  { id: "pieczarkowa", name: "Zupa pieczarkowa", type: "obiad", minutes: 25, category: "Zupy",
    ingredients: [["pieczarki", 200], ["cebula", 40], ["marchew", 40], ["bulion", 300], ["smietana18", 25], ["maslo", 5]],
    spices: "sól, pieprz, tymianek, natka",
    steps: ["Na maśle podsmaż cebulę i pokrojone pieczarki 5 min.", "Dodaj marchew i bulion, gotuj 15 min.", "Zabiel śmietaną, dopraw."] },
  { id: "marchewkowa", name: "Krem marchewkowy z imbirem", type: "obiad", minutes: 25, category: "Zupy",
    ingredients: [["marchew", 250], ["cebula", 30], ["bulion", 300], ["mleko_kokosowe", 30]],
    spices: "imbir, kurkuma, sól, pieprz",
    steps: ["Pokrój marchew i cebulę, zalej bulionem.", "Gotuj 18 min z imbirem.", "Zmiksuj z mleczkiem kokosowym, dopraw."] },
  { id: "jarzynowa", name: "Zupa jarzynowa", type: "obiad", minutes: 30, category: "Zupy",
    ingredients: [["mrozonka_jarzynowa", 200], ["ziemniak", 60], ["seler", 30], ["bulion", 300], ["koperek", 5]],
    spices: "sól, pieprz, liść laurowy",
    steps: ["Zagotuj bulion z selerem i ziemniakiem.", "Dodaj mrożone warzywa, gotuj 12 min.", "Posyp koperkiem."] },
  { id: "paprykowa", name: "Krem z pieczonej papryki", type: "obiad", minutes: 35, category: "Zupy",
    ingredients: [["papryka", 250], ["pomidory_puszka", 100], ["cebula", 30], ["czosnek", 5], ["bulion", 200], ["serek_smietankowy", 20]],
    spices: "papryka wędzona, sól, pieprz",
    steps: ["Upiecz paprykę w 200°C przez 20 min, zdejmij skórkę.", "Zeszklij cebulę z czosnkiem.", "Dodaj paprykę, pomidory i bulion, gotuj 8 min.", "Zmiksuj z serkiem, dopraw."] },

  // ───────── DESERY / PRZEKĄSKI ─────────
  { id: "skyr-maliny", name: "Skyr z malinami i orzechami", type: "deser", minutes: 3, category: "Proteinowe",
    ingredients: [["skyr", 200], ["maliny", 80], ["orzechy_laskowe", 10]],
    steps: ["Przełóż skyr do miseczki.", "Dodaj maliny i posiekane orzechy."] },
  { id: "pudding-czekoladowy", name: "Pudding czekoladowy proteinowy", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["skyr", 200], ["bialko_serwatkowe", 15], ["kakao", 8], ["erytrytol", 5]],
    steps: ["Wymieszaj skyr z odżywką, kakao i erytrytolem na gładko.", "Schłodź 15 min w lodówce."] },
  { id: "snickers", name: "Deserek „Snickers”", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["skyr", 180], ["bialko_serwatkowe", 15], ["maslo_orzechowe", 10], ["orzeszki_ziemne", 8], ["gorzka_czekolada", 5]],
    steps: ["Wymieszaj skyr z odżywką.", "Przełóż do pucharka, na wierzch masło orzechowe.", "Posyp posiekanymi orzeszkami i startą czekoladą."] },
  { id: "serniczek-malinowy", name: "Serniczek malinowy na zimno", type: "deser", minutes: 10, category: "Proteinowe",
    ingredients: [["twarog_chudy", 150], ["skyr", 50], ["erytrytol", 10], ["maliny", 60], ["biszkopty", 10, "1–2 szt."]],
    steps: ["Zmiksuj twaróg ze skyrem i erytrytolem.", "Na dno pucharka pokrusz biszkopt.", "Przełóż masę serową, na wierzch maliny.", "Schłodź 30 min."] },
  { id: "tiramisu", name: "Tiramisu proteinowe", type: "deser", minutes: 10, category: "Proteinowe",
    ingredients: [["skyr", 150], ["mascarpone", 20], ["bialko_serwatkowe", 10], ["biszkopty", 15], ["kawa", 40], ["kakao", 3]],
    steps: ["Wymieszaj skyr, mascarpone i odżywkę.", "Biszkopty namocz w kawie, ułóż w pucharku.", "Przekładaj warstwami z kremem.", "Oprósz kakao, schłodź min. 1 h."] },
  { id: "bounty", name: "Deserek „Bounty”", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["skyr", 180], ["wiorki_kokosowe", 10], ["bialko_serwatkowe", 10], ["gorzka_czekolada", 8]],
    steps: ["Wymieszaj skyr z wiórkami i odżywką.", "Rozpuść czekoladę i polej wierzch.", "Schłodź 10 min, aż czekolada stężeje."] },
  { id: "kinder-bueno", name: "Deserek „Kinder Bueno”", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["skyr", 180], ["bialko_serwatkowe", 10], ["orzechy_laskowe", 10], ["gorzka_czekolada", 5], ["biszkopty", 5]],
    steps: ["Wymieszaj skyr z odżywką.", "Dodaj połowę posiekanych orzechów.", "Na wierzch pokruszony biszkopt, resztę orzechów i startą czekoladę."] },
  { id: "stracciatella", name: "Stracciatella proteinowa", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["skyr", 200], ["bialko_serwatkowe", 10], ["erytrytol", 5], ["gorzka_czekolada", 10]],
    steps: ["Wymieszaj skyr z odżywką i erytrytolem.", "Zetrzyj czekoladę na tarce i wmieszaj."] },
  { id: "banan-twarozek", name: "Twarożek bananowo-kakaowy", type: "deser", minutes: 5, category: "Proteinowe",
    ingredients: [["twarog_chudy", 150], ["banan", 60], ["kakao", 5], ["mleko", 30]],
    steps: ["Zmiksuj twaróg z bananem, kakao i mlekiem.", "Podawaj schłodzony."] },

  // ───────── KOLACJE: TYDZIEŃ 1 ─────────
  { id: "kurczak-pieczarkowy", name: "Kurczak w sosie pieczarkowym", type: "kolacja", minutes: 25, category: "Low-carb",
    ingredients: [["piers_kurczaka", 150], ["pieczarki", 150], ["cebula", 40], ["smietana18", 40], ["oliwa", 5], ["brokul", 150]],
    spices: "sól, pieprz, czosnek, tymianek",
    steps: ["Pokrój kurczaka w kostkę, dopraw, obsmaż na oliwie 6 min.", "Dodaj cebulę i pieczarki, smaż 5 min.", "Wlej śmietanę i 50 ml wody, duś 5 min.", "Podawaj z brokułem na parze."], partner: rice() },
  { id: "burger-bowl", name: "Burger bowl", type: "kolacja", minutes: 20, category: "Low-carb",
    ingredients: [["mielone_wolowe", 130], ["salata", 80], ["pomidor", 80], ["ogorek_kiszony", 50], ["ser_zolty", 20], ["cebula", 20], ["majonez_light", 10], ["ketchup", 10], ["musztarda", 5]],
    spices: "sól, pieprz, papryka wędzona",
    steps: ["Mięso dopraw i usmaż, rozbijając na grudki (lub jako mały kotlet).", "Do miski włóż sałatę, pomidor, ogórka i cebulę.", "Dodaj mięso i ser.", "Wymieszaj majonez, ketchup i musztardę — polej sosem „burgerowym”."],
    partner: potato(250) },
  { id: "bolognese-cukinia", name: "Bolognese z makaronem z cukinii", type: "kolacja", minutes: 30, category: "Low-carb",
    ingredients: [["mielone_wolowe", 120], ["passata", 150], ["cebula", 30], ["czosnek", 5], ["cukinia", 250], ["parmezan", 10]],
    spices: "oregano, bazylia, sól, pieprz",
    steps: ["Podsmaż cebulę z czosnkiem, dodaj mięso i smaż 6 min.", "Wlej passatę, duś 15 min.", "Cukinię pokrój spiralizerem i podsmaż 2 min.", "Podaj sos na cukinii, posyp parmezanem."], partner: pasta() },
  { id: "udka-surowka", name: "Udka pieczone z surówką z kapusty", type: "kolacja", minutes: 45, category: "Budżetowe",
    ingredients: [["udka_kurczaka", 180], ["kapusta", 150], ["marchew", 50], ["skyr", 30], ["oliwa", 5]],
    spices: "papryka słodka, czosnek, majeranek, sól",
    steps: ["Natrzyj udka oliwą i przyprawami.", "Piecz w 200°C ok. 35–40 min.", "Kapustę poszatkuj, marchew zetrzyj, wymieszaj ze skyrem, solą i pieprzem.", "Podaj udka z surówką."], partner: potato(250) },
  { id: "tortilla-kurczak", name: "Tortilla z kurczakiem i warzywami", type: "kolacja", minutes: 20, category: "Budżetowe",
    ingredients: [["tortilla", 60, "1 szt."], ["piers_kurczaka", 120], ["papryka", 60], ["salata", 30], ["pomidor", 50], ["skyr", 40]],
    spices: "przyprawa gyros/meksykańska, czosnek",
    steps: ["Kurczaka pokrój w paski, dopraw, usmaż.", "Paprykę podsmaż 2 min.", "Skyr wymieszaj z czosnkiem — sos.", "Tortillę wypełnij sałatą, kurczakiem, warzywami i sosem, zwiń."],
    partner: { note: "Dla chłopaka: 2 tortille i podwójny kurczak.", extra: [["tortilla", 60], ["piers_kurczaka", 120]] } },
  { id: "pizza-tortilla", name: "Pizza na tortilli", type: "kolacja", minutes: 15, category: "Budżetowe",
    ingredients: [["tortilla", 60, "1 szt."], ["passata", 40], ["mozzarella_light", 60], ["szynka", 40], ["pieczarki", 50]],
    spices: "oregano, bazylia",
    steps: ["Nagrzej piekarnik do 220°C (lub użyj patelni z pokrywką).", "Posmaruj tortillę passatą z oregano.", "Ułóż szynkę, pieczarki i mozzarellę.", "Piecz 8–10 min do zrumienienia."],
    partner: { note: "Dla chłopaka: druga pizza na tortilli.", extra: [["tortilla", 60], ["mozzarella_light", 60], ["szynka", 40]] } },
  { id: "pulpety-koperkowe", name: "Pulpety w sosie koperkowym", type: "kolacja", minutes: 35, category: "Budżetowe",
    ingredients: [["mielony_indyk", 150], ["jajko", 20], ["cebula", 20], ["bulion", 200], ["smietana18", 30], ["koperek", 10], ["marchew", 100]],
    spices: "sól, pieprz, ziele angielskie",
    steps: ["Mięso wymieszaj z jajkiem, startą cebulą i przyprawami, uformuj kulki.", "Gotuj w bulionie 15 min.", "Zabiel bulion śmietaną, dodaj koperek.", "Podaj z gotowaną marchewką."], partner: potato(250) },

  // ───────── KOLACJE: TYDZIEŃ 2 (konjac) ─────────
  { id: "konjac-kurczak-szpinak", name: "Konjac z kurczakiem i szpinakiem", type: "kolacja", minutes: 20, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["piers_kurczaka", 130], ["szpinak", 80], ["czosnek", 5], ["serek_smietankowy", 30], ["parmezan", 10]],
    spices: "sól, pieprz, gałka",
    steps: ["Konjac przepłucz i podsmaż na suchej patelni 3 min.", "Kurczaka usmaż w kostce z czosnkiem.", "Dodaj szpinak i serek, rozpuść z odrobiną wody.", "Wymieszaj z makaronem, posyp parmezanem."], partner: pasta() },
  { id: "konjac-bolognese", name: "Konjac bolognese z indykiem", type: "kolacja", minutes: 25, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["mielony_indyk", 130], ["passata", 150], ["cebula", 30], ["czosnek", 5], ["parmezan", 10]],
    spices: "oregano, bazylia, sól",
    steps: ["Konjac przepłucz i odsącz.", "Podsmaż cebulę z czosnkiem, dodaj indyka.", "Wlej passatę, duś 12 min.", "Dodaj makaron, wymieszaj, posyp parmezanem."], partner: pasta() },
  { id: "konjac-brokul-ser", name: "Konjac z kurczakiem, brokułem i serem", type: "kolacja", minutes: 20, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["piers_kurczaka", 130], ["brokul", 120], ["ser_zolty", 20], ["mleko", 50]],
    spices: "czosnek, sól, pieprz",
    steps: ["Brokuł ugotuj 4 min.", "Kurczaka usmaż w kawałkach.", "Dodaj mleko i ser, rozpuść na sos.", "Wmieszaj brokuł i odsączony konjac."], partner: pasta() },
  { id: "konjac-tunczyk", name: "Konjac z tuńczykiem i pomidorami", type: "kolacja", minutes: 15, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["tunczyk", 120], ["pomidory_puszka", 150], ["czosnek", 5], ["oliwa", 5]],
    spices: "oregano, chili, sól",
    steps: ["Na oliwie podsmaż czosnek.", "Dodaj pomidory, gotuj 6 min.", "Wmieszaj tuńczyka i odsączony konjac, podgrzej 2 min."], partner: pasta() },
  { id: "konjac-pieczarkowy", name: "Konjac w sosie pieczarkowym", type: "kolacja", minutes: 20, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["piers_kurczaka", 120], ["pieczarki", 150], ["cebula", 30], ["smietana18", 30]],
    spices: "tymianek, sól, pieprz",
    steps: ["Usmaż kurczaka, odłóż.", "Podsmaż cebulę z pieczarkami 5 min.", "Wlej śmietanę, dodaj kurczaka.", "Wymieszaj z konjac."], partner: pasta() },
  { id: "konjac-carbonara", name: "Konjac carbonara", type: "kolacja", minutes: 15, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["szynka", 60], ["jajko", 60, "1 szt."], ["parmezan", 15], ["serek_smietankowy", 15]],
    spices: "dużo czarnego pieprzu",
    steps: ["Konjac podsmaż na suchej patelni 3 min.", "Dodaj pokrojoną szynkę.", "Jajko roztrzep z parmezanem i serkiem.", "Zdejmij z ognia, wmieszaj masę jajeczną — ma się zrobić kremowa, nie ścięta."], partner: pasta() },
  { id: "konjac-pesto", name: "Konjac pesto z mozzarellą", type: "kolacja", minutes: 15, category: "Konjac",
    ingredients: [["makaron_konjac", 200], ["piers_kurczaka", 110], ["pesto", 20], ["mozzarella_light", 50], ["pomidor", 80]],
    steps: ["Usmaż kurczaka w kawałkach.", "Dodaj odsączony konjac i pesto.", "Wyłóż na talerz z pomidorami i porwaną mozzarellą."], partner: pasta() },

  // ───────── KOLACJE: TYDZIEŃ 3 (azjatyckie) ─────────
  { id: "pad-thai", name: "Pad thai z kurczakiem", type: "kolacja", minutes: 25, category: "Azjatyckie",
    ingredients: [["makaron_ryzowy", 50], ["piers_kurczaka", 130], ["jajko", 60], ["marchew", 50], ["szczypiorek", 15], ["sos_sojowy", 15], ["orzeszki_ziemne", 10], ["oliwa", 5]],
    spices: "limonka, chili, czosnek",
    steps: ["Makaron namocz w gorącej wodzie 8 min.", "Usmaż kurczaka w paskach, odsuń na bok, wbij jajko i zamieszaj.", "Dodaj marchew, makaron i sos sojowy z sokiem z limonki.", "Posyp dymką i orzeszkami."],
    partner: { note: "Dla chłopaka: podwójny makaron ryżowy (+60 g).", extra: [["makaron_ryzowy", 60]] } },
  { id: "chicken-ramen", name: "Chicken ramen", type: "kolacja", minutes: 30, category: "Azjatyckie",
    ingredients: [["makaron_ramen", 50], ["piers_kurczaka", 130], ["jajko", 60], ["bulion", 400], ["sos_sojowy", 15], ["szpinak", 40], ["szczypiorek", 10]],
    spices: "imbir, czosnek, sezam",
    steps: ["Bulion zagotuj z sosem sojowym, imbirem i czosnkiem.", "Kurczaka usmaż i pokrój w plastry.", "Jajko gotuj 6,5 min, obierz.", "Ugotuj makaron, przełóż do miski, zalej bulionem, dodaj szpinak, kurczaka, jajko, dymkę."],
    partner: { note: "Dla chłopaka: +50 g makaronu ramen.", extra: [["makaron_ramen", 50]] } },
  { id: "salmon-teriyaki", name: "Salmon teriyaki rice bowl", type: "kolacja", minutes: 25, category: "Azjatyckie",
    ingredients: [["losos", 130], ["ryz", 50], ["sos_teriyaki", 20], ["ogorek", 80], ["awokado", 40], ["nasiona_sezamu", 5]],
    steps: ["Ugotuj ryż.", "Łososia pokrój w kostkę, usmaż 4 min, polej sosem teriyaki i zredukuj.", "Do miski: ryż, łosoś, ogórek, awokado.", "Posyp sezamem."], partner: rice() },
  { id: "korean-beef", name: "Korean beef bowl", type: "kolacja", minutes: 20, category: "Azjatyckie",
    ingredients: [["wolowina_paski", 130], ["ryz", 50], ["gochujang", 10], ["sos_sojowy", 15], ["miod", 5], ["ogorek", 80], ["szczypiorek", 10]],
    spices: "czosnek, imbir, sezam",
    steps: ["Ugotuj ryż.", "Wymieszaj gochujang, sos sojowy, miód, czosnek i imbir.", "Wołowinę obsmaż na mocnym ogniu 3 min, wlej sos.", "Podaj na ryżu z ogórkiem i dymką."], partner: rice() },
  { id: "satay-noodles", name: "Chicken satay noodles", type: "kolacja", minutes: 25, category: "Azjatyckie",
    ingredients: [["makaron_ryzowy", 50], ["piers_kurczaka", 130], ["maslo_orzechowe", 15], ["sos_sojowy", 15], ["papryka", 60], ["mleko_kokosowe", 30]],
    spices: "limonka, czosnek, chili",
    steps: ["Makaron namocz według opakowania.", "Wymieszaj masło orzechowe, sos sojowy, mleczko i limonkę — sos satay.", "Usmaż kurczaka z papryką.", "Dodaj makaron i sos, wymieszaj na ogniu 1 min."],
    partner: { note: "Dla chłopaka: +60 g makaronu ryżowego.", extra: [["makaron_ryzowy", 60]] } },
  { id: "shrimp-sushi-bowl", name: "Shrimp sushi bowl", type: "kolacja", minutes: 20, category: "Azjatyckie",
    ingredients: [["krewetki", 130], ["ryz", 50], ["ogorek", 80], ["marchew", 40], ["awokado", 40], ["sos_sojowy", 10], ["sriracha", 5], ["skyr", 20], ["nori", 2]],
    steps: ["Ugotuj ryż, skrop octem ryżowym.", "Krewetki usmaż 2–3 min z czosnkiem.", "Skyr wymieszaj ze srirachą — pikantny sos.", "Ułóż w misce ryż, krewetki, warzywa, awokado; polej sosem, posyp nori."], partner: rice() },
  { id: "honey-garlic-chicken", name: "Sticky honey garlic chicken", type: "kolacja", minutes: 25, category: "Azjatyckie",
    ingredients: [["piers_kurczaka", 140], ["miod", 10], ["sos_sojowy", 15], ["czosnek", 8], ["ryz", 50], ["brokul", 120]],
    spices: "imbir, sezam",
    steps: ["Ugotuj ryż i brokuł.", "Kurczaka w kostce obsmaż na złoto.", "Dodaj miód, sos sojowy i czosnek, redukuj do kleistej glazury.", "Podawaj z ryżem i brokułem."], partner: rice() },

  // ───────── KOLACJE: TYDZIEŃ 4 (meal prep) ─────────
  { id: "fajita-bowl", name: "Chicken fajita bowl", type: "kolacja", minutes: 25, category: "Meal prep",
    ingredients: [["piers_kurczaka", 140], ["ryz", 50], ["papryka", 100], ["cebula", 40], ["kukurydza", 40], ["fasola", 40], ["skyr", 30]],
    spices: "przyprawa fajita, limonka",
    steps: ["Ugotuj ryż.", "Kurczaka i warzywa pokrój w paski, dopraw, usmaż.", "Do pudełka: ryż, kurczak z warzywami, kukurydza, fasola.", "Skyr z limonką jako sos — osobno."], partner: rice() },
  { id: "pulpety-pomidory", name: "Pulpety z indyka w pomidorach", type: "kolacja", minutes: 35, category: "Meal prep",
    ingredients: [["mielony_indyk", 150], ["jajko", 20], ["passata", 200], ["cebula", 30], ["ryz", 40]],
    spices: "bazylia, czosnek, sól",
    steps: ["Mięso wymieszaj z jajkiem i przyprawami, uformuj kulki.", "Obsmaż krótko, zalej passatą z cebulą.", "Duś 15 min pod przykryciem.", "Podaj z ryżem, przechowuj 3–4 dni."], partner: rice() },
  { id: "curry-kokosowe", name: "Curry kokosowe z kurczakiem", type: "kolacja", minutes: 30, category: "Meal prep",
    ingredients: [["piers_kurczaka", 140], ["mleko_kokosowe", 60], ["pasta_curry", 15], ["papryka", 80], ["cukinia", 80], ["ryz", 50]],
    spices: "imbir, czosnek, kolendra",
    steps: ["Ugotuj ryż.", "Pastę curry podsmaż 1 min, dodaj kurczaka.", "Dodaj warzywa i mleczko, duś 12 min.", "Rozłóż z ryżem do pudełek."], partner: rice() },
  { id: "chili-con-carne", name: "Chili con carne", type: "kolacja", minutes: 40, category: "Meal prep",
    ingredients: [["mielone_wolowe", 120], ["fasola", 80], ["kukurydza", 40], ["pomidory_puszka", 150], ["papryka", 60], ["cebula", 30]],
    spices: "kumin, chili, papryka wędzona, czosnek",
    steps: ["Podsmaż cebulę, dodaj mięso.", "Dodaj przyprawy, paprykę i pomidory.", "Duś 20 min, na koniec fasola i kukurydza.", "Zamraża się świetnie."], partner: rice() },
  { id: "zapiekanka-makaronowa", name: "Zapiekanka makaronowa z kurczakiem i brokułem", type: "kolacja", minutes: 40, category: "Meal prep",
    ingredients: [["makaron", 50], ["piers_kurczaka", 120], ["brokul", 120], ["passata", 80], ["mozzarella_light", 40]],
    spices: "oregano, czosnek",
    steps: ["Makaron ugotuj al dente, brokuł 3 min.", "Kurczaka usmaż w kostce.", "Wymieszaj z passatą w naczyniu, posyp mozzarellą.", "Piecz 20 min w 190°C, pokrój na porcje."],
    partner: { note: "Dla chłopaka: +50 g makaronu w jego porcji.", extra: [["makaron", 50]] } },
  { id: "gyros-bowl", name: "Gyros bowl z tzatziki", type: "kolacja", minutes: 25, category: "Meal prep",
    ingredients: [["piers_kurczaka", 140], ["kapusta", 80], ["pomidor", 80], ["ogorek", 80], ["skyr", 60], ["czosnek", 3], ["ryz", 40]],
    spices: "przyprawa gyros",
    steps: ["Kurczaka natrzyj przyprawą gyros i usmaż w paskach.", "Połowę ogórka zetrzyj, wymieszaj ze skyrem i czosnkiem — tzatziki.", "Ugotuj ryż, poszatkuj kapustę.", "Ułóż w pudełku, tzatziki osobno."], partner: rice() },
  { id: "pieczen-indyk", name: "Pieczeń z indyka z warzywami", type: "kolacja", minutes: 60, category: "Meal prep",
    ingredients: [["piers_indyka", 150], ["marchew", 80], ["brokul", 100], ["ziemniak", 100], ["oliwa", 5]],
    spices: "majeranek, czosnek, rozmaryn, sól",
    steps: ["Indyka natrzyj przyprawami i oliwą, odstaw na 30 min (lub na noc).", "Piecz w 180°C ok. 45 min z marchewką i ziemniakami.", "Brokuł dodaj na ostatnie 10 min.", "Pokrój w plastry — świetna też na kanapki."], partner: potato(200) },
];

export const recipeById = Object.fromEntries(recipes.map((r) => [r.id, r])) as Record<string, Recipe>;

// ───────── PLAN 4 TYGODNI ─────────
type Day = Record<MealType, string>;
const d = (sniadanie: string, obiad: string, deser: string, kolacja: string): Day => ({ sniadanie, obiad, deser, kolacja });

export type Week = { n: number; title: string; subtitle: string; emoji: string; days: Day[] };

export const weeks: Week[] = [
  { n: 1, title: "Budżetowy low-carb", subtitle: "Proste, tanie, mało węglowodanów", emoji: "🥚", days: [
    d("jajecznica-serek", "salatka-tunczyk", "skyr-maliny", "kurczak-pieczarkowy"),
    d("twarozek-warzywa", "krem-brokulowy", "pudding-czekoladowy", "burger-bowl"),
    d("omlet-szpinak", "salatka-tunczyk", "skyr-maliny", "bolognese-cukinia"),
    d("jajecznica-serek", "kalafiorowa", "banan-twarozek", "udka-surowka"),
    d("twarozek-warzywa", "salatka-tunczyk", "pudding-czekoladowy", "tortilla-kurczak"),
    d("omlet-szpinak", "pomidorowa", "skyr-maliny", "pizza-tortilla"),
    d("jajecznica-serek", "krem-cukinia", "banan-twarozek", "pulpety-koperkowe"),
  ] },
  { n: 2, title: "Zupy i makarony konjac", subtitle: "Codziennie zupa + lekki konjac", emoji: "🍜", days: [
    d("jajecznica-serek", "krem-brokulowy", "skyr-maliny", "konjac-kurczak-szpinak"),
    d("omlet-szpinak", "pomidorowa", "pudding-czekoladowy", "konjac-bolognese"),
    d("twarozek-warzywa", "krem-cukinia", "stracciatella", "konjac-brokul-ser"),
    d("jajecznica-serek", "kalafiorowa", "skyr-maliny", "konjac-tunczyk"),
    d("omlet-szpinak", "pieczarkowa", "pudding-czekoladowy", "konjac-pieczarkowy"),
    d("twarozek-warzywa", "marchewkowa", "serniczek-malinowy", "konjac-carbonara"),
    d("jajecznica-serek", "jarzynowa", "banan-twarozek", "konjac-pesto"),
  ] },
  { n: 3, title: "Azjatyckie kolacje i deserki", subtitle: "Bowle, noodle i słodkie proteiny", emoji: "🥢", days: [
    d("parowki-jajko", "krem-cukinia", "snickers", "pad-thai"),
    d("kanapka-pasztet", "marchewkowa", "serniczek-malinowy", "chicken-ramen"),
    d("parowki-jajko", "salatka-tunczyk", "tiramisu", "salmon-teriyaki"),
    d("kanapka-pasztet", "krem-brokulowy", "bounty", "korean-beef"),
    d("parowki-jajko", "pieczarkowa", "kinder-bueno", "satay-noodles"),
    d("kanapka-pasztet", "kalafiorowa", "pudding-czekoladowy", "shrimp-sushi-bowl"),
    d("parowki-jajko", "jarzynowa", "stracciatella", "honey-garlic-chicken"),
  ] },
  { n: 4, title: "Meal prep i pudełka", subtitle: "Gotujesz raz, jesz kilka dni", emoji: "🍱", days: [
    d("wrap-sniadaniowy", "pomidorowa", "snickers", "fajita-bowl"),
    d("owsianka-nocna", "krem-brokulowy", "serniczek-malinowy", "pulpety-pomidory"),
    d("kanapki-jajko", "paprykowa", "pudding-czekoladowy", "curry-kokosowe"),
    d("muffinki-jajeczne", "jarzynowa", "tiramisu", "chili-con-carne"),
    d("wrap-sniadaniowy", "pomidorowa", "bounty", "zapiekanka-makaronowa"),
    d("owsianka-nocna", "paprykowa", "kinder-bueno", "gyros-bowl"),
    d("muffinki-jajeczne", "krem-brokulowy", "stracciatella", "pieczen-indyk"),
  ] },
];

export const dayNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
export const dayShort = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
