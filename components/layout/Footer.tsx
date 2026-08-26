import { areas } from "@/data/areas";
import { FooterCtaSpace } from "@/components/layout/MobileCtaBar";
import { FooterCredentials } from "@/components/brand/TrustLines";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/lib/config";
import { defaultWhatsAppUrl } from "@/lib/whatsapp";
import Link from "next/link";

const footerNav = [
  { href: "/collection", label: "Collection" },
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/emi-calculator", label: "EMI Calculator" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  return (
    <footer className="relative z-[21] bg-tide text-ivory">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-7 py-16 sm:px-8 lg:grid-cols-12 lg:px-12 lg:py-20">
        <div className="lg:col-span-5">
          <Logo size="lg" />
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-ivory/65">
            A boutique brokerage for considered property in Goa — villas,
            residences, land and commercial space, represented with discretion.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brass-soft">
            Navigate
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex min-h-11 items-center text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-brass-soft">
            Areas
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2.5">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/collection?area=${area.slug}`}
                  className="flex min-h-11 items-center text-sm text-ivory/70 transition-colors hover:text-ivory"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <a
              href={siteConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pacific Properties Goa on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pacific Properties Goa on Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-ivory hover:text-ivory"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={defaultWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center text-[11px] uppercase tracking-[0.18em] text-ivory/70 hover:text-ivory"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-7 py-6 text-[12px] text-ivory/70 sm:px-8 lg:px-12">
          <FooterCredentials />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Pacific Properties Goa. All rights reserved.</p>
            <p>Designed for considered property decisions.</p>
          </div>
        </div>
      </div>
      <FooterCtaSpace />
    </footer>
  );
}
