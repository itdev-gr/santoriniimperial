# Image attributions & content gaps

## Source

All imagery in this directory was downloaded from https://santoriniimperial.com/ on 2026-04-24 for the purpose of this redesign concept. Copyright remains with the original rights-holder(s) (Santorini Imperial Travel & Tours). Legal review and written authorisation are required before any production deployment.

No third-party stock was used. No imagery was fabricated. Every file here has an origin URL traceable to Santorini Imperial's WordPress media library.

## Scrape scope

Crawled (2026-04-24):

- `https://santoriniimperial.com/` (homepage, HTTP 200, ~14 unique content images referenced)
- `https://santoriniimperial.com/?page_id=20` (HTTP 200)
- `https://santoriniimperial.com/?page_id=21` (HTTP 200)
- `https://santoriniimperial.com/?page_id=22` (HTTP 200)
- `https://santoriniimperial.com/?page_id=53` (HTTP 200)
- `https://santoriniimperial.com/?page_id=182` (HTTP 200)
- `https://santoriniimperial.com/?page_id=183` (HTTP 200)

The spec-provided paths `/tours-experiences-in-santorini/`, `/transfer-in-santorini/`, `/gallery/`, `/about/` all returned **HTTP 404** — the live site uses `?page_id=N` permalinks instead of pretty slugs. The `page_id` variants covered the same surface area. The WordPress REST API (`/wp-json/wp/v2/media`) is locked and returns 404, so a comprehensive library dump was not possible — only images referenced in page markup were discoverable.

Non-content imagery (Google Translate flag sprites, wpforms-lite spinner SVG, WeChat/Viber/WhatsApp chat icons) was filtered out.

## Attribution log

All source URLs below are hosted at `https://santoriniimperial.com/wp-content/uploads/`. The full-resolution variant (`-scaled.jpg`, 2560px longest edge for `2023/02/imageNNNNN-scaled.jpg`) was preferred over downsampled WordPress crops. Greek-named files under `2023/04/` were fetched at full resolution after probing (only 150x150 thumbnails were referenced in page markup).

| File | Source URL | Role / subject |
|------|-----------|----------------|
| `fleet/e-class.jpg` | `2023/02/image00012-scaled.jpg` | Mercedes-Benz E-Class close-up at sunset with caldera (portrait, 1707×2560). Best standalone E-Class shot in the source library. |
| `fleet/v-class.jpg` | `2023/02/image00005-scaled.jpg` | Mercedes-Benz V-Class / Vito front-three-quarter view on cobblestone (portrait, 1707×2560). Clearest V-Class glamour shot available. |
| `logo/si-logo.png` | `2023/02/cropped-santorini-imperial-logo-png.png` | Brand mark (250×250). Gold lotus mark + "Santorini Imperial – Travel & Tours" wordmark. |
| `hero/hero-home.jpg` | `2023/02/image00015-scaled.jpg` | Dark cinematic E-Class interior with ambient lighting (landscape, 2560×1707). Dusk-lit dash, purple accent glow — strongest dark-mode hero candidate. |
| `hero/hero-tours.jpg` | `2023/04/Αρχείο-εικόνας-WhatsApp-2023-04-13-στις-20.15.42.jpg` | Skaros Rock / Imerovigli caldera sunset panorama (1200×630). Iconic Santorini tourism landmark. |
| `hero/hero-transfers.jpg` | `2023/02/image00011-scaled.jpg` | Mercedes V-Class + E-Class at golden-hour sunset with caldera (landscape, 2560×1707). The "money shot" of SI's fleet on duty. |
| `hero/hero-fleet.jpg` | `2023/02/image00003-scaled.jpg` | E-Class headlight detail with V-Class behind, overcast mood (landscape, 2560×1707). Moody, fleet-focused. |
| `hero/hero-gallery.jpg` | `2023/02/image00009-scaled.jpg` | Both vehicles at cliff-edge viewpoint, full caldera panorama (landscape, 2560×1707). Wide editorial framing. |
| `hero/hero-about.jpg` | `2023/02/image00016-scaled.jpg` | E-Class rear-three-quarter on cliff road, overcast sea in background (landscape, 2560×1707). Moody, understated. |
| `hero/hero-contact.jpg` | `2023/02/image00004-scaled.jpg` | Both vehicles in full view with caldera backdrop (landscape, 2560×1707). Clean, symmetrical composition. |
| `tours/wine.jpg` | `2023/04/Αρχείο-εικόνας-WhatsApp-2023-04-20-στις-00.23.10.jpg` | Wine-tasting vignette — three filled glasses, Santorini varietal bottles ("First Bottling"), traditional wooden wine press, caldera visible through doorway (1200×675). |
| `tours/sightseeing.jpg` | `2023/04/Αρχείο-εικόνας-WhatsApp-2023-04-13-στις-20.15.24.jpg` | Akrotiri Lighthouse at sunset — southern Santorini tourism landmark (700×466). Low resolution (only 700px); may appear soft at large sizes. |
| `tours/photo-tour.jpg` | `2023/04/Αρχείο-εικόνας-WhatsApp-2023-04-30-στις-13.13.03.jpg` | Wedding couple embracing at caldera viewpoint at sunset (1600×1066). Stands in for photoshoot/elopement tours. |
| `gallery/01.jpg` | `2023/02/image00001-scaled.jpg` | E-Class + V-Class on cobblestone driveway, overcast dusk (portrait, 1707×2560). |
| `gallery/02.jpg` | `2023/02/image00002-scaled.jpg` | V-Class front view in focus, E-Class headlight foreground (portrait, 1707×2560). |
| `gallery/03.jpg` | `2023/02/image00007-scaled.jpg` | E-Class front view centred, V-Class + white Cycladic villa behind (landscape, 2560×1707). |
| `gallery/04.jpg` | `2023/02/image00008-scaled.jpg` | Wide shot, both vehicles on cobblestone overlooking coast (landscape, 2560×1707). |
| `gallery/05.jpg` | `2023/02/image00010-scaled.jpg` | Both vehicles at cliff-edge, golden-hour caldera panorama variant (landscape, 2560×1707). |
| `gallery/06.jpg` | `2023/02/image00013-scaled.jpg` | Both vehicles at dusk, warm sunset glow behind (landscape, 2560×1707). |
| `gallery/07.jpg` | `2023/02/image00014-scaled.jpg` | E-Class interior through open door, dusk, ambient-lit dash (portrait, 1707×2560). |
| `gallery/08.jpg` | `2023/04/Αρχείο-εικόνας-WhatsApp-2023-04-30-στις-13.06.22.jpg` | Chauffeur in suit opening rear door of black sedan (1024×698). Classic editorial transfer shot. |

### Source images not used (redundant)

| Source URL | Why skipped |
|------------|-------------|
| `2023/02/cropped-image00011-scaled-1.jpg` (2000×1199) | Identical scene to `image00011-scaled.jpg` but cropped — lower resolution and aspect. Kept the uncropped original at `hero/hero-transfers.jpg`. |
| All `-1024x*`, `-768x*`, `-300x*`, `-150x150` WordPress-generated variants | Superseded by the full `-scaled.jpg` version for each image. |
| `WeChat_logo_icon*.png` (all sizes) | Chat widget icon — not usable content imagery. |
| `viber-19485-100x100-1.png`, `whatsapp-logo-png-2263-100x100-1.png` | Third-party brand marks (Viber, WhatsApp) — not SI-owned. |
| Translator flag sprites (`/plugins/advanced-google-translate/flags/24/*.png`) | Plugin chrome, 103 entries filtered out. |
| `wpforms-lite/assets/images/submit-spin.svg` | UI chrome. |

## Content gaps (client to supply)

Slots the redesign expects but that could NOT be filled from SI's available public assets. Listed with the visual requirement and suggested action.

### Fleet (critical)

- [ ] **`fleet/sprinter-12.jpg`** — Mercedes-Benz Sprinter 12-seat minivan/minibus studio or location shot. **SI's public site does not show any Sprinter imagery** — only E-Class and V-Class/Vito photos exist. If SI does not operate Sprinters, the fleet card should be removed from the site. Otherwise, client must supply a photo.
- [ ] **`fleet/sprinter-20.jpg`** — Mercedes-Benz Sprinter 19/20-seat minibus shot. Same gap as above. Placeholder recommendation: hide the card or show the van icon over a neutral background until a photo arrives.

### Tours

- [ ] **`tours/full-day.jpg`** — "Combined/full-day tour" composite image. No single asset on SI's site represents a combined-itinerary day. Workarounds: (a) reuse `gallery/05.jpg` (caldera panorama) as a stand-in, (b) commission a collage, or (c) use `hero/hero-gallery.jpg` (cars + full caldera) which implies a guided day.
- [ ] **Oia blue-dome village shot** — iconic "Santorini postcard" shot is absent from SI's library. Any future "Villages / Oia" tour card would need either a new photo or a licensed stock image.

### Hero / lifestyle

- [ ] **`hero/hero-home.jpg` — dark-mode concern** — `image00015` (E-Class interior) is cinematic and dark, but it's an **interior** shot. If the home hero copy requires a "caldera + car" establishing frame, the interior may feel too intimate. Backup option: swap with `hero/hero-transfers.jpg` (exterior sunset) and promote the interior shot to a later scroll section.
- [ ] **`tours/sightseeing.jpg` resolution** — only a 700×466 source exists for the Akrotiri Lighthouse. Will look soft on retina displays at card width >500px. Either (a) accept the softness, (b) substitute `gallery/05.jpg` caldera panorama, or (c) ask the client for a hi-res replacement.
- [ ] **People / driver portraits** — no photography of SI's actual chauffeurs, guides, or team. The chauffeur door-open shot at `gallery/08.jpg` is a generic suit-and-sedan image (likely stock originally imported to SI's site). An About page that features "meet the team" will need real portraits.
- [ ] **Interior detail shots beyond E-Class** — no V-Class interior, no Sprinter interior. Fleet detail pages (seats, amenities, wifi icon, etc.) have no source imagery.
- [ ] **Vehicles with passengers / in motion** — all existing shots are static, vehicle-only. No lifestyle frames of guests boarding, arriving at hotels, or interacting with chauffeurs.
- [ ] **Airport / port pickup shots** — no imagery of JTR airport signage, Athinios port arrival, or port-to-hotel handoff for the transfers page.
- [ ] **Nighttime / ambient-lit exterior** — would strengthen the dark-mode identity. All exterior shots are daytime or golden-hour, not true night.

### Branding

- [ ] **Vector logo (`si-logo.svg`)** — only the raster 250×250 PNG is available. The site header and favicons would benefit from a crisp SVG. Ask the client for the original vector artwork. Using the PNG at small sizes is acceptable short-term.
- [ ] **Logo on dark background** — the current mark is gold on transparent. A light/white variant for dark-mode contexts would be useful.

## Production readiness

The borrowed assets in this directory are **flagged for legal clearance before production**. This redesign is an unsolicited concept; final decision on use, replacement, or licensing rests with the client / brand owner.

If this concept is advanced, next steps are:

1. Obtain written authorisation from Santorini Imperial to reuse the imagery, or swap each file for a client-supplied replacement.
2. Fill the gaps above (especially Sprinter fleet shots and the full-day tour).
3. Request an SVG version of the logo.
4. Replace `tours/sightseeing.jpg` with a higher-resolution source before launch.
