import React, { useState, useEffect } from 'react';
import { Typography, Box, Container, Skeleton, Paper } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { projects } from './dataStores/Projects';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // Media queries to detect screen sizes
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Mobile (xs)
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablet (sm to md)
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // Desktop (lg and above)

  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Determine the number of columns based on the screen size
  let cols = 1;
  if (isSmallScreen) {
    cols = 1; // Keep it single column for small screens
  } else if (isMediumScreen) {
    cols = 2; // Use two columns for tablets
  } else if (isLargeScreen) {
    cols = 3; // Use three columns for desktops
  }

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

        {/* ImageList with dynamic columns based on screen size */}
        <ImageList variant="masonry" cols={cols} gap={8}>
          {loading
            ? Array.from(new Array(6)).map((_, index) => (
                <ImageListItem key={index}>
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    animation="wave"
                    sx={{ borderRadius: 1 }}
                  />
                </ImageListItem>
              ))
            : projects.map((project, index) => (
                <ImageListItem key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: 2,
                      backgroundColor: 'background.paper',
                      color: 'text.primary',
                      borderRadius: 1, // Optional: rounding corners for visual appeal
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
                      {project.github && (
                        <NoUnderlineLink href={project.github}>GitHub</NoUnderlineLink>
                      )}
                      {project.live && (
                        <NoUnderlineLink href={project.live}>Live Demo</NoUnderlineLink>
                      )}
                    </Box>
                  </Paper>
                </ImageListItem>
              ))}
        </ImageList>
      </Container>
    </Box>
  );
};

export default Projects;
