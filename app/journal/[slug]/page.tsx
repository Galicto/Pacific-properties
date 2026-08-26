import { PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getArticleBySlug, journalArticles } from "@/data/journal";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return journalArticles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

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
    openGraph: {
      title: `${article.title} | Pacific Properties Goa`,
      description: article.excerpt,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
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

  const related = journalArticles.filter((item) => item.slug !== article.slug);

  return (
    <article className="pb-24">
      <PageIntro
        eyebrow={`Journal · ${article.eyebrow}`}
        title={article.title}
        image={article.image}
        imageAlt={article.imageAlt}
      >
        <p>{article.excerpt}</p>
      </PageIntro>
      <Container className="mt-12 max-w-2xl space-y-6 text-base leading-relaxed text-ink-muted">
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
        <p className="pt-4 text-sm">
          <Link href="/journal" className="text-ink underline-offset-4 hover:underline">
            All notes
          </Link>
        </p>
      </Container>

      <Container className="mt-16 border-t border-ink/10 pt-14">
        <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
          Continue
        </p>
        <h2 className="mt-3 font-serif text-3xl tracking-tight">
          A conversation is the better next step.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
          These notes are general. If you are considering a purchase, we would
          rather walk the property with you than leave you with an essay.
        </p>
        <ButtonLink href="/contact" variant="dark" className="mt-8 w-full sm:w-auto">
          Start a Private Enquiry
        </ButtonLink>

        {related.length > 0 ? (
          <ul className="mt-16 grid gap-8 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/journal/${item.slug}`} className="group block">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-brass">
                    {item.eyebrow}
                  </p>
                  <p className="mt-2 font-serif text-2xl tracking-tight group-hover:text-forest">
                    {item.title}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </article>
  );
}
