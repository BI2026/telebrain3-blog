import { defineCollection, z } from 'astro:content';

// atomic note frontmatter schema (마스터 §5)
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    created: z.coerce.date(),
    chapter: z.string(),                  // ch1-fire ~ ch8-epilogue
    'thesis-link': z.string().optional(),
    status: z.enum(['seed', 'draft', 'publish', 'book']).default('publish'),
    tags: z.array(z.string()).default([]),
    source: z.string().default('manual'),
    'atomic-id': z.string(),
    title: z.string().optional(),         // # 제목 추출 fallback
    published_at: z.string().optional(),
    review_verdict: z.enum(['approve', 'soft_warn', 'hard_reject']).optional(),
  }),
});

export const collections = { posts };
