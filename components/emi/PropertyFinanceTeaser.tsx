import { ButtonLink } from "@/components/ui/Button";
import { emiCalculatorHref } from "@/lib/emi";
import { propertyWhatsAppUrl } from "@/lib/whatsapp";
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
      <div className="mt-4 max-w-xs lg:ml-auto lg:text-right">
        <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
          Planning your purchase?
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          Estimate your monthly payment.
        </p>
        <Link
          href={href}
          className="mt-2 inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.18em] text-ink hover:text-brass"
        >
          Calculate EMI →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-ink/10 pt-10">
      <h2 className="font-serif text-2xl tracking-tight">
        Planning your purchase?
      </h2>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
        Estimate your monthly payment for this residence.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={href} variant="dark" className="w-full sm:w-auto">
          Calculate EMI
        </ButtonLink>
        <ButtonLink
          href={propertyWhatsAppUrl(property.title, property.area)}
          variant="ghostInk"
          external
          className="h-auto w-full flex-wrap whitespace-normal px-4 text-center leading-snug tracking-[0.12em] sm:w-auto"
        >
          Discuss on WhatsApp
        </ButtonLink>
      </div>
    </div>
  );
}
