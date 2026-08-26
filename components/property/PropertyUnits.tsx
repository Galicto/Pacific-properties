import type { Property, PropertyUnit } from "@/data/properties";
import { cn } from "@/lib/utils";

export function PropertyUnits({ property }: { property: Property }) {
  const units = property.units;
  if (!units || units.length === 0) return null;

  const available = units.filter((unit) => unit.status === "available");
  const sold = units.filter((unit) => unit.status === "sold");
  const ordered = [...available, ...sold];
  const hideArea = Boolean(property.hideUnitArea);
  const label = property.unitLabelColumn ?? "Unit";

  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl">
        {property.unitsHeading ?? "Residences"}
      </h2>
      <div className="mt-6 overflow-x-auto border border-ink/10">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">
            Unit availability and pricing for {property.title}
          </caption>
          <thead className="border-b border-ink/10 bg-ivory-deep/60 text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                {label}
              </th>
              {hideArea ? null : (
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Area
                </th>
              )}
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Price
              </th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((unit) => (
              <UnitRow key={unit.id} unit={unit} hideArea={hideArea} />
            ))}
          </tbody>
        </table>
      </div>
      {property.availabilityDisclaimer ? (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {property.availabilityDisclaimer}
          {property.availabilityUpdatedOn
            ? ` Updated ${property.availabilityUpdatedOn}.`
            : null}
        </p>
      ) : null}
    </section>
  );
}

function UnitRow({
  unit,
  hideArea,
}: {
  unit: PropertyUnit;
  hideArea: boolean;
}) {
  const sold = unit.status === "sold";
  return (
    <tr className={cn("border-t border-ink/8", sold && "text-ink-muted")}>
      <th
        scope="row"
        className="px-4 py-3.5 font-serif text-base font-medium sm:px-5"
      >
        {unit.label}
      </th>
      {hideArea ? null : (
        <td className="px-4 py-3.5 sm:px-5">{unit.area}</td>
      )}
      <td className="px-4 py-3.5 sm:px-5">
        {sold ? "—" : unit.priceDisplay}
      </td>
      <td className="px-4 py-3.5 sm:px-5">
        {sold
          ? "Sold"
          : unit.price === null
            ? "Available on Request"
            : "Available"}
      </td>
    </tr>
  );
}
