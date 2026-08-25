import { siteConfig } from "@/lib/config";

export function buildWhatsAppUrl(text: string) {
  return `${siteConfig.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export const defaultWhatsAppUrl = buildWhatsAppUrl(
  siteConfig.defaultWhatsAppText,
);

export function propertyWhatsAppText(title: string, location: string) {
  return `Hello Pacific Properties Goa, I would like more details about ${title} in ${location}.`;
}

export function propertyWhatsAppUrl(
  title: string,
  location: string,
  message?: string,
) {
  return buildWhatsAppUrl(message ?? propertyWhatsAppText(title, location));
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
