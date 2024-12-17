import React from 'react';
import { Typography, Box, Container, Grid, Paper, Link } from '@mui/material';

const ProjectList = () => {
  const projects = [
    {
      name: 'Ecommerce Website',
      description: 'A merch store I created for my best friend to increase his sales and customer engagement.',
      technologies: 'Django, Vuejs, Bulma, HTML',
      github: 'https://github.com/olivernjeru/ecommercewebsite',
      live: 'https://github.com/olivernjeru/blindr',
    },
    {
      name: 'Game Collection',
      description: 'A collection of games including Random Number Guessing Game, TicTacToe, Rock Paper Scissors, and more.',
      technologies: 'Python CLI',
      github: 'https://github.com/olivernjeru/explore-python/tree/main/explore-python',
      live: 'https://olivernjeru.github.io/blindr/blindr.html',
    },
    {
      name: "Multiple Vendor Ecommerce Site",
      description:
        "A continuation of the Ecommerce Website project, focusing on Django and enhanced technology stacks.",
      technologies: "Django, Tailwind, HTML",
      github:
        "https://github.com/olivernjeru/explore-python/tree/main/explore-django/multiple-vendors-ecommerce-site",
      live: "https://olivernjeru.github.io/blindr/blindr.html",
    },
    {
      name: "Explore JavaScript",
      description:
        "A collection of JavaScript projects including a TicTacToe Game, foundational vanilla JS concepts, and a CRUD app.",
      technologies: "Vanilla JavaScript, ReactJS, Tailwind, NodeJS",
      github: "https://github.com/olivernjeru/explore-javascript",
      live: "https://olivernjeru.github.io/blindr/blindr.html",
    },
    {
      name: "Landing Page Clones",
      description:
        "A collection of landing page clones for popular websites like Microsoft, Hulu, Starbucks, and Netflix, showcasing HTML, CSS, and JavaScript expertise.",
      technologies: "HTML, CSS, JavaScript",
      github: "https://github.com/olivernjeru/landing-page-clones",
      live: "https://olivernjeru.github.io/blindr/blindr.html",
    },
    {
      name: "Blindr",
      description:
        "A calculator for the visually impaired that uses event listeners in JavaScript to provide audio feedback for button clicks.",
      technologies: "JavaScript, HTML, CSS",
      github: "https://github.com/olivernjeru/blindr",
      live: "https://olivernjeru.github.io/blindr/blindr.html",
    },
    {
      name: "Parking Lot Management System",
      description:
        "An app that checks users into a parking lot, captures their information in a database, and calculates owed amounts upon checkout.",
      technologies: "Java, MySQL",
      github: "https://github.com/olivernjeru/parkinglotmanagementsystem",
      live: "https://olivernjeru.github.io/blindr/blindr.html",
    },
  ];

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
        backgroundColor: 'background.default', // Dark mode-compatible background
        color: 'text.primary', // Dark mode-compatible text color
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
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: 'secondary.main' }}
                  >
                    Live Demo
                  </Link>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectList;
