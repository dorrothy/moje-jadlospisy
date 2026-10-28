import { z } from 'zod';
import { recipes, mealSlots, type MealType } from '@/data/recipes';
import { ingredients } from '@/data/ingredients';
import { computeMacros, normalize } from '@/lib/meals';

export const macroSchema = z.object({ kcal: z.number().finite().nonnegative(), p: z.number().finite().nonnegative(), f: z.number().finite().nonnegative(), c: z.number().finite().nonnegative() });
export const ingredientSchema = z.object({ name: z.string().trim().min(1), amount: z.number().finite().positive(), unit: z.enum(['g', 'kg', 'ml', 'l', 'szt.', 'łyżka', 'łyżeczka']) });
export const customRecipeSchema = z.object({ id: z.string().startsWith('own-'), name: z.string().trim().min(1), category: z.string().trim().min(1), type: z.enum(['sniadanie','obiad','deser','kolacja']), minutes: z.number().finite().int().positive(), servings: z.number().finite().int().positive(), ingredients: z.array(ingredientSchema).min(1), steps: z.array(z.string().trim().min(1)).min(1), macros: macroSchema, partner: z.object({ note: z.string().trim().min(1), extra: z.array(ingredientSchema), macros: macroSchema.optional() }).optional() });
const daySchema = z.object({ sniadanie: z.string().nullable(), obiad: z.string().nullable(), deser: z.string().nullable(), kolacja: z.string().nullable() });
export const customWeekSchema = z.object({ id: z.string().startsWith('week-'), name: z.string().trim().min(1), days: z.array(daySchema).length(7) });
export const dataSchema = z.object({ version: z.literal(1), recipes: z.array(customRecipeSchema), weeks: z.array(customWeekSchema) }).superRefine((data, ctx) => {
  for (const key of ['recipes', 'weeks'] as const) if (new Set(data[key].map(x => x.id)).size !== data[key].length) ctx.addIssue({code:'custom', message:'Powtarzające się identyfikatory'});
  const ids = new Set([...recipes.map(r => r.id), ...data.recipes.map(r => r.id)]);
  for (const w of data.weeks) for (const d of w.days) for (const id of Object.values(d)) if (id && !ids.has(id)) ctx.addIssue({ code:'custom', message:'Tydzień wskazuje nieistniejący przepis' });
});
export type CustomIngredient = z.infer<typeof ingredientSchema>;
export type CustomRecipe = z.infer<typeof customRecipeSchema>;
export type CustomWeek = z.infer<typeof customWeekSchema>;
export type LocalData = z.infer<typeof dataSchema>;
export const emptyData: LocalData = { version: 1, recipes: [], weeks: [] };
export const newId = (kind: 'own' | 'week') => `${kind}-${crypto.randomUUID()}`;
export function blankWeek(name: string): CustomWeek { return { id:newId('week'), name, days:Array.from({length:7}, () => ({sniadanie:null,obiad:null,deser:null,kolacja:null})) }; }
export function deleteRecipe(data: LocalData, id: string): LocalData { return {...data, recipes:data.recipes.filter(r => r.id !== id), weeks:data.weeks.map(w => ({...w,days:w.days.map(d => Object.fromEntries(Object.entries(d).map(([slot,rid]) => [slot, rid === id ? null : rid])) as CustomWeek['days'][number])}))}; }
export function parseImport(text: string): LocalData { return dataSchema.parse(JSON.parse(text)); }
export function mergeImport(current: LocalData, incoming: LocalData): LocalData {
  // Import is additive: remap colliding IDs, including every week assignment.
  const ids = new Set(current.recipes.map(r=>r.id)); const remap = new Map<string,string>();
  const added = incoming.recipes.map(r => { const id=ids.has(r.id)?newId('own'):r.id; ids.add(id); remap.set(r.id,id); return {...r,id}; });
  const weekIds = new Set(current.weeks.map(w=>w.id));
  return {...current, recipes:[...current.recipes,...added], weeks:[...current.weeks,...incoming.weeks.map(w=>{ const id=weekIds.has(w.id)?newId('week'):w.id; weekIds.add(id); return {...w,id,days:w.days.map(d=>Object.fromEntries(Object.entries(d).map(([s,r])=>[s,r ? remap.get(r) ?? r : null])) as CustomWeek['days'][number])}; })]};
}
export function matchesCustom(r: CustomRecipe, q: string) { const hay=normalize([r.name,r.category,r.partner?.note ?? '',...r.ingredients.map(i=>i.name)].join(' ')); return normalize(q).split(/\s+/).every(t=>hay.includes(t)); }
export function copyOriginal(id: string): CustomRecipe | undefined {
  const r=recipes.find(r=>r.id===id); if(!r) return;
  const convert = (items: typeof r.ingredients): CustomIngredient[] => items.map(([id,amount]) => ({name:ingredients[id].name,amount,unit:'g'}));
  const m=computeMacros(r.ingredients);
  return { id:newId('own'),name:`${r.name} — kopia`,category:r.category,type:r.type,minutes:r.minutes,servings:1,ingredients:convert(r.ingredients),steps:[...r.steps],macros:{kcal:m.kcal,p:m.p,f:m.f,c:m.c},partner:r.partner ? {note:r.partner.note,extra:convert(r.partner.extra)} : undefined };
}
export type ShopItem = { id:string; name:string; amount:number; unit:string };
export function customShopping(w: CustomWeek, custom: CustomRecipe[], portions=1): ShopItem[] {
  const map=new Map<string,ShopItem>();
  for (const day of w.days) for (const slot of mealSlots) {
    const id=day[slot.type]; if(!id) continue;
    const own=custom.find(r=>r.id===id); const original=recipes.find(r=>r.id===id);
    const items: CustomIngredient[]=own ? own.ingredients : original?.ingredients.map(([iid,g])=>({name:ingredients[iid].name,amount:g,unit:'g' as const})) ?? [];
    for (const i of items) {
      const unit=i.unit==='kg'?'g':i.unit==='l'?'ml':i.unit;
      const amount=i.amount*(i.unit==='kg'||i.unit==='l'?1000:1)*portions/(own?.servings ?? 1);
      const key=`${normalize(i.name)}:${unit}`; const prev=map.get(key);
      map.set(key,{id:key,name:prev?.name ?? i.name,unit,amount:(prev?.amount ?? 0)+amount});
    }
  }
  return [...map.values()].sort((a,b)=>a.name.localeCompare(b.name,'pl'));
}
