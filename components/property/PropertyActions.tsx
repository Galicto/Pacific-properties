"use client";

import { CalculateEmiLink } from "@/components/emi/PropertyFinanceTeaser";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck, IconShare } from "@/components/ui/Icons";
import { propertyWhatsAppUrl } from "@/lib/whatsapp";
import { useState } from "react";

export function PropertyActions({
  title,
  area,
  slug,
  price,
}: {
  title: string;
  area: string;
  slug: string;
  price?: number | null;
}) {
  const [copied, setCopied] = useState(false);
  const whatsapp = propertyWhatsAppUrl(title, area);

  const share = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : `https://pacificpropertiesgoa.com/collection/${slug}`;
    const payload = { title: `${title} · Pacific Properties Goa`, url };

    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        /* cancelled */
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="sticky top-[calc(4.5rem+env(safe-area-inset-top))] z-30 -mx-5 mb-12 border-y border-ink/10 bg-ivory px-5 py-3 print:hidden sm:top-[calc(5rem+env(safe-area-inset-top))] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <p className="hidden truncate font-serif text-xl lg:block">{title}</p>
        <div className="flex w-full min-w-0 flex-wrap gap-2 lg:w-auto lg:justify-end">
          <ButtonLink href={whatsapp} variant="dark" external className="min-h-11 flex-1 sm:flex-none">
            WhatsApp
          </ButtonLink>
          <ButtonLink
            href={`/contact?property=${slug}`}
            variant="ghostInk"
            className="min-h-11 flex-1 sm:flex-none"
          >
            Enquire
          </ButtonLink>
          <CalculateEmiLink
            property={{ title, area, slug, price }}
            className="min-h-11 min-w-0 flex-[1_1_auto] px-3 text-[10px] tracking-[0.12em] sm:flex-none sm:px-4 sm:text-[11px] sm:tracking-[0.18em]"
          >
            <span className="sm:hidden">EMI</span>
            <span className="hidden sm:inline">Calculate EMI</span>
          </CalculateEmiLink>
          <Button
            variant="ghostInk"
            onClick={() => void share()}
            aria-label="Share this property"
            className="min-h-11 px-4"
          >
            {copied ? <IconCheck className="h-4 w-4" /> : <IconShare className="h-4 w-4" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
