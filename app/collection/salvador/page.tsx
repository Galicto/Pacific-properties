import { PageIntro } from "@/components/layout/PageIntro";
import { PropertyCard } from "@/components/property/PropertyCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getSalvadorProperties } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salvador Collection",
  description:
    "3 BHK apartments and private pool villas in Salvador, Goa, represented by Pacific Properties Goa.",
};

export default function SalvadorCollectionPage() {
  const listings = getSalvadorProperties();
  const apartments = listings.filter((item) => item.category === "apartment");
  const villas = listings.filter((item) => item.category === "villa");
  const hero = apartments[0]?.heroImage;

  return (
    <>
      <PageIntro
        eyebrow="Salvador, Goa"
        title="The Salvador Collection"
        image={hero?.src}
        imageAlt={hero?.alt}
      >
        <p>
          Eight 3 BHK apartments and two private pool villas in Salvador, Goa.
          Prices are negotiable. Prices and availability are subject to
          confirmation.
        </p>
      </PageIntro>

      <Container className="py-16 lg:py-20">
        <section>
          <div className="flex flex-col justify-between gap-4 border-b border-brass/30 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
                Apartments
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.85rem,4vw,2.6rem)] tracking-tight">
                3 BHK Apartments in Salvador
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Eight residences, with floor-wise starting prices from the
                Upper Ground Floor to the Third Floor.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-16 lg:grid-cols-12">
            {apartments.map((property) => (
              <div key={property.id} className="lg:col-span-7">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 border-t border-ink/10 pt-16">
          <div className="flex flex-col justify-between gap-4 border-b border-brass/30 pb-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
                Villas
              </p>
              <h2 className="mt-3 font-serif text-[clamp(1.85rem,4vw,2.6rem)] tracking-tight">
                Private Pool Villas in Salvador
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Two villas, each with a private pool, listed by built-up area
                and asking price.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2">
            {villas.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        <div className="mt-20 flex flex-col gap-4 border-t border-ink/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-ink-muted">
            Prices and availability are subject to confirmation.
          </p>
          <ButtonLink href="/collection" variant="ghostInk" className="w-fit">
            View the full collection
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
