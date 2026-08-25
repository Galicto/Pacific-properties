"use client";

import { IconWhatsApp } from "@/components/ui/Icons";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import { useEffect, useState } from "react";

export function WhatsAppFloat() {
  const [pulse, setPulse] = useState(true);

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
      className={`fixed bottom-7 right-7 z-[45] hidden h-14 w-14 items-center justify-center rounded-full bg-[#215C4A] text-ivory print:hidden md:flex ${
        pulse ? "wa-pulse" : ""
      }`}
    >
      <IconWhatsApp className="h-6 w-6" />
    </a>
  );
}
