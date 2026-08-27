"use client";

import { operationAreas, areasOfOperationCopy } from "@/data/operations";
import { ButtonLink } from "@/components/ui/Button";
import { IconChevronDown, IconClose } from "@/components/ui/Icons";
import { Logo } from "@/components/brand/Logo";
import { siteConfig } from "@/lib/config";
import { whatsAppUrlForPath } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/hooks";

const nav = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

function isMediaHero(pathname: string) {
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/collection" ||
    pathname === "/journal" ||
    pathname.startsWith("/journal/")
  ) {
    return true;
  }
  if (pathname.startsWith("/collection/") && pathname !== "/collection") {
    return true;
  }
  return false;
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overMedia = isMediaHero(pathname) && !scrolled && !open;
  useFocusTrap(open, menuRef, false);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) {
      queueMicrotask(() => setScrolled(window.scrollY > 24));
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    queueMicrotask(() => {
      setOpen(false);
      setAreasOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setAreasOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors duration-300 hover:text-ivory",
      active && "text-ivory",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300",
        overMedia
          ? "border-transparent bg-transparent"
          : "border-ivory/10 bg-ink/95",
      )}
    >
      <div className="mx-auto flex h-16 min-w-0 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-20 sm:px-8 lg:px-12">
        <Logo priority />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <Link
            href="/collection"
            className={linkClass(pathname.startsWith("/collection"))}
          >
            Collection
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setAreasOpen(true)}
            onMouseLeave={() => setAreasOpen(false)}
          >
            <button
              type="button"
              className={linkClass(false)}
              aria-expanded={areasOpen}
              aria-haspopup="true"
              onClick={() => setAreasOpen((value) => !value)}
            >
              Areas
              <IconChevronDown
                className={cn(
                  "ml-1 h-3.5 w-3.5 transition-transform duration-300",
                  areasOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300",
                areasOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0",
              )}
            >
              <div className="border border-ivory/12 bg-ink p-4 shadow-xl shadow-ink/40">
                <p className="px-3 text-[11px] uppercase tracking-[0.22em] text-ivory/50">
                  Areas of Operation
                </p>
                <ul className="mt-2">
                  {operationAreas.map((area) => (
                    <li key={area.id}>
                      <Link
                        href={area.href}
                        className="block min-h-11 px-3 py-2.5 text-[13px] text-ivory/80 transition-colors hover:bg-ink-soft hover:text-ivory"
                      >
                        <span className="block font-medium">{area.name}</span>
                        <span className="mt-0.5 block text-[11px] leading-relaxed text-ivory/50">
                          {area.note}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 border-t border-ivory/10 px-3 pt-3 text-[11px] leading-relaxed text-ivory/45">
                  {areasOfOperationCopy}
                </p>
              </div>
            </div>
          </div>

          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(pathname === item.href)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/emi-calculator"
            aria-label="EMI Calculator"
            className={linkClass(pathname.startsWith("/emi-calculator"))}
          >
            EMI
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <ButtonLink href="/contact" variant="primary">
              Enquire
            </ButtonLink>
          </span>

          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:bg-ivory/10 lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex flex-col items-center gap-[5px]" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-3 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
        className={cn(
          "fixed inset-0 z-[60] overflow-y-auto bg-ink px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] text-ivory transition-transform duration-300 ease-[var(--ease-cinematic)] sm:px-8 lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
        style={{ colorScheme: "dark" }}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory"
            aria-label="Close menu"
            onClick={() => {
              setOpen(false);
              menuButtonRef.current?.focus();
            }}
          >
            <IconClose className="h-4 w-4" />
          </button>
        </div>
        <nav className="mt-12 flex flex-col">
          <Link
            href="/collection"
            className="min-h-11 font-serif text-[clamp(2rem,8vw,2.75rem)] text-ivory"
            onClick={() => setOpen(false)}
          >
            Collection
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ivory/50">
            Areas of Operation
          </p>
          <div className="mt-3 flex flex-col">
            {operationAreas.map((area) => (
              <Link
                key={area.id}
                href={area.href}
                className="flex min-h-11 items-center text-sm text-ivory/80"
                onClick={() => setOpen(false)}
              >
                {area.name}
              </Link>
            ))}
          </div>
          <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ivory/45">
            {areasOfOperationCopy}
          </p>
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mt-5 flex min-h-11 items-center font-serif text-[clamp(2rem,8vw,2.75rem)] text-ivory"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="mt-12 w-fit" variant="primary">
            Speak to an Advisor
          </ButtonLink>
          <div className="mt-10 border-t border-ivory/10 pt-6 text-sm text-ivory/65">
            <p className="font-medium text-ivory">{siteConfig.principal.name}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ivory/45">
              {siteConfig.principal.role}
            </p>
            <a
              href={siteConfig.phoneHref}
              className="mt-4 flex min-h-11 items-center"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex min-h-11 items-center break-all"
            >
              {siteConfig.email}
            </a>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed">
              {siteConfig.address.line1}
              <br />
              {siteConfig.address.line2}
              <br />
              {siteConfig.address.line3}
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-ivory/45">
              Goa RERA {siteConfig.credentials.reraRegistrationNumber}
            </p>
            <a
              href={whatsAppUrlForPath(pathname)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-11 items-center text-[11px] uppercase tracking-[0.18em] text-ivory/70"
            >
              WhatsApp
            </a>
          </div>
          <Link
            href="/emi-calculator"
            className="mt-6 flex min-h-11 items-center text-[11px] uppercase tracking-[0.2em] text-ivory/50"
            onClick={() => setOpen(false)}
          >
            EMI Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
