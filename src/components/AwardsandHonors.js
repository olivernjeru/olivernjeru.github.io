import React from 'react';
import { Typography, Box } from '@mui/material';

const awards = [
  "Dean's List; Spring 2021, Spring 2022, Fall 2022, Spring 2023",
  "JP Morgan Chase Code For Good Africa Virtual Hackathon, September 2023 participant and team lead",
  "CME Group FX Trading Challenge ranked top 25%, August 2023",
  "Junior Achievement Africa Scholarship, 2022",
  "Hult Prize USIU-Africa Innovation Week First Runners Up, 2022",
  "My Photography works of Art got used 15 times on popular platforms such as Notion, Figma, Padlet, PicsArt, Wordpress & Trello, 2021-2023",
  "Achieved 1 Million Views for my Photography works of Art on Unsplash, July 20th 2022",
  "11-time feature on Unsplash, 2021-2022"
];

const AwardsAndHonors = () => {
  return (
    <Box
      id="awards-and-honors"
      sx={{
        minHeight: '100vh', // Ensure the box covers the full viewport height
        display: 'flex', // Flexbox layout
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center', // Center elements vertically
        alignItems: 'center', // Center elements horizontally
        padding: { xs: '1rem', sm: '2rem' }, // Responsive padding based on screen size
        overflowY: 'auto', // Enable scrolling if content overflows
        backgroundColor: 'background.default', // Dark mode-compatible background
        color: 'text.primary', // Dark mode-compatible text color
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Awards & Honors
      </Typography>
      {awards.map((award, index) => (
        <Typography
          key={index}
          variant="body1"
          paragraph
          align="center"
          sx={{
            maxWidth: '90%', // Limit the width for better readability on mobile
            fontSize: { xs: '0.875rem', sm: '1rem' }, // Adjust font size for smaller screens
          }}
        >
          {award}
        </Typography>
      ))}
    </Box>
  );
};

export default AwardsAndHonors;
