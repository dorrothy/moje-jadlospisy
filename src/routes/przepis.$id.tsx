import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Clock, Heart, Minus, Plus, Users } from "lucide-react";
import { OwnRecipePage } from "@/components/OwnRecipePage";
import { RecipeEditor } from "@/components/RecipeEditor";
import { Button } from "@/components/ui/button";
import { useLocalData } from "@/lib/local-data";
import { copyOriginal, type CustomRecipe } from "@/lib/custom-data";
import { useState } from "react";
import { recipeById } from "@/data/recipes";
import { ingredients } from "@/data/ingredients";
import { equipmentLabels, recipeEquipment } from '@/data/equipment';
import { computeMacros, itemMacros, typeLabel, weeksOfRecipe, formatGrams, recipeItems } from "@/lib/meals";
import { useFavorites } from "@/lib/storage";
import { RecipeReview, ReviewSummary } from '@/components/RecipeReview';
import { RecipePhotos } from '@/components/RecipePhotos';

export const Route = createFileRoute("/przepis/$id")({
  loader: ({ params }) => {
    const recipe = recipeById[params.id];
    if (!recipe && !params.id.startsWith("own-")) throw notFound();
    return { recipe };
  },
  head: ({ loaderData }) => {
    const n = loaderData?.recipe?.name ?? "Przepis";
    return {
      meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
        { title: `${n} — Moje przepisy` },
        { name: "description", content: `Przepis: ${n}. Gramatury na porcję, kroki i szacunkowe makro.` },
        { property: "og:title", content: n },
        { property: "og:description", content: "Gramatury na porcję, instrukcja krok po kroku, kcal i makro." },
      ],
    };
  },
  component: RecipePage,
});

function RecipePage() {
  const { id } = Route.useParams();
  const { data, ready } = useLocalData();
  const own = data.recipes.find(r => r.id === id);
  if (id.startsWith("own-")) {
    if (!ready) return <main className="p-4">Wczytywanie…</main>;
    return own ? <OwnRecipePage key={id} recipe={own} /> : <main className="p-4">Nie znaleziono przepisu. <Link to="/szukaj">Przepisy</Link></main>;
  }
  return <OriginalRecipePage />;
}
function OriginalRecipePage() {
  const { recipe } = Route.useLoaderData();
  const { update } = useLocalData();
  const [copy, setCopy] = useState<CustomRecipe | undefined>();
  const router = useRouter();
  const { isFav, toggle } = useFavorites();
  const [servings, setServings] = useState(1);
  const [forHim, setForHim] = useState(false);
  if (!recipe) return null;
  const m = computeMacros(recipe.ingredients);
  const partnerM = recipe.partner ? computeMacros(recipeItems(recipe, true)) : null;
  const shown = forHim && partnerM ? partnerM : m;
  const fav = isFav(recipe.id);

  return (
    <main className="px-4 pt-4">
      <div className="flex items-center justify-between">
        <button onClick={() => router.history.back()} className="-ml-2 inline-flex items-center rounded-full p-2 text-sm font-medium">
          <ChevronLeft className="h-5 w-5" /> Wróć
        </button>
        <button onClick={() => toggle(recipe.id)} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium text-primary shadow-soft">
          <Heart className={`h-4 w-4 ${fav ? "fill-primary" : ""}`} /> {fav ? "W ulubionych" : "Ulubione"}
        </button>
      </div>

      <Button variant="outline" className="mt-3" onClick={() => setCopy(copyOriginal(recipe.id))}>Duplikuj jako własny</Button>
      <RecipeReview id={recipe.id}/><ReviewSummary id={recipe.id}/>
      {copy && <RecipeEditor initial={copy} onClose={() => setCopy(undefined)} onSave={r => { if (update(d => ({...d, recipes:[...d.recipes,r]}))) setCopy(undefined); }} />}
      <header className="bg-hero mt-3 rounded-3xl p-5 shadow-soft">
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="rounded-full bg-card px-2.5 py-1">{typeLabel[recipe.type]}</span>
          <span className="rounded-full bg-card px-2.5 py-1">{recipe.category}</span>
          {recipe.collection && <span className="rounded-full bg-card px-2.5 py-1">{recipe.collection}</span>}
          {recipeEquipment(recipe).map(id=><span key={id} className="rounded-full bg-card px-2.5 py-1">{equipmentLabels[id]}</span>)}
          <span className="inline-flex items-center gap-1 rounded-full bg-card px-2.5 py-1"><Clock className="h-3 w-3" />{recipe.minutes} min</span>
          {weeksOfRecipe(recipe.id).map((w) => (
            <Link key={w} to="/tydzien/$n" params={{ n: String(w) }} className="rounded-full bg-card px-2.5 py-1 text-primary">Tydz. {w}</Link>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold leading-tight">{recipe.name}</h1>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          {[["kcal", shown.kcal], ["Białko", `${shown.p} g`], ["Tłuszcz", `${shown.f} g`], ["Węgle", `${shown.c} g`]].map(([l, v]) => (
            <div key={l} className="rounded-2xl bg-card/80 py-2.5">
              <p className="text-lg font-bold">{v}</p>
              <p className="text-[11px] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Wartości szacunkowe na 1 porcję{forHim ? " (wersja dla chłopaka)" : ""}, wyliczone z tabeli składników. Wynik może różnić się zależnie od produktu.
        </p>
        {recipe.rawWeights && <p className="mt-2 text-xs text-muted-foreground">Masy przed obróbką: jajka bez skorupki, owoce i warzywa bez niejadalnych części, konserwy odsączone. Ryż i makaron ważone na sucho. Drobne przyprawy bez gramatur nie są wliczone.</p>}
        {shown.missing.length > 0 && (
          <p className="mt-2 rounded-xl bg-warning px-3 py-2 text-xs text-warning-foreground">
            Do uzupełnienia: {shown.missing.join(", ")} — brak wartości, nie wliczone do sumy.
          </p>
        )}
      </header>
      <RecipePhotos recipeId={recipe.id}/>

      {recipe.partner && (
        <Button variant="ghost" aria-pressed={forHim}
          onClick={() => setForHim((v) => !v)}
          className={`mt-4 flex h-auto w-full items-center gap-3 whitespace-normal rounded-2xl border p-4 text-left transition-colors ${forHim ? "border-primary bg-secondary" : "bg-card"}`}
        >
          <Users className="h-5 w-5 shrink-0 text-primary" />
          <span className="flex-1 text-sm">
            <strong className="block">Wersja dla chłopaka</strong>
            <span className="text-muted-foreground">{recipe.partner.note}</span>
          </span>
          <span className={`h-6 w-10 rounded-full p-0.5 transition-colors ${forHim ? "bg-primary" : "bg-muted"}`}>
            <span className={`block h-5 w-5 rounded-full bg-card transition-transform ${forHim ? "translate-x-4" : ""}`} />
          </span>
        </Button>
      )}

      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Składniki</h2>
          <div className="flex items-center gap-2 rounded-full bg-card p-1 shadow-soft">
            <button aria-label="Mniej porcji" onClick={() => setServings((s) => Math.max(1, s - 1))} className="rounded-full p-1.5"><Minus className="h-4 w-4" /></button>
            <span className="min-w-16 text-center text-sm font-medium">{servings} {servings === 1 ? "porcja" : servings < 5 ? "porcje" : "porcji"}</span>
            <button aria-label="Więcej porcji" onClick={() => setServings((s) => s + 1)} className="rounded-full p-1.5"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2 text-left font-medium">Składnik</th><th className="px-2 py-2 text-right font-medium">Ilość</th><th className="px-3 py-2 text-right font-medium">kcal / B</th></tr>
            </thead>
            <tbody>
              {recipeItems(recipe, forHim).map((it, i) => {
                const im = itemMacros([it[0], it[1] * servings]);
                return (
                  <tr key={i} className="border-t">
                    <td className="px-3 py-2.5">
                      {ingredients[it[0]].name}
                      {it[2] && <span className="ml-1 text-xs text-muted-foreground">({it[2]})</span>}
                    </td>
                    <td className="px-2 py-2.5 text-right font-medium tabular-nums">{formatGrams(it[1] * servings)}</td>
                    <td className="px-3 py-2.5 text-right text-xs tabular-nums text-muted-foreground">
                      {im ? `${im.kcal} / ${im.p} g` : <span className="text-warning-foreground">do uzupełnienia</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {recipe.spices && <p className="mt-2 text-sm text-muted-foreground"><strong>Przyprawy:</strong> {recipe.spices}</p>}
        {recipe.rawWeights && <details className="mt-3 text-xs text-muted-foreground"><summary className="cursor-pointer font-medium">Tabela wartości szacunkowych na 100 g</summary><p className="mt-2">Węglowodany przyswajalne, bez błonnika. Uśrednione dane tabelaryczne i typowe etykiety; marka i tłustość produktu zmieniają wynik. Energia z tabeli może różnić się od 4B + 9T + 4W.</p><ul className="mt-2 space-y-2">{recipeItems(recipe,forHim).map(([id]) => {const ing=ingredients[id];return <li key={id}>{ing.name}: {ing.kcal} kcal · B {ing.p} g · T {ing.f} g · W {ing.c} g</li>;})}</ul><p className="mt-2">Podstawa: <a className="underline" href="https://fdc.nal.usda.gov/" target="_blank" rel="noreferrer">USDA FoodData Central</a>, typowe europejskie etykiety produktów. To nie analiza laboratoryjna dania.</p></details>}
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">Przygotowanie</h2>
        <ol className="mt-3 space-y-3">
          {recipe.steps.map((s, i) => (
            <li key={i} className="flex gap-3 rounded-2xl bg-card p-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
              <p className="pt-0.5 text-[15px] leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
