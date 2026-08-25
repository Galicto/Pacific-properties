import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const LOCKUP = siteConfig.brand.lockup;
const MARK = siteConfig.brand.markSize;

function LockupImage({
  inverted,
  priority,
  decorative,
  className,
}: {
  inverted?: boolean;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={inverted ? siteConfig.brand.logoOnDark : siteConfig.brand.logoOnLight}
      alt={decorative ? "" : "Pacific Properties"}
      width={LOCKUP.width}
      height={LOCKUP.height}
      priority={priority}
      unoptimized
      className={cn("h-full w-auto max-w-full object-contain object-left", className)}
    />
  );
}

function MarkImage({
  priority,
  decorative,
  className,
}: {
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={siteConfig.brand.mark}
      alt={decorative ? "" : "Pacific Properties"}
      width={MARK.width}
      height={MARK.height}
      priority={priority}
      unoptimized
      className={cn("h-full w-full object-contain", className)}
    />
  );
}

export function Wordmark({
  className,
  inverted,
  lockup,
  mark,
  priority,
  asLink = true,
}: {
  className?: string;
  /** Dark surface: white type lock-up. Light surface: ink type. */
  inverted?: boolean;
  /** Always the full lock-up (footer, menu). */
  lockup?: boolean;
  /** Square P-mark only (loading, compact chrome). */
  mark?: boolean;
  priority?: boolean;
  asLink?: boolean;
}) {
  const decorative = asLink;
  const inner = mark ? (
    <span className="block h-8 w-8 sm:h-9 sm:w-9">
      <MarkImage priority={priority} decorative={decorative} />
    </span>
  ) : lockup ? (
    <span className="block h-10 w-[122px] sm:h-11 sm:w-[134px]">
      <LockupImage inverted={inverted} priority={priority} decorative={decorative} />
    </span>
  ) : (
    <>
      <span className="block h-8 w-8 sm:hidden">
        <MarkImage priority={priority} decorative={decorative} />
      </span>
      <span className="hidden h-9 w-[110px] sm:block sm:h-10 sm:w-[122px]">
        <LockupImage inverted={inverted} priority={priority} decorative={decorative} />
      </span>
    </>
  );

  const classes = cn(
    "flex min-h-11 min-w-0 shrink-0 items-center",
    className,
  );

  if (!asLink) {
    return <span className={classes}>{inner}</span>;
  }

  return (
    <Link href="/" className={classes} aria-label="Pacific Properties">
      {inner}
    </Link>
  );
}
