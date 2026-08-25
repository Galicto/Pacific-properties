"use client";

import { SmartImage } from "@/components/ui/SmartImage";
import type { PropertyVideo } from "@/data/properties";
import { useInView } from "@/lib/hooks";
import { shouldAutoplayHeroVideo } from "@/lib/media";
import { useEffect, useRef, useState } from "react";

/**
 * Assigned listing film only. Unverified videos must stay in
 * `data/unassigned-media.ts` and must not be passed here.
 */
export function PropertyFilm({
  video,
  title,
}: {
  video: PropertyVideo;
  title: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("80px");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);

  const ready = activated || inView;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !ready) return;
    if (!video.isHeroFilm || !shouldAutoplayHeroVideo()) return;
    el.muted = true;
    void el.play().catch(() => undefined);
  }, [ready, video.isHeroFilm]);

  return (
    <div ref={ref} className="relative overflow-hidden bg-ink">
      {ready ? (
        <video
          ref={videoRef}
          className="aspect-[16/10] w-full object-cover"
          poster={video.poster}
          controls
          playsInline
          muted={video.isHeroFilm}
          autoPlay={false}
          preload="metadata"
          aria-label={`${title} film`}
        >
          <source src={video.src} type="video/mp4" />
        </video>
      ) : (
        <>
          <SmartImage
            src={video.poster}
            alt={video.alt}
            className="aspect-[16/10] w-full"
            sizes="(min-width: 1024px) 70vw, 100vw"
            quality={60}
          />
          <button
            type="button"
            onClick={() => setActivated(true)}
            className="absolute inset-0 flex items-center justify-center bg-ink/25 text-[11px] uppercase tracking-[0.2em] text-ivory"
          >
            Play film
          </button>
        </>
      )}
    </div>
  );
}
