# Wine-Experience Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic `[slug].astro` rendering of the wine-experience page with a bespoke editorial layout (Option A — winery showcase) that gives each of the three wineries a full-width panel with numbered kicker, heading, body, and meta strip.

**Architecture:** Two new locale-specific pages (`src/pages/tours/wine-experience.astro` and the EL mirror) shadow the dynamic route. The dynamic `[slug].astro` for both locales is updated to exclude `wine-experience` from `getStaticPaths`. A reusable `WineryPanel.astro` component encapsulates the editorial panel so EN and EL stay in sync. All other reusable components (Hero, KickerHeading, FaqAccordion, CtaBand, Footer, Header) are reused as-is — no design-system changes.

**Tech Stack:** Astro 6.1.9, Tailwind CSS, existing component library, Astro content collections (frontmatter still drives meta).

---

## File Structure

**Create:**
- `src/components/WineryPanel.astro` — reusable editorial panel: oversized number left, kicker + heading + body slot + meta strip right.
- `src/pages/tours/wine-experience.astro` — bespoke EN page that overrides the dynamic route.
- `src/pages/el/tours/wine-experience.astro` — bespoke EL page.

**Modify:**
- `src/pages/tours/[slug].astro` — exclude `wine-experience` slug from `getStaticPaths` so the bespoke file wins.
- `src/pages/el/tours/[slug].astro` — same exclusion.

**Untouched (reused as-is):** `BaseLayout.astro`, `Header.astro`, `Footer.astro`, `Hero.astro`, `KickerHeading.astro`, `FaqAccordion.astro`, `CtaBand.astro`, `TourCard.astro`. Content files (`src/content/tours/{en,el}/wine-experience.md`) are unchanged.

**Tests:** This codebase has no Astro component-level tests (vitest covers `lib/validation.ts` and i18n parity only). Verification is via the existing route smoke script (`scripts/smoke-routes.mjs`) plus a small `curl | grep` content-presence check per page.

---

## Design contract for the bespoke page

Per Option A:

1. **Hero** — reuse `Hero.astro` with `minHeight="70vh"`. Kicker = `"PRIVATE · 4 HOURS"`. Headline = `"Wine Tour"`. Sub = `"Three wineries on the caldera. One car. No logistics."`. Primary CTA = `{ label: 'Reserve This Tour', href: '/contact/' }`.
2. **Intro band** (bg-white, py-section) — single short paragraph (the existing markdown intro line).
3. **Three winery panels** stacked, alternating bg-white / bg-warm (panel 1 white, panel 2 warm, panel 3 white). Each panel uses `WineryPanel`.
4. **Booking strip** (bg-ink, py-section, full-width) — small "What's included" list as 4 icon-less bullets in two columns + Reserve CTA pill.
5. **FAQ** (bg-warm, py-section) — reuse existing `FaqAccordion`, content from frontmatter.
6. **CtaBand** at the bottom.

The "Pair with" 3-up section is omitted on this page (per Option A).

EL page mirrors EN; the only differences are translated copy and locale-aware `pathname`/links.

---

## Task 1: Create the `WineryPanel` component

**Files:**
- Create: `src/components/WineryPanel.astro`

- [ ] **Step 1: Write the component**

```astro
---
export interface Meta { label: string; value: string }
export interface Props {
  index: string;        // "01" | "02" | "03"
  name: string;         // "Santo Wines"
  tagline: string;      // short H2 line
  meta: Meta[];         // 2-4 items
  bg?: 'white' | 'warm';
}
const { index, name, tagline, meta, bg = 'white' } = Astro.props;
const sectionClass = bg === 'warm' ? 'bg-warm' : 'bg-white';
---
<section class={`${sectionClass} py-section`}>
  <div class="container-page max-w-5xl">
    <div class="grid grid-cols-12 gap-6 md:gap-10 items-start">
      <div class="col-span-12 md:col-span-3">
        <div class="font-display text-display-xl text-gold leading-none">{index}</div>
      </div>
      <div class="col-span-12 md:col-span-9">
        <div class="kicker">{name}</div>
        <h2 class="mt-3 font-display text-3xl md:text-4xl leading-tight text-ink">{tagline}</h2>
        <div class="mt-6 prose prose-ink max-w-none font-sans text-lead">
          <slot />
        </div>
        {meta.length > 0 && (
          <ul class="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-wider text-ink/60">
            {meta.map(m => (
              <li><span class="text-gold">{m.label}</span> · <span>{m.value}</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify the component compiles**

Run (dev server is already running on :4321):

```bash
ls -la /Users/marios/Desktop/Cursor/santoriniimperial/src/components/WineryPanel.astro
```

Expected: file present. No call site yet, so no compile error to surface — proceed.

- [ ] **Step 3: Commit the component alone**

```bash
git -C /Users/marios/Desktop/Cursor/santoriniimperial add src/components/WineryPanel.astro
git -C /Users/marios/Desktop/Cursor/santoriniimperial commit -m "feat(WineryPanel): editorial panel component for tour pages"
```

---

## Task 2: Exclude `wine-experience` from EN dynamic route

**Files:**
- Modify: `src/pages/tours/[slug].astro:13`

- [ ] **Step 1: Replace the getStaticPaths filter**

Find this line:

```astro
const tours = await getCollection('tours', (e) => e.data.locale === 'en');
```

Replace with:

```astro
const tours = await getCollection('tours', (e) => e.data.locale === 'en' && e.data.slug !== 'wine-experience');
```

- [ ] **Step 2: Confirm dev server reloaded without error**

```bash
tail -n 20 /private/tmp/claude-501/-Users-marios-Desktop-Cursor-santoriniimperial/032cb5c7-166f-4a5f-b48d-912f3fdf63cb/tasks/blyhskw85.output
```

Expected: a `[glob-loader]` reload entry, no `error` lines. If the dev-server log path differs in your session, check the latest background task output instead.

- [ ] **Step 3: Verify the EN wine route now 404s** (because we removed it from the dynamic route and the bespoke replacement isn't in yet)

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/tours/wine-experience/
```

Expected: `404`. This proves the dynamic route no longer claims this slug.

---

## Task 3: Create the bespoke EN wine-experience page

**Files:**
- Create: `src/pages/tours/wine-experience.astro`

- [ ] **Step 1: Write the page**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import Hero from '../../components/Hero.astro';
import KickerHeading from '../../components/KickerHeading.astro';
import WineryPanel from '../../components/WineryPanel.astro';
import FaqAccordion from '../../components/FaqAccordion.astro';
import CtaBand from '../../components/CtaBand.astro';
import { getEntry } from 'astro:content';

const entry = await getEntry('tours', 'en/wine-experience');
const tour = entry!.data;
---
<BaseLayout title={`${tour.title} — Santorini Imperial`} locale="en" pathname="/tours/wine-experience/" image={tour.hero_image}>
  <Header slot="header" locale="en" pathname="/tours/wine-experience/" />

  <Hero
    image={tour.hero_image}
    kicker={`${tour.format.toUpperCase()} · ${tour.duration_hours} HOURS`}
    headline={tour.title}
    sub="Three wineries on the caldera. One car. No logistics."
    ctaPrimary={{ label: 'Reserve This Tour', href: '/contact/' }}
    minHeight="70vh"
  />

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl text-center">
      <p class="text-lead text-ink/85">Four hours through three of Santorini's most distinctive wineries — each one a different lens on the island's volcanic soil, its ancient Assyrtiko, and the way wine is shaped by a cliff above the caldera.</p>
    </div>
  </section>

  <WineryPanel
    index="01"
    name="Santo Wines"
    tagline="Caldera-edge tasting, panoramic terrace."
    meta={[
      { label: 'Setting', value: 'Caldera rim' },
      { label: 'Signature', value: 'Assyrtiko flight' },
      { label: 'Best at', value: 'Late afternoon' },
    ]}
    bg="white"
  >
    <p>Perched on the edge of the caldera, Santo Wines offers one of the most breathtaking wine-tasting settings in Santorini. Known for its panoramic views and elegant terrace, it's the perfect place to enjoy the island's iconic volcanic wines while overlooking the Aegean Sea — a must-visit for both the scenery and the quality of the wines.</p>
  </WineryPanel>

  <WineryPanel
    index="02"
    name="Venetsanos Winery"
    tagline="Amphitheatric cliffs, sunset terraces."
    meta={[
      { label: 'Setting', value: 'Cliffside, Megalochori' },
      { label: 'Signature', value: 'Vinsanto' },
      { label: 'Best at', value: 'Golden hour' },
    ]}
    bg="warm"
  >
    <p>Built amphitheatrically on the cliffs of Santorini, Venetsanos Winery combines history, architecture, and spectacular views. Its unique design and elevated terraces create a truly memorable tasting experience, especially around sunset — a perfect blend of tradition and scenery.</p>
  </WineryPanel>

  <WineryPanel
    index="03"
    name="Estate Argyros"
    tagline="Heritage Assyrtiko, vineyards all around."
    meta={[
      { label: 'Setting', value: 'Episkopi Gonias vineyards' },
      { label: 'Signature', value: 'Aged Assyrtiko' },
      { label: 'Best at', value: 'Any time' },
    ]}
    bg="white"
  >
    <p>Estate Argyros is one of the most prestigious and historic wineries on the island, renowned for its exceptional Assyrtiko wines. With a focus on quality and tradition, it offers a refined and educational tasting experience in a beautifully designed setting surrounded by vineyards.</p>
  </WineryPanel>

  <section class="bg-ink text-white py-section">
    <div class="container-page max-w-5xl grid gap-10 md:grid-cols-[1fr_auto] items-center">
      <div>
        <div class="kicker text-gold">WHAT'S INCLUDED</div>
        <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-white/85">
          {tour.included.map((i: string) => (<li class="flex gap-2"><span class="text-gold">✓</span><span>{i}</span></li>))}
        </ul>
      </div>
      <a href="/contact/" class="btn-primary whitespace-nowrap">Reserve This Tour <span aria-hidden>→</span></a>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page max-w-3xl">
      <KickerHeading kicker="FAQ" heading="Good to know" level="h2" />
      <div class="mt-8"><FaqAccordion items={tour.faq} /></div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl text-center">
      <p class="font-display italic text-2xl text-ink/80">"Of course, we can adjust the itinerary and replace one winery with another according to your preference."</p>
    </div>
  </section>

  <CtaBand headline={`Book ${tour.title}`} cta={{ label: 'Start Booking', href: '/contact/' }} />
  <Footer slot="footer" locale="en" />
</BaseLayout>
```

- [ ] **Step 2: Verify the EN route now serves 200**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/tours/wine-experience/
```

Expected: `200`.

- [ ] **Step 3: Content-presence smoke check**

```bash
curl -s http://localhost:4321/tours/wine-experience/ \
  | grep -E -c "Santo Wines|Venetsanos|Estate Argyros|Reserve This Tour|WHAT'S INCLUDED"
```

Expected: a number ≥ 5 (each token appears at least once). If 0, the page broke or the markup names don't match — open the page in the browser to inspect.

- [ ] **Step 4: Commit**

```bash
git -C /Users/marios/Desktop/Cursor/santoriniimperial add src/pages/tours/[slug].astro src/pages/tours/wine-experience.astro
git -C /Users/marios/Desktop/Cursor/santoriniimperial commit -m "feat(wine-experience): bespoke editorial layout for EN page"
```

---

## Task 4: Exclude `wine-experience` from EL dynamic route

**Files:**
- Modify: `src/pages/el/tours/[slug].astro` (locate the `getCollection('tours', ...)` line; same shape as EN)

- [ ] **Step 1: Replace the EL getStaticPaths filter**

Find:

```astro
const tours = await getCollection('tours', (e) => e.data.locale === 'el');
```

Replace with:

```astro
const tours = await getCollection('tours', (e) => e.data.locale === 'el' && e.data.slug !== 'wine-experience');
```

- [ ] **Step 2: Verify the EL route 404s before bespoke page is added**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/el/tours/wine-experience/
```

Expected: `404`.

---

## Task 5: Create the bespoke EL wine-experience page

**Files:**
- Create: `src/pages/el/tours/wine-experience.astro`

- [ ] **Step 1: Write the page** (mirror of EN with EL copy)

```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Header from '../../../components/Header.astro';
import Footer from '../../../components/Footer.astro';
import Hero from '../../../components/Hero.astro';
import KickerHeading from '../../../components/KickerHeading.astro';
import WineryPanel from '../../../components/WineryPanel.astro';
import FaqAccordion from '../../../components/FaqAccordion.astro';
import CtaBand from '../../../components/CtaBand.astro';
import { getEntry } from 'astro:content';

const entry = await getEntry('tours', 'el/wine-experience');
const tour = entry!.data;
---
<BaseLayout title={`${tour.title} — Santorini Imperial`} locale="el" pathname="/el/tours/wine-experience/" image={tour.hero_image}>
  <Header slot="header" locale="el" pathname="/el/tours/wine-experience/" />

  <Hero
    image={tour.hero_image}
    kicker={`${tour.format.toUpperCase()} · ${tour.duration_hours} ΩΡΕΣ`}
    headline={tour.title}
    sub="Τρία οινοποιεία στην καλντέρα. Ένα αυτοκίνητο. Μηδέν logistics."
    ctaPrimary={{ label: 'Κράτησε αυτή την εμπειρία', href: '/el/contact/' }}
    minHeight="70vh"
  />

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl text-center">
      <p class="text-lead text-ink/85">Τέσσερις ώρες σε τρία από τα πιο χαρακτηριστικά οινοποιεία της Σαντορίνης — το καθένα μια διαφορετική ματιά στο ηφαιστειακό έδαφος, στο αρχαίο Ασύρτικο και στον τρόπο που το κρασί παίρνει σχήμα πάνω από την καλντέρα.</p>
    </div>
  </section>

  <WineryPanel
    index="01"
    name="Santo Wines"
    tagline="Γευσιγνωσία στο χείλος της καλντέρας."
    meta={[
      { label: 'Τοποθεσία', value: 'Χείλος καλντέρας' },
      { label: 'Σήμα κατατεθέν', value: 'Flight Ασύρτικου' },
      { label: 'Καλύτερη ώρα', value: 'Αργό απόγευμα' },
    ]}
    bg="white"
  >
    <p>Στο χείλος της καλντέρας, το Santo Wines προσφέρει ίσως το πιο εντυπωσιακό σκηνικό γευσιγνωσίας στη Σαντορίνη. Πανοραμική θέα, κομψή βεράντα και τα εμβληματικά ηφαιστειακά κρασιά του νησιού με φόντο το Αιγαίο — must, και για το τοπίο και για την ποιότητα.</p>
  </WineryPanel>

  <WineryPanel
    index="02"
    name="Venetsanos"
    tagline="Αμφιθεατρικά αναβαθμίδια στον γκρεμό."
    meta={[
      { label: 'Τοποθεσία', value: 'Γκρεμός, Μεγαλοχώρι' },
      { label: 'Σήμα κατατεθέν', value: 'Vinsanto' },
      { label: 'Καλύτερη ώρα', value: 'Ώρα ηλιοβασιλέματος' },
    ]}
    bg="warm"
  >
    <p>Χτισμένο αμφιθεατρικά πάνω στους γκρεμούς, το Venetsanos συνδυάζει ιστορία, αρχιτεκτονική κι εκπληκτική θέα. Ο σχεδιασμός του και τα υπερυψωμένα αναβαθμίδια κάνουν τη γευσιγνωσία αξέχαστη — ειδικά γύρω στο ηλιοβασίλεμα. Παράδοση και τοπίο σε ισορροπία.</p>
  </WineryPanel>

  <WineryPanel
    index="03"
    name="Κτήμα Αργυρού"
    tagline="Ιστορικό Ασύρτικο, αμπέλια ολόγυρα."
    meta={[
      { label: 'Τοποθεσία', value: 'Αμπελώνες Επισκοπής Γωνιάς' },
      { label: 'Σήμα κατατεθέν', value: 'Παλαιωμένο Ασύρτικο' },
      { label: 'Καλύτερη ώρα', value: 'Οποιαδήποτε στιγμή' },
    ]}
    bg="white"
  >
    <p>Το Κτήμα Αργυρού είναι από τα πιο φημισμένα και ιστορικά οινοποιεία του νησιού, ξεχωριστό για τα Ασύρτικά του. Με έμφαση στην ποιότητα και την παράδοση, προσφέρει μια εκλεπτυσμένη και διδακτική εμπειρία γευσιγνωσίας μέσα σε ένα φροντισμένο τοπίο γεμάτο αμπέλια.</p>
  </WineryPanel>

  <section class="bg-ink text-white py-section">
    <div class="container-page max-w-5xl grid gap-10 md:grid-cols-[1fr_auto] items-center">
      <div>
        <div class="kicker text-gold">ΤΙ ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ</div>
        <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-white/85">
          {tour.included.map((i: string) => (<li class="flex gap-2"><span class="text-gold">✓</span><span>{i}</span></li>))}
        </ul>
      </div>
      <a href="/el/contact/" class="btn-primary whitespace-nowrap">Κράτησε τώρα <span aria-hidden>→</span></a>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page max-w-3xl">
      <KickerHeading kicker="FAQ" heading="Καλό να ξέρεις" level="h2" />
      <div class="mt-8"><FaqAccordion items={tour.faq} /></div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl text-center">
      <p class="font-display italic text-2xl text-ink/80">«Φυσικά, μπορούμε να προσαρμόσουμε το πρόγραμμα και να αντικαταστήσουμε ένα οινοποιείο με κάποιο άλλο της προτίμησής σου.»</p>
    </div>
  </section>

  <CtaBand headline={`Κράτησε ${tour.title}`} cta={{ label: 'Ξεκίνα την κράτηση', href: '/el/contact/' }} />
  <Footer slot="footer" locale="el" />
</BaseLayout>
```

- [ ] **Step 2: Verify the EL route serves 200 + content present**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4321/el/tours/wine-experience/
curl -s http://localhost:4321/el/tours/wine-experience/ \
  | grep -E -c "Santo Wines|Venetsanos|Κτήμα Αργυρού|Κράτησε τώρα|ΤΙ ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ"
```

Expected: `200` and a count ≥ 5.

- [ ] **Step 3: Commit**

```bash
git -C /Users/marios/Desktop/Cursor/santoriniimperial add src/pages/el/tours/[slug].astro src/pages/el/tours/wine-experience.astro
git -C /Users/marios/Desktop/Cursor/santoriniimperial commit -m "feat(wine-experience): bespoke editorial layout for EL page"
```

---

## Task 6: Full-site smoke + unit tests

**Files:** none

- [ ] **Step 1: Run the route smoke script**

```bash
cd /Users/marios/Desktop/Cursor/santoriniimperial && node scripts/smoke-routes.mjs
```

Expected: `28 / 28 routes OK`. Both `/tours/wine-experience/` and `/el/tours/wine-experience/` should be in the OK list.

- [ ] **Step 2: Run vitest**

```bash
cd /Users/marios/Desktop/Cursor/santoriniimperial && npm test
```

Expected: all tests pass (these cover `lib/validation.ts` and i18n parity, not UI; the redesign should not affect them, but the run guards against regressions).

- [ ] **Step 3: Manual visual check**

Open in browser:
- http://localhost:4321/tours/wine-experience/
- http://localhost:4321/el/tours/wine-experience/

Verify visually: hero kicker matches duration · format, three winery panels alternate white/warm, dark "What's Included" band reads cleanly with the gold "Reserve" pill, FAQ accordion works, italic flexibility quote sits before the final CtaBand.

If anything looks wrong (e.g., panel number styling collides with the heading on mobile), file a follow-up — do not silently tweak in this plan.

---

## Self-Review

- **Spec coverage:** Hero ✓ (Task 3 step 1, EL Task 5). Three winery panels ✓ (Tasks 3, 5 via WineryPanel from Task 1). Booking strip ✓. FAQ ✓. CtaBand ✓. Pair-with section omitted as designed ✓. EL parity ✓.
- **Placeholder scan:** No TBD/TODO. Every code step has the actual code. Every command step has the exact command and expected output.
- **Type consistency:** Component prop names (`index`, `name`, `tagline`, `meta`, `bg`) are used consistently in Tasks 1, 3, 5. `meta` is `Array<{label, value}>` in component and at all call sites.
- **Ambiguity check:** Image asset reused (`tour.hero_image` = `/images/tours/wine.jpg`). Routing precedence: in Astro, a static `wine-experience.astro` file would normally compete with the dynamic `[slug].astro` output for `wine-experience`; we resolve this by removing the slug from `getStaticPaths` (Tasks 2 + 4). Verified by the 404 step (Task 2 step 3) which fails loudly if the dynamic route still claims the slug.
- **Scope:** Single-page redesign + one shared component. Single plan is appropriate.
