# Content guide

## Add software

Create `src/content/software/<slug>.json`. Keep the slug stable because articles reference it. Enter the official URL, company, category, platforms, free-plan status, starting price, currency, price-check date, and optional affiliate key once here—not in every article.

If a price is not verified, use `null` for `startingPrice`. Never imply the price is live. Update `pricingCheckedAt` only after checking the official pricing page.

## Write a review

Copy `src/content/reviews/cursor-review.mdx`. A review needs a software slug, author slug, testing mode, test tasks, dated pricing summary, best/not-for lists, pros/cons, seven dimension scores, verdict, and SEO object.

The overall rating is calculated automatically from:

- Output Quality: 25%
- Ease of Use: 20%
- Features: 15%
- Value for Money: 15%
- Reliability: 10%
- Integrations and Export: 10%
- Documentation and Support: 5%

Do not hand-calculate or store a separate total.

## Write a comparison

Copy the comparison example. Reference exactly two software slugs. Give both products the same task brief and record comparable evidence. The winner, quick verdict, and table must agree with the visible body. If evidence is incomplete, keep the article in draft.

## Alternatives, best lists, and guides

- Alternatives reference one primary product and structured candidate records.
- Best lists include the ranking method plus use case, reason, pros, and cons for every product.
- Guides use the shared article schema and should solve one clear job.

## Add screenshots

Store originals under `src/assets/screenshots/<software>/`. Resize and compress source files before committing. Prefer WebP or AVIF, provide width and height, write an alt attribute that describes visible evidence, and add a caption with the task and capture date. Do not hotlink vendor marketing images.

Suggested directories already expected by the project are:

```text
src/assets/screenshots/cursor/
src/assets/screenshots/windsurf/
src/assets/screenshots/lovable/
```

## Add an affiliate link

Add the complete destination only to `src/data/affiliate-links.ts`. Articles and software records store the key. Set `enabled: false` until the program and destination are verified. Sponsored links render with `nofollow sponsored noopener noreferrer` and open in a new tab.

## Status and publication

- `draft`: valid in the content store but excluded from routes, listings, RSS, sitemap, and Pagefind.
- `published`: eligible for production output.
- `demonstration: true`: adds a prominent warning. Use it only for template/sample content, even if the route must be built for QA.

Before publishing, replace all `Replace this section...` text, placeholder scores, fake conclusions, placeholder images, and unverified bios. Run `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build`.

When updating an article, change `updatedAt`. Change `lastTestedAt` only after repeating the test. Change pricing dates only after checking the official price page.
