"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  id,
  children,
  className,
  title,
  subtitle,
  dark = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 md:py-32",
        dark
          ? "bg-[#0a0a0a] text-white"
          : "bg-white dark:bg-[#0a0a0a] dark:text-white",
        className
      )}
    >
      <div className="mx-auto max-w-7xl section-padding">
        {(title || subtitle) && (
          <div className="mb-10 md:mb-20">
            {subtitle && (
              <span className={cn("label-caps mb-4 block", dark ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400")}>
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className={cn("heading-display text-[35px] md:text-[45px] lg:text-[57px]", dark ? "text-white" : "text-neutral-900 dark:text-white")}>
                {title}
              </h2>
            )}
            <div className="mt-6 h-px w-12 bg-accent" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
