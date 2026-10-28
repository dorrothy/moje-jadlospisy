import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Plus, Copy, Trash2, Pencil, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WeekStyleDialog } from '@/components/WeekStyleDialog';
import { useLocalData } from '@/lib/local-data-context';
import { blankWeek, newId, weekBgClass, weekEmoji } from '@/lib/custom-data';
import { pageHead } from '@/lib/page-head';
export const Route=createFileRoute('/moje-tygodnie')({head:()=>pageHead('Moje tygodnie','Własne tygodnie posiłków zapisane lokalnie na tym urządzeniu.'),component:MyWeeks});
function MyWeeks(){const {data,update,ready}=useLocalData();const [createOpen,setCreateOpen]=useState(false);const [editing,setEditing]=useState<string|null>(null);
 return <main className="space-y-5 px-4 pt-6"><h1 className="text-3xl font-bold">Moje tygodnie</h1>
 <Button disabled={!ready} onClick={()=>setCreateOpen(true)}><Plus/>Nowy tydzień</Button>
 {data.weeks.length===0&&<p className="text-sm text-muted-foreground">Nie masz jeszcze własnych tygodni.</p>}
 <div className="grid grid-cols-2 gap-3">{data.weeks.map(w=>{
  const filled=w.days.flatMap(d=>Object.values(d)).filter(Boolean).length;
  return <div key={w.id} className="group flex flex-col gap-2">
   <Link to="/moj-tydzien/$id" params={{id:w.id}} className={`${weekBgClass(w)} flex aspect-[4/5] flex-col justify-between rounded-3xl p-4 shadow-soft transition-transform active:scale-[0.98]`}>
    <span className="text-4xl">{weekEmoji(w)}</span>
    <div>
     <h3 className="break-words text-lg font-bold leading-tight">{w.name}</h3>
     <div className="mt-1 flex items-center justify-between text-xs text-foreground/70">
      <span>{filled}/28 posiłków</span>
      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1"/>
     </div>
    </div>
   </Link>
   <div className="flex gap-1">
    <Button variant="ghost" size="icon" className="h-9 w-9" title="Nazwa, ikonka i kolor" aria-label={`Ustawienia ${w.name}`} onClick={()=>setEditing(w.id)}><Pencil/></Button>
    <Button variant="ghost" size="icon" className="h-9 w-9" title="Duplikuj tydzień" aria-label={`Duplikuj ${w.name}`} onClick={()=>update(d=>({...d,weeks:[...d.weeks,{...w,id:newId('week'),name:`${w.name} — kopia`}]}))}><Copy/></Button>
    <Button variant="ghost" size="icon" className="h-9 w-9" title="Usuń tydzień" aria-label={`Usuń ${w.name}`} onClick={()=>{if(window.confirm(`Usunąć tydzień „${w.name}”? Przepisy pozostaną w bazie.`))update(d=>({...d,weeks:d.weeks.filter(x=>x.id!==w.id)}));}}><Trash2 className="text-destructive"/></Button>
   </div>
  </div>;})}
 </div>
 <Button asChild variant="outline"><Link to="/">Oryginalne cztery tygodnie</Link></Button>
 <WeekStyleDialog key={createOpen?'create-open':'create-closed'} open={createOpen} initial={{name:''}} onCancel={()=>setCreateOpen(false)}
  onSave={({name,emoji,color})=>{if(update(d=>({...d,weeks:[...d.weeks,{...blankWeek(name),emoji,color}]})))setCreateOpen(false);}}/>
 <WeekStyleDialog key={editing??'editing-closed'} open={editing!==null} initial={editing?(data.weeks.find(w=>w.id===editing)??{name:''}):{name:''}} onCancel={()=>setEditing(null)}
  onSave={({name,emoji,color})=>{if(update(d=>({...d,weeks:d.weeks.map(x=>x.id===editing?{...x,name,emoji,color}:x)})))setEditing(null);}}/>
 </main>;}
