import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <Box component="footer" sx={{ backgroundColor: '#333', padding: 2, textAlign: 'center' }}>
      <Typography variant="h6">Built by Oliver Njeru</Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        All rights reserved &copy; 2021 - {currentYear}
      </Typography>
    </Box>
  );
};

export default Footer;
