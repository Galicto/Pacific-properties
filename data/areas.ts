/**
 * Neighbourhood copy and imagery for “Explore Goa by Address”.
 * REPLACE images with local photography when available.
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
    slug: "assagao",
    name: "Assagao",
    region: "North Goa",
    descriptor: "Village lanes, laterite walls, a quieter inland life.",
    longer:
      "Assagao sits just inland of the northern beaches — green, residential, and still organised around its church and village roads. It is where many of Goa’s more considered houses have been made in the last two decades.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop",
    imageAlt: "Tropical architecture and planting in the spirit of Assagao.",
  },
  {
    slug: "siolim",
    name: "Siolim",
    region: "North Goa",
    descriptor: "River light, old houses, a village that still feels like one.",
    longer:
      "Siolim holds the Chapora’s tidal edge and a stock of Indo-Portuguese houses that have not all been turned into something else. It is a place for those who prefer the river to the beach road.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop",
    imageAlt: "A narrow street of older, Portuguese-influenced houses.",
  },
  {
    slug: "anjuna",
    name: "Anjuna",
    region: "North Goa",
    descriptor: "Coast, cliff and village — still the north’s most vivid address.",
    longer:
      "Anjuna is more than its season. Behind the beach, residential pockets remain, and the light off the water still explains why people stay. We look for houses set a little back, with a life that can be lived year-round.",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop",
    imageAlt: "The Arabian Sea along a northern Goa shoreline.",
  },
  {
    slug: "candolim",
    name: "Candolim",
    region: "North Goa",
    descriptor: "A coastal stretch with depth, if you know where to look.",
    longer:
      "Candolim is often read too quickly. Away from the main road there are walled gardens, older plots and houses that face the water without performing for it. Scale is possible here, with the beach still a walk away.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop",
    imageAlt: "Palm-lined tropical shoreline near Candolim.",
  },
  {
    slug: "moira",
    name: "Moira",
    region: "North Goa",
    descriptor: "Fields, a famous church, and land that still has room to breathe.",
    longer:
      "Moira remains one of the more intact villages of Bardez — low, green, and still structured by its fields. It is a place to build a house with a garden, not a skyline.",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop",
    imageAlt: "A verdant, house-scaled landscape in the spirit of Moira.",
  },
  {
    slug: "reis-magos",
    name: "Reis Magos",
    region: "North Goa",
    descriptor: "Above the Mandovi, with the fort as a neighbour.",
    longer:
      "Reis Magos occupies a rise above the river, looking back towards Panaji. The fort gives the place a gravity; the residential lanes below it remain surprisingly quiet. Houses here are often about the view, and about being close to the capital without living in it.",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop",
    imageAlt: "River and coastal water seen from a height, recalling Reis Magos.",
  },
];

export function getAreaBySlug(slug: string) {
  return areas.find((area) => area.slug === slug);
}
