"use client";

import { IconPause, IconPlay } from "@/components/ui/Icons";
import type { HeroVideo } from "@/lib/config";
import { useInView } from "@/lib/hooks";
import { cancelIdle, scheduleIdle, shouldAutoplayHeroVideo } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function HeroFilm({ videos }: { videos: readonly HeroVideo[] }) {
  const [index, setIndex] = useState(0);
  const [loadVideo, setLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const indexRef = useRef(0);
  const { ref, inView } = useInView<HTMLDivElement>("0px");
  const current = videos[index];

  indexRef.current = index;

  const play = useCallback(async () => {
    const el = videoRef.current;
    if (!el) return;
    try {
      await el.play();
      setPlaying(true);
      setFailed(false);
    } catch {
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldAutoplayHeroVideo()) return;
    const idle = scheduleIdle(() => setLoadVideo(true), 2200);
    return () => cancelIdle(idle);
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    void play();
  }, [loadVideo, index, play]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loadVideo) return;
    if (!inView) {
      el.pause();
      setPlaying(false);
      return;
    }
    if (shouldAutoplayHeroVideo()) void play();
  }, [inView, loadVideo, play]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loadVideo) return;

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
        void el.play();
      }
    };

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
    };
  }, [videos.length, loadVideo]);

  const requestPlay = () => {
    setFailed(false);
    setLoadVideo(true);
  };

  const toggle = () => {
    const el = videoRef.current;
    if (!loadVideo) {
      requestPlay();
      return;
    }
    if (!el) {
      requestPlay();
      return;
    }
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void play();
    }
  };

  const showPlay = !loadVideo || !playing;

  return (
    <div ref={ref} className="absolute inset-0">
      {loadVideo ? (
        <video
          key={current.id}
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-[center_28%] sm:object-center",
            failed || !playing ? "opacity-0" : "opacity-100",
          )}
          style={{
            transition: "opacity 0.7s var(--ease-cinematic)",
          }}
          muted
          playsInline
          loop={videos.length === 1}
          preload="metadata"
          aria-label={current.alt}
          onError={() => setFailed(true)}
        >
          <source src={current.src} type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-5 z-10 flex items-center gap-3 sm:bottom-8 sm:right-8 lg:right-12">
        <button
          type="button"
          onClick={toggle}
          className="flex min-h-11 items-center gap-2 rounded-full border border-ivory/30 px-3 text-ivory transition-colors duration-300 hover:bg-ivory/10 sm:h-11 sm:w-11 sm:justify-center sm:px-0"
          aria-label={showPlay ? "Play film" : "Pause film"}
        >
          {showPlay ? (
            <IconPlay className="h-4 w-4" />
          ) : (
            <IconPause className="h-4 w-4" />
          )}
          <span className="pr-1 text-[10px] uppercase tracking-[0.18em] sm:hidden">
            {showPlay ? "Play film" : "Pause"}
          </span>
        </button>

        <div
          className="flex items-center gap-1"
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
                setIndex(i);
                setLoadVideo(true);
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
