# evidique

An English, static-first AI software review publication built with Astro. The MVP includes reviews, comparisons, alternatives, best-tool lists, guides, categories, authors, Pagefind search, RSS, sitemap, structured data, and Cloudflare Pages configuration.

The included product articles are **demonstration content**. They prove the templates and schemas; they are not product recommendations and do not claim completed hands-on tests.

## Requirements

- Node.js 22+
- pnpm 11+

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321`. Static search is generated only by the production build, so search displays a build note during ordinary development.

## Quality commands

```bash
pnpm check
pnpm lint
pnpm test
pnpm build
pnpm preview
```

`pnpm build` creates static HTML in `dist/`, then Pagefind writes the browser search index to `dist/pagefind/`.

## Project map

```text
src/
├── components/       Reusable common, article, review, comparison, and SEO UI
├── content/          Markdown/MDX articles plus software and author JSON
├── data/             Navigation, categories, site settings, affiliate links
├── layouts/          Base, article, collection, and static-page layouts
├── pages/            Static routes and collection-driven dynamic routes
├── styles/           Tailwind entry, design tokens, global editorial styles
├── utils/            Content, URL, SEO, and weighted-rating helpers
└── content.config.ts Strict Zod schemas for every content collection
```

## Environment

Copy `.env.example` to `.env` and set the canonical production origin:

```env
SITE_URL=https://evidique.com
```

Astro uses this value for canonical links, sitemap URLs, RSS, robots.txt, and JSON-LD. Do not include a path or trailing route.

## Cloudflare Pages

Create a Pages project connected to the repository with:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node.js: `22`
- Environment variable: `SITE_URL=https://evidique.com`

No SSR adapter or Worker is used. `public/_headers` defines immutable caching for hashed Astro assets and revalidation for HTML. `public/_redirects` contains static redirects.

After the first deploy, open the Pages project, choose **Custom domains**, add the production domain, and follow Cloudflare's DNS ownership prompts. Rebuild after setting `SITE_URL` so every absolute URL uses the final domain.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the release checklist.

## Add a review

1. Add or verify the product JSON in `src/content/software/`.
2. Add any commercial destination to `src/data/affiliate-links.ts`; store only its key in content.
3. Copy the review example in `src/content/reviews/` and replace every demonstration field.
4. Add original local screenshots under `src/assets/screenshots/<software>/` and write factual alt text and captions.
5. Keep `status: draft` until evidence, pricing, disclosure, author, SEO, and legal checks pass.
6. Run every quality command above, then set `status: published`.

The full workflow and field notes are in [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md).

## Current limitations

- Newsletter UI is a static placeholder with no submission endpoint.
- Contact is email-only and has no form backend.
- Demonstration articles still need verified tests, prices, original screenshots, and real conclusions.
- Affiliate destinations are disabled by default.
