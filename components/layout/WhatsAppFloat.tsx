"use client";

import { IconWhatsApp } from "@/components/ui/Icons";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [pulse, setPulse] = useState(true);
  const barHidden =
    pathname === "/contact" ||
    pathname === "/emi-calculator" ||
    (pathname.startsWith("/collection/") && pathname !== "/collection");

  useEffect(() => {
    const timer = window.setTimeout(() => setPulse(false), 5200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <a
      href={defaultWhatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Pacific Properties Goa"
      className={cn(
        "fixed z-[45] flex h-12 w-12 items-center justify-center rounded-full bg-[#215C4A] text-ivory print:hidden md:bottom-7 md:right-7 md:left-auto md:h-14 md:w-14",
        barHidden
          ? "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))]"
          : "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] left-4 right-auto md:left-auto",
        pulse && "wa-pulse",
      )}
    >
      <IconWhatsApp className="h-6 w-6" />
    </a>
  );
}
