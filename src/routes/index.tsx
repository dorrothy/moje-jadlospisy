import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { weeks } from "@/data/recipes";
import { weekBg } from "@/components/MealCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moje 4 tygodnie — jadłospis i przepisy" },
      { name: "description", content: "4 tygodnie jadłospisów: low-carb, zupy i konjac, azjatyckie kolacje, meal prep. Przepisy, makro i lista zakupów." },
      { property: "og:title", content: "Moje 4 tygodnie — jadłospis i przepisy" },
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
        <h1 className="mt-1 text-4xl font-bold">Moje 4 tygodnie</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          4 posiłki dziennie · 10:00 · 13:00 · 16:00 · 18:00
        </p>
      </header>

      <div className="mt-6 grid grid-cols-2 gap-3">
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
