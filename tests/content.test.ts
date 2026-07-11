import { describe, expect, it } from 'vitest';
import { articleUrl, isPublished } from '../src/utils/content';
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
});
