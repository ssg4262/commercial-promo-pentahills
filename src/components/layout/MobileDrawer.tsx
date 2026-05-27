"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone } from "lucide-react";
import { NAV_ITEMS } from "@/data/navigation";
import { PROJECT } from "@/data/project";
import { useUIStore } from "@/stores/useUIStore";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavClick: (id: string) => void;
}

export default function MobileDrawer({ isOpen, onClose, onNavClick }: MobileDrawerProps) {
  const activeSection = useUIStore((s) => s.activeSection);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-[280px] flex-col bg-white dark:bg-[#0a0a0a]"
          >
            <div className="flex h-14 items-center justify-end px-5">
              <button onClick={onClose} className="text-neutral-400 hover:text-black dark:hover:text-white" aria-label="닫기">
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            <nav className="flex flex-col px-5">
              {NAV_ITEMS.filter((i) => i.id !== "hero").map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavClick(item.id)}
                  className={`border-b border-neutral-100 py-4 text-left text-sm transition dark:border-neutral-800 ${
                    activeSection === item.id
                      ? "font-medium text-black dark:text-white"
                      : "text-neutral-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto p-5">
              <a
                href={`tel:${PROJECT.phone}`}
                className="flex items-center justify-center gap-2 bg-cta-phone py-3.5 text-[11px] font-medium uppercase tracking-[0.1em] text-white transition hover:bg-cta-phone-dark"
              >
                <Phone size={14} strokeWidth={1.5} />
                {PROJECT.phone}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
