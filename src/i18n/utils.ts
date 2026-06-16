import { T, KEEP_EN, type Lang } from "./dictionary";

export type { Lang };

export const LANGS: Lang[] = ["ru", "en"];
export const DEFAULT_LANG: Lang = "ru";

/** Derive the active locale from the request URL (/en/... → "en", else "ru"). */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split("/");
  return seg === "en" ? "en" : "ru";
}

/**
 * Returns a translator bound to a locale.
 * KEEP_EN keys always resolve to the English string (platform-UI mockups).
 */
export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    const entry = T[key];
    if (!entry) return key;
    if (KEEP_EN.has(key)) return entry.en;
    return entry[lang] ?? entry.en;
  };
}

/** Path to the same page in the other locale (used by the language switch). */
export function altLangPath(lang: Lang): string {
  return lang === "en" ? "/" : "/en/";
}
