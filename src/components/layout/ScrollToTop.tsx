"use client";

import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function ScrollToTop() {
  const { scrollY } = useScrollDirection();
  const scrollTo = useSmoothScroll();

  return (
    <AnimatePresence>
      {scrollY > 600 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => scrollTo("hero")}
          className="fixed bottom-[142px] right-6 z-30 border border-neutral-200 bg-white p-2.5 text-neutral-500 shadow-sm transition hover:border-black hover:text-black dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-white dark:hover:text-white rounded"
          aria-label="맨 위로"
        >
          <ArrowUp size={14} strokeWidth={1} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
