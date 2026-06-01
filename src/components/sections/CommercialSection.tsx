"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import { COMMERCIAL_OVERVIEW_TABLE } from "@/data/project";
import { COMMERCIAL_CATEGORIES } from "@/data/commercial-tabs";
import { useDragScroll } from "@/hooks/useDragScroll";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

export default function CommercialSection() {
  const [activeCat, setActiveCat] = useState(COMMERCIAL_CATEGORIES[0].id);
  const [activeTab, setActiveTab] = useState(COMMERCIAL_CATEGORIES[0].tabs[0].id);
  const [modalOpen, setModalOpen] = useState(false);

  const activeCategory =
    COMMERCIAL_CATEGORIES.find((c) => c.id === activeCat) ?? COMMERCIAL_CATEGORIES[0];
  const activeItem =
    activeCategory.tabs.find((t) => t.id === activeTab) ?? activeCategory.tabs[0];

  const { ref: tabBarRef, consumeDrag } = useDragScroll<HTMLDivElement>();
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = () => {
    const el = tabBarRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  };

  const scrollByDir = (dir: 1 | -1) => {
    const el = tabBarRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 200), behavior: "smooth" });
  };

  const selectCategory = (catId: string) => {
    const cat = COMMERCIAL_CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    setActiveCat(catId);
    setActiveTab(cat.tabs[0].id);
    // Reset sub-tab scroll to the start
    tabBarRef.current?.scrollTo({ left: 0 });
  };

  const selectTab = (id: string, btn: HTMLElement) => {
    // Ignore the click that ends a drag gesture
    if (consumeDrag()) return;
    setActiveTab(id);
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  // Edge-fade indicators follow the (hook-managed) scroll position
  useEffect(() => {
    const el = tabBarRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recompute scroll-edge indicators whenever the sub-tab set changes
  useEffect(() => {
    updateEdges();
  }, [activeCat]);

  return (
    <SectionWrapper
      id="commercial"
      title="상가분양"
      subtitle="W Square Commercial"
      kicker="FEATURED · 핵심 분양"
      titleClassName="text-[#B5423A] dark:text-[#D8A097]"
    >
      {/* Primary category tabs */}
      <RevealOnScroll>
        <div className="mb-4 flex flex-wrap gap-2">
          {COMMERCIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => selectCategory(cat.id)}
              className={cn(
                "rounded-full px-4 py-2 text-[13px] font-medium transition-colors",
                activeCat === cat.id
                  ? "bg-accent text-white"
                  : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
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
        <div className="group relative mb-6">
          <div
            ref={tabBarRef}
            className="flex cursor-grab gap-6 overflow-x-auto border-b border-neutral-200 select-none active:cursor-grabbing dark:border-neutral-800 scrollbar-hide"
          >
            {activeCategory.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={(e) => selectTab(tab.id, e.currentTarget)}
                className={cn(
                  "relative whitespace-nowrap pb-4 text-[15px] transition-colors",
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

          {/* Edge fade indicators */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 dark:from-[#111]",
              edges.left ? "opacity-100" : "opacity-0"
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 dark:from-[#111]",
              edges.right ? "opacity-100" : "opacity-0"
            )}
          />

          {/* Hover-only nav arrows */}
          <button
            type="button"
            aria-label="이전 탭"
            onClick={() => scrollByDir(-1)}
            className={cn(
              "absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all duration-200 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
              edges.left
                ? "opacity-0 group-hover:opacity-100"
                : "pointer-events-none opacity-0"
            )}
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="다음 탭"
            onClick={() => scrollByDir(1)}
            className={cn(
              "absolute right-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-all duration-200 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300",
              edges.right
                ? "opacity-0 group-hover:opacity-100"
                : "pointer-events-none opacity-0"
            )}
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
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
            className="mb-12 md:mb-16"
          >
            <div
              className="group relative -mx-5 cursor-pointer overflow-hidden md:mx-0"
              onClick={() => setModalOpen(true)}
            >
              <img
                src={getImagePath(activeItem.image)}
                alt={activeItem.label}
                className="block h-auto w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
                <Maximize2
                  size={24}
                  strokeWidth={1}
                  className="text-neutral-600 opacity-0 transition group-hover:opacity-100"
                />
              </div>
            </div>
            <p className="mt-4 text-[11px] text-neutral-400">
              * 클릭하여 확대 · {activeItem.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </RevealOnScroll>

      <ImageZoomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={activeItem.image}
        alt={activeItem.label}
      />

      {/* Headline */}
      <RevealOnScroll>
        <div className="mb-12 md:mb-16">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-accent">
            Lake Side Cultural Mall
          </p>
          <h3 className="heading-display mt-3 text-[clamp(1.6rem,3.2vw,2.6rem)] leading-tight text-neutral-900 dark:text-white">
            호수공원을 품은
            <br />
            대구·경북 유일의 수변 문화복합몰
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            반경 3km 6만 3천여 배후세대와 3,443세대 단지 내 고정수요가 만들어내는
            초거대 상권, 이탈리아 베로나를 모티브로 한 이색적인 상환경에서 안정적인
            수익 가치를 선점하세요.
          </p>
        </div>
      </RevealOnScroll>

      {/* Commercial overview table */}
      <RevealOnScroll>
        <div className="mb-16 md:mb-24">
          <h4 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            상업·문화시설 개요
          </h4>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border-t border-neutral-200 dark:border-neutral-800">
            {COMMERCIAL_OVERVIEW_TABLE.map((row) => (
              <div key={row.label} className="flex py-4">
                <span className="w-28 shrink-0 text-sm font-medium text-neutral-500 dark:text-neutral-400 md:w-36">
                  {row.label}
                </span>
                <span className="text-sm text-neutral-800 dark:text-neutral-200">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>

    </SectionWrapper>
  );
}
