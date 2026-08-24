import { CalculateEmiLink } from "@/components/emi/PropertyFinanceTeaser";
import { SmartImage } from "@/components/ui/SmartImage";
import { IconArrowUpRight } from "@/components/ui/Icons";
import { categoryLabels, type Property } from "@/data/properties";
import Link from "next/link";

export function PropertyCard({
  property,
  layout = "grid",
}: {
  property: Property;
  layout?: "grid" | "list";
}) {
  const spec = [
    property.bedrooms ? `${property.bedrooms} Bed` : null,
    property.builtUpArea,
    property.landArea && !property.bedrooms ? property.landArea : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const emi = (
    <CalculateEmiLink
      property={{
        title: property.title,
        area: property.area,
        slug: property.slug,
        price: property.price,
      }}
      variant="link"
      className="mt-3 min-h-11 px-0 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink"
    />
  );

  if (layout === "list") {
    return (
      <article className="border-b border-ink/10 py-8">
        <Link
          href={`/collection/${property.slug}`}
          className="group grid gap-5 md:grid-cols-12"
        >
          <SmartImage
            src={property.images[0].src}
            alt={property.images[0].alt}
            className="aspect-[16/10] md:col-span-5"
            imageClassName="media-zoom"
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={60}
          />
          <div className="media-shift flex flex-col justify-center md:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
              {property.location}
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
        <SmartImage
          src={property.images[0].src}
          alt={property.images[0].alt}
          className="aspect-[4/5] w-full"
          imageClassName="media-zoom"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={60}
        />
        <div className="media-shift flex items-start justify-between gap-3 pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {property.area} · {categoryLabels[property.category]}
            </p>
            <h3 className="mt-1 font-serif text-[clamp(1.25rem,2.4vw,1.6rem)] tracking-tight">
              {property.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{spec}</p>
            <p className="mt-3 text-sm">{property.priceDisplay}</p>
          </div>
          <IconArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/40" />
        </div>
      </Link>
      {emi}
    </article>
  );
}
