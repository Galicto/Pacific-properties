"use client";

import { ButtonLink } from "@/components/ui/Button";
import { emiCalculatorHref } from "@/lib/emi";
import Link from "next/link";

type PropertyFinance = {
  title: string;
  area: string;
  location?: string;
  slug: string;
  price?: number | null;
};

export function CalculateEmiLink({
  property,
  className,
  variant = "ghostInk",
  children = "Calculate EMI",
}: {
  property: PropertyFinance;
  className?: string;
  variant?: "dark" | "ghostInk" | "link";
  children?: React.ReactNode;
}) {
  return (
    <ButtonLink
      href={emiCalculatorHref({
        title: property.title,
        location: property.area,
        price: property.price,
        slug: property.slug,
      })}
      variant={variant}
      className={className}
    >
      {children}
    </ButtonLink>
  );
}

export function PropertyFinanceTeaser({
  property,
  compact = false,
}: {
  property: PropertyFinance;
  compact?: boolean;
}) {
  const href = emiCalculatorHref({
    title: property.title,
    location: property.area,
    price: property.price,
    slug: property.slug,
  });

  if (compact) {
    return (
      <div className="mt-5 max-w-xs lg:ml-auto lg:text-right">
        <Link
          href={href}
          className="inline-flex min-h-11 items-center text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline"
        >
          Estimate monthly EMI
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-ink/10 pt-10">
      <h2 className="font-serif text-2xl tracking-tight">
        Planning your purchase?
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
        Estimate your monthly payment for this property.
      </p>
      <div className="mt-7">
        <ButtonLink href={href} variant="dark" className="w-full sm:w-auto">
          Calculate EMI
        </ButtonLink>
      </div>
    </div>
  );
}
