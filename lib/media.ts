export function getConnectionQuality(): "slow" | "fast" | "unknown" {
  if (typeof navigator === "undefined") return "unknown";
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return "unknown";
  if (conn.saveData) return "slow";
  if (
    conn.effectiveType === "slow-2g" ||
    conn.effectiveType === "2g" ||
    conn.effectiveType === "3g"
  ) {
    return "slow";
  }
  return "fast";
}

/** Autoplay only on desktop, with motion allowed, on a fast-enough link. */
export function shouldAutoplayHeroVideo() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  if (getConnectionQuality() === "slow") return false;
  return true;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scheduleIdle(callback: () => void, timeout = 1800) {
  if (typeof window === "undefined") return 0;
  const ric = (
    window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout: number },
      ) => number;
    }
  ).requestIdleCallback;
  if (ric) return ric(callback, { timeout });
  return window.setTimeout(callback, 400);
}

export function cancelIdle(id: number) {
  const cic = (
    window as Window & { cancelIdleCallback?: (id: number) => void }
  ).cancelIdleCallback;
  if (cic) cic(id);
  else window.clearTimeout(id);
}
