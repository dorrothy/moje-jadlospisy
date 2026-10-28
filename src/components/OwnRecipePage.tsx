import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecipeEditor } from './RecipeEditor';
import { useLocalData } from '@/lib/local-data-context';
import { deleteRecipe, newId, type CustomRecipe } from '@/lib/custom-data';
import { toast } from 'sonner';
import { RecipeReview, ReviewSummary } from './RecipeReview';
import { RecipePhotos } from './RecipePhotos';
export function OwnRecipePage({recipe:r}:{recipe:CustomRecipe}) {
 const {update}=useLocalData();const navigate=useNavigate();const [edit,setEdit]=useState(false);const [partner,setPartner]=useState(false);const [portions,setPortions]=useState(r.servings);
 const m=partner?r.partner?.macros:r.macros;
 return <main className="space-y-6 px-4 pt-6"><Link to="/szukaj" className="text-sm text-primary">← Przepisy</Link><header><p className="text-xs text-primary">Własny przepis · {r.category}</p><h1 className="mt-2 break-words text-3xl font-bold">{r.name}</h1><p className="mt-2 text-sm text-muted-foreground">{r.minutes} min · przepis na {r.servings} porcji</p></header><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={()=>setEdit(true)}><Pencil/>Edytuj</Button><Button variant="outline" onClick={()=>{const copy={...r,id:newId('own'),name:`${r.name} — kopia`};if(update(d=>({...d,recipes:[...d.recipes,copy]})))void navigate({to:'/przepis/$id',params:{id:copy.id}});}}><Copy/>Duplikuj</Button><Button variant="destructive" onClick={()=>{if(window.confirm(`Usunąć „${r.name}”? Przypisania tego przepisu w Twoich tygodniach też zostaną usunięte.`)&&update(d=>deleteRecipe(d,r.id)))void navigate({to:'/szukaj'});}}><Trash2/>Usuń</Button></div>
 <div><RecipeReview id={r.id}/><ReviewSummary id={r.id}/></div>
 <RecipePhotos recipeId={r.id}/>
 {r.partner && <label className="flex gap-2 text-sm"><input type="checkbox" checked={partner} onChange={e=>setPartner(e.target.checked)}/>Wersja dla chłopaka</label>}
 <section><h2 className="text-xl">Makro na porcję</h2>{m?<div className="mt-3 grid grid-cols-4 gap-2 text-center">{[['kcal',m.kcal],['B',`${m.p} g`],['T',`${m.f} g`],['W',`${m.c} g`]].map(([label,value])=><div key={label} className="rounded-lg bg-secondary p-2"><strong className="block">{value}</strong><span className="text-xs">{label}</span></div>)}</div>:<p className="mt-2 text-sm">Makro wersji dla chłopaka — do uzupełnienia.</p>}<p className="mt-2 text-xs text-muted-foreground">Wartości wpisane ręcznie, niezweryfikowane.</p></section>
 <section><div className="flex items-end justify-between gap-3"><h2 className="text-xl">Składniki</h2><label className="text-sm">Porcje<input className="ml-2 w-16 rounded-md border bg-card p-2" type="number" min="1" value={portions} onChange={e=>setPortions(Math.max(1,Number(e.target.value)))}/></label></div><ul className="mt-3 divide-y">{[...r.ingredients,...(partner?r.partner?.extra ?? []:[])].map((i,k)=><li key={k} className="flex justify-between gap-3 py-3 text-sm"><span className="min-w-0 break-words">{i.name}</span><strong className="shrink-0">{Number((i.amount*portions/r.servings).toFixed(2)).toLocaleString('pl')} {i.unit}</strong></li>)}</ul></section>
 <section><h2 className="text-xl">Przygotowanie</h2><ol className="mt-3 space-y-3">{r.steps.map((s,i)=><li key={i} className="flex gap-3"><span className="font-bold text-primary">{i+1}.</span><p className="min-w-0 whitespace-pre-wrap break-words">{s}</p></li>)}</ol>{partner&&<p className="mt-4 rounded-lg bg-secondary p-3 text-sm">{r.partner?.note}</p>}</section>
 {edit&&<RecipeEditor initial={r} onClose={()=>setEdit(false)} onSave={next=>{if(update(d=>({...d,recipes:d.recipes.map(x=>x.id===r.id?next:x)}))){setEdit(false);toast.success('Zapisano przepis');}}}/>}
 </main>;
}
