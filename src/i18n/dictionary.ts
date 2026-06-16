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

export { T, KEEP_EN };
