import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-32">
      <p className="text-[11px] uppercase tracking-[0.28em] text-brass">404</p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight sm:text-6xl">
        This address is not in the collection.
      </h1>
      <p className="mt-5 max-w-md text-ink-muted">
        The page may have moved, or the residence is no longer offered
        publicly. We can still help you find what fits.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/collection" variant="dark">
          View the Collection
        </ButtonLink>
        <Link
          href="/contact"
          className="inline-flex items-center px-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink"
        >
          Speak to an advisor
        </Link>
      </div>
    </Container>
  );
}
