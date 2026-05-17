import React from "react";

export const Lamp = ({ size = 48 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 50) / 40}
    viewBox="0 0 40 50"
    role="img"
    aria-label="Reading lamp"
  >
    <path
      d="M9,21 L31,21 L26,7 L14,7 Z"
      fill="none"
      stroke="var(--text)"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <line x1="20" y1="21" x2="20" y2="42" stroke="var(--text)" strokeWidth="2" />
    <line x1="11" y1="42" x2="29" y2="42" stroke="var(--text)" strokeWidth="2.4" strokeLinecap="round" />
    <ellipse cx="20" cy="24" rx="9" ry="2.4" fill="var(--accent)" opacity="0.85" />
  </svg>
);
