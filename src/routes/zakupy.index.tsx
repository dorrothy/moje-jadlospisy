import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/zakupy/")({
  beforeLoad: () => {
    throw redirect({ to: "/zakupy/$n", params: { n: "1" } });
  },
});
