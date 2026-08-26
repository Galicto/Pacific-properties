import { Logo } from "@/components/brand/Logo";
import { CredentialsContactLine } from "@/components/brand/TrustLines";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { LazyMap } from "@/components/media/LazyMap";
import { getPropertyBySlug } from "@/data/properties";
import { siteConfig } from "@/lib/config";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a confidential conversation with Pacific Properties Goa — buying, selling, investing, or simply exploring Goa.",
};

const serviceAreas = [
  { name: "North Goa", note: "Aldona, Pilerne, Saipem, Reis Magos, Ucassaim." },
  { name: "Central Goa", note: "Dona Paula." },
  { name: "South Goa", note: "Verna — warehouse and commercial space." },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const slug = Array.isArray(params.property)
    ? params.property[0]
    : params.property;
  const property = slug ? getPropertyBySlug(slug) : undefined;

  return (
    <>
      <section className="grid min-h-[100svh] lg:grid-cols-2">
        <div
          className="relative z-[21] flex flex-col justify-center bg-ink px-7 pb-16 pt-32 text-ivory sm:px-10 lg:px-16"
          style={{ colorScheme: "dark" }}
        >
          <Logo size="lg" asLink={false} className="mb-10" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
            Enquire
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.3rem,7vw,3.75rem)] tracking-tight">
            Let us find what fits.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ivory/70">
            Whether you are buying, selling, investing or simply exploring
            Goa, start with a confidential conversation.
          </p>

          <div className="mt-12 flex flex-col gap-5">
            <ButtonLink href={defaultWhatsAppUrl} variant="primary" external className="w-full sm:w-auto">
              WhatsApp
            </ButtonLink>
            <div className="flex gap-3">
              <a
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="mt-14 max-w-lg">
            <EnquiryForm
              dark
              propertyTitle={property?.title}
              propertySlug={property?.slug}
            />
            <CredentialsContactLine />
          </div>
        </div>

        <div className="relative min-h-[55vh] bg-forest lg:min-h-full">
          <LazyMap
            src={siteConfig.mapEmbedUrl}
            title="Pacific Properties Goa — Assagao, North Goa"
            previewSrc={siteConfig.mapPreview}
            previewAlt="Map of Assagao, Bardez, North Goa"
            mapsUrl={siteConfig.mapPlaceUrl}
            className="absolute inset-0"
            heightClass="h-full min-h-[55vh] lg:min-h-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
            preload
          />
          <div className="absolute bottom-8 left-6 right-6 max-w-sm border border-ivory/15 bg-ink/85 p-7 text-ivory md:bottom-8 md:left-8 md:right-8">
            <p className="text-[11px] uppercase tracking-[0.2em] text-brass-soft">
              By appointment
            </p>
            <p className="mt-3 font-serif text-2xl">{siteConfig.companyName}</p>
            <p className="mt-2 text-sm text-ivory/70">
              {siteConfig.address.display}
            </p>
            <p className="mt-4 text-sm text-ivory/70">{siteConfig.email}</p>
            <p className="text-sm text-ivory/70">{siteConfig.phoneDisplay}</p>
          </div>
        </div>
      </section>

      <Container className="py-20">
        <h2 className="font-serif text-3xl">Service areas</h2>
        <p className="mt-3 text-sm text-ink-muted">
          By appointment across Goa. New launches appear in the collection;
          exact localities are confirmed with you when they are not yet
          verified for publication.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {serviceAreas.map((area) => (
            <div key={area.name} className="border-t border-ink/10 pt-6">
              <h3 className="font-serif text-2xl">{area.name}</h3>
              <p className="mt-3 text-sm text-ink-muted">{area.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
