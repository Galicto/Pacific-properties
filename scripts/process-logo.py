#!/usr/bin/env python3
"""Build the single official Pacific Properties lock-up from the black-field source.

The source is a 1000×1000 PNG with a baked black canvas. This script keys only
that field, keeps the gold icon (including the darker gold P), the gold divider,
and the white wordmark, then writes:

  public/brand/pacific-properties-logo.{png,svg}   the one lock-up (never recoloured)
  public/brand/pacific-properties-mark.{png,svg}   gold P-mark
  app/icon.png / apple-icon.png                    mark on black
  public/og.jpg                                    lock-up on black (1200×630)

SVG is an embedded-PNG wrapper so the primary .svg matches the raster exactly.
Dual dark/light colourways are not produced — the site never swaps artwork.
"""

from __future__ import annotations

import base64
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "scripts" / "logo-source.png"
BRAND = ROOT / "public" / "brand"
APP = ROOT / "app"
PUBLIC = ROOT / "public"

INK = (23, 23, 21)  # #171715
BLACK = (0, 0, 0)


def is_gold_arr(src: np.ndarray) -> np.ndarray:
    r = src[..., 0]
    g = src[..., 1]
    b = src[..., 2]
    return (r > 140) & (r > g + 8) & (g > b) & ((r.astype(np.int16) - b) > 50)


def load_rgb() -> Image.Image:
    if not SOURCE.exists():
        raise SystemExit(f"Missing source: {SOURCE}")
    return Image.open(SOURCE).convert("RGB")


def mark_bbox(rgb: Image.Image) -> tuple[int, int, int, int]:
    """Left gold cluster = the rounded-square icon, not the gold A."""
    src = np.array(rgb)
    gold = is_gold_arr(src)
    h, w = gold.shape
    col_count = gold[:, : max(1, w // 2)].sum(axis=0)
    xs = np.where(col_count > 0)[0]
    if xs.size == 0:
        raise SystemExit("No gold icon found")
    x0 = int(xs[0])
    x1 = x0
    gap = 0
    for x in range(x0, int(xs[-1]) + 1):
        if col_count[x] == 0:
            gap += 1
            if gap >= 8:
                break
        else:
            gap = 0
            x1 = x
    ys = np.where(gold[:, x0 : x1 + 1].any(axis=1))[0]
    return x0, int(ys[0]), x1 + 1, int(ys[-1]) + 1


def dilate(mask: np.ndarray, k: int = 1) -> np.ndarray:
    out = mask.copy()
    h, w = mask.shape
    for dy in range(-k, k + 1):
        for dx in range(-k, k + 1):
            if dx == 0 and dy == 0:
                continue
            y0, y1 = max(0, dy), h + min(0, dy)
            x0, x1 = max(0, dx), w + min(0, dx)
            out[max(0, -dy) : h + min(0, -dy), max(0, -dx) : w + min(0, -dx)] |= mask[
                y0:y1, x0:x1
            ]
    return out


def erode(mask: np.ndarray, k: int = 1) -> np.ndarray:
    return ~dilate(~mask, k)


def morph_close(mask: np.ndarray, k: int = 1) -> np.ndarray:
    return erode(dilate(mask, k), k)


def fill_holes(mask: np.ndarray) -> np.ndarray:
    """Fill interior holes so the icon is a solid rounded square (keeps the P)."""
    h, w = mask.shape
    bg = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        if not mask[0, x]:
            bg[0, x] = True
            q.append((x, 0))
        if not mask[h - 1, x]:
            bg[h - 1, x] = True
            q.append((x, h - 1))
    for y in range(h):
        if not mask[y, 0]:
            bg[y, 0] = True
            q.append((0, y))
        if not mask[y, w - 1]:
            bg[y, w - 1] = True
            q.append((w - 1, y))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h and not bg[ny, nx] and not mask[ny, nx]:
                bg[ny, nx] = True
                q.append((nx, ny))
    return ~bg


def knockout_black(
    rgb: Image.Image, mx0: int, my0: int, mx1: int, my1: int
) -> Image.Image:
    """Transparent black field; gold icon (with P), divider, and white type stay solid."""
    src = np.array(rgb)
    r = src[..., 0].astype(np.int16)
    g = src[..., 1].astype(np.int16)
    b = src[..., 2].astype(np.int16)
    gold = is_gold_arr(src)

    icon_gold = np.zeros(gold.shape, dtype=bool)
    icon_gold[my0:my1, mx0:mx1] = gold[my0:my1, mx0:mx1]
    icon_keep = dilate(fill_holes(morph_close(icon_gold, 1)), 1)

    lum = 0.299 * r + 0.587 * g + 0.114 * b
    sat = src.max(axis=2) - src.min(axis=2)
    white = (lum > 140) & (sat < 95)

    mx = src.max(axis=2).astype(np.float32)
    keep = icon_keep | gold | white

    out = np.zeros((*src.shape[:2], 4), dtype=np.uint8)
    out[keep, :3] = src[keep]
    out[keep, 3] = 255

    # Anti-aliased edge against black: un-premultiply, then drop noise.
    fringe = ~keep & (mx > 10) & (mx < 160)
    a = np.clip((mx - 10.0) / 90.0, 0.0, 1.0)
    inv = 1.0 / np.maximum(mx / 255.0, 0.08)
    for c in range(3):
        fg = np.clip(src[..., c].astype(np.float32) * inv, 0, 255)
        out[..., c] = np.where(fringe, fg.astype(np.uint8), out[..., c])
    out[..., 3] = np.where(
        fringe, np.clip(a * 255.0, 0, 220).astype(np.uint8), out[..., 3]
    )
    return Image.fromarray(out)


def scrub_field(rgba: Image.Image) -> Image.Image:
    """Drop leftover near-black specks that are not next to gold or type."""
    arr = np.array(rgba)
    rgb = arr[..., :3].astype(np.int16)
    a = arr[..., 3]
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    gold = is_gold_arr(arr) & (a > 20)
    white = (lum > 140) & (sat < 95) & (a > 20)
    near_art = dilate(gold | white, 2)
    leftover = (a > 0) & (lum < 28) & (sat < 40) & ~gold & ~near_art
    arr[..., 3] = np.where(leftover, 0, a)
    arr[..., 3] = np.where(arr[..., 3] < 16, 0, arr[..., 3])
    arr[..., 3] = np.where(arr[..., 3] > 250, 255, arr[..., 3])
    return Image.fromarray(arr)


def content_bbox(im: Image.Image, min_alpha: int = 18) -> tuple[int, int, int, int]:
    arr = np.array(im)
    rgb = arr[..., :3].astype(np.int16)
    a = arr[..., 3]
    lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]
    sat = rgb.max(axis=2) - rgb.min(axis=2)
    gold = is_gold_arr(arr) & (a > min_alpha)
    white = (lum > 135) & (sat < 100) & (a > min_alpha)
    keep = gold | white
    ys, xs = np.where(keep)
    if xs.size == 0:
        raise SystemExit("No logo content after knockout")
    return int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1


def fringe_aa(im: Image.Image) -> Image.Image:
    """Give fully transparent edge pixels neighbouring RGB so browsers
    do not bilinear-blend (0,0,0,0) into a dark rectangular halo."""
    arr = np.array(im)
    rgb = arr[..., :3].astype(np.float32)
    a = arr[..., 3]
    opaque = a == 255
    h, w = a.shape
    acc = np.zeros((h, w, 3), dtype=np.float32)
    count = np.zeros((h, w), dtype=np.float32)
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            if dx == 0 and dy == 0:
                continue
            src = opaque[max(0, dy) : h + min(0, dy), max(0, dx) : w + min(0, dx)]
            dest = (
                slice(max(0, -dy), h + min(0, -dy)),
                slice(max(0, -dx), w + min(0, -dx)),
            )
            count[dest] += src.astype(np.float32)
            for c in range(3):
                acc[dest[0], dest[1], c] += (
                    rgb[max(0, dy) : h + min(0, dy), max(0, dx) : w + min(0, dx), c]
                    * src
                )
    near = (a == 0) & (count > 0)
    for c in range(3):
        arr[..., c] = np.where(
            near,
            np.clip(acc[..., c] / np.maximum(count, 1), 0, 255),
            arr[..., c],
        )
    arr[..., 3] = np.where(
        near, np.clip(count / 8.0 * 140.0, 12, 160).astype(np.uint8), a
    )
    return Image.fromarray(arr)


def crop_padded(im: Image.Image, pad: int) -> Image.Image:
    x0, y0, x1, y1 = content_bbox(im)
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.width, x1 + pad)
    y1 = min(im.height, y1 + pad)
    x1 = min(im.width, x1 + 8)  # ®
    return im.crop((x0, y0, x1, y1))


def write_svg_from_png(png_path: Path, svg_path: Path, title: str) -> None:
    im = Image.open(png_path)
    w, h = im.size
    payload = base64.b64encode(png_path.read_bytes()).decode("ascii")
    svg_path.write_text(
        "\n".join(
            [
                '<?xml version="1.0" encoding="UTF-8"?>',
                f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
                f'viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">',
                f"<title>{title}</title>",
                f'<image width="{w}" height="{h}" href="data:image/png;base64,{payload}"/>',
                "</svg>",
            ]
        ),
        encoding="utf-8",
    )
    print(f"  {svg_path.name}  {w}×{h}  {svg_path.stat().st_size // 1024}kb (embedded PNG)")


def save_png(im: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True, compress_level=9)
    print(f"  {path.name}  {im.size[0]}×{im.size[1]}  {path.stat().st_size // 1024}kb")


def fit_contain(im: Image.Image, box: int) -> Image.Image:
    fitted = im.copy()
    fitted.thumbnail((box, box), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (box, box), (0, 0, 0, 0))
    canvas.paste(fitted, ((box - fitted.width) // 2, (box - fitted.height) // 2), fitted)
    return canvas


def on_black(im: Image.Image, size: int) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (*BLACK, 255))
    mark = fit_contain(im, int(size * 0.72))
    canvas.paste(mark, ((size - mark.width) // 2, (size - mark.height) // 2), mark)
    return canvas.convert("RGB")


def extract_mark(lockup: Image.Image) -> Image.Image:
    arr = np.array(lockup)
    gold = is_gold_arr(arr) & (arr[..., 3] > 40)
    cols = gold.any(axis=0)
    xs = np.where(cols)[0]
    x0 = int(xs[0])
    x1 = x0
    gap = 0
    for x in range(int(xs[0]), int(xs[-1]) + 1):
        if not cols[x]:
            gap += 1
            if gap >= 6:
                break
        else:
            gap = 0
            x1 = x
    icon = np.zeros(gold.shape, dtype=bool)
    icon[:, x0 : x1 + 1] = True
    gold_icon = gold & icon
    ys, xs_i = np.where(gold_icon)
    ix0, iy0 = int(xs_i.min()), int(ys.min())
    ix1, iy1 = int(xs_i.max()) + 1, int(ys.max()) + 1
    pad = 10
    mark = lockup.crop(
        (
            max(0, ix0 - pad),
            max(0, iy0 - pad),
            min(lockup.width, ix1 + pad),
            min(lockup.height, iy1 + pad),
        )
    )
    m_arr = np.array(mark)
    rgb_m = m_arr[..., :3].astype(np.int16)
    gold_m = is_gold_arr(m_arr)
    # Keep the darker gold P inside the square; drop wordmark that snuck in.
    lum = 0.299 * rgb_m[..., 0] + 0.587 * rgb_m[..., 1] + 0.114 * rgb_m[..., 2]
    sat = rgb_m.max(axis=2) - rgb_m.min(axis=2)
    white = (lum > 140) & (sat < 95)
    keep = (gold_m | ((lum < 120) & (sat > 8) & ~white)) & (m_arr[..., 3] > 0)
    # Restrict keep to the filled gold square so leftover type cannot survive.
    icon_solid = fill_holes(morph_close(gold_m, 1))
    keep = (keep | icon_solid) & dilate(icon_solid, 2)
    m_arr[..., 3] = np.where(keep, m_arr[..., 3], 0)
    mark = Image.fromarray(m_arr)
    side = max(mark.size) + 4
    mark_sq = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    mark_sq.paste(
        mark, ((side - mark.width) // 2, (side - mark.height) // 2), mark
    )
    return fringe_aa(mark_sq)


def preview_sheet(lockup: Image.Image, mark: Image.Image) -> None:
    dest = ROOT / "scripts" / "logo-preview.png"
    panels = [
        ("#000000", "black"),
        ("#171715", "ink"),
        ("#143234", "tide"),
        ("#f7f4ee", "ivory (chrome must stay dark)"),
        ("#ffffff", "white (chrome must stay dark)"),
        ("#2a2926", "ink-soft"),
    ]
    cell_w, cell_h = 520, 180
    sheet = Image.new("RGB", (cell_w * 3, cell_h * 2), (255, 255, 255))
    draw = ImageDraw.Draw(sheet)
    for i, (bg, _label) in enumerate(panels):
        x = (i % 3) * cell_w
        y = (i // 3) * cell_h
        draw.rectangle((x, y, x + cell_w, y + cell_h), fill=bg)
        fitted = lockup.copy()
        fitted.thumbnail((460, 88), Image.Resampling.LANCZOS)
        px = x + (cell_w - fitted.width) // 2
        py = y + (cell_h - fitted.height) // 2
        sheet.paste(fitted, (px, py), fitted)
    extra = Image.new("RGB", (cell_w * 3, 160), (0, 0, 0))
    extra_draw = ImageDraw.Draw(extra)
    extra_draw.rectangle((0, 0, 520, 160), fill=(247, 244, 238))
    extra_draw.rectangle((520, 0, 1040, 160), fill=(0, 0, 0))
    extra_draw.rectangle((1040, 0, 1560, 160), fill=(20, 50, 52))
    m = mark.copy()
    m.thumbnail((88, 88), Image.Resampling.LANCZOS)
    for ox in (216, 736, 1256):
        extra.paste(m, (ox, 36), m)
    out = Image.new("RGB", (sheet.width, sheet.height + extra.height), (255, 255, 255))
    out.paste(sheet, (0, 0))
    out.paste(extra, (0, sheet.height))
    out.save(dest, "PNG")
    print("  preview", dest)


def delete_legacy() -> None:
    for name in (
        "logo-on-dark.png",
        "logo-on-dark.webp",
        "logo-on-light.png",
        "logo-on-light.webp",
        "mark.png",
        "mark.webp",
        "pacific-properties-logo-dark.png",
        "pacific-properties-logo-dark.svg",
        "pacific-properties-logo-light.png",
        "pacific-properties-logo-light.svg",
    ):
        p = BRAND / name
        if p.exists():
            p.unlink()
            print("  removed", name)


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    print("Loading", SOURCE)
    rgb = load_rgb()
    mx0, my0, mx1, my1 = mark_bbox(rgb)
    print(f"Icon bbox {mx0},{my0} → {mx1},{my1}")

    rgba = knockout_black(rgb, mx0, my0, mx1, my1)
    rgba = scrub_field(rgba)
    lockup = fringe_aa(crop_padded(rgba, pad=12))
    save_png(lockup, BRAND / "pacific-properties-logo.png")

    mark = extract_mark(lockup)
    save_png(mark, BRAND / "pacific-properties-mark.png")

    print("Writing SVG…")
    write_svg_from_png(
        BRAND / "pacific-properties-logo.png",
        BRAND / "pacific-properties-logo.svg",
        "Pacific Properties",
    )
    write_svg_from_png(
        BRAND / "pacific-properties-mark.png",
        BRAND / "pacific-properties-mark.svg",
        "Pacific Properties",
    )

    on_black(mark, 192).save(APP / "icon.png", "PNG", optimize=True)
    on_black(mark, 180).save(APP / "apple-icon.png", "PNG", optimize=True)
    print("  app/icon.png 192  app/apple-icon.png 180")

    og = Image.new("RGB", (1200, 630), BLACK)
    logo = lockup.copy()
    logo.thumbnail((980, 180), Image.Resampling.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2), logo)
    og.save(PUBLIC / "og.jpg", "JPEG", quality=92, optimize=True)
    print("  public/og.jpg", og.size)

    share = Image.new("RGB", (lockup.width + 64, lockup.height + 48), BLACK)
    share.paste(lockup, (32, 24), lockup)
    share.save(BRAND / "pacific-properties-logo-share.png", "PNG", optimize=True)
    print("  pacific-properties-logo-share.png", share.size)

    preview_sheet(lockup, mark)
    delete_legacy()

    arr = np.array(lockup)
    a = arr[..., 3]
    print(
        "lockup",
        lockup.size,
        "ratio",
        round(lockup.size[0] / lockup.size[1], 4),
        "mark",
        mark.size,
        "corners",
        tuple(int(x) for x in arr[0, 0]),
        tuple(int(x) for x in arr[0, -1]),
        tuple(int(x) for x in arr[-1, 0]),
        tuple(int(x) for x in arr[-1, -1]),
    )
    print(
        "semi-alpha",
        int(((a > 0) & (a < 255)).sum()),
        "fully transparent",
        int((a == 0).sum()),
    )


if __name__ == "__main__":
    main()
