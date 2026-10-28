import { createFileRoute } from "@tanstack/react-router";
import { RecipeBrowser } from "./szukaj";

export const Route = createFileRoute("/ulubione")({
  head: () => ({
    meta: [
      { title: "Ulubione przepisy — Moje 4 tygodnie" },
      { name: "description", content: "Twoje ulubione przepisy zapisane na tym urządzeniu." },
      { property: "og:title", content: "Ulubione przepisy" },
      { property: "og:description", content: "Ulubione przepisy z planu 4 tygodni." },
    ],
  }),
  component: () => (
    <main className="px-4 pt-6">
      <h1 className="text-3xl font-bold">Ulubione</h1>
      <RecipeBrowser favOnly />
    </main>
  ),
});
