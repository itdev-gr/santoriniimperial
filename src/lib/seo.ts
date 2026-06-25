import type { Locale } from './i18n';
import { LOCALES } from './i18n';
import { switchLocale } from './routing';

export function absoluteUrl(site: string, pathname: string): string {
  const base = site.replace(/\/$/, '');
  const path = pathname || '/';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function hreflangAlternates(site: string, pathname: string, locale: Locale) {
  const alternates = Object.fromEntries(
    LOCALES.map((loc) => [loc, absoluteUrl(site, switchLocale(pathname, locale, loc))]),
  ) as Record<Locale, string>;

  return {
    canonical: absoluteUrl(site, pathname),
    alternates,
    xDefault: alternates.en,
  };
}
