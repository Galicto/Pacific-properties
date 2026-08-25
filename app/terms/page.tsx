import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Pacific Properties Goa website.",
};

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Terms">
        <p>Terms of use for the Pacific Properties Goa website.</p>
      </PageIntro>
      <Container className="max-w-3xl pb-24 pt-12 sm:pt-16">
      <p className="text-base leading-relaxed text-ink-muted">
        The pages of this website are for general information. Listings,
        prices and availability are indicative and may change. Nothing here
        constitutes an offer, a valuation, or legal advice. Property in Goa
        should be approached with independent due diligence.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        Listing photography is drawn from verified property stills, or shown
        as a private-preview treatment where approved photography is not yet
        available. Homepage films currently use licensed stock until Pacific
        Properties Goa’s own films are published. All original copy and the
        Pacific Properties Goa wordmark remain the property of the practice.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        A fuller terms of use will replace this page before public launch.
      </p>
      <p className="mt-10 text-sm text-ink-muted">
        <Link href="/privacy" className="underline-offset-4 hover:underline">
          Privacy notes
        </Link>
      </p>
    </Container>
    </>
  );
}
