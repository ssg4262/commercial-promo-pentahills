import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "HOME" },
  { id: "overview", label: "사업개요" },
  { id: "commercial", label: "상가분양" },
  { id: "birdseye", label: "단지안내" },
  { id: "community", label: "주민공동시설" },
  // 세대안내: 자료 확보 후 추가 예정 (임시 주석)
  // { id: "floorplan", label: "세대안내" },
  { id: "environment", label: "입지분석" },
  { id: "devenv", label: "개발환경" },
  { id: "registration", label: "관심고객" },
];
