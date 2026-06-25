// Build-time fetch of site content from Directus.
// Runs server-side (prerender / dev render); failures fall back to local ui.ts.

export interface TranslationRow {
  key: string;
  value_ru: string | null;
  value_en: string | null;
  keep_en: boolean;
}

function env(name: string): string | undefined {
  // import.meta.env is populated from .env by Vite; process.env covers CI/Netlify.
  return (import.meta.env as Record<string, string | undefined>)[name] ?? process.env[name];
}

interface StringItem {
  key: string;
  keep_en: boolean;
  translations: { languages_code: string; value: string | null }[] | null;
}

export async function fetchDirectusTranslations(): Promise<TranslationRow[]> {
  const base = (env("DIRECTUS_URL") ?? "").replace(/\/$/, "");
  const token = env("DIRECTUS_TOKEN");
  if (!base) return [];

  const url =
    `${base}/items/strings?limit=-1` +
    `&fields=key,keep_en,translations.languages_code,translations.value`;
  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok) {
      console.warn(`[i18n] Directus fetch failed (${res.status}) — using local ui.ts`);
      return [];
    }
    const json = await res.json();
    const items = (json?.data as StringItem[]) ?? [];
    return items.map((it) => {
      const byLang = Object.fromEntries((it.translations ?? []).map((t) => [t.languages_code, t.value]));
      return {
        key: it.key,
        value_ru: byLang.ru ?? null,
        value_en: byLang.en ?? null,
        keep_en: it.keep_en,
      };
    });
  } catch (err) {
    console.warn(`[i18n] Directus unreachable — using local ui.ts:`, (err as Error).message);
    return [];
  }
}
