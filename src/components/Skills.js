import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid2,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Tooltip,
  Grow,
  useTheme,
} from '@mui/material';
import { BuildOutlined, CodeOutlined, EngineeringOutlined, ExpandMoreOutlined, MiscellaneousServicesOutlined, PsychologyOutlined } from '@mui/icons-material';
import SectionHeader from './SectionHeader';
import { categorizedSkills } from './dataStores/SkillsObject';

const categoryIcons = {
  ProgrammingLanguages: <CodeOutlined sx={{ fontSize: 32, color: 'primary.main' }} />,
  SoftwareDevelopmentTools: <EngineeringOutlined sx={{ fontSize: 32, color: 'primary.main' }} />,
  SoftSkills: <PsychologyOutlined sx={{ fontSize: 32, color: 'primary.main' }} />,
  OtherSkills: <MiscellaneousServicesOutlined sx={{ fontSize: 32, color: 'primary.main' }} />,
};

const Skills = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleToggle = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="skills"
      sx={{
        padding: { xs: '1rem', sm: '2rem' },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={BuildOutlined}
          title="Skills"
          subtitle="What I Bring to the Table"
          delay={600}
        />

        {Object.entries(categorizedSkills).map(([category, skills], idx) => (
          <Grow in timeout={600 + idx * 200} key={category}>
            <Accordion
              expanded={expanded === category}
              onChange={handleToggle(category)}
              sx={{
                mb: 2,
                boxShadow: theme.shadows[1],
                '&:before': { display: 'none' },
                borderRadius: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreOutlined />}
                sx={{
                  bgcolor: theme.palette.action.hover,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {categoryIcons[category]}
                  <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                    {category.replace(/([A-Z])/g, ' $1').trim()}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Grid2 container spacing={1} wrap="wrap">
                  {skills.map((skill, i) => (
                    <Grid2 item key={i} sx={{ maxWidth: '100%' }}>
                      <Tooltip title={skill} arrow>
                        <Chip
                          label={skill}
                          clickable
                          color="secondary"
                          sx={{
                            fontWeight: 500,
                            height: 'auto',
                            whiteSpace: 'normal',
                            '& .MuiChip-label': {
                              whiteSpace: 'normal',
                              display: 'flex',
                              alignItems: 'center',
                              lineHeight: 1.4,
                              minHeight: '32px',
                            },
                            transition: theme.transitions.create(['transform', 'box-shadow'], {
                              duration: theme.transitions.duration.shortest,
                            }),
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[3],
                            },
                          }}
                        />
                      </Tooltip>
                    </Grid2>
                  ))}
                </Grid2>
              </AccordionDetails>
            </Accordion>
          </Grow>
        ))}
      </Container>
    </Box>
  );
};

export default Skills;
