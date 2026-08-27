"use client";

import { IconPause, IconPlay } from "@/components/ui/Icons";
import {
  HERO_CROSSFADE_MS,
  heroFilmHasFile,
  type HeroMedia,
} from "@/lib/hero-media";
import { useInView } from "@/lib/hooks";
import {
  cancelIdle,
  scheduleIdle,
  shouldAutoplayHeroVideo,
} from "@/lib/media";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const FILM_WIDTH = 1920;
const FILM_HEIGHT = 1080;

export function HeroFilm({ video }: { video: HeroMedia }) {
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [armed, setArmed] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>("200px 0px");
  const hasFile = heroFilmHasFile(video);
  const motion = armed && inView && !paused && !failed && hasFile;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!hasFile) return;
    if (!shouldAutoplayHeroVideo()) return;
    const id = scheduleIdle(() => setArmed(true), 900);
    return () => cancelIdle(id);
  }, [hasFile]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {armed && !failed && hasFile ? (
        <HeroClip
          video={video}
          motion={motion}
          narrow={narrow}
          onError={() => setFailed(true)}
        />
      ) : null}

      {hasFile ? (
        <div className="pointer-events-auto absolute right-7 top-[calc(5.25rem+env(safe-area-inset-top))] z-10 sm:bottom-8 sm:right-8 sm:top-auto md:right-24 lg:right-28">
          <button
            type="button"
            onClick={() => {
              if (!armed) {
                setArmed(true);
                setPaused(false);
                setFailed(false);
                return;
              }
              setPaused((value) => !value);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:bg-ivory/10"
            aria-label={motion ? "Pause film" : "Play film"}
          >
            {motion ? (
              <IconPause className="h-4 w-4" />
            ) : (
              <IconPlay className="h-4 w-4" />
            )}
          </button>
        </div>
      ) : null}

      <p className="sr-only">
        Coastline film. Mixkit stock under the Mixkit Stock Video Free License.
      </p>
    </div>
  );
}

function HeroClip({
  video,
  motion,
  narrow,
  onError,
}: {
  video: HeroMedia;
  motion: boolean;
  narrow: boolean;
  onError: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const mp4 = narrow && video.mobileSrc ? video.mobileSrc : video.src;
  const webm = narrow ? undefined : video.webmSrc;

  const play = useCallback(async () => {
    const el = ref.current;
    if (!el) return;
    try {
      el.muted = true;
      await el.play();
      setOn(true);
    } catch {
      setOn(false);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!motion) {
      el.pause();
      return;
    }
    const id = window.setTimeout(() => {
      void play();
    }, 0);
    return () => window.clearTimeout(id);
  }, [motion, play]);

  return (
    <video
      ref={ref}
      className={cn(
        "hero-film-clip absolute inset-0 h-full w-full object-cover",
        on ? "opacity-100" : "opacity-0",
      )}
      style={{
        objectPosition: video.objectPosition,
        transition: `opacity ${HERO_CROSSFADE_MS}ms var(--ease-cinematic)`,
      }}
      width={FILM_WIDTH}
      height={FILM_HEIGHT}
      muted
      playsInline
      loop
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      preload="metadata"
      poster={narrow ? video.mobilePoster : video.poster}
      aria-hidden={!on}
      aria-label={video.alt}
      onLoadedData={() => {
        if (motion) void play();
      }}
      onPlaying={() => setOn(true)}
      onPause={() => {
        if (!motion) setOn(false);
      }}
      onError={onError}
    >
      {webm ? <source src={webm} type="video/webm" /> : null}
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
    </video>
  );
}
