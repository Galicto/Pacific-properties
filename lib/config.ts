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
  instagramUrl:
    "https://www.instagram.com/pacificpropertiesindia?igsi=cTA5NGllcjdvcm50",

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
   * Configurable Google Maps embed — no API key required.
   * Replace the query or paste a full embed URL from Google Maps > Share > Embed.
   */
  mapQuery: "Assagao, Goa, India",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Assagao%2C%20Goa%2C%20India&z=12&output=embed",

  /**
   * Open Graph / social share image.
   * REPLACE: add a 1200×630 branded still at /public/og.jpg and point this at `${url}/og.jpg`.
   */
  ogImage:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&h=630&q=80",

  /**
   * EMI calculator defaults. Single source of truth: `emiDefaults` in `lib/emi.ts`.
   */
  emi: emiDefaults,

  /**
   * Hero videos. Add further entries to enable the cinematic carousel.
   * REPLACE `src` with a locally hosted file (e.g. /video/hero-01.mp4) for production.
   * Current sources are free Pexels stock — verified to return HTTP 200.
   */
  heroVideos: [
    {
      id: "villa-courtyard",
      src: "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop",
      alt: "A still, sunlit villa courtyard with a swimming pool — replacement poster for the home hero.",
    },
    {
      id: "coastal-aerial",
      src: "https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4",
      poster:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop",
      alt: "Aerial coastal water — secondary hero still.",
    },
  ],
} as const;

export type HeroVideo = (typeof siteConfig.heroVideos)[number];

export function mapsEmbedUrl(query: string, zoom = 14) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;
}
