import React from 'react';
import { Typography, Box, Container, List, ListItem } from '@mui/material';
import { workExperienceData } from './dataStores/ExperienceObject';

const Experience = () => {
  return (
    <Box
      id="work"
      sx={{
        minHeight: "100vh", // Minimum full viewport height
        display: "flex", // Flexbox for alignment
        flexDirection: "column", // Stack content vertically
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        overflowY: "auto", // Allow scrolling for long content
        padding: { xs: "1rem", md: "2rem" }, // Adjust padding for mobile and larger screens
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Experience
        </Typography>
        {Object.entries(workExperienceData).map(([organization, details], index) => (
          <Box
            key={index}
            mb={{ xs: 3, md: 4 }}
            sx={{ textAlign: { xs: "left", md: "center" } }}
          >
            <Typography variant="h5" gutterBottom>
              {organization}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {details.title} ({details.duration})
            </Typography>
            <List>
              {details.responsibilities.map((task, idx) => (
                <ListItem key={idx}>{task}</ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Experience;