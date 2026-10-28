import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, RefreshCw, Trash2, ShoppingBasket, Pencil } from 'lucide-react';
import { recipes, dayNames, dayShort, mealSlots, type MealType } from '@/data/recipes';
import { MealCard } from '@/components/MealCard';
import { CustomRecipeCard } from '@/components/CustomRecipeCard';
import { WeekStyleDialog } from '@/components/WeekStyleDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from '@/components/ui/dialog';
import { useLocalData } from '@/lib/local-data';
import { matchesCustom, weekEmoji } from '@/lib/custom-data';
import { searchRecipes } from '@/lib/meals';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/moj-tydzien/$id')({head:()=>pageHead('Własny tydzień','Plan siedmiu dni z własnymi i oryginalnymi przepisami.'),component:OwnWeek});
function OwnWeek(){const {id}=Route.useParams();const {data,update,ready}=useLocalData();const week=data.weeks.find(w=>w.id===id);const [day,setDay]=useState(0);const [slot,setSlot]=useState<MealType|null>(null);const [q,setQ]=useState('');const [styleOpen,setStyleOpen]=useState(false);
 if(!ready)return <main className="p-4">Wczytywanie…</main>;if(!week)return <main className="p-4">Nie znaleziono tygodnia. <Link to="/moje-tygodnie">Moje tygodnie</Link></main>;
 const assign=(rid:string|null, type:MealType)=>{if(update(d=>({...d,weeks:d.weeks.map(w=>w.id===id?{...w,days:w.days.map((v,i)=>i===day?{...v,[type]:rid}:v)}:w)})))setSlot(null);};
 return <main className="space-y-5 px-4 pt-6"><Link className="text-sm text-primary" to="/moje-tygodnie">← Powrót do menu</Link><header className="flex items-start gap-2"><h1 className="min-w-0 flex-1 break-words text-3xl font-bold"><span className="mr-2">{weekEmoji(week)}</span>{week.name}</h1><Button size="icon" variant="ghost" title="Nazwa, ikonka i kolor" aria-label="Ustawienia tygodnia" onClick={()=>setStyleOpen(true)}><Pencil/></Button></header><Button asChild variant="outline"><Link to="/moje-zakupy/$id" params={{id}}><ShoppingBasket/>Lista zakupów</Link></Button><div className="flex gap-1 overflow-x-auto pb-1">{dayShort.map((n,i)=><Button key={n} className="shrink-0 px-3" variant={day===i?'default':'outline'} onClick={()=>setDay(i)}>{n}</Button>)}</div><h2 className="text-xl">{dayNames[day]}</h2><div className="space-y-5">{mealSlots.map(s=>{const rid=week.days[day]?.[s.type];const own=data.recipes.find(r=>r.id===rid);const original=recipes.find(r=>r.id===rid);return <section key={s.type}><div className="mb-2 flex items-center gap-2"><h3 className="flex-1 text-sm">{s.time} · {s.label}</h3><Button variant="ghost" size="icon" title={rid?'Zamień przepis':'Wybierz przepis'} aria-label={`Wybierz przepis ${s.time}`} onClick={()=>{setQ('');setSlot(s.type);}}>{rid?<RefreshCw/>:<Plus/>}</Button>{rid&&<Button variant="ghost" size="icon" title="Usuń przypisanie" aria-label={`Usuń przypisanie ${s.time}`} onClick={()=>assign(null,s.type)}><Trash2/></Button>}</div>{own?<CustomRecipeCard recipe={own}/>:original?<MealCard recipe={original}/>:<Button className="w-full border-dashed" variant="outline" onClick={()=>{setQ('');setSlot(s.type);}}><Plus/>Wybierz przepis</Button>}</section>;})}</div>
 <Dialog open={slot!==null} onOpenChange={open=>{if(!open)setSlot(null);}}><DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-lg"><DialogTitle>Wybierz przepis</DialogTitle><DialogDescription>Cała baza przepisów</DialogDescription><Input aria-label="Szukaj przepisu do tygodnia" type="search" placeholder="Nazwa lub składnik…" value={q} onChange={e=>setQ(e.target.value)}/><div className="space-y-2">{[...data.recipes.filter(r=>matchesCustom(r,q)),...searchRecipes(q)].map(r=><Button key={r.id} variant="outline" className="h-auto w-full justify-start whitespace-normal py-3 text-left" onClick={()=>{if(slot)assign(r.id,slot);}}>{r.name}{r.id.startsWith('own-')?' · własny':''}</Button>)}{!data.recipes.some(r=>matchesCustom(r,q))&&searchRecipes(q).length===0&&<p>Nic nie znaleziono.</p>}</div></DialogContent></Dialog>
 <WeekStyleDialog key={String(styleOpen)} open={styleOpen} initial={{name:week.name,emoji:week.emoji,color:week.color}} onCancel={()=>setStyleOpen(false)} onSave={({name,emoji,color})=>{if(update(d=>({...d,weeks:d.weeks.map(w=>w.id===id?{...w,name,emoji,color}:w)})))setStyleOpen(false);}}/>
 </main>;
}
