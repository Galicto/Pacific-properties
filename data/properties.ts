import { mapsEmbedUrl } from "@/lib/config";

export type PropertyCategory =
  | "villa"
  | "apartment"
  | "penthouse"
  | "land"
  | "commercial";

export type PropertyType =
  | "Villa"
  | "Apartment"
  | "Penthouse"
  | "Land"
  | "Commercial Warehouse";

export type PropertyPurpose = "For Sale" | "For Rent";

export type PropertyStatus = "available" | "under-construction";

export type MediaStatus =
  | "ready"
  | "needs-approved-photography"
  | "needs-site-photography";

export type Region = "North Goa" | "Central Goa" | "South Goa";

export type PropertyImageKind = "photo" | "construction" | "fallback";

export type PropertyImage = {
  src: string;
  alt: string;
  kind?: PropertyImageKind;
  caption?: string;
};

export type PropertyVideo = {
  src: string;
  poster: string;
  alt: string;
  /** Muted autoplay is allowed only for a verified property hero film. */
  isHeroFilm: boolean;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  propertyType: PropertyType;
  purpose: PropertyPurpose;
  category: PropertyCategory;
  currency: "INR";
  price: number | null;
  priceDisplay: string;
  rent: string | null;
  status: PropertyStatus;
  statusLabel: string;
  bedrooms: number | null;
  bedroomsDisplay: string | null;
  bathrooms: number | null;
  area: string;
  areaSlug: string;
  region: Region;
  builtUpArea: string | null;
  landArea: string | null;
  plotArea: string | null;
  areaRange: string | null;
  communitySize: string | null;
  roadAccess: string | null;
  parking: string | null;
  possession: string | null;
  furnishing: string | null;
  reraNumber: string | null;
  amenities: string[];
  description: string;
  shortDescription: string;
  longDescription: string[];
  features: string[];
  media: PropertyImage[];
  images: PropertyImage[];
  heroImage: PropertyImage;
  featured: boolean;
  whatsAppEnquiryText: string;
  mediaStatus: MediaStatus;
  mediaFallbackText: string | null;
  galleryTitle?: string;
  video?: PropertyVideo;
  nearbyHighlights: string[];
  mapEmbedUrl: string;
  lat?: number;
  lng?: number;
  relatedIds: string[];
};

export const categoryLabels: Record<PropertyCategory, string> = {
  villa: "Villa",
  apartment: "Apartment",
  penthouse: "Penthouse",
  land: "Land",
  commercial: "Commercial",
};

const FALLBACK = {
  preview: {
    src: "/properties/_fallbacks/preview.webp",
    alt: "Private preview available on request.",
    kind: "fallback" as const,
  },
  land: {
    src: "/properties/_fallbacks/land.webp",
    alt: "Private land dossier available on request.",
    kind: "fallback" as const,
  },
  plans: {
    src: "/properties/_fallbacks/plans.webp",
    alt: "Private preview and detailed plans available on request.",
    kind: "fallback" as const,
  },
};

function enquiry(title: string, location: string) {
  return `Hello Pacific Properties Goa, I would like more details about ${title} in ${location}.`;
}

function still(
  slug: string,
  file: string,
  alt: string,
  kind: PropertyImageKind = "photo",
  caption?: string,
): PropertyImage {
  return {
    src: `/properties/${slug}/${file}`,
    alt,
    kind,
    caption,
  };
}

function listing(
  property: Omit<Property, "images" | "whatsAppEnquiryText" | "currency"> & {
    images?: PropertyImage[];
    whatsAppEnquiryText?: string;
    currency?: "INR";
  },
): Property {
  const images =
    property.images ??
    (property.media.length > 0 ? property.media : [property.heroImage]);
  return {
    currency: "INR",
    whatsAppEnquiryText: enquiry(property.title, property.location),
    ...property,
    images,
  };
}

const ALDONA = "aldona-twin-villas";
const PILERNE = "pilerne-villa-collection";
const VERNA = "verna-warehouse";
const REIS = "reis-magos-villas";

export const properties: Property[] = [
  listing({
    id: ALDONA,
    slug: ALDONA,
    title: "Twin Villas in Aldona",
    location: "Aldona, North Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: 120_000_000,
    priceDisplay: "₹12 Cr",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 5,
    bedroomsDisplay: "5 BHK",
    bathrooms: null,
    area: "Aldona",
    areaSlug: "aldona",
    region: "North Goa",
    builtUpArea: "370–422 sq m",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "2-car parking",
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Private pool",
      "Deck",
      "Twin-villa configuration",
      "2-car parking",
    ],
    description:
      "A contemporary twin-villa offering in Aldona, shaped around tropical planting, warm materiality and private outdoor living. Each residence brings together generous interiors, a private pool and deck, and the calm of a North Goa setting.",
    shortDescription:
      "A contemporary twin-villa offering in Aldona, shaped around tropical planting, warm materiality and private outdoor living.",
    longDescription: [
      "A contemporary twin-villa offering in Aldona, shaped around tropical planting, warm materiality and private outdoor living. Each residence brings together generous interiors, a private pool and deck, and the calm of a North Goa setting.",
    ],
    features: [],
    heroImage: still(
      ALDONA,
      "hero.webp",
      "Twin villas in Aldona with terracotta roofs, white walls and tropical planting.",
    ),
    media: [
      still(
        ALDONA,
        "hero.webp",
        "Twin villas in Aldona with terracotta roofs, white walls and tropical planting.",
      ),
      still(
        ALDONA,
        "01.webp",
        "Aldona twin villas — exterior elevation and planted approach.",
      ),
      still(
        ALDONA,
        "02.webp",
        "Aldona twin villas — architectural detail of the paired residences.",
      ),
      still(
        ALDONA,
        "03.webp",
        "Aerial view of the Aldona twin villas and surrounding planting.",
      ),
      still(
        ALDONA,
        "04.webp",
        "Living room at the Aldona twin villas opening to the garden and pool.",
      ),
      still(
        ALDONA,
        "05.webp",
        "Interior living space at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "06.webp",
        "Dining and lounge interior at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "07.webp",
        "Interior gallery at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "08.webp",
        "Interior detail at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "09.webp",
        "Private pool and wooden deck at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "10.webp",
        "Garden and pool court at the Aldona twin villas.",
      ),
      still(
        ALDONA,
        "11.webp",
        "Exterior garden and pool detail at the Aldona twin villas.",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Aldona, North Goa, India"),
    relatedIds: [PILERNE, "saipem-luxury-villa", REIS],
  }),

  listing({
    id: PILERNE,
    slug: PILERNE,
    title: "Four-Bedroom Villas in Pilerne",
    location: "Pilerne, North Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: null,
    priceDisplay: "Price on request",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "Pilerne",
    areaSlug: "pilerne",
    region: "North Goa",
    builtUpArea: null,
    landArea: null,
    plotArea: "400–535 sq yd",
    areaRange: null,
    communitySize: "6 villas",
    roadAccess: null,
    parking: "Covered car parking",
    possession: null,
    furnishing: "Semi / fully furnished options",
    reraNumber: null,
    amenities: [
      "Gated community",
      "Private swimming pool",
      "Lift",
      "Covered car parking",
      "Power backup",
      "Semi / fully furnished options",
    ],
    description:
      "A limited gated collection of six thoughtfully finished four-bedroom villas in Pilerne. Designed with private outdoor spaces, contemporary Goan details and considered interiors for year-round living.",
    shortDescription:
      "A limited gated collection of six thoughtfully finished four-bedroom villas in Pilerne.",
    longDescription: [
      "A limited gated collection of six thoughtfully finished four-bedroom villas in Pilerne. Designed with private outdoor spaces, contemporary Goan details and considered interiors for year-round living.",
    ],
    features: [],
    heroImage: still(
      PILERNE,
      "hero.webp",
      "Principal living interior of a four-bedroom villa in Pilerne.",
    ),
    media: [
      still(
        PILERNE,
        "hero.webp",
        "Principal living interior of a four-bedroom villa in Pilerne.",
      ),
      still(
        PILERNE,
        "14.webp",
        "Living space in a Pilerne villa with indoor–outdoor connection.",
      ),
      still(
        PILERNE,
        "23.webp",
        "Lifestyle living interior in the Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "17.webp",
        "Terrace and architectural detail, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "18.webp",
        "Staircase and double-height volume, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "19.webp",
        "Architectural interior detail, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "20.webp",
        "Terrace outlook from a Pilerne villa.",
      ),
      still(
        PILERNE,
        "21.webp",
        "Exterior architectural detail, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "38.webp",
        "Covered terrace at a Pilerne villa.",
      ),
      still(
        PILERNE,
        "39.webp",
        "Upper terrace and planting, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "40.webp",
        "Architectural stair detail, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "41.webp",
        "Interior stair and gallery, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "42.webp",
        "Architectural volume, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "43.webp",
        "Terrace seating at a Pilerne villa.",
      ),
      still(
        PILERNE,
        "44.webp",
        "Garden-facing terrace, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "24.webp",
        "Private pool and garden at a Pilerne villa.",
      ),
      still(
        PILERNE,
        "25.webp",
        "Pool court and tropical planting, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "27.webp",
        "Bathroom with arched openings, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "28.webp",
        "Walk-in shower, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "29.webp",
        "Bathroom interior, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "30.webp",
        "Bathroom detail, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "31.webp",
        "Dressing and bath suite, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "32.webp",
        "Bathroom finishes, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "47.webp",
        "Ensuite bathroom, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "16.webp",
        "Minimalist shower, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "33.webp",
        "Bedroom opening to a private outdoor area, Pilerne.",
      ),
      still(
        PILERNE,
        "34.webp",
        "Bedroom with garden light, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "45.webp",
        "Bedroom interior, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "46.webp",
        "Guest bedroom, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "22.webp",
        "Dining and lounge, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "37.webp",
        "Open-plan dining and stair hall, Pilerne villa collection.",
      ),
      still(
        PILERNE,
        "36.webp",
        "Bath and dressing suite with a freestanding tub, Pilerne.",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Pilerne, North Goa, India"),
    relatedIds: [ALDONA, "saipem-luxury-villa", REIS],
  }),

  listing({
    id: "saipem-luxury-villa",
    slug: "saipem-luxury-villa",
    title: "Luxury Villa in Saipem",
    location: "Saipem, North Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: 90_000_000,
    priceDisplay: "₹9 Cr onwards",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "Saipem",
    areaSlug: "saipem",
    region: "North Goa",
    builtUpArea: "535 sq m",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "Private car parking",
    possession: null,
    furnishing: "Fully furnished",
    reraNumber: null,
    amenities: [
      "Private swimming pool",
      "Lift",
      "Private car parking",
      "Power backup",
      "Modular kitchen",
      "Fully furnished",
    ],
    description:
      "A private four-bedroom villa opportunity in Saipem, designed for buyers seeking a substantial North Goa residence with lift access, dedicated parking and a private pool.",
    shortDescription:
      "A private four-bedroom villa opportunity in Saipem, with lift access, dedicated parking and a private pool.",
    longDescription: [
      "A private four-bedroom villa opportunity in Saipem, designed for buyers seeking a substantial North Goa residence with lift access, dedicated parking and a private pool.",
    ],
    features: [],
    heroImage: FALLBACK.preview,
    media: [],
    featured: true,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Private preview available on request",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Saipem, North Goa, India"),
    relatedIds: [ALDONA, PILERNE, REIS],
  }),

  listing({
    id: REIS,
    slug: REIS,
    title: "Luxury Villas in Reis Magos",
    location: "Reis Magos, North Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: 59_500_000,
    priceDisplay: "₹5.95 Cr onwards",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession April 2026",
    bedrooms: 3.5,
    bedroomsDisplay: "3.5 BHK",
    bathrooms: null,
    area: "Reis Magos",
    areaSlug: "reis-magos",
    region: "North Goa",
    builtUpArea: null,
    landArea: null,
    plotArea: "289–400 sq m",
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "Car parking",
    possession: "April 2026",
    furnishing: "Unfurnished",
    reraNumber: null,
    amenities: ["Private pool", "Private garden", "Car parking", "Unfurnished"],
    description:
      "A limited collection of contemporary 3.5-bedroom villas in Reis Magos, planned around private gardens and pools, with possession expected in April 2026.",
    shortDescription:
      "Contemporary 3.5-bedroom villas in Reis Magos, planned around private gardens and pools, with possession expected in April 2026.",
    longDescription: [
      "A limited collection of contemporary 3.5-bedroom villas in Reis Magos, planned around private gardens and pools, with possession expected in April 2026.",
    ],
    features: [],
    heroImage: still(
      REIS,
      "53.webp",
      "Construction progress at the Reis Magos villas, with private pools taking shape against a river view.",
      "construction",
      "Construction Progress",
    ),
    media: [
      still(
        REIS,
        "53.webp",
        "Construction progress at the Reis Magos villas, with private pools taking shape against a river view.",
        "construction",
        "Construction Progress",
      ),
      still(
        REIS,
        "54.webp",
        "Construction progress — villa shells and garden courts at Reis Magos.",
        "construction",
        "Construction Progress",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    galleryTitle: "Construction Progress",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Reis Magos, North Goa, India"),
    relatedIds: [ALDONA, PILERNE, "dona-paula-villas"],
  }),

  listing({
    id: VERNA,
    slug: VERNA,
    title: "Warehouse Space in Verna",
    location: "Verna, Goa",
    propertyType: "Commercial Warehouse",
    purpose: "For Rent",
    category: "commercial",
    price: null,
    priceDisplay: "₹35 per sq ft",
    rent: "₹35 per sq ft",
    status: "available",
    statusLabel: "Available",
    bedrooms: null,
    bedroomsDisplay: null,
    bathrooms: null,
    area: "Verna",
    areaSlug: "verna",
    region: "South Goa",
    builtUpArea: null,
    landArea: null,
    plotArea: null,
    areaRange: "5,000–113,000 sq ft",
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Loading and unloading bay",
      "Washrooms",
      "Fire hydrant",
      "PEB shed",
      "RCC shed",
      "Laser flooring",
    ],
    description:
      "Flexible warehouse space in Verna, suitable for logistics, storage, industrial operations and distribution. Configurations are available from 5,000 to 113,000 square feet with loading infrastructure and essential industrial facilities.",
    shortDescription:
      "Flexible warehouse space in Verna, from 5,000 to 113,000 square feet, with loading infrastructure.",
    longDescription: [
      "Flexible warehouse space in Verna, suitable for logistics, storage, industrial operations and distribution. Configurations are available from 5,000 to 113,000 square feet with loading infrastructure and essential industrial facilities.",
    ],
    features: [],
    heroImage: still(
      VERNA,
      "hero.webp",
      "Warehouse interior in Verna with high bays and a laser-finished floor.",
    ),
    media: [
      still(
        VERNA,
        "hero.webp",
        "Warehouse interior in Verna with high bays and a laser-finished floor.",
      ),
      still(
        VERNA,
        "55.webp",
        "Warehouse interior volume in Verna.",
      ),
      still(
        VERNA,
        "56.webp",
        "Warehouse floor and structural bays in Verna.",
      ),
      still(
        VERNA,
        "59.webp",
        "Covered loading and dock infrastructure, Verna warehouse.",
      ),
      still(
        VERNA,
        "60.webp",
        "Loading bay and concrete access, Verna warehouse.",
      ),
      still(
        VERNA,
        "61.webp",
        "Exterior access road to the Verna warehouse.",
      ),
      still(
        VERNA,
        "62.webp",
        "Warehouse exterior and yard access in Verna.",
      ),
    ],
    featured: false,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Verna, Goa, India"),
    relatedIds: [],
  }),

  listing({
    id: "ucassaim-land",
    slug: "ucassaim-land",
    title: "Old Settlement Land in Ucassaim",
    location: "Ucassaim, North Goa",
    propertyType: "Land",
    purpose: "For Sale",
    category: "land",
    price: null,
    priceDisplay: "Available upon verified client details",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: null,
    bedroomsDisplay: null,
    bathrooms: null,
    area: "Ucassaim",
    areaSlug: "ucassaim",
    region: "North Goa",
    builtUpArea: null,
    landArea: "4,625 sq m",
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: "6 m road",
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Old settlement land",
      "Near Mapusa",
      "Suitable for high-end villa development",
    ],
    description:
      "An old-settlement land opportunity in Ucassaim, North Goa, with 6-metre road access and potential for a high-end villa development.",
    shortDescription:
      "Old-settlement land in Ucassaim, North Goa, with 6-metre road access, close to Mapusa.",
    longDescription: [
      "An old-settlement land opportunity in Ucassaim, North Goa, with 6-metre road access and potential for a high-end villa development.",
    ],
    features: [],
    heroImage: FALLBACK.land,
    media: [],
    featured: false,
    mediaStatus: "needs-site-photography",
    mediaFallbackText: "Private land dossier available on request.",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Ucassaim, North Goa, India"),
    relatedIds: [ALDONA, PILERNE, REIS],
  }),

  listing({
    id: "dona-paula-villas",
    slug: "dona-paula-villas",
    title: "Luxury Villas in Dona Paula",
    location: "Dona Paula, Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: 70_000_000,
    priceDisplay: "₹7 Cr",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession August 2027",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "267–274 sq m",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "Car parking",
    possession: "August 2027",
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Private pool",
      "Lift",
      "Car parking",
      "Power backup",
      "Modular kitchen",
      "Spacious lounge",
    ],
    description:
      "Four-bedroom villas in Dona Paula, with private pool, lift, car parking, power backup, modular kitchen and a spacious lounge. Possession is expected in August 2027.",
    shortDescription:
      "Four-bedroom villas in Dona Paula. Possession is expected in August 2027.",
    longDescription: [
      "Four-bedroom villas in Dona Paula, with private pool, lift, car parking, power backup, modular kitchen and a spacious lounge. Possession is expected in August 2027.",
    ],
    features: [],
    heroImage: FALLBACK.plans,
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText:
      "Private preview and detailed plans available on request",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: [
      "dona-paula-penthouse",
      "dona-paula-apartment",
      REIS,
    ],
  }),

  listing({
    id: "dona-paula-penthouse",
    slug: "dona-paula-penthouse",
    title: "Three-Bedroom Penthouse with Private Terrace",
    location: "Dona Paula, Goa",
    propertyType: "Penthouse",
    purpose: "For Sale",
    category: "penthouse",
    price: 52_500_000,
    priceDisplay: "₹5.25 Cr",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession August 2027",
    bedrooms: 3,
    bedroomsDisplay: "3 BHK",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "268.35 sq m",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "Car parking",
    possession: "August 2027",
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Private terrace",
      "Rooftop private pool",
      "Gazebo sit-out",
      "Lift",
      "24/7 security",
      "Power backup",
      "Modular kitchen",
      "Car parking",
    ],
    description:
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out, with possession expected in August 2027.",
    shortDescription:
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out.",
    longDescription: [
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out, with possession expected in August 2027.",
    ],
    features: [],
    heroImage: FALLBACK.plans,
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText:
      "Private preview and detailed plans available on request",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: ["dona-paula-villas", "dona-paula-apartment", REIS],
  }),

  listing({
    id: "dona-paula-apartment",
    slug: "dona-paula-apartment",
    title: "Three-Bedroom Apartment in Dona Paula",
    location: "Dona Paula, Goa",
    propertyType: "Apartment",
    purpose: "For Sale",
    category: "apartment",
    price: 32_500_000,
    priceDisplay: "₹3.25 Cr",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession August 2027",
    bedrooms: 3,
    bedroomsDisplay: "3 BHK",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "164.90 sq m",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: "Car parking",
    possession: "August 2027",
    furnishing: "Semi-furnished",
    reraNumber: null,
    amenities: [
      "Semi-furnished",
      "Swimming pool",
      "Lift",
      "24/7 security",
      "Power backup",
      "Modular kitchen",
      "Car parking",
    ],
    description:
      "A three-bedroom apartment in Dona Paula, with swimming pool, lift, 24/7 security, power backup, modular kitchen and car parking. Possession is expected in August 2027.",
    shortDescription:
      "A three-bedroom apartment in Dona Paula. Possession is expected in August 2027.",
    longDescription: [
      "A three-bedroom apartment in Dona Paula, with swimming pool, lift, 24/7 security, power backup, modular kitchen and car parking. Possession is expected in August 2027.",
    ],
    features: [],
    heroImage: FALLBACK.plans,
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText:
      "Private preview and detailed plans available on request",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: ["dona-paula-villas", "dona-paula-penthouse", REIS],
  }),
];

export function hasPhotography(property: Property) {
  return property.media.some((image) => image.kind !== "fallback");
}

export function offersEmi(property: Property) {
  return property.purpose === "For Sale" && property.price !== null;
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function findPropertyForEmi(opts: {
  slug?: string | null;
  title?: string | null;
}) {
  if (opts.slug) {
    const bySlug = getPropertyBySlug(opts.slug);
    if (bySlug) return bySlug;
  }
  if (opts.title) {
    const bySlug = getPropertyBySlug(opts.title);
    if (bySlug) return bySlug;
    const lower = opts.title.toLowerCase();
    return properties.find((property) => property.title.toLowerCase() === lower);
  }
  return undefined;
}

export function getFeaturedProperties() {
  return properties.filter((property) => property.featured);
}

export function getRelatedProperties(property: Property) {
  return property.relatedIds
    .map((id) => properties.find((item) => item.id === id))
    .filter((item): item is Property => Boolean(item));
}

export function getAdjacentProperties(slug: string) {
  const index = properties.findIndex((property) => property.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: properties[index - 1] ?? properties[properties.length - 1],
    next: properties[index + 1] ?? properties[0],
  };
}

export function getAreasFromProperties() {
  return Array.from(new Set(properties.map((property) => property.area))).sort();
}
