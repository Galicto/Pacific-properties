import { EmiCalculator } from "@/components/emi/EmiCalculator";
import { PageIntro } from "@/components/layout/PageIntro";
import { emiStateFromQuery } from "@/lib/emi";
import { findPropertyForEmi } from "@/data/properties";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description:
    "Indicative home loan EMI estimates for property in Goa — calculated privately in your browser.",
};

export default async function EmiCalculatorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    const single = Array.isArray(value) ? value[0] : value;
    if (single) query.set(key, single);
  }

  const listed = findPropertyForEmi({
    slug: query.get("slug"),
    title: query.get("property"),
  });
  const seeded = emiStateFromQuery(query, listed?.price ?? null);
  const title = listed?.title || seeded.propertyTitle;
  const location = listed?.location || seeded.propertyLocation;

  return (
    <>
      <PageIntro
        eyebrow="Home loan estimate"
        title="Plan your purchase with clarity."
      >
        <p>
          An indicative EMI estimate for your next property decision. No
          personal details required. Figures are calculated in your browser
          and are not a lender quote.
        </p>
      </PageIntro>
      <section className="overflow-x-clip bg-ivory pb-20 lg:pb-24">
        <div className="mx-auto w-full min-w-0 max-w-[1240px] px-7 sm:px-8 lg:px-12">
          <EmiCalculator
            propertyPrice={seeded.propertyPrice || listed?.price || null}
            propertyTitle={title}
            propertySlug={seeded.propertySlug || listed?.slug}
            propertyLocation={location}
          />
        </div>
      </section>
    </>
  );
}
