/**
 * Directus bootstrap + content seeder (native i18n model).
 *
 *   node --env-file=.env scripts/directus.mjs <component> [<component> ...]
 *   node --env-file=.env scripts/directus.mjs header
 *   node --env-file=.env scripts/directus.mjs all
 *
 * Model:
 *   languages              code (pk: "ru","en"), name, direction
 *   strings                key (unique), component, keep_en, + translations (O2M)
 *   strings_translations   strings_id, languages_code, value   ← language tabs
 *
 * Also creates a "folder" preset per component in the sidebar.
 * Idempotent: safe to re-run.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIRECTUS_URL = (process.env.DIRECTUS_URL || "http://localhost:8055").replace(/\/$/, "");
const TOKEN = process.env.DIRECTUS_TOKEN;
const EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;

const LANGS = [
  { code: "ru", name: "Русский", direction: "ltr" },
  { code: "en", name: "English", direction: "ltr" },
];

// key-prefix → component (the page is split into these components)
const COMPONENTS = {
  header: ["nav."],
  hero: ["hero."],
  trust: ["trust."],
  features: ["feat.", "f1.", "f2.", "f3.", "f4."],
  inside: ["in.", "um."],
  why: ["why."],
  audience: ["aud."],
  cta: ["cta."],
  footer: ["foot."],
  entry: ["entry."],
  meta: ["page."],
};

// ---- read T + KEEP_EN out of ui.ts -----------------------------------------
function loadDictionary() {
  const src = readFileSync(join(ROOT, "src/i18n/ui.ts"), "utf8");
  const tStart = src.indexOf("export const T");
  const tBodyStart = src.indexOf("{", tStart);
  const keepIdx = src.indexOf("export const KEEP_EN");
  const region = src.slice(tBodyStart, keepIdx);
  const tLiteral = region.slice(0, region.lastIndexOf("};") + 1);
  const kStart = src.indexOf("[", keepIdx);
  const kEnd = src.indexOf("]", kStart);
  const kLiteral = src.slice(kStart, kEnd + 1);
  return { T: eval("(" + tLiteral + ")"), KEEP_EN: new Set(eval("(" + kLiteral + ")")) };
}

const componentOf = (key) =>
  Object.entries(COMPONENTS).find(([, ps]) => ps.some((p) => key.startsWith(p)))?.[0] ?? "other";

// ---- tiny Directus REST client ---------------------------------------------
let auth = "";
async function api(method, path, body) {
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(auth ? { Authorization: auth } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(`${method} ${path} → ${res.status}: ${json?.errors?.[0]?.message || text}`);
    err.status = res.status;
    err.code = json?.errors?.[0]?.extensions?.code;
    throw err;
  }
  return json;
}
async function exists(path) {
  try { await api("GET", path); return true; } catch (e) { if (e.status === 403 || e.status === 404) return false; throw e; }
}
// create, ignoring "already exists" style errors
async function tryCreate(path, body, label) {
  try { await api("POST", path, body); console.log(`✓ ${label}`); }
  catch (e) {
    if (e.status === 400 || e.code === "RECORD_NOT_UNIQUE" || /exist/i.test(e.message)) { console.log(`• ${label} (already exists)`); }
    else throw e;
  }
}

async function login() {
  const r = await api("POST", "/auth/login", { email: EMAIL, password: PASSWORD });
  auth = `Bearer ${r.data.access_token}`;
}

async function ensureLanguages() {
  if (!(await exists("/collections/languages"))) {
    await api("POST", "/collections", {
      collection: "languages",
      meta: { icon: "language", note: "Locales" },
      schema: {},
      fields: [
        { field: "code", type: "string", schema: { is_primary_key: true, length: 8 }, meta: { interface: "input", width: "half" } },
        { field: "name", type: "string", meta: { interface: "input", width: "half" } },
        { field: "direction", type: "string", schema: { default_value: "ltr" }, meta: { interface: "select-dropdown", width: "half", options: { choices: [{ text: "ltr", value: "ltr" }, { text: "rtl", value: "rtl" }] } } },
      ],
    });
    console.log("✓ collection `languages`");
  } else console.log("• collection `languages` (exists)");
  for (const l of LANGS) {
    if (!(await exists(`/items/languages/${l.code}`))) await api("POST", "/items/languages", l);
  }
}

async function ensureStrings() {
  if (!(await exists("/collections/strings"))) {
    await api("POST", "/collections", {
      collection: "strings",
      meta: { icon: "translate", note: "Site texts — one row per i18n key", display_template: "{{key}}", sort_field: "key" },
      schema: {},
      fields: [
        { field: "id", type: "integer", schema: { is_primary_key: true, has_auto_increment: true }, meta: { hidden: true, readonly: true } },
        { field: "key", type: "string", schema: { is_unique: true }, meta: { interface: "input", required: true, width: "half", note: "i18n key — do not change" } },
        { field: "component", type: "string", meta: { interface: "input", width: "half", note: "page section" } },
        { field: "keep_en", type: "boolean", schema: { default_value: false }, meta: { interface: "boolean", width: "half", note: "Always render EN (platform-UI strings)" } },
      ],
    });
    console.log("✓ collection `strings`");
  } else console.log("• collection `strings` (exists)");
}

async function ensureJunction() {
  if (!(await exists("/collections/strings_translations"))) {
    await api("POST", "/collections", {
      collection: "strings_translations",
      meta: { icon: "translate", hidden: true },
      schema: {},
      fields: [
        { field: "id", type: "integer", schema: { is_primary_key: true, has_auto_increment: true }, meta: { hidden: true } },
        { field: "strings_id", type: "integer", meta: { hidden: true } },
        { field: "languages_code", type: "string", schema: { length: 8 }, meta: { hidden: true } },
        { field: "value", type: "text", meta: { interface: "input-multiline" } },
      ],
    });
    console.log("✓ collection `strings_translations`");
  } else console.log("• collection `strings_translations` (exists)");
}

async function ensureTranslationsField() {
  if (!(await exists("/fields/strings/translations"))) {
    await api("POST", "/fields/strings", {
      field: "translations",
      type: "alias",
      meta: { interface: "translations", special: ["translations"], options: { languageField: "code", defaultLanguage: "ru" }, note: "Switch language with the tabs" },
    });
    console.log("✓ field `strings.translations` (language switcher)");
  } else console.log("• field `strings.translations` (exists)");
}

async function ensureRelations() {
  if (!(await exists("/relations/strings_translations/strings_id"))) {
    await api("POST", "/relations", {
      collection: "strings_translations",
      field: "strings_id",
      related_collection: "strings",
      meta: { one_field: "translations", junction_field: "languages_code", sort_field: null, one_deselect_action: "delete" },
      schema: { on_delete: "CASCADE" },
    });
    console.log("✓ relation strings_translations.strings_id → strings");
  } else console.log("• relation strings_id (exists)");

  if (!(await exists("/relations/strings_translations/languages_code"))) {
    await api("POST", "/relations", {
      collection: "strings_translations",
      field: "languages_code",
      related_collection: "languages",
      meta: { one_field: null, junction_field: "strings_id" },
      schema: { on_delete: "SET NULL" },
    });
    console.log("✓ relation strings_translations.languages_code → languages");
  } else console.log("• relation languages_code (exists)");
}

async function ensurePresets() {
  // one sidebar "folder" per component
  const existing = (await api("GET", "/presets?filter[collection][_eq]=strings&fields=bookmark&limit=-1")).data || [];
  const have = new Set(existing.map((p) => p.bookmark));
  for (const component of Object.keys(COMPONENTS)) {
    const label = component[0].toUpperCase() + component.slice(1);
    if (have.has(label)) continue;
    await api("POST", "/presets", {
      bookmark: label,
      collection: "strings",
      layout: "tabular",
      filter: { component: { _eq: component } },
      layout_query: { tabular: { sort: ["key"], fields: ["key", "component", "translations"] } },
      role: null,
      user: null,
    });
  }
  console.log("✓ component folders (presets) ensured");
}

async function ensureStaticToken() {
  if (!TOKEN) { console.log("• DIRECTUS_TOKEN not set — skipping"); return; }
  await api("PATCH", "/users/me", { token: TOKEN });
  console.log("✓ static token set on admin (used by Astro build)");
}

// ---- seeding ----------------------------------------------------------------
async function findStringId(key) {
  const r = await api("GET", `/items/strings?filter[key][_eq]=${encodeURIComponent(key)}&fields=id&limit=1`);
  return r.data?.[0]?.id ?? null;
}
async function findTranslationId(stringId, code) {
  const r = await api("GET", `/items/strings_translations?filter[strings_id][_eq]=${stringId}&filter[languages_code][_eq]=${code}&fields=id&limit=1`);
  return r.data?.[0]?.id ?? null;
}
async function upsertValue(stringId, code, value) {
  const id = await findTranslationId(stringId, code);
  if (id) await api("PATCH", `/items/strings_translations/${id}`, { value });
  else await api("POST", "/items/strings_translations", { strings_id: stringId, languages_code: code, value });
}
async function upsertString(key, entry, keepEn) {
  let id = await findStringId(key);
  if (id) {
    await api("PATCH", `/items/strings/${id}`, { component: componentOf(key), keep_en: keepEn });
  } else {
    const r = await api("POST", "/items/strings", { key, component: componentOf(key), keep_en: keepEn });
    id = r.data.id;
  }
  await upsertValue(id, "ru", entry.ru ?? entry.en);
  await upsertValue(id, "en", entry.en);
  return id;
}

// ---- main -------------------------------------------------------------------
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Usage: node --env-file=.env scripts/directus.mjs <component|all> ...");
  console.error("Components: " + Object.keys(COMPONENTS).join(", "));
  process.exit(1);
}

const { T, KEEP_EN } = loadDictionary();
const wanted = args.includes("all") ? Object.keys(COMPONENTS) : args;
const prefixes = wanted.flatMap((c) => COMPONENTS[c] || []);
const keys = Object.keys(T).filter((k) => prefixes.some((p) => k.startsWith(p)));

await login();
await ensureLanguages();
await ensureStrings();
await ensureJunction();
await ensureTranslationsField();
await ensureRelations();
await ensurePresets();
await ensureStaticToken();

let n = 0;
for (const key of keys) { await upsertString(key, T[key], KEEP_EN.has(key)); n++; }
console.log(`✓ seeded [${wanted.join(", ")}]: ${n} keys (${LANGS.length} languages each)`);
