// @ts-check
import { defineConfig } from "astro/config";

import netlify from "@astrojs/netlify";
import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

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

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});