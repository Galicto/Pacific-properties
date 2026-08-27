import { SmartImage } from "@/components/ui/SmartImage";
import type { Property } from "@/data/properties";
import { cn } from "@/lib/utils";

export function PropertyMediaFallback({
  property,
  className,
}: {
  property: Pick<Property, "title" | "mediaFallbackText" | "heroImage">;
  className?: string;
}) {
  const label = property.mediaFallbackText ?? "Available on Request";

  return (
    <div className={cn("relative overflow-hidden bg-ivory-deep", className)}>
      <SmartImage
        src={property.heroImage.src}
        alt={property.heroImage.alt || property.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="object-cover"
        sizes="(min-width: 1024px) 60vw, 100vw"
        quality={60}
        objectPosition="center 40%"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-ink/15" />
      <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] bg-ink/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory">
        {label}
      </span>
    </div>
  );
}
