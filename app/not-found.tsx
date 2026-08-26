import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-32">
      <Logo compact size="md" className="mb-10" />
      <p className="text-[11px] uppercase tracking-[0.28em] text-brass">404</p>
      <h1 className="mt-4 max-w-3xl font-serif text-[clamp(2rem,8vw,3.75rem)] leading-[1.1] tracking-tight">
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
          className="inline-flex min-h-11 items-center px-2 text-[11px] uppercase tracking-[0.18em] text-ink-muted hover:text-ink"
        >
          Speak to an advisor
        </Link>
      </div>
    </Container>
  );
}
