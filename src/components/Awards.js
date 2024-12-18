import React from 'react';
import { Typography, Box } from '@mui/material';
import { awards } from './dataStores/Awards';

const Awards = () => {
  return (
    <Box
      id="awards"
      sx={{
        minHeight: '100vh', // Ensure the box covers the full viewport height
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center elements vertically
        alignItems: 'center', // Center elements horizontally
        padding: { xs: '1rem', sm: '2rem' }, // Responsive padding based on screen size
        overflowY: 'auto', // Enable scrolling if content overflows
        backgroundColor: 'background.default', // Dark mode-compatible background
        color: 'text.primary', // Dark mode-compatible text color
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Awards & Honors
      </Typography>
      {awards.map((award, index) => (
        <Typography
          key={index}
          variant="body1"
          paragraph
          align="center"
          sx={{
            maxWidth: '90%', // Limit the width for better readability on mobile
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Adjust font size for smaller screens
          }}
        >
          {award}
        </Typography>
      ))}
    </Box>
  );
};

export default Awards;
