import { SmartImage } from "@/components/ui/SmartImage";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export function PropertyMediaFallback({
  property,
  className,
  tone = "dark",
}: {
  property: Pick<Property, "title" | "mediaFallbackText" | "heroImage">;
  className?: string;
  tone?: "dark" | "light";
}) {
  const message =
    property.mediaFallbackText ?? "Private preview available on request";
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        dark ? "bg-ink" : "bg-ivory-deep",
        className,
      )}
    >
      <SmartImage
        src={property.heroImage.src}
        alt=""
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover"
        sizes="(min-width: 1024px) 60vw, 100vw"
        quality={55}
      />
      <div
        className={cn(
          "absolute inset-0",
          dark ? "bg-ink/55" : "bg-ivory/55",
        )}
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center px-6 py-12 text-center",
          dark ? "text-ivory" : "text-ink",
        )}
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
          Photography
        </p>
        <p className="mt-4 max-w-md font-serif text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.15]">
          {message}
        </p>
        <p
          className={cn(
            "mt-4 max-w-sm text-sm",
            dark ? "text-ivory/70" : "text-ink-muted",
          )}
        >
          {property.title}
        </p>
      </div>
    </div>
  );
}
