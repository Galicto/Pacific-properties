import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { getArticleBySlug, journalArticles } from "@/data/journal";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Journal" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <article className="pb-24 pt-32">
      <Container className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
          <Link href="/journal" className="hover:text-ink">
            Journal
          </Link>{" "}
          · {article.eyebrow} · {article.readTime}
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-ink-muted">{article.date}</p>
      </Container>
      <Container className="mt-10">
        <SmartImage
          src={article.image}
          alt={article.imageAlt}
          className="aspect-[16/9] w-full"
          sizes="100vw"
          priority
        />
      </Container>
      <Container className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-ink-muted">
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 20)}>{paragraph}</p>
        ))}
      </Container>
    </article>
  );
}
