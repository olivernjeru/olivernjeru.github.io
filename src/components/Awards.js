import React from 'react';
import { Typography, Box, Container, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EventIcon from "@mui/icons-material/Event";
import { categorizedAwards } from './dataStores/AwardsObject';

const Awards = () => {
  return (
    <Box
      id="awards"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: { xs: "1rem", sm: "2rem" },
        overflowY: "auto",
      }}
    >
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Awards and Honors
        </Typography>

        {/* Academic Honors */}
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            🎓 Academic Honors
          </Typography>
          <List>
            {categorizedAwards.academicHonors.map((honor, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={honor} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Hackathons & Competitions */}
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            🏆 Hackathons & Competitions
          </Typography>
          <List>
            {categorizedAwards.hackathonsCompetitions.map((competition, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <EmojiEventsIcon />
                </ListItemIcon>
                <ListItemText primary={competition} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Photography Achievements */}
        <Box sx={{ marginBottom: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            📸 Photography Achievements
          </Typography>
          <List>
            {categorizedAwards.photographyAchievements.map((achievement, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CameraAltIcon />
                </ListItemIcon>
                <ListItemText primary={achievement} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Invited Events */}
        <Box>
          <Typography variant="h5" gutterBottom>
            📅 Invited Events
          </Typography>
          {categorizedAwards.invitedEvents.map((event, index) => (
            <Box key={index} sx={{ marginBottom: "1rem" }}>
              <Typography
                variant="h6"
                component="a"
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "none", color: "#1976d2" }}
              >
                {event.name}
              </Typography>
              {event.details.length > 0 && (
                <List>
                  {event.details.map((detail, detailIndex) => (
                    <ListItem key={detailIndex}>
                      <ListItemIcon>
                        <EventIcon />
                      </ListItemIcon>
                      <ListItemText primary={detail} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Awards;
