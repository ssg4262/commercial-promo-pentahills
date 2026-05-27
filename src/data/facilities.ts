import type { Facility } from "@/types";

export const FACILITY_CATEGORIES: { id: string; label: string; icon: string; color: string }[] = [
  { id: "transport", label: "교통", icon: "Train",        color: "#3B82F6" }, // blue
  { id: "education", label: "교육", icon: "GraduationCap", color: "#10B981" }, // green
  { id: "convenience", label: "편의시설", icon: "ShoppingBag", color: "#F59E0B" }, // amber
  { id: "medical",  label: "의료",  icon: "Heart",        color: "#EF4444" }, // red
  { id: "park",     label: "공원",  icon: "TreePine",     color: "#22C55E" }, // emerald
];

export const FACILITIES: Facility[] = [
  // 교통
  { id: "f1",  name: "경산역",        category: "transport",   distance: "2.5km", time: "차량 7분",  lat: 35.8196, lng: 128.7447 },
  { id: "f2",  name: "상방정류장",    category: "transport",   distance: "200m",  time: "도보 3분",  lat: 35.8258, lng: 128.7454 },
  { id: "f3",  name: "경산IC",        category: "transport",   distance: "3km",   time: "차량 8분",  lat: 35.8090, lng: 128.7250 },

  // 교육
  { id: "f4",  name: "상방초등학교",  category: "education",   distance: "300m",  time: "도보 4분",  lat: 35.8273, lng: 128.7405 },
  { id: "f5",  name: "경산중학교",    category: "education",   distance: "500m",  time: "도보 7분",  lat: 35.8212, lng: 128.7472 },
  { id: "f6",  name: "경산고등학교",  category: "education",   distance: "800m",  time: "도보 10분", lat: 35.8188, lng: 128.7490 },
  { id: "f7",  name: "경산도서관",    category: "education",   distance: "600m",  time: "도보 8분",  lat: 35.8295, lng: 128.7385 },

  // 편의시설
  { id: "f8",  name: "이마트 경산점", category: "convenience", distance: "1.5km", time: "차량 5분",  lat: 35.8152, lng: 128.7558 },
  { id: "f9",  name: "경산중앙시장",  category: "convenience", distance: "2km",   time: "차량 6분",  lat: 35.8382, lng: 128.7545 },
  { id: "f10", name: "하나로마트",    category: "convenience", distance: "500m",  time: "도보 7분",  lat: 35.8232, lng: 128.7402 },
  { id: "f11", name: "경산시청",      category: "convenience", distance: "2.5km", time: "차량 7분",  lat: 35.8452, lng: 128.7498 },

  // 의료
  { id: "f12", name: "경산제일병원",  category: "medical",     distance: "1.8km", time: "차량 5분",  lat: 35.8348, lng: 128.7598 },
  { id: "f13", name: "삼성의원",      category: "medical",     distance: "400m",  time: "도보 5분",  lat: 35.8222, lng: 128.7462 },
  { id: "f14", name: "경산보건소",    category: "medical",     distance: "2km",   time: "차량 6분",  lat: 35.8382, lng: 128.7578 },

  // 공원
  { id: "f15", name: "상방공원",      category: "park",        distance: "100m",  time: "도보 1분",  lat: 35.8262, lng: 128.7450 },
  { id: "f16", name: "남산공원",      category: "park",        distance: "1km",   time: "도보 13분", lat: 35.8318, lng: 128.7340 },
  { id: "f17", name: "경산둘레길",    category: "park",        distance: "500m",  time: "도보 7분",  lat: 35.8285, lng: 128.7378 },
];
