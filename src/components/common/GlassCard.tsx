"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-neutral-200 bg-white p-6",
        "dark:border-neutral-800 dark:bg-neutral-900",
        hover && "transition-all duration-300 hover:border-neutral-300 hover:shadow-sm dark:hover:border-neutral-700",
        className
      )}
    >
      {children}
    </div>
  );
}
