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

    // v0.3 spec 추가 (모두 옵셔널 — 옛 글 호환)
    energy: z.string().optional(),         // 다루는 에너지 전환 (v1, 예: "가스등 → 전등")
    material: z.string().optional(),       // 핵심 소재 1개 (v1)
    main_claim: z.string().optional(),     // 글 단일 명제
    region_balance: z.enum(['world-heavy', 'balanced', 'korea-heavy']).optional(),
    figures: z.array(z.string()).default([]),  // 인물 색인
    firms: z.array(z.string()).default([]),    // 기업 색인
    threads: z.array(z.string()).default([]),  // 통제 어휘 모티프 (v1 스펙 §7.3, v2에서는 분석가 머릿속)

    // v2 spec 추가 (2026-05-16~ 산업 인사이트 운영)
    subtitle: z.string().optional(),                      // 부제 한 줄
    category: z.string().optional(),                      // 'industry-insight' (v2 메인) 또는 v1 chapter
    materials: z.array(z.string()).default([]),           // 소재 리스트 (v2 — 단일 material 대체)
    materials_context: z.string().optional(),             // 소재의 사용 맥락
    industries: z.array(z.string()).default([]),          // 관련 산업 (예: AI 반도체, 패키징)
    visuals: z.array(z.string()).default([]),             // 사용한 시각자료 슬롯 [header|comparison-table|schematic|signature-infographic]
    fact_check_status: z.union([
      z.string(),               // v1 호환 ('refined'/'partial'/'unchecked')
      z.array(z.string()),      // v2 — 항목별 처리 내역 리스트
    ]).optional(),
    chapter_legacy_v1: z.string().nullable().optional(),  // v1 9-chapter 매핑 참고용

    // v2 시리즈 운영 (2026-05-17~ ABF 2편 도입)
    series: z.string().optional(),                        // 시리즈명 (예: "AI를 떠받치는 보이지 않는 소재들")
    series_part: z.number().int().optional(),             // 시리즈 내 순번 (1, 2, 3, ...)
    series_prev_slug: z.string().optional(),              // 이전 편 slug (블로그 내 자동 링크 생성용)

    // v2 패턴 분류 (2026-05-18~ 하모닉 드라이브 3편 도입)
    post_pattern: z.string().optional(),                  // Type A (직접 소재) | Type B (부품+소재) | Type C (시스템)
  }),
});

export const collections = { posts };
