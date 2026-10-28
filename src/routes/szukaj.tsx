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
import { equipmentLabels, recipeEquipment, type Equipment } from '@/data/equipment';
import { polishCollection } from '@/data/recipes-polish';
import { reviewMatches, reviewSort } from '@/lib/reviews';

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
  const [equipment, setEquipment] = useState<Equipment | undefined>();
  const [collection, setCollection] = useState<string | undefined>();
  const [onlyFav, setOnlyFav] = useState(favOnly);
  const [minimum,setMinimum]=useState(0);
  const [tested,setTested]=useState(false);
  const [sort,setSort]=useState('default');
  const { favs } = useFavorites();
  const results = searchRecipes(q, { week, type, equipment, collection, favs: onlyFav ? favs : undefined });

  const ownResults = data.recipes.filter(r => matchesCustom(r, q) && (!type || r.type === type) && (!equipment || recipeEquipment(r).includes(equipment)) && (!collection || r.collection === collection) && (!onlyFav || favs.includes(r.id)) && !week);
  const merged=[...ownResults,...results].filter(r=>reviewMatches(r.id,data.reviews,minimum,tested)).sort((a,b)=>reviewSort(a.id,b.id,data.reviews,sort));
  return (
    <>
      <div className="mt-4 flex flex-wrap gap-2"><Button disabled={!ready} onClick={() => setCreating(true)}>+ Nowy przepis</Button><Button asChild variant="outline"><Link to="/dane">Kopia danych</Link></Button><Button asChild variant="outline"><Link to="/lodowka">Co mam w lodówce?</Link></Button><Button asChild variant="outline"><Link to="/generator">Ułóż tydzień</Link></Button></div>
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
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">Kolekcja<select className="mt-1 h-10 w-full rounded-md border bg-card px-3" value={collection ?? ''} onChange={e=>setCollection(e.target.value || undefined)}><option value="">Wszystkie kolekcje</option><option value={polishCollection}>{polishCollection}</option></select></label>
        <label className="text-sm">Sprzęt<select className="mt-1 h-10 w-full rounded-md border bg-card px-3" value={equipment ?? ''} onChange={e=>setEquipment(e.target.value ? e.target.value as Equipment : undefined)}><option value="">Dowolny sprzęt</option>{Object.entries(equipmentLabels).map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></label>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3"><label className="text-sm">Ocena od<select aria-label="Ocena od" value={minimum} onChange={e=>setMinimum(Number(e.target.value))} className="mt-1 h-10 w-full rounded-md border bg-card px-2"><option value="0">Dowolna</option>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} ★</option>)}</select></label><label className="text-sm">Sortowanie<select aria-label="Sortowanie" value={sort} onChange={e=>setSort(e.target.value)} className="mt-1 h-10 w-full rounded-md border bg-card px-2"><option value="default">Domyślne</option><option value="rating">Najwyższa ocena</option><option value="cooked">Ostatnio gotowane</option></select></label></div><label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={tested} onChange={e=>setTested(e.target.checked)}/>Sprawdzone (z datą gotowania)</label>
      <p className="mt-4 text-xs text-muted-foreground">{merged.length} przepisów</p>
      <div className="mt-2 space-y-3">
        {merged.map(r=>'servings' in r?<CustomRecipeCard key={r.id} recipe={r}/>:<MealCard key={r.id} recipe={r} label={typeLabel[r.type]}/>)}
        {merged.length === 0 && (
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
