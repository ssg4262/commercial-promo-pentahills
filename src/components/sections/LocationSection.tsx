"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  Train, GraduationCap, ShoppingBag, Heart, TreePine, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FACILITY_CATEGORIES, FACILITIES } from "@/data/facilities";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

// Dynamic import to avoid SSR issues with Leaflet
const LeafletMap = dynamic(() => import("@/components/common/KakaoMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-neutral-100">
      <MapPin size={24} className="text-neutral-300 animate-pulse" />
    </div>
  ),
});

const ICON_MAP: Record<string, React.ElementType> = {
  Train, GraduationCap, ShoppingBag, Heart, TreePine,
};

// Build color lookup from FACILITY_CATEGORIES
const CATEGORY_COLORS: Record<string, string> = Object.fromEntries(
  FACILITY_CATEGORIES.map((c) => [c.id, c.color])
);

export default function LocationSection() {
  const [active, setActive] = useState<string>("all");

  const filtered = active === "all"
    ? FACILITIES
    : FACILITIES.filter((f) => f.category === active);

  // Stable reference for map (avoids re-render on every keystroke)
  const categoryColors = useMemo(() => CATEGORY_COLORS, []);

  return (
    <SectionWrapper id="location" title="입지 환경" subtitle="Location">
      {/* Category filter buttons */}
      <RevealOnScroll>
        <div className="mb-10 flex flex-wrap gap-3">
          <button
            onClick={() => setActive("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition",
              active === "all"
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600"
            )}
          >
            전체
          </button>
          {FACILITY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition",
                active === cat.id
                  ? "text-white border-transparent"
                  : "border-neutral-200 text-neutral-400 hover:border-neutral-400 hover:text-neutral-600"
              )}
              style={active === cat.id ? { backgroundColor: cat.color, borderColor: cat.color } : {}}
            >
              {/* Color dot */}
              <span
                className="inline-block h-2 w-2 rounded-full shrink-0"
                style={{ backgroundColor: active === cat.id ? "white" : cat.color }}
              />
              {cat.label}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Map */}
        <RevealOnScroll className="lg:col-span-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-md">
            <LeafletMap
              lat={35.8388}
              lng={128.7691}
              label="펜타힐즈 W스퀘어 (경산 중산지구)"
              facilities={FACILITIES}
              activeCategory={active}
              categoryColors={categoryColors}
            />
          </div>
          {/* Address badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              <MapPin size={10} /> 경상북도 경산시 중산동 일원 A2-1 블록
            </span>
            <span className="border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              중산호수공원 인접
            </span>
            <span className="border border-neutral-200 px-3 py-1 text-[11px] text-neutral-500">
              사월역(2호선) 도보 10분
            </span>
          </div>
        </RevealOnScroll>

        {/* Facility list */}
        <RevealOnScroll className="lg:col-span-2" delay={0.15}>
          <div
            className="divide-y divide-neutral-100 dark:divide-neutral-800"
            style={{ maxHeight: "440px", overflowY: "auto" }}
          >
            {filtered.map((f) => {
              const catInfo = FACILITY_CATEGORIES.find((c) => c.id === f.category);
              const Icon = catInfo ? ICON_MAP[catInfo.icon] : MapPin;
              const color = catInfo?.color ?? "#9CA3AF";
              return (
                <div key={f.id} className="flex items-center gap-4 py-3.5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}18` }}
                  >
                    {Icon && <Icon size={16} strokeWidth={1.5} style={{ color }} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {f.name}
                    </p>
                    <div className="flex gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span>{f.distance}</span>
                      <span>{f.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </SectionWrapper>
  );
}
