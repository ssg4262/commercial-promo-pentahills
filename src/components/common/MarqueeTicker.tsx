"use client";

import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
}

export default function MarqueeTicker({
  items,
  className,
  speed = 30,
  separator = "·",
}: MarqueeTickerProps) {
  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-flex"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        <span className="pr-4">{content}</span>
        <span className="pr-4">{content}</span>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
