import { siteConfig } from "@/lib/config";

/** Verified Goa RERA number, or null when the config field is still empty. */
export function verifiedReraNumber(): string | null {
  const value: string = siteConfig.credentials.reraRegistrationNumber;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function reraDetail(): string | null {
  const number = verifiedReraNumber();
  return number ? `RERA Registration No. ${number}` : null;
}

export function reraShortLabel(): string {
  return reraDetail() ?? siteConfig.credentials.rera.title;
}

/** Contact page reassurance, beside or below the enquiry form. */
export function credentialsContactLine(): string {
  return `Primary Member, GAR · Member, NAR-India · ${reraShortLabel()} · Registered Trademark`;
}

/** Footer legal/trust line, above the copyright. */
export function credentialsFooterLine(): string {
  return `Primary Member, Goa Association of Realtors · Member, NAR-India · ${reraShortLabel()} · Registered Trademark`;
}

export type CredentialCard = {
  id: "trademark" | "nar" | "gar" | "rera";
  title: string;
  body: string;
  detail?: string | null;
  preview: string;
  document: string;
  previewAlt: string;
};

export const credentialCards: CredentialCard[] = [
  {
    id: "trademark",
    title: siteConfig.credentials.trademark.title,
    body: siteConfig.credentials.trademark.body,
    preview: "/credentials/trademark.webp",
    document: "/credentials/trademark.pdf",
    previewAlt: "Certificate of registration of the Pacific Properties trade mark.",
  },
  {
    id: "nar",
    title: siteConfig.credentials.narIndia.title,
    body: siteConfig.credentials.narIndia.body,
    preview: "/credentials/nar-india.webp",
    document: "/credentials/nar-india.pdf",
    previewAlt: "NAR-India membership certificate for Pacific Properties Goa.",
  },
  {
    id: "gar",
    title: siteConfig.credentials.primaryMember.title,
    body: siteConfig.credentials.primaryMember.body,
    preview: "/credentials/goa-association-of-realtors.webp",
    document: "/credentials/goa-association-of-realtors.pdf",
    previewAlt:
      "Goa Association of Realtors primary membership certificate for Pacific Properties Goa.",
  },
  {
    id: "rera",
    title: siteConfig.credentials.rera.title,
    body: siteConfig.credentials.rera.body,
    detail: reraDetail(),
    preview: "/credentials/rera-agent.webp",
    document: "/credentials/rera-agent.pdf",
    previewAlt:
      "Goa RERA renewal of registration of real estate agent for Pacific Properties.",
  },
];

/** @deprecated Use credentialCards. Kept for compact trust lists. */
export const credentialItems = credentialCards;
