"use client";

import { IconClose } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { CredentialCard } from "@/lib/credentials";
import { useFocusTrap } from "@/lib/hooks";
import { useEffect, useRef } from "react";

export function CertificateViewer({
  card,
  onClose,
}: {
  card: CredentialCard;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(true, dialogRef);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 text-ivory sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(92vh,56rem)] w-full max-w-4xl flex-col border border-ivory/15 bg-tide/80 shadow-[0_0_80px_rgba(196,174,120,0.12)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p
              id="certificate-title"
              className="font-serif text-xl text-ivory sm:text-2xl"
            >
              {card.title}
            </p>
            <p className="mt-1 text-sm text-ivory/65">{card.body}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory/20"
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="border border-ivory/10 bg-ivory p-2 sm:p-3">
            <SmartImage
              src={card.preview}
              alt={card.previewAlt}
              className="aspect-[3/2] w-full bg-ivory sm:aspect-[4/3]"
              imageClassName="object-contain"
              sizes="(min-width: 1024px) 70vw, 100vw"
              quality={75}
            />
          </div>
          <a
            href={card.document}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.16em] text-brass-soft transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none"
          >
            Open original document
          </a>
        </div>
      </div>
    </div>
  );
}
