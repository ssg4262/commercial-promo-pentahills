"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";
import ImageZoomModal from "@/components/common/ImageZoomModal";

const TABS: { id: string; label: string; image: string }[] = [
  { id: "demographics", label: "인문·사회환경", image: "/images/devenv/dev-demographics.png" },
  { id: "developer",    label: "시행·시공사",   image: "/images/devenv/dev-developer.png" },
  { id: "masterlease",  label: "마스터리스",    image: "/images/devenv/dev-masterlease.png" },
  { id: "leasecare",    label: "임대 케어",     image: "/images/devenv/dev-leasecare.png" },
];

export default function DevEnvSection() {
  const [active, setActive] = useState(TABS[0]?.id ?? "");
  const [modalSrc, setModalSrc] = useState<string | null>(null);
  const [modalAlt, setModalAlt] = useState("");

  const current = TABS.find((t) => t.id === active);

  if (!current) {
    return (
      <SectionWrapper id="devenv" title="개발환경" subtitle="Development" className="bg-neutral-50">
        <div className="flex aspect-[16/9] items-center justify-center rounded-sm bg-neutral-100">
          <p className="text-sm text-neutral-400">자료 준비 중입니다</p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="devenv" title="개발환경" subtitle="Development" className="bg-neutral-50">
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
            onClick={() => { setModalSrc(current.image); setModalAlt(current.label); }}
          >
            <img
              src={getImagePath(current.image)}
              alt={current.label}
              className="block h-auto w-full bg-neutral-100"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10">
              <Maximize2 size={24} strokeWidth={1} className="text-white opacity-0 transition group-hover:opacity-100" />
            </div>
          </div>
          <p className="mt-2 text-xs text-neutral-400">* 클릭하여 확대</p>
        </motion.div>
      </AnimatePresence>

      <ImageZoomModal
        isOpen={!!modalSrc}
        onClose={() => setModalSrc(null)}
        src={modalSrc ?? ""}
        alt={modalAlt}
      />
    </SectionWrapper>
  );
}
