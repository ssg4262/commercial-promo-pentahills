export interface MDZone {
  id: string;
  name: string;
  englishName: string;
  tagline: string;
  description: string;
  keywords: string[];
}

export const MD_ZONES: MDZone[] = [
  {
    id: "lake-village",
    name: "호수변 상가",
    englishName: "Lake Village",
    tagline: "이태리 호수마을 감성의 수변 라이프",
    description:
      "수변 공간과 어울리는 감성 MD, 감각적인 수변 카페거리 등 F&B 업종 중심",
    keywords: ["Cozy", "Warm", "Nature", "호수", "이국적"],
  },
  {
    id: "fiesta-arena",
    name: "광장 상가",
    englishName: "Fiesta Arena",
    tagline: "놀이, 공연, 문화가 있는 축제의 광장",
    description:
      "약 3,000평 중앙광장, 야시장·콘서트·버스킹 등 다양한 문화 이벤트 공간",
    keywords: ["Beige", "Brown", "Stone", "이벤트 공간"],
  },
  {
    id: "juliet-romeo",
    name: "내부 가로 상가",
    englishName: "Juliet & Romeo Street",
    tagline: "축제가 펼쳐지는 활기찬 거리, 로맨틱한 거리",
    description:
      "놀고·즐기고·체험하고·쇼핑하는 Malling MD. 앵커 테넌트, 문화·여가시설, 패밀리 외식, 패션 리테일 등 중심",
    keywords: ["베로나", "스토리텔링", "Malling"],
  },
  {
    id: "boulevard",
    name: "대로변 상가",
    englishName: "Boulevard",
    tagline: "도시적인 세련이 넘치는 거리",
    description:
      "배후 수요를 타겟으로 하는 필수 근생 MD. 생활 편의시설, 클리닉, 학원, 금융 업종 등 중심",
    keywords: ["Arch", "Stone", "테라코타", "대로변 쇼핑"],
  },
];
