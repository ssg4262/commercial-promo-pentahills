"use client";

import RevealOnScroll from "@/components/common/RevealOnScroll";

interface DividerSectionProps {
  quote: string;
  author?: string;
}

export default function DividerSection({ quote, author }: DividerSectionProps) {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] py-16 md:py-32">
      {/* Decorative elements */}
      <div className="absolute left-[10%] top-1/2 h-px w-[25%] -translate-y-1/2 bg-gradient-to-r from-transparent to-white/5" />
      <div className="absolute right-[10%] top-1/2 h-px w-[25%] -translate-y-1/2 bg-gradient-to-l from-transparent to-white/5" />

      <RevealOnScroll>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="heading-display text-xl leading-relaxed text-white md:text-2xl lg:text-3xl">
            {quote}
          </p>
          {author && (
            <span className="mt-6 block text-[11px] font-light tracking-[0.2em] text-white/60 uppercase">
              {author}
            </span>
          )}
        </div>
      </RevealOnScroll>
    </div>
  );
}
