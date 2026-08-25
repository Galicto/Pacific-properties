# QA checklist — Pacific Properties Goa

Full-site pass (not homepage-only). The homepage treatment was left in place. Inner routes were brought to the same visual, interaction, and copy standard.

## Pages reviewed

- Home (`/`) — featured residences only; warehouse is not in that carousel
- Collection (`/collection`) — filters, empty state, grid/list, cards, Load more
- Property details: Aldona, Pilerne, Saipem, Reis Magos, Verna (For Rent, no EMI), Ucassaim, Dona Paula villas / penthouse / apartment
- About (`/about`)
- Journal index (`/journal`)
- Journal articles (`/journal/[slug]`) including old-slug redirects
- Contact (`/contact`) — validation, map on request, socials
- EMI Calculator (`/emi-calculator`) — Aldona query seeding, schedule accordion
- Privacy (`/privacy`)
- Terms (`/terms`)
- 404 (`/this-page-does-not-exist`)
- Header, Areas menu, mobile menu, footer, WhatsApp float, mobile Private Enquiry bar

## Mobile widths exercised

Checked after hydration (DevTools device override during first paint can show a false Next.js overlay).

| Width | Result |
| --- | --- |
| 320px | Privacy: no horizontal overflow |
| 375px | Collection / inner pages (prior pass): no overflow |
| 390px | Journal article: no overflow |
| 414px | Privacy: no overflow |
| 768px | Tablet chrome (hamburger until `lg`) |
| 1024px | Desktop nav including EMI; no overflow |
| 1280px | No overflow |
| 1440px+ | 1920 desktop: no overflow |

`html` / `body` use `overflow-x: clip`. Sticky Private Enquiry bar is hidden on property, Contact, and EMI routes. Floating WhatsApp is hidden on Contact, EMI, and property details so it cannot cover forms.

## Bugs and polish fixed

- Collection, Journal, EMI, Privacy and Terms share the same intro language (eyebrow, serif title, measured copy). Collection/Journal use listing stills.
- Collection cards: 4:5 ratio, serif prices, For Sale / For Rent, Price on Request, Under Construction and Land badges.
- Collection mobile filters remain a bottom sheet; status chip is **Available**; empty state; desktop Clear filters. Commercial filter returns only Verna.
- Property pages: enquiry column sits beside gallery/facts (sticky on desktop).
- Galleries: previous/next on all breakpoints; lightbox focus trap, Escape/arrows, backdrop close; media deduped by `src`.
- About: official lock-up; credentials GAR / NAR-India / RERA Registered (no invented number).
- Journal: three named notes, no invented dates/authors/statistics; cinematic article heroes; empty-state branch if the array is cleared; old slugs redirect.
- Contact: dark header; map on request; float hidden; `aria-invalid` and field errors; inputs at `text-base` (no iPhone zoom).
- EMI: inbound `?slug=&property=&price=` still seeds the listing; session persistence kept; **URL is no longer rewritten with `history.replaceState`** (that desynced the App Router). Schedule accordion pages without blocking the UI. Zero-interest, decimals, ₹50L / ₹1 Cr / ₹3 Cr / ₹10 Cr covered by unit tests.
- WhatsApp only `https://wa.me/917057860921`; Instagram `pacificpropertiesindia`; no `751772` strings.
- Copy: Built-up Area, Swimming Pool, Car Parking, Power Backup, Private Enquiry, Price on Request. Missing bathrooms are omitted, not invented.
- Featured residences exclude commercial even if a `featured` flag is set in error.
- Property cards are a single client component (they are used from both Collection and related listings) to avoid mixed server/client trees.
- 404 heading clamps on small screens.

## Production

- `npx tsc --noEmit` — pass
- `npm test` (EMI) — 17/17 pass
- `next build` — pass (26 routes)

Dev-only Next.js issue badges appeared when `history.replaceState` ran or when files hot-reloaded mid-navigation. Fresh loads of About, Contact, Collection, EMI, 404, Privacy and Home did not show overlays.

## Remaining items for client confirmation

1. **RERA registration number** — empty in `lib/config.ts`. Site shows “RERA Registered” only.
2. **Approved photography** for Saipem, Ucassaim, and the three Dona Paula listings (private-preview / plans fallbacks).
3. **Seven property films** — still unassigned; homepage uses licensed Pexels films until client MP4s are matched.
4. **Founder/advisor portrait and biography** — not invented; About uses the official mark.
5. **Live enquiry inbox** — form validates and stores the session; WhatsApp remains the prompt reply path until `NEXT_PUBLIC_FORM_ENDPOINT` is set.
6. **Full privacy policy and terms of use** — placeholders until legal copy is supplied.
7. **Assagao office pin** — map query is village-level, not a street address.
8. **Pilerne plot** — source data is `400–535 sq yd` (not converted to sq m).
9. Collection chip filters do not write the URL (Areas menu `?area=` still works). EMI slider state is stored in the session, not rewritten into the address bar.
