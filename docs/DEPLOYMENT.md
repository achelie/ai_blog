# Cloudflare Pages deployment

## Build settings

| Setting           | Value                              |
| ----------------- | ---------------------------------- |
| Production branch | `main`                             |
| Build command     | `pnpm build`                       |
| Output directory  | `dist`                             |
| Node.js           | `22`                               |
| Package manager   | pnpm 11 (pinned in `package.json`) |
| SSR / adapter     | None                               |

Set `SITE_URL` to `https://www.evidique.com`. The build is entirely static; do not create a Cloudflare Worker or database.

## Before the first production deploy

1. Confirm demonstration articles remain clearly labeled until verified screenshots, pricing, and findings replace them.
2. Run `pnpm install`, `pnpm check`, `pnpm lint`, `pnpm test`, and `pnpm build`.
3. Preview `dist` with `pnpm preview` and test navigation, search, mobile menu, tables, structured data, RSS, and the 404 page.
4. Confirm `dist/pagefind`, `dist/sitemap-index.xml`, `dist/rss.xml`, and `dist/robots.txt` exist.

## Headers and redirects

Cloudflare reads `public/_headers` and `public/_redirects` from the built output. Hashed Astro assets receive a one-year immutable cache. HTML revalidates on every request. Add redirects as one route pair per line; keep permanent migrations at status 301.

## Custom domain

In Cloudflare Pages, open **Custom domains**, add the production domain, and complete the shown DNS changes. If DNS already uses Cloudflare, the record is usually created automatically. Confirm HTTPS is active, set `SITE_URL` to that exact origin, and trigger a fresh production build.

## Post-deploy checks

- Canonical and Open Graph URLs use the custom domain
- robots.txt points to the production sitemap
- Sitemap URLs return 200 and use trailing slashes
- Search returns article titles, excerpts, types, and categories
- Draft fixture text does not appear anywhere public
- `_headers` cache and security headers are present in real responses
