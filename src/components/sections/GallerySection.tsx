"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/data/gallery";
import type { GalleryCategory } from "@/types";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

/* CSS gradient based visual cards per category */
const CATEGORY_VISUALS: Record<string, { bg: string; pattern: string }> = {
  living: { bg: "from-neutral-200 to-neutral-300", pattern: "linear-gradient(135deg, rgba(0,0,0,0.02) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.02) 50%, rgba(0,0,0,0.02) 75%, transparent 75%)" },
  kitchen: { bg: "from-neutral-300 to-neutral-200", pattern: "repeating-linear-gradient(90deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 40px)" },
  bedroom: { bg: "from-neutral-100 to-neutral-200", pattern: "radial-gradient(circle at 70% 30%, rgba(0,0,0,0.04) 0%, transparent 50%)" },
  bathroom: { bg: "from-neutral-200 to-neutral-100", pattern: "repeating-linear-gradient(45deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 2px, transparent 2px, transparent 10px)" },
  exterior: { bg: "from-neutral-300 to-neutral-400", pattern: "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)" },
};

export default function GallerySection() {
  const [category, setCategory] = useState<GalleryCategory>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = category === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === category);

  const goPrev = useCallback(() => {
    setLightbox((p) => p !== null ? (p - 1 + filtered.length) % filtered.length : null);
  }, [filtered.length]);
  const goNext = useCallback(() => {
    setLightbox((p) => p !== null ? (p + 1) % filtered.length : null);
  }, [filtered.length]);

  return (
    <SectionWrapper id="gallery" title="갤러리" subtitle="Gallery" className="bg-neutral-50 dark:bg-[#0f0f0f]">
      <RevealOnScroll>
        <div className="mb-12 flex gap-6">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "text-sm transition-colors",
                category === cat.id
                  ? "font-medium text-neutral-900 dark:text-white"
                  : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </RevealOnScroll>

      <motion.div layout className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const vis = CATEGORY_VISUALS[item.category] || CATEGORY_VISUALS.living;
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative cursor-pointer overflow-hidden"
                onClick={() => setLightbox(i)}
              >
                <div className={cn("aspect-square bg-gradient-to-br", vis.bg)}>
                  <div className="h-full w-full" style={{ backgroundImage: vis.pattern, backgroundSize: "40px 40px" }} />
                </div>
                {/* Hover overlay with info */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/50">
                  <span className="translate-y-4 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.alt}
                  </span>
                  <span className="mt-1 translate-y-4 text-[10px] text-white/60 opacity-0 transition-all duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                    {GALLERY_CATEGORIES.find((c) => c.id === item.category)?.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} className="absolute right-6 top-6 z-10 text-white/40 transition hover:text-white" aria-label="닫기">
              <X size={20} strokeWidth={1} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white" aria-label="이전">
              <ChevronLeft size={28} strokeWidth={1} />
            </button>
            <div onClick={(e) => e.stopPropagation()} className="max-w-4xl px-16">
              {(() => {
                const vis = CATEGORY_VISUALS[filtered[lightbox].category] || CATEGORY_VISUALS.living;
                return (
                  <div className={cn("aspect-[4/3] w-[70vw] max-w-3xl bg-gradient-to-br", vis.bg)}>
                    <div className="flex h-full w-full items-center justify-center" style={{ backgroundImage: vis.pattern, backgroundSize: "40px 40px" }}>
                      <span className="text-lg font-light text-neutral-600">{filtered[lightbox].alt}</span>
                    </div>
                  </div>
                );
              })()}
              <p className="mt-4 text-center text-xs text-neutral-500">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white" aria-label="다음">
              <ChevronRight size={28} strokeWidth={1} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
