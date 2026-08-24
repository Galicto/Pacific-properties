import { mapsEmbedUrl } from "@/lib/config";

export type PropertyCategory =
  | "villa"
  | "apartment"
  | "land"
  | "commercial"
  | "investment";

export type PropertyStatus =
  | "available"
  | "under-offer"
  | "coming-soon"
  | "sold";

export type Region = "North Goa" | "Central Goa" | "South Goa";

export type PropertyImage = {
  src: string;
  alt: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  location: string;
  area: string;
  areaSlug: string;
  region: Region;
  bedrooms: number | null;
  bathrooms: number | null;
  builtUpArea: string | null;
  landArea: string | null;
  parking: string | null;
  price: number | null;
  priceDisplay: string;
  status: PropertyStatus;
  statusLabel: string;
  shortDescription: string;
  longDescription: string[];
  features: string[];
  amenities: string[];
  images: PropertyImage[];
  video?: string;
  nearbyHighlights: string[];
  mapEmbedUrl: string;
  lat?: number;
  lng?: number;
  relatedIds: string[];
  featured?: boolean;
  possession?: string;
};

/**
 * Unsplash stills used as stand-ins for architectural photography.
 * REPLACE: download approved photography into /public/properties/{slug}/01.jpg etc.
 * and update each `src`. Keep alt text.
 */
function photo(id: string, alt: string): PropertyImage {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop`,
    alt,
  };
}

export const categoryLabels: Record<PropertyCategory, string> = {
  villa: "Villa",
  apartment: "Apartment",
  land: "Land",
  commercial: "Commercial",
  investment: "Investment",
};

export const properties: Property[] = [
  {
    id: "villa-sereno",
    slug: "villa-sereno",
    title: "Villa Sereno",
    category: "villa",
    location: "Assagao, North Goa",
    area: "Assagao",
    areaSlug: "assagao",
    region: "North Goa",
    bedrooms: 4,
    bathrooms: 5,
    builtUpArea: "420 sq. m.",
    landArea: "1,120 sq. m.",
    parking: "4 cars",
    price: 125_000_000,
    priceDisplay: "₹12.5 Cr",
    status: "available",
    statusLabel: "Available",
    featured: true,
    possession: "Ready to move",
    shortDescription:
      "A laterite-and-lime residence organised around a quiet courtyard, set back from Assagao’s village roads.",
    longDescription: [
      "Villa Sereno sits on a gently rising plot in Assagao, oriented to hold the cooler hours of the day. The architecture is tropical-modern without theatre: thick laterite walls, a lime-washed courtyard, and a pool that reads as a sheet of water rather than a statement.",
      "Four bedroom suites are arranged for privacy, with the principal rooms opening to planted courts. Interiors are spare — teak, stone, linen — so the light and the garden can do the work.",
      "The house is offered as a completed residence, with staff quarters, a covered pavilion, and room to live at a measured pace. It is a home for those who already know Assagao, or who intend to learn it properly.",
    ],
    features: [
      "Courtyard plan with laterite masonry",
      "Principal suite with private garden",
      "Separate staff accommodation",
      "Covered dining pavilion",
      "Borewell and rainwater provision",
      "High compound, discreet approach",
    ],
    amenities: [
      "Swimming pool",
      "Outdoor kitchen",
      "Study",
      "Backup power",
      "Landscaped gardens",
      "Climate-controlled suites",
    ],
    images: [
      photo("photo-1600596542815-ffad4c1539a9", "Villa Sereno — evening view of the residence and pool."),
      photo("photo-1613977257592-4871e5fcd7c4", "Villa Sereno — courtyard and covered gallery."),
      photo("photo-1600210491892-03d54c0aaf87", "Villa Sereno — living room opening to the garden."),
      photo("photo-1600585154526-990dced4db0d", "Villa Sereno — dining interior."),
      photo("photo-1600566753086-00f18fb6b3ea", "Villa Sereno — interior gallery with planted court."),
    ],
    nearbyHighlights: [
      "Village bakeries and long-table restaurants within a short drive",
      "Quiet lanes towards Siolim and Moira",
      "Anjuna and the northern beaches twenty minutes away",
      "Mapusa market for weekly provisions",
    ],
    mapEmbedUrl: mapsEmbedUrl("Assagao, Goa, India"),
    lat: 15.593,
    lng: 73.763,
    relatedIds: ["casa-da-mare", "elevated-residence", "verdant-plot"],
  },
  {
    id: "casa-da-mare",
    slug: "casa-da-mare",
    title: "Casa da Maré",
    category: "villa",
    location: "Siolim, North Goa",
    area: "Siolim",
    areaSlug: "siolim",
    region: "North Goa",
    bedrooms: 3,
    bathrooms: 4,
    builtUpArea: "310 sq. m.",
    landArea: "860 sq. m.",
    parking: "3 cars",
    price: null,
    priceDisplay: "Price on Request",
    status: "available",
    statusLabel: "Private listing",
    featured: true,
    possession: "Ready to move",
    shortDescription:
      "A low, river-facing house in Siolim, designed for shade, cross-breezes and long, unhurried evenings.",
    longDescription: [
      "Casa da Maré is held a little above the Chapora’s tidal reach, in a part of Siolim that still feels like a village. The house is single-storey in spirit, with a second level used sparingly for a study and a guest suite.",
      "Water is the organising idea — a linear pool, deep verandahs, and rooms that stay dim and cool. The architecture borrows from Indo-Portuguese domestic scale without costume.",
      "Offered as a private listing, the residence will suit a buyer who prefers to be introduced rather than to browse. Viewings are arranged by appointment.",
    ],
    features: [
      "River-oriented verandahs",
      "Linear swimming pool",
      "Guest suite with independent access",
      "Mature fruit trees on the plot",
      "Restored laterite boundary",
      "Quiet residential lane",
    ],
    amenities: [
      "Pool",
      "Outdoor shower",
      "Library/study",
      "Staff room",
      "Covered parking",
      "Irrigation",
    ],
    images: [
      photo("photo-1613490493576-7fde63acd811", "Casa da Maré — pool terrace at the heart of the house."),
      photo("photo-1571896349842-33c89424de2d", "Casa da Maré — covered lounge beside the water."),
      photo("photo-1600210492486-724fe5c67fb0", "Casa da Maré — bedroom with filtered tropical light."),
      photo("photo-1600607687920-4e2a09cf159d", "Casa da Maré — bathing room in stone and timber."),
      photo("photo-1540541338287-41700207dee6", "Casa da Maré — the pool as a still plane of water."),
    ],
    nearbyHighlights: [
      "Siolim village church and riverside walks",
      "Morjim and Ashwem within easy reach",
      "Ferry and bridge links towards the north",
      "Weekly village market",
    ],
    mapEmbedUrl: mapsEmbedUrl("Siolim, Goa, India"),
    lat: 15.618,
    lng: 73.769,
    relatedIds: ["villa-sereno", "coastal-estate", "casa-altura"],
  },
  {
    id: "coastal-estate",
    slug: "coastal-estate",
    title: "Coastal Estate",
    category: "villa",
    location: "Candolim, North Goa",
    area: "Candolim",
    areaSlug: "candolim",
    region: "North Goa",
    bedrooms: 5,
    bathrooms: 6,
    builtUpArea: "680 sq. m.",
    landArea: "1,850 sq. m.",
    parking: "6 cars",
    price: 180_000_000,
    priceDisplay: "₹18 Cr",
    status: "available",
    statusLabel: "Available",
    featured: true,
    possession: "Ready to move",
    shortDescription:
      "A substantial coastal residence in Candolim, set in a walled garden with a long pool and rooms for gathering.",
    longDescription: [
      "Coastal Estate is a five-bedroom house for people who entertain, host family across continents, and still want a private wing. The plot is unusually generous for Candolim, buffered from the beach road by planting and a high laterite wall.",
      "The principal rooms face a long pool and a lawn that takes the afternoon light. A pavilion at the far end of the garden is used for meals that run late. Staff circulation is considered, as it must be in a house of this scale.",
      "The address is coastal without being exposed. The sea is a short, shaded walk; the house itself remains a retreat.",
    ],
    features: [
      "Five bedroom suites including a private wing",
      "Eighteen-metre swimming pool",
      "Garden pavilion and outdoor kitchen",
      "Staff quarters and service court",
      "Home office",
      "Room for a small gym or studio",
    ],
    amenities: [
      "Pool",
      "Landscaped lawns",
      "Backup power",
      "Water storage",
      "Climate control",
      "Covered parking",
    ],
    images: [
      photo("photo-1582268611958-ebfd161ef9cf", "Coastal Estate — garden elevation with pool."),
      photo("photo-1564013799919-ab600027ffc6", "Coastal Estate — pool and lawn in late light."),
      photo("photo-1602343168117-bb8ffe3e2e9f", "Coastal Estate — aerial of the residence and water."),
      photo("photo-1512917774080-9991f1c4c750", "Coastal Estate — evening terrace."),
      photo("photo-1571003123894-1f0594d2b5d9", "Coastal Estate — poolside living."),
    ],
    nearbyHighlights: [
      "Candolim beach within a short walk",
      "Fort Aguada and Sinquerim",
      "Calangute and the northern strip when required",
      "Well-served by established restaurants",
    ],
    mapEmbedUrl: mapsEmbedUrl("Candolim, Goa, India"),
    lat: 15.518,
    lng: 73.763,
    relatedIds: ["casa-da-mare", "vantage-residences", "palms-atelier"],
  },
  {
    id: "elevated-residence",
    slug: "elevated-residence",
    title: "Elevated Residence",
    category: "villa",
    location: "Reis Magos, North Goa",
    area: "Reis Magos",
    areaSlug: "reis-magos",
    region: "North Goa",
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: "265 sq. m.",
    landArea: "640 sq. m.",
    parking: "2 cars",
    price: 78_000_000,
    priceDisplay: "₹7.8 Cr",
    status: "available",
    statusLabel: "Available",
    featured: true,
    possession: "Ready to move",
    shortDescription:
      "A three-bedroom house on a rise above Reis Magos, with a long view towards the Mandovi and the fort.",
    longDescription: [
      "Elevated Residence is a compact, carefully made house. The plot is not large, but it is well placed: high enough to catch the river, far enough from the road to remain quiet.",
      "Three bedrooms, a generous living volume, and a terrace that does most of the living in the dry months. The architecture is contemporary, with a restrained material palette — concrete, timber, and a single laterite wall that holds the garden.",
      "It will suit a couple, a small family, or someone who wants a serious Goa house without the burden of a large estate.",
    ],
    features: [
      "River-oriented terrace",
      "Open living volume",
      "Three bedroom suites",
      "Compact, efficient plan",
      "Established planting",
      "Quiet residential pocket",
    ],
    amenities: [
      "Plunge pool",
      "Terrace kitchen",
      "Study nook",
      "Backup power",
      "Covered parking",
      "Climate control",
    ],
    images: [
      photo("photo-1613977257363-707ba9348227", "Elevated Residence — whitewashed volumes against tropical planting."),
      photo("photo-1600607687939-ce8a6c25118c", "Elevated Residence — garden and pool court."),
      photo("photo-1523217582562-09d0def993a6", "Elevated Residence — street-facing elevation."),
      photo("photo-1600585152220-90363fe7e115", "Elevated Residence — kitchen and living volume."),
      photo("photo-1448630360428-65456885c650", "Elevated Residence — modern house in planting."),
    ],
    nearbyHighlights: [
      "Reis Magos Fort and the riverfront",
      "Ferry to Panaji",
      "Nerul and the Candolim stretch nearby",
      "Quieter than the main beach villages",
    ],
    mapEmbedUrl: mapsEmbedUrl("Reis Magos, Goa, India"),
    lat: 15.497,
    lng: 73.809,
    relatedIds: ["villa-sereno", "casa-altura", "verdant-plot"],
  },
  {
    id: "verdant-plot",
    slug: "verdant-plot",
    title: "Verdant Plot",
    category: "land",
    location: "Moira, North Goa",
    area: "Moira",
    areaSlug: "moira",
    region: "North Goa",
    bedrooms: null,
    bathrooms: null,
    builtUpArea: null,
    landArea: "2,400 sq. m.",
    parking: null,
    price: null,
    priceDisplay: "Price on Request",
    status: "available",
    statusLabel: "By introduction",
    featured: true,
    possession: "Immediate",
    shortDescription:
      "A walled, well-planted parcel in Moira, suited to a single residence with a generous garden.",
    longDescription: [
      "Verdant Plot is land with a character already established: mature trees, a laterite boundary, and a shape that allows a house to sit without dominating the village around it.",
      "Moira remains one of North Goa’s more considered residential villages — low, green, and still organised around its church and fields. The parcel is offered to those intending to build a home, not a compound of many units.",
      "Due diligence, conversion status and building parameters will be shared in a private note. Viewings are by appointment only.",
    ],
    features: [
      "Approximately 2,400 sq. m.",
      "Mature tree cover",
      "Laterite boundary walls",
      "Village-road access",
      "Quiet residential context",
      "Suitable for a single residence",
    ],
    amenities: [
      "Existing well",
      "Electricity at the boundary",
      "Established access",
    ],
    images: [
      photo("photo-1470770841072-f978cf4d019e", "Verdant Plot — a house-scale clearing in deep planting."),
      photo("photo-1469474968028-56623f02e42e", "Verdant Plot — wooded edge of the parcel."),
      photo("photo-1470071459604-3b5ec3a7fe05", "Verdant Plot — morning light over the land."),
      photo("photo-1441974231531-c6227db76b6e", "Verdant Plot — canopy and filtered light."),
      photo("photo-1552733407-5d5c46c3bb3b", "Verdant Plot — tropical path through the site."),
    ],
    nearbyHighlights: [
      "Moira church and village square",
      "Assagao and Siolim a few minutes away",
      "Fields and quiet cycling lanes",
      "Mapusa for daily needs",
    ],
    mapEmbedUrl: mapsEmbedUrl("Moira, Goa, India"),
    lat: 15.594,
    lng: 73.837,
    relatedIds: ["villa-sereno", "elevated-residence", "casa-da-mare"],
  },
  {
    id: "casa-altura",
    slug: "casa-altura",
    title: "Casa Altura",
    category: "apartment",
    location: "Anjuna, North Goa",
    area: "Anjuna",
    areaSlug: "anjuna",
    region: "North Goa",
    bedrooms: 2,
    bathrooms: 2,
    builtUpArea: "148 sq. m.",
    landArea: null,
    parking: "2 cars",
    price: 28_500_000,
    priceDisplay: "₹2.85 Cr",
    status: "available",
    statusLabel: "Available",
    featured: true,
    possession: "Ready to move",
    shortDescription:
      "A two-bedroom apartment in a low, planted building above Anjuna, with a terrace that holds the evening breeze.",
    longDescription: [
      "Casa Altura is an apartment for people who want Anjuna without living on its busiest lanes. The building is low-rise, the neighbours few, and the terrace is large enough to dine on through the season.",
      "Two bedrooms, an open living kitchen, and storage that has been thought through. Materials are quiet: pale stone, timber, linen. The sea is a short drive; the house itself is for returning to.",
      "A practical second home, or a primary residence for someone who prefers not to maintain a villa.",
    ],
    features: [
      "Wraparound terrace",
      "Two bedroom suites",
      "Open kitchen and living",
      "Allocated parking for two cars",
      "Low-rise building of few residences",
      "Planted common areas",
    ],
    amenities: [
      "Shared pool",
      "Backup power",
      "Lift",
      "Security",
      "Climate control",
      "Storage locker",
    ],
    images: [
      photo("photo-1502672260266-1c1ef2d93688", "Casa Altura — living space with a long terrace."),
      photo("photo-1522708323590-d24dbb6b0267", "Casa Altura — sitting room in natural light."),
      photo("photo-1560448204-e02f11c3d0e2", "Casa Altura — kitchen and dining."),
      photo("photo-1600121848594-d8644e57abab", "Casa Altura — interior volume."),
      photo("photo-1598928506311-c55ded91a20c", "Casa Altura — calm sitting room."),
    ],
    nearbyHighlights: [
      "Anjuna beach and the northern coastline",
      "Vagator a few minutes away",
      "Cafés and galleries of the village",
      "Mapusa and Assagao close at hand",
    ],
    mapEmbedUrl: mapsEmbedUrl("Anjuna, Goa, India"),
    lat: 15.584,
    lng: 73.743,
    relatedIds: ["vantage-residences", "elevated-residence", "casa-da-mare"],
  },
  {
    id: "palms-atelier",
    slug: "palms-atelier",
    title: "Palms Atelier",
    category: "commercial",
    location: "Candolim, North Goa",
    area: "Candolim",
    areaSlug: "candolim",
    region: "North Goa",
    bedrooms: null,
    bathrooms: 2,
    builtUpArea: "220 sq. m.",
    landArea: "380 sq. m.",
    parking: "4 cars",
    price: 65_000_000,
    priceDisplay: "₹6.5 Cr",
    status: "available",
    statusLabel: "Available",
    featured: true,
    possession: "Immediate",
    shortDescription:
      "A ground-plus-one commercial house on a considered Candolim lane, suited to a studio, atelier or quiet office.",
    longDescription: [
      "Palms Atelier is a small commercial building with the manners of a house. It sits on a side lane, with a planted setback, high ceilings and a first-floor terrace that can take a long table.",
      "The ground floor is a single, well-proportioned hall; above, two rooms and a terrace. It will suit a design practice, a private office, a showroom that does not need a highway frontage, or a hospitality concept of the quieter kind.",
      "Tenure, permitted use and fit-out condition are available on request. Introductions are made to principals only.",
    ],
    features: [
      "Ground-plus-one independent building",
      "High-ceilinged hall",
      "First-floor terrace",
      "Planted front setback",
      "Private parking",
      "Separate service access",
    ],
    amenities: [
      "Backup power",
      "Water storage",
      "Climate-ready interiors",
      "Fibre connectivity at the street",
    ],
    images: [
      photo("photo-1497366216548-37526070297c", "Palms Atelier — bright commercial interior."),
      photo("photo-1497366811353-6870744d04b2", "Palms Atelier — meeting room with garden light."),
      photo("photo-1497215728101-856f4ea42174", "Palms Atelier — open studio floor."),
      photo("photo-1524758631624-e2822e304c36", "Palms Atelier — composed workspace."),
      photo("photo-1604328698692-f76ea9498e76", "Palms Atelier — gallery-like hall."),
    ],
    nearbyHighlights: [
      "Candolim’s established hospitality belt",
      "Easy access to the NH and the beaches",
      "Calangute and Sinquerim nearby",
      "Staff housing options in adjoining villages",
    ],
    mapEmbedUrl: mapsEmbedUrl("Candolim, Goa, India"),
    lat: 15.515,
    lng: 73.766,
    relatedIds: ["coastal-estate", "vantage-residences", "casa-altura"],
  },
  {
    id: "vantage-residences",
    slug: "vantage-residences",
    title: "Vantage Residences",
    category: "investment",
    location: "Anjuna, North Goa",
    area: "Anjuna",
    areaSlug: "anjuna",
    region: "North Goa",
    bedrooms: 3,
    bathrooms: 3,
    builtUpArea: "186 sq. m.",
    landArea: null,
    parking: "2 cars",
    price: 42_000_000,
    priceDisplay: "₹4.2 Cr",
    status: "coming-soon",
    statusLabel: "Coming soon",
    featured: true,
    possession: "From 2027",
    shortDescription:
      "A limited collection of residences in Anjuna, offered as a considered investment with a life that can be lived in.",
    longDescription: [
      "Vantage Residences is a small, well-sited collection — not a resort, and not a tower. The units are genuine homes: three bedrooms, a proper kitchen, and terraces sized for living rather than for a brochure.",
      "The investment case is simple and unhurried. Anjuna remains one of North Goa’s more durable addresses, and inventory of this quality is finite. Yield assumptions, holding periods and furnishing options are discussed privately.",
      "A limited number of residences are being released. We will share the booklet with buyers who intend to hold, to live, or both.",
    ],
    features: [
      "Limited collection of residences",
      "Three-bedroom layouts",
      "Private terraces",
      "Shared pool and garden",
      "Managed common areas",
      "Optional furnishing",
    ],
    amenities: [
      "Pool",
      "Concierge desk",
      "Backup power",
      "Parking",
      "Climate control",
      "Landscaped court",
    ],
    images: [
      photo("photo-1499793983690-e29da59ef1c2", "Vantage Residences — tropical modern house form."),
      photo("photo-1544984243-ec57ea16fe25", "Vantage Residences — pool and planted court."),
      photo("photo-1416331108676-a22ccb276e35", "Vantage Residences — resort-scaled garden."),
      photo("photo-1520250497591-112f2f40a3f4", "Vantage Residences — covered living terrace."),
      photo("photo-1566073771259-6a8506099945", "Vantage Residences — pool deck."),
    ],
    nearbyHighlights: [
      "Anjuna and Vagator coastline",
      "Established rental demand in season",
      "Assagao’s dining within a short drive",
      "Airport via the northern roads",
    ],
    mapEmbedUrl: mapsEmbedUrl("Anjuna, Goa, India"),
    lat: 15.578,
    lng: 73.741,
    relatedIds: ["casa-altura", "coastal-estate", "palms-atelier"],
  },
];

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
