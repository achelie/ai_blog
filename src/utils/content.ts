import type { CollectionEntry, CollectionKey } from 'astro:content';

export function isPublished<T extends { data: { status: string } }>(entry: T) {
  return entry.data.status === 'published';
}

export function sortByNewest<T extends { data: { publishedAt: Date } }>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export type ArticleCollection = 'reviews' | 'comparisons' | 'alternatives' | 'best' | 'guides';

export function articleUrl(collection: ArticleCollection, slug: string) {
  return `/${collection}/${slug}/`;
}

export function entryUrl<K extends CollectionKey>(entry: CollectionEntry<K>) {
  return `/${entry.collection}/${entry.data.slug}/`;
}
