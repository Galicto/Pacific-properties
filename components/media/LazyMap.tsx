"use client";

import { IconPin } from "@/components/ui/Icons";
import { useInView } from "@/lib/hooks";
import { getConnectionQuality } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function LazyMap({
  src,
  title,
  className,
  heightClass = "h-[360px]",
}: {
  src: string;
  title: string;
  className?: string;
  heightClass?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>("120px 0px");
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!inView || load) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile || getConnectionQuality() === "slow") return;
    setLoad(true);
  }, [inView, load]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-ivory-deep",
        heightClass,
        className,
      )}
    >
      {load && !failed ? (
        <iframe
          title={title}
          src={src}
          className="absolute inset-0 h-full w-full grayscale contrast-125"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-forest/90 px-6 text-center text-ivory">
          <IconPin className="h-6 w-6 text-brass-soft" />
          <p className="max-w-xs font-serif text-2xl">Goa, by appointment</p>
          <p className="max-w-sm text-sm text-ivory/70">
            The map loads on request so the page stays light on slower
            connections.
          </p>
          {failed ? (
            <p className="text-xs text-ivory/55">
              The map could not be loaded. Open Google Maps from the address
              below.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => {
                setFailed(false);
                setLoad(true);
              }}
              className="mt-1 inline-flex min-h-11 min-w-[11rem] items-center justify-center border border-ivory/30 px-5 text-[11px] font-medium uppercase tracking-[0.18em] text-ivory"
            >
              Load map
            </button>
          )}
        </div>
      )}
    </div>
  );
}
