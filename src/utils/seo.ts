import { site } from '../data/site';

export function absoluteUrl(pathname: string, base = site.url) {
  return new URL(pathname, base).toString();
}

export function pageTitle(title?: string) {
  if (!title) return site.defaultTitle;
  return title.includes(site.name) ? title : `${title} | ${site.name}`;
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
