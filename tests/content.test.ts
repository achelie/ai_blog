import { describe, expect, it } from 'vitest';
import { articleUrl, isPublished, selectRelatedArticles } from '../src/utils/content';
import { absoluteUrl } from '../src/utils/seo';

describe('content helpers', () => {
  it('filters drafts', () => {
    expect(isPublished({ data: { status: 'published' } })).toBe(true);
    expect(isPublished({ data: { status: 'draft' } })).toBe(false);
  });

  it('always returns trailing-slash article URLs', () => {
    expect(articleUrl('reviews', 'cursor-review')).toBe('/reviews/cursor-review/');
  });

  it('builds canonical URLs', () => {
    expect(absoluteUrl('/reviews/', 'https://example.com')).toBe('https://example.com/reviews/');
  });

  it('keeps pinned related articles first and fills by category before recency', () => {
    const candidates = [
      { key: 'comparisons/current', category: 'voice', publishedAt: new Date('2026-07-23') },
      { key: 'alternatives/pinned', category: 'other', publishedAt: new Date('2026-07-01') },
      { key: 'guides/same-new', category: 'voice', publishedAt: new Date('2026-07-22') },
      { key: 'reviews/same-old', category: 'voice', publishedAt: new Date('2026-07-10') },
      { key: 'best/other-new', category: 'other', publishedAt: new Date('2026-07-24') },
    ];

    expect(
      selectRelatedArticles(candidates, 'comparisons/current', 'voice', [
        'alternatives/pinned',
      ]).map((item) => item.key),
    ).toEqual(['alternatives/pinned', 'guides/same-new', 'reviews/same-old']);
  });

  it('rejects missing and self-referencing pinned articles', () => {
    const candidates = [
      { key: 'comparisons/current', category: 'voice', publishedAt: new Date('2026-07-23') },
    ];

    expect(() =>
      selectRelatedArticles(candidates, 'comparisons/current', 'voice', ['comparisons/current']),
    ).toThrow('cannot reference itself');
    expect(() =>
      selectRelatedArticles(candidates, 'comparisons/current', 'voice', ['guides/missing']),
    ).toThrow('does not exist or is not published');
  });
});
