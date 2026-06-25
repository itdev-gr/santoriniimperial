import { describe, it, expect, vi } from 'vitest';
import { createT, LOCALES, type Locale } from '../src/lib/i18n';
import { bundles } from '../src/lib/bundles';

describe('createT', () => {
  it('returns the EN value for a dot-notation key when locale is en', () => {
    const t = createT('en');
    expect(t('home.hero.headline')).toBe((bundles.en as any).home.hero.headline);
  });

  it('returns the GR value when locale is el', () => {
    const t = createT('el');
    expect(t('home.hero.headline')).toBe((bundles.gr as any).home.hero.headline);
  });

  it('returns DE value when locale is de', () => {
    const t = createT('de');
    expect(t('nav.home')).toBe('Startseite');
  });

  it('falls back to EN when the GR key is missing', () => {
    const bundleMap = { ...bundles, gr: {} } as typeof bundles;
    const t = createT('el', bundleMap);
    expect(t('meta.home_title')).toBe((bundles.en as any).meta.home_title);
  });

  it('returns the key itself when missing in both bundles (and warns)', () => {
    const empty = { en: {}, gr: {}, de: {}, fr: {}, it: {} } as typeof bundles;
    const t = createT('en', empty);
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(t('missing.key')).toBe('missing.key');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('includes five locales', () => {
    const valid: Locale[] = ['en', 'el', 'de', 'fr', 'it'];
    expect(LOCALES).toEqual(valid);
    expect(valid).toHaveLength(5);
  });
});
