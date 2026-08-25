"use client";

import { IconPause, IconPlay } from "@/components/ui/Icons";
import type { HeroVideo } from "@/lib/config";
import { useInView } from "@/lib/hooks";
import { shouldAutoplayHeroVideo } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function HeroFilm({ videos }: { videos: readonly HeroVideo[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const seenHero = useRef(false);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const indexRef = useRef(0);
  const { ref, inView } = useInView<HTMLDivElement>("0px");
  const current = videos[index];

  indexRef.current = index;

  const play = useCallback(async () => {
    const el = videoRef.current;
    if (!el || userPaused.current) return;
    try {
      el.muted = true;
      await el.play();
      setPlaying(true);
      setFailed(false);
    } catch {
      setPlaying(false);
    }
  }, []);

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null) => {
      videoRef.current = el;
      if (!el) return;
      el.muted = true;
      el.playsInline = true;
      el.autoplay = true;
      if (shouldAutoplayHeroVideo() && !userPaused.current) {
        void el.play().then(
          () => {
            setPlaying(true);
            setFailed(false);
          },
          () => setPlaying(false),
        );
      }
    },
    [],
  );

  useEffect(() => {
    if (!shouldAutoplayHeroVideo()) {
      userPaused.current = true;
      videoRef.current?.pause();
      setPlaying(false);
      return;
    }
    void play();
  }, [index, play]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (inView) {
      seenHero.current = true;
      if (shouldAutoplayHeroVideo()) void play();
      return;
    }
    if (!seenHero.current) return;
    el.pause();
    setPlaying(false);
  }, [inView, play]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onTime = () => {
      if (!el.duration) return;
      const ratio = el.currentTime / el.duration;
      const bar = barRefs.current[indexRef.current];
      if (bar) {
        bar.style.transform = `translateY(-50%) scaleX(${Math.max(ratio, 0.04)})`;
      }
    };

    const onEnded = () => {
      if (videos.length > 1) {
        setIndex((value) => (value + 1) % videos.length);
      } else {
        el.currentTime = 0;
        if (!userPaused.current) void el.play();
      }
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [videos.length, index]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (playing) {
      userPaused.current = true;
      el.pause();
      setPlaying(false);
      return;
    }
    userPaused.current = false;
    void play();
  };

  return (
    <div ref={ref} className="absolute inset-0">
      <video
        key={current.id}
        ref={setVideoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-[center_28%] sm:object-center",
          failed || !playing ? "opacity-0" : "opacity-100",
        )}
        style={{
          transition: "opacity 0.7s var(--ease-cinematic)",
        }}
        autoPlay
        muted
        playsInline
        loop={videos.length === 1}
        preload="auto"
        aria-label={current.alt}
        onLoadedData={() => {
          if (shouldAutoplayHeroVideo() && !userPaused.current) void play();
        }}
        onPlaying={() => setPlaying(true)}
        onPause={() => {
          if (userPaused.current) setPlaying(false);
        }}
        onError={() => setFailed(true)}
      >
        <source src={current.src} type="video/mp4" />
      </video>

      <div className="absolute right-7 top-[calc(5.25rem+env(safe-area-inset-top))] z-10 flex items-center gap-3 sm:bottom-8 sm:right-8 sm:top-auto lg:right-12">
        <button
          type="button"
          onClick={toggle}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/30 text-ivory transition-colors duration-300 hover:bg-ivory/10"
          aria-label={playing ? "Pause film" : "Play film"}
        >
          {playing ? (
            <IconPause className="h-4 w-4" />
          ) : (
            <IconPlay className="h-4 w-4" />
          )}
        </button>

        <div
          className="hidden items-center gap-1 sm:flex"
          role="tablist"
          aria-label="Hero films"
        >
          {videos.map((video, i) => (
            <button
              key={video.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show film ${i + 1}`}
              onClick={() => {
                userPaused.current = false;
                setIndex(i);
                const bar = barRefs.current[i];
                if (bar) bar.style.transform = "translateY(-50%) scaleX(0.04)";
              }}
              className="relative h-11 min-w-11 overflow-hidden"
            >
              <span className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-ivory/25" />
              <span
                ref={(node) => {
                  barRefs.current[i] = node;
                }}
                className="absolute left-0 top-1/2 h-px w-10 origin-left bg-ivory"
                style={{
                  transform: `translateY(-50%) scaleX(${
                    i < index ? 1 : i === index ? 0.04 : 0
                  })`,
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
