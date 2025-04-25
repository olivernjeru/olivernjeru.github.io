import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Skeleton,
} from '@mui/material';

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically
  const [loading, setLoading] = useState(true);

  // Turn off loading skeletons after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        {loading ? (
          <>
            {/* Skeleton for "Built by Oliver Njeru" */}
            <Skeleton
              variant="text"
              width={200}
              height={32}
              sx={{ mx: 'auto', mb: 1 }}
            />
            {/* Skeleton for copyright line */}
            <Skeleton
              variant="text"
              width={250}
              height={20}
              sx={{ mx: 'auto' }}
            />
          </>
        ) : (
          <>
            <Typography variant="h6">
              Built by Oliver Njeru
            </Typography>
            <Typography variant="body2">
              All rights reserved © 2020 – {currentYear}
            </Typography>
          </>
        )}
      </Container>
    </Box>
  );
}
