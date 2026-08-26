import { PropertyFinanceTeaser } from "@/components/emi/PropertyFinanceTeaser";
import { PropertyActions } from "@/components/property/PropertyActions";
import { PropertyTrustStrip } from "@/components/brand/TrustLines";
import { PropertyEnquiry } from "@/components/property/PropertyEnquiry";
import { PropertyFilm } from "@/components/property/PropertyFilm";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertyPlans } from "@/components/property/PropertyPlans";
import { PropertyUnits } from "@/components/property/PropertyUnits";
import { PropertyMediaFallback } from "@/components/property/PropertyMediaFallback";
import { RelatedProperties } from "@/components/property/RelatedProperties";
import { Container } from "@/components/ui/Container";
import { IconArrowLeft, IconArrowRight, IconPin } from "@/components/ui/Icons";
import { LazyMap } from "@/components/media/LazyMap";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  getAdjacentProperties,
  getPropertyBySlug,
  getRelatedProperties,
  hasPhotography,
  offersEmi,
  properties,
  type Property,
} from "@/data/properties";
import { propertyJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Residence" };
  const og = hasPhotography(property)
    ? property.heroImage.src
    : siteConfig.ogImage;
  const title = property.title.toLowerCase().includes(property.area.toLowerCase())
    ? property.title
    : `${property.title}, ${property.area}`;
  return {
    title,
    description: property.shortDescription,
    openGraph: {
      title: `${property.title} | Pacific Properties Goa`,
      description: property.shortDescription,
      images: [{ url: og, alt: property.heroImage.alt }],
    },
  };
}

function factRows(property: Property) {
  const rows: { label: string; value: string }[] = [
    { label: "Type", value: property.propertyType },
    { label: "Purpose", value: property.purpose },
    {
      label: "Status",
      value: property.statusLabel,
    },
  ];
  if (property.bedroomsDisplay) {
    rows.push({ label: "Bedrooms", value: property.bedroomsDisplay });
  }
  if (
    property.bathrooms != null &&
    property.category !== "land" &&
    property.category !== "commercial"
  ) {
    rows.push({
      label: "Bathrooms",
      value: String(property.bathrooms),
    });
  }
  if (property.builtUpArea) {
    rows.push({ label: "Built-up Area", value: property.builtUpArea });
  }
  if (property.plotArea) {
    rows.push({ label: "Plot", value: property.plotArea });
  }
  if (property.landArea) {
    rows.push({ label: "Land", value: property.landArea });
  }
  if (property.areaRange) {
    rows.push({ label: "Area", value: property.areaRange });
  }
  if (property.communitySize) {
    rows.push({ label: "Community", value: property.communitySize });
  }
  if (property.roadAccess) {
    rows.push({ label: "Road Access", value: property.roadAccess });
  }
  if (property.parking) {
    rows.push({ label: "Parking", value: property.parking });
  }
  if (property.possession) {
    rows.push({ label: "Possession", value: property.possession });
  }
  if (property.rent) {
    rows.push({ label: "Rent", value: property.rent });
  }
  if (property.furnishing) {
    rows.push({ label: "Furnishing", value: property.furnishing });
  }
  if (property.reraNumber) {
    rows.push({ label: "RERA", value: property.reraNumber });
  } else if (property.reraDisplay) {
    rows.push({ label: "RERA", value: property.reraDisplay });
  }
  return rows;
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const related = getRelatedProperties(property);
  const { prev, next } = getAdjacentProperties(property.slug);
  const jsonLd = propertyJsonLd(property);
  const facts = factRows(property);
  const photography = hasPhotography(property);
  const emi = offersEmi(property);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative h-[58vh] min-h-[18rem] bg-ink sm:h-[72vh] sm:min-h-[28rem]">
        {photography ? (
          <SmartImage
            src={property.heroImage.src}
            alt={property.heroImage.alt}
            className="absolute inset-0 h-full w-full"
            sizes="100vw"
            priority
            quality={65}
            objectPosition="center 40%"
          />
        ) : (
          <PropertyMediaFallback
            property={property}
            className="absolute inset-0 h-full w-full"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/30" />
        {property.status === "under-construction" ? (
          <p className="absolute left-7 top-[calc(5.5rem+env(safe-area-inset-top))] bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory sm:left-8 lg:left-12">
            {property.statusLabel}
          </p>
        ) : property.collectionGroup === "new-launches" ? (
          <p className="absolute left-7 top-[calc(5.5rem+env(safe-area-inset-top))] bg-ink/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-ivory sm:left-8 lg:left-12">
            New Launch
          </p>
        ) : null}
        <div className="absolute bottom-10 left-7 right-7 sm:left-8 lg:left-12">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.14em] text-ivory/70 sm:tracking-[0.18em]"
          >
            <Link href="/collection" className="hover:text-ivory">
              Collection
            </Link>
            <span className="mx-2 text-ivory/40">/</span>
            <span className="break-words text-ivory">{property.title}</span>
          </nav>
        </div>
      </section>

      <Container className="pt-14">
        <p className="text-[11px] uppercase tracking-[0.18em] text-brass sm:tracking-[0.22em]">
          {property.propertyType} · {property.purpose} · {property.statusLabel}
        </p>
        <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <h1 className="break-words font-serif text-[clamp(2.1rem,8vw,3.75rem)] tracking-tight">
              {property.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-ink-muted">
              <IconPin className="h-4 w-4 text-brass" />
              {property.location}
            </p>
          </div>
          <div>
            <p className="font-serif text-[1.85rem] leading-tight sm:text-4xl">
              {property.priceDisplay}
            </p>
            {property.pricePositioning ? (
              <p className="mt-1 text-sm text-ink-muted">
                {property.pricePositioning}
              </p>
            ) : null}
            {emi ? (
              <PropertyFinanceTeaser
                compact
                property={{
                  title: property.title,
                  area: property.area,
                  location: property.location,
                  slug: property.slug,
                  price: property.price,
                }}
              />
            ) : null}
          </div>
        </div>
      </Container>

      <PropertyActions
        title={property.title}
        area={property.location}
        slug={property.slug}
        enquiryText={property.whatsAppEnquiryText}
        ctaLabel={property.ctaLabel}
        price={property.price}
      />

      <Container className="pb-8 pt-4 lg:pb-24 lg:pt-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            {property.video ? (
              <div className="mb-8">
                <PropertyFilm video={property.video} title={property.title} />
              </div>
            ) : null}
            <PropertyGallery property={property} />
            <PropertyPlans property={property} />

            <dl className="mt-12 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="min-w-0 bg-ivory px-4 py-5 sm:px-5 sm:py-6">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 break-words font-serif text-lg sm:text-xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <PropertyTrustStrip className="mt-8" />

            <div className="mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-ink-muted">
              {property.longDescription.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            {property.availabilityDisclaimer && !property.units?.length ? (
              <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">
                {property.availabilityDisclaimer}
              </p>
            ) : null}

            <PropertyUnits property={property} />

            {emi ? (
              <PropertyFinanceTeaser
                property={{
                  title: property.title,
                  area: property.area,
                  location: property.location,
                  slug: property.slug,
                  price: property.price,
                }}
              />
            ) : null}

            {property.amenities.length > 0 ? (
              <div className="mt-16">
                <h2 className="font-serif text-2xl">Amenities</h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  {property.amenities.map((item) => (
                    <li key={item} className="border-t border-ink/8 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <section className="mt-16">
              <h2 className="scroll-mt-28 font-serif text-3xl">The Location</h2>
              <p className="mt-3 max-w-xl text-sm text-ink-muted">
                {property.location}
              </p>
              {property.locationNote ? (
                <p className="mt-2 max-w-xl text-sm text-ink-muted">
                  {property.locationNote}
                </p>
              ) : null}
              <div className="mt-6 overflow-hidden rounded-[4px] border border-ink/10 bg-ivory-deep">
                {property.mapEmbedUrl ? (
                  <LazyMap
                    src={property.mapEmbedUrl}
                    title={`Map of ${property.title} in ${property.area}`}
                    heightClass="h-[320px] sm:h-[360px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center px-6 text-center text-sm text-ink-muted">
                    Map available on request.
                  </div>
                )}
              </div>
              {property.nearbyHighlights.length > 0 ? (
                <ul className="mt-6 space-y-2 text-sm text-ink-muted">
                  {property.nearbyHighlights.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          </div>

          <div className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-28">
              <PropertyEnquiry
                title={property.title}
                area={property.location}
                slug={property.slug}
                enquiryText={property.whatsAppEnquiryText}
                enquiryPrompt={property.enquiryPrompt}
              />
            </div>
          </div>
        </div>

        <RelatedProperties properties={related} />

        <nav className="flex items-center justify-between gap-4 border-t border-ink/10 py-10">
          {prev ? (
            <Link
              href={`/collection/${prev.slug}`}
              className="group flex min-w-0 max-w-[48%] items-center gap-3"
            >
              <IconArrowLeft className="h-4 w-4 shrink-0" />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Previous
                </span>
                <span className="block truncate font-serif text-lg sm:text-xl group-hover:text-brass">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/collection/${next.slug}`}
              className="group flex min-w-0 max-w-[48%] items-center justify-end gap-3 text-right"
            >
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Next
                </span>
                <span className="block truncate font-serif text-lg sm:text-xl group-hover:text-brass">
                  {next.title}
                </span>
              </span>
              <IconArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          ) : null}
        </nav>
      </Container>
    </>
  );
}
