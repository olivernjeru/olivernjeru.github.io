import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { PROFILES } from './profiles.js';

// Not `new URL(file, import.meta.url)`: Vite rewrites that pattern into a
// dev-server asset URL, even under Vitest.
const indexHtml = fs.readFileSync(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../index.html'),
  'utf8'
);

describe('profile links', () => {
  it('match the JSON-LD "sameAs" list in index.html', () => {
    const block = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(block).not.toBeNull();
    const sameAs = JSON.parse(block[1]).sameAs;
    expect(new Set(sameAs)).toEqual(new Set(Object.values(PROFILES).map((p) => p.href)));
  });

  it('use https everywhere', () => {
    Object.values(PROFILES).forEach((p) => expect(p.href).toMatch(/^https:\/\//));
  });
});
