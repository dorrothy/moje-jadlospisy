import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Minus, Plus, RotateCcw } from "lucide-react";
import { useLocalData } from "@/lib/local-data";
import { weeks } from "@/data/recipes";
import { shoppingList, formatItemAmount } from "@/lib/meals";
import { useStored } from "@/lib/storage";
import { Chip } from "./szukaj";

export const Route = createFileRoute("/zakupy/$n")({
  loader: ({ params }) => {
    const week = weeks.find((w) => String(w.n) === params.n);
    if (!week) throw notFound();
    return { week };
  },
  head: ({ loaderData }) => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: `Lista zakupów — tydzień ${loaderData?.week.n ?? ""} — Let's cook` },
      { name: "description", content: "Lista zakupów na cały tydzień z odhaczaniem i licznikiem porcji." },
      { property: "og:title", content: "Lista zakupów na tydzień" },
      { property: "og:description", content: "Wszystkie składniki tygodnia w jednym miejscu." },
    ],
  }),
  component: ShoppingPage,
});

function ShoppingPage() {
  const { data } = useLocalData();
  const { week } = Route.useLoaderData();
  const [servings, setServings] = useStored<number>(`servings-${week.n}`, 1);
  const [checked, setChecked] = useStored<string[]>(`shop-${week.n}`, []);
  const rows = shoppingList(week.n, servings);
  const aisles = [...new Set(rows.map((r) => r.aisle))];
  const done = rows.filter((r) => checked.includes(r.id)).length;

  return (
    <main className="px-4 pt-6">
      <h1 className="text-3xl font-bold">Lista zakupów</h1>
      <Link className="mt-3 block text-sm text-primary" to="/dodatkowe-zakupy">Dodatkowe zakupy z lodówki ({data.extraShopping?.length??0}) →</Link>
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {weeks.map((w) => (
          <Link key={w.n} to="/zakupy/$n" params={{ n: String(w.n) }}>
            <Chip active={w.n === week.n} onClick={() => {}}>Tydz. {w.n}</Chip>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">{data.weeks.map(w => <Link className="rounded-lg border bg-card px-3 py-2 text-sm" key={w.id} to="/moje-zakupy/$id" params={{id:w.id}}>{w.name}</Link>)}<Link className="px-3 py-2 text-sm text-primary" to="/moje-tygodnie">Moje tygodnie</Link></div>
      <p className="mt-3 text-sm text-muted-foreground">{week.title} · 7 dni × 4 posiłki</p>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-card p-3 shadow-soft">
        <div>
          <p className="text-sm font-semibold">Liczba porcji</p>
          <p className="text-xs text-muted-foreground">{done}/{rows.length} kupione</p>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Mniej porcji" onClick={() => setServings(Math.max(1, servings - 1))} className="rounded-full bg-muted p-2"><Minus className="h-4 w-4" /></button>
          <span className="w-6 text-center text-lg font-bold">{servings}</span>
          <button aria-label="Więcej porcji" onClick={() => setServings(servings + 1)} className="rounded-full bg-muted p-2"><Plus className="h-4 w-4" /></button>
          <button aria-label="Wyczyść odhaczenia" onClick={() => setChecked([])} className="ml-1 rounded-full p-2 text-muted-foreground"><RotateCcw className="h-4 w-4" /></button>
        </div>
      </div>

      {aisles.map((a) => (
        <section key={a} className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{a}</h2>
          <ul className="mt-2 divide-y overflow-hidden rounded-2xl border bg-card">
            {rows.filter((r) => r.aisle === a).map((r) => {
              const on = checked.includes(r.id);
              return (
                <li key={r.id} className="flex items-start gap-3 p-3">
                  <button
                    aria-label={on ? `Odznacz ${r.name}` : `Odhacz ${r.name}`}
                    onClick={() => setChecked(on ? checked.filter((x) => x !== r.id) : [...checked, r.id])}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors ${on ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}
                  >
                    {on && <Check className="h-4 w-4" />}
                  </button>
                  <div className={`min-w-0 flex-1 ${on ? "opacity-50" : ""}`}>
                    <div className="flex justify-between gap-2">
                      <span className={`font-medium ${on ? "line-through" : ""}`}>{r.name}</span>
                      <span className="shrink-0 font-semibold tabular-nums">{formatItemAmount(r.id,r.grams)}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {r.recipes.map((rec) => (
                        <Link key={rec.id} to="/przepis/$id" params={{ id: rec.id }} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                          {rec.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
