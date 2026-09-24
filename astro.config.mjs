// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";

// Static site with RU as the default locale (served at /) and EN at /en.
export default defineConfig({
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: false,
    },
  },

  adapter: netlify(),

  // Keep classic `@media (max-width: …)` syntax in minified CSS: the default
  // target rewrites it to range syntax (`width <= …`), which Safari < 16.4
  // ignores. These are the minimum versions oklch() already requires.
  vite: {
    build: {
      cssTarget: ["safari15.4", "chrome111", "firefox113"],
    },
  },
});