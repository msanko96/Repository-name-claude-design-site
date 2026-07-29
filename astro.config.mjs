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

  vite: {
    plugins: [tailwindcss()],
  },
});