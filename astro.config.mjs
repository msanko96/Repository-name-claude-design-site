// @ts-check
import { defineConfig } from "astro/config";

// Static site with RU as the default locale (served at /) and EN at /en.
//
// No adapter: the site is deployed as plain static files behind nginx, not on
// Netlify. The former on-demand routes (/api/waitlist, /api/freelancer) are
// proxied to their Procesio webhooks by nginx — see charts/landings in the
// infra repo (web.astro.apiProxy).
export default defineConfig({
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
