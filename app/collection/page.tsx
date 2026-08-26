import { CollectionClient } from "@/components/property/CollectionClient";
import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "Villas, residences, land and commercial space across Goa, represented by Pacific Properties Goa.",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = await searchParams;
  return (
    <>
      <PageIntro
        eyebrow="Residences, land & commercial"
        title="The Collection"
        image="/properties/ocean-cloud/02.webp"
        imageAlt="Ocean Cloud — sea-facing residences with curved balconies and a rooftop deck."
      >
        <p>
          Current inventory from Pacific Properties Goa — apartments,
          penthouses, villas, land and warehouse space across Goa.
        </p>
        <ButtonLink
          href="/emi-calculator"
          variant="ghost"
          className="mt-8 w-fit border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory/10"
        >
          Estimate monthly EMI
        </ButtonLink>
      </PageIntro>
      <CollectionClient key={JSON.stringify(initial)} initial={initial} />
    </>
  );
}
