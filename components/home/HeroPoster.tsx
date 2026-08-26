import Image from "next/image";
import { IMAGE_BLUR_IVORY } from "@/lib/images";

/** Lightweight LCP poster — server component, no video, no client JS. */
export function HeroPoster({
  src,
  alt = "",
  objectPosition = "center center",
}: {
  src: string;
  alt?: string;
  objectPosition?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      fetchPriority="high"
      sizes="100vw"
      quality={70}
      placeholder="blur"
      blurDataURL={IMAGE_BLUR_IVORY}
      className="object-cover"
      style={{ objectPosition }}
    />
  );
}
