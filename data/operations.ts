/**
 * Top-level “Areas of Operation” — used in navigation and brand copy.
 * Individual village filters remain on the collection page and property cards.
 */

export const areasOfOperationCopy =
  "Pacific Properties represents considered homes, land and commercial opportunities across North and South Goa.";

export const operationAreas = [
  {
    id: "north-goa",
    name: "North Goa",
    href: "/collection?region=north-goa",
    region: "North Goa" as const,
    note: "Coastal neighbourhoods, heritage villages and private residences across North Goa.",
  },
  {
    id: "south-goa",
    name: "South Goa",
    href: "/collection?region=south-goa",
    region: "South Goa" as const,
    note: "Commercial space and considered opportunities across South Goa.",
  },
  {
    id: "across-goa",
    name: "Across Goa",
    href: "/collection",
    region: null,
    note: "Pacific Properties represents considered homes, land and commercial opportunities across North and South Goa.",
  },
] as const;

export type OperationAreaId = (typeof operationAreas)[number]["id"];

export function parseOperationRegion(
  value: string | string[] | undefined,
): OperationAreaId | "" {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "north-goa" || raw === "south-goa" || raw === "across-goa") {
    return raw;
  }
  return "";
}
