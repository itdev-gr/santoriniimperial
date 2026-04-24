# Santorini Imperial — Redesign

A bilingual (EN + GR) Astro site redesigning **https://santoriniimperial.com/** using the editorial-luxury design tokens documented in [`DESIGN.md`](./DESIGN.md) (originally extracted from rhodestransfer24.com).

## Quickstart

    npm install
    npm run dev

Opens at http://localhost:4321/. Greek locale at http://localhost:4321/el/ (or /gr which redirects to /el).

## Scripts

- `npm run dev` — Astro dev server with HMR
- `npm run build` — static production build to `dist/`
- `npm run preview` — preview production build locally
- `npm test` — run Vitest suite (i18n, routing, motion, validation)
- `npm run smoke` — request every route and assert 2xx/3xx (requires dev server running)
- `npm run astro check` — TypeScript + schema check

## Project status

**This is a redesign concept, not production-ready.** Before any public deployment:

1. [ ] Greek copy must be human-proofed by a native speaker — see [`LOCALIZATION.md`](./LOCALIZATION.md).
2. [ ] Borrowed imagery in `/public/images/` must be legally cleared — see [`public/images/ATTRIBUTIONS.md`](./public/images/ATTRIBUTIONS.md).
3. [ ] Tour prices (`price_from_eur` in each tour Markdown) need real values — currently null.
4. [ ] Booking form is visual-only; swap in Formspree / backend before launch.
5. [ ] Content gaps listed in `ATTRIBUTIONS.md` (Sprinter fleet photos, full-day tour image, SVG logo) need client-supplied imagery.

## Architecture

- **Astro 6** static site, built-in i18n routing (`en` default at root, `el` under `/el/` with `/gr` alias).
- **Tailwind CSS v4** with DESIGN.md tokens in `src/styles/global.css` `@theme` block.
- **GSAP** for hero word reveal, parallax, section entrance stagger — guarded by `prefers-reduced-motion`.
- **Vitest** for the i18n helper, routing helper, motion guard, and form validation.

## File layout

    src/
      components/              — reusable UI (Hero, cards, form, gallery, etc.)
      layouts/BaseLayout.astro
      lib/                     — i18n.ts, routing.ts, motion.ts, animations.ts, validation.ts
      content/
        i18n/{en,gr}.json      — UI string bundles
        tours/{en,el}/         — tour content (markdown)
        blog/{en,el}/          — blog posts
      pages/                   — file-based routes
      styles/global.css        — Tailwind directives + DESIGN.md tokens
    public/
      images/                  — downloaded SI brand assets (see ATTRIBUTIONS.md)

## Design source

[`DESIGN.md`](./DESIGN.md) is the single source of truth for colors, typography, radii, shadows, and motion patterns. All Tailwind theme extensions derive from it.

## Routes (28 total)

English: `/`, `/tours/`, `/tours/wine-experience/`, `/tours/sightseeing/`, `/tours/full-day/`, `/tours/luxe-photo-tour/`, `/transfers/`, `/fleet/`, `/gallery/`, `/about/`, `/contact/`, `/blog/`, `/blog/planning-your-santorini-transfer/`, `/blog/welcome-to-santorini/`.

Greek: same routes under `/el/` prefix (and `/gr` redirects to `/el`).
