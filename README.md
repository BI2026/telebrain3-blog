# telebrain3-blog

**에너지와 소재, 문명의 두 축** — atomic notes 자동 publish.

## 구조
- `src/content/posts/` — telebrain3 봇이 검수 통과한 atomic note markdown을 commit
- Astro가 자동 빌드 → Vercel 배포

## 라우팅
- `/` — 최신 글 목록
- `/posts/{slug}/` — 개별 글
- `/chapters/{ch1-fire ~ ch8-epilogue}/` — 챕터별 누적 (책 집필 자료)
- `/rss.xml` — RSS feed

## 발행 흐름
```
Obsidian Vault (BI.connect/20_Atomic-Notes/book/{atomic-id}.md)
  → telebrain3 봇 (검수 게이트: Codex CLI + Claude CLI)
    → src/content/posts/{atomic-id}.md commit + push
      → Vercel 자동 빌드·배포
```

## 로컬 개발
```bash
npm install
npm run dev   # http://localhost:4321
npm run build
```

## 마스터 사양
`BI.connect/CLAUDE.md` 참조.
