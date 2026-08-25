#!/usr/bin/env python3
"""Copy client stills into originals + public WebP delivery paths.

Marketing posters stay out of public/. Construction stills 49–51 go to
unassigned-construction until the client confirms the site.
"""

from __future__ import annotations

import re
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    "/Users/rajaryan/.cursor/projects/Users-rajaryan-Desktop-Pacific-Properties/assets"
)
ORIGINALS = ROOT / "media" / "originals"
PUBLIC = ROOT / "public" / "properties"
MAX_EDGE = 1920
WEBP_QUALITY = 82

POSTERS = {12, 13, 48, 52, 57, 63, 64, 65, 66}
UNASSIGNED_CONSTRUCTION = {49, 50, 51}

ALDONA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
# 15 is the same bathroom as 47; 35 is the same suite as 36.
PILERNE = [
    26,
    14,
    23,
    17,
    18,
    19,
    20,
    21,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    24,
    25,
    27,
    28,
    29,
    30,
    31,
    32,
    47,
    16,
    33,
    34,
    45,
    46,
    22,
    37,
    36,
]
VERNA = [58, 55, 56, 59, 60, 61, 62]
REIS_MAGOS = [53, 54]

NUM_RE = re.compile(r"__(\d+)_")


def index_sources() -> tuple[dict[int, Path], Path]:
    by_num: dict[int, Path] = {}
    unnumbered: Path | None = None
    for path in ASSETS.glob("WhatsApp_Image_2026-08-25_at_17.17.55*.jpg"):
        match = NUM_RE.search(path.name)
        if match:
            by_num[int(match.group(1))] = path
        else:
            unnumbered = path
    if unnumbered is None:
        raise SystemExit("Missing unnumbered Aldona hero still.")
    missing = [
        n
        for n in range(1, 67)
        if n not in by_num
    ]
    if missing:
        raise SystemExit(f"Missing WhatsApp stills: {missing}")
    return by_num, unnumbered


def ensure_dir(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def write_webp(src: Path, dest: Path) -> None:
    with Image.open(src) as image:
        rgb = ImageOps.exif_transpose(image).convert("RGB")
        rgb.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        rgb.save(dest, "WEBP", quality=WEBP_QUALITY, method=6)


def copy_original(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def publish(src: Path, slug: str, stem: str) -> None:
    copy_original(src, ORIGINALS / "properties" / slug / f"{stem}.jpg")
    write_webp(src, PUBLIC / slug / f"{stem}.webp")


def make_texture(path: Path, variant: str) -> None:
    width, height = 1600, 1200
    if variant == "land":
        top, bottom = (214, 210, 196), (90, 108, 86)
    elif variant == "plans":
        top, bottom = (232, 226, 214), (116, 108, 92)
    else:
        top, bottom = (247, 244, 238), (20, 50, 52)

    image = Image.new("RGB", (width, height), top)
    pixels = image.load()
    for y in range(height):
        t = y / (height - 1)
        r = int(top[0] * (1 - t) + bottom[0] * t)
        g = int(top[1] * (1 - t) + bottom[1] * t)
        b = int(top[2] * (1 - t) + bottom[2] * t)
        for x in range(width):
            n = ((x * 17 + y * 31) ^ (x * y)) & 31
            pixels[x, y] = (
                max(0, min(255, r + n - 16)),
                max(0, min(255, g + n - 18)),
                max(0, min(255, b + n - 14)),
            )

    overlay = Image.new("RGB", (width, height), (116, 94, 44))
    mask = Image.new("L", (width, height), 0)
    draw = ImageDraw.Draw(mask)
    for i in range(9):
        x = 80 + i * 170
        draw.ellipse((x, 180 + (i % 3) * 40, x + 420, 980 - (i % 2) * 60), fill=28 + i * 4)
    image = Image.composite(overlay, image, mask.filter(ImageFilter.GaussianBlur(80)))
    image = ImageEnhance.Color(image).enhance(0.55)
    image = ImageEnhance.Contrast(image).enhance(1.08)
    image = image.filter(ImageFilter.SMOOTH_MORE)
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, "WEBP", quality=78, method=6)
    jpg = ORIGINALS / "fallbacks" / path.with_suffix(".jpg").name
    jpg.parent.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(jpg, "JPEG", quality=88)


def main() -> None:
    by_num, hero = index_sources()

    for folder in (
        ORIGINALS / "properties",
        ORIGINALS / "posters",
        ORIGINALS / "unassigned-construction",
        ORIGINALS / "fallbacks",
        PUBLIC,
        PUBLIC / "unassigned-construction",
        PUBLIC / "_fallbacks",
    ):
        ensure_dir(folder)

    for number in POSTERS:
        copy_original(by_num[number], ORIGINALS / "posters" / f"{number:02d}.jpg")

    for number in UNASSIGNED_CONSTRUCTION:
        src = by_num[number]
        copy_original(src, ORIGINALS / "unassigned-construction" / f"{number}.jpg")
        write_webp(src, PUBLIC / "unassigned-construction" / f"{number}.webp")

    publish(hero, "aldona-twin-villas", "hero")
    for number in ALDONA:
        publish(by_num[number], "aldona-twin-villas", f"{number:02d}")

    for number in PILERNE:
        stem = "hero" if number == 26 else f"{number:02d}"
        publish(by_num[number], "pilerne-villa-collection", stem)

    for number in VERNA:
        stem = "hero" if number == 58 else f"{number:02d}"
        publish(by_num[number], "verna-warehouse", stem)

    for number in REIS_MAGOS:
        publish(by_num[number], "reis-magos-villas", f"{number:02d}")

    make_texture(PUBLIC / "_fallbacks" / "preview.webp", "villa")
    make_texture(PUBLIC / "_fallbacks" / "land.webp", "land")
    make_texture(PUBLIC / "_fallbacks" / "plans.webp", "plans")

    note = PUBLIC / "unassigned-construction" / "NOTES.txt"
    note.write_text(
        "Needs client confirmation: possibly Saipem or another development.\n"
        "Do not attach these stills to a public listing until visually matched.\n"
        "Source WhatsApp numbers: 49, 50, 51.\n",
        encoding="utf-8",
    )
    print("Property media processed.")


if __name__ == "__main__":
    main()
