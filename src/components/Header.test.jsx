import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Header from './Header.jsx';
import { ThemeProvider } from '../theme.js';
import { THEME_STORAGE_KEY } from '../themeConfig.js';

afterEach(() => localStorage.clear());

// jsdom reports a 1024 px wide window, so the desktop nav renders.
const nav = () => within(screen.getByRole('navigation', { name: 'Primary' }));

describe('Header', () => {
  it('scrolls to sections in place on the home page', () => {
    render(<Header />);
    expect(nav().getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
    expect(nav().getByRole('link', { name: 'Publications' })).toHaveAttribute(
      'href',
      '/publications.html'
    );
    expect(nav().getByRole('link', { name: 'Publications' })).not.toHaveAttribute('aria-current');
  });

  // Hydration safety: the prerendered header cannot know the visitor's theme.
  it('renders the same markup whatever theme is saved', () => {
    const markupFor = (theme) => {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      const { container, unmount } = render(
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      );
      const html = container.innerHTML;
      unmount();
      return html;
    };
    expect(markupFor('light')).toBe(markupFor('dark'));
  });

  it('links back to home sections from other pages and marks the current page', () => {
    render(<Header page="publications" />);
    expect(nav().getByRole('link', { name: 'Research' })).toHaveAttribute('href', '/#research');
    expect(nav().getByRole('link', { name: 'Publications' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: /Oliver Njeru/ })).toHaveAttribute('href', '/');
  });
});
