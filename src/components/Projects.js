import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Grid, Paper, Skeleton } from '@mui/material';
import { projects } from './dataStores/Projects';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';

const Projects = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh', // Use minHeight for better responsiveness
        display: 'flex', // Flexbox for alignment
        flexDirection: 'column', // Stack content vertically
        justifyContent: 'flex-start', // Start content at the top
        overflowY: 'auto', // Allow scrolling for long content
        padding: { xs: '1rem', sm: '2rem' }, // Responsive padding for mobile and larger screens
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Projects
        </Typography>

        <Grid container spacing={2}>
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                </Grid>
              ))
            : projects.map((project, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      backgroundColor: 'background.paper', // Dark mode-compatible paper background
                      color: 'text.primary', // Ensure text is visible in dark mode
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {project.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {project.description}
                    </Typography>
                    <Typography variant="caption" display="block" mt={1}>
                      <strong>Technologies:</strong> {project.technologies}
                    </Typography>
                    <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {project.github && ( // Render only if GitHub link exists
                        <NoUnderlineLink href={project.github}>
                          GitHub
                        </NoUnderlineLink>
                      )}
                      {project.live && ( // Render only if Live Demo link exists
                        <NoUnderlineLink href={project.live}>
                          Live Demo
                        </NoUnderlineLink>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Projects;
