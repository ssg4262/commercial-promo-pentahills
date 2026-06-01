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
    ],
  },
];
