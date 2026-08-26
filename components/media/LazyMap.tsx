"use client";

import Image from "next/image";
import { IconPin } from "@/components/ui/Icons";
import { useInViewOnce } from "@/lib/hooks";
import { IMAGE_BLUR_MAP } from "@/lib/images";
import { cancelIdle, getConnectionQuality, scheduleIdle } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useEffect, useId, useState, type SyntheticEvent } from "react";

type Status = "preview" | "loading" | "ready" | "failed";

/**
 * Static map first, live Google embed later. The iframe is not in the
 * initial HTML. IntersectionObserver (with a wide root margin) plus an
 * idle callback start the embed; a tap/click starts it immediately.
 */
export function LazyMap({
  src,
  title,
  className,
  heightClass = "h-[360px]",
  previewSrc,
  previewAlt,
  mapsUrl,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
}: {
  src: string;
  title: string;
  className?: string;
  heightClass?: string;
  previewSrc?: string;
  previewAlt?: string;
  mapsUrl?: string;
  sizes?: string;
  preload?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>("80% 0px");
  const [status, setStatus] = useState<Status>("preview");
  const labelId = useId();
  const interactive = status === "ready";
  const showEmbed = status === "loading" || status === "ready";
  const showPreview = Boolean(previewSrc) && status !== "ready";

  useEffect(() => {
    if (!inView || status !== "preview") return;
    if (getConnectionQuality() === "slow") return;
    const id = scheduleIdle(() => setStatus("loading"), 800);
    return () => cancelIdle(id);
  }, [inView, status]);

  useEffect(() => {
    if (status !== "loading") return;
    const timeout = window.setTimeout(() => setStatus("failed"), 15000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  function activate() {
    if (status === "ready" || status === "loading") return;
    setStatus("loading");
  }

  function onFrameLoad(event: SyntheticEvent<HTMLIFrameElement>) {
    const frame = event.currentTarget;
    try {
      const href = frame.contentWindow?.location.href ?? "";
      if (!href || href === "about:blank") return;
      if (href.startsWith("chrome-error:") || href.startsWith("chrome://")) {
        setStatus("failed");
        return;
      }
    } catch {
      setStatus("ready");
      return;
    }
    setStatus("ready");
  }

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-forest",
        !interactive && previewSrc && "cursor-pointer",
        heightClass,
        className,
      )}
      style={{ touchAction: "pan-y" }}
      onClick={() => {
        if (!interactive) activate();
      }}
    >
      {showPreview ? (
        <Image
          src={previewSrc!}
          alt={previewAlt || title}
          fill
          sizes={sizes}
          quality={65}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          decoding="async"
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_MAP}
          className="object-cover grayscale contrast-125"
        />
      ) : null}

      {!previewSrc && status !== "ready" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-forest/90 px-6 text-center text-ivory">
          <IconPin className="h-6 w-6 text-brass-soft" />
          <p className="max-w-xs font-serif text-2xl">Goa, by appointment</p>
          <p className="max-w-sm text-sm text-ivory/70">
            The map loads on request so the page stays light on slower
            connections.
          </p>
          {status === "failed" ? (
            <p className="text-xs text-ivory/55">
              The map could not be loaded. Open Google Maps from the address
              below.
            </p>
          ) : (
            <button
              type="button"
              onClick={activate}
              className="relative z-[2] mt-1 inline-flex min-h-11 min-w-[11rem] items-center justify-center border border-ivory/30 px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
            >
              Load map
            </button>
          )}
        </div>
      ) : null}

      {showEmbed ? (
        <iframe
          title={title}
          src={src}
          className={cn(
            "absolute inset-0 z-[1] h-full w-full grayscale contrast-125 motion-reduce:transition-none",
            interactive
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
          style={{
            transitionProperty: "opacity",
            transitionDuration: "300ms",
            transitionTimingFunction: "var(--ease-cinematic)",
          }}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={onFrameLoad}
          onError={() => setStatus("failed")}
        />
      ) : null}

      {mapsUrl ? (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          aria-describedby={status === "failed" ? labelId : undefined}
          className="absolute right-4 top-4 z-10 inline-flex min-h-11 items-center gap-2 border border-ivory/15 bg-ink/85 px-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ivory transition-opacity duration-300 hover:opacity-90 motion-reduce:transition-none lg:top-[calc(5.75rem+env(safe-area-inset-top))]"
        >
          <IconPin className="h-3.5 w-3.5 text-brass-soft" />
          Open in Google Maps
        </a>
      ) : null}

      {status === "failed" && mapsUrl ? (
        <p
          id={labelId}
          className="pointer-events-none absolute right-4 top-[4.25rem] z-10 max-w-[14rem] text-right text-[11px] uppercase tracking-[0.16em] text-ivory/80 lg:top-[calc(8.75rem+env(safe-area-inset-top))]"
        >
          Live map unavailable. Use Open in Google Maps.
        </p>
      ) : null}
    </div>
  );
}
