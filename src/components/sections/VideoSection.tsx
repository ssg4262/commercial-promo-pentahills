"use client";

import { useEffect, useRef } from "react";
import { cn, getImagePath } from "@/lib/utils";
import RevealOnScroll from "@/components/common/RevealOnScroll";

interface VideoSectionProps {
  id?: string;
  title: string;
  subtitle: string;
  src: string;
  poster?: string;
  dark?: boolean;
}

export default function VideoSection({
  id,
  title,
  subtitle,
  src,
  poster,
  dark = false,
}: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // React가 muted 속성을 DOM에 못 붙이는 버그 보완 → 자동재생 허용
    v.muted = true;
    v.defaultMuted = true;

    const tryPlay = () => v.play().catch(() => {});
    // 화면에 보일 때 재생, 벗어나면 일시정지 (대역폭 절약 + 자동재생 트리거)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else v.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    tryPlay();
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      className={cn(
        "relative",
        dark ? "bg-[#0a0a0a]" : "bg-white"
      )}
    >
      {/* Title bar */}
      <div className={cn(
        "py-10 md:py-14",
        dark ? "bg-[#0a0a0a]" : "bg-white"
      )}>
        <div className="mx-auto max-w-7xl section-padding">
          <RevealOnScroll>
            <span className={cn(
              "label-caps mb-3 block",
              dark ? "text-neutral-400" : "text-neutral-500"
            )}>
              {subtitle}
            </span>
            <h2 className={cn(
              "heading-display text-xl md:text-3xl lg:text-4xl",
              dark ? "text-white" : "text-neutral-900"
            )}>
              {title}
            </h2>
            <div className="mt-5 h-px w-12 bg-accent" />
          </RevealOnScroll>
        </div>
      </div>

      {/* Full-width video — edge-to-edge on mobile */}
      <div className="pb-10 md:mx-auto md:max-w-6xl md:section-padding">
        <video
          ref={videoRef}
          src={getImagePath(src)}
          poster={poster ? getImagePath(poster) : undefined}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          className="w-full"
        />
      </div>
    </section>
  );
}
