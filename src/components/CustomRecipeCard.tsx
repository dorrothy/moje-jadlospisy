import { Link } from '@tanstack/react-router';
import { Heart, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavorites } from '@/lib/storage';
import type { CustomRecipe } from '@/lib/custom-data';
export function CustomRecipeCard({recipe}:{recipe:CustomRecipe}) { const {isFav,toggle}=useFavorites();return <div className="flex gap-3 rounded-2xl border bg-card p-4 shadow-soft"><Link className="min-w-0 flex-1" to="/przepis/$id" params={{id:recipe.id}}><p className="text-xs text-primary">Własny · {recipe.category}</p><h3 className="mt-1 break-words text-base font-semibold">{recipe.name}</h3><p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3 w-3"/>{recipe.minutes} min · {recipe.macros.kcal} kcal · B {recipe.macros.p} g</p><p className="mt-1 text-xs text-muted-foreground">Makro wpisane ręcznie / porcja</p></Link><Button variant="ghost" size="icon" title="Ulubione" aria-label={isFav(recipe.id)?'Usuń z ulubionych':'Dodaj do ulubionych'} onClick={()=>toggle(recipe.id)}><Heart className={isFav(recipe.id)?'fill-primary text-primary':'text-primary'}/></Button></div>; }
