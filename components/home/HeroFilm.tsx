"use client";

import Image from "next/image";
import { IconPause, IconPlay } from "@/components/ui/Icons";
import {
  HERO_CROSSFADE_MS,
  HERO_ROTATE_MS,
  heroFilmHasFile,
  type HeroMedia,
} from "@/lib/hero-media";
import { useInView } from "@/lib/hooks";
import { IMAGE_BLUR_IVORY } from "@/lib/images";
import {
  cancelIdle,
  scheduleIdle,
  shouldAutoplayHeroVideo,
} from "@/lib/media";
import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const FILM_WIDTH = 1920;
const FILM_HEIGHT = 1080;

export function HeroFilm({ videos }: { videos: readonly HeroMedia[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [armed, setArmed] = useState(false);
  const [loadSecond, setLoadSecond] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>("200px 0px");
  const current = videos[index] ?? videos[0]!;
  const motion = armed && inView && !paused;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const sync = () => setNarrow(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!videos.some(heroFilmHasFile)) return;
    if (!shouldAutoplayHeroVideo()) return;
    const id = scheduleIdle(() => setArmed(true), 900);
    return () => cancelIdle(id);
  }, [videos]);

  useEffect(() => {
    if (!armed) return;
    const idle = scheduleIdle(() => setLoadSecond(true), 3500);
    const fallback = window.setTimeout(() => setLoadSecond(true), 9000);
    return () => {
      cancelIdle(idle);
      window.clearTimeout(fallback);
    };
  }, [armed]);

  useEffect(() => {
    if (videos.length < 2 || paused) return;
    const id = window.setInterval(() => {
      setIndex((value) => (value + 1) % videos.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [index, paused, videos.length]);

  const select = (next: number) => {
    setPaused(false);
    setIndex(next);
  };

  const onFilmKey = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      select((index + 1) % videos.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      select((index - 1 + videos.length) % videos.length);
    }
  };

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {videos.map((video, i) =>
        i === 0 ? null : (
          <Image
            key={`poster-${video.id}`}
            src={narrow ? video.mobilePoster : video.poster}
            alt=""
            fill
            sizes="100vw"
            quality={68}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_IVORY}
            className={cn(
              "object-cover",
              i === index ? "opacity-100" : "opacity-0",
            )}
            style={{
              objectPosition: video.objectPosition,
              transition: `opacity ${HERO_CROSSFADE_MS}ms var(--ease-cinematic)`,
            }}
          />
        ),
      )}

      {videos.map((video, i) => {
        const ready = i === 0 ? armed : loadSecond;
        if (!ready || failed[video.id] || !heroFilmHasFile(video)) return null;
        return (
          <HeroClip
            key={video.id}
            video={video}
            active={i === index}
            motion={motion}
            narrow={narrow}
            onError={() =>
              setFailed((current) => ({ ...current, [video.id]: true }))
            }
          />
        );
      })}

      <div className="pointer-events-auto absolute right-7 top-[calc(5.25rem+env(safe-area-inset-top))] z-10 flex items-center gap-4 sm:bottom-8 sm:right-8 sm:top-auto md:right-24 lg:right-28">
        {videos.some(heroFilmHasFile) ? (
          <button
            type="button"
            onClick={() => {
              if (!armed) {
                setArmed(true);
                setPaused(false);
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
        ) : null}

        <div className="hidden flex-col items-end gap-2 sm:flex">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-ivory/70">
            {String(index + 1).padStart(2, "0")} — {current.label}
          </p>
          <div
            className="flex items-center gap-1"
            role="tablist"
            aria-label="Hero films"
            onKeyDown={onFilmKey}
          >
            {videos.map((video, i) => (
              <button
                key={video.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={video.label}
                onClick={() => select(i)}
                className="relative flex h-11 min-w-11 items-center overflow-hidden"
              >
                <span className="absolute inset-x-0 top-1/2 h-px w-10 -translate-y-1/2 bg-ivory/25" />
                <span className="absolute inset-x-0 top-1/2 w-10 -translate-y-1/2">
                  <span
                    key={`${video.id}-${i === index ? index : "idle"}-${motion}`}
                    className={cn(
                      "block h-px w-10 origin-left bg-ivory",
                      i === index && motion && "hero-progress-bar",
                    )}
                    style={{
                      transform: `scaleX(${
                        i < index || (i === index && !motion) ? 1 : i === index ? 0.04 : 0
                      })`,
                    }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only">
        Coast and residence films. The coastline is Mixkit stock under the
        Mixkit Stock Video Free License. The residence film is original
        villa photography from the collection.
      </p>
    </div>
  );
}

function HeroClip({
  video,
  active,
  motion,
  narrow,
  onError,
}: {
  video: HeroMedia;
  active: boolean;
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
        active && on ? "opacity-100" : "opacity-0",
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
      aria-hidden={!active}
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
