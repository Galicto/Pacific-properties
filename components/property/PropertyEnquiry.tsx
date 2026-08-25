"use client";

import { PropertyEnquiryTrust } from "@/components/brand/TrustLines";
import { ButtonLink } from "@/components/ui/Button";
import { propertyWhatsAppUrl } from "@/lib/whatsapp";
import dynamic from "next/dynamic";

const EnquiryForm = dynamic(
  () =>
    import("@/components/contact/EnquiryForm").then((mod) => mod.EnquiryForm),
  {
    loading: () => (
      <div className="h-72 bg-ivory-deep" aria-hidden="true" />
    ),
  },
);

export function PropertyEnquiry({
  title,
  area,
  slug,
  enquiryText,
}: {
  title: string;
  area: string;
  slug: string;
  enquiryText?: string;
}) {
  return (
    <aside className="border border-ink/10 bg-ivory-deep/50 p-7 sm:p-8">
      <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
        Private Enquiry
      </p>
      <h2 className="mt-3 font-serif text-[clamp(1.6rem,3vw,1.9rem)] tracking-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Ask for the booklet, a viewing, or a confidential conversation about
        this property.
      </p>
      <ButtonLink
        href={propertyWhatsAppUrl(title, area, enquiryText)}
        variant="dark"
        external
        className="mt-6 w-full"
      >
        Message on WhatsApp
      </ButtonLink>
      <PropertyEnquiryTrust />
      <div className="mt-8 border-t border-ink/10 pt-8">
        <EnquiryForm compact propertyTitle={title} propertySlug={slug} />
      </div>
    </aside>
  );
}
