"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { h: 28, w: 97 },
  md: { h: 36, w: 125 },
  lg: { h: 56, w: 195 },
};

export default function Logo({ className, size = "sm" }: LogoProps) {
  const { h, w } = SIZES[size];

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/images/logo/logo-horizontal.png"
        alt="펜타힐즈 더블유 스퀘어"
        width={w}
        height={h}
        priority
        className="object-contain"
        style={{ height: h, width: "auto" }}
      />
    </div>
  );
}
