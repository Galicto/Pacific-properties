/**
 * Homepage hero films. Replace `src`, `webmSrc`, poster paths and
 * `objectPosition` here — the hero component does not need to change.
 *
 * Sources (licensed, no watermarks):
 * - goa-waves: Mixkit 1573 aerial tropical coastline, Mixkit Stock Video Free License.
 * - goa-lanes: slow film from original villa photography (Pilerne collection).
 */
export type HeroOverlay = "dark" | "soft";

export type HeroMedia = {
  id: string;
  label: string;
  src: string;
  webmSrc?: string;
  mobileSrc?: string;
  poster: string;
  mobilePoster: string;
  objectPosition: string;
  overlay: HeroOverlay;
  alt: string;
};

export const HERO_ROTATE_MS = 12_000;
export const HERO_CROSSFADE_MS = 1500;

export const heroMedia: HeroMedia[] = [
  {
    id: "goa-waves",
    label: "The Coast",
    src: "/videos/goa-waves.mp4",
    webmSrc: "/videos/goa-waves.webm",
    mobileSrc: "/videos/goa-waves-mobile.mp4",
    poster: "/videos/goa-waves-poster.webp",
    mobilePoster: "/videos/goa-waves-poster-mobile.webp",
    objectPosition: "center 45%",
    overlay: "soft",
    alt: "Aerial view of a palm-lined coastline and clear water",
  },
  {
    id: "goa-lanes",
    label: "The Residence",
    src: "/videos/goa-lanes.mp4",
    webmSrc: "/videos/goa-lanes.webm",
    mobileSrc: "/videos/goa-lanes-mobile.mp4",
    poster: "/videos/goa-lanes-poster.webp",
    mobilePoster: "/videos/goa-lanes-poster-mobile.webp",
    objectPosition: "center 42%",
    overlay: "soft",
    alt: "Laterite villas with terracotta roofs, tropical planting and a planted drive",
  },
];

export function heroFilmHasFile(video: HeroMedia) {
  return Boolean(video.src?.trim() || video.webmSrc?.trim());
}
