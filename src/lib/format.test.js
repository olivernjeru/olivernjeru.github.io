import { afterEach, describe, expect, it } from 'vitest';
import {
  capitalize,
  formatDate,
  fullName,
  numberWord,
  parseMonthYear,
  yearOf,
  yearsSince,
} from './format.js';

describe('formatDate', () => {
  const originalTz = process.env.TZ;

  afterEach(() => {
    process.env.TZ = originalTz;
  });

  it('formats ISO dates', () => {
    expect(formatDate('2026-10-20')).toBe('Oct 20, 2026');
    expect(formatDate('2024-05-22')).toBe('May 22, 2024');
  });

  it('does not slip to the previous day west of UTC', () => {
    process.env.TZ = 'America/Los_Angeles';
    expect(formatDate('2026-10-20')).toBe('Oct 20, 2026');
  });

  it('rejects anything that is not an ISO date', () => {
    expect(() => formatDate('20 October 2026')).toThrow(RangeError);
  });
});

describe('small formatters', () => {
  it('reads the year from an ISO date', () => {
    expect(yearOf('2024-08-08')).toBe(2024);
  });

  it('joins given and family names', () => {
    expect(fullName({ given: 'Oliver', family: 'Njeru' })).toBe('Oliver Njeru');
  });

  it('spells out small numbers and keeps larger ones as digits', () => {
    expect(numberWord(3)).toBe('three');
    expect(numberWord(12)).toBe('twelve');
    expect(numberWord(13)).toBe('13');
  });

  it('capitalizes the first letter', () => {
    expect(capitalize('three')).toBe('Three');
  });
});

describe('parseMonthYear and yearsSince', () => {
  it('parses the "Mon YYYY" durations used in experience.js', () => {
    expect(parseMonthYear('Mar 2018')).toEqual({ year: 2018, month: 2 });
  });

  it('rejects anything else', () => {
    expect(() => parseMonthYear('March 2018')).toThrow(RangeError);
    expect(() => parseMonthYear('Current')).toThrow(RangeError);
  });

  it('counts whole years only', () => {
    const start = { year: 2018, month: 2 }; // Mar 2018
    expect(yearsSince(start, new Date('2027-02-28T12:00:00Z'))).toBe(8);
    expect(yearsSince(start, new Date('2027-03-01T12:00:00Z'))).toBe(9);
  });
});
