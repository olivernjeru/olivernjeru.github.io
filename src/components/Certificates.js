import React from 'react';
import { Typography, Box, Container, Grid, Paper } from '@mui/material';
import { categorizedCertificates } from './dataStores/CertificatesObject';
import { NoUnderlineLink } from '../components/utilities/formats/NoUnderlineLink';

const Certificates = () => {
  return (
    <Box
      id="certificates"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: { xs: '1rem', sm: '2rem' },
        overflowY: 'auto',
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Certificates
        </Typography>

        {Object.entries(categorizedCertificates).map(([category, certificates], index) => (
          <Box key={index} sx={{ marginBottom: '2rem' }}>
            {/* Category Title */}
            <Typography
              variant="h5"
              align="left"
              gutterBottom
              sx={{
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                fontWeight: 'bold',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              {category}
            </Typography>

            {/* Certificate List */}
            <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
              {certificates.map((certificate, certIndex) => {
                const isValidLink = certificate.url && certificate.url !== "#";

                return (
                  <Grid item xs={12} sm={6} md={4} key={certIndex}>
                    <Paper elevation={3} sx={{ padding: '1rem', textAlign: 'center' }}>
                      {isValidLink ? (
                        <Typography variant="body1" gutterBottom>
                          <NoUnderlineLink
                            href={certificate.url}
                            target="_blank"
                            rel="noopener"
                            color="primary"
                          >
                            {certificate.name}
                          </NoUnderlineLink>
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          gutterBottom
                          sx={{ color: 'text.secondary', fontStyle: 'italic' }}
                        >
                          {certificate.name}
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Certificates;
