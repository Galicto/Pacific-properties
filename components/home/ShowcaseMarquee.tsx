"use client";

import { marqueeImages, type MarqueeImage } from "@/data/marquee";
import { useInView, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";

const widths: Record<MarqueeImage["width"], string> = {
  narrow: "w-[168px] sm:w-[240px] md:w-[260px]",
  regular: "w-[220px] sm:w-[320px] md:w-[360px]",
  wide: "w-[260px] sm:w-[400px] md:w-[460px]",
};

export function ShowcaseMarquee() {
  const reduce = usePrefersReducedMotion();
  const top = marqueeImages.filter((_, i) => i % 2 === 0);
  const bottom = marqueeImages.filter((_, i) => i % 2 === 1);

  return (
    <section className="cv-auto overflow-hidden border-t border-ink/8 py-20 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-7 text-center sm:px-8 lg:px-12">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
          A life in Goa
        </p>
        <h2 className="mt-4 font-serif text-[clamp(1.75rem,4.6vw,3.1rem)] leading-[1.1]">
          Elegance, shaped by Goa.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink-muted">
          Spaces made for slower mornings, longer evenings and a life
          beautifully lived.
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-14">
        <Row images={top} direction="right" staticRow={reduce} />
        <Row images={bottom} direction="left" staticRow={reduce} />
      </div>
    </section>
  );
}

function Row({
  images,
  direction,
  staticRow,
}: {
  images: MarqueeImage[];
  direction: "left" | "right";
  staticRow: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("80px 0px");
  const running = !staticRow && inView;

  return (
    <div ref={ref} className="marquee-row" tabIndex={0}>
      <div
        className={cn(
          "flex",
          !staticRow &&
            (direction === "left" ? "marquee-track-left" : "marquee-track-right"),
          running && "is-running",
        )}
      >
        <div className="flex gap-3 px-2 sm:gap-4">
          <Set images={images} />
        </div>
        <div
          className="hidden gap-3 px-2 md:flex sm:gap-4"
          aria-hidden="true"
        >
          <Set images={images} decorative />
        </div>
      </div>
    </div>
  );
}

function Set({
  images,
  decorative,
}: {
  images: MarqueeImage[];
  decorative?: boolean;
}) {
  return (
    <>
      {images.map((image, index) => (
        <div
          key={`${decorative ? "dup" : "src"}-${image.src}-${index}`}
          className={cn(
            "marquee-card relative h-[180px] shrink-0 overflow-hidden rounded-xl sm:h-[260px] md:h-[300px]",
            widths[image.width],
          )}
        >
          <SmartImage
            src={image.src}
            alt={decorative ? "" : image.alt}
            className="h-full w-full"
            sizes="(min-width: 768px) 460px, 260px"
            quality={55}
          />
        </div>
      ))}
    </>
  );
}
