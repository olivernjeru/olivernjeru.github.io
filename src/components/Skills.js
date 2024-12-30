import React from 'react';
import { Typography, Box, Grid, Container } from '@mui/material';
import { categorizedSkills } from './dataStores/SkillsObject';
import Paper from '@mui/material/Paper';

const Skills = () => {
    return (
        <Box
            id="skills"
            sx={{
                minHeight: '100vh', // Use minHeight for better responsiveness
                display: 'flex', // Flexbox for layout
                flexDirection: 'column', // Stack content vertically
                justifyContent: 'flex-start', // Center vertically
                alignItems: 'center', // Center horizontally
                padding: { xs: '1rem', sm: '2rem' }, // Adjust padding for small screens
                overflowY: 'auto', // Enable scrolling if content exceeds height
            }}
        >
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Skills
                </Typography>

                {Object.keys(categorizedSkills).map((category, categoryIndex) => (
                    <Box key={categoryIndex} sx={{ marginBottom: '2rem' }}>
                        <Typography
                            variant="h5"
                            align="center"
                            gutterBottom
                            sx={{ marginBottom: '1rem', textTransform: 'capitalize' }}
                        >
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>

                        <Grid container spacing={2} justifyContent="center">
                            {categorizedSkills[category].map((skill, skillIndex) => (
                                <Grid item key={skillIndex} xs={6} sm={4} md={4}>
                                    <Paper
                                        elevation={6}
                                        sx={{
                                            padding: '0.5rem',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {skill}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ))}
            </Container>
        </Box>
    );
};

export default Skills;
