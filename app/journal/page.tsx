import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { journalArticles } from "@/data/journal";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on living, land and neighbourhoods in Goa, from Pacific Properties Goa.",
};

export default function JournalPage() {
  if (journalArticles.length === 0) {
    return (
      <>
        <PageIntro
          eyebrow="Journal"
          title="Notes from Goa"
          image="/properties/aldona-twin-villas/09.webp"
          imageAlt="Private swimming pool and deck at the Aldona twin villas."
        >
          <p>
            Editorial notes will appear here. In the meantime, we are glad to
            begin with a conversation.
          </p>
        </PageIntro>
        <Container className="pb-24 pt-16">
          <ButtonLink href="/contact" variant="dark">
            Start a Private Enquiry
          </ButtonLink>
        </Container>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="Notes from Goa"
        image="/properties/aldona-twin-villas/09.webp"
        imageAlt="Private swimming pool and deck at the Aldona twin villas."
      >
        <p>
          Short essays on neighbourhoods, land and the quieter work of choosing
          a house. These notes are a beginning — not a magazine, and not advice
          in place of due diligence.
        </p>
      </PageIntro>

      <Container className="pb-24 pt-16 lg:pt-20">
        <div className="grid gap-14 lg:grid-cols-3 lg:gap-10">
          {journalArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group flex flex-col"
            >
              <SmartImage
                src={article.image}
                alt={article.imageAlt}
                className="aspect-[4/3] w-full rounded-[4px]"
                imageClassName="duration-1000 group-hover:scale-[1.04]"
                sizes="(min-width: 1024px) 30vw, 100vw"
              />
              <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-brass">
                {article.eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-[clamp(1.45rem,3vw,1.85rem)] leading-[1.15] tracking-tight group-hover:text-forest">
                {article.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {article.excerpt}
              </p>
              <span className="mt-5 inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.16em] text-ink-muted group-hover:text-ink">
                Read note
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
