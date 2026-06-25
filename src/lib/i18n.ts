import { bundles, type BundleKey } from './bundles';

export type Locale = 'en' | 'el' | 'de' | 'fr' | 'it';

export const LOCALES: Locale[] = ['en', 'el', 'de', 'fr', 'it'];
export const DEFAULT_LOCALE: Locale = 'en';

export const URL_PREFIX: Record<Locale, string> = {
  en: '',
  el: '/el',
  de: '/de',
  fr: '/fr',
  it: '/it',
};

export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  el: 'el',
  de: 'de',
  fr: 'fr',
  it: 'it',
};

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  el: 'el_GR',
  de: 'de_DE',
  fr: 'fr_FR',
  it: 'it_IT',
};

const BUNDLE_KEY: Record<Locale, BundleKey> = {
  en: 'en',
  el: 'gr',
  de: 'de',
  fr: 'fr',
  it: 'it',
};

type Bundle = Record<string, unknown>;

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

export function createT(locale: Locale, bundleMap: Record<BundleKey, Bundle> = bundles) {
  return (key: string): string => {
    const primary = lookup(bundleMap[BUNDLE_KEY[locale]], key);
    if (primary !== undefined) return primary;
    if (locale !== 'en') {
      const fallback = lookup(bundleMap.en, key);
      if (fallback !== undefined) return fallback;
    }
    console.warn(`[i18n] missing key: ${key}`);
    return key;
  };
}

export function localePath(locale: Locale, path: string): string {
  const prefix = URL_PREFIX[locale];
  if (!path.startsWith('/')) path = '/' + path;
  if (prefix === '') return path;
  if (path === '/') return `${prefix}/`;
  return prefix + path;
}

export function bundleForLocale(locale: Locale): Bundle {
  return bundles[BUNDLE_KEY[locale]];
}
