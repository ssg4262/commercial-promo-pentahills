export interface CommercialTab {
  id: string;
  label: string;
  image: string;
  description: string;
}

export interface CommercialCategory {
  id: string;
  label: string;
  tabs: CommercialTab[];
}

export const COMMERCIAL_CATEGORIES: CommercialCategory[] = [
  {
    id: "overview",
    label: "개요·계획",
    tabs: [
      {
        id: "overview",
        label: "상업·문화시설 개요",
        image: "/images/commercial/overview-banner.png",
        description: "중앙광장 조감 — B2~1F, 연면적 28,215평 규모 (CG)",
      },
      {
        id: "zoning",
        label: "MD Zoning 계획",
        image: "/images/commercial/zoning-plan.png",
        description:
          "Lake Village · Juliet & Romeo Street / Fiesta Arena · Boulevard 4개 테마 존 배치",
      },
    ],
  },
  {
    id: "md",
    label: "MD 계획",
    tabs: [
      {
        id: "md-boulevard",
        label: "대로변 상가",
        image: "/images/commercial/md-boulevard.png",
        description:
          "Boulevard — 1F 카테고리 킬러 및 필수 근린생활시설 / 2F 생활 밀착형 서비스 업종",
      },
      {
        id: "md-lake-village",
        label: "호수변 상가",
        image: "/images/commercial/md-lake-village.png",
        description:
          "Lake Village — 호수의 감성과 어울리는 F&B 위주의 Café Street 특화 MD",
      },
      {
        id: "md-malling-1f",
        label: "내부 가로 1F",
        image: "/images/commercial/md-malling-1f.png",
        description:
          "Juliet & Romeo Street / Fiesta Arena — 1F Malling Zone (카페&캐주얼 F&B, SOHO&팬시, Kids Retail, Food & Culture, 아웃도어 & 영 패션)",
      },
      {
        id: "md-malling-2f",
        label: "내부 가로 2F",
        image: "/images/commercial/md-malling-2f.png",
        description:
          "Juliet & Romeo Street / Fiesta Arena — 2F Malling Zone (레트로 특화거리, 라이프 스타일 & 건강용품, 푸드 스트리트, 뷰티)",
      },
    ],
  },
  {
    id: "design",
    label: "상환경·디자인",
    tabs: [
      {
        id: "design-verona",
        label: "베로나 컨셉",
        image: "/images/commercial/design-verona.png",
        description:
          "이탈리아 베로나(VERONA) 모티브 디자인 컨셉 — Lake Village · Fiesta Arena · Romeo/Juliet Street · Boulevard 4개 테마 존",
      },
      {
        id: "fiesta-arena",
        label: "광장 Fiesta Arena",
        image: "/images/commercial/fiesta-arena.png",
        description:
          "놀이·공연·문화가 있는 축제의 광장 Fiesta Arena — Beige·Brown·Stone 톤의 이벤트 공간 (CG)",
      },
      {
        id: "design-overview",
        label: "상환경 디자인 종합",
        image: "/images/commercial/design-overview.png",
        description:
          "존별 상환경 디자인 — Lake Village(호수변) · Fiesta Arena(광장) · Juliet/Romeo Street(내부가로) · Boulevard(대로변)",
      },
    ],
  },
  {
    id: "floorplan",
    label: "평면도",
    tabs: [
      {
        id: "floor-1f",
        label: "지상 1층",
        image: "/images/commercial/floor-1f.png",
        description:
          "지상 1층 평면도 — 호수변 상가 (F&B 위주 Cafe 스트리트 특화 MD)",
      },
      {
        id: "floor-b1",
        label: "대로변 2층",
        image: "/images/commercial/floor-b1.png",
        description:
          "지하 1층 평면도 (대로변 기준 2층) — 외식 거리·뷰티·생활 밀착형 서비스 MD",
      },
      {
        id: "floor-b2",
        label: "대로변 1층",
        image: "/images/commercial/floor-b2.png",
        description:
          "지하 2층 평면도 (대로변 기준 1층) — 리테일 업종·킬러 브랜드·필수 근생 MD",
      },
    ],
  },
];
