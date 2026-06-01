"use client";

import { Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { PROJECT } from "@/data/project";

export default function FloatingCTA() {
  const { scrollY } = useScrollDirection();
  const scrollTo = useSmoothScroll();
  const visible = scrollY > 800;

  return (
    <>
      {/* Desktop: 우측 하단 — 가로 정렬, 동일 높이·일관된 라운드 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-30 hidden flex-col gap-2 md:flex"
          >
            <a
              href={`tel:${PROJECT.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-highlight px-6 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-white shadow-xl shadow-highlight/25 transition-colors hover:bg-highlight-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            >
              <Phone size={14} strokeWidth={2} />
              전화상담
            </a>
            <button
              onClick={() => scrollTo("registration")}
              className="group inline-flex items-center gap-2 rounded-full bg-cta-register px-6 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-white shadow-xl shadow-cta-register/25 transition-colors hover:bg-cta-register-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-register"
            >
              관심고객 등록
              <ArrowRight
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile: 하단 고정 바 */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-30 flex md:hidden"
          >
            <a
              href={`tel:${PROJECT.phone}`}
              className="flex flex-1 items-center justify-center gap-2 bg-highlight py-4 text-xs font-semibold text-white transition active:bg-highlight-dark"
            >
              <Phone size={15} strokeWidth={2} />
              전화상담
            </a>
            <button
              onClick={() => scrollTo("registration")}
              className="group flex flex-1 items-center justify-center gap-2 bg-cta-register py-4 text-xs font-semibold text-white transition active:bg-cta-register-dark"
            >
              관심고객 등록
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
