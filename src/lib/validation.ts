export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  pax: string;
  message: string;
}

export type BookingResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<keyof BookingPayload, string>> };

export function validateBooking(p: BookingPayload): BookingResult {
  const errors: Partial<Record<keyof BookingPayload, string>> = {};
  if (!p.name.trim()) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) errors.email = 'A valid email is required.';
  if (!p.phone.trim()) errors.phone = 'A phone number helps us reach you quickly.';
  if (!p.service) errors.service = 'Select a service.';
  if (!p.date) errors.date = 'Please choose a date.';
  else {
    const d = new Date(p.date);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (isNaN(d.getTime()) || d < today) errors.date = 'Date must be today or later.';
  }
  if (!/^\d+$/.test(p.pax) || Number(p.pax) < 1) errors.pax = 'Passenger count must be at least 1.';
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}
