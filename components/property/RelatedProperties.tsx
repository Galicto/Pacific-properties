import { PropertyCard } from "@/components/property/PropertyCard";
import type { Property } from "@/data/properties";

export function RelatedProperties({ properties }: { properties: Property[] }) {
  if (properties.length === 0) return null;

  return (
    <section className="border-t border-ink/8 py-20">
      <p className="text-[11px] uppercase tracking-[0.22em] text-brass">
        You may also consider
      </p>
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl">Related listings</h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
