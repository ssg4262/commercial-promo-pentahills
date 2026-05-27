"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS: { id: string; label: string; image: string }[] = [
  { id: "facilities", label: "커뮤니티 시설",     image: "/images/community/comm-facilities.png" },
  { id: "landscape",  label: "단지 조경",         image: "/images/community/comm-landscape.png" },
  { id: "elevator",   label: "동별 4대 E/V",      image: "/images/community/comm-elevator.png" },
  { id: "parking",    label: "확장형 주차공간",   image: "/images/community/comm-parking.png" },
];

export default function CommunitySection() {
  const [active, setActive] = useState(TABS[0]?.id ?? "");
  const [modalOpen, setModalOpen] = useState(false);
  const activeTab = TABS.find((t) => t.id === active);

  if (!activeTab) {
    return (
      <SectionWrapper id="community" title="주민공동시설" subtitle="Community Facilities">
        <div className="flex aspect-[16/9] items-center justify-center rounded-sm bg-neutral-100 dark:bg-neutral-900">
          <p className="text-sm text-neutral-400">자료 준비 중입니다</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="community" title="주민공동시설" subtitle="Community Facilities">
      <RevealOnScroll>
        <div className="mb-10 flex gap-6 overflow-x-auto border-b border-neutral-200 scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative pb-4 text-[15px] transition-colors whitespace-nowrap",
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
            transition={{ duration: 0.25 }}
          >
            <div
              className="group relative -mx-5 cursor-pointer overflow-hidden shadow-md md:mx-0 md:rounded-sm"
              onClick={() => setModalOpen(true)}
            >
              <img
                src={getImagePath(activeTab.image)}
                alt={activeTab.label}
                className="block h-auto w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-neutral-600 opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-400">* 클릭하여 확대 · {activeTab.label} 주민공동시설</p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={activeTab.image}
        alt={activeTab.label}
      />
    </SectionWrapper>
  );
}
