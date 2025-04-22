import React from 'react';
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
  useTheme,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import DescriptionIcon from '@mui/icons-material/Description';
import SectionHeader from './SectionHeader';
import { educationData, publications } from './dataStores/EducationObject';
import { NoUnderlineLink } from './utilities/formats/NoUnderlineLink';

const Education = () => {
  const theme = useTheme();

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
        {/* Education Header */}
        <SectionHeader
          icon={SchoolIcon}
          title="Education and Research"
          delay={800}
        />

        {/* Education Cards */}
        {/* Map through the education data */}
        {Object.values(educationData).map((education, index) => (
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
                avatar={<SchoolIcon color="primary" />}
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
                {/* Relevant Classes */}
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
                        <Chip key={i} label={c} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Events */}
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

                {/* Activities */}
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
        ))}

        {/* Publications */}
        <Box id="publications" sx={{ mt: 6 }}>
          <SectionHeader
            icon={DescriptionIcon}
            title="Publications"
            delay={1200}
          />

          {publications.map((publication, index) => (
            <Grow in timeout={1400 + index * 200} key={publication.title}>
              <Paper
                elevation={2}
                sx={{ p: 2, mb: 2, borderRadius: 2 }}
              >
                <Box display="flex" alignItems="flex-start">
                  <ArticleIcon
                    sx={{ mr: 1, mt: 0.5 }}
                    color="secondary"
                  />
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
        </Box>
      </Container>
    </Box>
  );
};

export default Education;
