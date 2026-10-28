import { pageHead } from "@/lib/page-head";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zakupy/")({
  head: () => pageHead("Wybierz listę zakupów", "Lista zakupów dla oryginalnych i własnych tygodni."),
  beforeLoad: () => {
    throw redirect({ to: "/zakupy/$n", params: { n: "1" } });
  },
});
