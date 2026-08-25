"use client";

import Image from "next/image";
import { IMAGE_BLUR_IVORY, mediaLoader } from "@/lib/images";

/** Lightweight LCP poster — server component, no video, no client JS. */
export function HeroPoster({ src }: { src: string }) {
  const isRemote = src.startsWith("http://") || src.startsWith("https://");

  return (
    <Image
      src={src}
      alt=""
      fill
      priority
      fetchPriority="high"
      loader={isRemote ? mediaLoader : undefined}
      sizes="100vw"
      quality={65}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_IVORY}
      className="object-cover object-[center_28%] sm:object-center"
    />
  );
}
