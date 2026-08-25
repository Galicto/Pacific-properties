"use client";

import { CalculateEmiLink } from "@/components/emi/PropertyFinanceTeaser";
import { PropertyMediaFallback } from "@/components/property/PropertyMediaFallback";
import { SmartImage } from "@/components/ui/SmartImage";
import { IconArrowUpRight } from "@/components/ui/Icons";
import {
  categoryLabels,
  hasPhotography,
  offersEmi,
  type Property,
} from "@/data/properties";
import Link from "next/link";

function specLine(property: Property) {
  return [
    property.bedroomsDisplay,
    property.builtUpArea,
    property.plotArea,
    property.landArea,
    property.areaRange,
  ]
    .filter(Boolean)
    .join(" · ");
}

function statusBadge(property: Property) {
  if (property.status === "under-construction") return property.statusLabel;
  if (property.purpose === "For Rent") return "For Rent";
  if (property.category === "land") return "Land";
  if (property.purpose === "For Sale" && property.price === null) {
    return "Price on Request";
  }
  return null;
}

export function PropertyCard({
  property,
  layout = "grid",
}: {
  property: Property;
  layout?: "grid" | "list";
}) {
  const spec = specLine(property);
  const photo = hasPhotography(property);
  const badge = statusBadge(property);
  const emi = offersEmi(property) ? (
    <CalculateEmiLink
      property={{
        title: property.title,
        area: property.area,
        slug: property.slug,
        price: property.price,
      }}
      variant="link"
      className="mt-3 hidden min-h-11 px-0 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink sm:inline-flex"
    />
  ) : null;

  const media =
    photo ? (
      <SmartImage
        src={property.heroImage.src}
        alt={property.heroImage.alt}
        className={
          layout === "list"
            ? "aspect-[16/10] w-full rounded-[4px]"
            : "aspect-[4/5] w-full rounded-[4px]"
        }
        imageClassName="media-zoom"
        sizes={
          layout === "list"
            ? "(min-width: 768px) 40vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        quality={60}
      />
    ) : (
      <PropertyMediaFallback
        property={property}
        className={
          layout === "list"
            ? "aspect-[16/10] w-full rounded-[4px]"
            : "aspect-[4/5] w-full rounded-[4px]"
        }
      />
    );

  const badgeEl = badge ? (
    <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] bg-ink/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory">
      {badge}
    </span>
  ) : null;

  if (layout === "list") {
    return (
      <article className="border-b border-ink/10 py-8">
        <Link
          href={`/collection/${property.slug}`}
          className="group grid gap-5 md:grid-cols-12"
        >
          <div className="relative md:col-span-5">
            {badgeEl}
            {media}
          </div>
          <div className="media-shift flex min-w-0 flex-col justify-center md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
              {property.location} · {property.purpose}
            </p>
            <h3 className="mt-2 font-serif text-[clamp(1.4rem,3vw,1.85rem)] tracking-tight">
              {property.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted">{spec}</p>
            <p className="mt-4 font-serif text-xl">{property.priceDisplay}</p>
          </div>
        </Link>
        {emi}
      </article>
    );
  }

  return (
    <article>
      <Link href={`/collection/${property.slug}`} className="group block">
        <div className="relative">
          {badgeEl}
          {media}
        </div>
        <div className="media-shift flex items-start justify-between gap-3 pt-5">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {`${property.area} · ${categoryLabels[property.category]} · ${property.purpose}`}
            </p>
            <h3 className="mt-1 font-serif text-[clamp(1.25rem,2.4vw,1.6rem)] tracking-tight">
              {property.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{spec}</p>
            <p className="mt-3 font-serif text-xl">{property.priceDisplay}</p>
          </div>
          <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/40" />
        </div>
      </Link>
      {emi}
    </article>
  );
}
