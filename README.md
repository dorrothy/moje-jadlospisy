# Moje przepisy

Let's cook — przepisy i 6 gotowych tygodni (PWA, po polsku). Bez bazy i logowania — ulubione, lista zakupów i liczba porcji zapisują się w localStorage.

## Edycja danych
- `src/data/recipes.ts` — przepisy (gramatury na 1 porcję), plan tygodni, wersje dla chłopaka.
- `src/data/ingredients.ts` — tabela składników: kcal/B/T/W na 100 g. `null` = „do uzupełnienia”.
Makro liczy się automatycznie i jest oznaczone jako szacunkowe.

## Deploy na GitHub Pages
1. Wypchnij repo na GitHub (gałąź `main`).
2. Settings → Pages → Source: **GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` buduje statyczny SPA z `BASE_PATH=/<nazwa-repo>/` i publikuje `dist/client` (z `404.html` dla głębokich linków).
Własna domena / repo `user.github.io`: ustaw `BASE_PATH=/`.

Lokalnie: `GITHUB_PAGES=1 BASE_PATH=/moje-4-tygodnie/ bun run build`.

## iPhone
Otwórz stronę w Safari → Udostępnij → „Do ekranu początkowego”. Tryb offline działa po pierwszym otwarciu opublikowanej wersji (nie w podglądzie edytora).

## Własne dane
Przycisk „Nowy przepis” w wyszukiwarce dodaje przepis lokalnie; składniki są na całość, ręczne kcal/B/T/W na porcję. Oryginalne makro pozostaje szacunkowe. W „Moje tygodnie” można tworzyć, nazywać, kopiować i usuwać tygodnie oraz przypisywać dowolne przepisy. Usunięcie własnego przepisu usuwa jego przypisania.

„Kopia danych” eksportuje/importuje JSON wszystkich własnych przepisów i tygodni. Import dodaje dane, nie nadpisuje istniejących; kolizje identyfikatorów są remapowane razem z przypisaniami. Ulubione i odhaczenia nie są eksportowane. Dane są przypisane do przeglądarki i domeny, nie synchronizują się między urządzeniami. Regularnie pobieraj kopię, zwłaszcza przed czyszczeniem przeglądarki lub zmianą domeny. Brak kont i backendu.


## GitHub Pages: dorrothy/moje-jadlospisy

Adres: https://dorrothy.github.io/moje-jadlospisy/

1. Repo → Settings → Pages → Source: **GitHub Actions**.
2. Każdy push na `main` uruchamia `.github/workflows/deploy.yml`: testy, build z bazą `/moje-jadlospisy/`, `404.html` dla odświeżania podstron i `sw.js` (offline).
3. Bez serwera, bazy danych i płatnych usług. Własne przepisy, zdjęcia, notatki i backupy zostają w przeglądarce (localStorage/IndexedDB) — nie trafiają do repo. Przenoszenie: Dane → eksport/import JSON.
