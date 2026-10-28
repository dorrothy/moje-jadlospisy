import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { CalendarDays, Search, ShoppingBasket, Heart } from "lucide-react";

import { LocalDataProvider } from "@/lib/local-data";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { setupServiceWorker } from "../lib/pwa";

const BASE = import.meta.env.BASE_URL;

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-3 text-muted-foreground">Nie ma takiej strony.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
          Wróć do tygodni
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Coś poszło nie tak</h1>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
        >
          Spróbuj ponownie
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#c8603d" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: "Moje przepisy" },
      { title: "Moje przepisy" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: `${BASE}favicon.png` },
      { rel: "apple-touch-icon", href: `${BASE}icons/apple-touch-icon.png` },
      { rel: "manifest", href: `${BASE}manifest.webmanifest` },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const nav = [
  { to: "/", label: "Tygodnie", icon: CalendarDays, exact: true },
  { to: "/szukaj", label: "Szukaj", icon: Search },
  { to: "/ulubione", label: "Ulubione", icon: Heart },
  { to: "/zakupy", label: "Zakupy", icon: ShoppingBasket },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useEffect(() => {
    void setupServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LocalDataProvider>
      <div className="safe-top mx-auto min-h-screen max-w-2xl pb-28">
        <Outlet />
      </div>
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t bg-card/90 backdrop-blur-lg">
        <div className="mx-auto grid max-w-2xl grid-cols-4">
          {nav.map(({ to, label, icon: Icon, ...rest }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: "exact" in rest }}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    <Toaster />
      </LocalDataProvider>
    </QueryClientProvider>
  );
}
