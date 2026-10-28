import { useEffect, useState } from 'react';
import { Check, ChefHat, ChevronDown, ListChecks, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CookingItem } from '@/lib/cooking';

// Full-screen cooking mode: ingredient list stays on top, steps below, screen kept awake while open.
export function CookingMode({ name, steps, ingredients, note, onClose }: {
  name: string;
  steps: string[];
  ingredients?: CookingItem[];
  note?: string;
  onClose: () => void;
}) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const [showItems, setShowItems] = useState(true);

  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    let cancelled = false;
    const nav = navigator as Navigator & { wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> } };
    nav.wakeLock?.request('screen').then(l => { if (cancelled) void l.release(); else lock = l; }).catch(() => undefined);
    document.body.style.overflow = 'hidden';
    return () => { cancelled = true; document.body.style.overflow = ''; if (lock) void lock.release(); };
  }, []);

  const finished = done.filter(Boolean).length;
  const items = ingredients ?? [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <ChefHat className="h-5 w-5 shrink-0 text-primary" />
        <h1 className="min-w-0 flex-1 truncate text-lg font-bold">{name}</h1>
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{finished}/{steps.length}</span>
        <Button size="icon" variant="ghost" aria-label="Zakończ gotowanie" onClick={onClose}><X className="h-5 w-5" /></Button>
      </header>
      {items.length > 0 && (
        <button
          onClick={() => setShowItems(v => !v)}
          aria-expanded={showItems}
          className="flex w-full shrink-0 items-center gap-2 border-b bg-secondary px-4 py-2.5 text-sm font-medium"
        >
          <ListChecks className="h-4 w-4 shrink-0 text-primary" />
          Składniki
          <span className="text-muted-foreground">({items.length})</span>
          <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform ${showItems ? '' : '-rotate-90'}`} />
        </button>
      )}
      {items.length > 0 && showItems && (
        <section className="max-h-[40vh] shrink-0 overflow-y-auto border-b px-4 py-2">
          <ul className="divide-y divide-border/60">
            {items.map((it, i) => (
              <li key={i} className="flex items-baseline justify-between gap-3 py-1.5 text-[15px]">
                <span className="min-w-0 break-words">{it.name}</span>
                <strong className="shrink-0 tabular-nums">{it.amount}</strong>
              </li>
            ))}
          </ul>
          {note && <p className="mt-2 pb-1 text-xs text-muted-foreground">{note}</p>}
        </section>
      )}
      <ol className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {steps.map((s, i) => (
          <li key={i}>
            <button
              onClick={() => setDone(d => d.map((v, k) => (k === i ? !v : v)))}
              aria-pressed={done[i]}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${done[i] ? 'border-primary bg-secondary' : 'bg-card'}`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg font-bold ${done[i] ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {done[i] ? <Check className="h-5 w-5" /> : i + 1}
              </span>
              <p className={`pt-1 text-lg leading-relaxed ${done[i] ? 'text-muted-foreground line-through' : ''}`}>{s}</p>
            </button>
          </li>
        ))}
      </ol>
      <footer className="border-t p-4">
        {finished === steps.length ? (
          <Button className="w-full" size="lg" onClick={onClose}>Smacznego! Zakończ</Button>
        ) : (
          <p className="text-center text-sm text-muted-foreground">Dotknij krok, aby go odhaczyć</p>
        )}
      </footer>
    </div>
  );
}
