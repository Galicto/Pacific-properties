import { siteConfig } from "@/lib/config";
import { verifiedReraNumber } from "@/lib/credentials";

export function localBusinessJsonLd() {
  const logo = `${siteConfig.url}${siteConfig.brand.logoPng}`;
  const rera = verifiedReraNumber();

  return {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness", "Organization"],
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.companyName,
    legalName: siteConfig.companyName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo,
    image: siteConfig.ogImage.startsWith("http")
      ? siteConfig.ogImage
      : `${siteConfig.url}${siteConfig.ogImage}`,
    telephone: siteConfig.phoneDisplay,
    email: siteConfig.email,
    hasMap: siteConfig.mapPlaceUrl,
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.mapCoordinates.latitude,
      longitude: siteConfig.mapCoordinates.longitude,
    },
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
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: siteConfig.credentials.trademark.title,
        recognizedBy: {
          "@type": "Organization",
          name: "Trade Marks Registry, India",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: siteConfig.credentials.narIndia.title,
        recognizedBy: {
          "@type": "Organization",
          name: "National Association of Realtors – India",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: siteConfig.credentials.primaryMember.title,
        recognizedBy: {
          "@type": "Organization",
          name: "Goa Association of Realtors",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: siteConfig.credentials.rera.title,
        ...(rera ? { identifier: rera } : {}),
      },
    ],
    ...(rera
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "RERA Registration Number",
            value: rera,
          },
        }
      : {}),
  };
}

export function propertyJsonLd(property: {
  title: string;
  slug: string;
  shortDescription: string;
  media?: { src: string; kind?: string }[];
  images: { src: string; kind?: string }[];
  price: number | null;
  currency?: string;
  reraNumber?: string | null;
}) {
  const photos = (property.media ?? property.images).filter(
    (image) => image.kind !== "fallback" && image.kind !== "plan",
  );
  const image = photos.map((item) =>
    item.src.startsWith("http") ? item.src : `${siteConfig.url}${item.src}`,
  );
  const rera =
    property.reraNumber && /^PR[A-Z0-9]+$/i.test(property.reraNumber)
      ? property.reraNumber
      : null;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.shortDescription,
    url: `${siteConfig.url}/collection/${property.slug}`,
    ...(image.length ? { image } : {}),
    broker: { "@id": `${siteConfig.url}#organization` },
    ...(property.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: property.currency ?? "INR",
            price: property.price,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    ...(rera
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "RERA Registration Number",
            value: rera,
          },
        }
      : {}),
  };
}
