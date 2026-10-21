import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { coverFactor, gallerySizes, srcSet } from './images.js';
import { galleryThumbs } from '../data/galleryThumbs.js';
import { imageList } from '../data/artGallery.js';

// Not `new URL(dir, import.meta.url)`: Vite rewrites that pattern into a
// dev-server asset URL, even under Vitest.
const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');

describe('coverFactor', () => {
  it('is 1 when the photo is no wider than its tile', () => {
    expect(coverFactor(3120, 4160, 1)).toBe(1); // portrait in a square tile
    expect(coverFactor(4160, 3120, 2)).toBe(1); // 4:3 in a 2:1 tile
  });

  it('grows with how much wider than the tile the photo is', () => {
    expect(coverFactor(4160, 3120, 1)).toBeCloseTo(4 / 3);
  });
});

describe('gallerySizes', () => {
  it('describes a portrait photo in a square tile at tile width', () => {
    expect(gallerySizes({ width: 3120, height: 4160 }, 1)).toBe(
      '(max-width: 720px) calc(1 * (100vw - 58px) / 2), ' +
        '(max-width: 900px) calc(1 * (100vw - 126px) / 2), ' +
        'calc(1 * ((min(100vw, 1240px) - 154px) / 4))'
    );
  });

  it('accounts for cover scaling of a landscape photo in a square tile', () => {
    expect(gallerySizes({ width: 4160, height: 3120 }, 1)).toContain('calc(1.33 * ((min(100vw, 1240px) - 154px) / 4))');
  });

  it('uses the two-column width for wide tiles on large screens', () => {
    expect(gallerySizes({ width: 4160, height: 3120 }, 2)).toContain(
      'calc(1 * ((min(100vw, 1240px) - 154px) / 2 + 14px))'
    );
  });
});

describe('srcSet', () => {
  it('lists every candidate with its width', () => {
    expect(srcSet([{ src: '/a.webp', width: 640 }, { src: '/b.jpg', width: 3120 }])).toBe(
      '/a.webp 640w, /b.jpg 3120w'
    );
  });
});

describe('gallery thumbnail manifest', () => {
  it('covers every photo in the gallery', () => {
    imageList.forEach((item) => expect(galleryThumbs[item.img], item.img).toBeDefined());
  });

  it.each(Object.entries(galleryThumbs))('%s has existing, ascending variants ending in the original', (img, t) => {
    const widths = t.variants.map((v) => v.width);
    expect(widths).toEqual([...widths].sort((a, b) => a - b));
    expect(t.variants.at(-1)).toEqual({ src: `/${encodeURI(img)}`, width: t.width });
    t.variants.forEach((v) => {
      expect(v.src.includes(' '), 'srcset URLs must not contain spaces').toBe(false);
      expect(fs.existsSync(path.join(PUBLIC_DIR, decodeURI(v.src))), v.src).toBe(true);
    });
  });
});
