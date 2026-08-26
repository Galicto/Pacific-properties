"use client";

import { IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { PropertyMediaFallback } from "@/components/property/PropertyMediaFallback";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Property } from "@/data/properties";
import { hasPhotography, listingGallery } from "@/data/properties";
import { useSwipe } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

const PropertyLightbox = dynamic(
  () =>
    import("@/components/property/PropertyLightbox").then(
      (mod) => mod.PropertyLightbox,
    ),
  { ssr: false },
);

const INITIAL_THUMBS = 5;

export function PropertyGallery({
  property,
}: {
  property: Property;
}) {
  const images = listingGallery(property);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const next = useCallback(() => {
    if (images.length === 0) return;
    setActive((value) => (value + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setActive((value) => (value - 1 + images.length) % images.length);
  }, [images.length]);

  const swipe = useSwipe(next, prev);

  if (!hasPhotography(property) || images.length === 0) {
    return (
      <PropertyMediaFallback
        property={property}
        className="aspect-[16/10] w-full"
      />
    );
  }

  const current = images[active];
  const thumbs = expanded ? images : images.slice(0, INITIAL_THUMBS);

  return (
    <div>
      {property.galleryTitle ? (
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-brass">
          {property.galleryTitle}
        </p>
      ) : null}
      <div className="relative" {...swipe}>
        <button
          type="button"
          className="relative block w-full overflow-hidden"
          onClick={() => setOpen(true)}
          aria-label={`Open gallery for ${property.title}`}
        >
          <SmartImage
            src={current.src}
            alt={current.alt}
            className="aspect-[16/10] w-full"
            sizes="(min-width: 1024px) 70vw, 100vw"
            quality={65}
          />
          {current.caption ? (
            <span className="absolute left-3 top-3 bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-ivory">
              {current.caption}
            </span>
          ) : null}
        </button>
        {images.length > 1 ? (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-3">
            <span className="pointer-events-auto">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/30 text-ivory"
              >
                <IconChevronLeft className="h-4 w-4" />
              </button>
            </span>
            <span className="pointer-events-auto">
              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/30 text-ivory"
              >
                <IconChevronRight className="h-4 w-4" />
              </button>
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {thumbs.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={cn(
              "relative h-16 min-h-11 w-24 min-w-11 shrink-0 overflow-hidden border",
              index === active ? "border-ink" : "border-transparent opacity-70",
            )}
          >
            <SmartImage
              src={image.src}
              alt=""
              className="h-full w-full"
              sizes="96px"
              quality={50}
            />
          </button>
        ))}
      </div>

      {images.length > INITIAL_THUMBS ? (
        <button
          type="button"
          onClick={() => {
            if (!expanded) {
              setExpanded(true);
              return;
            }
            setOpen(true);
          }}
          className="mt-4 min-h-11 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink"
        >
          {expanded
            ? `View all ${images.length} photographs`
            : `Load remaining photographs · ${images.length} in total`}
        </button>
      ) : null}

      {open ? (
        <PropertyLightbox
          images={images}
          title={property.title}
          active={active}
          onClose={() => setOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </div>
  );
}
