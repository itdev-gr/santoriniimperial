import type { Locale } from './i18n';
import { URL_PREFIX } from './i18n';

const PREFIX_PATTERN = /^\/(el|de|fr|it)(?=\/|$)/;

export function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(PREFIX_PATTERN, '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function switchLocale(pathname: string, from: Locale, to: Locale): string {
  if (from === to) return pathname;
  const normalized = stripLocalePrefix(pathname);
  const prefix = URL_PREFIX[to];
  if (!prefix) return normalized === '/' ? '/' : normalized;
  if (normalized === '/') return `${prefix}/`;
  return `${prefix}${normalized}`;
}
