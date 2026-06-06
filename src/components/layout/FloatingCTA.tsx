"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { PROJECT } from "@/data/project";

const HOURS_START = 9;
const HOURS_END = 18; // 18:00 까지 (18시는 종료)

function getKoreaHour(): number {
  const h = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    hour12: false,
  }).format(new Date());
  return parseInt(h, 10) || 0;
}

export default function FloatingCTA() {
  const { scrollY } = useScrollDirection();
  const scrollTo = useSmoothScroll();
  const visible = scrollY > 800;

  // 한국 시간 기준 운영시간 감지 (SSR-safe, 매분 갱신)
  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);
  useEffect(() => {
    const check = () => {
      const h = getKoreaHour();
      setIsOpenNow(h >= HOURS_START && h < HOURS_END);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  // 초기 SSR/하이드레이션 시에는 OPEN 상태로 가정(깜빡임 방지)
  const isOpen = isOpenNow ?? true;

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
            className="fixed bottom-6 right-6 z-30 hidden flex-col items-end gap-2.5 md:flex"
          >
            {/* Live status meta — Linear/Vercel/Anthropic 2026 pattern */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/85 px-3 py-1 text-[10px] font-medium tracking-[0.06em] text-neutral-700 shadow-sm backdrop-blur-md dark:border-neutral-800/80 dark:bg-neutral-900/85 dark:text-neutral-300">
              <span aria-hidden className="status-dot relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full ${isOpen ? "bg-emerald-500/30" : "bg-amber-500/30"}`} />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isOpen ? "bg-emerald-500" : "bg-amber-500"}`} />
              </span>
              {isOpen ? "지금 상담 가능 · 매일 09–18" : "상담 시간 외 · 등록 시 연락드립니다"}
            </div>

            <a
              href={`tel:${PROJECT.phone}`}
              className="group/cta relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-highlight px-5 py-3 text-[13px] font-semibold tracking-[0.04em] text-white shadow-lg shadow-highlight/25 ring-1 ring-inset ring-white/10 transition-all duration-300 hover:bg-highlight-dark hover:shadow-xl hover:shadow-highlight/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
            >
              <Phone size={14} strokeWidth={2.2} />
              <span className="tabular-nums">{PROJECT.phone}</span>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full"
              />
            </a>
            <button
              onClick={() => scrollTo("registration")}
              className="group inline-flex items-center gap-2 rounded-full bg-cta-register px-6 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-white shadow-lg shadow-cta-register/20 transition-colors hover:bg-cta-register-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-register"
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
            className="fixed bottom-0 left-0 right-0 z-30 flex flex-col md:hidden"
          >
            {/* 시간 외 안내 메시지 (전화 버튼은 그대로 유지) */}
            {!isOpen && (
              <div className="flex items-center justify-center gap-1.5 bg-neutral-900/95 py-1.5 text-[10px] font-medium tracking-[0.05em] text-amber-200 backdrop-blur-sm">
                <span aria-hidden className="h-1 w-1 rounded-full bg-amber-400" />
                상담 시간 외 (매일 09–18) · 등록 시 연락드립니다
              </div>
            )}
            <div className="flex">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
