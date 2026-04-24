# Design System: Rhodes Transfer 24
**Source:** https://www.rhodestransfer24.com/
**Captured:** 2026-04-24 (live site inspection via computed styles)
**Stack signals:** Tailwind CSS utility classes with custom semantic tokens (`bg-warm`, `text-ink`, `text-gold`, `border-warm-border`, `shadow-card`).

---

## 1. Visual Theme & Atmosphere

**Editorial-luxury, warm-cinematic, understated-premium.** The site reads like a travel-magazine spread that happens to sell transfers: a dark, cinematic hero (a moody Mercedes-Benz cabin interior) gives way to warm, cream-toned editorial sections punctuated by a single disciplined accent — a muted antique gold. The pairing of a high-contrast serif display face with a clean neo-grotesque body evokes quiet confidence rather than chrome-and-glitter opulence. Density is airy; sections breathe with 96px vertical rhythm and a capped 1280px content width. Nothing shouts. The aesthetic promise is "five-star without the velvet rope."

Key adjectives: **editorial, warm, cinematic, disciplined, confident, unhurried.**

---

## 2. Color Palette & Roles

The palette centers on three stories: *ink* (near-black), *bone* (warm off-whites), and *antique gold* as the sole accent.

| Descriptive Name | Hex | Functional Role |
|---|---|---|
| **Ink Black** | `#0A0A0A` | Primary text, headings in light sections, `text-ink` token |
| **Deep Obsidian** | `#000000` | Pure black — used sparingly for overlays and the hero backdrop |
| **Antique Gold** | `#C9A84C` | The *only* chromatic accent — primary CTA fill, active nav link, logo type, kicker labels ("PREMIUM VEHICLES"), icon strokes |
| **Gold Wash** | `rgba(201, 168, 76, 0.08–0.10)` | Tinted backgrounds behind gold icons inside feature cards |
| **Gold Focus Halo** | `rgba(201, 168, 76, 0.235)` | ~7.5px soft ring around focused/active elements (e.g., nav CTA) |
| **Bone Warm** | `#F8F5F0` | Alternating section background (`bg-warm`) — the cream that warms the whole layout |
| **Warm Border** | `#E5E0D6` | 1px card strokes, subtle dividers (`border-warm-border`) |
| **Pure White** | `#FFFFFF` | Card surfaces, alternating section backgrounds, hero text |
| **White-88** | `rgba(255, 255, 255, 0.88)` | Body copy on the dark hero (softer than pure white) |
| **White-40** | `rgba(255, 255, 255, 0.40)` | Hairline dividers inside the hero |
| **Charcoal Secondary** | `#1A1A1A` | "Call Now" secondary CTA fill; dark UI surfaces |
| **Deep Graphite** | `#222222` | Deep neutral used for overlay gradients on hero |
| **Midnight Footer** | `#0F0F0F` | Footer background — a half-shade darker than the charcoal CTA for separation |
| **WhatsApp Green** | `#25D366` | Brand-mandated color of the floating WhatsApp FAB (bottom-right) |

**Palette philosophy:** *Gold is used as a condiment, not a sauce.* It appears only on the primary CTA, the active nav item, kicker labels, icon strokes, and hover halos — never as a flood fill.

---

## 3. Typography Rules

A classical display-serif + humanist-sans pairing drives the editorial tone.

| Role | Family | Weight | Size / Line-height | Treatment |
|---|---|---|---|---|
| **Display (H1)** | Playfair Display, Georgia, serif | 700 | 60px / 60px | White on hero; generous serif terminals; tight leading for stacked lockups |
| **Section Heading (H2)** | Playfair Display, Georgia, serif | 700 | 48px / 48px | Ink on light sections; centered in marketing bands |
| **Card / Sub-Heading (H3)** | Inter, system-ui, sans-serif | 600 | 16px / 24px | Short declarative labels ("No Extra Fees," "24/7 Available") |
| **Body Prominent (lead ¶)** | Inter | 400 | 18px / 29.25px (≈1.625) | Hero sub-paragraph, fleet description |
| **Body Default** | Inter | 400 | 16px / 24px (1.5) | Card descriptions, general copy |
| **Navigation Link** | Inter | 500 | 16px | Tracked slightly wider, gold underline on active |
| **Kicker / Eyebrow** | Inter | 500–600 | ~12–13px, uppercase, tracked ~0.12em | Always rendered in Antique Gold (e.g., "PREMIUM VEHICLES") |
| **Stat Numerals** | Playfair Display | 700 | Large, with superscript % | Used for the "24/7 · 100% Fixed Prices" strip under the hero |

**Pairing logic:** Playfair's contrast-heavy serif signals *hospitality and craft*; Inter's neutrality keeps dense UI copy legible. The rule is strict — **serif for moments, sans for everything functional.**

---

## 4. Component Stylings

### Buttons

* **Primary CTA ("Book Your Transfer", "Book Now")** — Pill-shaped (`border-radius: 9999px`). Fill: Antique Gold (`#C9A84C`). Label: white, Inter medium-semibold. Icon slot on the right for an arrow chevron. Focus/hover gains the Gold Focus Halo (soft 7.5px ring at 23% opacity). No heavy shadow — elevation comes from the color weight itself.
* **Secondary CTA ("Call Now")** — Same pill shape. Fill: Charcoal Secondary (`#1A1A1A`). Label: white. Leading phone icon. Pairs beside the primary CTA at equal width for a balanced dual-lockup in the hero.
* **Ghost / Text Link ("View full fleet")** — Gold text (`#C9A84C`), inline within paragraph flow, no underline at rest. Reveals on hover.
* **Icon Button (mobile menu)** — Square, 8px padding, no background, inherits ink color.

### Cards

* **Feature Card (`.feature-card`)** — White surface on Bone Warm section background. Subtly rounded corners (`border-radius: 16px` — the "rounded-2xl" token). 1px Warm Border stroke. 32px internal padding. Whisper-soft two-layer shadow: `0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)` — present enough to separate from the cream wash, quiet enough to feel like paper on wood. Hover lifts the card `-translate-y-1` (4px) and deepens the shadow over 300ms.
* **Icon Well (inside feature card)** — Small squircle, ~8px radius, filled with Gold Wash. Contains a 2px-stroke line icon rendered in Antique Gold. Sits at the top of the card.
* **Fleet / Vehicle Card (`.fleet-card`)** — Same card language (white, 16px radius, warm border, card shadow). Top half is a full-bleed studio photograph of a Mercedes-Benz model; `overflow: hidden` crops the image into the rounded corner. Image zooms `scale-105` on group hover.

### Inputs / Forms
Booking flow lives on dedicated routes rather than the homepage, so no fields are exposed on the landing page. When they appear, they follow the same vocabulary: white fill, Warm Border stroke, subtly rounded corners.

### Navigation
Fixed to the top of the viewport, 113px tall when expanded over the hero. **Transparent** on the cinematic hero (letting the dark photograph show through), transitioning to a solid light surface on scroll (`transition-all duration-500`). Logo lockup ("RT24" mark + "RHODES TRANSFER 24" wordmark) left-aligned; horizontal link set centered (Home · About · Our Fleet · FAQs · Contact); Gold pill "Book Now" CTA right-aligned. Active link indicated by Antique Gold color plus an underline.

### Footer
Midnight Footer (`#0F0F0F`) full-bleed band. Logo, multi-column link lists, contact, and fine print. Text in white/white-alpha for hierarchy. A measured, editorial end — no dramatic send-off graphic.

### Floating Action
WhatsApp green circular FAB, fixed bottom-right, visible across all scroll positions.

---

## 5. Layout Principles

* **Content width.** Sections are full-bleed; content is capped at `max-w-7xl` = **1280px** and centered. Narrower copy blocks use `max-w-3xl` (768px) for centered headlines and `max-w-xl` (576px) for hero body paragraphs — a classic narrow-measure reading rhythm.
* **Horizontal gutter.** Responsive: 16px → 24px → 32px (`px-4 sm:px-6 lg:px-8`).
* **Vertical rhythm.** Standard marketing sections use **96px top/bottom padding** (`py-24`); the closing CTA band tightens to 80px. This consistent cadence creates the "breathing" quality.
* **Alternation.** Sections alternate White ↔ Bone Warm (`#F8F5F0`) so the eye gets a subtle warm/cool pulse without ever leaving the neutral range.
* **Grids.** Feature blocks sit on a 4-column grid at desktop (2-column tablet, 1-column mobile). Fleet cards match. Gaps are generous — typically 24–32px.
* **Hero geometry.** Full viewport height (`h-screen`) with overlay gradient over the photograph; content centered vertically and horizontally, including the dual-CTA lockup and the "24/7 · 100% Fixed Prices" stat strip separated by a hairline white-40% divider.

---

## 6. Depth & Elevation

Elevation is treated as a **whisper, not a stack.** Two tiers only:
1. **Card rest** — the two-layer soft shadow described above. Feels like matte paper laid on cream stock.
2. **Card hover** — a deeper variant (`shadow-card-hover`) paired with a 4px lift.

Additionally, the gold **focus halo** (7.5px 23% opacity ring) is the only "glow" in the system and exists purely to mark active/interactive state on gold CTAs. No gradients, no inner shadows, no neumorphism.

---

## 7. Imagery & Motion

* **Photography.** Cinematic, natural-light Mercedes-Benz interior and studio shots. No heavy filters, no color grading beyond what's in-camera. The hero uses a moody, low-key cabin shot that lets the headline breathe in negative space.
* **Iconography.** Line-weight (≈2px stroke), rounded caps, rendered in Antique Gold inside a Gold Wash squircle well. Consistent visual weight across the icon set.
* **Motion.**
  * Nav morph on scroll — 500ms all-property transition from transparent to solid.
  * Card hover lift — `-translate-y-1` over 300ms.
  * Image zoom on fleet cards — `scale-105` on group hover.
  * CTA halo fade on focus.
  * No parallax, no auto-playing reveals beyond a "SCROLL" indicator under the hero.

---

## 8. Tokens Summary (for re-synthesis)

```txt
--color-ink:          #0A0A0A
--color-gold:         #C9A84C
--color-gold-wash:    rgba(201,168,76,0.08)
--color-gold-halo:    rgba(201,168,76,0.235)
--color-warm:         #F8F5F0
--color-warm-border:  #E5E0D6
--color-white:        #FFFFFF
--color-charcoal:     #1A1A1A
--color-footer:       #0F0F0F

--font-display:       "Playfair Display", Georgia, serif
--font-body:          Inter, system-ui, sans-serif

--radius-sm:          8px
--radius-md:          12px
--radius-lg:          16px    /* cards */
--radius-pill:        9999px  /* CTAs */

--shadow-card:        0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.06)
--shadow-card-hover:  deeper variant of the above

--container-max:      1280px
--section-y:          96px
--section-y-cta:      80px
```

---

## 9. Usage Principles (when generating new screens)

1. **Gold is a condiment.** One gold element per viewport — typically the primary CTA or an active state. Never flood with gold; never add a second accent color.
2. **Serif ↔ sans discipline.** Headlines and stat numerals use Playfair. Everything else uses Inter. Never break this pairing.
3. **Alternate White and Bone Warm.** New marketing sections should slot into the W / B / W / B rhythm. Avoid introducing a third background.
4. **Whisper shadows only.** Never use drop-shadows above the two-layer card token.
5. **Pill for action, 16px for surface.** CTAs are pills; surfaces (cards, image crops) are 16px rounded. Don't mix.
6. **Breathe.** Default vertical rhythm is 96px. Don't collapse sections below 64px without a strong reason.
7. **Photography over illustration.** When imagery is introduced, lean on natural-light photography (vehicles, destinations) rather than illustrated assets, to hold the editorial tone.
