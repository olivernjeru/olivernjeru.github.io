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
  Divider,
  Grow,
  Stack,
  useTheme,
  Avatar,
} from '@mui/material';
import { CameraAltOutlined, EmojiEventsOutlined, EventOutlined, SchoolOutlined, VolunteerActivismOutlined } from '@mui/icons-material';
import SectionHeader from './SectionHeader';
import { categorizedAwards } from './dataStores/AwardsObject';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';

const awardSections = [
  {
    key: 'academicHonors',
    title: 'Academic Honors',
    icon: SchoolOutlined,
    isList: true,
  },
  {
    key: 'hackathonsCompetitions',
    title: 'Hackathons & Competitions',
    icon: EmojiEventsOutlined,
    isList: true,
  },
  {
    key: 'photographyAchievements',
    title: 'Photography Achievements',
    icon: CameraAltOutlined,
    isList: true,
  },
  {
    key: 'invitedEvents',
    title: 'Invited Events',
    icon: EventOutlined,
    isList: false,
  },
  {
    key: 'volunteering',
    title: 'Volunteering',
    icon: VolunteerActivismOutlined,
    isList: false,
  },
];

const Awards = () => {
  const theme = useTheme();

  return (
    <Box
      id="awards"
      sx={{
        padding: { xs: "1rem", sm: "2rem" },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={EmojiEventsOutlined}
          title="Awards and Honors"
          subtitle="Recognitions & Contributions"
          delay={800}
        />

        <Stack spacing={4}>
          {awardSections.map((section, idx) => {
            const Icon = section.icon;
            const data = categorizedAwards[section.key];

            return (
              <Grow in timeout={1000 + idx * 200} key={section.key}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: theme.shadows[3],
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <Icon />
                      </Avatar>
                    }
                    title={
                      <Typography variant="h5" fontWeight={700}>
                        {section.title}
                      </Typography>
                    }
                  />

                  <Divider />

                  <CardContent>
                    {section.isList ? (
                      <List dense>
                        {data.map((item, i) => (
                          <ListItem key={i}>
                            <ListItemIcon>
                              <Icon color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      data.map((entry, i) => (
                        <Box key={i} sx={{ mb: 2 }}>
                          {entry.link ? (
                            <NoUnderlineLink
                              href={entry.link}
                              sx={{ fontWeight: 600, fontSize: '1.1rem' }}
                            >
                              {entry.name}
                            </NoUnderlineLink>
                          ) : (
                            <Typography variant="h6" fontWeight={600}>
                              {entry.role}
                            </Typography>
                          )}

                          {'organization' in entry && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mb: 1 }}
                            >
                              {entry.organization} {entry.period && `(${entry.period})`}
                            </Typography>
                          )}

                          {(entry.details || []).length > 0 && (
                            <List dense>
                              {entry.details.map((detail, j) => (
                                <ListItem key={j}>
                                  <ListItemIcon>
                                    <section.icon color="action" />
                                  </ListItemIcon>
                                  <ListItemText primary={detail} />
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </Box>
                      ))
                    )}
                  </CardContent>
                </Card>
              </Grow>
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default Awards;
