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
    "A boutique Goa brokerage for considered buyers, investors and second-home seekers. Curated villas, residences, land and commercial space across North and South Goa.",
  url: "https://pacificpropertiesgoa.com",
  locale: "en_IN",

  principal: {
    name: "Akbar Khawaja",
    honorificName: "Mr. Akbar Khawaja",
    role: "Chief Executive Officer",
  },

  whatsappNumber: "917517723777",
  whatsappBaseUrl: "https://wa.me/917517723777",
  defaultWhatsAppText:
    "Hello Pacific Properties, I would like to enquire about your properties in Goa.",

  linkedinUrl: "https://www.linkedin.com/company/pacificpropertiesgoa/",
  instagramUrl: "https://www.instagram.com/pacificpropertiesindia/",

  email: "pacificpropertiesrealtygoa@gmail.com",
  phoneDisplay: "+91 75177 23777",
  phoneHref: "tel:+917517723777",

  address: {
    line1: "Block A, 3rd Floor, 302",
    line2: "Esmeralda Casa Do Povo, St. Inez",
    line3: "Panjim, Goa",
    locality: "Panjim",
    region: "Goa",
    postalCode: "403001",
    country: "India",
    display:
      "Block A, 3rd Floor, 302, Esmeralda Casa Do Povo, St. Inez, Panjim, Goa, India",
  },

  /**
   * Maps. Embed needs no API key. The static preview is first paint on Contact;
   * the iframe mounts only after IntersectionObserver / tap.
   */
  mapQuery: "Esmeralda Casa Do Povo, St. Inez, Panjim, Goa",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Esmeralda%20Casa%20Do%20Povo%2C%20St.%20Inez%2C%20Panjim%2C%20Goa&z=16&output=embed",
  mapPlaceUrl:
    "https://www.google.com/maps/search/?api=1&query=Esmeralda%20Casa%20Do%20Povo%2C%20St.%20Inez%2C%20Panjim%2C%20Goa",
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Esmeralda%20Casa%20Do%20Povo%2C%20St.%20Inez%2C%20Panjim%2C%20Goa",
  mapPreview: "/maps/panjim.webp",
  mapCoordinates: { latitude: 15.49006, longitude: 73.82706 },

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
   * Goa RERA number is taken from the official business card for Akbar Khawaja.
   */
  credentials: {
    reraRegistrationNumber: "AGGO06180071",
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
