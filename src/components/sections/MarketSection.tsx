"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS = [
  { id: "market-20", label: "대구권시장",     image: "/images/market/market-20.jpg" },
  { id: "market-22", label: "분양예정사례",   image: "/images/market/market-22.jpg" },
  { id: "market-23", label: "지역별시세",     image: "/images/market/market-23.jpg" },
  { id: "market-24", label: "대입지구사전청약", image: "/images/market/market-24.jpg" },
  { id: "market-25", label: "대입지구사업취소", image: "/images/market/market-25.jpg" },
  { id: "market-26", label: "대입지구미래가치", image: "/images/market/market-26.jpg" },
];

export default function MarketSection() {
  const [active, setActive] = useState(TABS[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <SectionWrapper id="market" title="시장환경" subtitle="Market">
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
