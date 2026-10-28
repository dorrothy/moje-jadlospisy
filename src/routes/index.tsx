import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLocalData } from "@/lib/local-data";
import { newId, weekBgClass, weekEmoji, type WeekColor } from "@/lib/custom-data";
import { Pencil, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { weeks } from "@/data/recipes";
import { weekBg } from "@/components/MealCard";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Let's cook — jadłospis i przepisy" },
      { name: "description", content: "4 tygodnie jadłospisów: low-carb, zupy i konjac, azjatyckie kolacje, meal prep. Przepisy, makro i lista zakupów." },
      { property: "og:title", content: "Let's cook — jadłospis i przepisy" },
      { property: "og:description", content: "Przepisy z gramaturami, makro i lista zakupów na 4 tygodnie." },
    ],
  }),
  component: Index,
});

const defaultHero = { eyebrow: "Twój plan posiłków", title: "Let's cook", subtitle: "4 posiłki dziennie · 10:00 · 13:00 · 16:00 · 18:00" } as const;

function Index() {
  const { data, update, ready } = useLocalData();
  const navigate = useNavigate();
  const [heroOpen, setHeroOpen] = useState(false);
  const hero = { eyebrow: data.hero?.eyebrow ?? defaultHero.eyebrow, title: data.hero?.title ?? defaultHero.title, subtitle: data.hero?.subtitle ?? defaultHero.subtitle };
  const saveHero = (next: { eyebrow: string; title: string; subtitle: string }) => {
    const trimmed = { eyebrow: next.eyebrow.trim(), title: next.title.trim(), subtitle: next.subtitle.trim() };
    const isDefault =
      trimmed.eyebrow === defaultHero.eyebrow && trimmed.title === defaultHero.title && trimmed.subtitle === defaultHero.subtitle;
    update((d) => ({ ...d, ...(isDefault ? {} : { hero: trimmed }) }));
    setHeroOpen(false);
  };
  const editOriginal = (n: number) => {
    const w = weeks.find((x) => x.n === n)!;
    const name = `${w.title} (moja wersja)`;
    const existing = data.weeks.find((x) => x.name === name);
    if (existing) { void navigate({ to: "/moj-tydzien/$id", params: { id: existing.id } }); return; }
    const id = newId("week");
    const color = `week-${n}` as WeekColor;
    if (update((d) => ({ ...d, weeks: [...d.weeks, { id, name, emoji: w.emoji, color, days: w.days.map((day) => ({ ...day })) }] })))
      navigate({ to: "/moj-tydzien/$id", params: { id } });
  };
  return (
    <main className="px-4 pt-6">
      <header className="bg-hero relative rounded-3xl p-6 shadow-soft">
        <div className="absolute right-3 top-3">
          <Button size="icon" variant="ghost" className="h-9 w-9" aria-label="Edytuj nagłówek" onClick={() => setHeroOpen(true)}>
            <Pencil />
          </Button>
        </div>
        <p className="text-sm font-medium text-accent-foreground">{hero.eyebrow}</p>
        <h1 className="mt-1 text-4xl font-bold">{hero.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{hero.subtitle}</p>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild><Link to="/szukaj">Przepisy</Link></Button>
        <Button asChild variant="secondary"><Link to="/moje-tygodnie">Moje tygodnie</Link></Button>
        <Button asChild variant="outline"><Link to="/dane">Kopia danych</Link></Button>
        <Button asChild variant="outline"><Link to="/lodowka">Co mam w lodówce?</Link></Button>
        <Button asChild variant="outline"><Link to="/generator">Ułóż tydzień</Link></Button>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Własne dane są lokalne, zapisane tylko na tym urządzeniu.</p>
      {data.weeks.length > 0 && (
        <>
          <h2 className="mt-6 text-xl">Moje tygodnie</h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {data.weeks.map((w) => (
              <Link key={w.id} to="/moj-tydzien/$id" params={{ id: w.id }} className={`${weekBgClass(w)} group flex aspect-[4/5] flex-col justify-between rounded-3xl p-4 shadow-soft transition-transform active:scale-[0.98]`}>
                <span className="text-4xl">{weekEmoji(w)}</span>
                <div>
                  <h3 className="break-words text-lg font-bold leading-tight">{w.name}</h3>
                  <div className="mt-1 flex items-center justify-between text-xs text-foreground/70">
                    <span>{w.days.flatMap((d) => Object.values(d)).filter(Boolean).length}/28 posiłków</span>
                    <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
      <h2 className="mt-6 text-xl">Oryginalne jadłospisy</h2>
      <p className="mt-1 text-xs text-muted-foreground">„Edytuj” tworzy Twoją kopię tygodnia — oryginał zostaje bez zmian.</p>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {weeks.map((w) => (
          <div key={w.n} className="relative">
          <Link
            key={w.n}
            to="/tydzien/$n"
            params={{ n: String(w.n) }}
            className={`${weekBg[w.n]} group flex h-full aspect-[4/5] flex-col justify-between rounded-3xl p-4 shadow-soft transition-transform active:scale-[0.98]`}
          >
            <div className="flex items-start justify-between">
              <span className="text-4xl">{w.emoji}</span>
              <span className="font-display text-5xl font-bold text-foreground/15">{w.n}</span>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-foreground/60">Tydzień {w.n}</p>
              <h2 className="mt-1 text-lg font-bold leading-tight">{w.title}</h2>
              <p className="mt-1 hidden text-xs text-foreground/70 sm:block">{w.subtitle}</p>
              <ChevronRight className="mt-2 h-5 w-5 text-foreground/50 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
          <Button size="sm" variant="secondary" disabled={!ready} className="absolute bottom-3 right-3" aria-label={`Edytuj tydzień ${w.n}`} onClick={() => editOriginal(w.n)}><Pencil />Edytuj</Button>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-2xl bg-warning p-4 text-xs leading-relaxed text-warning-foreground">
        Kalorie i makro to <strong>wartości szacunkowe</strong>, liczone z tabeli składników (wartości na 100 g). Gwiazdka * oznacza, że
        część składników ma dane do uzupełnienia.
      </p>

      <Dialog open={heroOpen} onOpenChange={setHeroOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Edytuj nagłówek</DialogTitle>
          <DialogDescription>Tekst zapisuje się tylko na tym urządzeniu. Puste pola zostają bez zmian.</DialogDescription>
          <HeroForm
            key={heroOpen ? String(data.hero ? 1 : 0) : "closed"}
            initial={hero}
            onCancel={() => setHeroOpen(false)}
            onSave={saveHero}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function HeroForm({ initial, onSave, onCancel }: {
  initial: { eyebrow: string; title: string; subtitle: string };
  onSave: (next: { eyebrow: string; title: string; subtitle: string }) => void;
  onCancel: () => void;
}) {
  const [eyebrow, setEyebrow] = useState(initial.eyebrow);
  const [title, setTitle] = useState(initial.title);
  const [subtitle, setSubtitle] = useState(initial.subtitle);
  return (
    <form
      className="mt-2 space-y-3"
      onSubmit={(e) => { e.preventDefault(); onSave({ eyebrow, title, subtitle }); }}
    >
      <div className="space-y-1.5">
        <Label htmlFor="hero-eyebrow">Mały nagłówek</Label>
        <Input id="hero-eyebrow" value={eyebrow} maxLength={80} onChange={(e) => setEyebrow(e.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="hero-title">Nazwa</Label>
        <Input id="hero-title" value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="hero-subtitle">Podpis</Label>
        <Input id="hero-subtitle" value={subtitle} maxLength={120} onChange={(e) => setSubtitle(e.target.value)} required />
      </div>
      <div className="flex gap-2 pt-1">
        <Button type="submit" className="flex-1">Zapisz</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Anuluj</Button>
      </div>
    </form>
  );
}
