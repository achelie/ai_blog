import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublished, sortByNewest } from '../utils/content';
import { site as siteData } from '../data/site';
export async function GET(context: { site?: URL }) {
  const collections = await Promise.all([
    getCollection('reviews', isPublished),
    getCollection('comparisons', isPublished),
    getCollection('alternatives', isPublished),
    getCollection('best', isPublished),
    getCollection('guides', isPublished),
  ]);
  const items = sortByNewest(collections.flat()).map((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    pubDate: entry.data.publishedAt,
    link: `/${entry.collection}/${entry.data.slug}/`,
    customData: `<category>${entry.data.category}</category>`,
  }));
  return rss({
    title: siteData.name,
    description: siteData.description,
    site: context.site ?? 'http://localhost:4321',
    items,
  });
}
