import { describe, expect, it } from 'vitest';
import { workExperienceData } from './experience.js';
import { parseMonthYear } from '../lib/format.js';

// SelectedWork derives "N years of jobs" from these durations.
describe('experience durations', () => {
  it.each(Object.entries(workExperienceData))('%s has a parseable duration', (_, role) => {
    const [start, end] = role.duration.split(' - ');
    expect(() => parseMonthYear(start)).not.toThrow();
    if (end && end !== 'Current') expect(() => parseMonthYear(end)).not.toThrow();
  });
});
