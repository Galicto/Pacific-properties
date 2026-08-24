"use client";

import { ButtonLink } from "@/components/ui/Button";
import { IconWhatsApp } from "@/components/ui/Icons";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { usePathname } from "next/navigation";

function hideMobileCta(pathname: string) {
  return (
    pathname === "/contact" ||
    pathname === "/emi-calculator" ||
    (pathname.startsWith("/collection/") && pathname !== "/collection")
  );
}

/** Keeps footer copy clear of the sticky WhatsApp/Enquire bar on phones. */
export function FooterCtaSpace() {
  const pathname = usePathname();
  if (hideMobileCta(pathname)) return null;

  return (
    <div
      className="md:hidden"
      style={{ height: "calc(5.25rem + env(safe-area-inset-bottom))" }}
      aria-hidden
    />
  );
}

export function MobileCtaBar() {
  const pathname = usePathname();
  if (hideMobileCta(pathname)) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 px-4 pt-3 print:hidden md:hidden"
      style={{
        paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        paddingLeft: "max(1rem, env(safe-area-inset-left))",
        paddingRight: "max(1rem, env(safe-area-inset-right))",
      }}
    >
      <div className="mx-auto flex max-w-lg min-w-0 gap-2 sm:gap-3">
        <a
          href={defaultWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 border border-ink/15 bg-transparent px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-ink sm:px-4 sm:text-[11px] sm:tracking-[0.18em]"
        >
          <IconWhatsApp className="h-4 w-4 shrink-0" />
          WhatsApp
        </a>
        <ButtonLink
          href="/contact"
          className="min-h-11 min-w-0 flex-1 px-3 sm:px-6"
          variant="dark"
        >
          Enquire
        </ButtonLink>
      </div>
    </div>
  );
}
