import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardHeader,
  CardContent,
  Paper,
  Typography,
  List,
  ListItem,
  Chip,
  Divider,
  Grow,
  Skeleton,
  useTheme,
} from '@mui/material';
import { ArticleOutlined, DescriptionOutlined, SchoolOutlined } from '@mui/icons-material';
import SectionHeader from './SectionHeader';
import { educationData, publications } from './dataStores/EducationObject';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';

const Education = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  // Toggle loading off after 1 second
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const educationList = Object.values(educationData);

  return (
    <Box
      id="education"
      sx={{
        minHeight: "100vh", // Full viewport height
        padding: { xs: "1rem", md: "2rem" }, // Padding for mobile and desktop
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        {loading ? (
          <Skeleton variant="text" width="40%" height={48} sx={{ mb: 4 }} />
        ) : (
          <SectionHeader
            icon={SchoolOutlined}
            title="Education and Research"
            subtitle="Hello World!"
            delay={800}
          />
        )}

        {/* Education Cards */}
        {/* Map through the education data */}
        {educationList.map((education, index) => (
          loading ? (
            <Skeleton
              key={index}
              variant="rectangular"
              height={200}
              sx={{ mb: 4, borderRadius: 3 }}
            />
          ) : (
            <Grow in timeout={800 + index * 200} key={education.name}>
              <Card
                sx={{
                  mb: 4,
                  borderRadius: 3,
                  boxShadow: theme.shadows[3],
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardHeader
                  avatar={<SchoolOutlined color="primary" />}
                  title={
                    <Typography variant="h6" fontWeight={700}>
                      <NoUnderlineLink href={education.link} color="inherit">
                        {education.name}
                      </NoUnderlineLink>
                    </Typography>
                  }
                  subheader={
                    <Typography variant="subtitle2" color="text.secondary">
                      {education.degree}
                    </Typography>
                  }
                />
                <Divider />
                <CardContent>
                  {/* Relevant Courses */}
                  {education.classes.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Relevant Courses
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {education.classes.map((c, i) => (
                          <Chip key={i} label={c} size="small" color="secondary" />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {/* Events & Volunteering */}
                  {education.events.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Events & Volunteering
                      </Typography>
                      <List dense>
                        {education.events.map((event, i) => (
                          <ListItem key={i} sx={{ pl: 2 }}>
                            <NoUnderlineLink href={event.link}>
                              {event.name}
                            </NoUnderlineLink>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Achievements */}
                  {education.achievements.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Achievements
                      </Typography>
                      <List dense>
                        {education.achievements.map((ach, i) => (
                          <ListItem key={i}>{ach}</ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {/* Extracurricular Activities */}
                  {education.activities.length > 0 && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        fontWeight={600}
                        gutterBottom
                      >
                        Extracurricular Activities
                      </Typography>
                      <List dense>
                        {education.activities.map((act, i) => (
                          <ListItem key={i}>{act}</ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grow>
          )
        ))}

        {/* Publications */}
        <Box id="publications" sx={{ mt: 6 }}>
          {loading ? (
            <>
              <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
              {Array.from({ length: publications.length }).map((_, i) => (
                <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 2, borderRadius: 2 }} />
              ))}
            </>
          ) : (
            <>
              <SectionHeader
                icon={DescriptionOutlined}
                title="Publications"
                delay={1200}
              />
              {publications.map((publication, index) => (
                <Grow in timeout={1400 + index * 200} key={publication.title}>
                  <Paper
                    elevation={2}
                    sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                    <Box display="flex" alignItems="flex-start">
                      <ArticleOutlined sx={{ mr: 1, mt: 0.5 }}
                        color="secondary" />
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                        >
                          <NoUnderlineLink href={publication.link}>
                            {publication.title}
                          </NoUnderlineLink>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {publication.description}
                          {publication.conference && (
                            <> Presented at {publication.conference.name}, {publication.conference.date}.</>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grow>
              ))}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Education;
