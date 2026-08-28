"use client";

import { ButtonLink } from "@/components/ui/Button";
import { IconWhatsApp } from "@/components/ui/Icons";
import { whatsAppUrlForPath } from "@/lib/whatsapp";
import { usePathname } from "next/navigation";

function hideMobileCta(pathname: string) {
  return (
    pathname === "/contact" ||
    pathname === "/emi-calculator" ||
    (pathname.startsWith("/collection/") && pathname !== "/collection")
  );
}

/** Keeps footer copy clear of the sticky bar on phones. */
export function FooterCtaSpace() {
  const pathname = usePathname();
  if (hideMobileCta(pathname)) return null;

  return (
    <div
      className="md:hidden"
      style={{ height: "calc(5.75rem + env(safe-area-inset-bottom))" }}
      aria-hidden
    />
  );
}

export function MobileCtaBar() {
  const pathname = usePathname();
  if (hideMobileCta(pathname)) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory print:hidden md:hidden"
      style={{
        paddingTop: "0.85rem",
        paddingBottom: "calc(0.85rem + env(safe-area-inset-bottom))",
        paddingLeft: "max(1.75rem, env(safe-area-inset-left))",
        paddingRight: "max(1.75rem, env(safe-area-inset-right))",
      }}
    >
      <div className="mx-auto flex max-w-lg min-w-0 items-center gap-3">
        <a
          href={whatsAppUrlForPath(pathname)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 min-w-12 shrink-0 items-center justify-center rounded-lg border border-ink/15 text-ink"
          aria-label="WhatsApp Pacific Properties on +91 7517723720"
        >
          <IconWhatsApp className="h-5 w-5" />
        </a>
        <ButtonLink
          href="/contact"
          className="h-12 min-w-0 flex-1 px-5 tracking-[0.14em]"
          variant="dark"
        >
          Private Enquiry
        </ButtonLink>
      </div>
    </div>
  );
}
