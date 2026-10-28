import { averageMacros, type Macros } from '@/lib/meals';
export function MacroLine({ macros: m }: { macros: Macros }) {
  return <p className="text-sm tabular-nums">{m.kcal} kcal · B {m.p} g · T {m.f} g · W {m.c} g{m.missing.length > 0 ? ' *' : ''}</p>;
}
export function PlanNutrition({ days, selected, checkGoal = false }: { days: Macros[]; selected: number; checkGoal?: boolean }) {
  const m = days[selected];
  if (!m) return null;
  const inRange = !m.missing.length && m.kcal >= 1700 && m.kcal <= 1800 && m.p >= 120 && m.p <= 145;
  return <div className="mt-3 space-y-2 border-y py-3">
    <div><p className="text-xs font-semibold text-muted-foreground">Bilans dnia · wartości szacunkowe</p><MacroLine macros={m}/></div>
    {checkGoal && <p className={`text-xs ${inRange ? 'text-primary' : 'text-warning-foreground'}`}>{inRange ? 'W zakresie: 1700–1800 kcal · B 120–145 g' : 'Poza zakresem lub niepełne dane: cel 1700–1800 kcal · B 120–145 g'}</p>}
    <div><p className="text-xs text-muted-foreground">Średnia dnia w tygodniu · wartości szacunkowe</p><MacroLine macros={averageMacros(days)}/></div>
    <p className="text-xs text-muted-foreground">Bilans bez porcji chłopaka. Wartości zależą od użytych produktów.</p>
  </div>;
}