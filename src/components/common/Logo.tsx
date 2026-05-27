"use client";

import { cn, getImagePath } from "@/lib/utils";

interface LogoProps {
  className?: string;
  light?: boolean;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: 28,
  md: 36,
  lg: 56,
};

export default function Logo({ className, size = "sm" }: LogoProps) {
  const h = SIZES[size];

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={getImagePath("/images/logo/logo-horizontal.png")}
        alt="펜타힐즈 더블유 스퀘어"
        className="block w-auto object-contain"
        style={{ height: h }}
      />
    </div>
  );
}
