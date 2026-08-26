import type { ImageLoaderProps } from "next/image";

/** Tiny ivory LQIP — instant, no extra network request. */
export const IMAGE_BLUR_IVORY =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%23EFE8DC'/%3E%3C/svg%3E";

/** Map-preview LQIP — matches the desaturated Carto land colour. */
export const IMAGE_BLUR_MAP =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='10'%3E%3Crect width='16' height='10' fill='%23E8E6E0'/%3E%3C/svg%3E";

/**
 * Request exact widths from Unsplash/Pexels so phones never download
 * a 1800–3000px source. Bypasses the Next image optimiser hop.
 */
export function mediaLoader({ src, width, quality }: ImageLoaderProps) {
  const q = quality ?? 70;
  try {
    const url = new URL(src);
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(q));
      url.searchParams.delete("h");
      url.searchParams.delete("fm");
      return url.toString();
    }
    if (url.hostname === "images.pexels.com") {
      url.searchParams.set("auto", "compress");
      url.searchParams.set("cs", "tinysrgb");
      url.searchParams.set("w", String(width));
      url.searchParams.set("dpr", "1");
      return url.toString();
    }
  } catch {
    /* fall through */
  }
  return src;
}
