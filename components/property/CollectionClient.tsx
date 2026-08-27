"use client";

import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconChevronDown, IconClose, IconGrid, IconList } from "@/components/ui/Icons";
import { areas } from "@/data/areas";
import { parseOperationRegion, type OperationAreaId } from "@/data/operations";
import {
  categoryLabels,
  groupPropertiesByCollection,
  properties,
  type PropertyCategory,
  type PropertyPurpose,
  type PropertyStatus,
} from "@/data/properties";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useFocusTrap } from "@/lib/hooks";

type Filters = {
  purpose: "all" | PropertyPurpose;
  type: "all" | PropertyCategory;
  area: string;
  region: OperationAreaId | "";
  bedrooms: string;
  price: string;
  status: "all" | PropertyStatus;
};

const PAGE_SIZE = 6;

const emptyFilters: Filters = {
  purpose: "all",
  type: "all",
  area: "",
  region: "",
  bedrooms: "",
  price: "",
  status: "all",
};

const purposeOptions: { id: Filters["purpose"]; label: string }[] = [
  { id: "all", label: "All" },
  { id: "For Sale", label: "For Sale" },
  { id: "For Rent", label: "For Rent" },
];

const typeOptions: { id: Filters["type"]; label: string }[] = [
  { id: "all", label: "All types" },
  { id: "villa", label: "Villa" },
  { id: "apartment", label: "Apartment" },
  { id: "penthouse", label: "Penthouse" },
  { id: "land", label: "Land" },
  { id: "commercial", label: "Commercial" },
];

const statusOptions: { id: Filters["status"]; label: string }[] = [
  { id: "all", label: "Any status" },
  { id: "available", label: "Available" },
  { id: "under-construction", label: "Under Construction" },
];

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parsePurpose(value: string): Filters["purpose"] {
  if (value === "rent" || value === "For Rent") return "For Rent";
  if (value === "sale" || value === "For Sale") return "For Sale";
  return "all";
}

function parseType(value: string): Filters["type"] {
  if (value && value in categoryLabels) return value as PropertyCategory;
  return "all";
}

function parseStatus(value: string): Filters["status"] {
  if (value === "ready" || value === "available") return "available";
  if (value === "under-construction") return "under-construction";
  return "all";
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 shrink-0 border px-3.5 text-[11px] uppercase tracking-[0.14em]",
        active
          ? "border-ink bg-ink text-ivory"
          : "border-ink/15 text-ink-muted hover:border-ink/40 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function CollectionClient({
  initial,
}: {
  initial: Record<string, string | string[] | undefined>;
}) {
  const [filters, setFilters] = useState<Filters>({
    purpose: parsePurpose(first(initial.purpose)),
    type: parseType(first(initial.type)),
    area: first(initial.area),
    region: parseOperationRegion(initial.region),
    bedrooms: first(initial.bedrooms),
    price: first(initial.price),
    status: parseStatus(first(initial.status)),
  });
  const [sheet, setSheet] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const sheetRef = useRef<HTMLDivElement>(null);
  useFocusTrap(sheet, sheetRef);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheet]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    return properties.filter((property) => {
      if (filters.purpose !== "all" && property.purpose !== filters.purpose) {
        return false;
      }
      if (filters.type !== "all" && property.category !== filters.type) {
        return false;
      }
      if (filters.area && property.areaSlug !== filters.area) return false;
      if (filters.region === "north-goa" && property.region !== "North Goa") {
        return false;
      }
      if (filters.region === "south-goa" && property.region !== "South Goa") {
        return false;
      }
      if (filters.bedrooms === "4+") {
        if (!property.bedrooms || property.bedrooms < 4) return false;
      } else if (filters.bedrooms === "3") {
        if (!property.bedrooms || property.bedrooms < 3 || property.bedrooms >= 4) {
          return false;
        }
      } else if (filters.bedrooms) {
        if (property.bedrooms !== Number(filters.bedrooms)) return false;
      }
      if (filters.status !== "all" && property.status !== filters.status) {
        return false;
      }
      if (filters.price === "por") {
        if (property.purpose !== "For Sale" || property.price !== null) {
          return false;
        }
      }
      if (filters.price === "under-8" && !(property.price && property.price < 80_000_000)) {
        return false;
      }
      if (
        filters.price === "8-15" &&
        !(property.price && property.price >= 80_000_000 && property.price <= 150_000_000)
      ) {
        return false;
      }
      if (filters.price === "15+" && !(property.price && property.price > 150_000_000)) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const groups = useMemo(
    () => groupPropertiesByCollection(results),
    [results],
  );

  const shown = results.slice(0, visible);
  const extraFiltersActive =
    filters.purpose !== "all" ||
    filters.type !== "all" ||
    filters.status !== "all" ||
    Boolean(filters.area || filters.bedrooms || filters.price);
  const filtersActive =
    extraFiltersActive ||
    Boolean(filters.region && filters.region !== "across-goa");

  const update = (partial: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...partial }));
    setVisible(PAGE_SIZE);
  };

  const selectClass =
    "mt-2 min-h-11 w-full border border-ink/15 bg-ivory px-3 text-base text-ink outline-none focus:border-ink/40";

  const chips = (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {purposeOptions.map((option) => (
          <Chip
            key={option.id}
            active={filters.purpose === option.id}
            onClick={() => update({ purpose: option.id })}
          >
            {option.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {typeOptions.map((option) => (
          <Chip
            key={option.id}
            active={filters.type === option.id}
            onClick={() => update({ type: option.id })}
          >
            {option.label}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Chip
            key={option.id}
            active={filters.status === option.id}
            onClick={() => update({ status: option.id })}
          >
            {option.label}
          </Chip>
        ))}
      </div>
    </div>
  );

  const extraFields = (
    <>
      <label className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        Location
        <select
          className={selectClass}
          value={filters.area}
          onChange={(event) => update({ area: event.target.value })}
        >
          <option value="">All areas</option>
          {areas.map((area) => (
            <option key={area.slug} value={area.slug}>
              {area.name}
            </option>
          ))}
        </select>
      </label>
      <label className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        Bedrooms
        <select
          className={selectClass}
          value={filters.bedrooms}
          onChange={(event) => update({ bedrooms: event.target.value })}
        >
          <option value="">Any</option>
          <option value="3">3 / 3.5</option>
          <option value="4">4</option>
          <option value="4+">4+</option>
        </select>
      </label>
      <label className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        Price range
        <select
          className={selectClass}
          value={filters.price}
          onChange={(event) => update({ price: event.target.value })}
        >
          <option value="">Any</option>
          <option value="under-8">Under ₹8 Cr</option>
          <option value="8-15">₹8–15 Cr</option>
          <option value="15+">₹15 Cr and above</option>
          <option value="por">Available on Request</option>
        </select>
      </label>
    </>
  );

  return (
    <Container className="py-12 pb-[calc(2rem+env(safe-area-inset-bottom))] lg:py-10">
      <div className="flex flex-col gap-6 border-b border-ink/10 pb-8">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-3 border border-ink/15 px-4 text-[11px] uppercase tracking-[0.2em] text-ink lg:hidden"
          aria-expanded={sheet}
          aria-controls="collection-filters"
          onClick={() => setSheet(true)}
        >
          Filters
          {filtersActive ? (
            <span className="normal-case tracking-normal text-brass">Active</span>
          ) : (
            <IconChevronDown className="h-4 w-4" />
          )}
        </button>

        <div className="hidden lg:block">{chips}</div>
        <div className="hidden grid-cols-3 gap-4 lg:grid">{extraFields}</div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink-muted" aria-live="polite">
            {results.length} {results.length === 1 ? "listing" : "listings"}
          </p>
          <div className="flex items-center gap-3">
            {filtersActive ? (
              <button
                type="button"
                className="hidden min-h-11 text-[11px] uppercase tracking-[0.16em] text-ink-muted hover:text-ink lg:inline-flex"
                onClick={() => {
                  setFilters(emptyFilters);
                  setVisible(PAGE_SIZE);
                }}
              >
                Clear filters
              </button>
            ) : null}
            <div className="flex border border-ink/15">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={layout === "grid"}
                onClick={() => setLayout("grid")}
                className={cn(
                  "flex h-11 w-11 items-center justify-center",
                  layout === "grid" ? "bg-ink text-ivory" : "text-ink/50",
                )}
              >
                <IconGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={layout === "list"}
                onClick={() => setLayout("list")}
                className={cn(
                  "flex h-11 w-11 items-center justify-center",
                  layout === "list" ? "bg-ink text-ivory" : "text-ink/50",
                )}
              >
                <IconList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {sheet ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close filters"
            onClick={() => setSheet(false)}
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            id="collection-filters"
            className="filter-sheet absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto overscroll-contain border-t border-ink/10 bg-ivory px-6 pt-6"
            style={{
              paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <p className="font-serif text-2xl">Filters</p>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
                aria-label="Close filters"
                onClick={() => setSheet(false)}
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>
            {chips}
            <div className="mt-6 grid gap-4">{extraFields}</div>
            <div className="mt-8 flex gap-3">
              <Button
                variant="ghostInk"
                className="flex-1"
                onClick={() => {
                  setFilters(emptyFilters);
                  setVisible(PAGE_SIZE);
                }}
              >
                Clear
              </Button>
              <Button className="flex-1" onClick={() => setSheet(false)}>
                Show {results.length}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {results.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-[clamp(1.6rem,4vw,2rem)]">
            Nothing matches these filters.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
            Adjust your search, or speak with an advisor — some residences
            are shared by introduction only.
          </p>
          <Button
            className="mt-8"
            variant="ghostInk"
            onClick={() => {
              setFilters(emptyFilters);
              setVisible(PAGE_SIZE);
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : !extraFiltersActive ? (
        <div className="mt-4">
          {groups.map((group) => (
            <section key={group.id} className="mt-14 first:mt-10">
              <h2 className="font-serif text-[clamp(1.55rem,3vw,2.05rem)] tracking-tight">
                {group.id === "salvador" ? (
                  <Link href="/collection/salvador" className="hover:text-brass">
                    {group.label}
                  </Link>
                ) : (
                  group.label
                )}
              </h2>
              {layout === "grid" ? (
                <div className="mt-8 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
                  {group.properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="mt-4">
                  {group.properties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      layout="list"
                      property={property}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      ) : layout === "grid" ? (
        <div className="mt-12 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          {shown.map((property) => (
            <PropertyCard
              key={property.id}
              layout="list"
              property={property}
            />
          ))}
        </div>
      )}

      {filtersActive && visible < results.length ? (
        <div className="mt-14 flex justify-center">
          <Button
            variant="ghostInk"
            onClick={() => setVisible((value) => value + PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      ) : null}
    </Container>
  );
}
