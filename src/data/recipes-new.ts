import type { Recipe } from './recipes';

// Wszystkie ilości na jedną porcję; masa jadalna przed obróbką, ryż i makaron suche.
export const newRecipes: Recipe[] = [
  {
    "id": "nowe-bajgiel-jajko",
    "name": "Bajgiel z jajkiem",
    "type": "sniadanie",
    "minutes": 12,
    "category": "Szybkie",
    "ingredients": [
      [
        "n_bajgiel",
        75
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_szynka",
        70
      ],
      [
        "n_cheddar",
        20
      ],
      [
        "n_skyr",
        40
      ],
      [
        "n_rukola",
        20
      ]
    ],
    "steps": [
      "Przekrój bajgiel i podpiecz połówki na suchej patelni przez 2–3 min. Umyj i osusz rukolę.",
      "Na patelni nieprzywierającej przygotuj jajko sadzone bez dodatkowego tłuszczu; dodaj łyżkę wody i przykryj, aż białko się zetnie.",
      "Na jajku ułóż cheddar i szynkę, podgrzej pod przykryciem przez minutę.",
      "Posmaruj bajgiel skyrem, dodaj rukolę i jajko z szynką oraz serem. Złóż i podaj."
    ],
    "rawWeights": true,
    "spices": "sól, pieprz"
  },
  {
    "id": "nowe-placuszki-twarogowe",
    "name": "Placuszki twarogowe",
    "type": "sniadanie",
    "minutes": 20,
    "category": "Proteinowe",
    "ingredients": [
      [
        "n_twarog",
        150
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_maka_owsiana",
        30
      ],
      [
        "n_skyr",
        100
      ],
      [
        "n_maliny",
        100
      ],
      [
        "n_olej",
        3
      ]
    ],
    "steps": [
      "Rozgnieć twaróg, wymieszaj z jajkiem i mąką owsianą. Odstaw na 5 min, aby masa zgęstniała.",
      "Patelnię nieprzywierającą posmaruj odmierzoną ilością oleju. Nakładaj małe porcje masy.",
      "Smaż na średnio małym ogniu 3–4 min z każdej strony, aż placuszki będą złote i ścięte w środku.",
      "Podawaj ze skyrem i malinami; mrożone maliny wcześniej rozmroź."
    ],
    "rawWeights": true
  },
  {
    "id": "nowe-quesadilla-sniadaniowa",
    "name": "Quesadilla śniadaniowa",
    "type": "sniadanie",
    "minutes": 15,
    "category": "Szybkie",
    "ingredients": [
      [
        "n_tortilla",
        60
      ],
      [
        "n_jajko",
        110
      ],
      [
        "n_szynka",
        60
      ],
      [
        "n_mozzarella",
        35
      ],
      [
        "n_pomidor",
        100
      ]
    ],
    "steps": [
      "Pokrój szynkę i odsączoną mozzarellę. Pomidora umyj i pokrój w plasterki.",
      "Roztrzep jajka z pieprzem i przygotuj jajecznicę na patelni nieprzywierającej bez dodatkowego tłuszczu.",
      "Na połowie tortilli ułóż jajka, szynkę i ser. Złóż na pół, podgrzewaj na suchej patelni 2–3 min z każdej strony.",
      "Pokrój quesadillę na trójkąty i podaj z pomidorem."
    ],
    "rawWeights": true,
    "spices": "pieprz, papryka słodka"
  },
  {
    "id": "nowe-miska-serek-wiejski",
    "name": "Wytrawna miska z serkiem wiejskim",
    "type": "sniadanie",
    "minutes": 15,
    "category": "Proteinowe",
    "ingredients": [
      [
        "n_serek_wiejski",
        200
      ],
      [
        "n_jajko",
        110
      ],
      [
        "n_awokado",
        40
      ],
      [
        "n_ogorek",
        100
      ],
      [
        "n_rzodkiewka",
        70
      ],
      [
        "n_chleb",
        45
      ]
    ],
    "steps": [
      "Jajka ugotuj na twardo przez 9–10 min, ostudź w zimnej wodzie i obierz.",
      "Umyj warzywa. Pokrój ogórka i rzodkiewki, odważ miąższ awokado bez pestki i skórki.",
      "Przełóż serek do miski, dodaj warzywa, awokado i połówki jajek. Dopraw.",
      "Podawaj z chlebem żytnim, ewentualnie podpieczonym na suchej patelni."
    ],
    "rawWeights": true,
    "spices": "sól, pieprz"
  },
  {
    "id": "nowe-owsianka-sernikowa",
    "name": "Owsianka sernikowa",
    "type": "sniadanie",
    "minutes": 15,
    "category": "Proteinowe",
    "ingredients": [
      [
        "n_platki",
        45
      ],
      [
        "n_skyr",
        180
      ],
      [
        "n_twarog",
        80
      ],
      [
        "n_truskawki",
        120
      ],
      [
        "n_biala_czekolada",
        8
      ]
    ],
    "steps": [
      "Płatki zalej 120–150 ml wody i gotuj na małym ogniu 5–7 min, mieszając.",
      "Twaróg rozgnieć ze skyrem na gładki krem. Umyj i pokrój truskawki.",
      "Owsiankę lekko przestudź, następnie wmieszaj krem twarogowy.",
      "Dodaj truskawki i posiekaną białą czekoladę. Podaj na ciepło lub schłodzoną."
    ],
    "rawWeights": true
  },
  {
    "id": "nowe-szakszuka-feta",
    "name": "Szakszuka z fetą",
    "type": "sniadanie",
    "minutes": 25,
    "category": "Śródziemnomorskie",
    "ingredients": [
      [
        "n_jajko",
        110
      ],
      [
        "n_passata",
        220
      ],
      [
        "n_feta",
        50
      ],
      [
        "n_szpinak",
        80
      ],
      [
        "n_cebula",
        50
      ],
      [
        "n_oliwa",
        5
      ],
      [
        "n_chleb",
        45
      ]
    ],
    "steps": [
      "Na odmierzonej oliwie zeszklij posiekaną cebulę przez 4–5 min.",
      "Wlej passatę, dodaj przyprawy i gotuj 5 min. Dodaj umyty szpinak i mieszaj, aż zwiędnie.",
      "Zrób dwa zagłębienia, wbij jajka i posyp pokruszoną fetą.",
      "Przykryj i gotuj na małym ogniu 6–8 min, aż białka się zetną. Podawaj z chlebem."
    ],
    "rawWeights": true,
    "spices": "kumin, papryka słodka, pieprz"
  },
  {
    "id": "nowe-muffinki-jajeczne",
    "name": "Muffinki jajeczne",
    "type": "sniadanie",
    "minutes": 30,
    "category": "Meal prep",
    "ingredients": [
      [
        "n_jajko",
        165
      ],
      [
        "n_szynka",
        70
      ],
      [
        "n_mozzarella",
        35
      ],
      [
        "n_szpinak",
        60
      ],
      [
        "n_papryka",
        100
      ],
      [
        "n_chleb",
        40
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 180°C. Umyj warzywa, posiekaj szpinak, pokrój paprykę i szynkę; odsącz mozzarellę.",
      "Roztrzep jajka, dodaj szynkę, warzywa i pokrojoną mozzarellę. Dopraw.",
      "Rozdziel całą masę do silikonowych foremek na 4–5 małych muffinek. Piecz 18–22 min, aż środek będzie ścięty.",
      "Odczekaj 3 min, wyjmij z foremek i podaj całą porcję z chlebem żytnim."
    ],
    "rawWeights": true,
    "spices": "pieprz, oregano"
  },
  {
    "id": "nowe-tosty-francuskie",
    "name": "Tosty francuskie",
    "type": "sniadanie",
    "minutes": 15,
    "category": "Na słodko",
    "ingredients": [
      [
        "n_tost",
        80
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_twarog",
        120
      ],
      [
        "n_skyr",
        80
      ],
      [
        "n_truskawki",
        100
      ],
      [
        "n_olej",
        3
      ]
    ],
    "steps": [
      "Roztrzep jajko z łyżką wody. Namocz krótko obie strony pieczywa, wykorzystując całą masę jajeczną.",
      "Patelnię posmaruj odmierzoną ilością oleju. Smaż tosty na średnim ogniu 2–3 min z każdej strony.",
      "Rozgnieć twaróg ze skyrem. Umyj i pokrój truskawki.",
      "Podawaj tosty z kremem twarogowym i truskawkami."
    ],
    "rawWeights": true,
    "spices": "cynamon"
  },
  {
    "id": "nowe-sniadanie-angielskie",
    "name": "Śniadanie angielskie",
    "type": "sniadanie",
    "minutes": 20,
    "category": "Sycące",
    "ingredients": [
      [
        "n_parowki",
        100
      ],
      [
        "n_jajko",
        110
      ],
      [
        "n_pieczarki",
        120
      ],
      [
        "n_pomidor",
        120
      ],
      [
        "n_chleb",
        45
      ],
      [
        "n_oliwa",
        5
      ]
    ],
    "steps": [
      "Oczyść i pokrój pieczarki, pomidora przekrój na pół. Na części odmierzonej oliwy podsmaż pieczarki 5–6 min.",
      "Dodaj pomidora przekrojoną stroną do patelni i smaż 3 min. Parówki podgrzej w gorącej wodzie zgodnie z etykietą.",
      "Na pozostałej oliwie przygotuj jajka sadzone, przykrywając patelnię do ścięcia białek.",
      "Ułóż jajka, parówki i warzywa na talerzu. Podaj z chlebem żytnim."
    ],
    "rawWeights": true,
    "spices": "sól, pieprz"
  },
  {
    "id": "nowe-wrap-losos",
    "name": "Wrap z łososiem",
    "type": "sniadanie",
    "minutes": 10,
    "category": "Szybkie",
    "ingredients": [
      [
        "n_tortilla",
        60
      ],
      [
        "n_losos_wedzony",
        100
      ],
      [
        "n_serek_light",
        60
      ],
      [
        "n_skyr",
        80
      ],
      [
        "n_ogorek",
        100
      ],
      [
        "n_rukola",
        30
      ]
    ],
    "steps": [
      "Umyj i osusz rukolę. Ogórka pokrój w cienkie słupki, łososia podziel na paski.",
      "Wymieszaj serek light ze skyrem i pieprzem.",
      "Posmaruj tortillę kremem, ułóż rukolę, łososia i ogórka. Zawiń ciasno, podwijając boki.",
      "Przekrój wrap na pół; nadmiar kremu i warzyw podaj obok."
    ],
    "rawWeights": true,
    "spices": "pieprz"
  },
  {
    "id": "nowe-owsianka-brownie",
    "name": "Pieczona owsianka brownie",
    "type": "sniadanie",
    "minutes": 35,
    "category": "Na słodko",
    "ingredients": [
      [
        "n_platki",
        45
      ],
      [
        "n_banan",
        80
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_skyr",
        180
      ],
      [
        "n_kakao",
        10
      ],
      [
        "n_maslo_orzechowe",
        10
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 180°C. Odważ banan bez skórki i rozgnieć go widelcem.",
      "Wymieszaj banana z jajkiem, płatkami, kakao i 80 g skyru. W razie potrzeby dodaj 1–2 łyżki wody.",
      "Przełóż do małego naczynia wyłożonego papierem. Na wierzchu rozprowadź masło orzechowe.",
      "Piecz 22–25 min, aż masa jajeczna będzie ścięta. Podaj z pozostałymi 100 g skyru."
    ],
    "rawWeights": true
  },
  {
    "id": "nowe-kanapki-pasztet",
    "name": "Kanapki z pasztetem",
    "type": "sniadanie",
    "minutes": 15,
    "category": "Szybkie",
    "ingredients": [
      [
        "n_chleb",
        80
      ],
      [
        "n_pasztet",
        60
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_skyr",
        100
      ],
      [
        "n_kiszony",
        100
      ]
    ],
    "steps": [
      "Jajko ugotuj na twardo przez 9–10 min, ostudź i obierz.",
      "Odsącz ogórka kiszonego i pokrój w plasterki. Jajko również pokrój.",
      "Posmaruj chleb pasztetem, ułóż jajko i ogórka. Dopraw pieprzem.",
      "Podaj skyr osobno jako wytrawny dodatek do kanapek."
    ],
    "rawWeights": true,
    "spices": "pieprz"
  },
  {
    "id": "nowe-kurczak-toskanski",
    "name": "Kurczak po toskańsku",
    "type": "kolacja",
    "minutes": 30,
    "category": "Śródziemnomorskie",
    "ingredients": [
      [
        "n_kurczak",
        190
      ],
      [
        "n_ryz",
        45
      ],
      [
        "n_szpinak",
        100
      ],
      [
        "n_suszone",
        35
      ],
      [
        "n_smietanka",
        65
      ],
      [
        "n_parmezan",
        15
      ],
      [
        "n_oliwa",
        5
      ]
    ],
    "steps": [
      "Ugotuj odważony suchy ryż według instrukcji na opakowaniu. Kurczaka pokrój w paski i dopraw.",
      "Obsmaż mięso na odmierzonej oliwie przez 5–6 min. Dodaj odsączone suszone pomidory i umyty szpinak.",
      "Wlej śmietankę i 2–3 łyżki wody, duś 6–8 min; kurczak powinien osiągnąć 74°C w środku.",
      "Wmieszaj starty parmezan i podawaj z ryżem."
    ],
    "rawWeights": true,
    "spices": "czosnek granulowany, pieprz, oregano",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          240
        ],
        [
          "n_ryz",
          110
        ],
        [
          "n_szpinak",
          100
        ],
        [
          "n_suszone",
          35
        ],
        [
          "n_smietanka",
          65
        ],
        [
          "n_parmezan",
          15
        ],
        [
          "n_oliwa",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-pulpety-teriyaki",
    "name": "Pulpety teriyaki",
    "type": "kolacja",
    "minutes": 35,
    "category": "Azjatyckie",
    "ingredients": [
      [
        "n_indyk",
        200
      ],
      [
        "n_ryz",
        45
      ],
      [
        "n_brokul",
        220
      ],
      [
        "n_teriyaki",
        35
      ],
      [
        "n_jajko",
        25
      ],
      [
        "n_sezam",
        10
      ],
      [
        "n_olej",
        5
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 190°C. Wymieszaj mięso z odważonym roztrzepanym jajkiem i pieprzem, uformuj małe pulpety.",
      "Ułóż na papierze, posmaruj odmierzonym olejem. Piecz 20–25 min do 74°C w środku.",
      "W tym czasie ugotuj ryż i brokuł w wodzie lub na parze przez 5–7 min.",
      "Podgrzej teriyaki z łyżką wody, obtocz pulpety w sosie. Podaj z ryżem i brokułem, posyp sezamem."
    ],
    "rawWeights": true,
    "spices": "pieprz, imbir mielony",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_indyk",
          250
        ],
        [
          "n_ryz",
          110
        ],
        [
          "n_brokul",
          220
        ],
        [
          "n_teriyaki",
          35
        ],
        [
          "n_jajko",
          25
        ],
        [
          "n_sezam",
          10
        ],
        [
          "n_olej",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-grecki-bowl",
    "name": "Grecki bowl",
    "type": "kolacja",
    "minutes": 40,
    "category": "Śródziemnomorskie",
    "ingredients": [
      [
        "n_kurczak",
        190
      ],
      [
        "n_ziemniak",
        220
      ],
      [
        "n_feta",
        45
      ],
      [
        "n_jogurt",
        100
      ],
      [
        "n_ogorek",
        120
      ],
      [
        "n_pomidor",
        120
      ],
      [
        "n_oliwa",
        10
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 200°C. Pokrój ziemniaki w niewielkie kawałki, wymieszaj z połową oliwy i oregano; piecz 15 min.",
      "Dopraw kurczaka, posmaruj pozostałą oliwą i dodaj do ziemniaków. Piecz kolejne 18–22 min, aż ziemniaki zmiękną, a mięso osiągnie 74°C.",
      "Połowę ogórka zetrzyj, odciśnij i wymieszaj z jogurtem oraz czosnkiem granulowanym. Resztę ogórka i pomidora pokrój.",
      "Ułóż kurczaka, ziemniaki i warzywa w misce, dodaj tzatziki i pokruszoną fetę."
    ],
    "rawWeights": true,
    "spices": "oregano, czosnek granulowany, pieprz",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          240
        ],
        [
          "n_ziemniak",
          380
        ],
        [
          "n_feta",
          45
        ],
        [
          "n_jogurt",
          100
        ],
        [
          "n_ogorek",
          120
        ],
        [
          "n_pomidor",
          120
        ],
        [
          "n_oliwa",
          10
        ]
      ]
    }
  },
  {
    "id": "nowe-lasagne-soup",
    "name": "Lasagne soup",
    "type": "kolacja",
    "minutes": 35,
    "category": "Jednogarnkowe",
    "ingredients": [
      [
        "n_indyk",
        200
      ],
      [
        "n_lasagne",
        50
      ],
      [
        "n_passata",
        250
      ],
      [
        "n_mozzarella",
        60
      ],
      [
        "n_cebula",
        70
      ],
      [
        "n_marchew",
        80
      ],
      [
        "n_oliwa",
        5
      ]
    ],
    "steps": [
      "Na oliwie zeszklij posiekaną cebulę, dodaj drobno pokrojoną marchew i smaż 3 min.",
      "Dodaj indyka, rozbijaj grudki i smaż 5–6 min. Wlej passatę oraz 250–350 ml gorącej wody, dopraw.",
      "Wrzuć połamane suche płaty lasagne. Gotuj 10–15 min, mieszając i dolewając wodę, aż makaron zmięknie, a mięso będzie ugotowane.",
      "Zdejmij z ognia, dodaj odsączoną mozzarellę i mieszaj do częściowego rozpuszczenia."
    ],
    "rawWeights": true,
    "spices": "oregano, bazylia suszona, pieprz",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_indyk",
          250
        ],
        [
          "n_lasagne",
          110
        ],
        [
          "n_passata",
          250
        ],
        [
          "n_mozzarella",
          60
        ],
        [
          "n_cebula",
          70
        ],
        [
          "n_marchew",
          80
        ],
        [
          "n_oliwa",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-katsu-curry",
    "name": "Chicken Katsu Curry",
    "type": "kolacja",
    "minutes": 40,
    "category": "Azjatyckie",
    "ingredients": [
      [
        "n_kurczak",
        190
      ],
      [
        "n_ryz",
        50
      ],
      [
        "n_panko",
        25
      ],
      [
        "n_jajko",
        30
      ],
      [
        "n_cebula",
        70
      ],
      [
        "n_marchew",
        100
      ],
      [
        "n_curry",
        8
      ],
      [
        "n_olej",
        10
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 200°C. Kurczaka spłaszcz, obtocz w odważonym jajku i panko. Ułóż na papierze, skrop połową oleju.",
      "Piecz 20–25 min, obracając w połowie, do 74°C w środku. Ugotuj ryż zgodnie z opakowaniem.",
      "Na pozostałym oleju podsmaż cebulę i marchew. Dodaj odważone curry w proszku oraz 200–250 ml wody; duś 15 min do miękkości.",
      "Zmiksuj warzywa na gęsty sos, dopraw. Pokrój kotlet w paski i podaj z ryżem i sosem; wykorzystaj całą panierkę."
    ],
    "rawWeights": true,
    "spices": "sól, pieprz",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          240
        ],
        [
          "n_ryz",
          115
        ],
        [
          "n_panko",
          25
        ],
        [
          "n_jajko",
          30
        ],
        [
          "n_cebula",
          70
        ],
        [
          "n_marchew",
          100
        ],
        [
          "n_curry",
          8
        ],
        [
          "n_olej",
          10
        ]
      ]
    }
  },
  {
    "id": "nowe-enchilada",
    "name": "Zapiekanka enchilada",
    "type": "kolacja",
    "minutes": 35,
    "category": "Meksykańskie",
    "ingredients": [
      [
        "n_kurczak",
        180
      ],
      [
        "n_tortilla",
        60
      ],
      [
        "n_fasola",
        90
      ],
      [
        "n_papryka",
        120
      ],
      [
        "n_passata",
        180
      ],
      [
        "n_mozzarella",
        60
      ],
      [
        "n_oliwa",
        5
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 190°C. Pokrój kurczaka i paprykę drobno, odsącz fasolę oraz mozzarellę.",
      "Na oliwie obsmaż kurczaka, dodaj paprykę i smaż do miękkości. Wmieszaj fasolę, 60 g passaty i przyprawy.",
      "Napełnij tortillę częścią farszu, zwiń i ułóż w małym naczyniu. Nadmiar farszu umieść obok, aby wykorzystać wszystkie składniki.",
      "Zalej pozostałą passatą, posyp serem. Piecz 15–18 min, aż ser się rozpuści, a kurczak osiągnie 74°C."
    ],
    "rawWeights": true,
    "spices": "kumin, papryka wędzona, czosnek granulowany, chili",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          230
        ],
        [
          "n_tortilla",
          120
        ],
        [
          "n_fasola",
          90
        ],
        [
          "n_papryka",
          120
        ],
        [
          "n_passata",
          180
        ],
        [
          "n_mozzarella",
          60
        ],
        [
          "n_oliwa",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-losos-cytrynowy",
    "name": "Łosoś cytrynowo-koperkowy",
    "type": "kolacja",
    "minutes": 35,
    "category": "Ryby",
    "ingredients": [
      [
        "n_losos",
        170
      ],
      [
        "n_ziemniak",
        230
      ],
      [
        "n_fasolka",
        220
      ],
      [
        "n_skyr",
        100
      ],
      [
        "n_oliwa",
        5
      ],
      [
        "n_cytryna",
        30
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 200°C. Ziemniaki pokrój i ugotuj do miękkości, około 15–20 min.",
      "Łososia posmaruj oliwą, dopraw i skrop częścią odważonego soku z cytryny. Piecz 12–18 min, do około 63°C w środku.",
      "Fasolkę oczyść i gotuj w wodzie 8–12 min do miękkości; nie podawaj surowej.",
      "Skyr wymieszaj z pozostałą cytryną i suszonym koperkiem. Podawaj z rybą, ziemniakami i fasolką."
    ],
    "rawWeights": true,
    "spices": "koperek suszony, pieprz, sól",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_losos",
          220
        ],
        [
          "n_ziemniak",
          400
        ],
        [
          "n_fasolka",
          220
        ],
        [
          "n_skyr",
          100
        ],
        [
          "n_oliwa",
          5
        ],
        [
          "n_cytryna",
          30
        ]
      ]
    }
  },
  {
    "id": "nowe-thai-basil",
    "name": "Thai Basil Chicken",
    "type": "kolacja",
    "minutes": 25,
    "category": "Azjatyckie",
    "ingredients": [
      [
        "n_mielony_kurczak",
        200
      ],
      [
        "n_ryz",
        50
      ],
      [
        "n_jajko",
        55
      ],
      [
        "n_papryka",
        120
      ],
      [
        "n_cebula",
        60
      ],
      [
        "n_sojowy",
        20
      ],
      [
        "n_olej",
        8
      ],
      [
        "n_bazylia",
        15
      ]
    ],
    "steps": [
      "Ugotuj ryż. Pokrój paprykę i cebulę, umyj oraz osusz bazylię.",
      "Na 5 g oleju podsmaż warzywa, dodaj mielonego kurczaka. Smaż, rozbijając grudki, do pełnego ugotowania mięsa (74°C).",
      "Dodaj sos sojowy i 2 łyżki wody, podgrzewaj 2 min. Zdejmij z ognia i wmieszaj bazylię.",
      "Na pozostałych 3 g oleju usmaż jajko sadzone do ścięcia białka. Podaj na ryżu z mięsem i warzywami."
    ],
    "rawWeights": true,
    "spices": "chili, czosnek granulowany",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_mielony_kurczak",
          250
        ],
        [
          "n_ryz",
          115
        ],
        [
          "n_jajko",
          55
        ],
        [
          "n_papryka",
          120
        ],
        [
          "n_cebula",
          60
        ],
        [
          "n_sojowy",
          20
        ],
        [
          "n_olej",
          8
        ],
        [
          "n_bazylia",
          15
        ]
      ]
    }
  },
  {
    "id": "nowe-stroganow",
    "name": "Stroganow wołowy",
    "type": "kolacja",
    "minutes": 55,
    "category": "Domowe",
    "ingredients": [
      [
        "n_wolowina",
        190
      ],
      [
        "n_ziemniak",
        240
      ],
      [
        "n_pieczarki",
        180
      ],
      [
        "n_cebula",
        70
      ],
      [
        "n_jogurt",
        100
      ],
      [
        "n_kiszony",
        80
      ],
      [
        "n_oliwa",
        10
      ]
    ],
    "steps": [
      "Wołowinę pokrój w cienkie paski w poprzek włókien. Na połowie oliwy obsmaż krótko w partiach i odłóż.",
      "Na pozostałej oliwie podsmaż cebulę i pieczarki przez 6–8 min. Dodaj mięso oraz 100–150 ml wody.",
      "Duś na małym ogniu 25–40 min do miękkości, zależnie od kawałka mięsa. W tym czasie ugotuj ziemniaki; pod koniec duszenia dodaj pokrojonego ogórka.",
      "Zdejmij patelnię z ognia. Jogurt zahartuj kilkoma łyżkami sosu, wmieszaj bez ponownego gotowania. Podaj z ziemniakami."
    ],
    "rawWeights": true,
    "spices": "papryka słodka, pieprz, sól",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_wolowina",
          240
        ],
        [
          "n_ziemniak",
          400
        ],
        [
          "n_pieczarki",
          180
        ],
        [
          "n_cebula",
          70
        ],
        [
          "n_jogurt",
          100
        ],
        [
          "n_kiszony",
          80
        ],
        [
          "n_oliwa",
          10
        ]
      ]
    }
  },
  {
    "id": "nowe-gnocchi-kurczak",
    "name": "Gnocchi z kurczakiem",
    "type": "kolacja",
    "minutes": 30,
    "category": "Włoskie",
    "ingredients": [
      [
        "n_gnocchi",
        160
      ],
      [
        "n_kurczak",
        190
      ],
      [
        "n_passata",
        180
      ],
      [
        "n_mozzarella",
        60
      ],
      [
        "n_szpinak",
        100
      ],
      [
        "n_oliwa",
        5
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 200°C. Gnocchi ugotuj według opakowania, odsącz tuż po wypłynięciu.",
      "Kurczaka pokrój w kostkę i obsmaż na oliwie. Dodaj passatę, przyprawy i szpinak; duś 6–8 min do ugotowania mięsa.",
      "Wymieszaj sos z gnocchi, przełóż do naczynia, posyp odsączoną mozzarellą.",
      "Zapiekaj 10–12 min do roztopienia sera; przed podaniem sprawdź, czy mięso osiągnęło 74°C."
    ],
    "rawWeights": true,
    "spices": "oregano, czosnek granulowany, pieprz",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_gnocchi",
          280
        ],
        [
          "n_kurczak",
          240
        ],
        [
          "n_passata",
          180
        ],
        [
          "n_mozzarella",
          60
        ],
        [
          "n_szpinak",
          100
        ],
        [
          "n_oliwa",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-gochujang-kurczak",
    "name": "Korean Gochujang Chicken",
    "type": "kolacja",
    "minutes": 25,
    "category": "Azjatyckie",
    "ingredients": [
      [
        "n_kurczak",
        200
      ],
      [
        "n_ryz",
        50
      ],
      [
        "n_gochujang",
        20
      ],
      [
        "n_miod",
        10
      ],
      [
        "n_ogorek",
        120
      ],
      [
        "n_marchew",
        100
      ],
      [
        "n_sezam",
        10
      ],
      [
        "n_olej",
        5
      ]
    ],
    "steps": [
      "Ugotuj ryż. Umyj ogórka i marchew, pokrój je w cienkie słupki.",
      "Wymieszaj gochujang z miodem i 2–3 łyżkami wody. Kurczaka pokrój w kostkę.",
      "Na oleju smaż kurczaka 6–8 min. Dodaj sos i podgrzewaj 2–3 min do lekkiego zgęstnienia oraz 74°C w środku mięsa.",
      "Podaj kurczaka z ryżem i surowymi warzywami. Posyp sezamem."
    ],
    "rawWeights": true,
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          250
        ],
        [
          "n_ryz",
          115
        ],
        [
          "n_gochujang",
          20
        ],
        [
          "n_miod",
          10
        ],
        [
          "n_ogorek",
          120
        ],
        [
          "n_marchew",
          100
        ],
        [
          "n_sezam",
          10
        ],
        [
          "n_olej",
          5
        ]
      ]
    }
  },
  {
    "id": "nowe-shawarma-bowl",
    "name": "Shawarma bowl",
    "type": "kolacja",
    "minutes": 35,
    "category": "Bliskowschodnie",
    "ingredients": [
      [
        "n_kurczak",
        190
      ],
      [
        "n_ryz",
        45
      ],
      [
        "n_hummus",
        60
      ],
      [
        "n_papryka",
        130
      ],
      [
        "n_cukinia",
        120
      ],
      [
        "n_skyr",
        80
      ],
      [
        "n_oliwa",
        8
      ]
    ],
    "steps": [
      "Rozgrzej piekarnik do 200°C. Pokrój kurczaka w paski, paprykę i cukinię na niewielkie kawałki.",
      "Wymieszaj mięso i warzywa z odmierzoną oliwą, kuminem i czosnkiem granulowanym. Rozłóż na blasze.",
      "Piecz 20–25 min, mieszając w połowie, do miękkości warzyw i 74°C w środku kurczaka. W tym czasie ugotuj ryż.",
      "Skyr dopraw czosnkiem i pieprzem. Podawaj ryż z mięsem, warzywami, hummusem i sosem skyr."
    ],
    "rawWeights": true,
    "spices": "kumin, czosnek granulowany, papryka słodka, pieprz",
    "partner": {
      "note": "Oddzielna porcja: +50 g surowego mięsa lub ryby i większy dodatek skrobiowy; pozostałe składniki bez zmian. Przygotuj tak samo, wydłużając obróbkę w razie potrzeby.",
      "extra": [],
      "ingredients": [
        [
          "n_kurczak",
          240
        ],
        [
          "n_ryz",
          110
        ],
        [
          "n_hummus",
          60
        ],
        [
          "n_papryka",
          130
        ],
        [
          "n_cukinia",
          120
        ],
        [
          "n_skyr",
          80
        ],
        [
          "n_oliwa",
          8
        ]
      ]
    }
  }
];
