import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: '에너지와 소재, 문명의 두 축',
    description: '인류 문명은 에너지원의 전환과 그에 따라온 소재 혁명의 함수다.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title || post.slug,
      pubDate: post.data.created,
      description: post.data['thesis-link'] || '',
      link: `/posts/${post.slug}/`,
      categories: [post.data.chapter, ...(post.data.tags || [])],
    })),
    customData: `<language>ko</language>`,
  });
}
