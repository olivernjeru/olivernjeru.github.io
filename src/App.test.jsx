import React from 'react';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import App from './App.jsx';

describe('App', () => {
  it('renders the hero heading without throwing', () => {
    const { getByRole } = render(<App />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading.textContent).toMatch(/Yo\.\s*I['’]?m\s*Oliver\./i);
  });
});
