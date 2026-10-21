import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act } from '@testing-library/react';
import { hydrateRoot } from 'react-dom/client';
import { PAGES, render } from './entry-server.jsx';
import { THEME_STORAGE_KEY } from './themeConfig.js';

// What the build does (scripts/prerender.mjs) followed by what the browser does
// (src/mount.jsx). A mismatch makes React discard the prerendered DOM and
// re-render the page, the layout shift this setup exists to prevent.
const hydrate = async (Page, html) => {
  const container = document.createElement('div');
  container.id = 'root';
  container.innerHTML = html;
  document.body.appendChild(container);
  const firstElement = container.firstElementChild;
  const errors = [];
  let root;
  await act(async () => {
    root = hydrateRoot(
      container,
      <React.StrictMode>
        <Page />
      </React.StrictMode>,
      { onRecoverableError: (error) => errors.push(error.message) }
    );
  });
  return {
    errors,
    keptDom: container.firstElementChild === firstElement,
    text: container.textContent,
    cleanup: () => {
      act(() => root.unmount());
      container.remove();
    },
  };
};

let cleanups = [];
afterEach(() => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  vi.useRealTimers();
  localStorage.clear();
});

describe.each(Object.entries(PAGES))('%s', (_, Page) => {
  it('hydrates the prerendered markup without a mismatch', async () => {
    const result = await hydrate(Page, render(Page));
    cleanups.push(result.cleanup);
    expect(result.errors).toEqual([]);
    expect(result.keptDom).toBe(true);
  });

  it('hydrates without a mismatch for a visitor who chose light mode', async () => {
    const html = render(Page);
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    const result = await hydrate(Page, html);
    cleanups.push(result.cleanup);
    expect(result.errors).toEqual([]);
  });

  it('hydrates without a mismatch in a later month than the build', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-12-15T12:00:00Z'));
    const html = render(Page);
    vi.setSystemTime(new Date('2027-03-15T12:00:00Z'));
    const result = await hydrate(Page, html);
    cleanups.push(result.cleanup);
    expect(result.errors).toEqual([]);
    expect(result.keptDom).toBe(true);
    // Date-dependent text was rendered in December 2026 and is current after hydration.
    expect(result.text).toContain('© 2020 – 2027');
  });
});

describe('index.html date-dependent text', () => {
  it('updates the month and the years of experience during hydration', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-12-15T12:00:00Z'));
    const html = render(PAGES['index.html']);
    expect(html).toContain('DEC 2026');
    expect(html).toContain('eight years of jobs');
    vi.setSystemTime(new Date('2027-03-15T12:00:00Z'));
    const result = await hydrate(PAGES['index.html'], html);
    cleanups.push(result.cleanup);
    expect(result.text).toContain('Nairobi · MAR 2027');
    expect(result.text).toContain('nine years of jobs');
  });
});
