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
  return `Founder Member GAR · Member NAR-India · ${reraShortLabel()}`;
}

/** Footer legal/trust line, above the copyright. */
export function credentialsFooterLine(): string {
  return `Founder Member, Goa Association of Realtors (GAR) · Member, NAR-India · ${reraShortLabel()}`;
}

export const credentialItems = [
  {
    id: "gar",
    title: siteConfig.credentials.founderMember.title,
    body: siteConfig.credentials.founderMember.body,
  },
  {
    id: "nar",
    title: siteConfig.credentials.narIndia.title,
    body: siteConfig.credentials.narIndia.body,
  },
  {
    id: "rera",
    title: siteConfig.credentials.rera.title,
    body: siteConfig.credentials.rera.body,
    detail: reraDetail(),
  },
] as const;
