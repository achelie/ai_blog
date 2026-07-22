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

export interface RelatedArticleCandidate {
  key: string;
  category: string;
  publishedAt: Date;
}

export function selectRelatedArticles<T extends RelatedArticleCandidate>(
  candidates: T[],
  currentKey: string,
  currentCategory: string,
  pinnedKeys: string[] = [],
  limit = 3,
) {
  const byKey = new Map(candidates.map((candidate) => [candidate.key, candidate]));
  const selected: T[] = [];
  const selectedKeys = new Set<string>();

  const addCandidate = (candidate: T) => {
    if (candidate.key === currentKey || selectedKeys.has(candidate.key) || selected.length >= limit)
      return;
    selected.push(candidate);
    selectedKeys.add(candidate.key);
  };

  for (const key of pinnedKeys) {
    if (key === currentKey) throw new Error(`Related article ${key} cannot reference itself.`);
    const pinned = byKey.get(key);
    if (!pinned) throw new Error(`Related article ${key} does not exist or is not published.`);
    addCandidate(pinned);
  }

  const newestFirst = (a: T, b: T) => b.publishedAt.getTime() - a.publishedAt.getTime();
  candidates
    .filter((candidate) => candidate.key !== currentKey && candidate.category === currentCategory)
    .sort(newestFirst)
    .forEach(addCandidate);
  candidates
    .filter((candidate) => candidate.key !== currentKey && candidate.category !== currentCategory)
    .sort(newestFirst)
    .forEach(addCandidate);

  return selected;
}
