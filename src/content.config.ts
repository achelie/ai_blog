import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { calculateRating } from './utils/rating';

const status = z.enum(['draft', 'published']);
const category = z.enum([
  'ai-coding-tools',
  'ai-website-builders',
  'ai-seo-tools',
  'ai-automation-tools',
]);
const seo = z.object({
  title: z.string().max(70),
  description: z.string().min(50).max(170),
  canonical: z.string().optional(),
  noindex: z.boolean().default(false),
});
const baseArticle = {
  title: z.string().min(8),
  description: z.string().min(30).max(220),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  status,
  demonstration: z.boolean().default(false),
  category,
  author: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  featuredImage: z.string(),
  featuredImageAlt: z.string().optional(),
  relatedArticles: z
    .array(
      z
        .string()
        .regex(/^(reviews|comparisons|alternatives|best|guides)\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
    )
    .max(3)
    .refine((items) => new Set(items).size === items.length, {
      message: 'Related article references must be unique.',
    })
    .default([]),
  seo,
};

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    ...baseArticle,
    software: z.string(),
    lastTestedAt: z.coerce.date(),
    verdict: z.string().min(20),
    bestFor: z.array(z.string()).min(1),
    notFor: z.array(z.string()).min(1),
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()).min(1),
    pricing: z.object({
      summary: z.string(),
      checkedAt: z.coerce.date(),
    }),
    affiliate: z.object({ key: z.string().optional(), disclosure: z.boolean() }),
    testing: z.object({
      mode: z.enum(['hands-on', 'research-only', 'demonstration']),
      tasks: z.array(z.string()),
    }),
    rating: z
      .object({
        outputQuality: z.number().min(0).max(10),
        easeOfUse: z.number().min(0).max(10),
        features: z.number().min(0).max(10),
        valueForMoney: z.number().min(0).max(10),
        reliability: z.number().min(0).max(10),
        integrationsAndExport: z.number().min(0).max(10),
        documentationAndSupport: z.number().min(0).max(10),
      })
      .transform((scores) => ({ ...scores, overall: calculateRating(scores) })),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: z.object({
    ...baseArticle,
    products: z.array(z.string()).length(2),
  }),
});

const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/alternatives' }),
  schema: z.object({
    ...baseArticle,
    primarySoftware: z.string(),
    alternatives: z.array(
      z.object({
        software: z.string(),
        bestFor: z.string(),
        advantage: z.string(),
        drawback: z.string(),
        priceNote: z.string().optional(),
      }),
    ),
  }),
});

const best = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/best' }),
  schema: z.object({
    ...baseArticle,
    products: z.array(
      z.object({
        software: z.string(),
        bestFor: z.string(),
        why: z.string(),
        pros: z.array(z.string()),
        cons: z.array(z.string()),
      }),
    ),
    methodology: z.string(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object(baseArticle),
});

const software = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/software' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    website: z.url(),
    brandLogo: z
      .object({
        src: z.string(),
        alt: z.string().min(1),
        sourceUrl: z.url(),
      })
      .optional(),
    company: z.string(),
    category,
    platforms: z.array(z.string()),
    hasFreePlan: z.boolean(),
    startingPrice: z.number().nonnegative().nullable(),
    currency: z.string(),
    pricingCheckedAt: z.coerce.date(),
    affiliateKey: z.string().optional(),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    bio: z.string(),
    avatar: z.string(),
    role: z.string(),
    socialLinks: z.array(z.object({ label: z.string(), url: z.url() })),
  }),
});

export const collections = { reviews, comparisons, alternatives, best, guides, software, authors };
