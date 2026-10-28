import { createFileRoute, Link } from "@tanstack/react-router";
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
      <h2 className="mt-6 text-xl">Oryginalne jadłospisy</h2>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {weeks.map((w) => (
          <Link
            key={w.n}
            to="/tydzien/$n"
            params={{ n: String(w.n) }}
            className={`${weekBg[w.n]} group flex aspect-[4/5] flex-col justify-between rounded-3xl p-4 shadow-soft transition-transform active:scale-[0.98]`}
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
        ))}
      </div>

      <p className="mt-6 rounded-2xl bg-warning p-4 text-xs leading-relaxed text-warning-foreground">
        Kalorie i makro to <strong>wartości szacunkowe</strong>, liczone z tabeli składników (wartości na 100 g). Gwiazdka * oznacza, że
        część składników ma dane do uzupełnienia.
      </p>
    </main>
  );
}
