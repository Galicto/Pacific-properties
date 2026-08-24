import { siteConfig } from "@/lib/config";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    name: siteConfig.companyName,
    description: siteConfig.description,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: "Assagao",
      addressRegion: "Goa",
      postalCode: "403507",
      addressCountry: "IN",
    },
    areaServed: ["North Goa", "Central Goa", "South Goa", "Goa"],
    sameAs: [siteConfig.linkedinUrl, siteConfig.instagramUrl],
  };
}

export function propertyJsonLd(property: {
  title: string;
  slug: string;
  shortDescription: string;
  images: { src: string }[];
  price: number | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.shortDescription,
    url: `${siteConfig.url}/collection/${property.slug}`,
    image: property.images.map((image) => image.src),
    ...(property.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: property.price,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}
