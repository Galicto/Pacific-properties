#!/usr/bin/env python3
"""Extract transparent brand assets from the official Pacific Properties lock-up.

Does not redraw or recolour gold. White type is remapped to ink only for the
on-light lock-up. The dark-teal field is knocked out around the artwork; the
teal fill inside the P-mark is preserved so the spiral stays intact.
"""

from __future__ import annotations

import math
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "logo-source.jpg"
BRAND = ROOT / "public" / "brand"
APP = ROOT / "app"
PUBLIC = ROOT / "public"

TEAL = (20, 50, 52)
INK = (23, 23, 21)  # #171715
TIDE = (20, 50, 52)  # #143234


def dist(c: tuple[int, int, int], ref: tuple[int, int, int] = TEAL) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(c, ref)))


def is_gold(r: int, g: int, b: int) -> bool:
    return r > 140 and r > g + 12 and g > b and (r - b) > 70


def flood_outside(rgb: Image.Image, threshold: float = 26.0) -> list[list[bool]]:
    w, h = rgb.size
    px = rgb.load()
    outside = [[False] * w for _ in range(h)]
    q: deque[tuple[int, int]] = deque()

    def try_seed(x: int, y: int) -> None:
        if dist(px[x, y]) < threshold and not outside[y][x]:
            outside[y][x] = True
            q.append((x, y))

    for x in range(w):
        try_seed(x, 0)
        try_seed(x, h - 1)
    for y in range(h):
        try_seed(0, y)
        try_seed(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not outside[ny][nx]:
                if dist(px[nx, ny]) < threshold:
                    outside[ny][nx] = True
                    q.append((nx, ny))
    return outside


def knockout(rgb: Image.Image, outside: list[list[bool]]) -> Image.Image:
    w, h = rgb.size
    src = rgb.load()
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dst = out.load()
    t0, t1 = 8.0, 46.0
    tr, tg, tb = TEAL

    for y in range(h):
        for x in range(w):
            r, g, b = src[x, y]
            if not outside[y][x]:
                dst[x, y] = (r, g, b, 255)
                continue
            if is_gold(r, g, b):
                dst[x, y] = (r, g, b, 255)
                continue
            d = dist((r, g, b))
            if d <= t0:
                dst[x, y] = (0, 0, 0, 0)
                continue
            a = 1.0 if d >= t1 else (d - t0) / (t1 - t0)
            if a < 0.02:
                dst[x, y] = (0, 0, 0, 0)
                continue
            # Unblend residual teal so type edges stay white, not muddy green.
            fr = min(255, max(0, (r - (1 - a) * tr) / a))
            fg = min(255, max(0, (g - (1 - a) * tg) / a))
            fb = min(255, max(0, (b - (1 - a) * tb) / a))
            dst[x, y] = (int(fr), int(fg), int(fb), int(round(a * 255)))
    return out


def to_light(rgba: Image.Image) -> Image.Image:
    w, h = rgba.size
    src = rgba.load()
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dst = out.load()
    ir, ig, ib = INK
    for y in range(h):
        for x in range(w):
            r, g, b, a = src[x, y]
            if a == 0:
                continue
            if is_gold(r, g, b):
                dst[x, y] = (r, g, b, a)
                continue
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            sat = max(r, g, b) - min(r, g, b)
            if lum > 155 and sat < 60:
                dst[x, y] = (ir, ig, ib, a)
            else:
                dst[x, y] = (r, g, b, a)
    return out


def content_bbox(im: Image.Image, min_alpha: int = 12) -> tuple[int, int, int, int]:
    w, h = im.size
    px = im.load()
    xs: list[int] = []
    ys: list[int] = []
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > min_alpha:
                xs.append(x)
                ys.append(y)
    return min(xs), min(ys), max(xs) + 1, max(ys) + 1


def crop_padded(im: Image.Image, pad: int) -> Image.Image:
    x0, y0, x1, y1 = content_bbox(im)
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    return im.crop((x0, y0, x1, y1))


def save_pair(im: Image.Image, stem: Path) -> None:
    stem.parent.mkdir(parents=True, exist_ok=True)
    png = stem.with_suffix(".png")
    webp = stem.with_suffix(".webp")
    im.save(png, "PNG", optimize=True)
    im.save(webp, "WEBP", quality=92, method=6)
    print(f"  {png.name} {im.size}  {png.stat().st_size // 1024}kb")
    print(f"  {webp.name} {im.size}  {webp.stat().st_size // 1024}kb")


def fit_contain(im: Image.Image, box: int) -> Image.Image:
    fitted = im.copy()
    fitted.thumbnail((box, box), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    canvas.paste(fitted, ((box - fitted.width) // 2, (box - fitted.height) // 2), fitted)
    return canvas


def on_tide(im: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (*TIDE, 255))
    mark = fit_contain(im, int(size * 0.86))
    canvas.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
    return canvas.convert("RGB")


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    print("Loading", SOURCE)
    rgb = Image.open(SOURCE).convert("RGB")
    print("Flood-fill outside field…")
    outside = flood_outside(rgb)
    print("Knocking out teal…")
    rgba = knockout(rgb, outside)

    lockup = crop_padded(rgba, pad=16)
    save_pair(lockup, BRAND / "logo-on-dark")

    light = to_light(lockup)
    save_pair(light, BRAND / "logo-on-light")

    mark_full = crop_padded(rgba.crop((180, 430, 350, 600)), pad=6)
    save_pair(mark_full, BRAND / "mark")

    # App icons: P-mark on native teal, not a white tile.
    icon_192 = on_tide(mark_full, 192)
    icon_192.save(APP / "icon.png", "PNG", optimize=True)
    on_tide(mark_full, 180).save(APP / "apple-icon.png", "PNG", optimize=True)
    print("  app/icon.png", icon_192.size)
    print("  app/apple-icon.png 180")

    og = Image.new("RGB", (1200, 630), TIDE)
    logo = lockup.copy()
    logo.thumbnail((760, 220), Image.Resampling.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2), logo)
    og.save(PUBLIC / "og.jpg", "JPEG", quality=90, optimize=True)
    print("  public/og.jpg", og.size, f"{(PUBLIC / 'og.jpg').stat().st_size // 1024}kb")
    print("lockup", lockup.size, "mark", mark_full.size)


if __name__ == "__main__":
    main()
