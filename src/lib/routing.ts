import type { Locale } from './i18n';

export function switchLocale(pathname: string, from: Locale, to: Locale): string {
  if (from === to) return pathname;
  // Strip the /el prefix if going from EL → anything
  const stripped = from === 'el'
    ? (pathname.replace(/^\/el(?=\/|$)/, '') || '/')
    : pathname;
  // Ensure the stripped path starts with /
  const normalized = stripped.startsWith('/') ? stripped : '/' + stripped;
  if (to === 'el') {
    // Root /  → /el/
    if (normalized === '/') return '/el/';
    return '/el' + normalized;
  }
  return normalized;
}
