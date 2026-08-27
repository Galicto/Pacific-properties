"use client";

import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";
import { IconCheck, IconShare } from "@/components/ui/Icons";
import { propertyWhatsAppUrl } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export function PropertyActions({
  title,
  area,
  slug,
  enquiryText,
  ctaLabel,
}: {
  title: string;
  area: string;
  slug: string;
  enquiryText?: string;
  ctaLabel?: string;
  price?: number | null;
}) {
  const [copied, setCopied] = useState(false);
  const [pastTitle, setPastTitle] = useState(false);
  const whatsapp = propertyWhatsAppUrl(title, area, enquiryText);

  useEffect(() => {
    const heading = document.querySelector("h1");
    if (!heading) return;
    const io = new IntersectionObserver(
      ([entry]) => setPastTitle(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-96px 0px 0px 0px" },
    );
    io.observe(heading);
    return () => io.disconnect();
  }, []);

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
    <div className="sticky top-[calc(4rem+env(safe-area-inset-top))] z-30 -mx-7 mb-14 border-y border-ink/10 bg-ivory px-7 py-3.5 print:hidden sm:top-[calc(5rem+env(safe-area-inset-top))] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <p
          className={`hidden truncate font-serif text-xl lg:block ${
            pastTitle ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!pastTitle}
        >
          {title}
        </p>
        <div className="flex w-full min-w-0 items-center gap-2 sm:gap-3 lg:w-auto lg:justify-end">
          <ButtonLink
            href={`/contact?property=${slug}`}
            variant="dark"
            className="min-h-11 min-w-0 flex-1 sm:flex-none"
          >
            {ctaLabel ?? "Enquire"}
          </ButtonLink>
          <ButtonLink
            href={whatsapp}
            variant="ghostInk"
            external
            className="min-h-11 min-w-0 flex-1 sm:flex-none"
          >
            WhatsApp
          </ButtonLink>
          <Button
            variant="ghostInk"
            onClick={() => void share()}
            aria-label="Share this property"
            className="h-11 w-11 shrink-0 px-0"
          >
            {copied ? <IconCheck className="h-4 w-4" /> : <IconShare className="h-4 w-4" />}
            <span className="sr-only">{copied ? "Copied" : "Share"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
