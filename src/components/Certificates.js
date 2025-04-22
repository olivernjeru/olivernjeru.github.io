import React from 'react';
import {
  Typography, Box, Container, Grid, Paper,
  Link, useTheme, Chip, Avatar, Fade
} from '@mui/material';
import SectionHeader from './SectionHeader';
import { categorizedCertificates } from './dataStores/CertificatesObject';
import { CalendarTodayOutlined, LinkOutlined, SchoolOutlined, VerifiedOutlined, WorkspacePremiumOutlined } from '@mui/icons-material';

const Certificates = () => {
  const theme = useTheme();

  return (
    <Box
      id="certificates"
      sx={{
        padding: { xs: "1rem", md: "2rem" }, // Padding for mobile and desktop
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={VerifiedOutlined}
          title="Certifications"
          subtitle="Validated Expertise"
          delay={800}
        />

        {Object.entries(categorizedCertificates).map(([category, certificates]) => (
          <Fade in timeout={1000} key={category}>
            <Box sx={{ mb: 6 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 3,
                pl: 1,
                borderLeft: `4px solid ${theme.palette.primary.main}`
              }}>
                <Avatar sx={{
                  bgcolor: theme.palette.primary.main,
                  width: 40,
                  height: 40,
                  boxShadow: theme.shadows[4]
                }}>
                  <SchoolOutlined fontSize="small" />
                </Avatar>
                <Typography variant="h5" sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary
                }}>
                  {category}
                </Typography>
              </Box>

              <Grid container spacing={3}>
                {certificates.map((certificate) => (
                  <Grid item xs={12} md={6} key={certificate.name}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        background: theme.palette.mode === 'light'
                          ? '#ffffff'
                          : theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: theme.shadows[6],
                          borderColor: theme.palette.primary.light
                        }
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 1.5
                        }}>
                          <WorkspacePremiumOutlined fontSize="small" color="primary" />
                          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                            {certificate.name}
                          </Typography>
                        </Box>

                        <Box sx={{
                          display: 'flex',
                          gap: 2,
                          flexWrap: 'wrap',
                          mb: 1.5
                        }}>
                          {certificate.issuer && (
                            <Chip
                              label={certificate.issuer}
                              size="small"
                              color="secondary"
                              variant="outlined"
                            />
                          )}
                          {certificate.date && (
                            <Chip
                              icon={<CalendarTodayOutlined fontSize="small" />}
                              label={certificate.date}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>

                      {certificate.url && certificate.url !== "#" ? (
                        <Link
                          href={certificate.url}
                          target="_blank"
                          rel="noopener"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 2,
                            color: theme.palette.primary.main,
                            textDecoration: 'none',
                            '&:hover': {
                              color: theme.palette.primary.dark
                            }
                          }}
                        >
                          <LinkOutlined fontSize="small" />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            View Credential
                          </Typography>
                        </Link>
                      ) : (
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 2,
                            fontStyle: 'italic',
                            color: theme.palette.text.secondary
                          }}
                        >
                          Credential available upon request
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Fade>
        ))}
      </Container>
    </Box>
  );
};

export default Certificates;
