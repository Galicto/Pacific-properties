import { CollectionClient } from "@/components/property/CollectionClient";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Collection",
  description:
    "A considered collection of villas, residences, land and investment opportunities across Goa, represented by Pacific Properties Goa.",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initial = await searchParams;
  return (
    <>
      <section className="border-b border-ink/8 bg-ivory-deep/40 pb-20 pt-32">
        <Container>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
            Residences & land
          </p>
          <h1 className="mt-4 font-serif text-[clamp(2.4rem,8vw,4.4rem)] tracking-tight">
            The Collection
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-muted">
            A considered set of villas, residences, land and investment
            opportunities across Goa — introduced, not advertised.
          </p>
          <Link
            href="/emi-calculator"
            className="mt-10 inline-flex min-h-11 items-center text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Estimate monthly EMI
          </Link>
        </Container>
      </section>
      <CollectionClient key={JSON.stringify(initial)} initial={initial} />
    </>
  );
}
