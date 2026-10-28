import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { RecipeEditor } from "@/components/RecipeEditor";
import { CustomRecipeCard } from "@/components/CustomRecipeCard";
import { useLocalData } from "@/lib/local-data";
import { matchesCustom } from "@/lib/custom-data";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";
import { MealCard } from "@/components/MealCard";
import { searchRecipes, typeLabel } from "@/lib/meals";
import { useFavorites } from "@/lib/storage";
import type { MealType } from "@/data/recipes";

export const Route = createFileRoute("/szukaj")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Szukaj przepisów — Moje przepisy" },
      { name: "description", content: "Szukaj przepisów po nazwie i składnikach, filtruj po tygodniu i typie posiłku." },
      { property: "og:title", content: "Szukaj przepisów" },
      { property: "og:description", content: "Wyszukiwarka po nazwie i składnikach." },
    ],
  }),
  component: SearchPage,
});

export function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Button variant="ghost" onClick={onClick} className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "bg-card text-foreground border"}`}>
      {children}
    </Button>
  );
}

export function RecipeBrowser({ favOnly = false }: { favOnly?: boolean }) {
  const { data, update, ready } = useLocalData();
  const [creating, setCreating] = useState(false);
  const [q, setQ] = useState("");
  const [week, setWeek] = useState<number | undefined>();
  const [type, setType] = useState<MealType | undefined>();
  const [onlyFav, setOnlyFav] = useState(favOnly);
  const { favs } = useFavorites();
  const results = searchRecipes(q, { week, type, favs: onlyFav ? favs : undefined });

  const ownResults = data.recipes.filter(r => matchesCustom(r, q) && (!type || r.type === type) && (!onlyFav || favs.includes(r.id)) && !week);
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2"><Button disabled={!ready} onClick={() => setCreating(true)}>+ Nowy przepis</Button><Button asChild variant="outline"><Link to="/dane">Kopia danych</Link></Button></div>
      {creating && <RecipeEditor onClose={() => setCreating(false)} onSave={r => { if (update(d => ({...d, recipes:[...d.recipes,r]}))) setCreating(false); }} />}

      <label className="mt-4 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-soft focus-within:ring-2 focus-within:ring-ring">
        <Search className="h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="np. kurczak, losos, konjac…"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
          type="search"
          enterKeyHint="search"
        />
      </label>
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        <Chip active={!week} onClick={() => setWeek(undefined)}>Wszystkie</Chip>
        {[1, 2, 3, 4].map((w) => <Chip key={w} active={week === w} onClick={() => setWeek(week === w ? undefined : w)}>Tydz. {w}</Chip>)}
      </div>
      <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {(Object.keys(typeLabel) as MealType[]).map((t) => <Chip key={t} active={type === t} onClick={() => setType(type === t ? undefined : t)}>{typeLabel[t]}</Chip>)}
        {!favOnly && <Chip active={onlyFav} onClick={() => setOnlyFav((v) => !v)}>♥ Ulubione</Chip>}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">{results.length + ownResults.length} przepisów</p>
      <div className="mt-2 space-y-3">
        {ownResults.map(r => <CustomRecipeCard key={r.id} recipe={r} />)}
        {results.map((r) => <MealCard key={r.id} recipe={r} label={typeLabel[r.type]} />)}
        {results.length + ownResults.length === 0 && (
          <p className="rounded-2xl bg-card p-6 text-center text-sm text-muted-foreground">
            {favOnly && favs.length === 0 ? "Dotknij serduszka przy przepisie, aby dodać go tutaj." : "Nic nie znaleziono."}
          </p>
        )}
      </div>
    </>
  );
}

function SearchPage() {
  return (
    <main className="px-4 pt-6">
      <h1 className="text-3xl font-bold">Moje przepisy</h1>
      <RecipeBrowser />
    </main>
  );
}
