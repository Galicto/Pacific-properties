# Pacific Properties Goa

A boutique, editorial website for **Pacific Properties Goa** — curated villas, residences, land and investment opportunities across Goa.

Stack: **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**. Motion uses CSS and IntersectionObserver — no Framer Motion. Icons are inline SVGs.

Performance notes: the home hero poster is the LCP image. Hero video is not in the initial document; it loads after idle only on desktop with a fast connection. Phones show the poster and a Play Film control. Maps load on approach (desktop) or via “Load Map” (mobile / slow links). Images request device-sized Unsplash URLs (WebP/AVIF via `auto=format`).

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

---

## Content & Integration Setup

### 1. How to replace the hero video

Edit `lib/config.ts` → `siteConfig.heroVideos`.

Each entry needs `id`, `src`, `poster`, and `alt`. The home hero is built as a carousel: add further videos to the array and they will play in sequence with progress indicators.

For production, host files in `public/video/` (for example `/video/hero-01.mp4`) rather than hot-linking stock. Keep posters in `siteConfig.heroVideos[].poster`. The player uses `preload="metadata"` and **does not mount the video until** the page is idle on a desktop-class, fast connection. On phones and slow/Save-Data networks the poster remains, with an optional Play Film control — so the video cannot delay First Contentful Paint or Largest Contentful Paint.

Current v1 sources are Pexels MP4s (luxury villa courtyard + coastal aerial). Replace them locally before launch.

### 2. How to add/edit properties

All listings live in **`data/properties.ts`**. Unverified videos sit in **`data/unassigned-media.ts`** and must not be published until matched.

Add an object to the `properties` array with a unique `slug`. Required fields include `propertyType`, `purpose`, `location`, price (`number` or `null`), `priceDisplay`, `currency`, `status`, bedrooms, area fields, amenities, description, `media`, `heroImage`, `featured`, and `whatsAppEnquiryText`.

- Set `featured: true` only for Aldona, Pilerne, Saipem and Reis Magos.
- Neighbourhood cards are edited in `data/areas.ts`.
- Journal essays are edited in `data/journal.ts`.
- The dual image marquee is edited in `data/marquee.ts`.

Delivery stills live in `public/properties/{slug}/` as WebP. Original JPEGs are kept in `media/originals/` (not publicly served). Never use marketing-poster graphics as gallery or hero images.

### 3. How to change WhatsApp / social links

Edit `lib/config.ts`:

- `whatsappNumber` / `whatsappBaseUrl` / `defaultWhatsAppText`
- `linkedinUrl`, `instagramUrl`
- `email`, `phoneDisplay`, `address`

Helpers in `lib/whatsapp.ts` build personalised `wa.me` links. The default enquiry link is:

`https://wa.me/917517723777?text=Hello%20Pacific%20Properties%2C%20I%20would%20like%20to%20enquire%20about%20your%20properties%20in%20Goa.`

Property pages use: *Hello Pacific Properties, I would like to enquire about {title}.*

All external links open with `target="_blank"` and `rel="noopener noreferrer"`.

### 4. How to connect the enquiry form to a real backend

The form **does not claim a live backend**. `lib/form.ts` is an adapter:

| Mode | How |
| --- | --- |
| `mock` (default) | Validates, stores the payload in `sessionStorage`, shows an honest success message |
| `mailto` | Opens a mail draft to `siteConfig.email` |
| `endpoint` | `POST` JSON to `NEXT_PUBLIC_FORM_ENDPOINT` |

Create `.env.local`:

```bash
NEXT_PUBLIC_FORM_MODE=endpoint
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your-id
```

The same adapter can point at Resend (via a Route Handler), HubSpot, or your own API. Adapt `toProviderPayload()` if the provider expects a different shape.

### 5. How to replace the map embed

Default embed, place link, directions link, and static preview: `siteConfig` in `lib/config.ts` (`mapEmbedUrl`, `mapPlaceUrl`, `mapDirectionsUrl`, `mapPreview`). The Contact map paints the local WebP first and mounts the Google iframe only after IntersectionObserver (or a tap). Helpers: `mapsEmbedUrl()`, `mapsPlaceUrl()`, `mapsDirectionsUrl()`.

Per-listing maps: `mapEmbedUrl` on each property in `data/properties.ts`.

To use a precise pin, open Google Maps → Share → Embed a map, and paste the `iframe` `src`. Replace `public/maps/assagao.webp` if the office pin moves.

### 6. EMI calculator defaults

Indicative home-loan estimates live on **`/emi-calculator`**. Defaults are in **`emiDefaults` in `lib/emi.ts`** (rate 8.5%, tenure 20 years, 20% down payment). `siteConfig.emi` re-exports the same object.

Property pages link to the calculator with `property`, `price`, `location` and `slug` query parameters — they do not open a modal. Price-on-request listings omit `price`. WhatsApp financing messages use `financingWhatsAppText` in `lib/emi.ts` and `buildWhatsAppUrl` in `lib/whatsapp.ts`.

### 7. How to replace the official logo

The live lock-up and P-mark live in **`public/brand/`**. Paths and intrinsic sizes are in **`lib/config.ts` → `siteConfig.brand`**. The shared renderer is **`components/brand/Logo.tsx`**.

There is **one** colourway. The artwork is never swapped, inverted, or recoloured.

| File | Use |
| --- | --- |
| `pacific-properties-logo.svg` / `.png` | White wordmark + gold icon — the only lock-up (transparent field) |
| `pacific-properties-logo-share.png` | Same lock-up on black — JSON-LD `logo` |
| `pacific-properties-mark.svg` / `.png` | Square “P” mark — 404, compact chrome |
| `app/icon.png`, `app/apple-icon.png` | Favicon / home-screen icon, P-mark on black |
| `public/og.jpg` | 1200×630 social preview, lock-up on black |

The wordmark is white, so the lock-up only sits on dark surfaces (ink header, tide footer, photography, video). Do **not** stretch, invert, filter, or put a coloured tile behind the PNG.

To replace the artwork:

1. Place the official lock-up (black field or transparent PNG) at `scripts/logo-source.png`, or export web-ready files directly into `public/brand/` using the filenames above.
2. If starting from a black-field source, run `python3 scripts/process-logo.py` (requires Pillow and NumPy). Update `siteConfig.brand.lockup` and `markSize` if the pixel dimensions change.
3. Keep header / menu / loading on ink, footer on tide — never an ivory bar behind the lock-up.

### 8. How to add the verified RERA registration number

**Do not invent or guess a number.**

Edit **`lib/config.ts` → `siteConfig.credentials.reraRegistrationNumber`**.

The current Goa RERA number is `AGGO06180071` (from the official business card).

- The site shows `RERA Registration No. [NUMBER]` on the home credentials band and in compact trust lines, and adds it to Organisation / RealEstateAgent JSON-LD plus a `rera:registrationNumber` meta tag.

Do not add official GAR, NAR-India, or RERA logos unless the client provides licensed assets. The site uses neutral line marks only.
---

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/collection` | The Collection (filters, grid/list) |
| `/collection?area=assagao` | Collection filtered by area |
| `/collection/[slug]` | Property details |
| `/properties` | Redirects to `/collection` |
| `/about` | About the practice |
| `/journal` | Journal index |
| `/journal/[slug]` | Article |
| `/contact` | Enquiry + map |
| `/emi-calculator` | Indicative EMI calculator |
| `/privacy`, `/terms` | Placeholders |

## Performance

Priorities: fast mobile load, then smooth scrolling, then responsive UX, then polish.

- **Hero:** a responsive poster is the LCP image (`priority`, `fetchPriority="high"`, `sizes="100vw"`). The MP4 is not in the first paint and is loaded in a separate chunk after idle, **only on desktop with a fast connection**. Phones, Save-Data, 2G/3G, and `prefers-reduced-motion` keep the poster plus a **Play film** control.
- **Images:** Unsplash URLs are sized per `srcset` via `lib/images.ts` (`mediaLoader`). Cards use quality ~60 and tight `sizes`. Ivory LQIP, defined aspect ratios. Images never start at `opacity: 0` (that delayed LCP). Hover zoom is CSS `transform` only, and only on `(hover: hover)`.
- **Maps:** `LazyMap` waits for near-viewport on desktop/fast links; phones and slow links get a Load Map button. No Maps JavaScript API key.
- **JS:** Framer Motion and Lucide are not used. Hero film, below-the-fold home gallery/marquee, the property lightbox, and the property enquiry form are dynamically imported. The EMI calculator is a dedicated page (`/emi-calculator`), not a modal.
- **Motion:** CSS `transform`/`opacity` only. Reveals stay visible without JS. IntersectionObserver (once) for entrance. Marquee is a native horizontal scroller on mobile; CSS loop on desktop, paused when off-screen, hovered, focused, or reduced-motion. Native scrolling — no scroll libraries.
- **Fonts:** two families, **three files** (Cormorant Garamond 500, Manrope 400/500), `display: swap`. Only Manrope is preloaded so it does not contend with the LCP image.
- **Mobile chrome:** sticky WhatsApp + Enquire bar uses `env(safe-area-inset-bottom)`. Hero controls sit above it. Touch targets are 44px. Inputs are 16px to prevent iOS zoom.
