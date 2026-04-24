# Santorini Imperial — Redesign Spec

**Date:** 2026-04-24
**Author:** Collaborative brainstorm (Claude Opus 4.7 + user)
**Status:** Approved — ready for implementation planning
**Source of design language:** `DESIGN.md` (extracted from https://www.rhodestransfer24.com/)
**Content source:** https://santoriniimperial.com/

---

## 1. Goal

Ship a polished bilingual (English + Greek) multi-page Astro site for **Santorini Imperial** — a Greek transfers-and-tours company — that applies the editorial-luxury visual language documented in `DESIGN.md` (originally extracted from Rhodes Transfer 24) to Santorini Imperial's existing services and content.

**In scope:**
- A complete static Astro site with 14 unique routes × 2 locales = 28 generated pages.
- Every page styled strictly with tokens defined in `DESIGN.md` (Antique Gold `#C9A84C`, Ink `#0A0A0A`, Bone Warm `#F8F5F0`, Playfair Display + Inter, whisper-soft card shadows, pill CTAs, 96px vertical rhythm).
- Medium-fidelity GSAP motion: transparent-nav morph, hero SplitText reveal, ScrollTrigger section/card entrances, hero parallax, card/fleet hover polish.
- Visual-only booking form (no backend) plus a live WhatsApp floating action button as the real contact path.
- Locally-stored imagery downloaded from santoriniimperial.com's public assets into `/public/images/`. Where the source site lacks imagery for a section (e.g. editorial atmosphere shots not present on SI), that image slot is marked as a **content gap** in `README.md` — no third-party stock is substituted.
- Bilingual EN + GR with a language switcher. Greek copy is *transcreated* (humanized), not literally translated.

**Out of scope (YAGNI):**
- ❌ Real booking backend, payments, availability calendar.
- ❌ Headless CMS — content lives in Markdown / JSON in the repo.
- ❌ Analytics or tracking.
- ❌ Cookie consent banner.
- ❌ Third-party review integrations (Trustpilot, TripAdvisor).
- ❌ SEO sitemap.xml / robots.txt generation (Astro can add later).
- ❌ Pixel-perfect match to any existing SI page — this is a redesign, not a reskin.
- ❌ Deployment to any host — local `npm run dev` handoff only.

---

## 2. Success criteria

The redesign is considered successful when:

1. `npm install && npm run dev` starts a local server and every one of the 28 generated routes renders without errors.
2. Every interactive element uses a token from `DESIGN.md` — no ad-hoc colors, fonts, radii, or shadows.
3. Running Lighthouse against the homepage reports Accessibility ≥ 95 and Performance ≥ 85 on a local dev build.
4. The EN/GR language switcher works from every page and preserves the current route (e.g., `/tours/wine-experience` ↔ `/gr/tours/wine-experience`).
5. All GSAP motion respects `prefers-reduced-motion` — when enabled, entrance animations collapse to final state instantly.
6. `LOCALIZATION.md` lists every translatable string with its EN source and GR transcreation, clearly flagged "pre-human-proof — do not ship to production."

---

## 3. Sitemap

Astro i18n routing. Default locale **en** served at root; **gr** (ISO code `el` internally) served under `/gr/` prefix for URL friendliness.

```
/                                      Home
/tours/                                Tours index (4 cards)
/tours/wine-experience/                Wine tour detail
/tours/sightseeing/                    Sightseeing tour detail
/tours/full-day/                       Full-day combo tour detail
/tours/luxe-photo-tour/                Luxe Photo tour detail
/transfers/                            Transfers service page
/fleet/                                Fleet lineup
/gallery/                              Photo grid
/about/                                Our story
/contact/                              Contact form + WhatsApp + socials
/blog/                                 Blog index
/blog/[slug]/                          Two placeholder blog posts
/gr/*                                  Mirror of every above route for Greek
```

Total: **14 unique EN routes + 14 GR mirrors = 28 pages.** (Count includes the 2 placeholder blog post URLs in addition to the 12 unique pages in the list above.)

Robots/sitemap/`hreflang` links are emitted automatically per Astro's i18n conventions.

---

## 4. Page anatomy

Each page follows a shared chrome (Header + WhatsApp FAB + Footer) and an interior composed of the components in §5. Specific section sequences per page type:

### 4.1 Home
1. **Hero** — full-viewport cinematic dark photograph (Mercedes interior or caldera dusk), transparent nav, Playfair H1 white, sub-paragraph, dual pill CTAs ("Book Your Transfer" gold + "Call Now" charcoal), scroll indicator. Stat strip under: "24/7 Service · 100% Fixed Prices" in Playfair numerals.
2. **Why-us** — 4 feature cards (No Extra Fees · 24/7 Available · Licensed Drivers · Card Payments) on Bone Warm (`#F8F5F0`). Gold kicker "WHY CHOOSE US", Playfair H2.
3. **Curated Tours preview** — on white. Kicker "CURATED EXPERIENCES" gold, Playfair H2 "Four Ways to See the Island", 4 tour cards (image + duration badge + title + 1-line summary + "From €XX" + gold arrow). Each links to its `/tours/{slug}/` page.
4. **Transfer services preview** — on Bone Warm. Kicker "GROUND TRANSPORT", Playfair H2, 6 icon-lead service bullets (airport · port · hotel · wedding · beach · 24h driver).
5. **Fleet preview** — on white. Kicker "PREMIUM VEHICLES", Playfair H2 "Our Mercedes-Benz Lineup", 4 fleet cards linking to `/fleet/`.
6. **Testimonials** — on white. Kicker "CLIENT VOICES", Playfair H2, 3 cards. Placeholder content.
7. **CTA band** — on Bone Warm. Playfair H2 "Book Your Santorini Transfer Today", gold pill CTA.
8. **Footer** — Midnight `#0F0F0F`, 4 columns (Company · Services · Contact · Legal).

### 4.2 Tour detail (template for all 4 tours)
1. **Hero** — dark photograph specific to that tour (vineyard / caldera / Oia / photoshoot). Kicker includes tour attributes (e.g. "WINE EXPERIENCES · 4 HOURS · SEMI-PRIVATE").
2. **Overview row** — 2-column grid on white: "WHAT'S INCLUDED" (bulleted) + "ITINERARY" (timestamped).
3. **Gold-pill reservation band** — Bone Warm, "Private from · EUR XX / group" in Playfair + gold pill CTA.
4. **Pair-with** — Cross-sell cards for the other 3 tours.
5. **Tour FAQ** — 3-5 questions relevant to that tour.
6. **CTA band + footer** — shared with home.

### 4.3 Transfers, Fleet, Gallery, About, Contact, Blog
- **Transfers** — Hero + 6 service sections (airport, port, hotel, wedding, beach, 24h) each an editorial vignette + applicable pricing-logic note.
- **Fleet** — Hero + 4 fleet-detail blocks (image · specs · capacity · ideal-for · pill CTA).
- **Gallery** — Hero + responsive masonry photo grid with lightbox.
- **About** — Hero + Our Story (1 long editorial column) + "What we stand for" pillars + team photo optional.
- **Contact** — Hero + 2-col grid (booking form on left, contact details + WhatsApp/Viber/WeChat on right).
- **Blog** — Index grid of post cards; post template with Playfair H1, lede, body, related.

---

## 5. Component inventory

### 5.1 Layout / chrome
| Component | Purpose |
|---|---|
| `BaseLayout.astro` | HTML shell, head meta, font preloads, analytics slot (empty), global CSS import |
| `Header.astro` | Fixed nav, transparent-to-solid morph on scroll, logo, link set, EN/GR switcher, gold pill Book CTA |
| `Footer.astro` | Midnight `#0F0F0F` 4-column layout: Company / Services / Contact / Legal |
| `WhatsAppFab.astro` | Floating `wa.me/30694035501**6**` green circular button, bottom-right, pulse every 10s |
| `GoldDivider.astro` | 1px gold hairline for kicker separators |

### 5.2 Content blocks
| Component | Purpose |
|---|---|
| `Hero.astro` | Full-viewport cinematic hero; accepts `image`, `kicker`, `headline`, `sub`, primary & secondary CTA props |
| `KickerHeading.astro` | Uppercase gold eyebrow (Inter 500 · 12-13px · letter-spacing 0.12em) + Playfair H2 |
| `FeatureCard.astro` | Icon well (Gold Wash bg, gold stroke icon) + Inter 600 title + body |
| `TourCard.astro` | 16:10 image + duration badge + title + 1-line summary + "From €XX" + gold arrow |
| `FleetCard.astro` | 16:10 image + model + capacity chip + brief line |
| `TestimonialCard.astro` | Serif quote mark + quote + name + trip label |
| `CtaBand.astro` | Closing warm section with Playfair H2 + gold pill CTA |
| `GalleryGrid.astro` | Responsive masonry; lightbox on click |
| `FaqAccordion.astro` | Keyboard-accessible disclosure list |
| `BookingForm.astro` | Name / email / phone / service / date / pax / message; client-side validation; submit → "Thank you" modal; no network call |

All components accept an optional `locale` prop or read locale from context helpers.

---

## 6. Bilingual (EN + GR) implementation

- **Locales:** `en` (default, root), `el` (aliased to `/gr/` URL prefix).
- **Routing:** Astro built-in `i18n` config. Every `src/pages/*.astro` exists once; Astro generates the locale prefix routing automatically per `defaultLocale` + `locales` config.
- **String catalog:** `src/content/i18n/en.json` and `src/content/i18n/gr.json`. Typed via a small `Copy` interface in `src/lib/i18n.ts`. Pages call `t('home.hero.headline')` helper.
- **Tour / blog long-form content:** Astro content collections with a `locale` field per document. Tour pages generate `/tours/[slug]/` for `en` and `/gr/tours/[slug]/` for `el` from the same collection schema.
- **Greek methodology:** I compose in Greek with native-speaker intent (transcreation), not translation. Examples:
  - EN: "Private transfers and curated tours of Santorini"
  - GR: "Ιδιωτικές μεταφορές κι επιλεγμένες εμπειρίες στη Σαντορίνη" (natural contraction, idiomatic word choice)
- **Proofing gate:** A root-level `LOCALIZATION.md` lists every GR string alongside its EN source, marked **"pre-human-proof — do not ship to production."** A human native speaker must review before any production deploy.
- **HTML tagging:** `<html lang="el">` on Greek pages. `hreflang` `<link>` tags for both locales in `<head>`. Open Graph locale tags per page.
- **Language switcher:** Persists the current pathname across locales (e.g., `/tours/wine-experience` ↔ `/gr/tours/wine-experience`). Current locale is visually marked in the nav.

---

## 7. GSAP motion plan (medium fidelity)

### 7.1 Always-on (carried from RT24)
- **Nav morph** — transparent → solid Bone Warm + shadow transition on `window.scroll > 16px`, 500ms `power2.out`.
- **Card hover** — `y -4px` + `shadow-card` → `shadow-card-hover`, 300ms.
- **Fleet image zoom** — `scale 1 → 1.05` on group hover, 500ms.
- **CTA focus halo** — gold 23%-opacity 7.5px ring on `:focus-visible`.
- **WhatsApp FAB micro-pulse** — subtle scale 1 → 1.06 → 1 every 10s.

### 7.2 New GSAP additions
- **Hero intro** — SplitText word-by-word reveal of H1, 60ms stagger, `power3.out`, 900ms total. Sub-paragraph fade-up after (200ms delay). CTAs fade-up stagger (100ms). Triggered on page load once fonts are loaded (prevent FOUT reflow).
- **Hero parallax** — background image `y: 0 → 15%` tied to `scroll`, ScrollTrigger with `scrub: 1`.
- **Section entrance** — kicker (fade), H2 (fade + y 24 → 0), body (fade + y 12 → 0), stagger 120ms on ScrollTrigger enter-viewport.
- **Card grid stagger** — feature/tour/fleet grids reveal cards 80ms apart on ScrollTrigger enter.
- **Nav link underline** — gold underline sweep L→R on hover, 250ms; persists on active route.
- **Page transitions** (optional polish, time permitting) — Astro View Transitions with a subtle 200ms cross-fade. Not critical; drop if it adds complexity.

### 7.3 Reduced motion
- Wrap all entrance and parallax animations in a `gsap.matchMedia({ "(prefers-reduced-motion: no-preference)": ... })` guard.
- Reduced-motion users see: no SplitText (render plain headline), no parallax (static image), no entrance fades (elements visible at rest state), but keep CTA focus halo and nav morph since they're UI feedback, not decorative.

### 7.4 Performance posture
- GSAP bundled with tree-shaking (only `gsap/ScrollTrigger` + `gsap/SplitText`).
- Initialize GSAP per-page via `src/lib/motion.ts` called from a client-side `<script>` in `BaseLayout`.
- `will-change` applied sparingly only to elements being actively animated, removed after.

---

## 8. Repository layout

```
santoriniimperial/
├─ DESIGN.md                    ← token source (existing)
├─ LOCALIZATION.md              ← GR strings flagged for proofing (new)
├─ README.md                    ← quickstart
├─ astro.config.mjs             ← i18n config, Tailwind integration, image config
├─ tailwind.config.mjs          ← theme extended with DESIGN.md tokens
├─ tsconfig.json
├─ package.json
├─ public/
│   ├─ images/                  ← fleet photos (scraped from SI) + hero shots (locally stored)
│   ├─ fonts/                   ← self-hosted Inter + Playfair Display (woff2, multiple weights)
│   └─ favicon.svg
└─ src/
    ├─ components/              ← see §5
    ├─ layouts/
    │   └─ BaseLayout.astro
    ├─ lib/
    │   ├─ i18n.ts              ← t() helper + locale detection
    │   └─ motion.ts            ← shared GSAP setup, matchMedia guard
    ├─ content/
    │   ├─ config.ts            ← content collection schemas
    │   ├─ i18n/{en,gr}.json
    │   ├─ tours/{en,gr}/*.md
    │   └─ blog/{en,gr}/*.md
    ├─ pages/
    │   ├─ index.astro
    │   ├─ tours/[slug].astro
    │   ├─ tours/index.astro
    │   ├─ transfers.astro
    │   ├─ fleet.astro
    │   ├─ gallery.astro
    │   ├─ about.astro
    │   ├─ contact.astro
    │   ├─ blog/index.astro
    │   ├─ blog/[slug].astro
    │   └─ gr/ (Astro generates these automatically via i18n routing)
    └─ styles/
        └─ global.css           ← Tailwind directives + CSS custom properties for tokens
```

---

## 9. Token mapping (DESIGN.md → Tailwind theme)

`tailwind.config.mjs` extends the default theme with:

```js
theme: {
  extend: {
    colors: {
      ink: '#0A0A0A',
      gold: {
        DEFAULT: '#C9A84C',
        wash: 'rgba(201,168,76,0.08)',
        halo: 'rgba(201,168,76,0.235)',
      },
      warm: {
        DEFAULT: '#F8F5F0',
        border: '#E5E0D6',
      },
      footer: '#0F0F0F',
      charcoal: '#1A1A1A',
    },
    fontFamily: {
      display: ['"Playfair Display"', 'Georgia', 'serif'],
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    boxShadow: {
      card: '0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)',
      'card-hover': '0 4px 8px rgba(0,0,0,0.05), 0 12px 28px rgba(0,0,0,0.08)',
      'gold-halo': '0 0 0 7.5px rgba(201,168,76,0.235)',
    },
    borderRadius: {
      'card': '16px',
      'pill': '9999px',
    },
    maxWidth: {
      container: '1280px',
    },
    spacing: {
      'section': '96px',
      'section-cta': '80px',
    },
  }
}
```

---

## 10. Data: tour content structure

Each tour (Markdown under `src/content/tours/{locale}/`) follows this frontmatter schema:

```yaml
---
slug: wine-experience
title: "Wine Experiences"
hero_image: "/images/tours/wine-hero.jpg"
duration_hours: 4
format: "Semi-Private"
price_from: null            # null when not public
included:
  - "Mercedes-Benz pickup"
  - "Three winery visits"
  - "Twelve wine tastings"
  - "Sunset viewing at Oia"
itinerary:
  - { time: "14:00", event: "Pickup" }
  - { time: "14:30", event: "Santo Wines" }
  - { time: "16:00", event: "Venetsanos Winery" }
  - { time: "17:30", event: "Gaia Wines" }
  - { time: "19:00", event: "Sunset at Oia" }
  - { time: "20:30", event: "Return" }
faq:
  - q: "Is this tour private or shared?"
    a: "Semi-private — your group travels together; you never share with strangers."
---

Long-form editorial copy here in Markdown.
```

---

## 11. Open assumptions flagged for user

1. **Humanizer** = transcreation methodology (I write natively in Greek). User confirmed 2026-04-24. ✓
2. **Greek proofing** before production is the user's responsibility; `LOCALIZATION.md` will flag this prominently.
3. **Blog placeholder posts** will be two short lorem-ish Santorini-themed articles purely to demonstrate the template; real content comes later.
4. **Image gaps** — where santoriniimperial.com does not have a suitable source image for a section the redesign needs (e.g. cinematic dark-mode hero, editorial gallery fillers, about-page portrait), that `<img>` slot gets a neutral Bone Warm placeholder block and the gap is logged in `README.md` under "Content gaps — client to supply". No third-party stock is substituted without client approval. (Per Q3 = B "Download SI assets"; strictly scoped to SI-sourced imagery.)
5. **Tour pricing** is not listed on the live SI site; prices shown in mockups are placeholders (`From €XX`) that the client must supply before production.
6. **WhatsApp number** = `+30 6940 355016` (the published SI contact). All `wa.me/` links use this.

---

## 12. Risks & mitigations

| Risk | Mitigation |
|---|---|
| SI's scraped brand assets have copyright constraints | All borrowed imagery is flagged in `README.md` for legal review before production. This is a redesign exercise for the same brand, so typical fair-use posture applies, but final decision rests with the client. |
| AI-generated Greek sounds stilted | Transcreation methodology + explicit human-proofing gate in `LOCALIZATION.md` |
| GSAP bundle size hurts Core Web Vitals | Tree-shake to only ScrollTrigger + SplitText; code-split per-page animations; `prefers-reduced-motion` guard drops to zero motion JS for that cohort |
| 24-route build is slow to iterate on | Astro HMR handles per-page changes in ms; dev server only builds the route being viewed |
| Design-system drift over 10 pages | All tokens flow from `tailwind.config.mjs` extending `DESIGN.md` values; ESLint rule pinning arbitrary hex values could be added but is out of scope for v1 |

---

## 13. Handoff

After the user approves this spec, the next action is to invoke **`superpowers:writing-plans`** to produce a step-by-step implementation plan that breaks this spec into reviewable increments. Implementation does **not** begin until that plan exists and is approved.
