import React from 'react';
import { Link } from "@mui/material";

// Reusable component for links without underlines
const NoUnderlineLink = ({ href, children }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener"
    style={{ textDecoration: 'none', color: "#1976d2" }}
  >
    {children}
  </Link>
);

export { NoUnderlineLink };