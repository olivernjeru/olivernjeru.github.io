import React from 'react';
import { Typography, Box, Container, List, ListItem } from '@mui/material';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';

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
        {/* Section Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Work Experience
        </Typography>

        {/* USIU-Africa School of Sciences & Technology */}
        <Box mb={{ xs: 3, md: 4 }} sx={{ textAlign: { xs: "left", md: "center" } }}>
          <Typography variant="h5" gutterBottom>
            USIU-Africa School of Sciences & Technology
          </Typography>
          <Typography variant="h6" gutterBottom>
            Research Assistant (Oct 2023 - Current)
          </Typography>
          <List>
            <ListItem>Machine Learning</ListItem>
          </List>
        </Box>

        {/* IBM */}
        <Box mb={{ xs: 3, md: 4 }} sx={{ textAlign: { xs: "left", md: "center" } }}>
          <Typography variant="h5" gutterBottom>
            IBM
          </Typography>
          <Typography variant="h6" gutterBottom>
            Software Engineer Intern - IBM Research (June 2023 - August 2023)
          </Typography>
          <List>
            <ListItem>
              Created a sophisticated state-of-the-art User Interface for IBM's Foundation Models.
            </ListItem>
          </List>
        </Box>

        {/* United States International University-Africa */}
        <Box sx={{ textAlign: { xs: "left", md: "center" } }}>
          <Typography variant="h5" gutterBottom>
            United States International University-Africa
          </Typography>
          <Typography variant="h6" gutterBottom>
            Campus Work Study (Jan 2022 - April 2024)
          </Typography>
          <List>
            <ListItem>
              Listed approximately a little above 50% of Professor
              &nbsp;{" "} <NoUnderlineLink href="https://en.wikipedia.org/wiki/Paul_Tiyambe_Zeleza" target="_blank" rel="noopener">
                Paul Tiyambe Zeleza's
              </NoUnderlineLink>
              &nbsp;{" "} $1 Million{' '}
              &nbsp;{" "} <NoUnderlineLink href="https://allafrica.com/stories/202108200101.html" target="_blank" rel="noopener">
                personal library donation
              </NoUnderlineLink>{' '}
              &nbsp;{" "} in a team of three as of December 2022.
            </ListItem>
            <ListItem>Performed Exploratory Data Analysis and Visualization with Microsoft Excel.</ListItem>
            <ListItem>Digitized records of Journal Articles, reports, reviews, and USIU-Africa’s alumni Masters Thesis.</ListItem>
            <ListItem>Organized and sorted files efficiently, reducing physical search time by 90%.</ListItem>
            <ListItem>Managed office tasks such as printing, sorting, filing, and photocopying effectively.</ListItem>
            <ListItem>Engaged in productive conversations to assist students and parents seeking financial aid.</ListItem>
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Experience;
