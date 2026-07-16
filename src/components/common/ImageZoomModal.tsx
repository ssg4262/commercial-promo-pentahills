"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { getImagePath } from "@/lib/utils";

interface ImageZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

const MAX_SCALE = 6;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export default function ImageZoomModal({ isOpen, onClose, src, alt }: ImageZoomModalProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // 화면에 맞춘 기본 표시 크기(px) + 그 위에 곱해지는 배율 s, 위치 tx/ty
  const [baseW, setBaseW] = useState(0);
  const [baseH, setBaseH] = useState(0);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);

  // 이미지를 뷰포트에 맞춰 중앙 배치 (원본 해상도 유지: transform scale만 사용)
  const fitToView = useCallback(() => {
    const img = imgRef.current;
    if (!img || !img.naturalWidth) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const fit = Math.min((vw * 0.92) / img.naturalWidth, (vh * 0.88) / img.naturalHeight);
    const bw = img.naturalWidth * fit;
    const bh = img.naturalHeight * fit;
    setBaseW(bw);
    setBaseH(bh);
    setScale(1);
    setTx((vw - bw) / 2);
    setTy((vh - bh) / 2);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // 이미지 로드 이후에도 대비해 두 번 시도
      const id = requestAnimationFrame(fitToView);
      window.addEventListener("resize", fitToView);
      return () => {
        cancelAnimationFrame(id);
        window.removeEventListener("resize", fitToView);
      };
    }
  }, [isOpen, src, fitToView]);

  // ESC 닫기
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // 커서 기준 휠 줌 (원본 대비 최대 배율까지 선명 유지)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const factor = e.deltaY < 0 ? 1.18 : 1 / 1.18;
      setScale((s) => {
        const ns = clamp(s * factor, 1, MAX_SCALE);
        const r = ns / s;
        setTx((x) => mx - (mx - x) * r);
        setTy((y) => my - (my - y) * r);
        return ns;
      });
    },
    []
  );

  // 버튼 줌 (중앙 기준)
  const zoomAtCenter = useCallback(
    (dir: 1 | -1) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const mx = rect.width / 2;
      const my = rect.height / 2;
      const factor = dir === 1 ? 1.4 : 1 / 1.4;
      setScale((s) => {
        const ns = clamp(s * factor, 1, MAX_SCALE);
        const r = ns / s;
        setTx((x) => mx - (mx - x) * r);
        setTy((y) => my - (my - y) * r);
        return ns;
      });
    },
    []
  );

  // 드래그 팬
  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, tx, ty };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setTx(drag.current.tx + (e.clientX - drag.current.x));
    setTy(drag.current.ty + (e.clientY - drag.current.y));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    drag.current = null;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={stageRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-hidden bg-black/95"
          onClick={onClose}
          onWheel={handleWheel}
        >
          <div className="absolute right-4 top-4 z-10 flex gap-1">
            <button
              onClick={(e) => { e.stopPropagation(); zoomAtCenter(-1); }}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="축소"
            >
              <ZoomOut size={16} strokeWidth={1} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); zoomAtCenter(1); }}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="확대"
            >
              <ZoomIn size={16} strokeWidth={1} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-white/40 transition hover:text-white"
              aria-label="닫기"
            >
              <X size={16} strokeWidth={1} />
            </button>
          </div>

          {/* 조작 안내 */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-wide text-white/60 backdrop-blur-sm">
            휠 확대 · 드래그 이동 · 더블클릭 초기화
          </div>

          <img
            ref={imgRef}
            src={getImagePath(src)}
            alt={alt}
            onLoad={fitToView}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => { e.stopPropagation(); fitToView(); }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            draggable={false}
            className="absolute left-0 top-0 max-w-none select-none"
            style={{
              width: baseW || "auto",
              height: baseH || "auto",
              transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
              transformOrigin: "0 0",
              cursor: scale > 1 ? "grab" : "default",
              visibility: baseW > 0 ? "visible" : "hidden",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
