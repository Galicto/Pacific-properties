import { PageIntro } from "@/components/layout/PageIntro";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Pacific Properties Goa treats enquiries and personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy">
        <p>
          How Pacific Properties Goa treats enquiries and personal information.
        </p>
      </PageIntro>
      <Container className="max-w-3xl pb-24 pt-12 sm:pt-16">
      <p className="text-base leading-relaxed text-ink-muted">
        Pacific Properties Goa treats enquiries as confidential. Information
        you share through this website, WhatsApp or email is used only to
        respond to your request and, where relevant, to represent you in a
        property matter.
      </p>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        We do not sell personal data. A fuller privacy policy will be published
        here before any additional analytics or marketing tools are introduced.
        For any request relating to your information, write to{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-ink underline-offset-4 hover:underline"
        >
          {siteConfig.email}
        </a>
        .
      </p>
      <p className="mt-10 text-sm text-ink-muted">
        <Link href="/terms" className="underline-offset-4 hover:underline">
          Terms of use
        </Link>
      </p>
    </Container>
    </>
  );
}
