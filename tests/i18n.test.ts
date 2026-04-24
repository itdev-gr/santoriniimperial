import { describe, it, expect, vi } from 'vitest';
import { createT, type Locale } from '../src/lib/i18n';
import en from '../src/content/i18n/en.json';
import gr from '../src/content/i18n/gr.json';

describe('createT', () => {
  it('returns the EN value for a dot-notation key when locale is en', () => {
    const t = createT('en', { en, gr });
    expect(t('home.hero.headline')).toBe((en as any).home.hero.headline);
  });

  it('returns the GR value when locale is el', () => {
    const t = createT('el', { en, gr });
    expect(t('home.hero.headline')).toBe((gr as any).home.hero.headline);
  });

  it('falls back to EN when the GR key is missing', () => {
    const bundles = { en: { foo: 'bar' }, gr: {} } as any;
    const t = createT('el', bundles);
    expect(t('foo')).toBe('bar');
  });

  it('returns the key itself when missing in both bundles (and warns)', () => {
    const t = createT('en', { en: {}, gr: {} } as any);
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(t('missing.key')).toBe('missing.key');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('narrows Locale type to "en" | "el"', () => {
    const valid: Locale[] = ['en', 'el'];
    // @ts-expect-error — "fr" is not a valid locale
    const _invalid: Locale = 'fr';
    expect(valid).toHaveLength(2);
  });
});
