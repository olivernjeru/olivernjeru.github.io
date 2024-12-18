import React from 'react';
import { Typography, Box, Link } from '@mui/material';
import { certificates } from './dataStores/Certificates';

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
