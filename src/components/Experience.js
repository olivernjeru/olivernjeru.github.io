import React from 'react';
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Grow,
  Stack,
  useTheme,
  Avatar,
} from '@mui/material';
import { CheckCircleOutlined, HourglassEmptyOutlined, WorkOutlineOutlined } from '@mui/icons-material';
import SectionHeader from './SectionHeader';
import { workExperienceData } from './dataStores/ExperienceObject';

const Experience = () => {
  const theme = useTheme();

  return (
    <Box
      id="work"
      sx={{
        minHeight: "100vh", // Minimum full viewport height
        padding: { xs: "1rem", md: "2rem" }, // Adjust padding for mobile and larger screens
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={WorkOutlineOutlined}
          title="Experience"
          subtitle="Where I am Making an Impact"
          delay={800}
        />

        <Stack spacing={3}>
          {Object.entries(workExperienceData).map(
            ([organization, details], index) => {
              const isOngoing = details.duration.includes('Current');
              return (
                <Grow in timeout={800 + index * 200} key={organization}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: theme.shadows[3],
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[6],
                      },
                    }}
                  >
                    {/* Header with role & duration as Chips */}
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {organization.charAt(0)}
                        </Avatar>
                      }
                      title={
                        <Typography variant="h6" fontWeight={700}>
                          {organization}
                        </Typography>
                      }
                      subheader={
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          <Chip
                            label={details.title}
                            size="small"
                            color="secondary"
                          />
                          <Chip
                            label={details.duration}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                      }
                    />

                    <Divider />

                    {/* Responsibilities: choose icon based on status */}
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        gutterBottom
                      >
                        Key Responsibilities
                      </Typography>

                      <List dense>
                        {details.responsibilities.map((task, idx) => (
                          <ListItem key={idx}>
                            <ListItemIcon>
                              {isOngoing ? (
                                <HourglassEmptyOutlined
                                  color="warning"
                                  fontSize="small"
                                />
                              ) : (
                                <CheckCircleOutlined
                                  color="primary"
                                  fontSize="small"
                                />
                              )}
                            </ListItemIcon>
                            <ListItemText primary={task} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grow>
              );
            }
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Experience;
