// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { VitePWA } from "vite-plugin-pwa";

// GitHub Pages: GITHUB_PAGES=1 BASE_PATH=/nazwa-repo/ bun run build
// → statyczny SPA w dist/client (bez serwera).
const pages = process.env["GITHUB_PAGES"] === "1";
const base = process.env["BASE_PATH"] || "/";

export default defineConfig({
  tanstackStart: pages
    ? { spa: { enabled: true }, server: { entry: "server" } }
    : {
        // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
        server: { entry: "server" },
      },
  ...(pages ? { nitro: false as const } : {}),
  vite: { base },
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: null,
      devOptions: { enabled: false },
      manifest: false, // używamy public/manifest.webmanifest
      filename: "sw.js",
      workbox: {
        navigateFallback: null,
        globPatterns: ["**/*.{js,css,png,svg,ico,webmanifest,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) => request.mode === "navigate" && !url.pathname.startsWith("/~oauth"),
            handler: "NetworkFirst",
            options: { cacheName: "pages", networkTimeoutSeconds: 3 },
          },
          {
            urlPattern: ({ url }) => url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com",
            handler: "StaleWhileRevalidate",
            options: { cacheName: "fonts" },
          },
        ],
      },
    }),
  ],
});
