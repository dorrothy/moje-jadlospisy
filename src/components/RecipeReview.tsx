import { useState } from 'react';
import { Star, NotebookPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLocalData } from '@/lib/local-data';
import type { LocalData } from '@/lib/custom-data';

export function ReviewSummary({id}:{id:string}){const {data}=useLocalData();const r=data.reviews?.[id];return r?<span className="mt-2 block text-xs text-muted-foreground">{r.rating?`★ ${r.rating}/5 · `:''}{r.cooked?`Sprawdzone · ${r.cooked}`:r.note?'Prywatna notatka':''}</span>:null;}
export function RecipeReview({id,compact=false}:{id:string;compact?:boolean}){
 const {data,update,ready}=useLocalData();const saved=data.reviews?.[id];const [open,setOpen]=useState(false);const [draft,setDraft]=useState<NonNullable<LocalData['reviews']>[string]>({note:'',cooked:''});
 function edit(){setDraft(saved??{note:'',cooked:''});setOpen(true);}
 return <><Button disabled={!ready} variant="ghost" size={compact?'icon':'default'} className="relative z-10 shrink-0" title="Ocena i prywatna notatka" aria-label="Ocena i prywatna notatka" onClick={edit}><NotebookPen/>{!compact&&'Ocena i notatka'}</Button>
 <Dialog open={open} onOpenChange={setOpen}><DialogContent className="max-h-[85dvh] overflow-y-auto rounded-lg"><DialogTitle>Ocena i własne notatki</DialogTitle><DialogDescription>Prywatne dane, zapisane tylko na tym urządzeniu.</DialogDescription><form className="space-y-5" onSubmit={e=>{e.preventDefault();if(update(d=>({...d,reviews:{...d.reviews,[id]:draft}})))setOpen(false);}}><fieldset><legend className="text-sm">Twoja ocena</legend><div className="mt-2 flex gap-1">{[1,2,3,4,5].map(n=><Button key={n} size="icon" variant="ghost" type="button" aria-label={`${n} gwiazdek`} aria-pressed={draft.rating===n} onClick={()=>setDraft({...draft,rating:n})}><Star className={n<=(draft.rating??0)?'fill-primary text-primary':'text-muted-foreground'}/></Button>)}</div><Button type="button" variant="ghost" onClick={()=>{const {rating:removed,...rest}=draft;void removed;setDraft(rest);}}>Wyczyść ocenę</Button></fieldset><label className="block text-sm">Prywatna notatka<Textarea value={draft.note} onChange={e=>setDraft({...draft,note:e.target.value})}/></label><label className="block text-sm">Ostatnie gotowanie<Input type="date" value={draft.cooked} onChange={e=>setDraft({...draft,cooked:e.target.value})}/></label><Button type="submit">Zapisz notatkę</Button></form></DialogContent></Dialog></>;
}