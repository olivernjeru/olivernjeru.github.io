#!/usr/bin/env bash
# Compress and optimize MP4s under public/assets/academics/ for web delivery.
# Produces an H.264 MP4 and a WebM/VP9 sibling for each input, plus a poster image.
# Original files are kept; outputs are written next to them with a .web.mp4 / .webm / .poster.jpg suffix.
#
# Usage:
#   ./scripts/compress-videos.sh
#
# Requires: ffmpeg, ffprobe.

set -euo pipefail

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install it (e.g. 'sudo apt install ffmpeg' on Debian/Ubuntu)." >&2
  exit 1
fi

SRC_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/assets/academics"

if [ ! -d "$SRC_DIR" ]; then
  echo "Source dir not found: $SRC_DIR" >&2
  exit 1
fi

shopt -s nullglob
inputs=("$SRC_DIR"/*.mp4)

if [ ${#inputs[@]} -eq 0 ]; then
  echo "No .mp4 inputs in $SRC_DIR"
  exit 0
fi

for src in "${inputs[@]}"; do
  base="${src%.mp4}"
  # Skip files that are already compressed outputs.
  case "$base" in
    *.web) continue ;;
  esac

  mp4_out="${base}.web.mp4"
  webm_out="${base}.webm"
  poster_out="${base}.poster.jpg"

  echo ">> Encoding H.264 MP4: $mp4_out"
  ffmpeg -y -i "$src" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
    -movflags +faststart \
    -c:a aac -b:a 96k -ac 2 \
    "$mp4_out"

  echo ">> Encoding WebM (VP9): $webm_out"
  ffmpeg -y -i "$src" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 \
    -c:a libopus -b:a 96k \
    "$webm_out"

  echo ">> Generating poster: $poster_out"
  ffmpeg -y -ss 0.5 -i "$src" -frames:v 1 -vf "scale='min(1280,iw)':-2" -q:v 4 "$poster_out"

  echo ">> Sizes for $base:"
  ls -lh "$src" "$mp4_out" "$webm_out" "$poster_out" | awk '{print "   ", $5, $9}'
done

echo "Done. Reference the .web.mp4 (with .webm as a <source>) in your components and remove the original .mp4 once you've verified output quality."
