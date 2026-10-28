import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLocalData } from "@/lib/local-data";
import { newId } from "@/lib/custom-data";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { weeks } from "@/data/recipes";
import { weekBg } from "@/components/MealCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Moje przepisy — jadłospis i przepisy" },
      { name: "description", content: "4 tygodnie jadłospisów: low-carb, zupy i konjac, azjatyckie kolacje, meal prep. Przepisy, makro i lista zakupów." },
      { property: "og:title", content: "Moje przepisy — jadłospis i przepisy" },
      { property: "og:description", content: "Przepisy z gramaturami, makro i lista zakupów na 4 tygodnie." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data, update, ready } = useLocalData();
  const navigate = useNavigate();
  const editOriginal = (n: number) => {
    const w = weeks.find((x) => x.n === n)!;
    const name = `${w.title} (moja wersja)`;
    const existing = data.weeks.find((x) => x.name === name);
    if (existing) { void navigate({ to: "/moj-tydzien/$id", params: { id: existing.id } }); return; }
    const id = newId("week");
    if (update((d) => ({ ...d, weeks: [...d.weeks, { id, name, days: w.days.map((day) => ({ ...day })) }] })))
      navigate({ to: "/moj-tydzien/$id", params: { id } });
  };
  return (
    <main className="px-4 pt-6">
      <header className="bg-hero rounded-3xl p-6 shadow-soft">
        <p className="text-sm font-medium text-accent-foreground">Twój plan posiłków</p>
        <h1 className="mt-1 text-4xl font-bold">Moje przepisy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          4 posiłki dziennie · 10:00 · 13:00 · 16:00 · 18:00
        </p>
      </header>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild><Link to="/szukaj">Moje przepisy</Link></Button>
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
              <Link key={w.id} to="/moj-tydzien/$id" params={{ id: w.id }} className="bg-card group flex min-h-32 flex-col justify-between rounded-3xl border p-4 shadow-soft transition-transform active:scale-[0.98]">
                <h3 className="break-words text-lg font-bold leading-tight">{w.name}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{w.days.flatMap((d) => Object.values(d)).filter(Boolean).length}/28 posiłków</span>
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
    </main>
  );
}
