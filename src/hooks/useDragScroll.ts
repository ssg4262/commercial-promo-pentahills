"use client";

import { useEffect, useRef } from "react";

/**
 * Horizontal drag-to-scroll + wheel-to-horizontal for a scrollable container.
 * - Mouse drag pans the container 1:1 and stops immediately on release
 * - Vertical wheel scrolls horizontally
 * - Touch / pen is left to the browser's native momentum scrolling (no interference)
 * - `consumeDrag()` returns true if the last gesture was a drag (use it to
 *   suppress the click that would otherwise fire on a child after dragging)
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    const onPointerDown = (e: PointerEvent) => {
      // Let touch / pen use the browser's native momentum scrolling.
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth) return;
      drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      const dx = e.clientX - d.startX;
      if (!d.moved && Math.abs(dx) > 4) {
        d.moved = true;
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      if (d.moved) el.scrollLeft = d.startScroll - dx;
    };

    const endDrag = (e: PointerEvent) => {
      if (el.hasPointerCapture?.(e.pointerId)) {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }
      drag.current.down = false;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("pointerleave", endDrag);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("pointerleave", endDrag);
    };
  }, []);

  const consumeDrag = () => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return true;
    }
    return false;
  };

  return { ref, consumeDrag };
}
