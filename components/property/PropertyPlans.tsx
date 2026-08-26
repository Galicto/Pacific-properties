"use client";

import { PropertyLightbox } from "@/components/property/PropertyLightbox";
import { SmartImage } from "@/components/ui/SmartImage";
import type { Property, PropertyImage } from "@/data/properties";
import { listingPlans } from "@/data/properties";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export function PropertyPlans({ property }: { property: Property }) {
  const plans = listingPlans(property);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    if (plans.length === 0) return;
    setActive((value) => (value + 1) % plans.length);
  }, [plans.length]);

  const prev = useCallback(() => {
    if (plans.length === 0) return;
    setActive((value) => (value - 1 + plans.length) % plans.length);
  }, [plans.length]);

  if (plans.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-serif text-2xl">Plans & Layout</h2>
      <p className="mt-3 max-w-xl text-sm text-ink-muted">
        Open a drawing in the viewer to read the layout clearly.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {plans.map((plan, index) => (
          <li key={plan.src}>
            <PlanTile
              plan={plan}
              onOpen={() => {
                setActive(index);
                setOpen(true);
              }}
            />
          </li>
        ))}
      </ul>
      {open ? (
        <PropertyLightbox
          images={plans}
          title={`${property.title} — Plans & Layout`}
          active={active}
          onClose={() => setOpen(false)}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </section>
  );
}

function PlanTile({
  plan,
  onOpen,
}: {
  plan: PropertyImage;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group w-full overflow-hidden border border-ink/10 bg-ivory-deep text-left",
        "transition-transform duration-300 ease-[var(--ease-cinematic)]",
        "motion-reduce:transition-none hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
      )}
    >
      <SmartImage
        src={plan.src}
        alt=""
        className="aspect-[16/10] w-full bg-ivory"
        imageClassName="object-contain"
        sizes="(min-width: 1024px) 35vw, 100vw"
        quality={60}
      />
      <span className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="font-serif text-lg text-ink">
          {plan.caption ?? "Plan"}
        </span>
        <span className="text-[11px] uppercase tracking-[0.16em] text-brass">
          View
        </span>
      </span>
    </button>
  );
}
