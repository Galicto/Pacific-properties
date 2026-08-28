#!/usr/bin/env python3
"""Extract Guirim heritage villa stills from the private brochure PDF.

Builder branding, cover/footer bands, floor plans and contact pages are
cropped out. Public assets use neutral filenames only.
"""

from __future__ import annotations

import shutil
from pathlib import Path

import fitz
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
WA = Path("/Users/rajaryan/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents")
BROCHURE = WA / "ED1B8FEE-6240-43C1-A87E-C210A369CE92/CASA FELIZ - Brochure 2026.pdf"
ORIGINALS = ROOT / "media" / "originals" / "properties" / "heritage-villa-guirim"
PUBLIC = ROOT / "public" / "properties" / "heritage-villa-guirim"
DPI = 300
MAX_EDGE = 1920
WEBP_QUALITY = 84


def render(doc: fitz.Document, page_index: int) -> Image.Image:
    page = doc.load_page(page_index)
    pix = page.get_pixmap(matrix=fitz.Matrix(DPI / 72, DPI / 72), alpha=False)
    return Image.frombytes("RGB", (pix.width, pix.height), pix.samples)


def trim_label(img: Image.Image, bottom: float = 0.14, sides: float = 0.03) -> Image.Image:
    w, h = img.size
    return img.crop((int(w * sides), 0, int(w * (1 - sides)), int(h * (1 - bottom))))


def publish(img: Image.Image, stem: str, *, trim: bool = True) -> None:
    out = ImageOps.exif_transpose(img).convert("RGB")
    if trim:
        out = trim_label(out)
    out.thumbnail((MAX_EDGE, MAX_EDGE), Image.Resampling.LANCZOS)
    ORIGINALS.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    out.save(ORIGINALS / f"{stem}.jpg", "JPEG", quality=92)
    out.save(PUBLIC / f"{stem}.webp", "WEBP", quality=WEBP_QUALITY, method=6)


def main() -> None:
    if not BROCHURE.exists():
        raise SystemExit(f"Missing brochure: {BROCHURE}")

    archive = ORIGINALS / "brochure-source.pdf"
    archive.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(BROCHURE, archive)

    doc = fitz.open(BROCHURE)

    p1 = render(doc, 0)
    w, h = p1.size
    publish(p1.crop((0, 0, w, int(h * 0.82))), "01-exterior", trim=False)

    p2 = render(doc, 1)
    w, h = p2.size
    left = int(w * 0.38)
    photos = p2.crop((left, int(h * 0.08), w - int(w * 0.03), int(h * 0.92)))
    pw, ph = photos.size
    row_h = int(ph * 0.42)
    col_w = pw // 3
    publish(photos.crop((0, row_h, pw, ph)), "02-pool")
    for i, name in enumerate(["02-bedroom", "02-verandah", "02-washroom"]):
        publish(photos.crop((i * col_w, 0, (i + 1) * col_w, row_h)), name)

    p6 = render(doc, 5)
    w, h = p6.size
    grid = p6.crop((int(w * 0.03), int(h * 0.06), int(w * 0.68), int(h * 0.94)))
    gw, gh = grid.size
    cols, rows = 3, 4
    cw, ch = gw // cols, gh // rows
    labels = [
        "06-staircase",
        "06-bedroom-2",
        "06-entertainment",
        "06-bedroom-3",
        "06-washroom-2",
        "06-foyer",
        "06-living",
        "06-kitchen",
        "06-dining",
        "06-servants-quarters",
    ]
    for idx, label in enumerate(labels):
        r, c = divmod(idx, cols)
        publish(grid.crop((c * cw, r * ch, (c + 1) * cw, (r + 1) * ch)), label)

    doc.close()
    print(f"Guirim media published to {PUBLIC}")


if __name__ == "__main__":
    main()
