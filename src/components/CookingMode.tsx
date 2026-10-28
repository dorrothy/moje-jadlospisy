import { useEffect, useState } from 'react';
import { Check, ChefHat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Full-screen step-by-step mode; asks the OS to keep the screen on while cooking.
export function CookingMode({ name, steps, onClose }: { name: string; steps: string[]; onClose: () => void }) {
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const [wakeLock, setWakeLock] = useState<'on' | 'off' | 'unsupported'>('off');

  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null;
    let cancelled = false;
    const nav = navigator as Navigator & { wakeLock?: { request: (type: 'screen') => Promise<{ release: () => Promise<void> }> } };
    if (nav.wakeLock) {
      nav.wakeLock.request('screen').then(l => { if (cancelled) { void l.release(); } else { lock = l; setWakeLock('on'); } }).catch(() => setWakeLock('unsupported'));
    } else setWakeLock('unsupported');
    document.body.style.overflow = 'hidden';
    return () => { cancelled = true; document.body.style.overflow = ''; if (lock) void lock.release(); };
  }, []);

  const finished = done.filter(Boolean).length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <header className="flex items-center gap-2 border-b px-4 py-3">
        <ChefHat className="h-5 w-5 shrink-0 text-primary" />
        <h1 className="min-w-0 flex-1 truncate text-lg font-bold">{name}</h1>
        <span className="shrink-0 text-sm text-muted-foreground tabular-nums">{finished}/{steps.length}</span>
        <Button size="icon" variant="ghost" aria-label="Zakończ gotowanie" onClick={onClose}><X className="h-5 w-5" /></Button>
      </header>
      {wakeLock === 'on' && <p className="bg-secondary px-4 py-1.5 text-center text-xs text-muted-foreground">Ekran nie będzie gasnąć podczas gotowania</p>}
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
