import en from "@/i18n/en.json";
import ru from "@/i18n/ru.json";

type TranslationValue = string | TranslationMap;
interface TranslationMap {
  [key: string]: TranslationValue;
}

const languages: Record<string, TranslationMap> = {
  en,
  ru,
};

export type LanguageCode = string;

export type LocalizationArgs = ReadonlyArray<string>;

/**
 * Walks through translation dictionary using a dotted key path.
 *
 * @param dict - Translation dictionary for one language
 * @param path - Array of keys (e.g. ["card", "header", "title"])
 * @returns Translated string or undefined
 */
export interface GetTranslation {
  (dict: TranslationMap, path: ReadonlyArray<string>): string | undefined;
}

const getTranslation: GetTranslation = (dict, path) => {
  let current: TranslationValue = dict;

  for (const key of path) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }
    current = current[key];
  }

  return typeof current === "string" ? current : undefined;
};

/**
 * Returns localized string for a given key and language.
 *
 * @param key - Dot-separated translation key
 * @param language - UI language code
 * @param args - Placeholder replacement pairs: key, value
 */
export interface Localize {
  (key: string, language: LanguageCode, ...args: LocalizationArgs): string;
}

export const localize: Localize = (key, language, ...args) => {
  const lang = languages[language] ?? languages.en;

  let translated = getTranslation(lang, key.split("."));

  if (!translated) return key;

  for (let i = 0; i < args.length; i += 2) {
    translated = translated.replace(new RegExp(`{${args[i]}}`, "g"), args[i + 1] ?? "");
  }

  return translated;
};
