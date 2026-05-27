"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/useUIStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const SECTIONS = [
  { id: "overview", label: "사업개요" },
  { id: "commercial", label: "상가분양" },
  { id: "birdseye", label: "단지안내" },
  { id: "community", label: "주민공동시설" },
  // 세대안내: 자료 확보 후 추가 예정 (임시 주석)
  // { id: "floorplan", label: "세대안내" },
  { id: "environment", label: "입지분석" },
  { id: "devenv", label: "개발환경" },
  { id: "registration", label: "관심고객" },
];

export default function SideNav() {
  const activeSection = useUIStore((s) => s.activeSection);
  const { scrollY } = useScrollDirection();
  const scrollTo = useSmoothScroll();

  const visible = scrollY > 600 && activeSection !== "hero";

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-1 md:flex lg:right-8"
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="group flex items-center gap-3 py-1.5"
              >
                {/* Label - appears on hover or when active */}
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-300",
                    isActive
                      ? "bg-accent text-white"
                      : "translate-x-2 bg-white text-neutral-500 opacity-0 shadow-sm group-hover:translate-x-0 group-hover:opacity-100 dark:bg-neutral-800 dark:text-neutral-300"
                  )}
                >
                  {section.label}
                </span>

                {/* Dot */}
                <span
                  className={cn(
                    "relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-accent dark:border-accent-light"
                      : "border-neutral-300 group-hover:border-neutral-500 dark:border-neutral-600 dark:group-hover:border-neutral-400"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="sideNavDot"
                      className="h-1.5 w-1.5 rounded-full bg-accent dark:bg-accent-light"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
