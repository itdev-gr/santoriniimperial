export function prefersReducedMotion(): boolean {
  if (typeof matchMedia === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Central GSAP entry point. Loads core + ScrollTrigger on demand.
 * Components call this and receive { gsap, ScrollTrigger } with ScrollTrigger registered.
 */
export async function getGsap() {
  const { gsap } = await import('gsap');
  const { ScrollTrigger } = await import('gsap/ScrollTrigger');
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

/**
 * Lightweight word-splitter — GSAP's SplitText is a paid plugin, so we roll our own.
 * Wraps each whitespace-separated word in a <span style="display:inline-block">
 * so each word can be independently animated (e.g. y translate + opacity).
 * Returns the array of word spans (whitespace fragments are injected but not returned).
 */
export function splitWords(el: Element): HTMLSpanElement[] {
  const text = el.textContent ?? '';
  const parts = text.split(/(\s+)/);
  el.textContent = '';
  const spans: HTMLSpanElement[] = [];
  for (const p of parts) {
    const s = document.createElement('span');
    s.textContent = p;
    s.style.display = 'inline-block';
    s.style.willChange = 'transform, opacity';
    el.appendChild(s);
    if (p.trim().length > 0) spans.push(s);
  }
  return spans;
}

/**
 * Run `fn` once the window has loaded (and fonts have applied to avoid layout shift
 * breaking split text). No-op when reduced motion is requested.
 */
export function motionReady(fn: () => void | Promise<void>) {
  if (prefersReducedMotion()) return;
  if (typeof document === 'undefined') return;
  const run = () => { void fn(); };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
}
