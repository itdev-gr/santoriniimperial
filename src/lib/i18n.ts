export type Locale = 'en' | 'el';

export const LOCALES: Locale[] = ['en', 'el'];
export const DEFAULT_LOCALE: Locale = 'en';
export const URL_PREFIX: Record<Locale, string> = { en: '', el: '/el' };

type Bundle = Record<string, unknown>;
type Bundles = { en: Bundle; gr: Bundle };

const BUNDLE_KEY: Record<Locale, keyof Bundles> = { en: 'en', el: 'gr' };

function lookup(bundle: Bundle, key: string): string | undefined {
  const parts = key.split('.');
  let cur: unknown = bundle;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function createT(locale: Locale, bundles: Bundles) {
  return (key: string): string => {
    const primary = lookup(bundles[BUNDLE_KEY[locale]], key);
    if (primary !== undefined) return primary;
    if (locale !== 'en') {
      const fallback = lookup(bundles.en, key);
      if (fallback !== undefined) return fallback;
    }
    console.warn(`[i18n] missing key: ${key}`);
    return key;
  };
}

export function localePath(locale: Locale, path: string): string {
  const prefix = URL_PREFIX[locale];
  if (!path.startsWith('/')) path = '/' + path;
  return prefix + path;
}
