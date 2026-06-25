import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const locales = ['de', 'fr', 'it'];

const tourSlugPage = (locale, depth) => `---
import BaseLayout from '${'../'.repeat(depth)}layouts/BaseLayout.astro';
import Header from '${'../'.repeat(depth)}components/Header.astro';
import Footer from '${'../'.repeat(depth)}components/Footer.astro';
import Hero from '${'../'.repeat(depth)}components/Hero.astro';
import KickerHeading from '${'../'.repeat(depth)}components/KickerHeading.astro';
import TourCard from '${'../'.repeat(depth)}components/TourCard.astro';
import FaqAccordion from '${'../'.repeat(depth)}components/FaqAccordion.astro';
import CtaBand from '${'../'.repeat(depth)}components/CtaBand.astro';
import { getCollection, render } from 'astro:content';
import { createT, localePath } from '${'../'.repeat(depth)}lib/i18n';

const locale = '${locale}' as const;
const t = createT(locale);
const lp = (p: string) => localePath(locale, p);

export async function getStaticPaths() {
  const tours = await getCollection('tours', (e) => e.data.locale === '${locale}' && e.data.slug !== 'wine-experience');
  return tours.map((tour) => ({ params: { slug: tour.data.slug }, props: { tour } }));
}
const { tour } = Astro.props;
const { Content } = await render(tour);
const others = (await getCollection('tours', (e) => e.data.locale === '${locale}' && e.data.slug !== tour.data.slug)).sort((a, b) => a.data.order - b.data.order);
const pagePath = \`/${locale}/tours/\${tour.data.slug}/\`;
---
<BaseLayout title={\`\${tour.data.title} — Santorini Imperial\`} locale={locale} pathname={pagePath} image={tour.data.hero_image}>
  <Header slot="header" locale={locale} pathname={pagePath} />

  <Hero
    image={tour.data.hero_image}
    kicker={\`\${tour.data.format.toUpperCase()} · \${tour.data.duration_hours} \${t('tours_page.hours')}\`}
    headline={tour.data.title}
    sub=""
    ctaPrimary={{ label: t('tours_page.reserve'), href: lp('/contact/') }}
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
        <KickerHeading kicker={t('tours_page.included_kicker')} heading="" align="left" level="h3" />
        <ul class="mt-4 space-y-2">
          {tour.data.included.map((i: string) => <li class="flex gap-2"><span class="text-gold">✓</span><span>{i}</span></li>)}
        </ul>
      </div>
      <div>
        <KickerHeading kicker={t('tours_page.itinerary_kicker')} heading="" align="left" level="h3" />
        <ul class="mt-4 space-y-2">
          {tour.data.itinerary.map((it: { time: string; event: string }) => <li class="flex gap-3"><span class="font-display text-gold w-14">{it.time}</span><span>{it.event}</span></li>)}
        </ul>
      </div>
    </div>
  </section>

  <section class="bg-white py-section">
    <div class="container-page max-w-3xl">
      <KickerHeading kicker={t('tours_page.faq_kicker')} heading={t('tours_page.faq_heading')} level="h2" />
      <div class="mt-8"><FaqAccordion items={tour.data.faq} /></div>
    </div>
  </section>

  <section class="bg-warm py-section">
    <div class="container-page">
      <KickerHeading kicker={t('tours_page.pair_kicker')} heading={t('tours_page.pair_heading')} />
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        {others.slice(0, 3).map(o => (
          <TourCard href={lp(\`/tours/\${o.data.slug}/\`)} image={o.data.hero_image} title={o.data.title} duration={\`\${o.data.duration_hours}h · \${o.data.format}\`} summary="" priceFrom={null} />
        ))}
      </div>
    </div>
  </section>

  <CtaBand headline={\`\${t('tours_page.book_headline_prefix')} \${tour.data.title}\`} cta={{ label: t('tours_page.book_cta'), href: lp('/contact/') }} />
  <Footer slot="footer" locale={locale} />
</BaseLayout>
`;

function transformElPage(content, locale) {
  return content
    .replaceAll("'el'", `'${locale}'`)
    .replaceAll('"el"', `"${locale}"`)
    .replaceAll('locale === \'el\'', `locale === '${locale}'`)
    .replaceAll('locale === "el"', `locale === "${locale}"`)
    .replaceAll('/el/', `/${locale}/`)
    .replaceAll('pathname="/el/', `pathname="/${locale}/`)
    .replaceAll('pathname={`/el/', `pathname={\`/${locale}/`)
    .replaceAll("import gr from '../../content/i18n/gr.json'", `import ${locale} from '../../content/i18n/${locale}.json'`)
    .replaceAll("import gr from '../content/i18n/gr.json'", `import ${locale} from '../content/i18n/${locale}.json'`)
    .replaceAll('{ en, gr }', `{ en, gr, de, fr, it }`)
    .replaceAll('createT(locale, { en, gr', `createT(locale`)
    .replaceAll('createT(\'el\', { en, gr', `createT('${locale}'`)
    .replaceAll('const services = gr.', `const services = ${locale}.`)
    .replaceAll('const pillars = gr.', `const pillars = ${locale}.`)
    .replaceAll('const serviceItems = gr.', `const serviceItems = ${locale}.`)
    .replaceAll('const whyItems = gr.', `const whyItems = ${locale}.`)
    .replaceAll('const vehicles = gr.', `const vehicles = ${locale}.`);
}

function copyElPages(locale) {
  const srcDir = path.join(root, 'src/pages/el');
  const destDir = path.join(root, 'src/pages', locale);
  fs.mkdirSync(destDir, { recursive: true });

  for (const rel of fs.readdirSync(srcDir, { recursive: true })) {
    if (typeof rel !== 'string' || !rel.endsWith('.astro')) continue;
    const src = path.join(srcDir, rel);
    const dest = path.join(destDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let content = fs.readFileSync(src, 'utf8');
    if (rel === 'tours/[slug].astro') {
      content = tourSlugPage(locale, 3);
    } else {
      content = transformElPage(content, locale);
    }
    fs.writeFileSync(dest, content);
  }
}

for (const locale of locales) {
  copyElPages(locale);
  console.log(`pages/${locale}/ generated`);
}
