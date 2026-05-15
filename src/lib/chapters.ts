// 9-카테고리 spine — telebrain3 src/chapter_taxonomy.py 와 동기화 유지.
// 책: 「불, 강철, 배터리 — 에너지의 방향을 현실로 바꾼 소재의 12,000년, 그리고 한국이 만든 마지막 장」

export interface ChapterDef {
  id: string;
  label: string;            // index/chapter 페이지 표시
  short: string;            // 메타 칩 표시 (짧은 이름)
  energy: string;           // 다루는 에너지 전환
  material: string;         // 핵심 소재
  story: string;            // 이야기 방향 (스펙 §1.2 우측 열)
  korea: 'short' | 'medium' | 'equal' | 'lead';
}

export const CHAPTERS: ChapterDef[] = [
  // v2 메인 카테고리 (2026-05-16~ 산업 인사이트 운영)
  { id: 'industry-insight', label: '산업 인사이트',
    short: '산업 인사이트',      energy: '산업 전환 신호',           material: '소재 병목',
    story: '완제품 뒤에 숨어 있는 소재 병목을 읽는다. 산업 전환의 순간에는 늘 보이지 않던 소재가 권력을 결정한다.', korea: 'equal' },
  // v1 9-카테고리 (legacy — 책 작업 단계에서 재호출)
  { id: 'prologue',         label: 'Prologue. 불과 돌의 시대',
    short: '불과 돌',           energy: '자연 에너지 첫 제어',     material: '돌·흙·점토',
    story: '인간은 불을 얻었지만, 불을 오래 쓰려면 물질을 다룰 줄 알아야 했다.', korea: 'short' },
  { id: 'ch1-metal',        label: '1장. 청동·철의 시대',
    short: '청동·철',           energy: '열이 금속을 바꾸다',       material: '청동·철·철 농기구',
    story: '금속은 에너지의 결과물이자, 더 큰 에너지를 쓰게 만든 도구였다.', korea: 'short' },
  { id: 'ch2-coal',         label: '2장. 석탄의 시대',
    short: '석탄',              energy: '나무에서 석탄으로',         material: '강철·코크스',
    story: '석탄은 강철을 만들고, 강철은 석탄의 세계를 확장했다.', korea: 'medium' },
  { id: 'ch3-oil',          label: '3장. 석유의 시대',
    short: '석유',              energy: '액체 연료와 이동성',         material: '고무·플라스틱·합성섬유·알루미늄',
    story: '자동차 문명은 석유만이 아니라 소재 패키지의 산물이었다.', korea: 'medium' },
  { id: 'ch4-electricity',  label: '4장. 전기의 시대',
    short: '전기',              energy: '에너지가 선을 타고 이동',     material: '구리·절연재·텅스텐·실리콘',
    story: '전기는 소재를 만나 빛·통신·반도체 문명이 됐다.', korea: 'equal' },
  { id: 'ch5-transition',   label: '5장. 전환의 시대',
    short: '전환',              energy: '화석연료에서 저탄소로',       material: '배터리 소재·태양광 소재·분리막·촉매',
    story: '에너지 전환의 병목은 자원이 아니라 소재와 공급망이다.', korea: 'equal' },
  { id: 'ch6-physical-ai',  label: '6장. 피지컬 AI의 시대',
    short: '피지컬 AI',         energy: '전기 + 지능 + 움직임',         material: '반도체·센서·자석·경량 소재',
    story: '로봇과 AI도 결국 물리 세계로 나오려면 소재의 몸이 필요하다.', korea: 'equal' },
  { id: 'ch7-korea',        label: '7장. 한국 석유화학의 시대',
    short: '한국 석유화학',     energy: '추격 산업 → 소재 플랫폼',       material: '석유화학·합성수지·고기능 소재',
    story: '한국 산업화의 숨은 기반은 소재 산업이었다.', korea: 'lead' },
  { id: 'epilogue',         label: 'Epilogue. 다음 100년',
    short: '다음 100년',         energy: '에너지와 소재의 재결합',         material: '순환 소재·바이오 소재·탄소 소재',
    story: '다음 문명은 어떤 소재 위에서 작동할 것인가.', korea: 'lead' },
];

// 옛 ID (telebrain3 v0.2 7-시대 + v0.1 8-chapter) → 신 9-카테고리
const LEGACY_TO_NEW: Record<string, string> = {
  // v0.2 7-시대 (vault 폴더 prefix와 매칭)
  '01-fire': 'prologue',
  '02-agri': 'ch1-metal',
  '03-mech': 'ch1-metal',
  '04-coal': 'ch2-coal',
  '05-oil':  'ch3-oil',
  '06-info': 'ch4-electricity',
  '07-future': 'ch5-transition',
  // v0.1 8-chapter (옛 publisher_atomic 시기 chapter id)
  'ch1-fire': 'prologue',
  'ch2-coal-old': 'ch2-coal',
  'ch3-oil-old': 'ch3-oil',
  'ch4-electricity-old': 'ch4-electricity',
  'ch5-transition-old': 'ch5-transition',
  'ch6-physical-ai-old': 'ch6-physical-ai',
  'ch7-korea-petchem': 'ch7-korea',
  'ch8-epilogue': 'epilogue',
};

const BY_ID: Record<string, ChapterDef> = Object.fromEntries(CHAPTERS.map(c => [c.id, c]));

/** 옛/신 ID 모두 신 ChapterDef로 정규화. 매칭 실패 시 fallback ch5-transition. */
export function normalizeChapter(rawId: string | undefined | null): ChapterDef {
  const id = (rawId || '').trim();
  const newId = LEGACY_TO_NEW[id] || id;
  return BY_ID[newId] || BY_ID['ch5-transition'];
}

export function chapterLabel(rawId: string | undefined | null): string {
  return normalizeChapter(rawId).label;
}
