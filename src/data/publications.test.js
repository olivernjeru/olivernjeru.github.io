import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { publications, SELF } from './publications.js';
import { formatDate } from '../lib/format.js';

// Not `new URL(dir, import.meta.url)`: Vite rewrites that pattern into a
// dev-server asset URL, even under Vitest.
const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public');
const TYPES = new Set(['journal', 'conference']);
const LINK_KINDS = new Set(['published', 'manuscript', 'pdf', 'data']);

describe('publications data', () => {
  it('has unique ids', () => {
    const ids = publications.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('is ordered newest first', () => {
    const dates = publications.map((p) => p.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it.each(publications.map((p) => [p.id, p]))('%s has every field the pages need', (_, p) => {
    expect(TYPES.has(p.type)).toBe(true);
    expect(p.title).toBeTruthy();
    expect(p.venue).toBeTruthy();
    expect(p.venueShort).toBeTruthy();
    expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(() => formatDate(p.date)).not.toThrow();
    if (p.type === 'conference') expect(p.container).toBeTruthy();
    if (p.doi) expect(p.doi).toMatch(/^10\.\d{4,9}\/\S+$/);
    else expect(p.url).toMatch(/^https?:\/\//);
  });

  it.each(publications.map((p) => [p.id, p]))('%s lists the site owner as an author', (_, p) => {
    expect(p.authors).toContainEqual(SELF);
    p.authors.forEach((a) => {
      expect(a.given.trim()).toBe(a.given);
      expect(a.family.trim()).toBe(a.family);
    });
  });

  // apaTitle is hand-written sentence case; it must be the same words as the title.
  it.each(publications.map((p) => [p.id, p]))('%s has an APA title matching its title', (_, p) => {
    expect(p.apaTitle.toLowerCase()).toBe(p.title.toLowerCase());
  });

  it.each(publications.map((p) => [p.id, p]))('%s has valid links', (_, p) => {
    expect(p.links.length).toBeGreaterThan(0);
    p.links.forEach((l) => {
      expect(LINK_KINDS.has(l.kind)).toBe(true);
      expect(l.label).toBeTruthy();
      expect(l.href).toMatch(/^(https?:\/\/|\/)/);
    });
  });

  it('serves every self-hosted PDF from public/', () => {
    const local = publications.flatMap((p) => p.links).filter((l) => l.href.startsWith('/'));
    expect(local.length).toBeGreaterThan(0);
    local.forEach((l) => {
      expect(fs.existsSync(path.join(PUBLIC_DIR, l.href)), l.href).toBe(true);
    });
  });
});
