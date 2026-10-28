// Po buildzie GitHub Pages: fallback SPA + service worker (offline) w dist/client.
import { generateSW } from "workbox-build";
import { copyFileSync, existsSync, writeFileSync } from "node:fs";
const dir = "dist/client";
if (!existsSync(`${dir}/index.html`)) copyFileSync(`${dir}/_shell.html`, `${dir}/index.html`);
copyFileSync(`${dir}/index.html`, `${dir}/404.html`);
writeFileSync(`${dir}/.nojekyll`, "");
const { count } = await generateSW({
  globDirectory: dir,
  globPatterns: ["**/*.{js,css,png,svg,ico,webmanifest,woff2}"],
  swDest: `${dir}/sw.js`,
  skipWaiting: true,
  clientsClaim: true,
  navigateFallback: null,
  runtimeCaching: [
    { urlPattern: ({ request }) => request.mode === "navigate", handler: "NetworkFirst", options: { cacheName: "pages", networkTimeoutSeconds: 3 } },
    { urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//, handler: "StaleWhileRevalidate", options: { cacheName: "fonts" } },
  ],
});
console.log(`sw.js: ${count} plików w cache offline`);
