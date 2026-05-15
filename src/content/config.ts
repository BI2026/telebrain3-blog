import { defineCollection, z } from 'astro:content';

// atomic note frontmatter schema (v0.3 9-카테고리 + 6블록 spec, 2026-05-15~)
// 책: 「불, 강철, 배터리 — 에너지의 방향을 현실로 바꾼 소재의 12,000년, 그리고 한국이 만든 마지막 장」
// publisher_atomic.publish_to_blog_repo_v02 가 이 schema 만족하는 frontmatter를 생성.
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // 필수 (옛 + 신 공통)
    created: z.coerce.date(),
    chapter: z.string(),                  // prologue / ch1-metal ~ ch7-korea / epilogue (또는 legacy id)
    'atomic-id': z.string(),
    title: z.string().optional(),

    // 옛 호환
    'thesis-link': z.string().optional(),
    status: z.enum(['seed', 'draft', 'publish', 'book']).default('publish'),
    tags: z.array(z.string()).default([]),
    source: z.string().default('manual'),
    published_at: z.string().optional(),
    review_verdict: z.enum(['approve', 'soft_warn', 'hard_reject']).optional(),

    // 신 spec 추가 (모두 옵셔널 — 옛 글 호환)
    energy: z.string().optional(),         // 다루는 에너지 전환 (예: "가스등 → 전등")
    material: z.string().optional(),       // 핵심 소재 1개
    main_claim: z.string().optional(),     // 글 단일 명제
    region_balance: z.enum(['world-heavy', 'balanced', 'korea-heavy']).optional(),
    figures: z.array(z.string()).default([]),  // 인물 색인
    firms: z.array(z.string()).default([]),    // 기업 색인
    threads: z.array(z.string()).default([]),  // 통제 어휘 모티프 (스펙 §7.3)
  }),
});

export const collections = { posts };
