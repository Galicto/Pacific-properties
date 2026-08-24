import { siteConfig } from "@/lib/config";

export function buildWhatsAppUrl(text: string) {
  return `${siteConfig.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export const defaultWhatsAppUrl = buildWhatsAppUrl(
  siteConfig.defaultWhatsAppText,
);

export function propertyWhatsAppText(title: string, area: string) {
  return `Hello Pacific Properties Goa, I am interested in ${title} in ${area}.`;
}

export function propertyWhatsAppUrl(title: string, area: string) {
  return buildWhatsAppUrl(propertyWhatsAppText(title, area));
}

export function enquiryWhatsAppText(payload: {
  firstName: string;
  lastName: string;
  interest: string;
  location?: string;
  message?: string;
}) {
  const name = `${payload.firstName} ${payload.lastName}`.trim();
  const location = payload.location ? ` in ${payload.location}` : "";
  const note = payload.message ? ` ${payload.message}` : "";
  return `Hello Pacific Properties Goa, my name is ${name}. I am interested in ${payload.interest}${location}.${note}`;
}
