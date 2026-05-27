"use client";

import { ArrowUp, Phone, MapPin } from "lucide-react";
import { PROJECT } from "@/data/project";
import { NAV_ITEMS } from "@/data/navigation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Footer() {
  const scrollTo = useSmoothScroll();

  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4 md:px-10">
        <span className="flex flex-col items-center leading-none">
          <span className="text-[8px] font-medium tracking-[0.25em] text-[#c4835a]">HOBAN</span>
          <span className="text-[13px] font-extrabold tracking-[0.02em] text-white">SUMMIT</span>
        </span>
        <button
          onClick={() => scrollTo("hero")}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-400 transition hover:text-white"
          aria-label="맨 위로"
        >
          Top
          <ArrowUp size={12} strokeWidth={1} />
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-5 text-lg font-bold tracking-tight">{PROJECT.name}</h3>
            <div className="flex flex-col gap-2 text-xs text-neutral-400">
              <span className="flex items-center gap-2">
                <MapPin size={12} strokeWidth={1} />
                현장 : {PROJECT.location}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={12} strokeWidth={1} />
                홍보관 : {PROJECT.showroom}
              </span>
              <a href={`tel:${PROJECT.phone}`} className="mt-2 flex items-center gap-2 text-lg font-bold text-accent transition hover:text-accent-light">
                <Phone size={14} strokeWidth={2} />
                {PROJECT.phone}
              </a>
              <span className="mt-1">{PROJECT.developer}</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-neutral-400">바로가기</span>
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.filter((i) => i.id !== "hero").map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left text-xs text-neutral-400 transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <span className="mb-4 block text-[10px] uppercase tracking-[0.2em] text-neutral-400">안내사항</span>
            <p className="text-[10px] leading-relaxed text-neutral-400">
              본 홍보물의 이미지, CG, 도면 등은 소비자의 이해를 돕기 위한 것으로
              실제와 차이가 있을 수 있으며 법적 효력이 없습니다.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-neutral-800 pt-6">
          <p className="text-[10px] text-neutral-500">
            &copy; 2024 {PROJECT.developer}
          </p>
        </div>
      </div>
    </footer>
  );
}
