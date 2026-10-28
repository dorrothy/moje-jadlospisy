# Zadania
- [x] Dodać 24 przepisy: Sałatki 6, Deserki 8, Azjatyckie 5, Włoskie 5
- [x] Osobne makro gnocchi z kurczakiem i większe porcje dań głównych
- [x] Sprawdzić kolekcje, generator, zakupy i zachowanie istniejących danych
- [x] Lokalne zdjęcia Blob w IndexedDB: galeria, aparat, podgląd i zarządzanie
- [x] Kompresja, limity, obsługa błędów i kopia/import ze zdjęciami
- [x] Testy zdjęć, zachowania danych i przenoszenia między urządzeniami
- [x] Lodówka: składniki, ostrożne dopasowanie ilości, brakujące zakupy
- [x] Generator tygodnia: cele, preferencje, zamiany i zapis własnego tygodnia
- [x] Oceny, notatki, data gotowania, filtry i eksport/import lokalnych danych
- [x] Testy reguł i pełnych interakcji trzech funkcji
- [x] Dodać 20 przepisów „Polskie klasyki i zapiekanki” z osobnymi porcjami chłopaka
- [x] Dodać filtr sprzętu dla dotychczasowych i nowych przepisów
- [x] Sprawdzić gramatury, makro i pełną integrację bez zmiany obecnych danych
- [x] Dodać 24 pełne przepisy z dokładnymi gramaturami i zachować oryginalne tygodnie
- [x] Obliczenia z jawnej tabeli na 100 g i 12 oddzielnych porcji chłopaka
- [x] Sprawdzić makro, gramatury, wyszukiwanie, ulubione, tygodnie i zakupy
- [x] Zmiana nazwy i metadanych
- [x] Lokalne przepisy: formularz, edycja, kopia, usuwanie
- [x] Własne tygodnie i przypisywanie wszystkich przepisów
- [x] Wyszukiwanie i lista zakupów z własnymi danymi
- [x] Eksport/import i informacja o lokalności
- [x] Testy interakcji, PWA i GitHub Pages
Sprawdzenie: 15 testów; przeglądarka iPhone/desktop, CRUD, zapis po odświeżeniu, przypisania, zakupy, eksport/import. Konfiguracja PWA i GitHub Pages zachowana i przejrzana; offline opublikowanej wersji i wdrożenie GitHub Pages nie były uruchamiane w tej sesji.

Nowa kolekcja: 24 przepisy, 12 pełnych porcji chłopaka; 59 testów przeszło. Przepływ wyszukiwanie → ulubione → przepis → własny tydzień → zakupy i odświeżenie sprawdzony w przeglądarce. Oryginalne dane potwierdzone jako niezmienione.

Polskie klasyki: 20 przepisów, 15 oddzielnych wytrawnych porcji chłopaka; 87 testów przeszło. Filtry kolekcji i sprzętu, ulubione, osobna gramatura/makro, tworzenie tygodnia, przypisanie schabowego, zakupy i trwałe odhaczenie sprawdzone na 390×844; widok 1280×1800 bez poziomego przepełnienia. Brak błędów przeglądarki. Wdrożenie i offline po publikacji nie były wykonywane.

Lodówka, generator i oceny: zweryfikowano w przeglądarce na 390×844 brakujące ilości, dodatkowe zakupy i odhaczenie po reload, 5 gwiazdek/notatkę/datę po reload, filtr sprawdzone, 7 dni generatora, zamianę zupy, zapis tygodnia, eksport oraz import JSON. Widok 1280×1800 bez poziomego przepełnienia. Brak błędów przeglądarki; PWA i konfiguracja wdrożenia niezmienione.

Zdjęcia: 105 testów przeszło. Chromium 390×844: galeria, 3200×2400 → JPEG Blob 1600×1200, reload, główne/dodatkowe zdjęcie, zakończona zmiana, podgląd, usunięcie, błąd nieczytelnego HEIC bez utraty zdjęcia, eksport i import do pustego profilu. Własny przepis i kolizja ID importu: dwa odrębne przepisy z właściwymi zdjęciami. 1280×1800 bez przepełnienia, bez błędów przeglądarki. Fizyczny aparat i rzeczywisty dekoder HEIC na iOS nie były dostępne do testu; używany natywny wybór pliku/capture z bezpiecznym komunikatem błędu.
- [x] Estetyka: kolor i ikonka dla własnych tygodni (kafelki jak oryginalne, wybór w edytorze tygodnia)
