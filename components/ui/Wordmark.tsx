import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({
  className,
  inverted,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("flex min-h-11 min-w-0 shrink flex-col justify-center leading-none", className)}
    >
      <span
        className={cn(
          "block font-serif text-[clamp(1.15rem,4.4vw,1.45rem)] font-medium tracking-[0.14em] sm:tracking-[0.18em]",
          inverted ? "text-ivory" : "text-ink",
        )}
      >
        PACIFIC
      </span>
      <span
        className={cn(
          "mt-1 block text-[9px] font-medium uppercase tracking-[0.22em] sm:tracking-[0.34em]",
          inverted ? "text-ivory/70" : "text-ink-muted",
        )}
      >
        Properties Goa
      </span>
    </Link>
  );
}
