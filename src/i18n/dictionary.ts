// Merged translation dictionary: local ui.ts is the base/fallback, and any keys
// present in Directus override it. The top-level await guarantees the data is
// loaded before any component renders (build-time prerender / dev render).
import { T as LOCAL_T, KEEP_EN as LOCAL_KEEP_EN, type Lang } from "./ui";
import { fetchDirectusTranslations } from "./directus";

export type { Lang };
type Entry = { en: string; ru?: string };

const T: Record<string, Entry> = { ...LOCAL_T };
const KEEP_EN = new Set<string>(LOCAL_KEEP_EN);

const rows = await fetchDirectusTranslations();
for (const row of rows) {
  if (!row.key) continue;
  const en = row.value_en ?? "";
  T[row.key] = { en, ru: row.value_ru ?? en };
  // Directus is authoritative for the keep_en flag of migrated keys.
  if (row.keep_en) KEEP_EN.add(row.key);
  else KEEP_EN.delete(row.key);
}

if (rows.length) {
  console.log(`[i18n] merged ${rows.length} key(s) from Directus`);
}

// Local overrides that win over Directus for specific keys. Used for the
// real-people testimonials (LinkedIn names/roles) while Directus is still
// being synced — remove a key here once Directus carries the same value.
const LOCAL_OVERRIDES = ["trust.v1.who", "trust.v2.who", "trust.v2.role"];
for (const key of LOCAL_OVERRIDES) {
  if (LOCAL_T[key]) T[key] = LOCAL_T[key];
}

export { T, KEEP_EN };
