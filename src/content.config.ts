import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

// Default generateId uses the filename basename, which collides across locale
// folders (e.g. en/wine-experience.md and el/wine-experience.md share id).
// Use the full entry path (without extension) so both locales coexist.
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.[^./]+$/, '');

export const collections = {
  tours: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/tours', generateId }),
    schema: tourSchema,
  }),
  blog: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/blog', generateId }),
    schema: blogSchema,
  }),
};
