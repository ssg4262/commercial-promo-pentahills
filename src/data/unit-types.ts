import type { UnitType } from "@/types";

/**
 * 펜타힐즈 W스퀘어 세대 타입 (영업 교육자료 p.4 / 주거시설 공유자료 p.3 기준)
 * 총 3,443세대 = 846 + 1,034 + 1,335 + 228
 * 면적은 대표 평균치(약식). 정확한 호별 면적은 모집공고 확정값으로 추후 갱신.
 */
export const UNIT_TYPES: UnitType[] = [
  {
    id: "84",
    name: "84㎡",
    exclusiveArea: 84.95,
    commonArea: 28.0,
    supplyArea: 112.95,
    otherCommonArea: 57.0,
    contractArea: 169.95,
    unitCount: 846,
    color: "#2BB293",
    image: "/images/floor-plans/84.jpg",
    rooms: 3,
    baths: 2,
  },
  {
    id: "115",
    name: "105/115㎡",
    exclusiveArea: 115.0,
    commonArea: 38.0,
    supplyArea: 153.0,
    otherCommonArea: 75.0,
    contractArea: 228.0,
    unitCount: 1034,
    color: "#0B7A60",
    image: "/images/floor-plans/115.jpg",
    rooms: 4,
    baths: 2,
  },
  {
    id: "130",
    name: "123~137㎡",
    exclusiveArea: 130.0,
    commonArea: 42.0,
    supplyArea: 172.0,
    otherCommonArea: 85.0,
    contractArea: 257.0,
    unitCount: 1335,
    color: "#075B47",
    image: "/images/floor-plans/130.jpg",
    rooms: 4,
    baths: 2,
  },
  {
    id: "152",
    name: "152㎡",
    exclusiveArea: 152.0,
    commonArea: 50.0,
    supplyArea: 202.0,
    otherCommonArea: 100.0,
    contractArea: 302.0,
    unitCount: 228,
    color: "#161616",
    image: "/images/floor-plans/152.jpg",
    rooms: 4,
    baths: 3,
  },
];
