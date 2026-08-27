"use client";

import { operationAreas, areasOfOperationCopy } from "@/data/operations";
import { ContactReachUs } from "@/components/contact/ContactReachUs";
import { ButtonLink } from "@/components/ui/Button";
import { IconChevronDown, IconClose } from "@/components/ui/Icons";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { useFocusTrap, usePrefersReducedMotion } from "@/lib/hooks";

const desktopNav = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

const mobileNav = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/emi-calculator", label: "EMI Calculator" },
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
  const reduceMotion = usePrefersReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollLockY = useRef(0);
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
      setMobileAreasOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      scrollLockY.current = window.scrollY;
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollLockY.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      queueMicrotask(() => closeRef.current?.focus());
    } else {
      const y = scrollLockY.current;
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      if (y) window.scrollTo(0, y);
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setAreasOpen(false);
        setMobileAreasOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => {
    setOpen(false);
    setMobileAreasOpen(false);
    menuButtonRef.current?.focus();
  };

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex min-h-11 items-center text-[11px] font-medium uppercase tracking-[0.2em] text-ivory/80 transition-colors duration-300 hover:text-ivory",
      active && "text-ivory",
    );

  const motionClass = reduceMotion
    ? "transition-none"
    : "transition-[opacity,transform] duration-300 ease-[var(--ease-cinematic)]";

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
                "absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3",
                motionClass,
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

          {desktopNav.slice(1).map((item) => (
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

      {/* Backdrop — outside click closes */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-[55] bg-ink/40 lg:hidden",
          motionClass,
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={closeMenu}
      />

      <div
        ref={menuRef}
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
        className={cn(
          "fixed inset-0 z-[60] flex flex-col overflow-hidden bg-ivory text-tide lg:hidden",
          motionClass,
          open
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        {/* Logo band — tide surface so the official white lock-up stays correct */}
        <div className="shrink-0 bg-tide px-5 pb-6 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:px-8">
          <div className="flex flex-col items-center gap-5">
            <Logo className="justify-center" />
            <button
              ref={closeRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/35 text-ivory transition-colors hover:bg-ivory/10"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 sm:px-8">
          <nav className="flex flex-col" aria-label="Mobile">
            <Link
              href="/collection"
              className="flex min-h-14 items-center border-b border-ink/10 font-serif text-[1.85rem] leading-none tracking-tight text-tide sm:text-[2.1rem]"
              onClick={closeMenu}
            >
              Collection
            </Link>

            <div className="border-b border-ink/10">
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between font-serif text-[1.85rem] leading-none tracking-tight text-tide sm:text-[2.1rem]"
                aria-expanded={mobileAreasOpen}
                onClick={() => setMobileAreasOpen((value) => !value)}
              >
                Areas
                <IconChevronDown
                  className={cn(
                    "h-5 w-5 text-brass transition-transform duration-300",
                    mobileAreasOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden",
                  motionClass,
                  mobileAreasOpen
                    ? "max-h-80 pb-5 opacity-100"
                    : "pointer-events-none max-h-0 opacity-0",
                )}
                aria-hidden={!mobileAreasOpen}
                {...(!mobileAreasOpen ? { inert: true } : {})}
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-brass">
                  Areas of Operation
                </p>
                <ul className="mt-3 space-y-1">
                  {operationAreas.map((area) => (
                    <li key={area.id}>
                      <Link
                        href={area.href}
                        className="flex min-h-11 items-center text-[15px] text-ink-muted transition-colors hover:text-tide"
                        onClick={closeMenu}
                      >
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-muted/80">
                  {areasOfOperationCopy}
                </p>
              </div>
            </div>

            {mobileNav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-14 items-center border-b border-ink/10 font-serif text-[1.85rem] leading-none tracking-tight text-tide sm:text-[2.1rem]"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            <ButtonLink
              href="/contact"
              variant="dark"
              className="mt-10 w-full sm:w-fit"
            >
              Speak to a Pacific Properties Advisor
            </ButtonLink>

            <div className="mt-12 border-t border-ink/10 pt-8">
              <ContactReachUs tone="light" showActions />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
