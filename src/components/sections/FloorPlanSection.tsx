"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath, convertToPyeong } from "@/lib/utils";
import { UNIT_TYPES } from "@/data/unit-types";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

export default function FloorPlanSection() {
  const [selectedType, setSelectedType] = useState(UNIT_TYPES[0].id);
  const [usePyeong, setUsePyeong] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const unit = UNIT_TYPES.find((u) => u.id === selectedType)!;

  const fmt = (sqm: number) =>
    usePyeong ? `${convertToPyeong(sqm)}평` : `${sqm}㎡`;

  return (
    <SectionWrapper id="floorplan" title="세대 안내" subtitle="Unit Types">
      {/* Type selector */}
      <RevealOnScroll>
        <div className="mb-8 flex gap-px overflow-x-auto bg-neutral-200 scrollbar-hide">
          {UNIT_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "shrink-0 flex-1 px-4 py-3 text-[15px] font-medium transition-colors whitespace-nowrap",
                selectedType === type.id
                  ? "bg-accent text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-50"
              )}
            >
              {type.name}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedType}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col gap-0 lg:flex-row lg:gap-12"
        >
          {/* Floor plan image — edge-to-edge on mobile, clickable with zoom */}
          <div
            className="group relative -mx-5 w-auto cursor-pointer overflow-hidden md:mx-0 md:w-full lg:flex-1"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={getImagePath(unit.image)}
              alt={`${unit.name} 타입`}
              className="h-auto w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/5">
              <Maximize2
                size={28}
                strokeWidth={1.5}
                className="text-neutral-700 opacity-0 drop-shadow-sm transition group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center px-4 py-8 lg:w-[360px] lg:px-0 lg:py-0">
            {/* Header */}
            <div className="mb-6">
              <span className="label-caps text-neutral-500">Type {unit.name}</span>
              <h3 className="heading-display mt-2 text-3xl text-neutral-900 md:text-4xl">
                전용 {fmt(unit.exclusiveArea)}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-500">
                {unit.rooms}Room · {unit.baths}Bath · {unit.unitCount}세대
              </p>
            </div>

            {/* ㎡ / 평 toggle */}
            <div className="mb-6 flex items-center gap-2">
              <button
                onClick={() => setUsePyeong(false)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  !usePyeong
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-400"
                )}
              >
                ㎡
              </button>
              <button
                onClick={() => setUsePyeong(true)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition",
                  usePyeong
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-400"
                )}
              >
                평
              </button>
            </div>

            {/* Specs table */}
            <div className="divide-y divide-neutral-100 border-y border-neutral-200">
              {[
                { label: "전용면적", value: unit.exclusiveArea },
                { label: "주거공용", value: unit.commonArea },
                { label: "공급면적", value: unit.supplyArea },
                { label: "기타공용", value: unit.otherCommonArea },
                { label: "계약면적", value: unit.contractArea },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="text-sm text-neutral-500">{row.label}</span>
                  <span className="text-sm font-semibold text-neutral-900">
                    {fmt(row.value)}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-neutral-300">
              ※ 상기 면적은 인허가 과정에서 다소 변경될 수 있습니다.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <ImageZoomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={unit.image}
        alt={`${unit.name} 타입`}
      />
    </SectionWrapper>
  );
}
