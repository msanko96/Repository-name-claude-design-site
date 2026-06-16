# Directus — site content (CMS)

All page text lives in Directus (collection `translations`). Astro pulls it at
**build time** (prerender) and falls back to `src/i18n/ui.ts` if Directus is
unreachable — so the build never breaks and local dev works offline.

## Data model (native i18n)

- **`languages`** — locales: `ru`, `en`.
- **`strings`** — one row per i18n key:
  | field        | type    | notes                                          |
  |--------------|---------|------------------------------------------------|
  | `key`        | string  | i18n key (unique) — **do not change**          |
  | `component`  | string  | page section (header, hero, …)                 |
  | `keep_en`    | boolean | always render EN (platform-UI strings)         |
  | `translations` | —     | the **language switcher** (RU/EN tabs)         |
- **`strings_translations`** — the per-language `value` (may contain inline HTML).

In the editor you switch language with the **RU/EN tabs** (no side-by-side columns).
In the sidebar, each component is a **folder** (a saved preset): Header, Hero,
Trust, Features, Inside, Why, Audience, Cta, Footer, Entry, Meta.

## Local workflow

```bash
# 1. start Directus + Postgres (http://localhost:8055)
npm run directus:up

# 2. create the collection, set the build token, and seed content.
#    Migration goes component-by-component:
npm run directus:seed -- header
npm run directus:seed -- hero
npm run directus:seed -- all        # everything at once

# 3. run the site — it reads content from Directus
npm run dev          # or: npm run build
```

Admin UI: http://localhost:8055 — credentials are in `directus/.env`
(`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

Available components for `directus:seed`:
`header, hero, trust, features, inside, why, audience, cta, footer, entry, meta`.

## Env files (git-ignored — see `.env.example`)

- `directus/.env` — secrets for docker-compose (DB, `SECRET`, admin creds)
- `.env` (repo root) — `DIRECTUS_URL`, `DIRECTUS_TOKEN` (used by Astro build &
  the seed script), plus admin creds for the script

## Deploy (later)

- Host Directus (own VPS via this compose, or a PaaS) with a managed Postgres,
  a volume for uploads, HTTPS and a domain.
- In Netlify set `DIRECTUS_URL` + `DIRECTUS_TOKEN`; content bakes at build.
- Add a Directus Flow → Netlify Build Hook so editing text triggers a rebuild.
