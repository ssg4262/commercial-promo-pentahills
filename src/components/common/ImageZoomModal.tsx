"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { getImagePath } from "@/lib/utils";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export default function ImageZoomModal({ isOpen, onClose, src, alt }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);

  const handleClose = useCallback(() => {
    setScale(1);
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={handleClose}
        >
          <div className="absolute right-4 top-4 flex gap-1 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(s - 0.5, 0.5)); }}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="축소"
            >
              <ZoomOut size={16} strokeWidth={1} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(s + 0.5, 3)); }}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="확대"
            >
              <ZoomIn size={16} strokeWidth={1} />
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="닫기"
            >
              <X size={16} strokeWidth={1} />
            </button>
          </div>

          <motion.img
            src={getImagePath(src)}
            alt={alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            style={{ scale }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
