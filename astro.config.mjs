// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// Static site with EN as the default locale (served at /) and RU at /ru.
export default defineConfig({
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: netlify(),

  integrations: [react()],

  // Keep classic `@media (max-width: …)` syntax in minified CSS: the default
  // target rewrites it to range syntax (`width <= …`), which Safari < 16.4
  // ignores. These are the minimum versions oklch() already requires.
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssTarget: ["safari15.4", "chrome111", "firefox113"],
    },
  },
});