/**
 * Central site configuration for Pacific Properties Goa.
 *
 * Replace placeholder contact details, media, and embeds here —
 * most of the site reads from this file rather than hard-coded strings.
 */

import { emiDefaults } from "./emi";

export const siteConfig = {
  companyName: "Pacific Properties Goa",
  shortName: "Pacific Properties",
  tagline: "A More Considered Way to Own Goa.",
  secondaryTagline: "Exceptional Homes. Enduring Goa.",
  tertiaryTagline: "Property, Curated for the Way You Live.",
  description:
    "A boutique Goa brokerage for considered buyers, investors and second-home seekers. Curated villas, residences and land across North and Central Goa.",
  url: "https://pacificpropertiesgoa.com",
  locale: "en_IN",

  whatsappNumber: "917057860921",
  whatsappBaseUrl: "https://wa.me/917057860921",
  defaultWhatsAppText:
    "Hello Pacific Properties Goa, I would like to know more about your properties.",

  linkedinUrl: "https://www.linkedin.com/company/pacificpropertiesgoa/",
  instagramUrl: "https://www.instagram.com/pacificpropertiesindia/",

  email: "hello@pacificpropertiesgoa.com",
  phoneDisplay: "+91 70578 60921",
  phoneHref: "tel:+917057860921",

  address: {
    line1: "Assagao, Bardez",
    line2: "North Goa, Goa 403507",
    country: "India",
    display: "Assagao, Bardez, North Goa, Goa 403507, India",
  },

  /**
   * Maps. Embed needs no API key. The static preview is first paint on Contact;
   * the iframe mounts only after IntersectionObserver / tap.
   */
  mapQuery: "Assagao, Bardez, North Goa, Goa 403507, India",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Assagao%2C%20Bardez%2C%20North%20Goa%2C%20Goa%20403507%2C%20India&z=12&output=embed",
  mapPlaceUrl:
    "https://www.google.com/maps/search/?api=1&query=Assagao%2C%20Bardez%2C%20North%20Goa%2C%20Goa%20403507%2C%20India",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Assagao%2C%20Bardez%2C%20North%20Goa%2C%20Goa%20403507%2C%20India",
  mapPreview: "/maps/assagao.webp",
  mapCoordinates: { latitude: 15.5989, longitude: 73.7947 },

  /**
   * Official lock-up and P-mark. One colourway only (white type + gold icon).
   * SVG is the primary web file; PNG is the raster fallback. Do not stretch,
   * invert, filter, recolour, or swap this artwork. Intrinsic sizes must
   * match the files so the header does not shift.
   */
  brand: {
    logo: "/brand/pacific-properties-logo.png",
    logoSvg: "/brand/pacific-properties-logo.svg",
    mark: "/brand/pacific-properties-mark.png",
    markSvg: "/brand/pacific-properties-mark.svg",
    /** Raster lock-up on black for JSON-LD / crawlers that composite onto light pages. */
    logoPng: "/brand/pacific-properties-logo-share.png",
    lockup: { width: 967, height: 145 },
    markSize: { width: 107, height: 107 },
  },

  /**
   * Open Graph / social share image. 1200×630 branded still at /public/og.jpg.
   */
  ogImage: "/og.jpg",

  /**
   * Professional credentials shown on Home, About, Contact, listing pages, and footer.
   *
   * TODO(client): Paste the verified Goa RERA registration number into
   * `reraRegistrationNumber` once the client supplies it in writing.
   * Leave the string empty until then. Never invent, guess, or copy a
   * number from another listing. When a real value is present the site
   * will show “RERA Registration No. {number}” and add it to JSON-LD.
   */
  credentials: {
    reraRegistrationNumber: "",
    heading: "Trusted in Goa Real Estate",
    supporting:
      "Established credentials, recognised industry affiliations and a commitment to professional representation.",
    trademark: {
      title: "Registered Trademark",
      body: "Pacific Properties is a registered trade mark for real-estate services in Goa.",
    },
    narIndia: {
      title: "Member, NAR-India",
      body: "National Association of Realtors – India.",
    },
    primaryMember: {
      title: "Primary Member, Goa Association of Realtors",
      body: "Membership valid until 31 March 2027.",
    },
    rera: {
      title: "RERA-Registered Real Estate Agent",
      body: "Registration valid from 7 June 2023 through 6 June 2028.",
    },
  },

  /**
   * EMI calculator defaults. Single source of truth: `emiDefaults` in `lib/emi.ts`.
   */
  emi: emiDefaults,
} as const;

export {
  heroMedia as heroVideos,
  heroFilmHasFile,
  type HeroMedia as HeroVideo,
} from "./hero-media";

export function mapsEmbedUrl(query: string, zoom = 14) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}

export function mapsPlaceUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsDirectionsUrl(query: string) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
}
