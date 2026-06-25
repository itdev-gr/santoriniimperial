import { getGsap, splitWords, prefersReducedMotion } from './motion';

export async function initAllAnimations() {
  if (prefersReducedMotion()) return;
  const { gsap, ScrollTrigger } = await getGsap();

  // Hero H1 word-by-word reveal
  const h1 = document.querySelector<HTMLElement>('.hero-h1');
  if (h1) {
    const lines = h1.querySelectorAll<HTMLElement>('.hero-h1-line');
    if (lines.length > 0) {
      lines.forEach((line, i) => {
        const spans = splitWords(line);
        gsap.set(spans, { y: 24, opacity: 0 });
        gsap.to(spans, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06, delay: i * 0.12 });
      });
    } else {
      const spans = splitWords(h1);
      gsap.set(spans, { y: 24, opacity: 0 });
      gsap.to(spans, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.06 });
    }
  }
  const heroBadge = document.querySelector<HTMLElement>('.hero-badge');
  const heroSub = document.querySelector<HTMLElement>('.hero-sub');
  const heroCtas = document.querySelector<HTMLElement>('.hero-ctas');
  const heroStats = document.querySelector<HTMLElement>('.hero-stats');
  if (heroBadge) gsap.fromTo(heroBadge, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  if (heroSub) gsap.fromTo(heroSub, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.35 });
  if (heroCtas) gsap.fromTo(heroCtas, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.55 });
  if (heroStats) gsap.fromTo(heroStats, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.75 });

  // Hero parallax
  const heroBg = document.querySelector<HTMLElement>('.hero-bg');
  if (heroBg) {
    const heroSection = heroBg.closest('section');
    if (heroSection) {
      gsap.to(heroBg, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  // Section entrance: kicker → H2 → body/cards stagger
  document.querySelectorAll<HTMLElement>('section').forEach((sec) => {
    // Skip the hero section (already handled above)
    if (sec.querySelector('.hero-h1')) return;
    const kicker = sec.querySelector<HTMLElement>('.kicker');
    const h = sec.querySelector<HTMLElement>('h2, h3');
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
