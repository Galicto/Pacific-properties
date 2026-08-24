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
  return (
    <Container className="pb-24 pt-32">
      <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
        Journal
      </p>
      <h1 className="mt-4 font-serif text-[clamp(2.4rem,8vw,3.75rem)] tracking-tight">
        Notes from Goa
      </h1>
      <p className="mt-5 max-w-xl text-base text-ink-muted">
        Short essays on neighbourhoods, land and the quieter work of choosing
        a house. This is a beginning — not a magazine.
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        {journalArticles.map((article) => (
          <Link key={article.slug} href={`/journal/${article.slug}`} className="group">
            <SmartImage
              src={article.image}
              alt={article.imageAlt}
              className="aspect-[4/3] w-full"
              imageClassName="duration-1000 group-hover:scale-[1.04]"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
            <p className="mt-5 text-[11px] uppercase tracking-[0.18em] text-brass">
              {article.eyebrow} · {article.date}
            </p>
            <h2 className="mt-2 font-serif text-2xl tracking-tight group-hover:text-forest">
              {article.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
