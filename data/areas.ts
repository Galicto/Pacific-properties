/**
 * Neighbourhood entries for inventory currently on the collection.
 * Imagery is taken from verified listing stills, or a fallback texture
 * where approved photography is not yet available.
 */

export type Area = {
  slug: string;
  name: string;
  region: "North Goa" | "Central Goa" | "South Goa";
  descriptor: string;
  longer: string;
  image: string;
  imageAlt: string;
};

export const areas: Area[] = [
  {
    slug: "aldona",
    name: "Aldona",
    region: "North Goa",
    descriptor: "A North Goa village address for a contemporary twin-villa offering.",
    longer:
      "Aldona, North Goa. Current inventory includes a contemporary twin-villa residence with private outdoor living.",
    image: "/properties/aldona-twin-villas/hero.webp",
    imageAlt: "Twin villas in Aldona, North Goa.",
  },
  {
    slug: "pilerne",
    name: "Pilerne",
    region: "North Goa",
    descriptor: "A limited gated collection of six four-bedroom villas.",
    longer:
      "Pilerne, North Goa. A gated collection of six four-bedroom villas with private outdoor space.",
    image: "/properties/pilerne-villa-collection/24.webp",
    imageAlt: "Private pool and garden at the Pilerne villa collection.",
  },
  {
    slug: "saipem",
    name: "Saipem",
    region: "North Goa",
    descriptor: "A private four-bedroom villa opportunity in North Goa.",
    longer:
      "Saipem, North Goa. A four-bedroom villa listing; approved photography is available privately on request.",
    image: "/properties/_fallbacks/preview.webp",
    imageAlt: "Saipem, North Goa — private preview available on request.",
  },
  {
    slug: "reis-magos",
    name: "Reis Magos",
    region: "North Goa",
    descriptor: "Villas under construction, with possession expected in April 2026.",
    longer:
      "Reis Magos, North Goa. A limited collection of 3.5-bedroom villas, currently under construction, with possession expected in April 2026.",
    image: "/properties/reis-magos-villas/53.webp",
    imageAlt: "Construction progress at villas in Reis Magos, North Goa.",
  },
  {
    slug: "verna",
    name: "Verna",
    region: "South Goa",
    descriptor: "Warehouse space for logistics, storage and distribution.",
    longer:
      "Verna, Goa. Flexible commercial warehouse space from 5,000 to 113,000 square feet.",
    image: "/properties/verna-warehouse/61.webp",
    imageAlt: "Access to warehouse space in Verna, Goa.",
  },
  {
    slug: "ucassaim",
    name: "Ucassaim",
    region: "North Goa",
    descriptor: "Old-settlement land, close to Mapusa, with 6-metre road access.",
    longer:
      "Ucassaim, North Goa. An old-settlement land holding of 4,625 square metres, close to Mapusa.",
    image: "/properties/_fallbacks/land.webp",
    imageAlt: "Ucassaim, North Goa — private land dossier available on request.",
  },
  {
    slug: "dona-paula",
    name: "Dona Paula",
    region: "Central Goa",
    descriptor: "Villas, a penthouse and an apartment, possession August 2027.",
    longer:
      "Dona Paula, Goa. Current inventory includes four-bedroom villas, a three-bedroom penthouse with private terrace, and a three-bedroom apartment. Possession is expected in August 2027.",
    image: "/properties/_fallbacks/plans.webp",
    imageAlt: "Dona Paula, Goa — private preview and detailed plans available on request.",
  },
];

export function getAreaBySlug(slug: string) {
  return areas.find((area) => area.slug === slug);
}
