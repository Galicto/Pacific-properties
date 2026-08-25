"use client";

import { areas } from "@/data/areas";
import { ButtonLink } from "@/components/ui/Button";
import { IconChevronDown, IconClose } from "@/components/ui/Icons";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const nav = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const darkHeroRoutes = ["/", "/about"];

function isDarkHero(pathname: string) {
  if (darkHeroRoutes.includes(pathname)) return true;
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
  const dark = isDarkHero(pathname) && !scrolled && !open;
  const solid = scrolled || open || !isDarkHero(pathname);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) {
      setScrolled(window.scrollY > 24);
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
    setOpen(false);
    setAreasOpen(false);
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
      "inline-flex min-h-11 items-center text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
      dark ? "text-ivory/80 hover:text-ivory" : "text-ink/70 hover:text-ink",
      active && (dark ? "text-ivory" : "text-ink"),
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300",
        solid
          ? "border-ink/8 bg-ivory/95"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 min-w-0 max-w-[1400px] items-center justify-between px-7 sm:h-20 sm:px-8 lg:px-12">
        <Wordmark inverted={dark} priority />

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
                "absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 transition-[opacity,transform] duration-300",
                areasOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-1 opacity-0",
              )}
            >
              <ul className="border border-ink/8 bg-ivory p-3 shadow-xl shadow-ink/5">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/collection?area=${area.slug}`}
                      className="block min-h-11 px-3 py-2.5 text-[13px] text-ink/80 transition-colors hover:bg-ivory-deep hover:text-ink"
                    >
                      <span className="block font-medium">{area.name}</span>
                      <span className="block text-[11px] text-ink-muted">
                        {area.region}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex">
            <ButtonLink href="/contact" variant={dark ? "primary" : "dark"}>
              Enquire
            </ButtonLink>
          </span>

          <button
            ref={menuButtonRef}
            type="button"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
              dark
                ? "border-ivory/30 text-ivory hover:bg-ivory/10"
                : "border-ink/15 text-ink hover:bg-ink/5",
            )}
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
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
        className={cn(
          "fixed inset-0 z-[60] overflow-y-auto bg-ivory px-7 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(1.25rem+env(safe-area-inset-top))] transition-transform duration-300 ease-[var(--ease-cinematic)] lg:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Wordmark lockup />
          <button
            ref={closeRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15"
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
            className="min-h-11 font-serif text-[clamp(2rem,8vw,2.75rem)] text-ink"
            onClick={() => setOpen(false)}
          >
            Collection
          </Link>
          <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            Areas
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-6">
            {areas.map((area) => (
              <Link
                key={area.slug}
                href={`/collection?area=${area.slug}`}
                className="flex min-h-11 items-center text-sm text-ink/80"
                onClick={() => setOpen(false)}
              >
                {area.name}
              </Link>
            ))}
          </div>
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mt-5 flex min-h-11 items-center font-serif text-[clamp(2rem,8vw,2.75rem)] text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="mt-12 w-fit" variant="dark">
            Speak to an Advisor
          </ButtonLink>
          <Link
            href="/emi-calculator"
            className="mt-6 flex min-h-11 items-center text-[11px] uppercase tracking-[0.2em] text-ink-muted"
            onClick={() => setOpen(false)}
          >
            EMI Calculator
          </Link>
        </nav>
      </div>
    </header>
  );
}
