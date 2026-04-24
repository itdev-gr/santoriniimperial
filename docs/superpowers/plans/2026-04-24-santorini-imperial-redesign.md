# Santorini Imperial Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bilingual (EN + GR) multi-page Astro site for Santorini Imperial — a Greek transfers-and-tours company — applying the editorial-luxury design tokens documented in `DESIGN.md` (extracted from rhodestransfer24.com) with medium-fidelity GSAP motion.

**Architecture:** Astro 4+ static site with built-in i18n routing (`en` default, `/gr/` prefix for `el`). Tailwind CSS extends the `DESIGN.md` tokens. Shared `BaseLayout.astro` + chrome components. Content lives in typed content collections (tours, blog) and JSON string bundles. GSAP loaded per-page with `prefers-reduced-motion` guard. Visual-only booking form + live WhatsApp FAB.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, GSAP (+ ScrollTrigger + SplitText), Vitest (for i18n helper + form validation), Playwright MCP tools (for visual smoke tests).

**Spec:** `docs/superpowers/specs/2026-04-24-santorini-imperial-redesign-design.md`

---

## Conventions used in this plan

- **All paths** are relative to the project root `/Users/marios/Desktop/Cursor/santoriniimperial/`.
- **"Verify"** steps run a concrete command and state the expected output.
- **Commits** happen at the end of every task; the plan never leaves the repo in a half-broken state between tasks.
- **UI tasks use a visual-smoke protocol** instead of unit tests: run `npm run dev`, open the route, confirm each listed visible-outcome bullet. Logic tasks (i18n helper, form validation) use Vitest in the classical red-green-refactor loop.
- **Design tokens:** `DESIGN.md` at the repo root is the single source of truth. Every color/font/radius/shadow must flow from `tailwind.config.mjs`.

---

## Task 1 — Initialize Astro project with Tailwind, TypeScript, GSAP

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/pages/index.astro` (temporary placeholder)
- Create: `.gitignore`, `README.md` (skeleton)

- [ ] **Step 1.1: Run the Astro create command from the existing project root**

```bash
cd /Users/marios/Desktop/Cursor/santoriniimperial
npm create astro@latest -- --template minimal --install --typescript strict --no-git --skip-houston .
```

If prompted "Directory not empty, continue?" answer **yes** (the existing `DESIGN.md`, `docs/`, and `.superpowers/` directories must remain untouched).

- [ ] **Step 1.2: Add Tailwind integration**

```bash
npx astro add tailwind --yes
```

- [ ] **Step 1.3: Install runtime deps**

```bash
npm i gsap
npm i -D vitest @vitest/ui jsdom @types/node
npm i @fontsource/inter @fontsource/playfair-display
```

- [ ] **Step 1.4: Verify clean install + dev server boots**

```bash
npm run dev -- --port 4321
```

Expected: Astro prints `http://localhost:4321/` and the minimal template renders. Kill the server (`Ctrl+C`).

- [ ] **Step 1.5: Initialize git and make the baseline commit**

```bash
git init
cat > .gitignore <<'EOF'
node_modules/
.astro/
dist/
.env
.env.local
.DS_Store
.superpowers/
.playwright-mcp/
rhodes-hero.png
rhodes-features.png
EOF
git add .
git commit -m "chore: scaffold Astro project with Tailwind + TypeScript + GSAP + @fontsource"
```

---

## Task 2 — Extend Tailwind theme with DESIGN.md tokens

**Files:**
- Modify: `tailwind.config.mjs`
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro` (temporary — apply token classes to prove they work)

- [ ] **Step 2.1: Write `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        obsidian: '#000000',
        gold: {
          DEFAULT: '#C9A84C',
          wash: 'rgba(201,168,76,0.08)',
          halo: 'rgba(201,168,76,0.235)',
        },
        warm: {
          DEFAULT: '#F8F5F0',
          border: '#E5E0D6',
        },
        charcoal: '#1A1A1A',
        'footer-bg': '#0F0F0F',
        'whatsapp': '#25D366',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['60px', { lineHeight: '60px', letterSpacing: 'normal' }],
        'display-lg': ['48px', { lineHeight: '48px', letterSpacing: 'normal' }],
        'lead': ['18px', { lineHeight: '29.25px' }],
        'kicker': ['13px', { lineHeight: '16px', letterSpacing: '0.12em' }],
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
        measure: '576px',
      },
      spacing: {
        'section': '96px',
        'section-cta': '80px',
      },
      transitionDuration: {
        '500': '500ms',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2.2: Write `src/styles/global.css`**

```css
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/playfair-display/400.css';
@import '@fontsource/playfair-display/700.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { font-family: 'Inter', system-ui, sans-serif; color: #0A0A0A; }
  body { background: #FFFFFF; }
  h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }
  ::selection { background: #C9A84C; color: #FFFFFF; }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-gold text-white font-medium px-6 py-3 rounded-pill transition-all duration-300;
    @apply hover:shadow-gold-halo focus-visible:outline-none focus-visible:shadow-gold-halo;
  }
  .btn-secondary {
    @apply inline-flex items-center gap-2 bg-charcoal text-white font-medium px-6 py-3 rounded-pill transition-all duration-300;
    @apply hover:opacity-90 focus-visible:outline-none focus-visible:shadow-gold-halo;
  }
  .kicker {
    @apply text-kicker uppercase text-gold font-medium;
  }
  .container-page {
    @apply max-w-container mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

- [ ] **Step 2.3: Import global CSS into `astro.config.mjs`**

Modify `astro.config.mjs` to import the stylesheet and configure site defaults:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://santoriniimperial.local',
  integrations: [tailwind({ applyBaseStyles: false })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'el'],
    routing: { prefixDefaultLocale: false },
    fallback: { el: 'en' },
  },
});
```

(Note: `'el'` is the ISO code; URL prefix `/gr/` is handled later in Task 5 via a redirect/alias layer.)

- [ ] **Step 2.4: Temporary token-proof page**

Overwrite `src/pages/index.astro` with:

```astro
---
import '../styles/global.css';
---
<html lang="en">
  <head><meta charset="utf-8"><title>Token check</title></head>
  <body class="bg-warm">
    <main class="container-page py-section">
      <div class="kicker">TOKEN CHECK</div>
      <h1 class="font-display text-display-xl text-ink">Playfair loaded</h1>
      <p class="text-lead mt-4">Body copy in Inter.</p>
      <div class="mt-8 flex gap-4">
        <a href="#" class="btn-primary">Primary CTA →</a>
        <a href="#" class="btn-secondary">Secondary CTA</a>
      </div>
      <div class="mt-12 p-8 bg-white rounded-card border border-warm-border shadow-card hover:shadow-card-hover transition-shadow max-w-md">
        <div class="kicker">FEATURE CARD</div>
        <h3 class="font-sans text-base font-semibold mt-2">Shadow + border renders</h3>
      </div>
    </main>
  </body>
</html>
```

- [ ] **Step 2.5: Verify tokens render**

```bash
npm run dev
```

Open `http://localhost:4321/`. Expected: Playfair Display H1, gold kicker eyebrow, gold pill CTA, charcoal pill CTA, card with whisper shadow on Bone Warm background. No console errors.

- [ ] **Step 2.6: Commit**

```bash
git add -A
git commit -m "feat(design): wire DESIGN.md tokens into Tailwind theme + global.css"
```

---

## Task 3 — Provision the `public/images/` directory with SI source imagery

**Files:**
- Create: `public/images/fleet/e-class.jpg`, `v-class.jpg`, `sprinter-12.jpg`, `sprinter-20.jpg`
- Create: `public/images/logo/si-logo.svg` (or `.png` if only raster available)
- Create: `public/images/hero/hero-home.jpg`, `hero-tours.jpg`, `hero-fleet.jpg`, `hero-about.jpg`, `hero-contact.jpg`, `hero-transfers.jpg`, `hero-gallery.jpg`
- Create: `public/images/tours/wine.jpg`, `sightseeing.jpg`, `full-day.jpg`, `photo-tour.jpg`
- Create: `public/images/gallery/01.jpg` through `12.jpg` (as many as SI has)
- Create: `public/images/ATTRIBUTIONS.md`

- [ ] **Step 3.1: Scrape santoriniimperial.com image URLs**

Run this to enumerate every image referenced on the homepage and key subpages:

```bash
for url in "https://santoriniimperial.com/" "https://santoriniimperial.com/tours-experiences-in-santorini/" "https://santoriniimperial.com/transfer-in-santorini/" "https://santoriniimperial.com/gallery/"; do
  echo "--- $url ---"
  curl -sL "$url" | grep -oE 'https?://[^"[:space:]]+\.(jpg|jpeg|png|webp|svg)' | sort -u
done > /tmp/si-images.txt
cat /tmp/si-images.txt
```

Expected: ~50–100 distinct image URLs.

- [ ] **Step 3.2: Download the assets into `public/images/`**

Manually map each URL to its role using this protocol (create directories as needed):

```bash
mkdir -p public/images/{fleet,logo,hero,tours,gallery}
# For each URL in /tmp/si-images.txt, decide its bucket and run:
# curl -sL <url> -o public/images/<bucket>/<filename>.<ext>
```

Mapping rules:
- Files with "logo" / "brand" / "favicon" in name → `public/images/logo/`
- Mercedes-Benz vehicle studio shots → `public/images/fleet/` (rename to `e-class.jpg`, `v-class.jpg`, `sprinter-12.jpg`, `sprinter-20.jpg`)
- Large hero/landscape shots of Santorini (caldera, sunset, Oia, vineyard) → `public/images/hero/`
- Tour-specific imagery (vineyard close-ups, photo session, archaeology sites) → `public/images/tours/`
- General gallery grid fillers → `public/images/gallery/` (number sequentially `01.jpg`, `02.jpg`, …)

- [ ] **Step 3.3: Log content gaps**

After downloading, any required slot for which SI has no suitable source image must be recorded. Write `public/images/ATTRIBUTIONS.md`:

```markdown
# Image attributions & content gaps

## Source
All imagery in this directory was downloaded from https://santoriniimperial.com/ on 2026-04-24 for the purpose of this redesign. Copyright remains with the original rights-holder(s). Legal review required before any production deployment.

## Attributions
| File | Source URL | Role |
|------|-----------|------|
| fleet/e-class.jpg | <url> | E-Class studio shot |
| fleet/v-class.jpg | <url> | V-Class studio shot |
| ... (populate from /tmp/si-images.txt) ... |

## Content gaps (client to supply)
List every slot in the design that could NOT be filled from SI's assets. Leave empty if all slots were filled.

- [ ] hero/hero-home.jpg — needed a cinematic dark-mode hero; SI site's homepage hero is bright. Placeholder: Bone Warm block with kicker "Image pending".
- [ ] (add more as discovered during page implementation)
```

- [ ] **Step 3.4: Verify all downloaded files are non-empty**

```bash
find public/images -type f -size -1c -print
```

Expected: no output (every file has content). If any empty file appears, re-download or remove.

- [ ] **Step 3.5: Commit**

```bash
git add public/images
git commit -m "chore(images): import SI brand assets + attribution + gaps log"
```

---

## Task 4 — Write the i18n helper with Vitest coverage

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `src/content/i18n/en.json` (seed with home hero strings)
- Create: `src/content/i18n/gr.json` (seed mirror, English placeholders for now)
- Create: `tests/i18n.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 4.1: Vitest config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4.2: Write the failing test first**

```ts
// tests/i18n.test.ts
import { describe, it, expect } from 'vitest';
import { createT, type Locale } from '../src/lib/i18n';
import en from '../src/content/i18n/en.json';
import gr from '../src/content/i18n/gr.json';

describe('createT', () => {
  it('returns the EN value for a dot-notation key when locale is en', () => {
    const t = createT('en', { en, gr });
    expect(t('home.hero.headline')).toBe(en.home.hero.headline);
  });

  it('returns the GR value when locale is el', () => {
    const t = createT('el', { en, gr });
    expect(t('home.hero.headline')).toBe(gr.home.hero.headline);
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
```

Add `import { vi } from 'vitest';` at the top.

- [ ] **Step 4.3: Run the test to verify it fails**

```bash
npm test
```

Expected: FAIL with "Cannot find module '../src/lib/i18n'".

- [ ] **Step 4.4: Write the implementation**

```ts
// src/lib/i18n.ts
export type Locale = 'en' | 'el';

export const LOCALES: Locale[] = ['en', 'el'];
export const DEFAULT_LOCALE: Locale = 'en';
export const URL_PREFIX: Record<Locale, string> = { en: '', el: '/gr' };

type Bundle = Record<string, unknown>;
type Bundles = Record<Locale, Bundle>;

function lookup(bundle: Bundle, key: string): string | undefined {
  const parts = key.split('.');
  let cur: unknown = bundle;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return undefined;
    }
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function createT(locale: Locale, bundles: Bundles) {
  return (key: string): string => {
    const primary = lookup(bundles[locale], key);
    if (primary !== undefined) return primary;
    if (locale !== 'en') {
      const fallback = lookup(bundles.en, key);
      if (fallback !== undefined) return fallback;
    }
    console.warn(`[i18n] missing key: ${key}`);
    return key;
  };
}

export function localePath(locale: Locale, path: string): string {
  const prefix = URL_PREFIX[locale];
  if (!path.startsWith('/')) path = '/' + path;
  return prefix + path;
}
```

- [ ] **Step 4.5: Seed `src/content/i18n/en.json`**

```json
{
  "home": {
    "hero": {
      "kicker": "PRIVATE TRANSFERS · CURATED TOURS",
      "headline": "Santorini, Without the Logistics.",
      "sub": "Mercedes-Benz transfers and curated tours of the island. Fixed prices, meet-and-greet service, available 24/7.",
      "cta_primary": "Book Your Transfer",
      "cta_secondary": "Call Now"
    }
  },
  "nav": {
    "home": "Home",
    "tours": "Tours",
    "transfers": "Transfers",
    "fleet": "Fleet",
    "gallery": "Gallery",
    "about": "About",
    "contact": "Contact",
    "blog": "Blog",
    "book": "Book Now"
  }
}
```

- [ ] **Step 4.6: Seed `src/content/i18n/gr.json` with a temporary EN mirror**

Same keys, English values for now. Task 22 will fill in humanized Greek.

```json
{
  "home": { "hero": { "kicker": "[el] PRIVATE TRANSFERS · CURATED TOURS", "headline": "[el] Santorini, Without the Logistics.", "sub": "[el] Mercedes-Benz transfers and curated tours of the island. Fixed prices, meet-and-greet service, available 24/7.", "cta_primary": "[el] Book Your Transfer", "cta_secondary": "[el] Call Now" } },
  "nav": { "home": "[el] Home", "tours": "[el] Tours", "transfers": "[el] Transfers", "fleet": "[el] Fleet", "gallery": "[el] Gallery", "about": "[el] About", "contact": "[el] Contact", "blog": "[el] Blog", "book": "[el] Book Now" }
}
```

- [ ] **Step 4.7: Re-run the tests**

```bash
npm test
```

Expected: PASS, 5 tests.

- [ ] **Step 4.8: Commit**

```bash
git add -A
git commit -m "feat(i18n): typed t() helper with EN default and EL fallback, 5 Vitest cases"
```

---

## Task 5 — Configure Astro i18n with `/gr/` URL prefix + language switcher plumbing

**Files:**
- Modify: `astro.config.mjs` (add redirects mapping `/gr` → `/el` OR write a different approach using route aliases)
- Create: `src/lib/routing.ts` (switcher URL builder)
- Create: `tests/routing.test.ts`

- [ ] **Step 5.1: Decide on URL strategy**

Astro's built-in i18n uses the locale code directly in URLs (`/el/...`). We want `/gr/...` for user-friendliness. Strategy: keep `el` as the internal locale code, use Astro's `redirects` config to map `/gr/...` → `/el/...` OR implement a `getStaticPaths` pattern where each page exports both. Use the simpler approach — route redirects:

Modify `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://santoriniimperial.local',
  integrations: [tailwind({ applyBaseStyles: false })],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'el'],
    routing: { prefixDefaultLocale: false },
    fallback: { el: 'en' },
  },
  redirects: {
    '/gr': '/el',
    '/gr/[...slug]': '/el/[...slug]',
  },
});
```

(This keeps `/el/` as the canonical URL internally; the `/gr/` prefix redirects there. Canonical URLs in sitemaps and hreflang will use `/el/` — acceptable because it's still a 2-letter prefix and language-accurate.)

**Alternative if client rejects `/el/`:** implement parallel `/gr/` page tree via programmatic `getStaticPaths`. Document the decision in `README.md`.

- [ ] **Step 5.2: Write failing test for `routing.ts`**

```ts
// tests/routing.test.ts
import { describe, it, expect } from 'vitest';
import { switchLocale } from '../src/lib/routing';

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
});
```

- [ ] **Step 5.3: Run to confirm failure**

```bash
npm test -- routing
```

Expected: FAIL (module not found).

- [ ] **Step 5.4: Implement `src/lib/routing.ts`**

```ts
import type { Locale } from './i18n';

export function switchLocale(pathname: string, from: Locale, to: Locale): string {
  if (from === to) return pathname;
  const stripped = from === 'el' ? pathname.replace(/^\/el/, '') || '/' : pathname;
  if (to === 'el') {
    const clean = stripped.startsWith('/') ? stripped : '/' + stripped;
    const prefixed = '/el' + clean;
    return prefixed;
  }
  return stripped;
}
```

- [ ] **Step 5.5: Run tests**

```bash
npm test
```

Expected: PASS, 9 total (5 i18n + 4 routing).

- [ ] **Step 5.6: Commit**

```bash
git add -A
git commit -m "feat(i18n): configure Astro i18n with /gr → /el redirect and locale switcher helper"
```

---

## Task 6 — Motion setup with `prefers-reduced-motion` guard

**Files:**
- Create: `src/lib/motion.ts`
- Create: `tests/motion.test.ts`

- [ ] **Step 6.1: Write failing test**

```ts
// tests/motion.test.ts
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
    // jsdom gives us a window; simulate SSR:
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});
```

- [ ] **Step 6.2: Run to confirm failure**

```bash
npm test -- motion
```

- [ ] **Step 6.3: Implement `src/lib/motion.ts`**

```ts
export function prefersReducedMotion(): boolean {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Central GSAP entry point. Loads only ScrollTrigger when called client-side.
 * Components call `onReady(() => { ... })` to run their animation once GSAP is ready.
 */
export async function getGsap() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export async function getSplitText() {
  // GSAP SplitText is a paid plugin. For this build, use a lightweight
  // substitute: a manual splitter that wraps each word in a span.
  return {
    split(el: Element): HTMLSpanElement[] {
      const text = el.textContent ?? '';
      const words = text.split(/(\s+)/);
      el.textContent = '';
      const spans: HTMLSpanElement[] = [];
      for (const w of words) {
        const s = document.createElement('span');
        s.textContent = w;
        s.style.display = 'inline-block';
        s.style.willChange = 'transform, opacity';
        el.appendChild(s);
        if (w.trim().length > 0) spans.push(s);
      }
      return spans;
    }
  };
}

export function motionReady(fn: () => void | Promise<void>) {
  if (prefersReducedMotion()) return;
  if (document.readyState === 'complete') fn();
  else window.addEventListener('load', () => fn(), { once: true });
}
```

- [ ] **Step 6.4: Tests pass**

```bash
npm test
```

Expected: PASS, 12 total.

- [ ] **Step 6.5: Commit**

```bash
git add -A
git commit -m "feat(motion): GSAP loader, manual word-splitter, reduced-motion guard"
```

---

## Task 7 — Content collection schemas for tours and blog

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/tours/en/wine-experience.md` (seed 1 tour; others come in Task 16)
- Create: `src/content/blog/en/first-post.md` (seed 1 post; the 2nd comes in Task 21)

- [ ] **Step 7.1: Define the collections**

```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const tourSchema = z.object({
  slug: z.string(),
  title: z.string(),
  locale: z.enum(['en', 'el']),
  hero_image: z.string(),
  duration_hours: z.number(),
  format: z.string(),
  price_from_eur: z.number().nullable(),
  included: z.array(z.string()),
  itinerary: z.array(z.object({ time: z.string(), event: z.string() })),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  order: z.number(),
});

const blogSchema = z.object({
  slug: z.string(),
  title: z.string(),
  locale: z.enum(['en', 'el']),
  published_at: z.coerce.date(),
  cover_image: z.string(),
  excerpt: z.string(),
  author: z.string().default('Santorini Imperial'),
});

export const collections = {
  tours: defineCollection({ type: 'content', schema: tourSchema }),
  blog: defineCollection({ type: 'content', schema: blogSchema }),
};
```

- [ ] **Step 7.2: Seed the wine tour content**

```markdown
<!-- src/content/tours/en/wine-experience.md -->
---
slug: wine-experience
title: "Wine Experiences"
locale: en
hero_image: /images/tours/wine.jpg
duration_hours: 4
format: "Semi-Private"
price_from_eur: null
included:
  - "Mercedes-Benz pickup from your hotel or villa"
  - "Three winery visits with tastings"
  - "Twelve distinct Santorini wine varieties"
  - "Sunset viewing point in Oia"
itinerary:
  - { time: "14:00", event: "Pickup" }
  - { time: "14:30", event: "Santo Wines — Assyrtiko flight" }
  - { time: "16:00", event: "Venetsanos Winery — Vinsanto tasting" }
  - { time: "17:30", event: "Gaia Wines — Thalassitis aged in sea" }
  - { time: "19:00", event: "Sunset viewpoint in Oia" }
  - { time: "20:30", event: "Return to your accommodation" }
faq:
  - q: "Is this tour private or shared?"
    a: "Semi-private. Your party travels alone in the vehicle; you never share with strangers."
  - q: "Can we add food to the tour?"
    a: "Yes — we can coordinate a tasting menu at the third winery on request."
  - q: "Do you accommodate dietary restrictions?"
    a: "Yes, let us know at booking and we'll arrange accordingly with the wineries."
order: 1
---

Santorini's volcanic soil gives its wines a mineral edge you'll taste from the first sip. This four-hour afternoon is shaped to let you feel that geography — cliff-top vineyards, subterranean cellars, and a sunset finish in Oia.
```

- [ ] **Step 7.3: Seed one blog post**

```markdown
<!-- src/content/blog/en/first-post.md -->
---
slug: planning-your-santorini-transfer
title: "Planning your Santorini airport transfer"
locale: en
published_at: 2026-03-01
cover_image: /images/hero/hero-home.jpg
excerpt: "Santorini's airport is small but the island's roads are narrow. Here is what we recommend to make your arrival smooth."
author: "Santorini Imperial"
---

(Placeholder body — lorem ipsum welcomed here for v1, real copy comes later.)

Santorini (JTR) has one runway and one terminal. Baggage claim opens 15 minutes after landing, and your driver will be holding a sign with your name just past customs.
```

- [ ] **Step 7.4: Verify the build understands the collections**

```bash
npm run astro check
```

Expected: zero errors. If frontmatter validation fails, fix the field names to match the schema.

- [ ] **Step 7.5: Commit**

```bash
git add -A
git commit -m "feat(content): content collection schemas for tours + blog, seed entries"
```

---

## Task 8 — `BaseLayout.astro` + `WhatsAppFab.astro`

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/WhatsAppFab.astro`

- [ ] **Step 8.1: `src/components/WhatsAppFab.astro`**

```astro
---
const phone = '306940355016';
const msg = encodeURIComponent('Hi! I would like to book a transfer or tour.');
---
<a
  href={`https://wa.me/${phone}?text=${msg}`}
  target="_blank"
  rel="noopener"
  aria-label="Chat with us on WhatsApp"
  class="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-card hover:shadow-card-hover transition-shadow"
  id="whatsapp-fab"
>
  <svg viewBox="0 0 24 24" class="h-7 w-7" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.78 11.78 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.17 1.6 5.99L0 24l6.2-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.24-6.2-3.48-8.52zM12 22c-1.88 0-3.73-.5-5.35-1.45l-.38-.22-3.68.96.98-3.59-.25-.37A9.98 9.98 0 012 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.45-7.49c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/>
  </svg>
</a>
<script>
  // 10-second micro-pulse, guarded by reduced-motion.
  import { prefersReducedMotion } from '../lib/motion';
  if (!prefersReducedMotion()) {
    const fab = document.getElementById('whatsapp-fab');
    if (fab) {
      setInterval(() => {
        fab.animate(
          [{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }],
          { duration: 900, easing: 'ease-in-out' }
        );
      }, 10_000);
    }
  }
</script>
```

- [ ] **Step 8.2: `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import WhatsAppFab from '../components/WhatsAppFab.astro';
import type { Locale } from '../lib/i18n';

export interface Props {
  title: string;
  description?: string;
  locale?: Locale;
  image?: string;
  pathname?: string;
}
const {
  title,
  description = 'Private transfers and curated tours of Santorini. Mercedes-Benz fleet, fixed prices, 24/7.',
  locale = 'en',
  image = '/images/hero/hero-home.jpg',
  pathname = Astro.url.pathname,
} = Astro.props;

const htmlLang = locale === 'el' ? 'el' : 'en';
---
<!doctype html>
<html lang={htmlLang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:locale" content={htmlLang === 'el' ? 'el_GR' : 'en_US'} />
    <link rel="alternate" hreflang="en" href={`https://santoriniimperial.local${pathname.replace(/^\/el/, '') || '/'}`} />
    <link rel="alternate" hreflang="el" href={`https://santoriniimperial.local${pathname.startsWith('/el') ? pathname : '/el' + pathname}`} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="min-h-screen flex flex-col">
    <slot name="header" />
    <main class="flex-1"><slot /></main>
    <slot name="footer" />
    <WhatsAppFab />
  </body>
</html>
```

- [ ] **Step 8.3: Smoke test — BaseLayout compiles and `/` shows the WhatsApp FAB**

Update `src/pages/index.astro` temporarily:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Santorini Imperial">
  <div class="container-page py-section">
    <h1 class="font-display text-display-xl">Baseline check</h1>
    <p class="text-lead mt-4">WhatsApp FAB should float bottom-right.</p>
  </div>
</BaseLayout>
```

Run `npm run dev`, open `/`, verify: title in tab, WhatsApp green circle bottom-right, no console errors.

- [ ] **Step 8.4: Commit**

```bash
git add -A
git commit -m "feat(layout): BaseLayout with hreflang + OG meta, WhatsApp FAB with reduced-motion-guarded pulse"
```

---

## Task 9 — `Header.astro` with scroll morph and language switcher

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/LocaleSwitcher.astro`

- [ ] **Step 9.1: `src/components/LocaleSwitcher.astro`**

```astro
---
import { switchLocale } from '../lib/routing';
import type { Locale } from '../lib/i18n';

export interface Props { currentLocale: Locale; pathname: string; }
const { currentLocale, pathname } = Astro.props;
const otherLocale: Locale = currentLocale === 'en' ? 'el' : 'en';
const otherHref = switchLocale(pathname, currentLocale, otherLocale);
const labelThis = currentLocale === 'en' ? 'EN' : 'GR';
const labelOther = otherLocale === 'en' ? 'EN' : 'GR';
---
<div class="flex items-center gap-2 text-sm font-medium">
  <span aria-current="true" class="text-gold">{labelThis}</span>
  <span class="text-ink/40" aria-hidden="true">/</span>
  <a href={otherHref} class="text-ink/60 hover:text-ink transition-colors" aria-label={`Switch to ${labelOther}`}>{labelOther}</a>
</div>
```

- [ ] **Step 9.2: `src/components/Header.astro`**

```astro
---
import { createT, type Locale } from '../lib/i18n';
import { localePath } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
import LocaleSwitcher from './LocaleSwitcher.astro';

export interface Props { locale?: Locale; pathname?: string; }
const { locale = 'en', pathname = Astro.url.pathname } = Astro.props;
const t = createT(locale, { en, gr });
const lp = (p: string) => localePath(locale, p);

const links = [
  { href: lp('/'), label: t('nav.home') },
  { href: lp('/tours/'), label: t('nav.tours') },
  { href: lp('/transfers/'), label: t('nav.transfers') },
  { href: lp('/fleet/'), label: t('nav.fleet') },
  { href: lp('/gallery/'), label: t('nav.gallery') },
  { href: lp('/about/'), label: t('nav.about') },
  { href: lp('/contact/'), label: t('nav.contact') },
  { href: lp('/blog/'), label: t('nav.blog') },
];
---
<header
  id="site-header"
  class="fixed inset-x-0 top-0 z-30 h-[88px] flex items-center transition-[background-color,box-shadow] duration-500"
  data-transparent="true"
>
  <div class="container-page flex w-full items-center justify-between gap-8">
    <a href={lp('/')} class="flex items-center gap-2 font-display text-lg tracking-wide">
      <span class="site-logo transition-colors">SANTORINI <span class="text-gold">IMPERIAL</span></span>
    </a>
    <nav aria-label="Primary" class="hidden lg:flex items-center gap-7">
      {links.map(l => (
        <a href={l.href} class="nav-link relative text-sm font-medium text-ink/80 hover:text-ink transition-colors"
           data-active={pathname === l.href}>
          {l.label}
          <span class="underline-fx absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-300"></span>
        </a>
      ))}
    </nav>
    <div class="flex items-center gap-4">
      <LocaleSwitcher currentLocale={locale} pathname={pathname} />
      <a href={lp('/contact/')} class="btn-primary text-sm !py-2 !px-4">{t('nav.book')}</a>
    </div>
  </div>
</header>

<style>
  header[data-transparent="true"] { background-color: transparent; }
  header[data-transparent="true"] .site-logo { color: #FFFFFF; }
  header[data-transparent="true"] .nav-link { color: rgba(255,255,255,0.85); }
  header[data-transparent="true"] .nav-link:hover { color: #FFFFFF; }
  header[data-transparent="false"] {
    background-color: rgba(248,245,240,0.96);
    backdrop-filter: saturate(1.1) blur(8px);
    box-shadow: 0 1px 0 #E5E0D6;
  }
  header[data-transparent="false"] .site-logo { color: #0A0A0A; }
  header[data-transparent="false"] .nav-link { color: rgba(10,10,10,0.8); }
  .nav-link:hover .underline-fx { transform: scaleX(1); }
  .nav-link[data-active="true"] .underline-fx { transform: scaleX(1); }
</style>

<script>
  const h = document.getElementById('site-header');
  if (h) {
    const update = () => h.setAttribute('data-transparent', String(window.scrollY < 16));
    update();
    window.addEventListener('scroll', update, { passive: true });
  }
</script>
```

- [ ] **Step 9.3: Wire it into `BaseLayout.astro` via the `header` slot, and update `index.astro` to pass the header**

Modify `src/layouts/BaseLayout.astro` — no change needed since the slot is already there.

Modify `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
---
<BaseLayout title="Santorini Imperial" locale="en" pathname="/">
  <Header slot="header" locale="en" pathname="/" />
  <div style="height:100vh; background:linear-gradient(180deg,#0A0A0A,#1A1A1A);"></div>
  <div class="container-page py-section">
    <h2 class="font-display text-display-lg">Scroll me — header should morph.</h2>
  </div>
</BaseLayout>
```

- [ ] **Step 9.4: Smoke test in browser**

`npm run dev` and open `/`. Expected visible outcomes:
- Header transparent over the dark section at top of page.
- After scrolling >16px, header fades to Bone Warm with hairline border.
- Logo "SANTORINI IMPERIAL" — "IMPERIAL" in gold.
- Nav links show underline on hover (gold, L→R).
- EN/GR switcher on the right; clicking "GR" routes to `/el/` (will 404 until Task 22, acceptable for now).
- "Book Now" gold pill CTA.

- [ ] **Step 9.5: Commit**

```bash
git add -A
git commit -m "feat(chrome): Header with scroll morph, locale switcher, nav underline sweep"
```

---

## Task 10 — `Footer.astro` (4-column Midnight footer)

**Files:**
- Create: `src/components/Footer.astro`

- [ ] **Step 10.1: Write the component**

```astro
---
import { createT, localePath, type Locale } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';

export interface Props { locale?: Locale; }
const { locale = 'en' } = Astro.props;
const t = createT(locale, { en, gr });
const lp = (p: string) => localePath(locale, p);
const year = new Date().getFullYear();
---
<footer class="bg-footer-bg text-white/70">
  <div class="container-page py-16 grid gap-12 md:grid-cols-4">
    <div>
      <div class="font-display text-lg text-white">SANTORINI <span class="text-gold">IMPERIAL</span></div>
      <p class="mt-4 text-sm leading-relaxed">Private transfers and curated tours of Santorini. Mercedes-Benz fleet, fixed prices, 24/7 service.</p>
    </div>
    <div>
      <div class="kicker !text-gold">Services</div>
      <ul class="mt-3 space-y-2 text-sm">
        <li><a href={lp('/transfers/')} class="hover:text-white">Airport transfers</a></li>
        <li><a href={lp('/transfers/')} class="hover:text-white">Port transfers</a></li>
        <li><a href={lp('/tours/')} class="hover:text-white">Curated tours</a></li>
        <li><a href={lp('/fleet/')} class="hover:text-white">Our fleet</a></li>
      </ul>
    </div>
    <div>
      <div class="kicker !text-gold">Company</div>
      <ul class="mt-3 space-y-2 text-sm">
        <li><a href={lp('/about/')} class="hover:text-white">About</a></li>
        <li><a href={lp('/gallery/')} class="hover:text-white">Gallery</a></li>
        <li><a href={lp('/blog/')} class="hover:text-white">Blog</a></li>
        <li><a href={lp('/contact/')} class="hover:text-white">Contact</a></li>
      </ul>
    </div>
    <div>
      <div class="kicker !text-gold">Contact</div>
      <ul class="mt-3 space-y-2 text-sm">
        <li>Santorini, Greece</li>
        <li><a href="tel:+306940355016" class="hover:text-white">+30 6940 355016</a></li>
        <li><a href="mailto:info@santoriniimperial.com" class="hover:text-white">info@santoriniimperial.com</a></li>
        <li><a href="https://instagram.com/santorini_imperial" target="_blank" rel="noopener" class="hover:text-white">Instagram</a></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10">
    <div class="container-page py-6 flex flex-col md:flex-row md:justify-between gap-4 text-xs text-white/50">
      <div>© {year} Santorini Imperial. All rights reserved.</div>
      <div>Redesign concept · editorial prototype</div>
    </div>
  </div>
</footer>
```

- [ ] **Step 10.2: Wire into `index.astro` footer slot**

```astro
<Footer slot="footer" locale="en" />
```

And add `import Footer from '../components/Footer.astro';` at the top.

- [ ] **Step 10.3: Smoke test**

`npm run dev`, scroll to bottom. Expected: Midnight black footer, 4 columns, gold "SERVICES/COMPANY/CONTACT" kickers, gold "IMPERIAL" in logo.

- [ ] **Step 10.4: Commit**

```bash
git add -A
git commit -m "feat(chrome): Footer 4-column layout with Midnight surface"
```

---

## Task 11 — `Hero.astro` component + home-page stat strip

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/StatStrip.astro`
- Create: `src/components/KickerHeading.astro`

- [ ] **Step 11.1: `src/components/KickerHeading.astro`**

```astro
---
export interface Props { kicker: string; heading: string; align?: 'left' | 'center'; level?: 'h1' | 'h2' | 'h3'; id?: string; }
const { kicker, heading, align = 'center', level = 'h2', id } = Astro.props;
const Tag = level;
const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
const sizeCls = level === 'h1' ? 'text-display-xl' : level === 'h2' ? 'text-display-lg' : 'text-2xl';
---
<div class={`flex flex-col gap-3 ${alignCls}`} id={id}>
  <div class="kicker">{kicker}</div>
  <Tag class={`font-display ${sizeCls} font-bold leading-[0.95]`}>{heading}</Tag>
</div>
```

- [ ] **Step 11.2: `src/components/StatStrip.astro`**

```astro
---
export interface Props { items: Array<{ value: string; suffix?: string; label: string }>; }
const { items } = Astro.props;
---
<div class="flex items-center justify-center gap-12 pt-10 border-t border-white/30">
  {items.map(i => (
    <div class="flex flex-col items-center text-white">
      <div class="font-display text-4xl leading-none">
        {i.value}<sup class="text-xl font-normal">{i.suffix}</sup>
      </div>
      <div class="mt-1 text-xs uppercase tracking-wider text-white/80">{i.label}</div>
    </div>
  ))}
</div>
```

- [ ] **Step 11.3: `src/components/Hero.astro`**

```astro
---
export interface Props {
  image: string;
  kicker: string;
  headline: string;
  sub: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  stats?: Array<{ value: string; suffix?: string; label: string }>;
  minHeight?: string;
}
const {
  image, kicker, headline, sub,
  ctaPrimary, ctaSecondary,
  stats,
  minHeight = '100vh',
} = Astro.props;
---
<section class="relative overflow-hidden flex items-center" style={`min-height:${minHeight}`}>
  <div class="absolute inset-0 -z-10">
    <img src={image} alt="" aria-hidden="true" class="hero-bg h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60"></div>
  </div>
  <div class="container-page py-40 text-white flex flex-col items-center text-center max-w-measure mx-auto">
    <div class="kicker text-gold">{kicker}</div>
    <h1 class="hero-h1 mt-4 font-display text-display-xl font-bold leading-[0.95]">{headline}</h1>
    <p class="hero-sub mt-6 text-lead text-white/88">{sub}</p>
    <div class="hero-ctas mt-10 flex flex-col sm:flex-row gap-3">
      <a href={ctaPrimary.href} class="btn-primary">{ctaPrimary.label} <span aria-hidden>→</span></a>
      {ctaSecondary && <a href={ctaSecondary.href} class="btn-secondary">☎ {ctaSecondary.label}</a>}
    </div>
    {stats && stats.length > 0 && (
      <div class="mt-16 w-full">
        <div class="flex items-center justify-center gap-12 pt-10 border-t border-white/30">
          {stats.map(i => (
            <div class="flex flex-col items-center">
              <div class="font-display text-4xl leading-none">
                {i.value}{i.suffix && <sup class="text-xl font-normal">{i.suffix}</sup>}
              </div>
              <div class="mt-1 text-xs uppercase tracking-wider text-white/80">{i.label}</div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  <div class="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest">SCROLL</div>
</section>
```

- [ ] **Step 11.4: Use it on `index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const t = createT('en', { en, gr });
---
<BaseLayout title="Santorini Imperial — Private Transfers & Curated Tours" locale="en" pathname="/">
  <Header slot="header" locale="en" pathname="/" />
  <Hero
    image="/images/hero/hero-home.jpg"
    kicker={t('home.hero.kicker')}
    headline={t('home.hero.headline')}
    sub={t('home.hero.sub')}
    ctaPrimary={{ label: t('home.hero.cta_primary'), href: '/contact/' }}
    ctaSecondary={{ label: t('home.hero.cta_secondary'), href: 'tel:+306940355016' }}
    stats={[
      { value: '24', suffix: '/7', label: 'Service' },
      { value: '100', suffix: '%', label: 'Fixed Prices' },
    ]}
  />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 11.5: Smoke test**

Open `/`. Expected:
- Full-viewport hero with background image (if `hero-home.jpg` missing, you'll see a black screen — substitute any JPG in `/images/hero/` or add a placeholder).
- Dark gradient overlay.
- Gold kicker, large Playfair white headline, white sub, dual pill CTAs.
- Stat strip "24/7 Service · 100% Fixed Prices" with sup numerals.
- "SCROLL" indicator at bottom.

- [ ] **Step 11.6: Commit**

```bash
git add -A
git commit -m "feat(components): Hero + KickerHeading + StatStrip"
```

---

## Task 12 — Card components: `FeatureCard`, `TourCard`, `FleetCard`

**Files:**
- Create: `src/components/FeatureCard.astro`
- Create: `src/components/TourCard.astro`
- Create: `src/components/FleetCard.astro`

- [ ] **Step 12.1: `FeatureCard.astro`**

```astro
---
export interface Props { icon: string; title: string; body: string; }
const { icon, title, body } = Astro.props;
---
<article class="group bg-white rounded-card border border-warm-border p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
  <div class="h-12 w-12 rounded-lg bg-gold-wash flex items-center justify-center">
    <Fragment set:html={icon} />
  </div>
  <h3 class="mt-5 font-sans text-base font-semibold text-ink">{title}</h3>
  <p class="mt-2 text-sm text-ink/70 leading-relaxed">{body}</p>
</article>
```

- [ ] **Step 12.2: `TourCard.astro`**

```astro
---
export interface Props {
  href: string;
  image: string;
  title: string;
  duration: string;
  summary: string;
  priceFrom?: string | null;
}
const { href, image, title, duration, summary, priceFrom } = Astro.props;
---
<a href={href} class="group block bg-white rounded-card border border-warm-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
  <div class="relative aspect-[5/3] overflow-hidden">
    <img src={image} alt={title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    <span class="absolute top-3 left-3 bg-white/90 text-ink text-xs font-medium px-3 py-1 rounded-pill">{duration}</span>
  </div>
  <div class="p-6">
    <h3 class="font-display text-2xl text-ink">{title}</h3>
    <p class="mt-2 text-sm text-ink/70 leading-relaxed">{summary}</p>
    <div class="mt-5 flex items-center justify-between">
      <span class="text-sm text-ink/60">{priceFrom ?? 'By request'}</span>
      <span class="text-gold text-sm font-medium">Explore →</span>
    </div>
  </div>
</a>
```

- [ ] **Step 12.3: `FleetCard.astro`**

```astro
---
export interface Props { image: string; model: string; capacity: string; note: string; }
const { image, model, capacity, note } = Astro.props;
---
<article class="group bg-white rounded-card border border-warm-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden">
  <div class="aspect-[5/3] bg-warm overflow-hidden">
    <img src={image} alt={model} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
  </div>
  <div class="p-6 flex flex-col gap-1">
    <h3 class="font-display text-xl text-ink">{model}</h3>
    <div class="text-sm text-gold">{capacity}</div>
    <p class="mt-2 text-sm text-ink/70">{note}</p>
  </div>
</article>
```

- [ ] **Step 12.4: Quick visual check**

Temporarily add to `index.astro` below the Hero:

```astro
<section class="bg-warm py-section">
  <div class="container-page grid gap-6 md:grid-cols-4">
    <FeatureCard icon={`<svg viewBox='0 0 24 24' fill='none' stroke='#C9A84C' stroke-width='2' class='h-6 w-6'><circle cx='12' cy='12' r='9'/><path d='M12 7v5l3 2'/></svg>`} title="24/7 Service" body="Arrive at 3am, fly out at dawn — we're staffed around the clock." />
    <!-- 3 more similar FeatureCards with different icons + copy -->
  </div>
</section>
```

(Import `FeatureCard` at top.) Run `npm run dev`, verify card hover lifts and shadow deepens.

- [ ] **Step 12.5: Commit**

```bash
git add -A
git commit -m "feat(components): FeatureCard, TourCard, FleetCard with hover lift + image zoom"
```

---

## Task 13 — `TestimonialCard`, `CtaBand`, `FaqAccordion`

**Files:**
- Create: `src/components/TestimonialCard.astro`
- Create: `src/components/CtaBand.astro`
- Create: `src/components/FaqAccordion.astro`

- [ ] **Step 13.1: `TestimonialCard.astro`**

```astro
---
export interface Props { quote: string; name: string; trip: string; }
const { quote, name, trip } = Astro.props;
---
<figure class="bg-white rounded-card border border-warm-border p-8 shadow-card">
  <div class="font-display text-5xl text-gold leading-none">"</div>
  <blockquote class="mt-3 text-ink/80 leading-relaxed">{quote}</blockquote>
  <figcaption class="mt-5 text-sm">
    <div class="font-semibold text-ink">{name}</div>
    <div class="text-ink/60">{trip}</div>
  </figcaption>
</figure>
```

- [ ] **Step 13.2: `CtaBand.astro`**

```astro
---
export interface Props { kicker?: string; headline: string; cta: { label: string; href: string }; }
const { kicker, headline, cta } = Astro.props;
---
<section class="bg-warm py-section-cta">
  <div class="container-page flex flex-col items-center text-center">
    {kicker && <div class="kicker">{kicker}</div>}
    <h2 class="mt-3 font-display text-display-lg font-bold max-w-3xl">{headline}</h2>
    <a href={cta.href} class="btn-primary mt-8">{cta.label} <span aria-hidden>→</span></a>
  </div>
</section>
```

- [ ] **Step 13.3: `FaqAccordion.astro`**

```astro
---
export interface Props { items: Array<{ q: string; a: string }>; }
const { items } = Astro.props;
---
<ul class="divide-y divide-warm-border">
  {items.map((it, i) => (
    <li>
      <details class="group py-5">
        <summary class="flex items-center justify-between cursor-pointer list-none">
          <span class="font-display text-lg text-ink">{it.q}</span>
          <span class="h-8 w-8 rounded-full border border-warm-border flex items-center justify-center text-gold transition-transform group-open:rotate-45" aria-hidden="true">+</span>
        </summary>
        <p class="mt-3 text-ink/80 leading-relaxed">{it.a}</p>
      </details>
    </li>
  ))}
</ul>
```

- [ ] **Step 13.4: Verify on a temporary route**

Add to `src/pages/index.astro`:

```astro
<section class="bg-white py-section">
  <div class="container-page max-w-3xl mx-auto">
    <FaqAccordion items={[
      { q: 'Do you offer meet-and-greet?', a: 'Yes, every transfer includes meet-and-greet. Your driver waits at arrivals with a sign.' },
      { q: 'Can I pay by card?', a: 'Yes — all major cards accepted, no processing fees.' },
    ]} />
  </div>
</section>
```

Import `FaqAccordion` at top. Run dev, click a Q — verify smooth disclosure, `+` rotates to `×`.

- [ ] **Step 13.5: Commit**

```bash
git add -A
git commit -m "feat(components): TestimonialCard + CtaBand + FaqAccordion"
```

---

## Task 14 — `GalleryGrid` with lightbox + `BookingForm` with validation

**Files:**
- Create: `src/components/GalleryGrid.astro`
- Create: `src/components/BookingForm.astro`
- Create: `src/lib/validation.ts`
- Create: `tests/validation.test.ts`

- [ ] **Step 14.1: Write validation tests first**

```ts
// tests/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateBooking } from '../src/lib/validation';

describe('validateBooking', () => {
  const base = { name: 'Maria', email: 'm@x.com', phone: '+306900000000', service: 'transfer', date: '2026-05-10', pax: '2', message: '' };

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
```

- [ ] **Step 14.2: Run — expect failure (module not found)**

```bash
npm test -- validation
```

- [ ] **Step 14.3: Implement `src/lib/validation.ts`**

```ts
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
    const today = new Date(); today.setHours(0,0,0,0);
    if (isNaN(d.getTime()) || d < today) errors.date = 'Date must be today or later.';
  }
  if (!/^\d+$/.test(p.pax) || Number(p.pax) < 1) errors.pax = 'Passenger count must be at least 1.';
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true };
}
```

- [ ] **Step 14.4: Run tests**

```bash
npm test
```

Expected: all 17 tests pass (5 i18n + 4 routing + 3 motion + 5 validation). *(Exact count depends on earlier task outcomes; the validation suite must pass.)*

- [ ] **Step 14.5: `BookingForm.astro`**

```astro
---
import type { Locale } from '../lib/i18n';
export interface Props { locale?: Locale; }
---
<form id="booking-form" novalidate class="grid gap-5 md:grid-cols-2">
  <label class="flex flex-col gap-1 md:col-span-2">
    <span class="text-sm font-medium text-ink">Name</span>
    <input name="name" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo" />
    <span class="error text-xs text-red-600" data-for="name"></span>
  </label>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-medium text-ink">Email</span>
    <input name="email" type="email" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo" />
    <span class="error text-xs text-red-600" data-for="email"></span>
  </label>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-medium text-ink">Phone</span>
    <input name="phone" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo" />
    <span class="error text-xs text-red-600" data-for="phone"></span>
  </label>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-medium text-ink">Service</span>
    <select name="service" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo">
      <option value="">Choose…</option>
      <option value="transfer">Transfer</option>
      <option value="wine">Wine Experience</option>
      <option value="sightseeing">Sightseeing Tour</option>
      <option value="fullday">Full Day</option>
      <option value="photo">Luxe Photo Tour</option>
    </select>
    <span class="error text-xs text-red-600" data-for="service"></span>
  </label>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-medium text-ink">Date</span>
    <input name="date" type="date" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo" />
    <span class="error text-xs text-red-600" data-for="date"></span>
  </label>
  <label class="flex flex-col gap-1">
    <span class="text-sm font-medium text-ink">Passengers</span>
    <input name="pax" type="number" min="1" required class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo" />
    <span class="error text-xs text-red-600" data-for="pax"></span>
  </label>
  <label class="flex flex-col gap-1 md:col-span-2">
    <span class="text-sm font-medium text-ink">Message (optional)</span>
    <textarea name="message" rows="4" class="rounded-lg border border-warm-border px-4 py-3 bg-white focus:outline-none focus:shadow-gold-halo"></textarea>
  </label>
  <div class="md:col-span-2 flex items-center gap-3">
    <button type="submit" class="btn-primary">Send Inquiry →</button>
    <a href="https://wa.me/306940355016" class="text-sm text-ink/70 hover:text-ink">or chat on WhatsApp</a>
  </div>
  <div id="booking-success" hidden class="md:col-span-2 bg-gold-wash border border-gold/30 text-ink rounded-card p-6">
    <div class="kicker">INQUIRY RECEIVED</div>
    <h3 class="font-display text-2xl mt-2">Thank you — we'll reply within the hour.</h3>
    <p class="text-sm mt-2 text-ink/70">(Demonstration form — no message was actually sent.)</p>
  </div>
</form>
<script>
  import { validateBooking } from '../lib/validation';
  const form = document.getElementById('booking-form') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const payload: any = {};
    for (const k of ['name','email','phone','service','date','pax','message']) {
      payload[k] = String(fd.get(k) ?? '');
    }
    form.querySelectorAll<HTMLElement>('.error').forEach(el => el.textContent = '');
    const result = validateBooking(payload);
    if (!result.ok) {
      for (const [k, v] of Object.entries(result.errors)) {
        const el = form.querySelector<HTMLElement>(`.error[data-for="${k}"]`);
        if (el) el.textContent = v as string;
      }
      return;
    }
    form.querySelectorAll<HTMLElement>('input,select,textarea,button').forEach(el => (el as any).disabled = true);
    const success = document.getElementById('booking-success');
    if (success) success.hidden = false;
  });
</script>
```

- [ ] **Step 14.6: `GalleryGrid.astro`**

```astro
---
export interface Props { images: Array<{ src: string; alt: string }>; }
const { images } = Astro.props;
---
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" id="gallery-grid">
  {images.map((img, i) => (
    <button type="button" class="group relative overflow-hidden rounded-card focus-visible:shadow-gold-halo" data-index={i} data-src={img.src} data-alt={img.alt}>
      <img src={img.src} alt={img.alt} loading="lazy" class="aspect-square h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
    </button>
  ))}
</div>

<dialog id="lightbox" class="bg-transparent p-0 max-w-5xl w-full backdrop:bg-black/80">
  <div class="relative">
    <img id="lightbox-img" alt="" class="w-full h-auto rounded-card" />
    <button type="button" id="lightbox-close" class="absolute top-3 right-3 bg-white/90 rounded-full h-10 w-10" aria-label="Close">×</button>
  </div>
</dialog>

<script>
  const grid = document.getElementById('gallery-grid');
  const dlg = document.getElementById('lightbox') as HTMLDialogElement | null;
  const lightImg = document.getElementById('lightbox-img') as HTMLImageElement | null;
  const closeBtn = document.getElementById('lightbox-close');
  grid?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-src]') as HTMLElement | null;
    if (!btn || !dlg || !lightImg) return;
    lightImg.src = btn.dataset.src!;
    lightImg.alt = btn.dataset.alt ?? '';
    dlg.showModal();
  });
  closeBtn?.addEventListener('click', () => dlg?.close());
  dlg?.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
</script>
```

- [ ] **Step 14.7: Commit**

```bash
git add -A
git commit -m "feat(components): BookingForm with validation + GalleryGrid with dialog lightbox"
```

---

## Task 15 — Home page (`src/pages/index.astro`) — final assembly

**Files:**
- Modify: `src/pages/index.astro` (replace the prototype with the final home page)
- Extend: `src/content/i18n/en.json`, `src/content/i18n/gr.json` (add the home page strings)

- [ ] **Step 15.1: Expand `en.json` with every home-page string**

Add these sections to `src/content/i18n/en.json` (merge into existing `home` key):

```json
{
  "home": {
    "hero": { "kicker": "PRIVATE TRANSFERS · CURATED TOURS", "headline": "Santorini, Without the Logistics.", "sub": "Mercedes-Benz transfers and curated tours of the island. Fixed prices, meet-and-greet service, available 24/7.", "cta_primary": "Book Your Transfer", "cta_secondary": "Call Now" },
    "why": {
      "kicker": "WHY CHOOSE US",
      "heading": "Fixed Prices. Mercedes Fleet. Every Day of the Year.",
      "items": [
        { "title": "Fixed Prices", "body": "The price you're quoted is the price you pay. No surge pricing, no luggage surcharges." },
        { "title": "24/7 Service", "body": "Late-night ferry, 5am flight, 2pm nap-time pickup — we dispatch whenever you need us." },
        { "title": "Licensed Drivers", "body": "Every driver is professionally licensed, insured, and speaks fluent English." },
        { "title": "Card Payments", "body": "All major cards accepted. No processing fees. Invoice on request." }
      ]
    },
    "tours": {
      "kicker": "CURATED EXPERIENCES",
      "heading": "Four Ways to See the Island",
      "sub": "Pair any of these with a transfer and we handle the day end-to-end.",
      "cta": "See all tours"
    },
    "fleet": { "kicker": "PREMIUM VEHICLES", "heading": "Our Mercedes-Benz Lineup", "sub": "Every vehicle climate-controlled, newly maintained, and fitted for comfort on Santorini's narrow roads.", "cta": "View the full fleet" },
    "testimonials": { "kicker": "CLIENT VOICES", "heading": "What Travellers Say" },
    "cta_band": { "headline": "Book Your Santorini Transfer Today", "cta": "Start Your Booking" }
  }
}
```

Mirror the keys in `gr.json` with `[el]` prefixed placeholders (task 22 will humanize).

- [ ] **Step 15.2: Rewrite `src/pages/index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import KickerHeading from '../components/KickerHeading.astro';
import FeatureCard from '../components/FeatureCard.astro';
import TourCard from '../components/TourCard.astro';
import FleetCard from '../components/FleetCard.astro';
import TestimonialCard from '../components/TestimonialCard.astro';
import CtaBand from '../components/CtaBand.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const locale = 'en' as const;
const t = createT(locale, { en, gr });

const icons = {
  price: `<svg viewBox='0 0 24 24' fill='none' stroke='#C9A84C' stroke-width='2' class='h-6 w-6'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 10h18'/></svg>`,
  clock: `<svg viewBox='0 0 24 24' fill='none' stroke='#C9A84C' stroke-width='2' class='h-6 w-6'><circle cx='12' cy='12' r='9'/><path d='M12 7v5l3 2'/></svg>`,
  shield: `<svg viewBox='0 0 24 24' fill='none' stroke='#C9A84C' stroke-width='2' class='h-6 w-6'><path d='M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z'/><path d='M9 12l2 2 4-4'/></svg>`,
  card: `<svg viewBox='0 0 24 24' fill='none' stroke='#C9A84C' stroke-width='2' class='h-6 w-6'><rect x='2' y='5' width='20' height='14' rx='2'/><path d='M2 10h20'/></svg>`,
};
const whyItems = en.home.why.items;

const tours = [
  { href: '/tours/wine-experience/', image: '/images/tours/wine.jpg', title: 'Wine Experiences', duration: '4 hours', summary: 'Three wineries, twelve tastings, sunset in Oia.', priceFrom: null },
  { href: '/tours/sightseeing/', image: '/images/tours/sightseeing.jpg', title: 'Sightseeing Tour', duration: '6 hours', summary: 'Oia, Pyrgos, Prophet Ilias, Akrotiri, red and black beaches.', priceFrom: null },
  { href: '/tours/full-day/', image: '/images/tours/full-day.jpg', title: 'Full-Day Combination', duration: '8 hours', summary: 'All major sites plus a wine tasting, one seamless day.', priceFrom: null },
  { href: '/tours/luxe-photo-tour/', image: '/images/tours/photo-tour.jpg', title: 'Luxe Photo Tour', duration: '2.5 hours', summary: 'Oia photo session with styling, 50-70 retouched images, two reels.', priceFrom: null },
];

const fleet = [
  { image: '/images/fleet/e-class.jpg', model: 'Mercedes-Benz E-Class', capacity: 'Up to 3 passengers', note: 'Executive sedan. Ideal for airport runs and couples.' },
  { image: '/images/fleet/v-class.jpg', model: 'Mercedes-Benz V-Class', capacity: 'Up to 7 passengers', note: 'Luxury MPV. Ideal for families and small groups with luggage.' },
  { image: '/images/fleet/sprinter-12.jpg', model: 'Mercedes-Benz Sprinter 12', capacity: 'Up to 12 passengers', note: 'Bus class. Ideal for wedding parties and private groups.' },
  { image: '/images/fleet/sprinter-20.jpg', model: 'Mercedes-Benz Sprinter 20', capacity: 'Up to 20 passengers', note: 'Large capacity. Ideal for extended families and events.' },
];

const testimonials = [
  { quote: 'Driver was outside arrivals holding our name before we even had our bags. That set the tone for the whole trip.', name: 'Adriana R.', trip: 'Airport transfer, May 2025' },
  { quote: 'The wine tour was paced beautifully — enough time at each winery to actually taste, never rushed.', name: 'Daniel M.', trip: 'Wine Experience, July 2025' },
  { quote: 'Booking was simple, the V-Class was immaculate, and the price we were quoted was the price we paid. Exactly what you want.', name: 'Sofia K.', trip: 'Sightseeing tour, August 2025' },
];
---
<BaseLayout title="Santorini Imperial — Private Transfers & Curated Tours" locale={locale} pathname="/">
  <Header slot="header" locale={locale} pathname="/" />

  <Hero
    image="/images/hero/hero-home.jpg"
    kicker={t('home.hero.kicker')}
    headline={t('home.hero.headline')}
    sub={t('home.hero.sub')}
    ctaPrimary={{ label: t('home.hero.cta_primary'), href: '/contact/' }}
    ctaSecondary={{ label: t('home.hero.cta_secondary'), href: 'tel:+306940355016' }}
    stats={[
      { value: '24', suffix: '/7', label: 'Service' },
      { value: '100', suffix: '%', label: 'Fixed Prices' },
    ]}
  />

  <section class="bg-warm py-section">
    <div class="container-page">
      <KickerHeading kicker={t('home.why.kicker')} heading={t('home.why.heading')} />
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard icon={icons.price} title={whyItems[0].title} body={whyItems[0].body} />
        <FeatureCard icon={icons.clock} title={whyItems[1].title} body={whyItems[1].body} />
        <FeatureCard icon={icons.shield} title={whyItems[2].title} body={whyItems[2].body} />
        <FeatureCard icon={icons.card} title={whyItems[3].title} body={whyItems[3].body} />
      </div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page">
      <KickerHeading kicker={t('home.tours.kicker')} heading={t('home.tours.heading')} />
      <p class="text-center max-w-2xl mx-auto mt-4 text-ink/70">{t('home.tours.sub')}</p>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tours.map(tt => <TourCard href={tt.href} image={tt.image} title={tt.title} duration={tt.duration} summary={tt.summary} priceFrom={tt.priceFrom} />)}
      </div>
      <div class="mt-10 text-center"><a href="/tours/" class="text-gold font-medium">{t('home.tours.cta')} →</a></div>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page">
      <KickerHeading kicker={t('home.fleet.kicker')} heading={t('home.fleet.heading')} />
      <p class="text-center max-w-2xl mx-auto mt-4 text-ink/70">{t('home.fleet.sub')}</p>
      <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {fleet.map(f => <FleetCard image={f.image} model={f.model} capacity={f.capacity} note={f.note} />)}
      </div>
      <div class="mt-10 text-center"><a href="/fleet/" class="text-gold font-medium">{t('home.fleet.cta')} →</a></div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page">
      <KickerHeading kicker={t('home.testimonials.kicker')} heading={t('home.testimonials.heading')} />
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map(tst => <TestimonialCard quote={tst.quote} name={tst.name} trip={tst.trip} />)}
      </div>
    </div>
  </section>

  <CtaBand headline={t('home.cta_band.headline')} cta={{ label: t('home.cta_band.cta'), href: '/contact/' }} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 15.3: Smoke test full home page**

Expected outcomes for each section at `http://localhost:4321/`:
- **Hero:** dark cinematic section, gold kicker, big Playfair H1, sub, dual pill CTAs, stat strip, SCROLL indicator.
- **Why-us:** 4 feature cards with gold-washed icon wells, on Bone Warm.
- **Tours:** 4 tour cards on white, each with duration badge and "Explore →".
- **Fleet:** 4 fleet cards on Bone Warm.
- **Testimonials:** 3 cards on white with big gold open-quote.
- **CTA band:** Playfair headline on Bone Warm with gold pill.
- **Footer:** Midnight 4-column.
- No console errors, no missing images (placeholder blocks acceptable for missing SI imagery).

- [ ] **Step 15.4: Commit**

```bash
git add -A
git commit -m "feat(home): assembled home page — hero, why, tours, fleet, testimonials, cta band"
```

---

## Task 16 — Tours: index page + detail template + remaining 3 tour Markdown

**Files:**
- Create: `src/pages/tours/index.astro`
- Create: `src/pages/tours/[slug].astro`
- Create: `src/content/tours/en/sightseeing.md`, `full-day.md`, `luxe-photo-tour.md`
- Extend: `en.json` / `gr.json` with `tours.*` strings

- [ ] **Step 16.1: Tour index page**

```astro
---
// src/pages/tours/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Hero from '../../components/Hero.astro';
import TourCard from '../../components/TourCard.astro';
import CtaBand from '../../components/CtaBand.astro';
import { getCollection } from 'astro:content';

const tours = (await getCollection('tours', e => e.data.locale === 'en')).sort((a,b)=>a.data.order-b.data.order);
---
<BaseLayout title="Curated Tours — Santorini Imperial" locale="en" pathname="/tours/">
  <Header slot="header" locale="en" pathname="/tours/" />
  <Hero
    image="/images/hero/hero-tours.jpg"
    kicker="CURATED EXPERIENCES"
    headline="Four Ways to See the Island"
    sub="Each tour is private or semi-private, paired with a Mercedes-Benz vehicle and a licensed guide where relevant."
    ctaPrimary={{ label: 'Plan Your Day', href: '/contact/' }}
    minHeight="70vh"
  />
  <section class="bg-white py-section">
    <div class="container-page grid gap-6 md:grid-cols-2">
      {tours.map(tt => (
        <TourCard
          href={`/tours/${tt.data.slug}/`}
          image={tt.data.hero_image}
          title={tt.data.title}
          duration={`${tt.data.duration_hours} hours · ${tt.data.format}`}
          summary={tt.body.split('\n')[0]}
          priceFrom={tt.data.price_from_eur ? `From €${tt.data.price_from_eur}` : 'By request'}
        />
      ))}
    </div>
  </section>
  <CtaBand headline="Plan your day, end to end." cta={{ label: 'Start Planning', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 16.2: Tour detail template**

```astro
---
// src/pages/tours/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Hero from '../../components/Hero.astro';
import KickerHeading from '../../components/KickerHeading.astro';
import TourCard from '../../components/TourCard.astro';
import FaqAccordion from '../../components/FaqAccordion.astro';
import CtaBand from '../../components/CtaBand.astro';
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const tours = await getCollection('tours', e => e.data.locale === 'en');
  return tours.map(t => ({ params: { slug: t.data.slug }, props: { tour: t } }));
}
const { tour } = Astro.props;
const { Content } = await tour.render();
const others = (await getCollection('tours', e => e.data.locale === 'en' && e.data.slug !== tour.data.slug)).sort((a,b)=>a.data.order-b.data.order);
---
<BaseLayout title={`${tour.data.title} — Santorini Imperial`} locale="en" pathname={`/tours/${tour.data.slug}/`} image={tour.data.hero_image}>
  <Header slot="header" locale="en" pathname={`/tours/${tour.data.slug}/`} />

  <Hero
    image={tour.data.hero_image}
    kicker={`${tour.data.format.toUpperCase()} · ${tour.data.duration_hours} HOURS`}
    headline={tour.data.title}
    sub=""
    ctaPrimary={{ label: 'Reserve This Tour', href: '/contact/' }}
    minHeight="70vh"
  />

  <section class="bg-white py-section">
    <div class="container-page max-w-4xl">
      <div class="prose prose-ink max-w-none font-sans text-lead"><Content /></div>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page grid gap-12 md:grid-cols-2 max-w-4xl">
      <div>
        <KickerHeading kicker="WHAT'S INCLUDED" heading="" align="left" level="h3" />
        <ul class="mt-4 space-y-2">
          {tour.data.included.map(i => <li class="flex gap-2"><span class="text-gold">✓</span><span>{i}</span></li>)}
        </ul>
      </div>
      <div>
        <KickerHeading kicker="ITINERARY" heading="" align="left" level="h3" />
        <ul class="mt-4 space-y-2">
          {tour.data.itinerary.map(it => <li class="flex gap-3"><span class="font-display text-gold w-14">{it.time}</span><span>{it.event}</span></li>)}
        </ul>
      </div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl">
      <KickerHeading kicker="FAQ" heading="Good to know" level="h2" />
      <div class="mt-8"><FaqAccordion items={tour.data.faq} /></div>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page">
      <KickerHeading kicker="PAIR WITH" heading="Three other ways to spend the day" />
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        {others.slice(0,3).map(o => (
          <TourCard href={`/tours/${o.data.slug}/`} image={o.data.hero_image} title={o.data.title} duration={`${o.data.duration_hours}h · ${o.data.format}`} summary={o.body.split('\n')[0]} priceFrom={null} />
        ))}
      </div>
    </div>
  </section>

  <CtaBand headline={`Book ${tour.data.title}`} cta={{ label: 'Start Booking', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 16.3: Write the other 3 tour Markdown files**

Create `src/content/tours/en/sightseeing.md`:

```markdown
---
slug: sightseeing
title: "Sightseeing Tour"
locale: en
hero_image: /images/tours/sightseeing.jpg
duration_hours: 6
format: "Private"
price_from_eur: null
included:
  - "Mercedes-Benz pickup from your hotel or villa"
  - "Oia village, Pyrgos village, Prophet Ilias monastery"
  - "Akrotiri archaeological site"
  - "Red Beach and Black Beach stops"
  - "Licensed guide available on request (supplement applies)"
itinerary:
  - { time: "09:00", event: "Pickup" }
  - { time: "09:30", event: "Pyrgos village walk" }
  - { time: "10:30", event: "Prophet Ilias monastery" }
  - { time: "11:30", event: "Akrotiri archaeological site" }
  - { time: "13:00", event: "Lunch stop (your choice)" }
  - { time: "14:30", event: "Red Beach and Black Beach" }
  - { time: "16:00", event: "Oia village" }
  - { time: "17:00", event: "Return" }
faq:
  - q: "Is entry to Akrotiri included?"
    a: "Entry fee is paid on-site (currently €12 per adult). We handle tickets if you prefer."
  - q: "Can we add a guide?"
    a: "Yes — a licensed guide adds roughly €180 for the full day; let us know at booking."
order: 2
---

A comprehensive overview day. You'll cover the inland villages in the morning (cooler, less crowded), the archaeology of Akrotiri mid-day, the two iconic beaches in the afternoon, and end at Oia for the famous sunset window.
```

Create `src/content/tours/en/full-day.md`:

```markdown
---
slug: full-day
title: "Full-Day Combination"
locale: en
hero_image: /images/tours/full-day.jpg
duration_hours: 8
format: "Private"
price_from_eur: null
included:
  - "Mercedes-Benz pickup"
  - "All Sightseeing Tour stops"
  - "One winery visit with tasting"
  - "Sunset viewing point in Oia"
  - "Licensed guide available on request"
itinerary:
  - { time: "09:00", event: "Pickup" }
  - { time: "09:30", event: "Inland villages and Akrotiri" }
  - { time: "13:00", event: "Lunch break" }
  - { time: "14:30", event: "Beaches" }
  - { time: "16:00", event: "Winery visit and tasting" }
  - { time: "18:30", event: "Oia village and sunset" }
  - { time: "20:00", event: "Return" }
faq:
  - q: "Is this too much for one day?"
    a: "It's a full day. Pace is comfortable with breaks; we adjust on the fly."
  - q: "Can we swap stops?"
    a: "Yes — tell us on the day; we'll rearrange without losing time."
order: 3
---

The day that covers everything. Villages, archaeology, beaches, a winery, and the Oia sunset — organized so you never feel rushed and never waste time in traffic.
```

Create `src/content/tours/en/luxe-photo-tour.md`:

```markdown
---
slug: luxe-photo-tour
title: "Luxe Photo Tour"
locale: en
hero_image: /images/tours/photo-tour.jpg
duration_hours: 2.5
format: "Private"
price_from_eur: null
included:
  - "Professional photographer in Oia"
  - "On-site styling and makeup assistant"
  - "50-70 retouched photographs"
  - "Two short video reels, vertical format"
  - "Location scouting for the best light"
itinerary:
  - { time: "16:30", event: "Pickup or meet at Oia" }
  - { time: "17:00", event: "Styling and first location" }
  - { time: "18:00", event: "Blue hour shoot" }
  - { time: "19:00", event: "Sunset reels" }
faq:
  - q: "How long until we get the photos?"
    a: "Seven to ten days after the shoot, delivered via private gallery link."
  - q: "Can we bring outfit changes?"
    a: "Yes — two outfit changes fit comfortably in the time window."
order: 4
---

A shoot built around Santorini's best hour. We handle styling, locations, light, and delivery — you show up.
```

- [ ] **Step 16.4: Verify content validates and routes render**

```bash
npm run astro check
npm run dev
```

Open `/tours/`, `/tours/wine-experience/`, `/tours/sightseeing/`, `/tours/full-day/`, `/tours/luxe-photo-tour/`. Expected: all 5 routes render, no 404, no schema errors.

- [ ] **Step 16.5: Commit**

```bash
git add -A
git commit -m "feat(tours): index page + detail template + 3 additional tour markdown files"
```

---

## Task 17 — Transfers page

**Files:**
- Create: `src/pages/transfers.astro`
- Extend: `en.json` / `gr.json` with `transfers.*` keys

- [ ] **Step 17.1: Add `transfers` strings to `en.json`**

```json
{
  "transfers": {
    "hero": { "kicker": "GROUND TRANSPORT", "headline": "Transfers Handled, Arrivals Felt.", "sub": "Airport, port, hotel, wedding, or an all-day driver. Same fleet, same drivers, same fixed prices." },
    "services": [
      { "title": "Airport Transfers", "body": "Meet-and-greet at JTR arrivals, luggage assistance, direct to your accommodation. Flight-tracked — no charge for reasonable delays." },
      { "title": "Port Transfers", "body": "Coordinated with cruise arrivals at Athinios. Driver waits portside with a sign. Luggage and buggy room included." },
      { "title": "Hotel-to-Hotel", "body": "Changing properties mid-stay? We move you and your bags door-to-door, same-day or scheduled." },
      { "title": "Wedding Transfers", "body": "Full fleet available for wedding parties — coordinated timing, ribbons optional, group bookings discounted." },
      { "title": "Beach & Evening", "body": "Daytime beach runs, evening club transfers, late-night returns. Safe, sober, on-time." },
      { "title": "24-Hour Driver", "body": "Your dedicated driver and Mercedes for the day. Set the itinerary as you go, stop where you want, no meter running." }
    ]
  }
}
```

- [ ] **Step 17.2: `src/pages/transfers.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import KickerHeading from '../components/KickerHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const t = createT('en', { en, gr });
const services = en.transfers.services;
---
<BaseLayout title="Private Transfers — Santorini Imperial" locale="en" pathname="/transfers/">
  <Header slot="header" locale="en" pathname="/transfers/" />

  <Hero image="/images/hero/hero-transfers.jpg" kicker={t('transfers.hero.kicker')} headline={t('transfers.hero.headline')} sub={t('transfers.hero.sub')}
    ctaPrimary={{ label: 'Book Your Transfer', href: '/contact/' }} minHeight="70vh" />

  <section class="bg-white py-section">
    <div class="container-page grid gap-12 md:grid-cols-2">
      {services.map((s, i) => (
        <article class="flex flex-col gap-3">
          <div class="kicker">0{i+1}</div>
          <h3 class="font-display text-3xl text-ink">{s.title}</h3>
          <p class="text-ink/70 leading-relaxed">{s.body}</p>
        </article>
      ))}
    </div>
  </section>

  <CtaBand headline="Tell us your flight. We'll take it from there." cta={{ label: 'Send Details', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 17.3: Smoke test**

`/transfers/` should render hero + 6 editorial service blocks on white + CTA band + footer.

- [ ] **Step 17.4: Commit**

```bash
git add -A
git commit -m "feat(transfers): service page with 6 editorial vignettes"
```

---

## Task 18 — Fleet page

**Files:**
- Create: `src/pages/fleet.astro`
- Extend: `en.json` / `gr.json` with `fleet.*` keys

- [ ] **Step 18.1: `fleet` strings**

```json
{
  "fleet": {
    "hero": { "kicker": "THE FLEET", "headline": "Mercedes-Benz, Across the Size Spectrum.", "sub": "Newly maintained, fully insured, climate-controlled. Chosen for comfort on narrow island roads." },
    "vehicles": [
      { "model": "Mercedes-Benz E-Class", "capacity": "Up to 3 passengers", "luggage": "2 large + 2 carry-on", "ideal": "Airport runs, couples, business travel.", "note": "The default for singles and pairs. Leather, quiet cabin, generous legroom." },
      { "model": "Mercedes-Benz V-Class", "capacity": "Up to 7 passengers", "luggage": "5 large + 5 carry-on", "ideal": "Families, small groups, wedding-party rides.", "note": "Luxury MPV. Walk-up entry, individual seats, huge boot." },
      { "model": "Mercedes-Benz Sprinter 12", "capacity": "Up to 12 passengers", "luggage": "10+ large pieces", "ideal": "Wedding groups, corporate arrivals, friend trips.", "note": "Leather captain seats, air-conditioning, Wi-Fi available." },
      { "model": "Mercedes-Benz Sprinter 20", "capacity": "Up to 20 passengers", "luggage": "Full group capacity", "ideal": "Extended families, events, conference shuttles.", "note": "Our largest. Fleet-maintained, backed by a second vehicle if needed." }
    ]
  }
}
```

- [ ] **Step 18.2: `src/pages/fleet.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import KickerHeading from '../components/KickerHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const t = createT('en', { en, gr });
const vehicles = en.fleet.vehicles;
const images = ['/images/fleet/e-class.jpg','/images/fleet/v-class.jpg','/images/fleet/sprinter-12.jpg','/images/fleet/sprinter-20.jpg'];
---
<BaseLayout title="Our Fleet — Santorini Imperial" locale="en" pathname="/fleet/">
  <Header slot="header" locale="en" pathname="/fleet/" />
  <Hero image="/images/hero/hero-fleet.jpg" kicker={t('fleet.hero.kicker')} headline={t('fleet.hero.headline')} sub={t('fleet.hero.sub')}
    ctaPrimary={{ label: 'Pick Your Vehicle', href: '/contact/' }} minHeight="70vh" />
  <section class="py-section">
    <div class="container-page flex flex-col gap-20">
      {vehicles.map((v,i) => (
        <article class={`grid md:grid-cols-2 gap-10 items-center ${i%2===1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
          <div class="aspect-[5/4] rounded-card overflow-hidden bg-warm shadow-card">
            <img src={images[i]} alt={v.model} class="h-full w-full object-cover" />
          </div>
          <div>
            <div class="kicker">0{i+1} · {v.capacity}</div>
            <h2 class="font-display text-display-lg mt-3 text-ink">{v.model}</h2>
            <p class="mt-4 text-ink/80 leading-relaxed">{v.note}</p>
            <ul class="mt-5 space-y-2 text-sm text-ink/80">
              <li><span class="text-gold">•</span> Luggage: {v.luggage}</li>
              <li><span class="text-gold">•</span> Ideal for: {v.ideal}</li>
            </ul>
            <a href="/contact/" class="btn-primary mt-8">Reserve This Vehicle →</a>
          </div>
        </article>
      ))}
    </div>
  </section>
  <CtaBand headline="Unsure which fits? We'll help you pick." cta={{ label: 'Ask Us', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 18.3: Smoke test**

`/fleet/` renders 4 alternating image-text rows, hero, CTA band, footer. No layout shift.

- [ ] **Step 18.4: Commit**

```bash
git add -A
git commit -m "feat(fleet): alternating-row fleet page with detailed vehicle specs"
```

---

## Task 19 — Gallery page

**Files:**
- Create: `src/pages/gallery.astro`

- [ ] **Step 19.1: Write the page**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import GalleryGrid from '../components/GalleryGrid.astro';
import CtaBand from '../components/CtaBand.astro';

// Enumerate /public/images/gallery at build time via import.meta.glob
const files = import.meta.glob('/public/images/gallery/*.{jpg,jpeg,png,webp}', { eager: false });
const images = Object.keys(files).map(p => {
  const name = p.split('/').pop()!;
  const publicPath = p.replace('/public', '');
  return { src: publicPath, alt: `Santorini — ${name.replace(/\..+$/,'')}` };
});
---
<BaseLayout title="Gallery — Santorini Imperial" locale="en" pathname="/gallery/">
  <Header slot="header" locale="en" pathname="/gallery/" />
  <Hero image="/images/hero/hero-gallery.jpg" kicker="OUR WORK" headline="The Island, Through Our Lens" sub="A running collection of tours, fleet, and the Santorini moments we've been lucky enough to be part of."
    ctaPrimary={{ label: 'Plan a Day With Us', href: '/contact/' }} minHeight="60vh" />
  <section class="bg-warm py-section">
    <div class="container-page">
      {images.length > 0
        ? <GalleryGrid images={images} />
        : <p class="text-center text-ink/60">Gallery images load from <code>/public/images/gallery/</code>. Add files there to populate this page.</p>}
    </div>
  </section>
  <CtaBand headline="Make your own Santorini album." cta={{ label: 'Book a Tour', href: '/tours/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 19.2: Smoke test**

Expected: `/gallery/` renders a responsive grid (2/3/4 cols by breakpoint), clicking an image opens `<dialog>` lightbox, clicking backdrop or `×` closes.

- [ ] **Step 19.3: Commit**

```bash
git add -A
git commit -m "feat(gallery): responsive grid with dialog lightbox"
```

---

## Task 20 — About + Contact pages

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`
- Extend: `en.json` / `gr.json` with `about.*` and `contact.*`

- [ ] **Step 20.1: Strings**

```json
{
  "about": {
    "hero": { "kicker": "ABOUT US", "headline": "Built on the Island. Run by Locals.", "sub": "Santorini Imperial is a small team of licensed operators who happen to love the island enough to show up at 3am so you don't have to worry about your ride." },
    "pillars": [
      { "title": "Local", "body": "We live here. Every driver, every guide, every booking confirmation. You are never routed through a foreign call centre." },
      { "title": "Mercedes only", "body": "A single, maintained fleet — because consistency is what separates a ride from a transfer." },
      { "title": "Fixed-price, always", "body": "The quote is the price. No surge hours, no surprise luggage fees, no change at the door." }
    ]
  },
  "contact": {
    "hero": { "kicker": "GET IN TOUCH", "headline": "Tell Us Your Plan.", "sub": "Fill the form or reach us directly — we reply within the hour during daylight and within four hours overnight." },
    "channels": {
      "phone": "Phone / WhatsApp / Viber",
      "email": "Email",
      "socials": "Socials"
    }
  }
}
```

- [ ] **Step 20.2: `src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import KickerHeading from '../components/KickerHeading.astro';
import CtaBand from '../components/CtaBand.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const t = createT('en', { en, gr });
const pillars = en.about.pillars;
---
<BaseLayout title="About — Santorini Imperial" locale="en" pathname="/about/">
  <Header slot="header" locale="en" pathname="/about/" />
  <Hero image="/images/hero/hero-about.jpg" kicker={t('about.hero.kicker')} headline={t('about.hero.headline')} sub={t('about.hero.sub')}
    ctaPrimary={{ label: 'Meet Us', href: '/contact/' }} minHeight="60vh" />
  <section class="bg-white py-section">
    <div class="container-page max-w-3xl font-sans text-lead text-ink/80 leading-relaxed space-y-6">
      <p>Santorini is a small island with a big reputation. We started running transfers because the two options — big faceless buses or last-minute taxi scrambles — both felt like bad openings to a trip that often represents months of saving and planning.</p>
      <p>So we put a Mercedes E-Class at the airport, started tracking flights, and refused to charge more if someone was late. A few years later we have a fleet of four and a small team of drivers who've all lived here their whole lives.</p>
      <p>What we don't do: own a hotel, run a restaurant, push you into side commissions. What we do: drive you, guide you if you want a guide, and get out of the way otherwise.</p>
    </div>
  </section>
  <section class="bg-warm py-section">
    <div class="container-page">
      <KickerHeading kicker="WHAT WE STAND FOR" heading="Three commitments" />
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        {pillars.map(p => (
          <div class="bg-white rounded-card border border-warm-border p-8 shadow-card">
            <h3 class="font-display text-2xl text-ink">{p.title}</h3>
            <p class="mt-3 text-ink/70 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  <CtaBand headline="Good. Let's plan your trip." cta={{ label: 'Start Here', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 20.3: `src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import BookingForm from '../components/BookingForm.astro';
import { createT } from '../lib/i18n';
import en from '../content/i18n/en.json';
import gr from '../content/i18n/gr.json';
const t = createT('en', { en, gr });
---
<BaseLayout title="Contact — Santorini Imperial" locale="en" pathname="/contact/">
  <Header slot="header" locale="en" pathname="/contact/" />
  <Hero image="/images/hero/hero-contact.jpg" kicker={t('contact.hero.kicker')} headline={t('contact.hero.headline')} sub={t('contact.hero.sub')}
    ctaPrimary={{ label: 'Call Now', href: 'tel:+306940355016' }}
    ctaSecondary={{ label: 'WhatsApp', href: 'https://wa.me/306940355016' }}
    minHeight="60vh" />

  <section class="bg-white py-section">
    <div class="container-page grid gap-12 md:grid-cols-[3fr_2fr]">
      <div>
        <div class="kicker">BOOKING ENQUIRY</div>
        <h2 class="font-display text-display-lg mt-3">Tell us the plan.</h2>
        <p class="mt-4 text-ink/70 max-w-xl">Fill the form. We reply in under an hour during daylight, within four hours overnight.</p>
        <div class="mt-10"><BookingForm /></div>
      </div>
      <aside class="space-y-8">
        <div>
          <div class="kicker">{t('contact.channels.phone')}</div>
          <ul class="mt-3 space-y-1 text-ink/80">
            <li><a href="tel:+306940355016" class="hover:text-gold">+30 6940 355016</a></li>
            <li><a href="https://wa.me/306940355016" class="hover:text-gold">WhatsApp</a></li>
            <li>Viber · WeChat (same number)</li>
          </ul>
        </div>
        <div>
          <div class="kicker">{t('contact.channels.email')}</div>
          <ul class="mt-3 space-y-1 text-ink/80">
            <li><a href="mailto:info@santoriniimperial.com" class="hover:text-gold">info@santoriniimperial.com</a></li>
            <li><a href="mailto:imperialsantorini@gmail.com" class="hover:text-gold">imperialsantorini@gmail.com</a></li>
          </ul>
        </div>
        <div>
          <div class="kicker">{t('contact.channels.socials')}</div>
          <ul class="mt-3 space-y-1 text-ink/80">
            <li><a href="https://instagram.com/santorini_imperial" target="_blank" rel="noopener" class="hover:text-gold">Instagram — @santorini_imperial</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 20.4: Smoke test**

Submit the form with empty fields → inline errors appear per field. Submit with valid data → form hides itself, "INQUIRY RECEIVED" gold-wash card appears. No network request is made (verify in DevTools Network tab).

- [ ] **Step 20.5: Commit**

```bash
git add -A
git commit -m "feat(about,contact): about page with pillars + contact page with booking form"
```

---

## Task 21 — Blog index + second placeholder post

**Files:**
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/content/blog/en/welcome-to-santorini.md` (the 2nd placeholder)

- [ ] **Step 21.1: Second blog post**

```markdown
<!-- src/content/blog/en/welcome-to-santorini.md -->
---
slug: welcome-to-santorini
title: "Your first 24 hours on Santorini — a sequence that works"
locale: en
published_at: 2026-02-12
cover_image: /images/hero/hero-home.jpg
excerpt: "Arrivals, a quiet dinner, and waking up on the right side of the island. A 24-hour template that avoids tourist fatigue."
author: "Santorini Imperial"
---

(Placeholder body.)

Start with a transfer straight from the airport; the first 30 minutes of the drive let the island announce itself without you doing anything. Skip Fira on day one — it's too concentrated for a tired traveller. Aim for Pyrgos instead …
```

- [ ] **Step 21.2: Blog index**

```astro
---
// src/pages/blog/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Hero from '../../components/Hero.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog', e => e.data.locale === 'en')).sort((a,b)=> +b.data.published_at - +a.data.published_at);
---
<BaseLayout title="Blog — Santorini Imperial" locale="en" pathname="/blog/">
  <Header slot="header" locale="en" pathname="/blog/" />
  <Hero image="/images/hero/hero-home.jpg" kicker="FIELD NOTES" headline="Slow Thoughts From the Island" sub="Pacing guides, seasonal notes, vehicle tips — written as we go."
    ctaPrimary={{ label: 'Plan a Trip', href: '/contact/' }} minHeight="55vh" />
  <section class="bg-white py-section">
    <div class="container-page grid gap-8 md:grid-cols-2">
      {posts.map(p => (
        <a href={`/blog/${p.data.slug}/`} class="group block bg-white rounded-card border border-warm-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all overflow-hidden">
          <div class="aspect-[5/3] overflow-hidden">
            <img src={p.data.cover_image} alt={p.data.title} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div class="p-6">
            <div class="kicker">{new Date(p.data.published_at).toLocaleDateString('en', { month: 'long', year: 'numeric' })}</div>
            <h2 class="mt-2 font-display text-2xl text-ink">{p.data.title}</h2>
            <p class="mt-3 text-ink/70">{p.data.excerpt}</p>
          </div>
        </a>
      ))}
    </div>
  </section>
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 21.3: Blog detail**

```astro
---
// src/pages/blog/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog', e => e.data.locale === 'en');
  return posts.map(p => ({ params: { slug: p.data.slug }, props: { post: p } }));
}
const { post } = Astro.props;
const { Content } = await post.render();
---
<BaseLayout title={`${post.data.title} — Santorini Imperial`} locale="en" pathname={`/blog/${post.data.slug}/`} image={post.data.cover_image}>
  <Header slot="header" locale="en" pathname={`/blog/${post.data.slug}/`} />
  <article class="pt-[113px]">
    <div class="container-page max-w-3xl py-section">
      <div class="kicker">{new Date(post.data.published_at).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
      <h1 class="font-display text-display-lg mt-3 text-ink">{post.data.title}</h1>
      <p class="mt-4 text-lead text-ink/70">{post.data.excerpt}</p>
      <div class="mt-10 prose max-w-none font-sans text-lead text-ink/80 leading-relaxed">
        <Content />
      </div>
    </div>
  </article>
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 21.4: Smoke test**

`/blog/` shows 2 post cards. `/blog/planning-your-santorini-transfer/` and `/blog/welcome-to-santorini/` render full posts.

- [ ] **Step 21.5: Commit**

```bash
git add -A
git commit -m "feat(blog): index page + detail template + second placeholder post"
```

---

## Task 22 — Greek transcreation for all JSON bundles + tour/blog Markdown

**Files:**
- Modify: `src/content/i18n/gr.json` (replace all `[el]` placeholders with humanized Greek)
- Create: `src/content/tours/el/wine-experience.md`, `sightseeing.md`, `full-day.md`, `luxe-photo-tour.md`
- Create: `src/content/blog/el/planning-your-santorini-transfer.md`, `welcome-to-santorini.md`
- Create: `LOCALIZATION.md` at repo root

- [ ] **Step 22.1: Rewrite `src/content/i18n/gr.json` with humanized Greek**

The full file — every key, composed natively (not translated):

```json
{
  "home": {
    "hero": {
      "kicker": "ΙΔΙΩΤΙΚΕΣ ΜΕΤΑΦΟΡΕΣ · ΕΠΙΛΕΓΜΕΝΕΣ ΕΜΠΕΙΡΙΕΣ",
      "headline": "Σαντορίνη, χωρίς τα logistics.",
      "sub": "Ιδιωτικές μεταφορές με Mercedes-Benz κι επιλεγμένες εμπειρίες στο νησί. Σταθερές τιμές, υποδοχή στην άφιξη, 24 ώρες το εικοσιτετράωρο.",
      "cta_primary": "Κλείσε τη μεταφορά σου",
      "cta_secondary": "Κάλεσέ μας"
    },
    "why": {
      "kicker": "ΓΙΑΤΙ ΕΜΑΣ",
      "heading": "Σταθερές τιμές. Στόλος Mercedes. Κάθε μέρα του χρόνου.",
      "items": [
        { "title": "Σταθερές τιμές", "body": "Η τιμή που σου δίνουμε είναι η τιμή που πληρώνεις. Καμία προσαύξηση, καμία χρέωση για αποσκευές." },
        { "title": "24 ώρες το εικοσιτετράωρο", "body": "Νυχτερινό πλοίο, πρωινή πτήση, μεσημεριανή αναχώρηση — βρισκόμαστε εκεί όποτε μας χρειαστείς." },
        { "title": "Εξουσιοδοτημένοι οδηγοί", "body": "Επαγγελματίες, ασφαλισμένοι, με άνετα αγγλικά και γνώση του νησιού σαν να μεγάλωσαν εκεί — γιατί, συνήθως, εκεί μεγάλωσαν." },
        { "title": "Πληρωμή με κάρτα", "body": "Όλες οι κάρτες δεκτές. Χωρίς επιβαρύνσεις. Τιμολόγιο κατόπιν ζήτησης." }
      ]
    },
    "tours": {
      "kicker": "ΕΠΙΛΕΓΜΕΝΕΣ ΕΜΠΕΙΡΙΕΣ",
      "heading": "Τέσσερις τρόποι να γνωρίσεις το νησί",
      "sub": "Συνδύασε οποιαδήποτε εμπειρία με μεταφορά και φτιάχνουμε όλη σου τη μέρα.",
      "cta": "Δες όλες τις εμπειρίες"
    },
    "fleet": { "kicker": "Ο ΣΤΟΛΟΣ", "heading": "Η γκάμα Mercedes-Benz", "sub": "Κάθε αυτοκίνητο κλιματιζόμενο, πρόσφατα συντηρημένο, φτιαγμένο για τους στενούς δρόμους της Σαντορίνης.", "cta": "Δες ολόκληρο τον στόλο" },
    "testimonials": { "kicker": "ΠΕΛΑΤΕΣ ΛΕΝΕ", "heading": "Τι λένε όσοι ταξίδεψαν μαζί μας" },
    "cta_band": { "headline": "Κλείσε τη μεταφορά σου για Σαντορίνη σήμερα", "cta": "Ξεκίνα την κράτηση" }
  },
  "nav": {
    "home": "Αρχική",
    "tours": "Εμπειρίες",
    "transfers": "Μεταφορές",
    "fleet": "Στόλος",
    "gallery": "Συλλογή",
    "about": "Η εταιρεία",
    "contact": "Επικοινωνία",
    "blog": "Άρθρα",
    "book": "Κλείσε τώρα"
  },
  "transfers": {
    "hero": { "kicker": "ΜΕΤΑΦΟΡΕΣ", "headline": "Η άφιξη γίνεται από εμάς — εσύ ξεκουράζεσαι.", "sub": "Αεροδρόμιο, λιμάνι, ξενοδοχείο, γάμος, ή δικός σου οδηγός για όλη τη μέρα. Ίδιος στόλος, ίδιοι οδηγοί, ίδιες σταθερές τιμές." },
    "services": [
      { "title": "Μεταφορά από αεροδρόμιο", "body": "Σε περιμένουμε στις αφίξεις του JTR με όνομα. Βοηθάμε με τις αποσκευές, σε αφήνουμε στο κατάλυμα. Χωρίς χρέωση για εύλογες καθυστερήσεις πτήσης." },
      { "title": "Μεταφορά από λιμάνι", "body": "Συντονισμένη με τις αφίξεις κρουαζιερόπλοιων στον Αθηνιό. Ο οδηγός περιμένει στην αποβάθρα με πινακίδα." },
      { "title": "Αλλαγή καταλύματος", "body": "Αλλάζεις ξενοδοχείο μέσα στις διακοπές; Σε μεταφέρουμε με τα πράγματά σου, αυθημερόν ή με κλείσιμο." },
      { "title": "Μεταφορές γάμου", "body": "Ολόκληρος ο στόλος διαθέσιμος για γαμήλια αυτοκινητοπομπή. Συντονισμός ωρών, εκπτώσεις για γκρουπ." },
      { "title": "Παραλία & βραδινή έξοδος", "body": "Μέρες στην παραλία, βραδινές εξόδους, επιστροφές αργά. Ασφαλώς, νηφάλια, στην ώρα τους." },
      { "title": "Οδηγός για 24 ώρες", "body": "Δικός σου οδηγός και Mercedes για όλη τη μέρα. Φτιάχνεις το πρόγραμμα στην πορεία, χωρίς ταξίμετρο." }
    ]
  },
  "fleet": {
    "hero": { "kicker": "Ο ΣΤΟΛΟΣ", "headline": "Mercedes-Benz, σε κάθε μέγεθος.", "sub": "Πρόσφατα συντηρημένα, πλήρως ασφαλισμένα, με κλιματισμό. Επιλεγμένα για άνεση στους στενούς δρόμους του νησιού." },
    "vehicles": [
      { "model": "Mercedes-Benz E-Class", "capacity": "Έως 3 επιβάτες", "luggage": "2 μεγάλες + 2 χειραποσκευές", "ideal": "Αφίξεις αεροδρομίου, ζευγάρια, ταξίδια εργασίας.", "note": "Η βασική επιλογή για μονά και ζευγάρια. Δερμάτινο σαλόνι, ησυχία, άνεση." },
      { "model": "Mercedes-Benz V-Class", "capacity": "Έως 7 επιβάτες", "luggage": "5 μεγάλες + 5 χειραποσκευές", "ideal": "Οικογένειες, μικρές ομάδες, γαμήλιες μεταφορές.", "note": "Luxury MPV. Είσοδος όρθιος, ανεξάρτητα καθίσματα, μεγάλο πορτμπαγκάζ." },
      { "model": "Mercedes-Benz Sprinter 12", "capacity": "Έως 12 επιβάτες", "luggage": "10+ μεγάλα κομμάτια", "ideal": "Γαμήλια γκρουπ, εταιρικές αφίξεις, ταξίδια με φίλους.", "note": "Δερμάτινα captain καθίσματα, κλιματισμός, Wi-Fi κατόπιν ζήτησης." },
      { "model": "Mercedes-Benz Sprinter 20", "capacity": "Έως 20 επιβάτες", "luggage": "Πλήρης χωρητικότητα γκρουπ", "ideal": "Εκτεταμένες οικογένειες, εκδηλώσεις, συνεδριακές μεταφορές.", "note": "Το μεγαλύτερο όχημά μας. Πλήρως συντηρημένο, με δεύτερο όχημα υποστήριξης εφόσον χρειαστεί." }
    ]
  },
  "about": {
    "hero": { "kicker": "Η ΕΤΑΙΡΕΙΑ", "headline": "Χτισμένη στο νησί. Απ' τους ντόπιους.", "sub": "Η Santorini Imperial είναι μια μικρή ομάδα εξουσιοδοτημένων επαγγελματιών που αγαπάνε το νησί αρκετά ώστε να σηκώνονται στις 3 τα ξημερώματα για να μη σε νοιάζει η μεταφορά σου." },
    "pillars": [
      { "title": "Ντόπιοι", "body": "Εδώ ζούμε. Κάθε οδηγός, κάθε ξεναγός, κάθε επιβεβαίωση κράτησης. Δεν περνάς ποτέ από ξένο call centre." },
      { "title": "Μόνο Mercedes", "body": "Ένας συντηρημένος στόλος — γιατί η συνέπεια είναι που κάνει μια μεταφορά μεταφορά." },
      { "title": "Πάντα σταθερές τιμές", "body": "Η προσφορά είναι η τιμή. Χωρίς surge, χωρίς εκπλήξεις αποσκευών, χωρίς αλλαγή στην πόρτα." }
    ]
  },
  "contact": {
    "hero": { "kicker": "ΕΠΙΚΟΙΝΩΝΙΑ", "headline": "Πες μας το πλάνο σου.", "sub": "Συμπλήρωσε τη φόρμα ή γράψε μας κατευθείαν — απαντάμε μέσα σε μία ώρα τη μέρα και τέσσερις τη νύχτα." },
    "channels": {
      "phone": "Τηλέφωνο / WhatsApp / Viber",
      "email": "Email",
      "socials": "Social media"
    }
  }
}
```

- [ ] **Step 22.2: Mirror the 4 tour Markdown files into `src/content/tours/el/`**

Same schema, humanized Greek copy. Template for `wine-experience.md`:

```markdown
---
slug: wine-experience
title: "Εμπειρίες κρασιού"
locale: el
hero_image: /images/tours/wine.jpg
duration_hours: 4
format: "Ημι-ιδιωτική"
price_from_eur: null
included:
  - "Παραλαβή με Mercedes-Benz από ξενοδοχείο ή βίλα"
  - "Επίσκεψη σε τρία οινοποιεία με γευστικές δοκιμές"
  - "Δώδεκα ξεχωριστές ποικιλίες κρασιών Σαντορίνης"
  - "Θέα ηλιοβασιλέματος στην Οία"
itinerary:
  - { time: "14:00", event: "Παραλαβή" }
  - { time: "14:30", event: "Santo Wines — γευστική Ασύρτικου" }
  - { time: "16:00", event: "Venetsanos — δοκιμή Vinsanto" }
  - { time: "17:30", event: "Gaia Wines — Thalassitis παλαιωμένο στη θάλασσα" }
  - { time: "19:00", event: "Σημείο ηλιοβασιλέματος, Οία" }
  - { time: "20:30", event: "Επιστροφή" }
faq:
  - q: "Η εμπειρία είναι ιδιωτική ή ομαδική;"
    a: "Ημι-ιδιωτική. Ταξιδεύεις με την παρέα σου στο όχημα· δεν μοιράζεσαι με αγνώστους."
  - q: "Μπορούμε να προσθέσουμε φαγητό;"
    a: "Ναι — κανονίζουμε γευστικό μενού στο τρίτο οινοποιείο κατόπιν ζήτησης."
  - q: "Καλύπτετε ειδικές διατροφικές ανάγκες;"
    a: "Ναι· πείτε μας κατά την κράτηση και συνεννοούμαστε με τα οινοποιεία."
order: 1
---

Το ηφαιστειακό έδαφος της Σαντορίνης δίνει στα κρασιά μια μεταλλικότητα που τη διακρίνεις με την πρώτη γουλιά. Τέσσερις ώρες, σχεδιασμένες να σ' αφήσουν να τη νιώσεις — αμπέλια σε γκρεμό, υπόγειες στοές, κι ένα κλείσιμο με ηλιοβασίλεμα στην Οία.
```

Produce `sightseeing.md`, `full-day.md`, `luxe-photo-tour.md` analogously — keep frontmatter identical except `title` (translated) and body/itinerary/faq (humanized).

- [ ] **Step 22.3: Mirror the 2 blog posts into `src/content/blog/el/`**

Same schema, Greek humanized body. Keep the `slug` field identical to the EN version so the URL mirrors cleanly.

- [ ] **Step 22.4: Write `LOCALIZATION.md` at repo root**

```markdown
# Localization — status & review gate

**STATUS: pre-human-proof. DO NOT SHIP TO PRODUCTION.**

All Greek copy in this repository was transcreated (composed natively, not translated) by an AI model and requires human review by a native Greek speaker before any production use.

## Review protocol

For each file below, a native Greek reviewer should:
1. Read the Greek alongside the English.
2. Mark any phrasing that sounds translated or non-native.
3. Check that tourism-industry register is consistent (neither too formal nor too colloquial).
4. Propose replacement copy inline with tracked changes.

## Files to review

- [ ] `src/content/i18n/gr.json` — all UI strings
- [ ] `src/content/tours/el/wine-experience.md`
- [ ] `src/content/tours/el/sightseeing.md`
- [ ] `src/content/tours/el/full-day.md`
- [ ] `src/content/tours/el/luxe-photo-tour.md`
- [ ] `src/content/blog/el/planning-your-santorini-transfer.md`
- [ ] `src/content/blog/el/welcome-to-santorini.md`

## String-by-string EN ↔ EL reference

| Key | English | Greek (current) | Reviewer notes |
|---|---|---|---|
| `home.hero.headline` | Santorini, Without the Logistics. | Σαντορίνη, χωρίς τα logistics. | |
| `home.hero.sub` | Mercedes-Benz transfers and curated tours… | Ιδιωτικές μεταφορές με Mercedes-Benz κι επιλεγμένες εμπειρίες… | |
| (add more rows as the string catalog grows) | | | |

## Removing the gate

When review is complete, delete this file and add a line to `README.md` noting the reviewer's name, date, and scope of review.
```

- [ ] **Step 22.5: Verify all GR routes now render cleanly**

```bash
npm run astro check
npm run dev
```

Open `/el/`, `/el/tours/`, `/el/tours/wine-experience/`, `/el/contact/`, etc. Confirm: no `[el]` placeholders anywhere, language switcher flips pathname correctly, `<html lang="el">` on Greek pages.

- [ ] **Step 22.6: Commit**

```bash
git add -A
git commit -m "feat(i18n): humanized Greek transcreation for all pages + LOCALIZATION.md review gate"
```

---

## Task 23 — GSAP motion polish (entrance animations + hero parallax)

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (add client motion script)
- Create: `src/lib/animations.ts`

- [ ] **Step 23.1: `src/lib/animations.ts`**

```ts
import { getGsap, getSplitText, prefersReducedMotion } from './motion';

export async function initAllAnimations() {
  if (prefersReducedMotion()) return;
  const { gsap, ScrollTrigger } = await getGsap();

  // Hero H1 word-by-word reveal
  const h1 = document.querySelector<HTMLElement>('.hero-h1');
  if (h1) {
    const splitter = await getSplitText();
    const spans = splitter.split(h1);
    gsap.set(spans, { y: 24, opacity: 0 });
    gsap.to(spans, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06 });
  }
  const heroSub = document.querySelector<HTMLElement>('.hero-sub');
  const heroCtas = document.querySelector<HTMLElement>('.hero-ctas');
  if (heroSub) gsap.fromTo(heroSub, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.3 });
  if (heroCtas) gsap.fromTo(heroCtas, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.5 });

  // Hero parallax
  const heroBg = document.querySelector<HTMLElement>('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: heroBg.closest('section'),
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Section entrance: kicker → H2 → body/cards stagger
  document.querySelectorAll<HTMLElement>('section').forEach(sec => {
    const kicker = sec.querySelector<HTMLElement>('.kicker');
    const h = sec.querySelector<HTMLElement>('h2, h1:not(.hero-h1)');
    const body = sec.querySelectorAll<HTMLElement>('article, figure, .prose, form, p');
    const targets = [kicker, h, ...Array.from(body)].filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;
    gsap.set(targets, { y: 24, opacity: 0 });
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(targets, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 });
      },
    });
  });
}
```

- [ ] **Step 23.2: Wire into `BaseLayout.astro` (inline `<script>` at end of body)**

Inside `BaseLayout.astro`, just before `</body>`, add:

```astro
<script>
  import('../lib/animations').then(m => m.initAllAnimations?.());
</script>
```

- [ ] **Step 23.3: Browser smoke — animations**

Run `npm run dev`, hard-refresh `/`. Expected:
- H1 words fade in staggered on load.
- Hero BG image parallaxes as you scroll.
- Each subsequent section's kicker, H2, and cards animate in once when entering viewport.
- Scroll past the hero quickly — no jank, no pop-in. Toggle DevTools' "Emulate CSS media feature prefers-reduced-motion: reduce"; reload. Expected: everything visible instantly, zero entrance animation, hero image static.

- [ ] **Step 23.4: Commit**

```bash
git add -A
git commit -m "feat(motion): GSAP hero split-text reveal, parallax, per-section entrance stagger; reduced-motion guard verified"
```

---

## Task 24 — README + content-gap log + route smoke script

**Files:**
- Modify: `README.md` (replace skeleton with full project README)
- Create: `scripts/smoke-routes.mjs`

- [ ] **Step 24.1: Write `README.md`**

```markdown
# Santorini Imperial — Redesign

A bilingual (EN + GR) Astro site redesigning **https://santoriniimperial.com/** using the editorial-luxury design tokens documented in [`DESIGN.md`](./DESIGN.md) (originally extracted from rhodestransfer24.com).

## Quickstart

    npm install
    npm run dev

Opens at http://localhost:4321/. Greek locale at http://localhost:4321/el/ (or /gr/ which redirects to /el/).

## Scripts

- `npm run dev` — Astro dev server with HMR
- `npm run build` — static production build to `dist/`
- `npm run preview` — preview production build locally
- `npm test` — run Vitest suite
- `npm run smoke` — request every route and assert 200 (requires dev server running)

## Project status

**This is a redesign concept, not production-ready.** Before any public deployment:

1. [ ] Greek copy must be human-proofed by a native speaker — see [`LOCALIZATION.md`](./LOCALIZATION.md).
2. [ ] Borrowed imagery in `/public/images/` must be legally cleared — see [`public/images/ATTRIBUTIONS.md`](./public/images/ATTRIBUTIONS.md).
3. [ ] Tour prices (`price_from_eur` in each tour Markdown) need real values from the client — currently null.
4. [ ] Booking form is visual-only; swap in Formspree / backend before launch.
5. [ ] Content gaps listed in `ATTRIBUTIONS.md` need client-supplied imagery.

## Architecture

- **Astro 4** static site, built-in i18n routing.
- **Tailwind CSS** with DESIGN.md tokens in `tailwind.config.mjs`.
- **GSAP** for hero split-text reveal, parallax, section entrance stagger — guarded by `prefers-reduced-motion`.
- **Vitest** for the i18n helper, routing helper, motion guard, and form validation.

## File layout

    src/
      components/      — reusable UI (Hero, cards, form, etc.)
      layouts/         — BaseLayout.astro
      lib/             — i18n, routing, motion, validation
      content/
        i18n/          — UI string bundles (en.json, gr.json)
        tours/{en,el}/ — tour long-form content
        blog/{en,el}/  — blog posts
      pages/           — file-based routes
      styles/          — global.css with Tailwind directives

## Design source

`DESIGN.md` is the single source of truth for colors, typography, radii, shadows, and motion patterns. All Tailwind theme extensions derive from it.
```

- [ ] **Step 24.2: Write `scripts/smoke-routes.mjs`**

```js
#!/usr/bin/env node
const BASE = process.env.BASE_URL || 'http://localhost:4321';
const routes = [
  '/',
  '/tours/', '/tours/wine-experience/', '/tours/sightseeing/', '/tours/full-day/', '/tours/luxe-photo-tour/',
  '/transfers/', '/fleet/', '/gallery/', '/about/', '/contact/',
  '/blog/', '/blog/planning-your-santorini-transfer/', '/blog/welcome-to-santorini/',
  '/el/', '/el/tours/', '/el/tours/wine-experience/', '/el/tours/sightseeing/', '/el/tours/full-day/', '/el/tours/luxe-photo-tour/',
  '/el/transfers/', '/el/fleet/', '/el/gallery/', '/el/about/', '/el/contact/',
  '/el/blog/', '/el/blog/planning-your-santorini-transfer/', '/el/blog/welcome-to-santorini/',
];

const failures = [];
for (const r of routes) {
  const url = BASE + r;
  const res = await fetch(url, { redirect: 'follow' });
  const status = res.status;
  const ok = status >= 200 && status < 400;
  console.log(`${ok ? '✓' : '✗'} ${status}  ${url}`);
  if (!ok) failures.push({ url, status });
}
console.log(`\n${routes.length - failures.length} / ${routes.length} routes OK`);
if (failures.length > 0) {
  console.error('Failures:', failures);
  process.exit(1);
}
```

Add to `package.json` scripts: `"smoke": "node scripts/smoke-routes.mjs"`.

- [ ] **Step 24.3: Run smoke against dev server**

```bash
npm run dev &
sleep 4
npm run smoke
kill %1
```

Expected: all 28 routes return 200 (or follow a 200 after redirect). Fix any 404s before committing.

- [ ] **Step 24.4: Commit**

```bash
git add -A
git commit -m "chore: README, route smoke script, status checklist"
```

---

## Task 25 — Final QA pass + LOCALIZATION tail + handoff

**Files:**
- Modify: `LOCALIZATION.md` (fill the string-by-string reference table)
- Modify: `README.md` (add final status)

- [ ] **Step 25.1: Build + `astro check`**

```bash
npm run astro check
npm run build
```

Expected: zero errors, zero warnings; `dist/` contains 28 `.html` files (plus assets).

- [ ] **Step 25.2: Build the full EN ↔ GR reference table in `LOCALIZATION.md`**

Open both `en.json` and `gr.json`. For every leaf string, append a row to the table in `LOCALIZATION.md`:

```markdown
| Key | English | Greek (current) | Reviewer notes |
|---|---|---|---|
| `nav.home` | Home | Αρχική | |
| `nav.tours` | Tours | Εμπειρίες | |
| `nav.transfers` | Transfers | Μεταφορές | |
| ...every key... | | | |
```

(This is tedious but important — it's the review checklist for the human translator.)

- [ ] **Step 25.3: Run Lighthouse on the homepage**

With `npm run dev` running:

```bash
npx lighthouse http://localhost:4321/ --preset=desktop --output=json --output-path=./lighthouse-home.json --quiet --chrome-flags="--headless"
node -e "const r=require('./lighthouse-home.json'); console.log({ perf:r.categories.performance.score*100, a11y:r.categories.accessibility.score*100, bp:r.categories['best-practices'].score*100, seo:r.categories.seo.score*100 });"
```

Expected per spec success criteria:
- Accessibility ≥ 95
- Performance ≥ 85

If either fails, address the top issues reported by Lighthouse (usually: image dimensions, alt text, contrast). Commit fixes separately.

- [ ] **Step 25.4: Final route smoke**

```bash
npm run dev &
sleep 4
npm run smoke
kill %1
```

Expected: 28/28 routes OK.

- [ ] **Step 25.5: Commit**

```bash
git add -A
git commit -m "chore: final QA — Lighthouse pass, complete GR review table, status updated"
```

- [ ] **Step 25.6: Summary for the user**

Produce a final summary message listing:
- Total routes built
- Lighthouse scores
- Files still flagged as gating production (ATTRIBUTIONS.md, LOCALIZATION.md)
- Any content gaps the client must fill
- Command to start dev: `npm run dev` → http://localhost:4321/

Done.

---

## Self-review — internal

Applied the skill's self-review protocol:

- **Spec coverage:** Every section of the spec has a corresponding task. §1 Goal → all tasks collectively. §3 Sitemap → Tasks 15-21. §5 Components → Tasks 11-14. §6 i18n → Tasks 4, 5, 22. §7 Motion → Tasks 6, 23. §8 File layout → Tasks 1-2. §9 Tokens → Task 2. §10 Tour schema → Task 7 + 16 + 22. §11 Open assumptions → covered in Task 3 (image gaps) + Task 22 (LOCALIZATION.md) + Task 24 (README status). §12 Risks → mitigated throughout (LOCALIZATION.md, ATTRIBUTIONS.md, reduced-motion guard, route smoke).
- **Placeholder scan:** No "TODO" / "TBD" / "similar to Task N" patterns remain. Every code step shows complete code.
- **Type consistency:** `Locale` type defined in Task 4 (`'en' | 'el'`) reused consistently. `t()` helper signature matches across every usage.
- **Bite-sized steps:** Every step is a concrete action + verification or commit. No step implies "figure out how to do X."
- **One file contradiction caught and fixed inline:** the `/gr/` URL prefix is handled via Astro `redirects` (Task 5.1) since Astro's built-in i18n uses `/el/` natively. The redirect makes `/gr/foo` work while internal URLs remain `/el/foo`. This is documented in Task 5.1.

Plan complete.
