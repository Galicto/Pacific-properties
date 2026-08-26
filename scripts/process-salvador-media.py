#!/usr/bin/env python3
"""Process Salvador listing stills and credential certificate previews.

Source brochure filenames stay out of public/. Public paths use only
neutral Salvador / credential names.
"""

from __future__ import annotations

import shutil
from pathlib import Path

import fitz
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(
    "/Users/rajaryan/.cursor/projects/Users-rajaryan-Desktop-Pacific-Properties/assets"
)
WA = Path("/Users/rajaryan/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents")
ORIGINALS = ROOT / "media" / "originals"
REVIEW = ROOT / "media" / "review" / "salvador"
PUBLIC_PROPS = ROOT / "public" / "properties"
PUBLIC_CRED = ROOT / "public" / "credentials"
MAX_EDGE = 1920
PLAN_EDGE = 2400
CERT_EDGE = 2000
WEBP_QUALITY = 82
CERT_QUALITY = 88

PHOTOS = {
    "site-plan": ASSETS
    / "PHOTO-2026-08-26-16-02-53-cdc8d0fa-0fa6-4086-a11d-f9b755025d97.jpg",
    "master-plan": ASSETS
    / "PHOTO-2026-08-26-16-02-53-cf63d3c3-70fa-4ed7-bd2e-1ee086000919.jpg",
    "apartment-render": ASSETS
    / "PHOTO-2026-08-26-16-02-52-bcd5a23f-9e8e-40b8-a0bd-12157c73a219.jpg",
}

CERTS = {
    "nar-india": WA
    / "C407DD1D-4123-4862-8AB4-3CA3441AA229/NAR certificate .pdf",
    "trademark": WA
    / "16B11F43-2EA2-4A30-A9A8-E6884A729BC2/Trademark certificate .pdf",
    "rera-agent": WA
    / "FF2E68CC-F11A-4740-A2A8-DE2AA397F28B/Arshad Khawaja Rera .pdf",
    "goa-association-of-realtors": WA
    / "C8E520DE-F547-47F2-9945-EDDBB8F03589/Arshad Khawaja.pdf",
}

BROCHURES = {
    "oddavell": WA
    / "A3DD4303-3CA9-4E0F-821B-4337D50906B7/MODELS ODDAVELL - Brochure 2026.pdf",
    "morii": WA
    / "E5B29B31-4AC4-4533-BB41-F00CEA4CDB11/Morii Brochure_2026.pdf",
    "morii-plans": WA
    / "B9A1E7C5-290C-437C-B0F7-B8FF17742831/Morii Plans.pdf",
    "bc-block": WA
    / "07EFDB5E-A64A-417C-BAFD-7F968742B234/B & C block (1).pdf",
    "nesara": WA
    / "36A49019-8D7C-45AD-9DFB-019536F6F840/Nesara.pdf",
}


def ensure(path: Path) -> Path:
    path.mkdir(parents=True, exist_ok=True)
    return path


def write_webp(image: Image.Image, dest: Path, max_edge: int, quality: int) -> None:
    rgb = ImageOps.exif_transpose(image).convert("RGB")
    rgb.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    rgb.save(dest, "WEBP", quality=quality, method=6)


def publish_photo(src: Path, slug: str, stem: str, max_edge: int = MAX_EDGE) -> None:
    copy = ORIGINALS / "properties" / slug / f"{stem}.jpg"
    copy.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, copy)
    with Image.open(src) as image:
        write_webp(image, PUBLIC_PROPS / slug / f"{stem}.webp", max_edge, WEBP_QUALITY)


def pix_to_pil(pix: fitz.Pixmap) -> Image.Image:
    mode = "RGBA" if pix.alpha else "RGB"
    image = Image.frombytes(mode, (pix.width, pix.height), pix.samples)
    return image.convert("RGB")


def render_pdf_page(doc: fitz.Document, index: int, dpi: int = 160) -> Image.Image:
    page = doc.load_page(index)
    matrix = fitz.Matrix(dpi / 72, dpi / 72)
    pix = page.get_pixmap(matrix=matrix, alpha=False)
    return pix_to_pil(pix)


def extract_cert_text(name: str, src: Path) -> str:
    doc = fitz.open(src)
    parts = []
    for page in doc:
        parts.append(page.get_text("text"))
    doc.close()
    text = "\n".join(parts)
    out = ORIGINALS / "credentials" / f"{name}.txt"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(text, encoding="utf-8")
    return text


def publish_certificate(name: str, src: Path) -> None:
    dest_pdf = PUBLIC_CRED / f"{name}.pdf"
    dest_pdf.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest_pdf)
    shutil.copy2(src, ORIGINALS / "credentials" / f"{name}.pdf")

    doc = fitz.open(src)
    image = render_pdf_page(doc, 0, dpi=180)
    doc.close()
    write_webp(image, PUBLIC_CRED / f"{name}.webp", CERT_EDGE, CERT_QUALITY)
    preview = REVIEW / "certificates"
    ensure(preview)
    image.save(preview / f"{name}.jpg", "JPEG", quality=90)


def review_brochure(key: str, src: Path, max_pages: int = 12, dpi: int = 90) -> None:
    doc = fitz.open(src)
    folder = ensure(REVIEW / key)
    n = min(doc.page_count, max_pages)
    print(f"{key}: {doc.page_count} pages, rendering {n}")
    for i in range(n):
        image = render_pdf_page(doc, i, dpi=dpi)
        image.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
        image.save(folder / f"page-{i + 1:02d}.jpg", "JPEG", quality=78)
        text = doc.load_page(i).get_text("text").strip()
        if text:
            (folder / f"page-{i + 1:02d}.txt").write_text(text[:4000], encoding="utf-8")
    doc.close()


def main() -> None:
    ensure(ORIGINALS / "properties")
    ensure(ORIGINALS / "credentials")
    ensure(REVIEW)
    ensure(PUBLIC_CRED)

    for slug in (
        "3-bhk-apartments-salvador",
        "private-pool-villa-salvador-2803-sq-ft",
        "private-pool-villa-salvador-3317-sq-ft",
    ):
        ensure(PUBLIC_PROPS / slug)

    publish_photo(PHOTOS["apartment-render"], "3-bhk-apartments-salvador", "hero")
    publish_photo(
        PHOTOS["site-plan"], "3-bhk-apartments-salvador", "site-plan", max_edge=PLAN_EDGE
    )
    publish_photo(
        PHOTOS["master-plan"], "3-bhk-apartments-salvador", "master-plan", max_edge=PLAN_EDGE
    )

    # Site plan is shared context for the Salvador villas (same gated layout).
    publish_photo(
        PHOTOS["site-plan"],
        "private-pool-villa-salvador-2803-sq-ft",
        "site-plan",
        max_edge=PLAN_EDGE,
    )
    publish_photo(
        PHOTOS["site-plan"],
        "private-pool-villa-salvador-3317-sq-ft",
        "site-plan",
        max_edge=PLAN_EDGE,
    )

    print("=== CERTIFICATE TEXT ===")
    for name, src in CERTS.items():
        if not src.exists():
            raise SystemExit(f"Missing certificate: {src}")
        text = extract_cert_text(name, src)
        print(f"\n----- {name} -----")
        print(text[:2500])
        publish_certificate(name, src)

    # Brochures: review stills only. Do not copy named PDFs into public/.
    review_brochure("bc-block", BROCHURES["bc-block"], max_pages=8, dpi=140)
    review_brochure("morii", BROCHURES["morii"], max_pages=14, dpi=90)
    review_brochure("morii-plans", BROCHURES["morii-plans"], max_pages=10, dpi=90)
    review_brochure("nesara", BROCHURES["nesara"], max_pages=14, dpi=90)
    review_brochure("oddavell", BROCHURES["oddavell"], max_pages=8, dpi=72)

    print("Salvador media processed.")


if __name__ == "__main__":
    main()
