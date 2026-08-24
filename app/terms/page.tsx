import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Pacific Properties Goa website.",
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl pb-24 pt-32">
      <h1 className="font-serif text-5xl tracking-tight">Terms</h1>
      <p className="mt-8 text-sm leading-relaxed text-ink-muted">
        The pages of this website are for general information. Listings,
        prices and availability are indicative and may change. Nothing here
        constitutes an offer, a valuation, or legal advice. Property in Goa
        should be approached with independent due diligence.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        Photographs currently include licensed stock used as placeholders
        until Pacific Properties Goa’s own photography is in place. All
        original copy and the Pacific Properties Goa wordmark remain the
        property of the practice. This page will be replaced with a full
        terms of use before public launch.
      </p>
    </Container>
  );
}
