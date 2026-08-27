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
    slug: "salvador",
    name: "Salvador",
    region: "North Goa",
    descriptor: "3 BHK apartments and private pool villas in Salvador, Goa.",
    longer:
      "Salvador, Goa. Current inventory includes eight 3 BHK apartments with floor-wise starting prices, and two private pool villas.",
    image: "/properties/3-bhk-apartments-salvador/hero.webp",
    imageAlt:
      "Architectural render of a five-storey apartment building in Salvador, Goa.",
  },
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
    descriptor: "Waterfront villas and a gated four-bedroom collection.",
    longer:
      "Pilerne, North Goa. Current inventory includes waterfront villas ready to move, and a gated collection of four-bedroom villas with private outdoor space.",
    image: "/properties/pilerne-villa-collection/hero.webp",
    imageAlt: "Principal living interior of a villa in Pilerne, North Goa.",
  },
  {
    slug: "saipem",
    name: "Saipem",
    region: "North Goa",
    descriptor: "A private four-bedroom villa opportunity in North Goa.",
    longer:
      "Saipem, North Goa. A four-bedroom villa listing; approved photography is available privately on request.",
    image: "/properties/la-demure/04.webp",
    imageAlt: "Saipem, North Goa — private collection, available on request.",
  },
  {
    slug: "reis-magos",
    name: "Reis Magos",
    region: "North Goa",
    descriptor: "Villas under construction, with possession expected in April 2026.",
    longer:
      "Reis Magos, North Goa. A limited collection of 3.5-bedroom villas, currently under construction, with possession expected in April 2026.",
    image: "/properties/reis-magos-villas/54.webp",
    imageAlt: "Villas taking shape among palms in Reis Magos, North Goa.",
  },
  {
    slug: "verna",
    name: "Verna",
    region: "South Goa",
    descriptor: "Warehouse space for logistics, storage and distribution.",
    longer:
      "Verna, Goa. Flexible commercial warehouse space from 5,000 to 113,000 square feet.",
    image: "/properties/verna-warehouse/hero.webp",
    imageAlt: "Warehouse space in Verna, Goa.",
  },
  {
    slug: "ucassaim",
    name: "Ucassaim",
    region: "North Goa",
    descriptor: "Old-settlement land, close to Mapusa, with 6-metre road access.",
    longer:
      "Ucassaim, North Goa. An old-settlement land holding of 4,625 square metres, close to Mapusa.",
    image: "/properties/ucassaim-land/hero.webp",
    imageAlt: "Ucassaim, North Goa — old-settlement land, available on request.",
  },
  {
    slug: "dona-paula",
    name: "Dona Paula",
    region: "Central Goa",
    descriptor:
      "Residences, a penthouse and villas, with possession in 2027 and 2029.",
    longer:
      "Dona Paula, Goa. Current inventory includes 3 BHK and 4 BHK residences and a 4 BHK penthouse with possession expected in December 2029, together with four-bedroom villas, a three-bedroom penthouse and a three-bedroom apartment with possession expected in August 2027.",
    image: "/properties/ocean-cloud/hero.webp",
    imageAlt: "Dona Paula, Goa — coastal residences available on request.",
  },
  {
    slug: "guirim",
    name: "Guirim",
    region: "North Goa",
    descriptor: "A restored Goan-Portuguese heritage villa.",
    longer:
      "Guirim, North Goa. Current inventory includes a fully furnished four-bedroom heritage villa on a private plot.",
    image: "/images/contact-goa-villa.webp",
    imageAlt: "Guirim, Goa — heritage villa collection available on request.",
  },
  {
    slug: "assagao",
    name: "Assagao",
    region: "North Goa",
    descriptor: "Prime land with main-road access in North Goa.",
    longer:
      "Assagao, North Goa. Current inventory includes 3,850 sqm of land with main-road access and an open-field outlook.",
    image: "/properties/prime-land-assagao/hero.webp",
    imageAlt: "Assagao, North Goa — prime land with an open-field outlook, available on request.",
  },
];

export function getAreaBySlug(slug: string) {
  return areas.find((area) => area.slug === slug);
}
