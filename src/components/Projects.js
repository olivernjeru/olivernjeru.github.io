import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid2,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Chip,
  Skeleton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Grow,
  Container,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LaunchIcon from '@mui/icons-material/Launch';
import { projects } from './dataStores/ProjectsObject';
import SectionHeader from './SectionHeader';

const Projects = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const cols = isXs ? 1 : isSm ? 2 : 3;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const skeletonArray = Array.from(new Array(cols * 2));

  return (
    <Box
      id="projects"
      sx={{
        minHeight: '100vh', // Use minHeight for better responsiveness
        padding: { xs: '1rem', sm: '2rem' }, // Responsive padding for mobile and larger screens

        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={FolderOpenOutlinedIcon}
          title="Projects"
          subtitle="My Hobbies"
          delay={800}
        />

        <Grid2 container rowSpacing={4} columnSpacing={4} disableEqualOverflow>
          {(loading ? skeletonArray : projects).map((proj, idx) => (
            <Grow in timeout={300 + idx * 100} key={idx}>
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={240}
                    animation="wave"
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': proj.live || proj.github ? { transform: 'scale(1.03)' } : {},
                    }}
                    elevation={3}
                  >
                    <CardActionArea
                      component="a"
                      href={proj.live || proj.github || '#'}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        flexGrow: 1,
                        pointerEvents: proj.live || proj.github ? 'auto' : 'none',
                        '.MuiCardActionArea-focusHighlight': {
                          background: proj.live || proj.github ? 'transparent' : 'transparent',
                        },
                        '.MuiTouchRipple-root': {
                          display: proj.live || proj.github ? 'block' : 'none',
                        },
                      }}
                    >
                      {proj.img ? (
                        <CardMedia
                          component="img"
                          height="140"
                          image={
                            // If already a data URI, use as-is; otherwise prepend header:
                            proj.img.startsWith('data:')
                              ? proj.img
                              : `data:image/png;base64,${proj.img}`
                          }
                          alt={proj.name}
                        />
                      ) : (
                        <Box
                          sx={{
                            height: 140,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.action.hover,
                          }}
                        >
                          <FolderOpenOutlinedIcon
                            sx={{ fontSize: 48, color: theme.palette.text.secondary }}
                          />
                        </Box>
                      )}

                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {proj.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {proj.description}
                        </Typography>
                        <Box
                          mt={2}
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {proj.technologies
                            .split(',')
                            .map((tech, i) => (
                              <Chip
                                key={i}
                                label={tech.trim()}
                                size="small"
                                color="secondary"
                              />
                            ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>

                    <CardActions>
                      {proj.github && (
                        <Tooltip title="View Source on GitHub">
                          <IconButton
                            component="a"
                            href={proj.github}
                            target="_blank"
                            rel="noopener"
                          >
                            <GitHubIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {proj.live && (
                        <Tooltip title="View Live Demo">
                          <IconButton
                            component="a"
                            href={proj.live}
                            target="_blank"
                            rel="noopener"
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </CardActions>
                  </Card>
                )}
              </Grid2>
            </Grow>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default Projects;
