import { defineConfig } from 'astro/config';

// 사용자가 Vercel에서 도메인 연결 시 SITE_URL 환경변수로 override 가능
const SITE = process.env.SITE_URL || 'https://telebrain3-blog.vercel.app';

// sitemap integration은 Vercel 배포 후 실제 URL 확정되면 활성화 (sitemap 빌드 시 reduce 에러 회피)
export default defineConfig({
  site: SITE,
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  build: {
    format: 'directory',
  },
});
