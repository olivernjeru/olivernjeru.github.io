// Display formatting shared by the publication views.

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

// "2026-10-20" -> "Oct 20, 2026".
// A date-only ISO string parses as UTC midnight. Formatting it in the viewer's
// time zone would show the previous day anywhere west of UTC, so format in UTC.
export const formatDate = (iso) => {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Expected an ISO date (YYYY-MM-DD), got "${iso}"`);
  }
  return DATE_FORMAT.format(date);
};

// "2026-10-20" -> 2026
export const yearOf = (iso) => Number(iso.slice(0, 4));

const MONTH_ABBREVIATIONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "Mar 2018" -> { year: 2018, month: 2 } (month is 0-based). The format used by
// the durations in src/data/experience.js; anything else throws.
export const parseMonthYear = (text) => {
  const match = /^([A-Z][a-z]{2}) (\d{4})$/.exec(text.trim());
  const month = match ? MONTH_ABBREVIATIONS.indexOf(match[1]) : -1;
  if (month < 0) throw new RangeError(`Expected "Mon YYYY" (for example "Mar 2018"), got "${text}"`);
  return { year: Number(match[2]), month };
};

// Whole years elapsed from a { year, month } start to `now` (UTC).
export const yearsSince = ({ year, month }, now = new Date()) =>
  Math.floor(((now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() - month)) / 12);

// "Oliver" + "Njeru" -> "Oliver Njeru"
export const fullName = ({ given, family }) => `${given} ${family}`;

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six",
  "seven", "eight", "nine", "ten", "eleven", "twelve",
];

// 3 -> "three". Numbers above twelve stay as digits.
export const numberWord = (n) => NUMBER_WORDS[n] ?? String(n);

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
