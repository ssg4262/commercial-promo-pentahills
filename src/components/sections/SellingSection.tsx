"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS = [
  { id: "sell-36", label: "①공원 일체형 입지",   image: "/images/selling/selling-36.jpg" },
  { id: "sell-37", label: "②공원화사업 프리미엄", image: "/images/selling/selling-37.jpg" },
  { id: "sell-38", label: "②공원화사업 시세",     image: "/images/selling/selling-38.jpg" },
  { id: "sell-39", label: "③문화·여가 특화",      image: "/images/selling/selling-39.jpg" },
  { id: "sell-40", label: "④최고수준 주차",        image: "/images/selling/selling-40.jpg" },
  { id: "sell-41", label: "④스마트 설비",          image: "/images/selling/selling-41.jpg" },
  { id: "sell-42", label: "④올인원 커뮤니티",      image: "/images/selling/selling-42.jpg" },
  { id: "sell-43", label: "⑤브랜드 선호①",        image: "/images/selling/selling-43.jpg" },
  { id: "sell-44", label: "⑤브랜드 선호②",        image: "/images/selling/selling-44.jpg" },
  { id: "sell-45", label: "⑥희소가치①",           image: "/images/selling/selling-45.jpg" },
  { id: "sell-46", label: "⑥희소가치②",           image: "/images/selling/selling-46.jpg" },
];

export default function SellingSection() {
  const [active, setActive] = useState(TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <SectionWrapper id="selling" title="셀링포인트" subtitle="Selling Points">
      <RevealOnScroll>
        <div className="mb-10 flex gap-6 overflow-x-auto border-b border-neutral-200 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative pb-4 text-sm transition-colors whitespace-nowrap",
                active === tab.id
                  ? "font-medium text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {tab.label}
              {active === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="group relative cursor-pointer overflow-hidden rounded-sm shadow-md"
              onClick={() => setModalOpen(true)}
            >
              <div className="aspect-[16/9] bg-neutral-100">
                <img
                  src={getImagePath(activeTab.image)}
                  alt={activeTab.label}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-white opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400">* 클릭하여 확대 · {activeTab.label}</p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} src={activeTab.image} alt={activeTab.label} />
    </SectionWrapper>
  );
}
