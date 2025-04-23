import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
      }}
    >
      {/* Bottom Bar */}
      <Box>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant='h6'>
            Built by Oliver Njeru
          </Typography>
          <Typography variant="body2">
            All rights reserved © 2020 – {currentYear}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
