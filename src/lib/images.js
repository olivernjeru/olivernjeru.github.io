// Responsive images for the photo gallery. Algorithm and rationale: src/lib/README.md.

// [{ src, width }] -> "a.webp 640w, b.webp 1280w, ..."
export const srcSet = (variants) => variants.map((v) => `${v.src} ${v.width}w`).join(", ");

// object-fit: cover scales a photo until it fills its tile. A photo whose
// aspect ratio is wider than the tile's is therefore drawn wider than the tile,
// by (photo aspect / tile aspect); a narrower photo is drawn at tile width.
export const coverFactor = (width, height, tileAspect) => Math.max(1, width / height / tileAspect);

const round2 = (x) => Math.round(x * 100) / 100;

// `sizes` for a tile in src/sections/ArtGallery.jsx: the width the photo is
// actually drawn at, so the browser picks a file sharp enough for it.
// Grid geometry (must match ArtGallery.jsx and tokens.css):
//   > 900 px: 4 columns, 14 px gaps, inside min(100vw, 1240px) minus 2 x 56 px
//             padding; span-2 tiles are 2:1, the rest 1:1
//   <= 900 px: 2 columns, every tile 1:1; side padding 56 px, or 22 px <= 720 px
export const gallerySizes = ({ width, height }, span) => {
  const small = round2(coverFactor(width, height, 1));
  const large = round2(coverFactor(width, height, span === 2 ? 2 : 1));
  const largeTile =
    span === 2 ? "((min(100vw, 1240px) - 154px) / 2 + 14px)" : "((min(100vw, 1240px) - 154px) / 4)";
  return [
    `(max-width: 720px) calc(${small} * (100vw - 58px) / 2)`,
    `(max-width: 900px) calc(${small} * (100vw - 126px) / 2)`,
    `calc(${large} * ${largeTile})`,
  ].join(", ");
};
