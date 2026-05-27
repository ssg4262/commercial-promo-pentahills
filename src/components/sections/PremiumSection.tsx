"use client";

import {
  Building2, Train, TreePine, Shield, Dumbbell, GraduationCap, Sparkles, TrendingUp,
} from "lucide-react";
import { PREMIUM_ITEMS } from "@/data/premium";
import SectionWrapper from "./SectionWrapper";
import RevealOnScroll from "@/components/common/RevealOnScroll";

const ICON_MAP: Record<string, React.ElementType> = {
  Building2, Train, TreePine, Shield, Dumbbell, GraduationCap, Sparkles, TrendingUp,
};

export default function PremiumSection() {
  return (
    <SectionWrapper
      id="premium"
      title="프리미엄"
      subtitle="Premium"
      dark
    >
      <div className="grid grid-cols-1 gap-px bg-neutral-800 sm:grid-cols-2 lg:grid-cols-4">
        {PREMIUM_ITEMS.map((item, i) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <RevealOnScroll key={item.id} delay={i * 0.06}>
              <div className="group bg-[#0a0a0a] p-8 transition-colors hover:bg-neutral-900/80">
                <div className="mb-6 flex h-10 w-10 items-center justify-center border border-neutral-700 transition-colors group-hover:border-accent-light">
                  {Icon && <Icon size={18} strokeWidth={1} className="text-accent-light transition group-hover:text-white" />}
                </div>
                <h3 className="mb-3 text-sm font-semibold tracking-tight text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-400">{item.description}</p>
              </div>
            </RevealOnScroll>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
