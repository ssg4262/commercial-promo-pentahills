"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import { BIRDSEYE_CATEGORIES } from "@/data/birdseye";
import { useDragScroll } from "@/hooks/useDragScroll";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

export default function BirdEyeSection() {
  const [activeCat, setActiveCat] = useState(BIRDSEYE_CATEGORIES[0].id);
  const [activeTab, setActiveTab] = useState(BIRDSEYE_CATEGORIES[0].tabs[0].id);
  const [modalOpen, setModalOpen] = useState(false);
  const { ref: tabBarRef, consumeDrag } = useDragScroll<HTMLDivElement>();

  const activeCategory =
    BIRDSEYE_CATEGORIES.find((c) => c.id === activeCat) ?? BIRDSEYE_CATEGORIES[0];
  const activeItem =
    activeCategory.tabs.find((t) => t.id === activeTab) ?? activeCategory.tabs[0];

  const selectCategory = (catId: string) => {
    const cat = BIRDSEYE_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    setActiveCat(catId);
    setActiveTab(cat.tabs[0].id);
    tabBarRef.current?.scrollTo({ left: 0 });
  };

  return (
    <SectionWrapper
      id="birdseye"
      title="단지 안내"
      subtitle="Complex"
      className="bg-neutral-50 dark:bg-[#0f0f0f]"
    >
      {/* Primary category tabs */}
      <RevealOnScroll>
        <div className="mb-4 flex flex-wrap gap-2">
          {BIRDSEYE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                activeCat === cat.id
                  ? "bg-accent text-white"
                  : "bg-white text-neutral-500 hover:bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {cat.label}
              <span className="ml-1.5 text-[11px] opacity-70">{cat.tabs.length}</span>
            </button>
          ))}
        </div>
      </RevealOnScroll>

      {/* Secondary sub-tabs */}
      <RevealOnScroll>
        <div
          ref={tabBarRef}
          className="mb-10 flex cursor-grab gap-6 overflow-x-auto border-b border-neutral-200 select-none active:cursor-grabbing dark:border-neutral-800 scrollbar-hide"
        >
          {activeCategory.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={(e) => {
                if (consumeDrag()) return;
                setActiveTab(tab.id);
                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={cn(
                "relative shrink-0 whitespace-nowrap pb-4 text-[15px] transition-colors",
                activeTab === tab.id
                  ? "font-medium text-neutral-900 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="group relative -mx-5 cursor-pointer overflow-hidden md:mx-0"
              onClick={() => setModalOpen(true)}
            >
              <img
                src={getImagePath(activeItem.image)}
                alt={activeItem.label}
                className="block h-auto w-full bg-neutral-100 dark:bg-neutral-900"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2 size={24} strokeWidth={1} className="text-neutral-600 opacity-0 transition group-hover:opacity-100" />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-neutral-400">
              * 클릭하여 확대 · {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal isOpen={modalOpen} onClose={() => setModalOpen(false)} src={activeItem.image} alt={activeItem.label} />
    </SectionWrapper>
  );
}
