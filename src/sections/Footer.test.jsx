import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';
import { PROFILES } from '../data/profiles.js';

describe('Footer', () => {
  it('keeps sitemap links in-page on the home page', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
  });

  it('points sitemap links at home sections from other pages', () => {
    render(<Footer page="privacy" />);
    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/#skills');
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Publications' })).not.toHaveAttribute('aria-current');
  });

  it('uses the shared profile links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Unsplash' })).toHaveAttribute('href', PROFILES.unsplash.href);
    expect(screen.getByRole('link', { name: 'ORCID' })).toHaveAttribute('href', PROFILES.orcid.href);
  });
});
