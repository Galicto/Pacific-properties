"use client";

import { CertificateViewer } from "@/components/credentials/CertificateViewer";
import { Container } from "@/components/ui/Container";
import {
  IconCrest,
  IconMemberMark,
  IconRegistered,
  IconTrademark,
} from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { siteConfig } from "@/lib/config";
import { credentialCards, type CredentialCard } from "@/lib/credentials";
import { cn } from "@/lib/utils";
import { useState } from "react";

const icons = {
  trademark: IconTrademark,
  nar: IconMemberMark,
  gar: IconCrest,
  rera: IconRegistered,
} as const;

export function Credentials() {
  const { heading, supporting } = siteConfig.credentials;
  const [open, setOpen] = useState<CredentialCard | null>(null);

  return (
    <section
      className="relative overflow-hidden border-y border-brass/25 bg-tide text-ivory"
      aria-labelledby="credentials-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "120px 120px",
        }}
        aria-hidden
      />
      <Container className="relative py-20 lg:py-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
            Credentials
          </p>
          <h2
            id="credentials-heading"
            className="mt-4 max-w-2xl font-serif text-[clamp(1.85rem,4.6vw,3.1rem)] leading-[1.12] tracking-tight text-ivory"
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70">
            {supporting}
          </p>
        </Reveal>

        <ul className="mt-14 grid auto-rows-fr grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {credentialCards.map((item, index) => {
            const Icon = icons[item.id];
            return (
              <li key={item.id} className="h-full min-h-0">
                <Reveal delay={index * 0.06} className="flex h-full min-h-0 flex-col">
                  <article
                    className={cn(
                      "flex h-full min-h-0 flex-col rounded-xl border border-ivory/12 bg-ink/35 p-5 shadow-[0_0_40px_rgba(21,99,223,0.06)]",
                      "transition-transform duration-300 ease-[var(--ease-cinematic)] motion-reduce:transition-none",
                      "hover:-translate-y-1 motion-reduce:hover:translate-y-0",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      className="group block w-full shrink-0 overflow-hidden rounded-lg border border-ivory/10 bg-[#f4f0e8] text-left"
                      aria-label={`View certificate: ${item.title}`}
                    >
                      <SmartImage
                        src={item.preview}
                        alt=""
                        className="aspect-[3/2] w-full bg-[#f4f0e8]"
                        imageClassName="!object-contain object-top"
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                        quality={55}
                      />
                    </button>
                    <Icon className="mt-6 h-6 w-6 shrink-0 text-brass-soft" />
                    <h3 className="mt-4 min-h-[5rem] font-serif text-[1.35rem] leading-tight tracking-tight text-ivory">
                      {item.title}
                    </h3>
                    <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-ivory/65">
                      {item.body}
                    </p>
                    <p className="mt-3 min-h-[1.25rem] text-[12px] tracking-[0.04em] text-ivory/80">
                      {item.detail ?? "\u00a0"}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(item)}
                      className="mt-auto min-h-11 self-start pt-6 text-[11px] uppercase tracking-[0.16em] text-brass-soft transition-opacity duration-300 hover:opacity-80 motion-reduce:transition-none"
                    >
                      View Certificate
                    </button>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
      {open ? (
        <CertificateViewer card={open} onClose={() => setOpen(null)} />
      ) : null}
    </section>
  );
}
