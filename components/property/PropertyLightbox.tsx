"use client";

import {
  IconChevronLeft,
  IconChevronRight,
  IconClose,
} from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { PropertyImage } from "@/data/properties";
import { useFocusTrap, useSwipe } from "@/lib/hooks";
import { useEffect, useRef } from "react";

export function PropertyLightbox({
  images,
  title,
  active,
  onClose,
  onPrev,
  onNext,
}: {
  images: PropertyImage[];
  title: string;
  active: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const swipe = useSwipe(onNext, onPrev);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, dialogRef);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-ivory"
      onClick={onClose}
      {...swipe}
    >
      <div
        className="flex items-center justify-between px-5 py-4"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="min-w-0 truncate pr-4 text-[11px] uppercase tracking-[0.2em] text-ivory/60">
          {title} · {active + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20"
        >
          <IconClose className="h-4 w-4" />
        </button>
      </div>
      <div
        className="relative flex flex-1 items-center justify-center px-4 pb-10 sm:px-12"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 sm:left-4"
        >
          <IconChevronLeft className="h-5 w-5" />
        </button>
        <div
          className="relative h-full w-full max-w-5xl"
          onClick={(event) => event.stopPropagation()}
        >
          <SmartImage
            src={images[active].src}
            alt={images[active].alt}
            className="h-full w-full bg-transparent"
            imageClassName="object-contain"
            sizes="90vw"
            quality={75}
          />
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 sm:right-4"
        >
          <IconChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
