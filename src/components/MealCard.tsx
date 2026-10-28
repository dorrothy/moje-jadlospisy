import { Link } from "@tanstack/react-router";
import { Heart, Clock } from "lucide-react";
import type { Recipe } from "@/data/recipes";
import { computeMacros } from "@/lib/meals";
import { useFavorites } from "@/lib/storage";
import { equipmentLabels, recipeEquipment } from '@/data/equipment';
import { RecipeReview, ReviewSummary } from './RecipeReview';

export function MealCard({ recipe, time, label }: { recipe: Recipe; time?: string; label?: string }) {
  const m = computeMacros(recipe.ingredients);
  const { isFav, toggle } = useFavorites();
  const fav = isFav(recipe.id);
  return (
    <div className="relative flex gap-3 rounded-2xl border bg-card p-4 shadow-soft transition-transform active:scale-[0.99]">
      {time && (
        <div className="flex w-12 shrink-0 flex-col items-center pt-0.5">
          <span className="text-sm font-semibold text-primary">{time}</span>
        </div>
      )}
      <Link to="/przepis/$id" params={{ id: recipe.id }} className="min-w-0 flex-1 after:absolute after:inset-0">
        {label && <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>}
        <h3 className="mt-0.5 text-base font-semibold leading-snug">{recipe.name}</h3>
        <ReviewSummary id={recipe.id}/>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{recipe.minutes} min</span>
          <span>~{m.kcal} kcal{m.missing.length ? "*" : ""}</span>
          <span>B {m.p} g</span>
          {recipe.rawWeights && <span>makro szacunkowe</span>}
          {recipe.collection && <span>{recipe.collection}</span>}
          {recipeEquipment(recipe).map(id=><span key={id}>{equipmentLabels[id]}</span>)}
          {recipe.partner && <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">+ wersja dla niego</span>}
        </div>
      </Link>
      <RecipeReview id={recipe.id} compact/>
      <button
        aria-label={fav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        onClick={() => toggle(recipe.id)}
        className="relative z-10 -m-1 self-start rounded-full p-2 text-primary"
      >
        <Heart className={`h-5 w-5 ${fav ? "fill-primary" : ""}`} />
      </button>
    </div>
  );
}

export const weekBg: Record<number, string> = { 1: "bg-week-1", 2: "bg-week-2", 3: "bg-week-3", 4: "bg-week-4" };
