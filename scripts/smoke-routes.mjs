#!/usr/bin/env node
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const routes = [
  '/', '/tours/', '/tours/wine-experience/', '/tours/sightseeing/', '/tours/full-day/', '/tours/luxe-photo-tour/',
  '/transfers/', '/fleet/', '/gallery/', '/about/', '/contact/',
  '/blog/', '/blog/planning-your-santorini-transfer/', '/blog/welcome-to-santorini/',
  '/el/', '/el/tours/', '/el/tours/wine-experience/', '/el/tours/sightseeing/', '/el/tours/full-day/', '/el/tours/luxe-photo-tour/',
  '/el/transfers/', '/el/fleet/', '/el/gallery/', '/el/about/', '/el/contact/',
  '/el/blog/', '/el/blog/planning-your-santorini-transfer/', '/el/blog/welcome-to-santorini/',
];

const failures = [];
for (const r of routes) {
  const url = BASE + r;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`${ok ? '✓' : '✗'} ${res.status}  ${url}`);
    if (!ok) failures.push({ url, status: res.status });
  } catch (err) {
    console.log(`✗ ERR  ${url}  ${err.message}`);
    failures.push({ url, error: err.message });
  }
}
console.log(`\n${routes.length - failures.length} / ${routes.length} routes OK`);
if (failures.length > 0) {
  console.error('Failures:', failures);
  process.exit(1);
}
