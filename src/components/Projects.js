import React from 'react';
import { Typography, Box, Container, Grid, Paper, Link } from '@mui/material';
import { projects } from './dataStores/Projects';

const Projects = () => {
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
          {projects.map((project, index) => (
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
                <Box mt={2}>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener"
                    sx={{ marginRight: 2, color: 'secondary.main' }}
                  >
                    GitHub
                  </Link>
                  {project.live && ( // Conditional rendering for the "Live" link
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener"
                      sx={{ color: 'secondary.main' }}
                    >
                      Live Demo
                    </Link>
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
