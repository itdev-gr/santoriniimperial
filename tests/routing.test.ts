import { describe, it, expect } from 'vitest';
import { switchLocale, stripLocalePrefix } from '../src/lib/routing';

describe('switchLocale', () => {
  it('adds /el prefix when switching EN → EL', () => {
    expect(switchLocale('/tours/wine-experience', 'en', 'el')).toBe('/el/tours/wine-experience');
  });
  it('strips /el prefix when switching EL → EN', () => {
    expect(switchLocale('/el/tours/wine-experience', 'el', 'en')).toBe('/tours/wine-experience');
  });
  it('handles root path correctly', () => {
    expect(switchLocale('/', 'en', 'el')).toBe('/el/');
    expect(switchLocale('/el/', 'el', 'en')).toBe('/');
  });
  it('returns the input untouched when locales are equal', () => {
    expect(switchLocale('/fleet', 'en', 'en')).toBe('/fleet');
  });
  it('switches between prefixed locales via stripped path', () => {
    expect(switchLocale('/de/transfers/', 'de', 'fr')).toBe('/fr/transfers/');
    expect(switchLocale('/it/tours/sightseeing/', 'it', 'en')).toBe('/tours/sightseeing/');
  });
});

describe('stripLocalePrefix', () => {
  it('removes known locale prefixes', () => {
    expect(stripLocalePrefix('/fr/contact/')).toBe('/contact/');
    expect(stripLocalePrefix('/el')).toBe('/');
  });
});
