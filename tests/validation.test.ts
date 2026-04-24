import { describe, it, expect } from 'vitest';
import { validateBooking } from '../src/lib/validation';

describe('validateBooking', () => {
  const base = { name: 'Maria', email: 'm@x.com', phone: '+306900000000', service: 'transfer', date: '2099-05-10', pax: '2', message: '' };

  it('passes for a valid payload', () => {
    expect(validateBooking(base)).toEqual({ ok: true });
  });
  it('fails when name is empty', () => {
    const r = validateBooking({ ...base, name: '' }) as any;
    expect(r.ok).toBe(false);
    expect(r.errors.name).toBeDefined();
  });
  it('fails for malformed email', () => {
    const r = validateBooking({ ...base, email: 'nope' }) as any;
    expect(r.errors.email).toBeDefined();
  });
  it('fails when date is in the past', () => {
    const r = validateBooking({ ...base, date: '2000-01-01' }) as any;
    expect(r.errors.date).toBeDefined();
  });
  it('fails for non-numeric pax', () => {
    const r = validateBooking({ ...base, pax: 'abc' }) as any;
    expect(r.errors.pax).toBeDefined();
  });
});
