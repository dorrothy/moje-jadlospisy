import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ShoppingBasket } from "lucide-react";
import { z } from "zod";
import { weeks, dayNames, dayShort, mealSlots, recipeById } from "@/data/recipes";
import { MealCard, weekBg } from "@/components/MealCard";
import { computeMacros } from "@/lib/meals";

export const Route = createFileRoute("/tydzien/$n")({
  validateSearch: z.object({ dzien: z.number().int().min(0).max(6).optional() }),
  loader: ({ params }) => {
    const week = weeks.find((w) => String(w.n) === params.n);
    if (!week) throw notFound();
    return { week };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `Tydzień ${loaderData.week.n}: ${loaderData.week.title}` : "Tydzień";
    return {
      meta: [
        { title: `${t} — Moje 4 tygodnie` },
        { name: "description", content: loaderData ? `${loaderData.week.subtitle}. 7 dni, 4 posiłki dziennie.` : "Plan tygodnia" },
        { property: "og:title", content: t },
        { property: "og:description", content: "7 dni, 4 posiłki dziennie z przepisami." },
      ],
    };
  },
  component: WeekPage,
});

function WeekPage() {
  const { week } = Route.useLoaderData();
  const { dzien = 0 } = Route.useSearch();
  const day = week.days[dzien];
  const total = mealSlots.reduce(
    (acc, s) => {
      const m = computeMacros(recipeById[day[s.type]].ingredients);
      return { kcal: acc.kcal + m.kcal, p: acc.p + m.p, miss: acc.miss || m.missing.length > 0 };
    },
    { kcal: 0, p: 0, miss: false },
  );

  return (
    <main>
      <header className={`${weekBg[week.n]} rounded-b-3xl px-4 pb-4 pt-5`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="-ml-2 inline-flex items-center rounded-full p-2 text-sm font-medium">
            <ChevronLeft className="h-5 w-5" /> Tygodnie
          </Link>
          <Link to="/zakupy/$n" params={{ n: String(week.n) }} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 text-sm font-medium shadow-soft">
            <ShoppingBasket className="h-4 w-4 text-primary" /> Zakupy
          </Link>
        </div>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-foreground/60">Tydzień {week.n} {week.emoji}</p>
        <h1 className="text-3xl font-bold">{week.title}</h1>

        <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          {dayShort.map((d, i) => (
            <Link
              key={d}
              to="/tydzien/$n"
              params={{ n: String(week.n) }}
              search={{ dzien: i }}
              replace
              className={`flex min-w-12 flex-col items-center rounded-2xl px-3 py-2 text-sm font-semibold transition-colors ${
                i === dzien ? "bg-primary text-primary-foreground shadow-soft" : "bg-card/70 text-foreground"
              }`}
            >
              <span className="text-[10px] font-medium opacity-70">dz.{i + 1}</span>
              {d}
            </Link>
          ))}
        </div>
      </header>

      <section className="px-4 pt-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-bold">{dayNames[dzien]}</h2>
          <p className="text-xs text-muted-foreground">
            ~{total.kcal} kcal{total.miss ? "*" : ""} · B {Math.round(total.p)} g · szacunkowo
          </p>
        </div>
        <div className="mt-3 space-y-3">
          {mealSlots.map((s) => (
            <MealCard key={s.type} recipe={recipeById[day[s.type]]} time={s.time} label={s.label} />
          ))}
        </div>
      </section>
    </main>
  );
}
