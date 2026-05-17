import React from "react";

export const Flame = ({ size = 18, title = "Flame" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 24) / 18}
    viewBox="0 0 14 20"
    role="img"
    aria-label={title}
  >
    <path
      d="M7,1.2 C9.2,5 11,7 11,11.2 C11,14.8 9.2,17 7,17 C4.8,17 3,14.8 3,11.2 C3,8 4.6,6 7,1.2 Z"
      fill="var(--accent)"
      stroke="var(--accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <ellipse cx="7" cy="12.6" rx="1.8" ry="3" fill="var(--bg)" opacity="0.7" />
  </svg>
);

export const HeroFlame = ({ width = 240 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={(width * 320) / 240}
    viewBox="0 0 240 320"
    role="img"
    aria-label="The Hearth"
  >
    <defs>
      <radialGradient id="heroFlameGlow" cx="50%" cy="65%" r="55%">
        <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.9" />
        <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.55" />
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="120" cy="190" r="160" fill="url(#heroFlameGlow)" />
    <path
      d="M120,18 C148,72 188,108 188,188 C188,242 158,288 120,288 C82,288 52,242 52,188 C52,138 76,108 120,18 Z"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="2.6"
      strokeLinejoin="round"
    />
    <path
      d="M120,90 C134,118 154,138 154,180 C154,212 140,238 120,238 C100,238 86,212 86,180 C86,158 96,138 120,90 Z"
      fill="var(--accent)"
      opacity="0.45"
    />
    <ellipse cx="120" cy="200" rx="14" ry="32" fill="#ffd9a0" opacity="0.9" />
  </svg>
);
