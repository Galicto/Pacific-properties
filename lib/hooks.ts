"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { prefersReducedMotion } from "@/lib/media";

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
}

export function useInViewOnce<T extends HTMLElement>(
  margin = "0px 0px -8% 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      queueMicrotask(() => setInView(true));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: margin, threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, inView };
}

export function useInView<T extends HTMLElement>(
  margin = "200px 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin, threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return { ref, inView };
}

export function useFocusTrap(
  active: boolean,
  containerRef: RefObject<HTMLElement | null>,
  autoFocus = true,
) {
  useEffect(() => {
    if (!active) return;
    const root = containerRef.current;
    if (!root) return;

    const selectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      [...root.querySelectorAll<HTMLElement>(selectors)].filter(
        (el) => !el.hasAttribute("disabled") && el.getClientRects().length > 0,
      );

    if (autoFocus) {
      focusables()[0]?.focus();
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const list = focusables();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, autoFocus, containerRef]);
}

export function useSwipe(
  onLeft: () => void,
  onRight: () => void,
  threshold = 48,
) {
  const startX = useRef(0);
  const startY = useRef(0);

  return {
    onTouchStart: (event: React.TouchEvent) => {
      startX.current = event.touches[0].clientX;
      startY.current = event.touches[0].clientY;
    },
    onTouchEnd: (event: React.TouchEvent) => {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
      if (dx < 0) onLeft();
      else onRight();
    },
  };
}
