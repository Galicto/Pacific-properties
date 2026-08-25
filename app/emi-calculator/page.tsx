import { EmiCalculator } from "@/components/emi/EmiCalculator";
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
  const location =
    listed?.location || seeded.propertyLocation;

  return (
    <>
      <section className="overflow-x-clip bg-ivory pb-14 pt-32">
        <div className="mx-auto w-full min-w-0 max-w-[1240px] px-7 sm:px-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-brass sm:tracking-[0.28em]">
            Home loan estimate
          </p>
          <h1 className="mt-5 max-w-3xl break-words font-serif text-[clamp(2rem,8vw,3.8rem)] leading-[1.1] tracking-tight">
            Plan your purchase with clarity.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
            An indicative EMI estimate for your next property decision. No
            personal details required.
          </p>
        </div>
      </section>
      <section className="overflow-x-clip bg-ivory pb-20 lg:pb-24">
        <div className="mx-auto w-full min-w-0 max-w-[1240px] px-7 sm:px-8">
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
