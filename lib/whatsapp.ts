import { siteConfig } from "@/lib/config";

export function buildWhatsAppUrl(text: string) {
  return `${siteConfig.whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
}

export function propertyWhatsAppText(title: string) {
  return `Hello Pacific Properties, I would like to enquire about ${title}.`;
}

export const defaultWhatsAppUrl = buildWhatsAppUrl(
  siteConfig.defaultWhatsAppText,
);

export const consultationWhatsAppUrl = buildWhatsAppUrl(
  "Hello Pacific Properties, I would like to arrange a private consultation.",
);

export function propertyWhatsAppUrl(
  title: string,
  _location?: string,
  message?: string,
) {
  return buildWhatsAppUrl(message ?? propertyWhatsAppText(title));
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
  return `Hello Pacific Properties, my name is ${name}. I am interested in ${payload.interest}${location}.${note}`;
}

/** Compact listing titles for path-based WhatsApp CTAs — not the full inventory. */
const listingTitles: Record<string, string> = {
  "3-bhk-apartments-salvador": "3 BHK Apartments in Salvador",
  "private-pool-villa-salvador-2803-sq-ft": "Private Pool Villa in Salvador",
  "private-pool-villa-salvador-3317-sq-ft": "Private Pool Villa in Salvador",
  "ocean-cloud": "Ocean Cloud",
  "la-demure": "La Demure",
  "aldona-twin-villas": "Twin Villas in Aldona",
  "pilerne-villa-collection": "Four-Bedroom Villas in Pilerne",
  "saipem-luxury-villa": "Luxury Villa in Saipem",
  "reis-magos-villas": "Luxury Villas in Reis Magos",
  "verna-warehouse": "Warehouse Space in Verna",
  "ucassaim-land": "Old Settlement Land in Ucassaim",
  "dona-paula-villas": "Luxury Villas in Dona Paula",
  "dona-paula-penthouse": "Three-Bedroom Penthouse with Private Terrace",
  "dona-paula-apartment": "Three-Bedroom Apartment in Dona Paula",
  "3-bhk-residences-dona-paula": "3 BHK Residences in Dona Paula",
  "4-bhk-residences-dona-paula": "4 BHK Residences in Dona Paula",
  "4-bhk-penthouse-dona-paula": "4 BHK Penthouse in Dona Paula",
  "waterfront-villas-pilerne": "Waterfront Villas in Pilerne",
  "heritage-villa-guirim": "Fully Furnished Heritage Villa in Guirim",
  "prime-land-assagao": "Prime Land in Assagao",
};

function listingSlugFromPath(pathname: string) {
  if (!pathname.startsWith("/collection/")) return "";
  return pathname.slice("/collection/".length).split(/[/?#]/)[0] ?? "";
}

export function whatsAppTextForPath(pathname: string) {
  if (pathname === "/collection" || pathname.startsWith("/collection?")) {
    return "Hello Pacific Properties, I would like to enquire about the collection.";
  }
  const slug = listingSlugFromPath(pathname);
  if (slug === "salvador") {
    return "Hello Pacific Properties, I would like to enquire about residences in Salvador.";
  }
  if (slug && listingTitles[slug]) {
    return propertyWhatsAppText(listingTitles[slug]);
  }
  if (pathname.startsWith("/collection/")) {
    return "Hello Pacific Properties, I would like to enquire about a residence in Goa.";
  }
  if (pathname === "/about") {
    return "Hello Pacific Properties, I would like to know more about your practice.";
  }
  if (pathname === "/contact") {
    return "Hello Pacific Properties, I would like to arrange a private consultation.";
  }
  if (pathname.startsWith("/emi")) {
    return "Hello Pacific Properties, I would like to discuss financing for a property in Goa.";
  }
  if (pathname.startsWith("/journal")) {
    return "Hello Pacific Properties, I would like to enquire about owning in Goa.";
  }
  return siteConfig.defaultWhatsAppText;
}

export function whatsAppUrlForPath(pathname: string) {
  return buildWhatsAppUrl(whatsAppTextForPath(pathname));
}
