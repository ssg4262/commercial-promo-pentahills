"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Phone } from "lucide-react";
import { cn, getImagePath } from "@/lib/utils";
import { PROJECT } from "@/data/project";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const SLIDES = [
  {
    number: "01",
    image: "/images/hero/hero-01.jpg",
    title: "호수공원을 품은\n대한민국 대표 쇼핑테마도시",
    sub: PROJECT.name,
    desc: "6만 3천여 세대 배후의 초거대 상권을 선점하라",
  },
  {
    number: "02",
    image: "/images/hero/hero-02.jpg",
    title: "이색적인 호수의 낭만\n수변 라이프몰",
    sub: "Lake Side Mall",
    desc: "3만 3천평 중산호수공원을 품은 대구·경북 유일의 수변 문화복합몰",
  },
  {
    number: "03",
    image: "/images/hero/hero-03.jpg",
    title: "경산의 새로운\n랜드마크 복합단지",
    sub: "Pentahills W Square",
    desc: "지하 6층 ~ 지상 59층, 18개동 3,443세대 대규모 주상복합",
  },
];

const SLIDE_DURATION = 7000;

export default function HeroSection() {
  const scrollTo = useSmoothScroll();
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (SLIDES.length <= 1) return;
    const id = setInterval(() => {
      setSelected((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  const multi = SLIDES.length > 1;

  return (
    <section id="hero" className="relative h-[100svh] bg-black overflow-hidden text-[15px]">
      {/* Background image carousel — CSS cross-fade (robust, no rAF dependency) */}
      {SLIDES.map((slide, i) => (
        <img
          key={i}
          src={getImagePath(slide.image)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: selected === i ? 1 : 0 }}
        />
      ))}
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/65" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end pb-36 md:items-center md:pb-0">
        <div className="w-full section-padding">
          <div className="mx-auto max-w-7xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Eyebrow */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 flex items-center gap-6"
                >
                  <span className="text-[10px] font-light tracking-[0.3em] text-white/60">
                    {SLIDES[selected].number}
                  </span>
                  <div className="h-px w-16 bg-white/20" />
                  <span className="text-[10px] font-light tracking-[0.2em] text-white/60 uppercase">
                    {SLIDES[selected].sub}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="heading-display mb-8 whitespace-pre-line text-white text-[clamp(2.4rem,6.5vw,6rem)]"
                >
                  {SLIDES[selected].title}
                </motion.h1>

                {/* Desc */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-12 max-w-md text-sm font-light leading-relaxed text-white/70 md:text-base"
                >
                  {SLIDES[selected].desc}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <button
                    onClick={() => scrollTo("registration")}
                    className="bg-accent px-8 py-4 text-[13px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-accent-dark"
                  >
                    관심고객 등록
                  </button>
                  <a
                    href={`tel:${PROJECT.phone}`}
                    className="flex items-center gap-2 bg-cta-phone px-8 py-4 text-sm font-semibold tracking-[0.12em] text-white shadow-lg shadow-cta-phone/30 transition-all hover:bg-cta-phone-dark"
                  >
                    <Phone size={14} strokeWidth={2} />
                    {PROJECT.phone}
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom progress — only with multiple slides */}
      {multi && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="flex">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="group relative flex-1 py-6"
              >
                <div className="h-px w-full bg-white/5">
                  <motion.div
                    key={`${i}-${selected}`}
                    className="h-full bg-accent-light"
                    initial={{ width: "0%" }}
                    animate={{ width: selected === i ? "100%" : "0%" }}
                    transition={{ duration: selected === i ? SLIDE_DURATION / 1000 : 0.3, ease: "linear" }}
                  />
                </div>
                <span className={cn(
                  "absolute bottom-1.5 left-0 text-[9px] font-light tracking-wider transition",
                  selected === i ? "text-white/80" : "text-white/50"
                )}>
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Side indicators — only with multiple slides */}
      {multi && (
        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex md:right-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "transition-all duration-500",
                selected === i ? "h-12 w-px bg-white/60" : "h-6 w-px bg-white/20 hover:bg-white/20"
              )}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll down */}
      <motion.button
        onClick={() => scrollTo("overview")}
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-white/50 transition hover:text-white/30"
        aria-label="스크롤"
      >
        <ArrowDown size={16} strokeWidth={1} />
      </motion.button>
    </section>
  );
}
