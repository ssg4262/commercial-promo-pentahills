"use client";

import MarqueeTicker from "@/components/common/MarqueeTicker";

const KEYWORDS = [
  "대구·경북 유일 수변 문화복합몰",
  "3만 3천평 중산호수공원",
  "반경 3km 6만 3천여 배후세대",
  "3,443세대 단지 내 고정수요",
  "이탈리아 베로나 모티브",
  "키즈테마파크 · 멀티플렉스 · 대형서점",
  "Lake Village · Fiesta Arena · Boulevard",
  "마스터리스 · 임대 케어",
];

export default function MarqueeSection() {
  return (
    <div className="border-y border-neutral-100 bg-white py-5 dark:border-neutral-800 dark:bg-[#111]">
      <MarqueeTicker
        items={KEYWORDS}
        className="text-[11px] font-light uppercase tracking-[0.15em] text-neutral-400 dark:text-neutral-500"
        speed={40}
      />
    </div>
  );
}
