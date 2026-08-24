import { PropertyFinanceTeaser } from "@/components/emi/PropertyFinanceTeaser";
import { PropertyActions } from "@/components/property/PropertyActions";
import { PropertyEnquiry } from "@/components/property/PropertyEnquiry";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { RelatedProperties } from "@/components/property/RelatedProperties";
import { Container } from "@/components/ui/Container";
import { IconArrowLeft, IconArrowRight, IconPin } from "@/components/ui/Icons";
import { LazyMap } from "@/components/media/LazyMap";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  categoryLabels,
  getAdjacentProperties,
  getPropertyBySlug,
  getRelatedProperties,
  properties,
} from "@/data/properties";
import { propertyJsonLd } from "@/lib/schema";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Residence" };
  return {
    title: `${property.title}, ${property.area}`,
    description: property.shortDescription,
    openGraph: {
      title: `${property.title} | Pacific Properties Goa`,
      description: property.shortDescription,
      images: [{ url: property.images[0].src, alt: property.images[0].alt }],
    },
  };
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

  const facts = [
    { label: "Bedrooms", value: property.bedrooms?.toString() ?? "—" },
    { label: "Bathrooms", value: property.bathrooms?.toString() ?? "—" },
    { label: "Built-up", value: property.builtUpArea ?? "—" },
    { label: "Land", value: property.landArea ?? "—" },
    { label: "Parking", value: property.parking ?? "—" },
    { label: "Status", value: property.statusLabel },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative h-[58vh] min-h-[18rem] bg-ink sm:h-[72vh] sm:min-h-[28rem]">
        <SmartImage
          src={property.images[0].src}
          alt={property.images[0].alt}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
          quality={65}
          objectPosition="center 40%"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/30" />
        <div className="absolute bottom-10 left-5 right-5 sm:left-8 lg:left-12">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.18em] text-ivory/70"
          >
            <Link href="/collection" className="hover:text-ivory">
              Collection
            </Link>
            <span className="mx-2 text-ivory/40">/</span>
            <Link
              href={`/collection?type=${property.category}`}
              className="hover:text-ivory"
            >
              {categoryLabels[property.category]}
            </Link>
            <span className="mx-2 text-ivory/40">/</span>
            <span className="text-ivory">{property.title}</span>
          </nav>
        </div>
      </section>

      <Container className="pt-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
          {categoryLabels[property.category]} · {property.statusLabel}
        </p>
        <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="mt-3 break-words font-serif text-[clamp(1.85rem,7vw,3.75rem)] tracking-tight">
              {property.title}
            </h1>
            <p className="mt-3 flex items-center gap-2 text-ink-muted">
              <IconPin className="h-4 w-4 text-brass" />
              {property.location}
            </p>
          </div>
          <div>
            <p className="font-serif text-3xl sm:text-4xl">{property.priceDisplay}</p>
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
          </div>
        </div>
      </Container>

      <PropertyActions
        title={property.title}
        area={property.area}
        slug={property.slug}
        price={property.price}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PropertyGallery images={property.images} title={property.title} />

            <dl className="mt-10 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-ivory px-4 py-5">
                  <dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 font-serif text-xl">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-ink-muted">
              {property.longDescription.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <PropertyFinanceTeaser
              property={{
                title: property.title,
                area: property.area,
                location: property.location,
                slug: property.slug,
                price: property.price,
              }}
            />
          </div>
        </div>
      </Container>

      <Container className="mt-16 lg:mt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h2 className="font-serif text-2xl">Features</h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  {property.features.map((item) => (
                    <li key={item} className="border-t border-ink/8 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-serif text-2xl">Amenities</h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  {property.amenities.map((item) => (
                    <li key={item} className="border-t border-ink/8 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="mt-16">
              <h2 className="font-serif text-3xl">The Location</h2>
              <p className="mt-3 max-w-xl text-sm text-ink-muted">
                {property.location}. Nearby: {property.nearbyHighlights[0]}.
              </p>
              <div className="mt-6 overflow-hidden border border-ink/10 bg-ivory-deep">
                {property.mapEmbedUrl ? (
                  <LazyMap
                    src={property.mapEmbedUrl}
                    title={`Map of ${property.title} in ${property.area}`}
                    heightClass="h-[320px] sm:h-[360px]"
                  />
                ) : (
                  <div className="flex h-[320px] items-center justify-center px-6 text-center text-sm text-ink-muted">
                    Map embed not yet configured — set mapEmbedUrl on this listing.
                  </div>
                )}
              </div>
              <ul className="mt-6 space-y-2 text-sm text-ink-muted">
                {property.nearbyHighlights.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <PropertyEnquiry
                title={property.title}
                area={property.area}
                slug={property.slug}
              />
            </div>
          </div>
        </div>

        <RelatedProperties properties={related} />

        <nav className="flex items-center justify-between border-t border-ink/10 py-10">
          {prev ? (
            <Link
              href={`/collection/${prev.slug}`}
              className="group flex max-w-[45%] items-center gap-3"
            >
              <IconArrowLeft className="h-4 w-4" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Previous
                </span>
                <span className="font-serif text-xl group-hover:text-brass">
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
              className="group flex max-w-[45%] items-center justify-end gap-3 text-right"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  Next
                </span>
                <span className="font-serif text-xl group-hover:text-brass">
                  {next.title}
                </span>
              </span>
              <IconArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </nav>
      </Container>
    </>
  );
}
