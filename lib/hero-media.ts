/**
 * Homepage hero film. Replace `src`, `webmSrc`, poster paths and
 * `objectPosition` here — the hero component does not need to change.
 *
 * Source (licensed, no watermarks):
 * - goa-waves: Mixkit 1573 aerial tropical coastline, Mixkit Stock Video Free License.
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

/** Soft fade when the film becomes visible over the LCP poster. */
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
];

export const heroFilm = heroMedia[0]!;

export function heroFilmHasFile(video: HeroMedia) {
  return Boolean(video.src?.trim() || video.webmSrc?.trim());
}
