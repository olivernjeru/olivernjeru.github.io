import React from 'react';
import { Typography, Box, Link } from '@mui/material';

const certificates = [
  { name: "Lyft - Back-End Engineering Job Simulation", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Lyft/xSw9echtixLAoPdsH_Lyft_cmq5Hpw99mdHAm5wy_1703688690191_completion_certificate.pdf" },
  { name: "McKinsey Forward Program", url: "https://www.credly.com/badges/f8d52c6e-8f93-4520-8529-587da7592fb3/public_url" },
  { name: "J.P.Morgan Chase & Co. - Agile Job Simulation", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/5QiaMtZ4k8ngYKn4D_JPMorgan%20Chase%20&%20Co._cmq5Hpw99mdHAm5wy_1696353311675_completion_certificate.pdf" },
  { name: "J.P.Morgan Chase & Co. - Software Engineering Lite Job Simulation", url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/J.P.%20Morgan/Wb4yEmHvZrC2qxiyX_JPMorgan%20Chase%20&%20Co._cmq5Hpw99mdHAm5wy_1696340758177_completion_certificate.pdf" },
  // Add other certificates here
];

const Certificates = () => {
  return (
    <Box
      id="certificates"
      sx={{
        minHeight: '100vh', // Ensure the box covers the full viewport height
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        padding: { xs: '1rem', sm: '2rem' }, // Adjust padding based on screen size
        overflowY: 'auto', // Enable scrolling if content overflows
        backgroundColor: 'background.default', // Ensure compatibility with dark mode
        color: 'text.primary', // Ensure text is readable in dark mode
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Certificates
      </Typography>
      {certificates.map((certificate, index) => (
        <Typography
          key={index}
          variant="body1"
          paragraph
          align="center"
          sx={{
            maxWidth: '90%', // Limit width for better readability
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Adjust font size for small screens
          }}
        >
          <Link href={certificate.url} target="_blank" rel="noopener" color="primary">
            {certificate.name}
          </Link>
        </Typography>
      ))}
    </Box>
  );
};

export default Certificates;
