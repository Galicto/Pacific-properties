import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const LOCKUP = siteConfig.brand.lockup;
const MARK = siteConfig.brand.markSize;

/**
 * The official lock-up / mark. One file, one colourway — never swapped,
 * inverted, filtered, blended, or recoloured. Surfaces behind it must stay
 * dark (ink, tide, photography) so the white wordmark remains intact.
 */
export function Logo({
  compact = false,
  size = "md",
  priority = false,
  asLink = true,
  className,
}: {
  compact?: boolean;
  size?: "sm" | "md" | "lg";
  priority?: boolean;
  asLink?: boolean;
  className?: string;
}) {
  const decorative = asLink;
  const inner = compact ? (
    <span className={cn("relative block shrink-0", markBox[size])}>
      <BrandImg
        svg={siteConfig.brand.markSvg}
        png={siteConfig.brand.mark}
        width={MARK.width}
        height={MARK.height}
        compact
        priority={priority}
        decorative={decorative}
      />
    </span>
  ) : (
    <span
      className={cn("relative block shrink-0", lockupBox[size])}
      style={{ aspectRatio: `${LOCKUP.width} / ${LOCKUP.height}` }}
    >
      <BrandImg
        svg={siteConfig.brand.logoSvg}
        png={siteConfig.brand.logo}
        width={LOCKUP.width}
        height={LOCKUP.height}
        priority={priority}
        decorative={decorative}
      />
    </span>
  );

  const classes = cn("inline-flex min-w-0 items-center", className);

  if (!asLink) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href="/" className={classes} aria-label="Pacific Properties">
      {inner}
    </Link>
  );
}

const lockupBox = {
  sm: "h-7 w-[11.67rem] sm:h-8 sm:w-[13.34rem]",
  md: "h-7 w-[11.67rem] sm:h-8 sm:w-[13.34rem] md:h-9 md:w-[15rem] lg:h-10 lg:w-[16.67rem]",
  lg: "h-8 w-[13.34rem] sm:h-9 sm:w-[15rem] md:h-10 md:w-[16.67rem] lg:h-11 lg:w-[18.34rem]",
} as const;

const markBox = {
  sm: "h-8 w-8",
  md: "h-10 w-10 sm:h-11 sm:w-11",
  lg: "h-12 w-12",
} as const;

function BrandImg({
  svg,
  png,
  width,
  height,
  compact = false,
  priority,
  decorative,
}: {
  svg: string;
  png: string;
  width: number;
  height: number;
  compact?: boolean;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <picture>
      <source srcSet={svg} type="image/svg+xml" />
      <img
        src={png}
        alt={decorative ? "" : "Pacific Properties"}
        width={width}
        height={height}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
        className={cn(
          "h-full w-full object-contain",
          compact ? "object-center" : "object-left",
        )}
      />
    </picture>
  );
}
