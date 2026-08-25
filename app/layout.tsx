import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { siteConfig } from "@/lib/config";
import { verifiedReraNumber } from "@/lib/credentials";
import { localBusinessJsonLd } from "@/lib/schema";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const reraRegistrationMeta = verifiedReraNumber();

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pacific Properties Goa | Curated Luxury Real Estate in Goa",
    template: "%s | Pacific Properties Goa",
  },
  description: siteConfig.description,
  keywords: [
    "Pacific Properties Goa",
    "luxury villas Goa",
    "Aldona villas",
    "Pilerne villas",
    "Dona Paula property",
    "North Goa real estate",
    "Goa property advisory",
    "Goa Association of Realtors",
    "NAR-India",
    "RERA registered Goa",
  ],
  authors: [{ name: siteConfig.companyName }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    title: "Pacific Properties Goa | Curated Luxury Real Estate in Goa",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Pacific Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pacific Properties Goa | Curated Luxury Real Estate in Goa",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
  ...(reraRegistrationMeta
    ? {
        other: {
          "rera:registrationNumber": reraRegistrationMeta,
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reduce-motion');",
          }}
        />
      </head>
      <body className="min-h-full bg-ivory font-sans text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grain-overlay" aria-hidden="true" />
        <div id="nav-sentinel" className="pointer-events-none absolute top-6 h-px w-px" aria-hidden="true" />
        <Header />
        <main id="main" className="min-w-0 flex-1 overflow-x-clip">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <MobileCtaBar />
      </body>
    </html>
  );
}
