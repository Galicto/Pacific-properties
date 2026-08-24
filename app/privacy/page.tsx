import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notes for Pacific Properties Goa.",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl pb-24 pt-32">
      <h1 className="font-serif text-5xl tracking-tight">Privacy</h1>
      <p className="mt-8 text-sm leading-relaxed text-ink-muted">
        Pacific Properties Goa treats enquiries as confidential. Information
        you share through this website, WhatsApp or email is used only to
        respond to your request and, where relevant, to represent you in a
        property matter.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        This page is a placeholder pending a full privacy policy. We do not
        sell personal data. Analytics, if introduced, will be documented here.
        For any request relating to your information, write to{" "}
        {siteConfig.email}.
      </p>
    </Container>
  );
}
