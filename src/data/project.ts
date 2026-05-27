import type { ProjectInfo } from "@/types";

export const PROJECT: ProjectInfo = {
  name: "펜타힐즈 W스퀘어",
  location: "경상북도 경산시 중산동 일원 A2-1 블록",
  showroom: "추후 안내 예정",
  developer: "아이에스동서(주)",
  totalUnits: 3443,
  totalBuildings: 18,
  maxFloors: 59,
  parkingSpaces: 7793,
  moveInDate: "2030년 10월 예정",
  phone: "010-4539-8505",
  siteArea: "106,278.80㎡",
  buildingArea: "—",
  floorAreaRatio: "—",
  buildingCoverageRatio: "—",
  structure: "철근콘크리트 구조",
  heating: "지역난방",
};

export const PROJECT_STATS = [
  { label: "단지 세대수", value: 3443, suffix: "세대" },
  { label: "총 동수", value: 18, suffix: "개동" },
  { label: "최고 층수", value: 59, suffix: "층" },
  { label: "배후 세대수", value: 63000, suffix: "여 세대" },
] as const;

export const PROJECT_OVERVIEW_TABLE = [
  { label: "사업명", value: "중산지구 A2-1 블록 주상복합 신축공사" },
  { label: "대지위치", value: "경상북도 경산시 중산동 일원 A2-1 블록" },
  { label: "대지면적", value: "106,278.80㎡ (32,149.34평)" },
  { label: "연면적", value: "913,131.97㎡ (276,222.42평)" },
  { label: "건축규모", value: "지하 6층 ~ 지상 59층 / 18개동 / 3,443세대" },
  { label: "주차대수", value: "7,793대 (법정 대비 약 117%) _공공 기여시설 포함" },
  { label: "착공 / 준공", value: "2026년 5월 ~ 2030년 10월 (예정)" },
  { label: "타입 (APT)", value: "84㎡ 846세대, 105/115㎡ 1,034세대, 123~137㎡ 1,335세대, 152㎡ 228세대" },
  { label: "시행·시공사", value: "아이에스동서(주)" },
] as const;

export const COMMERCIAL_OVERVIEW_TABLE = [
  { label: "규모", value: "B2~1F, 연면적 93,275.60㎡ (28,215.87평)" },
  {
    label: "용도별 면적",
    value:
      "판매시설 73,018.87㎡ (22,088.21평) / 문화·집회시설 10,085.36㎡ (3,050.82평) / 운동시설 10,171.37㎡ (3,076.84평)",
  },
  { label: "전용률", value: "37.81%" },
  { label: "주차대수", value: "972대 (판매시설 및 문·집, 운동시설 기준, 법정 대비 약 171%)" },
] as const;
