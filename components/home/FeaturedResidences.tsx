"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconPin,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  categoryLabels,
  getFeaturedProperties,
  type Property,
  type PropertyCategory,
} from "@/data/properties";
import { useFavourites } from "@/lib/favourites";
import { useSwipe } from "@/lib/hooks";
import { propertyWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const tabs: { id: "all" | PropertyCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "villa", label: "Villas" },
  { id: "apartment", label: "Apartments" },
  { id: "land", label: "Land" },
  { id: "commercial", label: "Commercial" },
  { id: "investment", label: "Investment" },
];

export function FeaturedResidences() {
  const all = getFeaturedProperties();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [selected, setSelected] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const { has, toggle } = useFavourites();

  const filtered = useMemo(() => {
    if (tab === "all") return all;
    return all.filter((property) => property.category === tab);
  }, [all, tab]);

  const property: Property | undefined = filtered[selected] ?? filtered[0];

  const selectTab = (id: (typeof tabs)[number]["id"]) => {
    setTab(id);
    setSelected(0);
    setImageIndex(0);
  };

  const images = property?.images ?? [];
  const nextImage = () =>
    setImageIndex((value) => (value + 1) % Math.max(images.length, 1));
  const prevImage = () =>
    setImageIndex(
      (value) => (value - 1 + images.length) % Math.max(images.length, 1),
    );
  const swipe = useSwipe(nextImage, prevImage);

  if (!property) {
    return (
      <section className="cv-auto border-t border-ink/8 py-24 lg:py-32">
        <Container>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
            Selected Residences
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.1]">
            A considered collection of homes and opportunities across Goa.
          </h2>
          <div
            className="mt-12 flex gap-2 overflow-x-auto no-scrollbar border-b border-ink/10"
            role="tablist"
            aria-label="Property types"
          >
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={tab === item.id}
                onClick={() => selectTab(item.id)}
                className={cn(
                  "min-h-11 shrink-0 border-b-2 px-3 text-[11px] tracking-[0.12em] sm:px-4 sm:uppercase sm:tracking-[0.18em]",
                  tab === item.id
                    ? "border-ink text-ink"
                    : "border-transparent text-ink-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-12 max-w-md text-sm text-ink-muted">
            Nothing in this category is on the collection just now. Browse all
            residences, or speak with an advisor.
          </p>
        </Container>
      </section>
    );
  }

  const saved = has(property.id);

  return (
    <section className="cv-auto border-t border-ink/8 py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-brass">
                Selected Residences
              </p>
              <h2 className="mt-4 font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.1]">
                A considered collection of homes and opportunities across Goa.
              </h2>
            </div>
            <ButtonLink href="/collection" variant="ghostInk" className="w-fit">
              View all properties
            </ButtonLink>
          </div>
        </Reveal>

        <div
          className="mt-12 flex gap-2 overflow-x-auto no-scrollbar border-b border-ink/10"
          role="tablist"
          aria-label="Property types"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => selectTab(item.id)}
              className={cn(
                "min-h-11 shrink-0 border-b-2 px-3 text-[11px] tracking-[0.12em] sm:px-4 sm:uppercase sm:tracking-[0.18em] transition-colors duration-300",
                tab === item.id
                  ? "border-ink text-ink"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-7">
            <div
              className="relative overflow-hidden rounded-[4px]"
              {...swipe}
            >
              <SmartImage
                key={`${property.slug}-${imageIndex}`}
                src={images[imageIndex].src}
                alt={images[imageIndex].alt}
                className="aspect-[4/3] w-full lg:aspect-[5/4]"
                sizes="(min-width: 1024px) 55vw, 100vw"
                quality={65}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <p className="text-[11px] tracking-[0.16em] text-ivory">
                  {String(imageIndex + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/45 text-ivory transition-colors duration-300 hover:bg-ink/60"
                  >
                    <IconChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/45 text-ivory transition-colors duration-300 hover:bg-ink/60"
                  >
                    <IconChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggle(property.id)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save residence"}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 bg-ink/45 text-ivory"
              >
                <IconHeart className="h-4 w-4" filled={saved} />
              </button>
            </div>
            {filtered.length > 1 ? (
              <div className="mt-4 flex gap-2">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    onClick={() => {
                      setSelected(i);
                      setImageIndex(0);
                    }}
                    className="h-11 flex-1"
                  >
                    <span
                      className={cn(
                        "block h-1.5 rounded-full transition-colors duration-300",
                        i === selected ? "bg-ink" : "bg-ink/15",
                      )}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
              {categoryLabels[property.category]}
            </p>
            <h3 className="mt-3 font-serif text-[clamp(1.85rem,4vw,3rem)] tracking-tight">
              {property.title}
            </h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-muted">
              <IconPin className="h-4 w-4 text-brass" />
              {property.location}
            </p>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              {property.shortDescription}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10">
              <Fact
                label="Bedrooms"
                value={property.bedrooms ? `${property.bedrooms}` : "—"}
              />
              <Fact label="Built-up" value={property.builtUpArea ?? "—"} />
              <Fact label="Land" value={property.landArea ?? "—"} />
              <Fact label="Price" value={property.priceDisplay} />
            </dl>

            <div className="mt-10 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`/collection/${property.slug}`} variant="dark">
                View Property
              </ButtonLink>
              <ButtonLink
                href={propertyWhatsAppUrl(property.title, property.area)}
                variant="ghostInk"
                external
                className="hidden sm:inline-flex"
              >
                Enquire Privately
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-ivory px-5 py-5">
      <dt className="text-[10px] uppercase tracking-[0.18em] text-ink-muted">
        {label}
      </dt>
      <dd className="mt-1 font-serif text-xl text-ink">{value}</dd>
    </div>
  );
}
