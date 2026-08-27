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

export type Region = "North Goa" | "Central Goa" | "South Goa" | "Goa";

export type CollectionGroup =
  | "salvador"
  | "new-launches"
  | "signature-villas"
  | "apartments-penthouses"
  | "commercial"
  | "land";

export type UnitAvailability = "available" | "sold";

export type PropertyUnit = {
  id: string;
  label: string;
  area: string;
  price: number | null;
  priceDisplay: string;
  status: UnitAvailability;
};

export type PropertyImageKind =
  | "photo"
  | "construction"
  | "fallback"
  | "plan"
  | "lifestyle";

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
  collectionGroup: CollectionGroup;
  units?: PropertyUnit[];
  unitsHeading?: string;
  unitLabelColumn?: string;
  hideUnitArea?: boolean;
  reraDisplay?: string | null;
  availabilityDisclaimer?: string;
  availabilityUpdatedOn?: string | null;
  locationPendingConfirmation?: boolean;
  locationNote?: string;
  pricePositioning?: "Negotiable";
  enquiryPrompt?: string;
  ctaLabel?: string;
};

export const collectionGroupOrder: CollectionGroup[] = [
  "salvador",
  "new-launches",
  "signature-villas",
  "apartments-penthouses",
  "commercial",
  "land",
];

export const collectionGroupLabels: Record<CollectionGroup, string> = {
  salvador: "Salvador",
  "new-launches": "New Launches",
  "signature-villas": "Signature Villas",
  "apartments-penthouses": "Apartments & Penthouses",
  "commercial": "Commercial",
  "land": "Land",
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
    alt: "Indicative Goa land — open tropical plot available on request.",
    kind: "fallback" as const,
  },
  plans: {
    src: "/properties/_fallbacks/plans.webp",
    alt: "Private preview and detailed plans available on request.",
    kind: "fallback" as const,
  },
  northVilla: {
    src: "/properties/pilerne-villa-collection/41.webp",
    alt: "A Goan villa interior with arched windows and tropical light.",
    kind: "fallback" as const,
  },
  coastal: {
    src: "/properties/ocean-cloud/02.webp",
    alt: "Coastal residences in Goa, available privately on request.",
    kind: "fallback" as const,
  },
  lush: {
    src: "/properties/pilerne-villa-collection/24.webp",
    alt: "Lush villa gardens and private outdoor living in North Goa.",
    kind: "fallback" as const,
  },
};

function enquiry(title: string) {
  return `Hello Pacific Properties, I would like to enquire about ${title}.`;
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

function uniqueImages(images: PropertyImage[]) {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

function listing(
  property: Omit<
    Property,
    "images" | "whatsAppEnquiryText" | "currency" | "collectionGroup"
  > & {
    images?: PropertyImage[];
    whatsAppEnquiryText?: string;
    currency?: "INR";
    collectionGroup?: CollectionGroup;
  },
): Property {
  const media = uniqueImages(property.media);
  const images = uniqueImages(
    property.images ?? (media.length > 0 ? media : [property.heroImage]),
  );
  return {
    currency: "INR",
    whatsAppEnquiryText: enquiry(property.title),
    ...property,
    collectionGroup:
      property.collectionGroup ?? defaultCollectionGroup(property.category),
    media,
    images,
  };
}

function defaultCollectionGroup(category: PropertyCategory): CollectionGroup {
  if (category === "commercial") return "commercial";
  if (category === "land") return "land";
  if (category === "apartment" || category === "penthouse") {
    return "apartments-penthouses";
  }
  return "signature-villas";
}

const ALDONA = "aldona-twin-villas";
const PILERNE = "pilerne-villa-collection";
const VERNA = "verna-warehouse";
const REIS = "reis-magos-villas";
const OCEAN = "ocean-cloud";
const DEMURE = "la-demure";
const SALVADOR_APT = "3-bhk-apartments-salvador";
const SALVADOR_VILLA_2803 = "private-pool-villa-salvador-2803-sq-ft";
const SALVADOR_VILLA_3317 = "private-pool-villa-salvador-3317-sq-ft";

const CONFIRM =
  "Prices and availability are subject to confirmation.";

function salvadorEnquiry(title: string) {
  return `Hello Pacific Properties, I would like to enquire about ${title}.`;
}

function interestCopy(prompt: string) {
  return {
    enquiryPrompt: prompt,
  };
}

export const properties: Property[] = [
  listing({
    id: SALVADOR_APT,
    slug: SALVADOR_APT,
    title: "3 BHK Apartments in Salvador",
    location: "Salvador, Goa",
    propertyType: "Apartment",
    purpose: "For Sale",
    category: "apartment",
    collectionGroup: "salvador",
    price: 32_000_000,
    priceDisplay: "Starting from ₹3.20 Cr",
    pricePositioning: "Negotiable",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 3,
    bedroomsDisplay: "3 BHK",
    bathrooms: null,
    area: "Salvador",
    areaSlug: "salvador",
    region: "North Goa",
    builtUpArea: null,
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: "8 apartments",
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "Eight 3 BHK apartments in Salvador, Goa, with floor-wise starting prices. Prices are negotiable.",
    shortDescription:
      "Eight 3 BHK apartments in Salvador, Goa, with floor-wise starting prices.",
    longDescription: [
      "A collection of eight 3 BHK apartments in Salvador, Goa, offered with floor-wise starting prices.",
      "Upper Ground Floor from ₹3.20 Cr, First Floor from ₹3.40 Cr, Second Floor from ₹3.60 Cr, and Third Floor from ₹3.75 Cr. Prices are negotiable.",
      CONFIRM,
    ],
    features: [],
    heroImage: still(
      SALVADOR_APT,
      "hero.webp",
      "Architectural render of a five-storey apartment building in Salvador, Goa, with arched balconies, stone cladding and planted terraces.",
    ),
    media: [
      still(
        SALVADOR_APT,
        "hero.webp",
        "Architectural render of a five-storey apartment building in Salvador, Goa, with arched balconies, stone cladding and planted terraces.",
      ),
      still(
        SALVADOR_APT,
        "landscape.webp",
        "Backwaters and tropical planting near Salvador, Goa.",
        "lifestyle",
      ),
      still(
        SALVADOR_APT,
        "site-plan.webp",
        "Site plan for the residential layout in Salvador, Goa, showing apartments, villas, a central pool and internal roads.",
        "plan",
        "Site plan",
      ),
      still(
        SALVADOR_APT,
        "master-plan.webp",
        "Master-plan sheet for the Salvador, Goa apartments, with site data and typical 3 BHK layouts.",
        "plan",
        "Master plan",
      ),
      still(
        SALVADOR_APT,
        "floor-plan.webp",
        "Typical 3 BHK apartment floor plan in Salvador, Goa, with living, dining, kitchen and three bedrooms.",
        "plan",
        "Typical floor plan",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Salvador do Mundo, Goa, India"),
    enquiryPrompt: "I'm interested in the 3 BHK Apartments in Salvador.",
    whatsAppEnquiryText: salvadorEnquiry(
      "3 BHK Apartments in Salvador",
    ),
    availabilityDisclaimer: CONFIRM,
    availabilityUpdatedOn: null,
    unitsHeading: "Floor availability",
    unitLabelColumn: "Floor",
    hideUnitArea: true,
    units: [
      {
        id: "upper-ground",
        label: "Upper Ground Floor",
        area: "",
        price: 32_000_000,
        priceDisplay: "Starting from ₹3.20 Cr",
        status: "available",
      },
      {
        id: "first",
        label: "First Floor",
        area: "",
        price: 34_000_000,
        priceDisplay: "Starting from ₹3.40 Cr",
        status: "available",
      },
      {
        id: "second",
        label: "Second Floor",
        area: "",
        price: 36_000_000,
        priceDisplay: "Starting from ₹3.60 Cr",
        status: "available",
      },
      {
        id: "third",
        label: "Third Floor",
        area: "",
        price: 37_500_000,
        priceDisplay: "Starting from ₹3.75 Cr",
        status: "available",
      },
    ],
    relatedIds: [SALVADOR_VILLA_3317, SALVADOR_VILLA_2803, OCEAN],
  }),

  listing({
    id: SALVADOR_VILLA_2803,
    slug: SALVADOR_VILLA_2803,
    title: "Private Pool Villa in Salvador",
    location: "Salvador, Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    collectionGroup: "salvador",
    price: 50_000_000,
    priceDisplay: "₹5.00 Cr",
    pricePositioning: "Negotiable",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: null,
    bedroomsDisplay: null,
    bathrooms: null,
    area: "Salvador",
    areaSlug: "salvador",
    region: "North Goa",
    builtUpArea: "262.2 sqm / 2,803 sq ft",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: ["Private Pool"],
    description:
      "A private pool villa in Salvador, Goa, with 262.2 sqm / 2,803 sq ft built-up area. The price is ₹5.00 Cr, negotiable.",
    shortDescription:
      "A private pool villa in Salvador, Goa, with 262.2 sqm / 2,803 sq ft built-up area.",
    longDescription: [
      "A villa in Salvador, Goa, with a private pool and a built-up area of 262.2 sqm / 2,803 sq ft.",
      "The asking price is ₹5.00 Cr. Prices are negotiable.",
      CONFIRM,
    ],
    features: ["Private Pool"],
    heroImage: still(
      SALVADOR_VILLA_2803,
      "living.webp",
      "Living room of a private pool villa in Salvador, Goa, with a stone arch, timber ceiling and garden light beyond.",
    ),
    media: [
      still(
        SALVADOR_VILLA_2803,
        "living.webp",
        "Living room of a private pool villa in Salvador, Goa, with a stone arch, timber ceiling and garden light beyond.",
      ),
      still(
        SALVADOR_VILLA_2803,
        "dining.webp",
        "Dining room of a private pool villa in Salvador, Goa, with a timber table, woven chairs and plaster niches.",
      ),
      still(
        SALVADOR_VILLA_2803,
        "kitchen.webp",
        "Kitchen of a private pool villa in Salvador, Goa, with timber cabinetry, stone counters and warm shelf lighting.",
      ),
      still(
        SALVADOR_VILLA_2803,
        "landscape.webp",
        "Backwaters and tropical planting near Salvador, Goa.",
        "lifestyle",
      ),
      still(
        SALVADOR_VILLA_2803,
        "site-plan.webp",
        "Site plan for the residential layout in Salvador, Goa, showing villas, apartments, a central pool and internal roads.",
        "plan",
        "Site plan",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Salvador do Mundo, Goa, India"),
    enquiryPrompt:
      "I'm interested in the Private Pool Villa in Salvador — 2,803 sq ft.",
    whatsAppEnquiryText: salvadorEnquiry(
      "Private Pool Villa in Salvador — 2,803 sq ft",
    ),
    availabilityDisclaimer: CONFIRM,
    availabilityUpdatedOn: null,
    relatedIds: [SALVADOR_VILLA_3317, SALVADOR_APT, DEMURE],
  }),

  listing({
    id: SALVADOR_VILLA_3317,
    slug: SALVADOR_VILLA_3317,
    title: "Private Pool Villa in Salvador",
    location: "Salvador, Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    collectionGroup: "salvador",
    price: 65_000_000,
    priceDisplay: "₹6.50 Cr",
    pricePositioning: "Negotiable",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: null,
    bedroomsDisplay: null,
    bathrooms: null,
    area: "Salvador",
    areaSlug: "salvador",
    region: "North Goa",
    builtUpArea: "310.4 sqm / 3,317 sq ft",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: ["Private Pool"],
    description:
      "A private pool villa in Salvador, Goa, with 310.4 sqm / 3,317 sq ft built-up area. The price is ₹6.50 Cr, negotiable.",
    shortDescription:
      "A private pool villa in Salvador, Goa, with 310.4 sqm / 3,317 sq ft built-up area.",
    longDescription: [
      "A villa in Salvador, Goa, with a private pool and a built-up area of 310.4 sqm / 3,317 sq ft.",
      "The asking price is ₹6.50 Cr. Prices are negotiable.",
      CONFIRM,
    ],
    features: ["Private Pool"],
    heroImage: still(
      SALVADOR_VILLA_3317,
      "dining.webp",
      "Dining room of a private pool villa in Salvador, Goa, with a timber table, woven chairs and plaster niches.",
    ),
    media: [
      still(
        SALVADOR_VILLA_3317,
        "dining.webp",
        "Dining room of a private pool villa in Salvador, Goa, with a timber table, woven chairs and plaster niches.",
      ),
      still(
        SALVADOR_VILLA_3317,
        "living.webp",
        "Living room of a private pool villa in Salvador, Goa, with a stone arch, timber ceiling and garden light beyond.",
      ),
      still(
        SALVADOR_VILLA_3317,
        "kitchen.webp",
        "Kitchen of a private pool villa in Salvador, Goa, with timber cabinetry, stone counters and warm shelf lighting.",
      ),
      still(
        SALVADOR_VILLA_3317,
        "palms.webp",
        "Palm canopy against a clear sky in Salvador, Goa.",
        "lifestyle",
      ),
      still(
        SALVADOR_VILLA_3317,
        "landscape.webp",
        "Backwaters and tropical planting near Salvador, Goa.",
        "lifestyle",
      ),
      still(
        SALVADOR_VILLA_3317,
        "site-plan.webp",
        "Site plan for the residential layout in Salvador, Goa, showing villas, apartments, a central pool and internal roads.",
        "plan",
        "Site plan",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Salvador do Mundo, Goa, India"),
    enquiryPrompt:
      "I'm interested in the Private Pool Villa in Salvador — 3,317 sq ft.",
    whatsAppEnquiryText: salvadorEnquiry(
      "Private Pool Villa in Salvador — 3,317 sq ft",
    ),
    availabilityDisclaimer: CONFIRM,
    availabilityUpdatedOn: null,
    relatedIds: [SALVADOR_VILLA_2803, SALVADOR_APT, PILERNE],
  }),

  listing({
    id: OCEAN,
    slug: OCEAN,
    title: "Ocean Cloud",
    location: "Goa",
    propertyType: "Apartment",
    purpose: "For Sale",
    category: "apartment",
    collectionGroup: "new-launches",
    price: 50_000_000,
    priceDisplay: "From ₹5.00 Cr",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 3,
    bedroomsDisplay: "3 BHK",
    bathrooms: null,
    area: "Goa",
    areaSlug: "",
    region: "Goa",
    builtUpArea: "2,751–2,906 sq ft super built-up",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: "10 residences",
    roadAccess: null,
    parking: "Car Parking",
    possession: null,
    furnishing: null,
    reraNumber: "PRGO08252501",
    amenities: [
      "Rooftop Infinity Pool",
      "Sunset Deck",
      "Private Jacuzzi",
      "Dual Elevators",
      "Gym / Spa",
      "Premium Security",
      "Car Parking",
    ],
    description:
      "A limited collection of ten luxury 3 BHK sea-facing residences, with a rooftop infinity pool, sunset deck, private Jacuzzi, dual elevators, gym and spa, and premium security.",
    shortDescription:
      "Ten luxury 3 BHK sea-facing residences, with rooftop amenities, dual elevators and verified floor-wise pricing.",
    longDescription: [
      "Ocean Cloud is a limited collection of ten luxury 3 BHK sea-facing residences. Shared amenities include a rooftop infinity pool, sunset deck, private Jacuzzi, dual elevators, gym and spa, and premium security, with Car Parking at ground level.",
      "The current price list identifies twelve unit numbers. Residences 501, 601 and 602 are sold and are not offered. Live inventory should be confirmed with us before a viewing is planned — the brochure describes ten residences, while the price list enumerates twelve unit numbers.",
      "Prices and availability are subject to confirmation. The exact locality will be shared once it has been verified for publication.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "02.webp",
      "Ocean Cloud — a sea-facing residence building with curved balconies, planted terraces and a rooftop deck.",
    ),
    media: [
      still(
        OCEAN,
        "02.webp",
        "Ocean Cloud — a sea-facing residence building with curved balconies, planted terraces and a rooftop deck.",
      ),
      still(
        OCEAN,
        "hero.webp",
        "Open sea and sky from a sea-facing residence at Ocean Cloud.",
      ),
      still(
        OCEAN,
        "03.webp",
        "Double-height lobby at Ocean Cloud, with dual elevators beyond the central hall.",
      ),
      still(
        OCEAN,
        "09b.webp",
        "Rooftop infinity pool and sunset deck at Ocean Cloud.",
      ),
      still(
        OCEAN,
        "09-deck.webp",
        "Infinity pool, pergola and deck at the Ocean Cloud rooftop.",
      ),
      still(
        OCEAN,
        "10-terrace.webp",
        "Private Jacuzzi and evening terrace at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-living.webp",
        "Principal living room at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-kitchen.webp",
        "Entrance and lounge at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-bedroom.webp",
        "Kitchen with olive cabinetry and marble surfaces at Ocean Cloud.",
      ),
      still(
        OCEAN,
        "10-bath.webp",
        "Interior living space at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-dining.webp",
        "Dining and living interior at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-suite.webp",
        "Principal bedroom at an Ocean Cloud residence.",
      ),
      still(
        OCEAN,
        "10-jacuzzi.webp",
        "Bedroom with built-in study at an Ocean Cloud residence.",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: "",
    locationPendingConfirmation: true,
    locationNote:
      "Exact locality available on request, pending client confirmation.",
    availabilityDisclaimer: "Prices and availability subject to confirmation.",
    availabilityUpdatedOn: null,
    units: [
      {
        id: "101",
        label: "101",
        area: "2,751 sq ft",
        price: 50_000_000,
        priceDisplay: "₹5.00 Cr",
        status: "available",
      },
      {
        id: "102",
        label: "102",
        area: "2,751 sq ft",
        price: 50_000_000,
        priceDisplay: "₹5.00 Cr",
        status: "available",
      },
      {
        id: "201",
        label: "201",
        area: "2,906 sq ft",
        price: 52_500_000,
        priceDisplay: "₹5.25 Cr",
        status: "available",
      },
      {
        id: "202",
        label: "202",
        area: "2,906 sq ft",
        price: 52_500_000,
        priceDisplay: "₹5.25 Cr",
        status: "available",
      },
      {
        id: "301",
        label: "301",
        area: "2,751 sq ft",
        price: 55_000_000,
        priceDisplay: "₹5.50 Cr",
        status: "available",
      },
      {
        id: "302",
        label: "302",
        area: "2,751 sq ft",
        price: 55_000_000,
        priceDisplay: "₹5.50 Cr",
        status: "available",
      },
      {
        id: "401",
        label: "401",
        area: "2,906 sq ft",
        price: 57_500_000,
        priceDisplay: "₹5.75 Cr",
        status: "available",
      },
      {
        id: "402",
        label: "402",
        area: "2,906 sq ft",
        price: 57_500_000,
        priceDisplay: "₹5.75 Cr",
        status: "available",
      },
      {
        id: "502",
        label: "502",
        area: "2,751 sq ft",
        price: 60_000_000,
        priceDisplay: "₹6.00 Cr",
        status: "available",
      },
      {
        id: "501",
        label: "501",
        area: "2,751 sq ft",
        price: null,
        priceDisplay: "Sold",
        status: "sold",
      },
      {
        id: "601",
        label: "601",
        area: "2,906 sq ft",
        price: null,
        priceDisplay: "Sold",
        status: "sold",
      },
      {
        id: "602",
        label: "602",
        area: "2,906 sq ft",
        price: null,
        priceDisplay: "Sold",
        status: "sold",
      },
    ],
    relatedIds: [DEMURE, ALDONA, PILERNE],
  }),

  listing({
    id: DEMURE,
    slug: DEMURE,
    title: "La Demure",
    location: "North Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    collectionGroup: "new-launches",
    price: null,
    priceDisplay: "Available on Request",
    rent: null,
    status: "available",
    statusLabel: "Available on Request",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "North Goa",
    areaSlug: "",
    region: "North Goa",
    builtUpArea: "179.53 sqm",
    landArea: null,
    plotArea: "975 sqm",
    areaRange: "299.09–330.02 sqm usable",
    communitySize: "4 villas",
    roadAccess: null,
    parking: "Car Parking",
    possession: "Available on Request",
    furnishing: "Fully furnished",
    reraNumber: null,
    reraDisplay: "Available on Request",
    amenities: [
      "Private Pool",
      "Deck",
      "Garden",
      "Gated Community",
      "Fully furnished",
      "Car Parking",
    ],
    description:
      "A boutique collection of four fully furnished 4-bedroom villas in North Goa, each with a private pool, deck and garden, in a gated community of Mediterranean-tropical architecture.",
    shortDescription:
      "Four fully furnished 4-bedroom pool villas in North Goa, with private gardens, decks and pools.",
    longDescription: [
      "La Demure is a boutique collection of four fully furnished 4-bedroom villas. Each residence is planned with a private pool, deck and garden, within a gated community of Mediterranean-tropical architecture.",
      "Villa usable areas are listed from the current area schedule. Price, RERA registration, possession and live availability are available on request until they have been verified for publication.",
      "The collection sits in North Goa. The exact village address will be confirmed with you directly.",
    ],
    features: [],
    heroImage: still(
      DEMURE,
      "02c.webp",
      "La Demure — laterite and terracotta villas with planted drives and Car Parking.",
    ),
    media: [
      still(
        DEMURE,
        "02c.webp",
        "La Demure — laterite and terracotta villas with planted drives and Car Parking.",
      ),
      still(
        DEMURE,
        "02a.webp",
        "Paired villas at La Demure, with laterite facades, tiled roofs and balcony gardens.",
      ),
      still(
        DEMURE,
        "02b.webp",
        "Street elevation of the La Demure villas, with arched openings and tropical planting.",
      ),
      still(
        DEMURE,
        "04.webp",
        "Private pool, wooden deck and garden court at a La Demure villa.",
      ),
      still(
        DEMURE,
        "03.webp",
        "Principal bedroom at La Demure, opening to a private balcony.",
      ),
    ],
    featured: true,
    mediaStatus: "ready",
    mediaFallbackText: null,
    nearbyHighlights: [],
    mapEmbedUrl: "",
    locationPendingConfirmation: true,
    locationNote:
      "Exact village address available on request, pending client confirmation.",
    availabilityDisclaimer:
      "Price, RERA, possession and availability are available on request.",
    availabilityUpdatedOn: null,
    units: [
      {
        id: "villa-1",
        label: "Villa 1",
        area: "330.02 sqm usable",
        price: null,
        priceDisplay: "Available on Request",
        status: "available",
      },
      {
        id: "villa-2",
        label: "Villa 2",
        area: "303.70 sqm usable",
        price: null,
        priceDisplay: "Available on Request",
        status: "available",
      },
      {
        id: "villa-3",
        label: "Villa 3",
        area: "299.09 sqm usable",
        price: null,
        priceDisplay: "Available on Request",
        status: "available",
      },
      {
        id: "villa-4",
        label: "Villa 4",
        area: "325.41 sqm usable",
        price: null,
        priceDisplay: "Available on Request",
        status: "available",
      },
    ],
    relatedIds: [OCEAN, PILERNE, ALDONA],
  }),

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
    parking: "Car Parking",
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Swimming Pool",
      "Deck",
      "Twin-Villa Configuration",
      "Car Parking",
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
    priceDisplay: "Available on Request",
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
    parking: "Covered Car Parking",
    possession: null,
    furnishing: "Semi / fully furnished options",
    reraNumber: null,
    amenities: [
      "Gated Community",
      "Private Swimming Pool",
      "Lift",
      "Covered Car Parking",
      "Power Backup",
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
    parking: "Car Parking",
    possession: null,
    furnishing: "Fully furnished",
    reraNumber: null,
    amenities: [
      "Private Swimming Pool",
      "Lift",
      "Car Parking",
      "Power Backup",
      "Modular Kitchen",
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
    heroImage: FALLBACK.northVilla,
    media: [],
    featured: true,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Private Collection",
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
    parking: "Car Parking",
    possession: "April 2026",
    furnishing: "Unfurnished",
    reraNumber: null,
    amenities: ["Swimming Pool", "Private Garden", "Car Parking", "Unfurnished"],
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
      "Loading and Unloading Bay",
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
    heroImage: {
      src: "/properties/ucassaim-land/hero.webp",
      alt: "Indicative North Goa land — laterite track, open plot and coconut palms. Site photography available on request.",
      kind: "fallback" as const,
    },
    media: [],
    featured: false,
    mediaStatus: "needs-site-photography",
    mediaFallbackText: "Available on Request",
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
    parking: "Car Parking",
    possession: "August 2027",
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Swimming Pool",
      "Lift",
      "Car Parking",
      "Power Backup",
      "Modular Kitchen",
      "Spacious Lounge",
    ],
    description:
      "Four-bedroom villas in Dona Paula, with private pool, lift, car parking, power backup, modular kitchen and a spacious lounge. Possession is expected in August 2027.",
    shortDescription:
      "Four-bedroom villas in Dona Paula. Possession is expected in August 2027.",
    longDescription: [
      "Four-bedroom villas in Dona Paula, with private pool, lift, car parking, power backup, modular kitchen and a spacious lounge. Possession is expected in August 2027.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "hero.webp",
      "Indicative coastal outlook for Luxury Villas in Dona Paula — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
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
    parking: "Car Parking",
    possession: "August 2027",
    furnishing: null,
    reraNumber: null,
    amenities: [
      "Private terrace",
      "Rooftop Swimming Pool",
      "Gazebo sit-out",
      "Lift",
      "24/7 security",
      "Power Backup",
      "Modular Kitchen",
      "Car Parking",
    ],
    description:
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out, with possession expected in August 2027.",
    shortDescription:
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out.",
    longDescription: [
      "A three-bedroom penthouse in Dona Paula with a private terrace, rooftop pool and gazebo sit-out, with possession expected in August 2027.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "10-terrace.webp",
      "Indicative private terrace atmosphere for the Dona Paula penthouse — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
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
    parking: "Car Parking",
    possession: "August 2027",
    furnishing: "Semi-furnished",
    reraNumber: null,
    amenities: [
      "Semi-furnished",
      "Swimming Pool",
      "Lift",
      "24/7 security",
      "Power Backup",
      "Modular Kitchen",
      "Car Parking",
    ],
    description:
      "A three-bedroom apartment in Dona Paula, with swimming pool, lift, 24/7 security, power backup, modular kitchen and car parking. Possession is expected in August 2027.",
    shortDescription:
      "A three-bedroom apartment in Dona Paula. Possession is expected in August 2027.",
    longDescription: [
      "A three-bedroom apartment in Dona Paula, with swimming pool, lift, 24/7 security, power backup, modular kitchen and car parking. Possession is expected in August 2027.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "10-living.webp",
      "Indicative residence interior for the Dona Paula apartment — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: ["dona-paula-villas", "dona-paula-penthouse", REIS],
  }),

  listing({
    id: "3-bhk-residences-dona-paula",
    slug: "3-bhk-residences-dona-paula",
    title: "3 BHK Residences in Dona Paula",
    location: "Dona Paula, Goa",
    propertyType: "Apartment",
    purpose: "For Sale",
    category: "apartment",
    price: 55_000_000,
    priceDisplay: "Starting from ₹5.50 Cr",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession December 2029",
    bedrooms: 3,
    bedroomsDisplay: "3 BHK",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "221 sqm and 231 sqm super built-up",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: "December 2029",
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "3 BHK residences in Dona Paula, Goa, with super built-up options of 221 sqm and 231 sqm. Possession is expected in December 2029.",
    shortDescription:
      "3 BHK residences in Dona Paula, with 221 sqm and 231 sqm super built-up options. Possession December 2029.",
    longDescription: [
      "3 BHK residences in Dona Paula, Goa, offered in two super built-up sizes: 221 sqm and 231 sqm.",
      "Possession is expected in December 2029. Availability is confirmed on enquiry.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "03.webp",
      "Indicative lobby atmosphere for 3 BHK residences in Dona Paula — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: [
      "4-bhk-residences-dona-paula",
      "4-bhk-penthouse-dona-paula",
      "dona-paula-apartment",
    ],
    ctaLabel: "Enquire for Availability",
    ...interestCopy(
      "I'm interested in the 3 BHK Residences in Dona Paula — 221 sqm and 231 sqm.",
    ),
  }),

  listing({
    id: "4-bhk-residences-dona-paula",
    slug: "4-bhk-residences-dona-paula",
    title: "4 BHK Residences in Dona Paula",
    location: "Dona Paula, Goa",
    propertyType: "Apartment",
    purpose: "For Sale",
    category: "apartment",
    price: 75_000_000,
    priceDisplay: "Starting from ₹7.50 Cr",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession December 2029",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "314 sqm and 316 sqm super built-up",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: "December 2029",
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "4 BHK residences in Dona Paula, Goa, with super built-up options of 314 sqm and 316 sqm. Possession is expected in December 2029.",
    shortDescription:
      "4 BHK residences in Dona Paula, with 314 sqm and 316 sqm super built-up options. Possession December 2029.",
    longDescription: [
      "4 BHK residences in Dona Paula, Goa, offered in two super built-up sizes: 314 sqm and 316 sqm.",
      "Possession is expected in December 2029. Availability is confirmed on enquiry.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "09b.webp",
      "Indicative rooftop pool atmosphere for 4 BHK residences in Dona Paula — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: [
      "3-bhk-residences-dona-paula",
      "4-bhk-penthouse-dona-paula",
      "dona-paula-villas",
    ],
    ctaLabel: "Enquire for Availability",
    ...interestCopy(
      "I'm interested in the 4 BHK Residences in Dona Paula — 314 sqm and 316 sqm.",
    ),
  }),

  listing({
    id: "4-bhk-penthouse-dona-paula",
    slug: "4-bhk-penthouse-dona-paula",
    title: "4 BHK Penthouse in Dona Paula",
    location: "Dona Paula, Goa",
    propertyType: "Penthouse",
    purpose: "For Sale",
    category: "penthouse",
    price: 165_000_000,
    priceDisplay: "₹16.50 Cr, all-inclusive",
    rent: null,
    status: "under-construction",
    statusLabel: "Under Construction · Possession December 2029",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK Penthouse",
    bathrooms: null,
    area: "Dona Paula",
    areaSlug: "dona-paula",
    region: "Central Goa",
    builtUpArea: "528 sqm super built-up",
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: "December 2029",
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "A 4 BHK penthouse in Dona Paula, Goa, with 528 sqm super built-up area. The published price is all-inclusive. Possession is expected in December 2029.",
    shortDescription:
      "A 4 BHK penthouse in Dona Paula, 528 sqm super built-up, priced all-inclusive. Possession December 2029.",
    longDescription: [
      "A 4 BHK penthouse in Dona Paula, Goa, with a super built-up area of 528 sqm.",
      "The published price is all-inclusive. Possession is expected in December 2029. Availability is confirmed on enquiry.",
    ],
    features: [],
    heroImage: still(
      OCEAN,
      "10-jacuzzi.webp",
      "Indicative suite atmosphere for the 4 BHK penthouse in Dona Paula — development photography available on request.",
      "fallback",
    ),
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Coming Soon",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Dona Paula, Goa, India"),
    relatedIds: [
      "3-bhk-residences-dona-paula",
      "4-bhk-residences-dona-paula",
      "dona-paula-penthouse",
    ],
    ctaLabel: "Enquire for Availability",
    ...interestCopy(
      "I'm interested in the 4 BHK Penthouse in Dona Paula — 528 sqm.",
    ),
  }),

  listing({
    id: "waterfront-villas-pilerne",
    slug: "waterfront-villas-pilerne",
    title: "Waterfront Villas in Pilerne",
    location: "Pilerne, Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: null,
    priceDisplay: "Available on Request",
    rent: null,
    status: "available",
    statusLabel: "Ready to Move",
    bedrooms: 4,
    bedroomsDisplay: "4 and 5 BHK",
    bathrooms: null,
    area: "Pilerne",
    areaSlug: "pilerne",
    region: "North Goa",
    builtUpArea: null,
    landArea: null,
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "A boutique waterfront villa collection in Pilerne, Goa, in 4 and 5 BHK configurations. The residences are ready to move. Details are shared privately on request.",
    shortDescription:
      "A boutique waterfront villa collection in Pilerne, Goa. 4 and 5 BHK. Ready to move.",
    longDescription: [
      "A boutique waterfront villa collection in Pilerne, Goa, offered in 4 and 5 BHK configurations.",
      "The residences are ready to move. Layouts, pricing and availability are shared privately on request.",
    ],
    features: [],
    heroImage: FALLBACK.lush,
    media: [],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Available on Request",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Pilerne, Goa, India"),
    relatedIds: [PILERNE, "heritage-villa-guirim", REIS],
    ctaLabel: "Request Private Details",
    ...interestCopy("I'm interested in the Waterfront Villas in Pilerne."),
  }),

  listing({
    id: "heritage-villa-guirim",
    slug: "heritage-villa-guirim",
    title: "Fully Furnished Heritage Villa in Guirim",
    location: "Guirim, Goa",
    propertyType: "Villa",
    purpose: "For Sale",
    category: "villa",
    price: 130_000_000,
    priceDisplay: "₹13 Cr",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: 4,
    bedroomsDisplay: "4 BHK",
    bathrooms: null,
    area: "Guirim",
    areaSlug: "guirim",
    region: "North Goa",
    builtUpArea: "464.5 sqm",
    landArea: "975.5 sqm",
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: null,
    parking: null,
    possession: null,
    furnishing: "Fully furnished",
    reraNumber: null,
    amenities: [],
    description:
      "A restored Goan-Portuguese heritage residence in Guirim, Goa. Fully furnished 4 BHK, on 975.5 sqm of land, with 464.5 sqm built-up area.",
    shortDescription:
      "A fully furnished 4 BHK restored Goan-Portuguese heritage villa in Guirim, Goa.",
    longDescription: [
      "A restored Goan-Portuguese heritage residence in Guirim, Goa.",
      "The villa is a fully furnished 4 BHK, standing on 975.5 sqm of land, with a built-up area of 464.5 sqm.",
    ],
    features: [],
    heroImage: {
      src: "/properties/heritage-villa-guirim/original_hero.webp",
      alt: "Fully Furnished Heritage Villa in Guirim",
      kind: "fallback" as const,
    },
    media: [
      {
        src: "/properties/heritage-villa-guirim/original_hero.webp",
        alt: "Fully Furnished Heritage Villa in Guirim",
        kind: "fallback" as const,
      },
    ],
    featured: false,
    mediaStatus: "needs-approved-photography",
    mediaFallbackText: "Private Collection",
    nearbyHighlights: [],
    mapEmbedUrl: mapsEmbedUrl("Guirim, Goa, India"),
    relatedIds: [ALDONA, "waterfront-villas-pilerne", PILERNE],
    ctaLabel: "Request Private Viewing",
    ...interestCopy(
      "I'm interested in the Fully Furnished Heritage Villa in Guirim.",
    ),
  }),

  listing({
    id: "prime-land-assagao",
    slug: "prime-land-assagao",
    title: "Prime Land in Assagao",
    location: "Assagao, North Goa",
    propertyType: "Land",
    purpose: "For Sale",
    category: "land",
    price: null,
    priceDisplay: "₹90,000 per sqm",
    pricePositioning: "Negotiable",
    rent: null,
    status: "available",
    statusLabel: "Available",
    bedrooms: null,
    bedroomsDisplay: null,
    bathrooms: null,
    area: "Assagao",
    areaSlug: "assagao",
    region: "North Goa",
    builtUpArea: null,
    landArea: "3,850 sqm",
    plotArea: null,
    areaRange: null,
    communitySize: null,
    roadAccess: "Main-road access",
    parking: null,
    possession: null,
    furnishing: null,
    reraNumber: null,
    amenities: [],
    description:
      "Prime land in Assagao, North Goa: 3,850 sqm, with main-road access, an open-field outlook and lush tropical surroundings.",
    shortDescription:
      "3,850 sqm of prime land in Assagao, North Goa, with main-road access and an open-field outlook.",
    longDescription: [
      "Prime land in Assagao, North Goa, measuring 3,850 sqm.",
      "The holding has main-road access, an open-field outlook and lush tropical surroundings.",
    ],
    features: [],
    heroImage: {
      src: "/properties/prime-land-assagao/hero.webp",
      alt: "Indicative North Goa land — open tropical field with laterite earth and palms. Site photography available on request.",
      kind: "fallback" as const,
    },
    media: [],
    featured: false,
    mediaStatus: "needs-site-photography",
    mediaFallbackText: "Available on Request",
    nearbyHighlights: [
      "Main-road access",
      "Open-field outlook",
      "Lush tropical surroundings",
    ],
    mapEmbedUrl: mapsEmbedUrl("Assagao, North Goa, India"),
    relatedIds: ["ucassaim-land", ALDONA, PILERNE],
    ctaLabel: "Request Land Details",
    availabilityDisclaimer: "Price and availability subject to confirmation.",
    ...interestCopy(
      "I'm interested in the Prime Land in Assagao — 3,850 sqm.",
    ),
  }),
];

export function listingGallery(property: Property) {
  return property.media.filter(
    (image) => image.kind !== "fallback" && image.kind !== "plan",
  );
}

export function listingPlans(property: Property) {
  return property.media.filter((image) => image.kind === "plan");
}

export function hasPhotography(property: Property) {
  return listingGallery(property).length > 0;
}

export function isSalvadorListing(property: Property) {
  return property.collectionGroup === "salvador";
}

export function getSalvadorProperties() {
  return properties.filter(isSalvadorListing);
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
  return uniqueProperties(
    properties.filter(
      (property) => property.featured && property.category !== "commercial",
    ),
  );
}

export function isNewLaunch(property: Property) {
  return property.collectionGroup === "new-launches";
}

export function uniqueProperties(list: Property[]) {
  const seen = new Set<string>();
  return list.filter((property) => {
    const key = property.id || property.slug;
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function groupPropertiesByCollection(list: Property[]) {
  const deduped = uniqueProperties(list);
  return collectionGroupOrder
    .map((id) => ({
      id,
      label: collectionGroupLabels[id],
      properties: deduped.filter((item) => item.collectionGroup === id),
    }))
    .filter((group) => group.properties.length > 0);
}

export function getRelatedProperties(property: Property) {
  return uniqueProperties(
    property.relatedIds
      .map((id) => properties.find((item) => item.id === id))
      .filter((item): item is Property => Boolean(item)),
  );
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
