"use client";

import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconChevronDown, IconClose, IconGrid, IconList } from "@/components/ui/Icons";
import { areas } from "@/data/areas";
import {
  categoryLabels,
  properties,
  type PropertyCategory,
  type PropertyStatus,
} from "@/data/properties";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

type Filters = {
  type: "all" | PropertyCategory;
  area: string;
  bedrooms: string;
  price: string;
  status: "all" | PropertyStatus;
};

const PAGE_SIZE = 6;

const emptyFilters: Filters = {
  type: "all",
  area: "",
  bedrooms: "",
  price: "",
  status: "all",
};

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function CollectionClient({
  initial,
}: {
  initial: Record<string, string | string[] | undefined>;
}) {
  const initialArea = first(initial.area);
  const initialType = first(initial.type) as Filters["type"] | "";

  const [filters, setFilters] = useState<Filters>({
    type:
      initialType && initialType in categoryLabels
        ? (initialType as PropertyCategory)
        : "all",
    area: initialArea,
    bedrooms: first(initial.bedrooms),
    price: first(initial.price),
    status: (first(initial.status) as Filters["status"]) || "all",
  });
  const [sheet, setSheet] = useState(false);
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [visible, setVisible] = useState(PAGE_SIZE);

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
      if (filters.type !== "all" && property.category !== filters.type) {
        return false;
      }
      if (filters.area && property.areaSlug !== filters.area) return false;
      if (filters.bedrooms === "4+") {
        if (!property.bedrooms || property.bedrooms < 4) return false;
      } else if (filters.bedrooms) {
        if (property.bedrooms !== Number(filters.bedrooms)) return false;
      }
      if (filters.status !== "all" && property.status !== filters.status) {
        return false;
      }
      if (filters.price === "por" && property.price !== null) return false;
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

  const shown = results.slice(0, visible);

  const update = (partial: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...partial }));
    setVisible(PAGE_SIZE);
  };

  const selectClass =
    "mt-2 min-h-11 w-full border border-ink/15 bg-ivory px-3 text-base text-ink outline-none focus:border-ink/40";

  const filterFields = (
    <>
      <label className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        Property type
        <select
          className={selectClass}
          value={filters.type}
          onChange={(event) =>
            update({ type: event.target.value as Filters["type"] })
          }
        >
          <option value="all">All types</option>
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
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
          <option value="2">2</option>
          <option value="3">3</option>
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
          <option value="por">Price on request</option>
        </select>
      </label>
      <label className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
        Status
        <select
          className={selectClass}
          value={filters.status}
          onChange={(event) =>
            update({ status: event.target.value as Filters["status"] })
          }
        >
          <option value="all">Any status</option>
          <option value="available">Available</option>
          <option value="under-offer">Under offer</option>
          <option value="coming-soon">Coming soon</option>
        </select>
      </label>
    </>
  );

  return (
    <Container className="py-12 lg:py-10">
      <div className="flex flex-col gap-6 border-b border-ink/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
        <button
          type="button"
          className="flex min-h-11 w-full items-center justify-between gap-3 border border-ink/15 px-4 text-[11px] uppercase tracking-[0.2em] text-ink lg:hidden"
          aria-expanded={sheet}
          onClick={() => setSheet(true)}
        >
          Filters
          <IconChevronDown className="h-4 w-4" />
        </button>

        <div className="hidden grid-cols-5 gap-4 lg:grid">{filterFields}</div>

        <div className="flex items-center justify-between gap-4 lg:justify-end">
          <p className="text-sm text-ink-muted">
            {results.length} {results.length === 1 ? "residence" : "residences"}
          </p>
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

      {sheet ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close filters"
            onClick={() => setSheet(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="filter-sheet absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto border-t border-ink/10 bg-ivory px-6 pt-6"
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
            <div className="grid gap-4">{filterFields}</div>
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

      {visible < results.length ? (
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
