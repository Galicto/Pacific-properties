#!/usr/bin/env python3
"""Encode licensed hero films to web MP4/WebM and posters."""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FFMPEG = Path.home() / "Library/Python/3.9/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
SRC = ROOT / "media/originals/hero"
OUT = ROOT / "public/videos"
POSTER = ROOT / "public/videos"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd[-8:]))
    subprocess.run(cmd, check=True)


def ffmpeg(*args: str) -> None:
    run([str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", *args])


def curl(url: str, dest: Path) -> None:
    if dest.exists() and dest.stat().st_size > 1_000_000:
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    run(
        [
            "/usr/bin/curl",
            "-L",
            "--fail",
            "-A",
            UA,
            "-e",
            "https://mixkit.co/",
            "-o",
            str(dest),
            url,
        ]
    )


def encode_mp4(src: str, dest: Path, vf: str, duration: str | None = None) -> None:
    args = ["-i", src]
    if duration:
        args = ["-t", duration, *args]
    ffmpeg(
        *args,
        "-vf",
        vf,
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "26",
        "-maxrate",
        "4M",
        "-bufsize",
        "8M",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(dest),
    )


def encode_webm(mp4: Path, dest: Path, bitrate: str | None = None) -> None:
    args = ["-i", str(mp4), "-an", "-c:v", "libvpx-vp9"]
    if bitrate:
        args += ["-b:v", bitrate, "-minrate", "1.2M", "-maxrate", "2.8M", "-deadline", "good", "-cpu-used", "2"]
    else:
        args += ["-b:v", "0", "-crf", "34", "-speed", "2"]
    ffmpeg(
        *args,
        "-row-mt",
        "1",
        "-pix_fmt",
        "yuv420p",
        str(dest),
    )


def poster(src: str, dest: Path, vf: str, seek: str = "00:00:02.5") -> None:
    ffmpeg("-ss", seek, "-i", src, "-vf", vf, "-frames:v", "1", "-q:v", "2", str(dest.with_suffix(".jpg")))
    ffmpeg(
        "-i",
        str(dest.with_suffix(".jpg")),
        "-vf",
        "format=yuv420p",
        "-c:v",
        "libwebp",
        "-quality",
        "78",
        str(dest),
    )
    dest.with_suffix(".jpg").unlink(missing_ok=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    POSTER.mkdir(parents=True, exist_ok=True)
    candidates = SRC / ".candidates"

    coast = SRC / "coast-1573-1080.mp4"
    if not coast.exists():
        src = candidates / "1573-1080.mp4"
        if src.exists():
            coast.write_bytes(src.read_bytes())
        else:
            curl("https://assets.mixkit.co/videos/1573/1573-1080.mp4", coast)

    coast_vf = (
        "scale=1920:1080:flags=lanczos,"
        "eq=saturation=1.06:gamma=1.02:contrast=1.03,"
        "format=yuv420p"
    )
    coast_mobile_vf = (
        "scale=1280:720:flags=lanczos,"
        "eq=saturation=1.06:gamma=1.02:contrast=1.03,"
        "format=yuv420p"
    )
    encode_mp4(str(coast), OUT / "goa-waves.mp4", coast_vf, duration="12.2")
    encode_mp4(str(coast), OUT / "goa-waves-mobile.mp4", coast_mobile_vf, duration="12.2")
    encode_webm(OUT / "goa-waves.mp4", OUT / "goa-waves.webm", bitrate="2.2M")
    poster(str(OUT / "goa-waves.mp4"), POSTER / "goa-waves-poster.webp", "scale=1920:1080:flags=lanczos")
    poster(
        str(OUT / "goa-waves.mp4"),
        POSTER / "goa-waves-poster-mobile.webp",
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
        seek="00:00:03",
    )

    lanes = SRC / "lanes-2592-1080.mp4"
    if not lanes.exists():
        src = candidates / "2592-1080.mp4"
        if src.exists():
            lanes.write_bytes(src.read_bytes())
        else:
            curl("https://assets.mixkit.co/videos/2592/2592-1080.mp4", lanes)

    # Slight zoom crops overhead wires while keeping façades and the lane.
    lanes_vf = (
        "scale=2880:1620:flags=lanczos,"
        "crop=1920:1080:480:540,"
        "eq=saturation=1.04:gamma=1.02:contrast=1.03,"
        "format=yuv420p"
    )
    lanes_mobile_vf = (
        "scale=1920:1080:flags=lanczos,"
        "crop=1280:720:320:360,"
        "eq=saturation=1.04:gamma=1.02:contrast=1.03,"
        "format=yuv420p"
    )
    encode_mp4(str(lanes), OUT / "goa-lanes.mp4", lanes_vf)
    encode_mp4(str(lanes), OUT / "goa-lanes-mobile.mp4", lanes_mobile_vf)
    encode_webm(OUT / "goa-lanes.mp4", OUT / "goa-lanes.webm")
    poster(str(OUT / "goa-lanes.mp4"), POSTER / "goa-lanes-poster.webp", "scale=1920:1080:flags=lanczos", seek="00:00:02")
    poster(
        str(OUT / "goa-lanes.mp4"),
        POSTER / "goa-lanes-poster-mobile.webp",
        "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920",
        seek="00:00:02",
    )

    for path in sorted(OUT.glob("*")):
        print(f"{path.stat().st_size / 1024 / 1024:.2f} MB  {path.name}")


if __name__ == "__main__":
    main()
