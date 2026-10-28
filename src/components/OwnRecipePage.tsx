import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { ChefHat, Copy, Pencil, Trash2 } from 'lucide-react';
import { CookingMode } from './CookingMode';
import { ownCookingItems, COOK_FOR_LABELS, type CookFor } from '@/lib/cooking';
import { Button } from '@/components/ui/button';
import { RecipeEditor } from './RecipeEditor';
import { useLocalData } from '@/lib/local-data-context';
import { deleteRecipe, newId, type CustomRecipe } from '@/lib/custom-data';
import { toast } from 'sonner';
import { RecipeReview, ReviewSummary } from './RecipeReview';
import { RecipePhotos } from './RecipePhotos';
export function OwnRecipePage({recipe:r}:{recipe:CustomRecipe}) {
 const {update}=useLocalData();const navigate=useNavigate();const [edit,setEdit]=useState(false);const [mode,setMode]=useState<CookFor>('me');const [portions,setPortions]=useState(r.servings);const [cooking,setCooking]=useState(false);
 const bothM=r.partner?.macros?{kcal:r.macros.kcal+r.partner.macros.kcal,p:r.macros.p+r.partner.macros.p,f:r.macros.f+r.partner.macros.f,c:r.macros.c+r.partner.macros.c}:null;const m=mode==='him'?r.partner?.macros:mode==='both'?bothM:r.macros;
 return <main className="space-y-6 px-4 pt-6"><Link to="/szukaj" className="text-sm text-primary">← Przepisy</Link><header><p className="text-xs text-primary">Własny przepis · {r.category}</p><h1 className="mt-2 break-words text-3xl font-bold">{r.name}</h1><p className="mt-2 text-sm text-muted-foreground">{r.minutes} min · przepis na {r.servings} porcji</p></header><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={()=>setEdit(true)}><Pencil/>Edytuj</Button><Button variant="outline" onClick={()=>{const copy={...r,id:newId('own'),name:`${r.name} — kopia`};if(update(d=>({...d,recipes:[...d.recipes,copy]})))void navigate({to:'/przepis/$id',params:{id:copy.id}});}}><Copy/>Duplikuj</Button><Button variant="destructive" onClick={()=>{if(window.confirm(`Usunąć „${r.name}”? Przypisania tego przepisu w Twoich tygodniach też zostaną usunięte.`)&&update(d=>deleteRecipe(d,r.id)))void navigate({to:'/szukaj'});}}><Trash2/>Usuń</Button></div>
 <div><RecipeReview id={r.id}/><ReviewSummary id={r.id}/></div>
 <RecipePhotos recipeId={r.id}/>
 {r.partner && <div className="rounded-2xl border bg-card p-4"><strong className="text-sm">Dla kogo gotujesz?</strong><div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Dla kogo gotujesz">{(['me','him','both'] as CookFor[]).map(v=><Button key={v} size="sm" variant={mode===v?'default':'outline'} aria-pressed={mode===v} onClick={()=>setMode(v)}>{COOK_FOR_LABELS[v]}</Button>)}</div><p className="mt-2 text-xs text-muted-foreground">{mode==='both'?'Gotujesz podwójnie: Twoje składniki i jego dodatki razem, w jednej liście.':r.partner.note}</p></div>}
 <section><h2 className="text-xl">Makro {mode==='both'?'razem dla 2 osób':mode==='him'?'wersji dla chłopaka':'na porcję'}</h2>{m?<div className="mt-3 grid grid-cols-4 gap-2 text-center">{[['kcal',m.kcal],['B',`${m.p} g`],['T',`${m.f} g`],['W',`${m.c} g`]].map(([label,value])=><div key={label} className="rounded-lg bg-secondary p-2"><strong className="block">{value}</strong><span className="text-xs">{label}</span></div>)}</div>:<p className="mt-2 text-sm">Makro {mode==='both'?'wspólne':'wersji dla chłopaka'} — do uzupełnienia.</p>}<p className="mt-2 text-xs text-muted-foreground">Wartości wpisane ręcznie, niezweryfikowane.</p></section>
 <section><div className="flex items-end justify-between gap-3"><h2 className="text-xl">Składniki</h2><label className="text-sm">Porcje<input className="ml-2 w-16 rounded-md border bg-card p-2" type="number" min="1" value={portions} onChange={e=>setPortions(Math.max(1,Number(e.target.value)))}/></label></div><ul className="mt-3 divide-y">{[...r.ingredients,...(mode==='me'?[]:r.partner?.extra ?? [])].map((i,k)=><li key={k} className="flex justify-between gap-3 py-3 text-sm"><span className="min-w-0 break-words">{i.name}</span><strong className="shrink-0">{Number((i.amount*portions/r.servings).toFixed(2)).toLocaleString('pl')} {i.unit}</strong></li>)}</ul></section>
 <section><div className="flex items-center justify-between gap-2"><h2 className="text-xl">Przygotowanie</h2><Button variant="outline" size="sm" onClick={()=>setCooking(true)}><ChefHat className="h-4 w-4"/>Gotuję teraz</Button></div><ol className="mt-3 space-y-3">{r.steps.map((s,i)=><li key={i} className="flex gap-3"><span className="font-bold text-primary">{i+1}.</span><p className="min-w-0 whitespace-pre-wrap break-words">{s}</p></li>)}</ol>{mode!=='me'&&<p className="mt-4 rounded-lg bg-secondary p-3 text-sm">{r.partner?.note}</p>}</section>
 {cooking&&<CookingMode name={r.name} steps={r.steps} ingredients={ownCookingItems(r, mode, portions)} {...(mode!=='me'&&r.partner?.note?{note:r.partner.note}:{})} onClose={()=>setCooking(false)}/>}
 {edit&&<RecipeEditor initial={r} onClose={()=>setEdit(false)} onSave={next=>{if(update(d=>({...d,recipes:d.recipes.map(x=>x.id===r.id?next:x)}))){setEdit(false);toast.success('Zapisano przepis');}}}/>}
 </main>;
}
