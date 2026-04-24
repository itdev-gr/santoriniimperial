import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prefersReducedMotion } from '../src/lib/motion';

describe('prefersReducedMotion', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });
  it('returns true when matchMedia matches reduce', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: q.includes('reduce'), media: q }));
    expect(prefersReducedMotion()).toBe(true);
  });
  it('returns false when no-preference', () => {
    vi.stubGlobal('matchMedia', (q: string) => ({ matches: false, media: q }));
    expect(prefersReducedMotion()).toBe(false);
  });
  it('returns false when matchMedia is undefined (SSR)', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});
