import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import PublicationsPage from './PublicationsPage.jsx';
import { publications } from '../data/publications.js';
import { formatApa } from '../lib/citation.js';

const card = (id) => document.getElementById(id);

const mockClipboard = (writeText) => {
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
};

afterEach(() => {
  delete navigator.clipboard;
  vi.restoreAllMocks();
});

describe('PublicationsPage', () => {
  it('has one h1 and a card for every publication', () => {
    render(<PublicationsPage />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/Publications,\s*in full\./);
    publications.forEach((p) => {
      expect(within(card(p.id)).getByRole('heading', { level: 3 }).textContent).toBe(p.title);
    });
  });

  it('groups papers into journal articles and conference papers', () => {
    render(<PublicationsPage />);
    const groups = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(groups).toEqual(['Journal articles', 'Conference papers']);
  });

  it('links the published version, the free PDF, and the data', () => {
    render(<PublicationsPage />);
    const vine = within(card('njeru2026vine'));
    expect(vine.getByRole('link', { name: /Published version/ })).toHaveAttribute(
      'href',
      'https://doi.org/10.1108/VJIKMS-03-2026-0132'
    );
    expect(vine.getByRole('link', { name: /Free PDF/ })).toHaveAttribute(
      'href',
      '/papers/njeru2026marketdatagovernance_AAM.pdf'
    );
    expect(vine.getByRole('link', { name: /Data and code/ })).toHaveAttribute(
      'href',
      'https://doi.org/10.5281/zenodo.22734804'
    );
    expect(vine.getByText(/accepted manuscript, shared under a CC BY-NC 4.0 license/)).toBeInTheDocument();
  });

  it('highlights the site owner in every author list', () => {
    render(<PublicationsPage />);
    const owners = document.querySelectorAll('.pub-self');
    expect(owners).toHaveLength(publications.length);
    owners.forEach((el) => expect(el.textContent).toBe('Oliver Njeru'));
  });

  it('collapses long author lists right after the site owner', () => {
    render(<PublicationsPage />);
    const spark = within(card('kwon2024spark'));
    expect(spark.getByText('Show all 23 authors')).toBeInTheDocument();
    const visible = card('kwon2024spark').querySelector('.pub-authors').firstChild.textContent;
    expect(visible).toBe('Bum Chul Kwon');
  });

  it('shows the APA citation for each paper', () => {
    render(<PublicationsPage />);
    publications.forEach((p) => {
      expect(card(p.id).querySelector('.pub-cite__text').textContent).toBe(formatApa(p).text);
    });
  });

  it('copies the plain-text citation', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    render(<PublicationsPage />);
    const vine = within(card('njeru2026vine'));
    await act(async () => {
      fireEvent.click(vine.getByRole('button', { name: 'Copy' }));
    });
    expect(writeText).toHaveBeenCalledWith(formatApa(publications[0]).text);
    expect(vine.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('says so, and selects the text, when copying fails', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('Permission denied')));
    render(<PublicationsPage />);
    const vine = within(card('njeru2026vine'));
    await act(async () => {
      fireEvent.click(vine.getByRole('button', { name: 'Copy' }));
    });
    expect(vine.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument();
    expect(vine.getByText(/Couldn't copy automatically/)).toBeInTheDocument();
    expect(window.getSelection().toString()).toBe(formatApa(publications[0]).text);
  });

  it('falls back the same way when the Clipboard API is missing', async () => {
    render(<PublicationsPage />);
    const dbapi = within(card('okanda2024dbapi'));
    await act(async () => {
      fireEvent.click(dbapi.getByRole('button', { name: 'Copy' }));
    });
    expect(dbapi.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument();
  });
});
