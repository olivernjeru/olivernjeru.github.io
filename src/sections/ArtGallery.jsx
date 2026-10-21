import React, { useState } from "react";
import { SectionHeader, Style } from "../components/primitives.jsx";
import Lightbox from "../components/Lightbox.jsx";
import { imageList } from "../data/artGallery";
import { galleryThumbs } from "../data/galleryThumbs.js";
import { gallerySizes, srcSet } from "../lib/images.js";

// Wide (2:1) tiles at positions 3 and 6 of every 8; the rest are square.
// Changing this pattern or the grid CSS means updating gallerySizes() too.
const SPANS = [1, 1, 2, 1, 1, 2, 1, 1];

// Tiles show WebP thumbnails; the lightbox shows the untouched original.
// Throws rather than silently showing a 4 MB original in a small tile.
const thumbsFor = (img) => {
  const thumbs = galleryThumbs[img];
  if (!thumbs) {
    throw new Error(`No thumbnails for ${img} in src/data/galleryThumbs.js`);
  }
  return thumbs;
};

const NowShowing = ({ item, onOpen, onClear }) => {
  if (!item) return null;
  return (
    <aside
      aria-live="polite"
      style={{
        marginTop: 22,
        border: "1px solid var(--hair)",
        background: "var(--bg-card)",
        padding: "18px 22px",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 18,
        alignItems: "center",
      }}
      className="now-showing"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title} at full size`}
        style={{
          width: 64,
          height: 64,
          padding: 0,
          border: "1px solid var(--hair)",
          background: "var(--bg-inverse)",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <img
          src={thumbsFor(item.img).variants[0].src}
          alt={item.title}
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </button>

      <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
        <div className="kicker kicker--accent">Now showing</div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: -0.2,
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title}
        </div>
        <div
          className="italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: 14.5,
            color: "var(--muted)",
            lineHeight: 1.45,
          }}
        >
          {item.description}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        aria-label="Clear"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: 0.6,
          color: "var(--muted)",
          textTransform: "uppercase",
          background: "transparent",
          border: "1px solid var(--hair)",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>

      <Style css={`
        @media (max-width: 720px) {
          .now-showing { grid-template-columns: auto 1fr !important; }
          .now-showing > button:last-child { grid-column: 1 / -1; justify-self: end; }
        }
      `} />
    </aside>
  );
};

export default function ArtGallery() {
  const [active, setActive] = useState(null);     // persists after lightbox close
  const [lightbox, setLightbox] = useState(null); // controls modal

  const onTileClick = (item) => {
    setActive(item);
    setLightbox(item);
  };

  return (
    <section id="gallery" className="section">
      <SectionHeader
        kicker="A million views"
        title="Photography,"
        italic="quietly cataloged"
        hint="A selection from the Unsplash room. Twenty-something titles, four thousand uses, one stubborn habit. Tap any tile — the caption settles below."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
        className="gallery-grid"
      >
        {imageList.map((item, idx) => {
          const span = SPANS[idx % SPANS.length];
          const isActive = active && active.img === item.img;
          const thumbs = thumbsFor(item.img);
          return (
            <button
              key={idx}
              onClick={() => onTileClick(item)}
              aria-label={`Open ${item.title}`}
              style={{
                gridColumn: `span ${span}`,
                padding: 0,
                border: `1px solid ${isActive ? "var(--accent)" : "var(--hair)"}`,
                outline: isActive ? "1px solid var(--accent)" : "none",
                outlineOffset: -2,
                background: "var(--bg-inverse)",
                cursor: "pointer",
                position: "relative",
                aspectRatio: span === 2 ? "2 / 1" : "1 / 1",
                overflow: "hidden",
              }}
              className="gallery-tile"
            >
              <img
                src={thumbs.variants[0].src}
                srcSet={srcSet(thumbs.variants)}
                sizes={gallerySizes(thumbs, span)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(0.05)",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 50%, rgba(22,20,15,0.62) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: 1.4,
                  color: "#f4efe5",
                  textTransform: "uppercase",
                  opacity: 0.85,
                }}
              >
                Photograph
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  bottom: 12,
                  color: "#f4efe5",
                  textAlign: "left",
                }}
              >
                <div style={{ fontFamily: "var(--font-serif)", fontSize: 18, fontWeight: 500 }}>
                  {item.title}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <NowShowing
        item={active}
        onOpen={() => active && setLightbox(active)}
        onClear={() => setActive(null)}
      />

      <Lightbox
        open={!!lightbox}
        onClose={() => setLightbox(null)}
        src={lightbox?.img}
        alt={lightbox?.title}
        title={lightbox?.title}
      />

      <Style css={`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .gallery-tile { grid-column: span 1 !important; aspect-ratio: 1 / 1 !important; }
        }
      `} />
    </section>
  );
}
