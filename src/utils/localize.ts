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

const getTranslation = (dict: TranslationMap, path: string[]): string | undefined => {
  let current: TranslationValue = dict;

  for (const key of path) {
    if (typeof current !== "object" || current === null) {
      return undefined;
    }
    current = current[key];
  }

  return typeof current === "string" ? current : undefined;
};

export const localize = (key: string, language: string, ...args: ReadonlyArray<string>): string => {
  const lang = languages[language] ?? languages.en;

  let translated = getTranslation(lang, key.split("."));

  if (!translated) return key;

  for (let i = 0; i < args.length; i += 2) {
    translated = translated.replace(new RegExp(`{${args[i]}}`, "g"), args[i + 1] ?? "");
  }

  return translated;
};
