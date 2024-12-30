import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically
  const theme = useTheme(); // Get the current theme

  return (
    <Box component="footer" sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#1976D2', padding: 2, textAlign: 'center' }}>
      <Typography variant="h6" sx={{ color: theme.palette.mode === 'light' ? 'white' : 'inherit' }}>Built by Oliver Njeru</Typography>
      <Typography variant="body2" sx={{ marginTop: 1, color: theme.palette.mode === 'light' ? 'white' : 'inherit' }}>
        All rights reserved &copy; 2020 - {currentYear}
      </Typography>
    </Box>
  );
};

export default Footer;
