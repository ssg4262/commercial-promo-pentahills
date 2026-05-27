"use client";

import { useState, useEffect } from "react";
import { Phone, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/data/navigation";
import { PROJECT } from "@/data/project";
import { useUIStore } from "@/stores/useUIStore";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import MobileDrawer from "./MobileDrawer";
import Logo from "@/components/common/Logo";

export default function Header() {
  const { direction, scrollY } = useScrollDirection();
  const activeSection = useUIStore((s) => s.activeSection);
  const scrollTo = useSmoothScroll();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isScrolled = scrollY > 80;
  const isHidden = false;
  const isOverHero = scrollY < (typeof window !== "undefined" ? window.innerHeight - 100 : 600);

  const handleNav = (id: string) => {
    scrollTo(id);
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isHidden && "-translate-y-full",
          isScrolled
            ? "bg-white/90 backdrop-blur-md dark:bg-black/90"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 md:h-16 md:px-8">
          {/* Logo */}
          <button onClick={() => handleNav("hero")}>
            <Logo light={!isScrolled && isOverHero} size="md" />
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.filter((item) => item.id !== "hero").map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={cn(
                  "relative text-[14px] font-semibold tracking-[0.05em] transition-colors",
                  isScrolled || !isOverHero
                    ? "text-neutral-500 hover:text-black"
                    : "text-white/60 hover:text-white",
                  activeSection === item.id && (isScrolled || !isOverHero
                    ? "!font-bold text-accent"
                    : "!font-bold text-white")
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${PROJECT.phone}`}
              className={cn(
                "hidden items-center gap-1.5 text-[16px] font-bold tracking-wider transition sm:flex",
                "hidden items-center gap-1.5 text-[16px] font-bold tracking-wider transition sm:flex",
                isScrolled || !isOverHero
                  ? "text-accent hover:text-accent-dark"
                  : "text-white hover:text-accent-light"
              )}
            >
              <Phone size={13} strokeWidth={2} />
              {PROJECT.phone}
            </a>

            <button
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "p-1.5 lg:hidden",
                isScrolled || !isOverHero ? "text-black dark:text-white" : "text-white"
              )}
              aria-label="메뉴"
            >
              <Menu size={20} strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Bottom line when scrolled */}
        {isScrolled && <div className="h-px bg-neutral-100 dark:bg-neutral-800" />}
      </header>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} onNavClick={handleNav} />
    </>
  );
}
