"use client";

import Image from "next/image";
import { IMAGE_BLUR_IVORY, mediaLoader } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * Responsive image with ivory LQIP, fixed aspect box, and device-sized Unsplash URLs.
 * Client only because next/image custom `loader` cannot cross the RSC boundary.
 * No loaded/opacity state — that delayed LCP. Ivory LQIP comes from blurDataURL.
 */
export function SmartImage({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority,
  fill = true,
  width,
  height,
  quality = 65,
  objectPosition,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  quality?: number;
  objectPosition?: string;
}) {
  const useFill = fill && !width;

  const isRemote = src.startsWith("http://") || src.startsWith("https://");

  return (
    <div className={cn("relative overflow-hidden rounded-lg bg-ivory-deep", className)}>
      <Image
        src={src}
        alt={alt}
        loader={isRemote ? mediaLoader : undefined}
        fill={useFill}
        width={width}
        height={height}
        sizes={sizes ?? "(min-width: 1024px) 50vw, 100vw"}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        quality={quality}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_IVORY}
        className={cn("object-cover", imageClassName)}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
