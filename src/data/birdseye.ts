import type { BirdEyeTab } from "@/types";

export interface BirdEyeCategory {
  id: string;
  label: string;
  tabs: BirdEyeTab[];
}

export const BIRDSEYE_CATEGORIES: BirdEyeCategory[] = [
  {
    id: "complex",
    label: "단지 전경",
    tabs: [
      {
        id: "aerial",
        label: "조감도",
        image: "/images/overview/birdseye-aerial.png",
        description: "전체 사업 조감 — 지하 6층~지상 59층, 18개동, 3,443세대 (CG)",
      },
      {
        id: "complex",
        label: "단지 조감도",
        image: "/images/overview/birdseye-complex.png",
        description: "단지 전경 조감도 (CG)",
      },
      {
        id: "perspective",
        label: "투시도",
        image: "/images/overview/birdseye-perspective.png",
        description: "수변 단지 투시도 — 호수공원 전경 (CG)",
      },
      {
        id: "siteplan",
        label: "단지배치도",
        image: "/images/overview/birdseye-siteplan.png",
        description: "동별 배치 및 세대 타입 구성 (1·2단지)",
      },
      {
        id: "community",
        label: "대규모 커뮤니티",
        image: "/images/overview/community-main.png",
        description:
          "단지 내 대규모 커뮤니티 — 피트니스·수영장·골프연습장·독서실·사우나 등",
      },
    ],
  },
  {
    id: "location",
    label: "입지·개발",
    tabs: [
      {
        id: "env",
        label: "입지환경",
        image: "/images/overview/location-env.png",
        description:
          "반경 3km 6만 3천 세대 — 달구벌대로 인근, 중산지구 지역 중심상가 입지",
      },
      {
        id: "around",
        label: "주변 개발계획",
        image: "/images/overview/devenv-main.png",
        description: "경산대임 공공주택지구(9,724세대) 및 대구 도시철도 4호선 추진",
      },
      {
        id: "demand",
        label: "초거대 배후수요",
        image: "/images/overview/demand.png",
        description:
          "반경 3km 6만 3천여 배후세대(3,443세대 단지 내 고정수요 포함) 보유한 랜드마크 입지",
      },
    ],
  },
  {
    id: "product",
    label: "상품 특징",
    tabs: [
      {
        id: "waterfront",
        label: "수변 문화복합몰",
        image: "/images/overview/waterfront-mall.png",
        description:
          "3만 3천평 중산호수공원을 품은 대구·경북 유일의 수변 문화복합몰 — 수변 라이프몰",
      },
      {
        id: "anchor",
        label: "다양한 앵커 테넌트",
        image: "/images/overview/anchor-tenant.png",
        description:
          "키즈 테마파크 · 멀티플렉스 · 대형 서점 · SSM · Life-Style 샵 · 멀티게임장 등",
      },
      {
        id: "italian",
        label: "이탈리안 테마 특화",
        image: "/images/overview/italian-theme.png",
        description:
          "로미오와 줄리엣의 배경 도시, 이탈리아 베로나(VERONA)를 모티브로 한 상환경",
      },
      {
        id: "festival",
        label: "문화 페스티벌·광장",
        image: "/images/overview/festival.png",
        description:
          "약 3,000평 중앙 광장 중심의 다양한 문화 축제 — 야시장·콘서트·버스킹 등",
      },
      {
        id: "festival-lake",
        label: "문화 페스티벌·호수",
        image: "/images/overview/festival-lake.png",
        description:
          "중산 호수공원 중심의 야간 집객력 — 음악분수·레이저쇼·LED 야경 등",
      },
    ],
  },
];
