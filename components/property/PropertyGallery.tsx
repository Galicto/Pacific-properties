"use client";

import { IconChevronLeft, IconChevronRight } from "@/components/ui/Icons";
import { SmartImage } from "@/components/ui/SmartImage";
import type { PropertyImage } from "@/data/properties";
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

export function PropertyGallery({
  images,
  title,
}: {
  images: PropertyImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(() => {
    setActive((value) => (value + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setActive((value) => (value - 1 + images.length) % images.length);
  }, [images.length]);

  const swipe = useSwipe(next, prev);

  return (
    <div>
      <div className="relative" {...swipe}>
        <button
          type="button"
          className="relative block w-full overflow-hidden"
          onClick={() => setOpen(true)}
          aria-label={`Open gallery for ${title}`}
        >
          <SmartImage
            src={images[active].src}
            alt={images[active].alt}
            className="aspect-[16/10] w-full"
            sizes="(min-width: 1024px) 70vw, 100vw"
            quality={65}
          />
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-between px-3 sm:hidden">
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
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === active}
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

      {open ? (
        <PropertyLightbox
          images={images}
          title={title}
          active={active}
          onClose={() => setOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </div>
  );
}
