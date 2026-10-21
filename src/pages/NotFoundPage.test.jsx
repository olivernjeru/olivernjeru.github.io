import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage.jsx';

const visit = (path) => window.history.pushState({}, '', path);

afterEach(() => {
  visit('/');
});

describe('NotFoundPage', () => {
  it('names the missing address', async () => {
    visit('/no/such%20page');
    render(<NotFoundPage />);
    expect(await screen.findByText('/no/such page')).toBeInTheDocument();
  });

  it('stays generic when /404.html is opened directly', () => {
    visit('/404.html');
    render(<NotFoundPage />);
    expect(screen.getByText(/this address/)).toBeInTheDocument();
  });

  it('shows a malformed address as typed instead of crashing', async () => {
    visit('/bad%E0%A4%A');
    render(<NotFoundPage />);
    expect(await screen.findByText('/bad%E0%A4%A')).toBeInTheDocument();
  });

  it('offers a way back home', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(/Wrong\s*door\./);
    expect(screen.getByRole('link', { name: /Back to the lounge/ })).toHaveAttribute('href', '/');
  });
});
