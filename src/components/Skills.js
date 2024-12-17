import React from 'react';
import { Typography, Box, Grid } from '@mui/material';

const skills = [
    'Python', 'C++', 'Java', 'JavaScript', 'R', 'Pandas', 'Numpy',
    'Scikit-learn', 'Matplotlib', 'GGPlot', 'Bash', 'MYSQL', 'HTML', 'CSS',
    'Photography', 'Spanish (Beginner)', 'Swahili (Bilingual)',
];

const Skills = () => {
    return (
        <Box
            id="skills"
            sx={{
                minHeight: '100vh', // Use minHeight for better responsiveness
                display: 'flex', // Flexbox for layout
                flexDirection: 'column', // Stack content vertically
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                padding: { xs: '1rem', sm: '2rem' }, // Adjust padding for small screens
                overflowY: 'auto', // Enable scrolling if content exceeds height
                backgroundColor: 'background.default', // Dark mode-compatible background
                color: 'text.primary', // Dark mode-compatible text color
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Skills
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {skills.map((skill, index) => (
                    <Grid item key={index} xs={6} sm={4} md={3}>
                        <Typography variant="body1" align="center">
                            {skill}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Skills;
