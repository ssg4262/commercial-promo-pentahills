"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import {
  BUILDINGS,
  UNIT_COLORS,
  UNIT_BG,
  SITE_BOUNDARY,
  type BuildingDef,
  type UnitTypeId,
} from "@/data/site-plan";

const UNIT_LABELS: Record<UnitTypeId, string> = {
  "74A": "74A",
  "84A": "84A",
  "84B": "84B",
  "99A": "99A",
  "99B": "99B",
};

const TYPE_NAMES: Record<UnitTypeId, string> = {
  "74A": "74㎡ A",
  "84A": "84㎡ A",
  "84B": "84㎡ B",
  "99A": "99㎡ A",
  "99B": "99㎡ B",
};

function Legend() {
  const types = Object.keys(UNIT_COLORS) as UnitTypeId[];
  return (
    <div className="flex flex-wrap gap-3">
      {types.map((t) => (
        <div key={t} className="flex items-center gap-1.5">
          <span
            className="h-3 w-5 rounded-sm border"
            style={{ backgroundColor: UNIT_COLORS[t], borderColor: UNIT_COLORS[t] }}
          />
          <span className="text-xs text-neutral-600">{TYPE_NAMES[t]}</span>
        </div>
      ))}
    </div>
  );
}

function FloorGrid({ building }: { building: BuildingDef }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900">{building.label} 동호배치</h3>
        <span className="text-xs text-neutral-500">총 {building.floors[0].units.length}호 × {building.floors.length}층</span>
      </div>

      {/* Header row */}
      <div className="flex gap-1 text-[10px] text-neutral-400 font-medium pl-10">
        {building.floors[0].units.map((u) => (
          <div key={u.ho} className="w-10 text-center">{u.ho}호</div>
        ))}
      </div>

      {/* Floor rows - scrollable */}
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-0.5">
          {building.floors.map((floorData) => (
            <div key={floorData.floor} className="flex items-center gap-1">
              {/* Floor label */}
              <div className="w-9 shrink-0 text-right text-[10px] text-neutral-400 font-medium pr-1">
                {floorData.floor}F
              </div>
              {/* Unit cells */}
              {floorData.units.map((unit) => {
                const cellId = `${floorData.floor}-${unit.ho}`;
                const isHovered = hovered === cellId;
                return (
                  <div
                    key={unit.ho}
                    className="relative w-10 h-6 rounded-sm border cursor-default transition-transform hover:scale-110 hover:z-10"
                    style={{
                      backgroundColor: isHovered ? UNIT_COLORS[unit.type] : UNIT_BG[unit.type],
                      borderColor: UNIT_COLORS[unit.type],
                    }}
                    onMouseEnter={() => setHovered(cellId)}
                    onMouseLeave={() => setHovered(null)}
                    title={`${floorData.floor}층 ${unit.ho}호 (${TYPE_NAMES[unit.type]})`}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-medium text-neutral-700">
                      {UNIT_LABELS[unit.type]}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-neutral-100">
        <Legend />
      </div>
    </div>
  );
}

export default function SitePlanSection() {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingDef | null>(null);

  return (
    <SectionWrapper id="siteplan" title="단지 배치도" subtitle="Site Plan">
      <RevealOnScroll>
        <div className="relative flex flex-col lg:flex-row gap-6">
          {/* SVG Site Plan */}
          <div
            className={cn(
              "transition-all duration-500",
              selectedBuilding ? "lg:w-1/2" : "w-full"
            )}
          >
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
              <svg
                viewBox="0 0 950 640"
                className="w-full h-auto"
                style={{ maxHeight: 560 }}
              >
                {/* Site boundary */}
                <polygon
                  points={SITE_BOUNDARY}
                  fill="#e8f4e8"
                  stroke="#6b9e6b"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />

                {/* Green space / park suggestion */}
                <ellipse cx="480" cy="500" rx="60" ry="30" fill="#b7ddb7" opacity="0.5" />
                <text x="480" y="504" textAnchor="middle" className="text-[9px]" fill="#4a7a4a" fontSize="10" fontWeight="500">
                  중산호수공원
                </text>

                {/* Road suggestion lines */}
                <line x1="60" y1="440" x2="200" y2="560" stroke="#d0c8b0" strokeWidth="4" />
                <line x1="720" y1="40" x2="850" y2="120" stroke="#d0c8b0" strokeWidth="4" />
                <line x1="870" y1="490" x2="720" y2="570" stroke="#d0c8b0" strokeWidth="4" />

                {/* Buildings */}
                {BUILDINGS.map((b) => {
                  const isSelected = selectedBuilding?.id === b.id;
                  return (
                    <g
                      key={b.id}
                      onClick={() => setSelectedBuilding(isSelected ? null : b)}
                      className="cursor-pointer"
                      role="button"
                      aria-label={`${b.label} 선택`}
                    >
                      <rect
                        x={b.svgX}
                        y={b.svgY}
                        width={b.svgW}
                        height={b.svgH}
                        rx={4}
                        fill={b.dominantColor}
                        fillOpacity={isSelected ? 1 : 0.75}
                        stroke={isSelected ? "#0f172a" : b.dominantColor}
                        strokeWidth={isSelected ? 3 : 1.5}
                        className="transition-all duration-200"
                      />
                      {/* Shadow / depth effect */}
                      <rect
                        x={b.svgX + 3}
                        y={b.svgY + b.svgH}
                        width={b.svgW}
                        height={4}
                        rx={1}
                        fill="#00000020"
                      />
                      {/* Building label */}
                      <text
                        x={b.svgX + b.svgW / 2}
                        y={b.svgY + b.svgH / 2 - 6}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill={isSelected ? "#0f172a" : "#374151"}
                      >
                        {b.label}
                      </text>
                      <text
                        x={b.svgX + b.svgW / 2}
                        y={b.svgY + b.svgH / 2 + 8}
                        textAnchor="middle"
                        fontSize="9"
                        fill={isSelected ? "#0f172a" : "#6b7280"}
                      >
                        {b.floors.length}F
                      </text>
                    </g>
                  );
                })}

                {/* Compass */}
                <g transform="translate(870, 560)">
                  <circle cx="0" cy="0" r="20" fill="white" stroke="#d1d5db" strokeWidth="1.5" />
                  <polygon points="0,-16 4,0 0,4 -4,0" fill="#0f172a" />
                  <polygon points="0,16 4,0 0,-4 -4,0" fill="#d1d5db" />
                  <text x="0" y="-20" textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">N</text>
                </g>
              </svg>

              <p className="mt-2 text-center text-xs text-neutral-400">
                동을 클릭하면 동호배치를 확인할 수 있습니다
              </p>
            </div>

            {/* Bottom legend (when no building selected) */}
            {!selectedBuilding && (
              <div className="mt-4 rounded-lg border border-neutral-200 bg-white px-4 py-3">
                <p className="mb-2 text-xs font-medium text-neutral-500 uppercase tracking-wider">평형 범례</p>
                <Legend />
              </div>
            )}
          </div>

          {/* Floor grid panel */}
          <AnimatePresence>
            {selectedBuilding && (
              <motion.div
                key={selectedBuilding.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="lg:w-1/2 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden"
              >
                {/* Panel header */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b border-neutral-100"
                  style={{ backgroundColor: selectedBuilding.dominantColor + "33" }}
                >
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 transition-colors lg:hidden"
                  >
                    <ChevronLeft size={16} />
                    돌아가기
                  </button>
                  <span className="font-semibold text-neutral-800">{selectedBuilding.label} 동호배치</span>
                  <button
                    onClick={() => setSelectedBuilding(null)}
                    className="hidden lg:flex items-center justify-center w-7 h-7 rounded-full hover:bg-neutral-200 transition-colors"
                    aria-label="닫기"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Floor grid */}
                <div className="p-4 h-[480px]">
                  <FloorGrid building={selectedBuilding} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </RevealOnScroll>
    </SectionWrapper>
  );
}
