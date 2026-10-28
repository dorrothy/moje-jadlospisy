import type { Recipe, Item } from './recipes';
import type { Equipment } from './equipment';

const dish = (id:string,name:string,collection:string,minutes:number,equipment:Equipment[],ingredients:Item[],steps:string[],partnerChanges:Item[]=[]):Recipe => ({
 id:`kolekcje-${id}`,name,collection,category:collection,type:collection==='Deserki'?'deser':'kolacja',minutes,equipment,ingredients,steps,rawWeights:true,
 ...(partnerChanges.length ? {partner:{note:'Oddzielna większa porcja: więcej dodatku węglowodanowego i białka. Dodatkowy ryż ugotuj według opakowania, a gnocchi 2–3 minuty do wypłynięcia; podaj obok dania. Gotuj mięso do tej samej temperatury wewnętrznej; w razie potrzeby wydłuż czas.',extra:[],ingredients:[...ingredients.map(item=>partnerChanges.find(([key])=>key===item[0])??item),...partnerChanges.filter(([key])=>!ingredients.some(([base])=>base===key))]}}:{}),
});

export const collectionRecipes:Recipe[] = [
 dish('cezar','Sałatka Cezar z kurczakiem','Sałatki',25,['stovetop','air-fryer'],[['n_kurczak',150],['c_romaine',120],['c_tomatoes',100],['n_parmezan',15],['c_croutons',30],['n_skyr',70],['musztarda',8],['n_cytryna',10],['n_oliwa',5],['c_garlic',3]],[
 'Umyj sałatę i pomidorki, dokładnie osusz. Kurczaka rozbij na równą grubość i dopraw solą oraz pieprzem.',
 'Posmaruj mięso odmierzoną oliwą. Smaż na patelni 5–7 minut z każdej strony lub piecz w air fryerze w 190°C przez 14–18 minut; środek musi osiągnąć 74°C.',
 'Wymieszaj skyr z musztardą, sokiem cytryny i przeciśniętym czosnkiem. Gęstość wyreguluj łyżeczką wody.',
 'Odstaw kurczaka na 3 minuty i pokrój. Porwij sałatę, przekrój pomidorki, wymieszaj z sosem; dodaj mięso, parmezan i grzanki tuż przed podaniem.'
 ],[['n_kurczak',200],['c_croutons',60]]),
 dish('grecka','Sałatka grecka z ciecierzycą','Sałatki',15,['no-cook'],[['c_chickpeas',130],['c_feta_light',60],['n_ogorek',150],['n_pomidor',150],['n_papryka',100],['c_red_onion',30],['c_olives',25],['n_oliwa',6],['n_cytryna',10]],[
 'Użyj ugotowanej ciecierzycy lub konserwowej: opłucz, odsącz i odważ 130 g. Nie używaj suchej bez ugotowania.',
 'Umyj warzywa. Ogórek, pomidor i paprykę pokrój w kostkę, cebulę w cienkie piórka.',
 'Wymieszaj oliwę z sokiem cytryny, pieprzem i szczyptą oregano; sól dodaj oszczędnie ze względu na fetę i oliwki.',
 'Połącz warzywa z ciecierzycą i odsączonymi oliwkami. Polej sosem, dodaj pokruszoną fetę i delikatnie wymieszaj; podawaj od razu.'
 ],[['c_chickpeas',220],['c_feta_light',80]]),
 dish('makaronowa-pesto','Sałatka makaronowa z pesto i mozzarellą','Sałatki',25,['stovetop'],[['makaron',60],['c_mozzarella_light',80],['c_tomatoes',150],['n_rukola',50],['c_pesto',20],['n_kurczak',100]],[
 'Zagotuj wodę, wsyp odważony suchy makaron i gotuj al dente według opakowania, zwykle 8–12 minut. Zachowaj 2 łyżki wody, odcedź.',
 'Kurczaka pokrój w paski i dopraw. Na patelni nieprzywierającej smaż bez dodatkowego tłuszczu 8–10 minut, obracając; w razie przywierania dodaj łyżkę wody. Mięso powinno osiągnąć 74°C.',
 'Umyj rukolę i pomidorki. Pomidorki przekrój, odsącz mozzarellę i pokrój w kostkę.',
 'Letni makaron wymieszaj z pesto i zachowaną wodą. Dodaj kurczaka, pomidorki, mozzarellę i rukolę, dopraw pieprzem; schłodź lub podaj letnie.'
 ],[['makaron',110],['n_kurczak',150]]),
 dish('halloumi-granat','Sałatka z halloumi i granatem','Sałatki',25,['stovetop'],[['c_halloumi',80],['c_leaves',100],['c_pomegranate',60],['n_ogorek',100],['c_tomatoes',100],['c_bulgur',40],['n_jogurt',70],['n_cytryna',10]],[
 'Kaszę bulgur wsyp do wrzącej wody i gotuj według opakowania, zwykle 10–15 minut; odcedź i rozłóż, żeby przestygła.',
 'Umyj i osusz sałaty, ogórek i pomidorki. Pokrój warzywa i odważ same ziarenka granatu.',
 'Halloumi osusz i pokrój w plastry. Na suchej patelni nieprzywierającej smaż po 2–3 minuty z każdej strony do zrumienienia.',
 'Jogurt wymieszaj z sokiem cytryny i pieprzem. Połącz kaszę i warzywa, polej sosem, ułóż ciepły ser i posyp granatem.'
 ],[['c_halloumi',100],['c_bulgur',80]]),
 dish('tunczyk-jajko','Sałatka z tuńczykiem i jajkiem','Sałatki',30,['stovetop'],[['c_tuna',120],['n_jajko',55],['n_ziemniak',160],['n_fasolka',120],['c_tomatoes',120],['salata',70],['n_jogurt',60],['musztarda',8],['n_oliwa',5]],[
 'Ziemniaki obierz, odważ i pokrój na równe kawałki. Gotuj w wodzie 15–20 minut do miękkości, następnie odcedź.',
 'Jajko ugotuj na twardo przez 9–10 minut od zagotowania, schłodź i obierz. Fasolkę gotuj osobno 8–12 minut do miękkości; odcedź.',
 'Umyj i osusz sałatę oraz pomidorki. Odważ odsączonego tuńczyka, jajko pokrój na ćwiartki.',
 'Jogurt wymieszaj z musztardą i oliwą. Ułóż warzywa, letnie ziemniaki, tuńczyka i jajko, polej sosem i dopraw pieprzem.'
 ],[['c_tuna',160],['n_ziemniak',300]]),
 dish('azjatycka-chrupiaca','Sałatka azjatycka z chrupiącym kurczakiem','Sałatki',30,['air-fryer'],[['n_kurczak',160],['c_napa',120],['n_marchew',80],['n_ogorek',100],['c_edamame',70],['n_panko',20],['n_jajko',25],['n_sojowy',12],['n_miod',8],['c_sesame_oil',5],['c_lime',10]],[
 'Kapustę, marchew i ogórek umyj i pokrój w cienkie paski. Użyj ugotowanych ziaren edamame bez strąków; jeśli mrożone wymagają gotowania, przygotuj według opakowania i odważ po odsączeniu.',
 'Kurczaka pokrój w równe paski, obtocz w odważonym roztrzepanym jajku, a potem w panko; wykorzystaj całą odmierzoną panierkę.',
 'Ułóż kurczaka w jednej warstwie w air fryerze. Piecz w 190°C przez 14–18 minut, obróć w połowie; temperatura wewnątrz mięsa musi osiągnąć 74°C.',
 'Wymieszaj sos sojowy, miód, olej sezamowy i sok limonki. Połącz warzywa z edamame oraz sosem i dodaj kurczaka tuż przed podaniem, żeby panierka nie zmiękła.'
 ],[['n_kurczak',210],['n_panko',30],['n_ryz',60]]),
 dish('lotus','Serniczek Lotus w pucharku','Deserki',10,['no-cook'],[['pl_skyr_wanilia',170],['n_twarog',80],['c_lotus',20],['c_lotus_cream',12],['mleko',20]],[
 'Rozgnieć twaróg widelcem i dokładnie utrzyj ze skyrem oraz mlekiem, aż powstanie możliwie gładki krem.',
 'Pokrusz ciastka Lotus; połowę wsyp na dno pucharka, resztę odłóż do posypania.',
 'Na ciasteczka wyłóż krem twarogowy. Krem Lotus rozetrzyj łyżeczką, aby łatwiej go rozprowadzić, i ułóż na wierzchu.',
 'Posyp pozostałymi ciastkami. Podawaj od razu albo schłodź; chrupiącą posypkę dodaj dopiero przed jedzeniem.'
 ]),
 dish('tiramisu','Tiramisu proteinowe','Deserki',15,['no-cook'],[['n_skyr',180],['c_mascarpone',35],['c_ladyfingers',25],['c_espresso',50],['n_kakao',5],['erytrytol',10]],[
 'Zaparz espresso i odstaw do całkowitego ostudzenia. Przygotuj pucharek mieszczący jedną porcję.',
 'Mascarpone rozetrzyj ze skyrem i drobno zmielonym erytrytolem; mieszaj krótko do jednolitego kremu.',
 'Biszkopty szybko zanurzaj w chłodnej kawie, nie mocz długo. Układaj naprzemiennie biszkopty i krem, kończąc kremem.',
 'Przykryj i chłodź co najmniej 2 godziny. Przed podaniem oprósz całą odmierzoną porcją kakao. Czas aktywny: 15 minut, chłodzenie dodatkowo.'
 ]),
 dish('mus-czekoladowy','Mus czekoladowy ze skyrem','Deserki',10,['blender'],[['n_skyr',180],['c_dark_chocolate',20],['n_kakao',8],['n_banan',70],['mleko',30]],[
 'Odważ obrany banan i pokrój. Czekoladę drobno posiekaj, aby łatwo połączyła się z masą.',
 'W małym rondelku podgrzej mleko bez zagotowania. Zdejmij z ognia, dodaj czekoladę i mieszaj do rozpuszczenia; przestudź.',
 'Do blendera włóż skyr, banan i kakao, wlej letnią czekoladę z mlekiem. Blenduj 30–60 sekund, zgarniając masę ze ścianek.',
 'Przełóż do pucharka. Podawaj od razu lub chłodź 30 minut dla bardziej zwartej konsystencji; chłodzenie poza czasem aktywnym.'
 ]),
 dish('kinder-bueno','Deser Kinder Bueno','Deserki',10,['no-cook'],[['pl_skyr_wanilia',170],['n_serek_light',50],['c_bueno',22],['c_hazelnuts',10],['n_kakao',5]],[
 'Skyr waniliowy utrzyj z serkiem śmietankowym light do jednolitego kremu.',
 'Podziel krem na dwie części; do jednej przesiej kakao i dokładnie wymieszaj bez grudek.',
 'Orzechy posiekaj, wafelek pokrój. W pucharku ułóż jasny i kakaowy krem naprzemiennie.',
 'Na wierzchu ułóż cały odważony wafelek i orzechy. Podawaj od razu, aby zachować chrupkość; przy chłodzeniu dodaj je na końcu.'
 ]),
 dish('chia-mango','Pudding chia z mango','Deserki',10,['no-cook'],[['c_chia',25],['mleko',140],['n_skyr',130],['c_mango',120],['c_coconut',5]],[
 'Nasiona chia wymieszaj dokładnie z mlekiem i skyrem w słoiczku. Sprawdź, czy na dnie nie zostały suche nasiona.',
 'Po 10 minutach ponownie energicznie wymieszaj, aby rozbić grudki; przykryj.',
 'Wstaw do lodówki na minimum 4 godziny, najlepiej na noc. Czas aktywny wynosi 10 minut, pęcznienie dodatkowo.',
 'Odważ miąższ mango i pokrój w drobną kostkę lub rozgnieć. Wyłóż na zgęstniały pudding i posyp wiórkami kokosowymi.'
 ]),
 dish('crumble','Crumble jabłkowe ze skyrem','Deserki',25,['oven','air-fryer'],[['pl_jablko',170],['n_platki',35],['pl_maka',15],['maslo',8],['pl_cynamon',2],['pl_skyr_wanilia',150]],[
 'Rozgrzej piekarnik do 190°C lub air fryer do 180°C. Jabłko bez gniazda nasiennego odważ i pokrój w drobną kostkę.',
 'Jabłko wymieszaj z cynamonem, przełóż do małego żaroodpornego naczynia; dodaj łyżkę wody, aby nie wyschło.',
 'Płatki i mąkę rozetrzyj palcami z masłem do luźnej kruszonki. Rozsyp równomiernie na jabłku.',
 'Piecz 18–20 minut w piekarniku lub 15–18 minut w air fryerze, aż jabłko zmięknie i kruszonka się zezłoci. Odstaw na 3 minuty, podaj ze skyrem.'
 ]),
 dish('brownie-fasola','Brownie z czerwonej fasoli','Deserki',30,['oven','blender'],[['n_fasola',120],['n_jajko',55],['n_kakao',15],['n_banan',80],['c_dark_chocolate',15],['pl_proszek',4],['n_skyr',100]],[
 'Rozgrzej piekarnik do 180°C. Fasolę z puszki dokładnie opłucz i odsącz; odważ 120 g. Przygotuj małą formę wyłożoną papierem.',
 'Zblenduj fasolę, obrany banan, jajko i kakao na gładką masę; zgarnij boki i blenduj ponownie, aby nie zostały skórki.',
 'Wmieszaj proszek do pieczenia i posiekaną czekoladę. Przełóż do formy, warstwa około 2–3 cm.',
 'Piecz 20–23 minuty, aż środek będzie ścięty (minimum 74°C), lecz nie wysuszony. Przestudź przed wyjęciem, podaj z odważonym skyrem; studzenie poza czasem aktywnym.'
 ]),
 dish('baskijski','Mini serniczek baskijski','Deserki',30,['air-fryer','oven'],[['c_cheesecake',140],['n_skyr',100],['n_jajko',55],['c_sugar',15],['c_potato_starch',8]],[
 'Rozgrzej piekarnik do 220°C lub air fryer do 200°C. Małą foremkę około 10–12 cm wyłóż papierem do pieczenia z wysokim brzegiem.',
 'Twaróg sernikowy wymieszaj ze skyrem i cukrem. Dodaj jajko i odrobinę wanilii; mieszaj bez silnego napowietrzania.',
 'Przesiej skrobię ziemniaczaną do masy, wymieszaj do zaniku grudek. Przelej do foremki i delikatnie stuknij nią o blat.',
 'Piecz 20–25 minut w piekarniku lub 18–23 minuty w air fryerze: wierzch ma mocno się zrumienić, środek delikatnie drżeć, ale osiągnąć 74°C. Studź w formie, potem chłodź minimum 3 godziny; studzenie i chłodzenie dodatkowo.'
 ]),
 dish('bibimbap','Bibimbap z wołowiną','Azjatyckie',35,['stovetop'],[['c_beef_mince',150],['n_ryz',60],['n_marchew',70],['n_szpinak',70],['n_ogorek',80],['n_pieczarki',80],['n_jajko',55],['n_gochujang',15],['n_sojowy',12],['c_sesame_oil',5]],[
 'Ryż przepłucz i gotuj pod przykryciem według opakowania, zwykle 12–15 minut. Marchew pokrój w słupki, pieczarki w plastry, ogórek w półplasterki.',
 'Połowę oleju rozgrzej na patelni. Smaż marchew i pieczarki 5–7 minut, następnie szpinak 1–2 minuty; przełóż oddzielnie do miski.',
 'Na pozostałym oleju smaż mieloną wołowinę 7–9 minut, rozdrabniając; dodaj połowę sosu sojowego. Mięso mielone musi osiągnąć 71°C.',
 'Na tej samej patelni usmaż jajko pod przykryciem do ścięcia białka i żółtka. Gochujang wymieszaj z resztą sosu sojowego i łyżką wody.',
 'Ułóż ryż, mięso i warzywa w misce, dodaj ogórek i jajko. Polej sosem, wymieszaj przed jedzeniem.'
 ],[['c_beef_mince',200],['n_ryz',110]]),
 dish('satay','Kurczak satay z ryżem','Azjatyckie',30,['stovetop','grill'],[['n_kurczak',180],['n_ryz',55],['n_maslo_orzechowe',20],['c_coconut_light',70],['n_sojowy',12],['c_lime',15],['n_ogorek',100],['n_marchew',80]],[
 'Ryż przepłucz i gotuj według opakowania 12–15 minut. Kurczaka pokrój w równe paski, wymieszaj z połową sosu sojowego.',
 'Kurczaka smaż na nieprzywierającej patelni bez dodatkowego oleju lub grilluj 10–14 minut, obracając. Temperatura w środku musi osiągnąć 74°C.',
 'Masło orzechowe wymieszaj z mleczkiem kokosowym, pozostałym sosem sojowym i sokiem limonki. Podgrzewaj w małym rondelku 2–3 minuty na małym ogniu, rozrzedź wodą w razie potrzeby.',
 'Umyj ogórek i marchew, pokrój w słupki. Podaj kurczaka z ryżem, warzywami i całą odmierzoną porcją sosu.'
 ],[['n_kurczak',230],['n_ryz',110],['c_coconut_light',85],['n_maslo_orzechowe',25]]),
 dish('udon','Udon z wołowiną i warzywami','Azjatyckie',25,['stovetop'],[['n_wolowina',160],['c_udon',170],['n_brokul',130],['n_papryka',100],['n_sojowy',18],['c_oyster',12],['n_miod',8],['c_sesame_oil',5],['c_garlic',5]],[
 'Wołowinę pokrój cienko w poprzek włókien, paprykę w paski, brokuł na małe różyczki, czosnek posiekaj.',
 'Świeży udon przygotuj według opakowania, zwykle 2–3 minuty we wrzątku, i odcedź. Brokuł podgotuj 3–4 minuty lub użyj paru łyżek wody do podduszenia w woku.',
 'Rozgrzej olej w woku lub na dużej patelni. Obsmaż wołowinę 3–5 minut, aż osiągnie co najmniej 63°C; przełóż i odstaw na 3 minuty.',
 'Na patelnię dodaj paprykę i brokuł, smaż 4–5 minut, dodając wodę zamiast kolejnego oleju. Czosnek dodaj na ostatnie 30 sekund.',
 'Wymieszaj sos sojowy, ostrygowy i miód. Dodaj udon oraz mięso do warzyw, polej sosem i mieszaj 1–2 minuty do równomiernego podgrzania.'
 ],[['n_wolowina',210],['c_udon',280]]),
 dish('tofu-chili','Chrupiące tofu sweet chili','Azjatyckie',30,['air-fryer','stovetop'],[['c_tofu',200],['n_ryz',55],['c_corn_starch',15],['c_sweet_chili',30],['n_sojowy',12],['n_brokul',150],['n_olej',6],['n_sezam',5]],[
 'Tofu dokładnie osusz papierem i pokrój w kostkę. Ryż przepłucz, gotuj według opakowania 12–15 minut.',
 'Tofu wymieszaj z połową sosu sojowego, obtocz w skrobi i pokryj odważonym olejem; wykorzystaj całą odmierzoną ilość.',
 'Piecz w air fryerze w 190°C przez 16–20 minut w jednej warstwie, potrząsając koszem w połowie. Brokuł ugotuj na parze lub we wrzątku 5–7 minut.',
 'Sweet chili wymieszaj z pozostałym sosem sojowym. Obtocz gorące tofu w sosie tuż przed podaniem, posyp sezamem i podaj z ryżem oraz brokułem.'
 ],[['c_tofu',250],['n_ryz',110]]),
 dish('oyakodon','Oyakodon — kurczak z jajkiem na ryżu','Azjatyckie',25,['stovetop'],[['n_kurczak',170],['n_jajko',110],['n_ryz',55],['n_cebula',90],['n_sojowy',15],['c_mirin',12],['c_stock',100],['szczypiorek',10]],[
 'Ryż przepłucz i gotuj pod przykryciem według opakowania 12–15 minut. Cebulę pokrój w cienkie piórka, kurczaka w kawałki około 2 cm.',
 'Na patelnię wlej bulion, sos sojowy i mirin. Dodaj cebulę, doprowadź do łagodnego wrzenia i gotuj 3–4 minuty.',
 'Dodaj kurczaka i duś pod przykryciem 8–10 minut, mieszając w połowie; mięso musi osiągnąć 74°C. W razie potrzeby dolej wody.',
 'Roztrzep jajka i wlej równomiernie na kurczaka. Przykryj i gotuj na małym ogniu 3–4 minuty do pełnego ścięcia jajek. Przełóż na ryż i posyp szczypiorkiem.'
 ],[['n_kurczak',220],['n_ryz',110]]),
 dish('orzo','Orzo cytrynowe z kurczakiem','Włoskie',30,['stovetop'],[['c_orzo',65],['n_kurczak',170],['n_szpinak',100],['n_parmezan',20],['pl_smietanka',60],['c_stock',150],['n_cytryna',20],['n_oliwa',5]],[
 'Kurczaka pokrój w małą kostkę, dopraw. Szpinak opłucz, cytrynę umyj; odważ miąższ i sok, zachowaj odrobinę startej skórki.',
 'Rozgrzej odmierzoną oliwę na patelni. Smaż kurczaka 6–8 minut, obracając, do 74°C w środku, następnie przełóż na talerz.',
 'Na patelnię wsyp orzo, wlej bulion i około 100 ml wody. Gotuj łagodnie 10–12 minut, często mieszając; dolewaj wodę, aż makaron będzie al dente.',
 'Dodaj szpinak, kurczaka i śmietankę, podgrzewaj 2–3 minuty. Zdejmij z ognia, wmieszaj parmezan i cytrynę; dopraw pieprzem, podaj od razu.'
 ],[['c_orzo',110],['n_kurczak',220]]),
 {...dish('gnocchi-sorrentina','Gnocchi alla sorrentina','Włoskie',30,['stovetop','oven'],[['n_gnocchi',180],['n_passata',200],['c_mozzarella_light',90],['n_parmezan',15],['n_bazylia',10],['n_oliwa',5],['c_garlic',5]],[
 'Rozgrzej piekarnik do 200°C. Mozzarellę odsącz i pokrój, czosnek posiekaj, bazylię opłucz.',
 'Rozgrzej oliwę na patelni, dodaj czosnek na 30 sekund bez rumienienia. Wlej passatę i gotuj 8–10 minut, dopraw pieprzem oraz szczyptą soli.',
 'Gnocchi ugotuj według opakowania, zwykle 2–3 minuty do wypłynięcia. Odcedź, połącz z sosem i połową bazylii.',
 'Przełóż do małego naczynia, dodaj mozzarellę i parmezan. Zapiekaj 10–12 minut, aż ser się rozpuści i zrumieni; posyp pozostałą bazylią.'
 ],[['n_gnocchi',280],['c_mozzarella_light',110]]),proteinVariant:{note:'Dodaj 120 g piersi kurczaka na porcję. Pokrój w kostkę, smaż bez dodatkowego oleju na nieprzywierającej patelni przez 8–10 minut do 74°C, w razie potrzeby dodając wodę. Wmieszaj do sosu przed zapiekaniem.',extra:[['n_kurczak',120]]}},
 dish('makaron-kremowy','Makaron w kremowym sosie pomidorowym (alla vodka bez alkoholu)','Włoskie',25,['stovetop'],[['makaron',70],['n_kurczak',160],['c_paste',40],['pl_smietanka',70],['n_parmezan',20],['n_cebula',50],['n_oliwa',5],['c_water',80]],[
 'Makaron ugotuj al dente według opakowania. Przed odcedzeniem zachowaj 80 ml wody z gotowania. Cebulę posiekaj, kurczaka pokrój w kostkę.',
 'Na odmierzonej oliwie smaż kurczaka 7–9 minut, obracając, do 74°C w środku. Przełóż na talerz.',
 'Na tej samej patelni zeszklij cebulę przez 3–4 minuty, dodaj łyżkę zachowanej wody, jeśli przywiera. Dodaj koncentrat i mieszaj 1–2 minuty.',
 'Wlej śmietankę oraz pozostałą wodę z makaronu, duś 2 minuty. Dodaj kurczaka i makaron, wymieszaj, zdejmij z ognia i wmieszaj parmezan. Dopraw pieprzem; nie dodawaj wódki.'
 ],[['makaron',110],['n_kurczak',210]]),
 dish('risotto','Risotto pieczarkowe z kurczakiem','Włoskie',35,['stovetop'],[['c_arborio',65],['n_kurczak',170],['n_pieczarki',180],['n_cebula',50],['n_parmezan',20],['c_stock',300],['maslo',8],['n_oliwa',5]],[
 'Bulion podgrzej i trzymaj gorący. Cebulę posiekaj, pieczarki pokrój w plastry, kurczaka w małą kostkę.',
 'Na oliwie smaż kurczaka 7–9 minut do 74°C w środku; przełóż. Na tej samej patelni smaż pieczarki 4–5 minut, aż odparują, i odłóż do mięsa.',
 'Na patelnię dodaj połowę masła i cebulę, zeszklij 2–3 minuty. Wsyp ryż, mieszaj minutę, następnie dolewaj gorący bulion po jednej chochelce.',
 'Gotuj ryż 18–20 minut, często mieszając i dolewając bulion po wchłonięciu poprzedniej porcji. Jeśli bulion się skończy, użyj gorącej wody.',
 'Gdy ryż jest al dente, dodaj mięso i pieczarki, podgrzewaj 2 minuty. Zdejmij z ognia, wmieszaj pozostałe masło i parmezan; odstaw na minutę i podaj.'
 ],[['c_arborio',110],['n_kurczak',220],['c_stock',450]]),
 dish('parmigiana','Parmigiana z bakłażana z kurczakiem','Włoskie',45,['oven'],[['c_eggplant',250],['n_passata',200],['c_mozzarella_light',100],['n_parmezan',20],['n_oliwa',8],['n_bazylia',10],['n_kurczak',130]],[
 'Rozgrzej piekarnik do 210°C. Bakłażan pokrój w plastry grubości około 7 mm i posmaruj odmierzoną oliwą. Kurczaka pokrój w równe paski, dopraw.',
 'Bakłażan rozłóż na papierze w jednej warstwie, piecz 15–18 minut, obracając w połowie. Kurczaka piecz w osobnym naczyniu 15–20 minut do 74°C w środku; używaj oddzielnych przyborów do surowego mięsa.',
 'Mozzarellę odsącz i pokrój. Passatę dopraw pieprzem i posiekaną połową bazylii. W małym naczyniu układaj warstwami bakłażan, sos i mozzarellę.',
 'Wierzch posyp parmezanem i zapiekaj 15–18 minut w 200°C do zrumienienia i gorącego środka. Odstaw na 3 minuty, posyp bazylią i podaj z upieczonym kurczakiem.'
 ],[['n_kurczak',180],['n_gnocchi',180]]),
];