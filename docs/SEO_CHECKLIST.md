# SEO checklist

## Every publishable page

- One descriptive title and one visible H1
- Meta description matches the page
- Canonical comes from the configured site origin
- Open Graph and Twitter image/title/description
- Logical heading order
- Internal links use trailing slashes
- Published and updated dates are visible for articles
- Images have factual alt text, dimensions, and local optimized sources

## Structured data

- Breadcrumb JSON-LD matches visible breadcrumbs
- Article JSON-LD appears only on article pages
- Review/rating JSON-LD appears only for visible, verified, non-demonstration ratings
- SoftwareApplication data matches the centralized software record
- Person data matches the visible author page
- Organization data uses the same publication name and origin everywhere
- Search/category pages do not emit Article schema

## Content integrity

- Research-only work never says “hands-on”
- Demonstration content is visibly labeled
- Prices show a last-checked date and are never described as real-time
- Affiliate links are disclosed and use the required relation attributes
- Draft routes do not exist in `dist`, RSS, sitemap, or Pagefind

## Build output

- `dist/sitemap-index.xml` exists
- `dist/rss.xml` exists
- `dist/robots.txt` points to the production sitemap
- `dist/pagefind/` exists
- Search and 404 are `noindex`
- No broken internal links or production-domain references in local development output
