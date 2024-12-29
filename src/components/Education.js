import React from "react";
import { Typography, Box, List, ListItem, Container } from "@mui/material";
import { NoUnderlineLink } from "./utilities/formats/NoUnderlineLink";
import { educationData } from "./dataStores/Education";

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        minHeight: "100vh", // Full viewport height
        padding: { xs: "1rem", md: "2rem" }, // Adjust padding for mobile and desktop
        display: "flex", // Flexbox for centering content
        flexDirection: "column", // Stack children vertically
        justifyContent: 'flex-start', // Start content at the top
        alignItems: "center", // Optional: Center horizontally
        overflowY: "auto", // Handle overflow if content exceeds 100vh
      }}
    >
      <Container>
        {/* Section Title */}
        <Typography variant="h3" align="center" gutterBottom>
          Education & Research
        </Typography>

        {/* Map through the education data */}
        {educationData.map((education, index) => (
          <Box
            key={index}
            sx={{
              marginBottom: "2rem",
              textAlign: { xs: "left", md: "center" },
              width: "100%",
            }}
          >
            {/* Education Name */}
            <Typography variant="h5" gutterBottom>
              <NoUnderlineLink href={education.link} color="inherit">
                {education.name}
              </NoUnderlineLink>
            </Typography>
            {/* Degree/Certification */}
            <Typography variant="body1" gutterBottom>
              {education.degree}
            </Typography>

            {/* Classes or Modules List */}
            {education.name === "AmplifyMe" ? (
              // For AmplifyMe, use 'Modules'
              education.classes.length > 0 && (
                <List>
                  <ListItem>
                    Modules: {education.classes.join(", ")}.
                  </ListItem>
                </List>
              )
            ) : (
              // For other institutions, use 'Classes'
              education.classes.length > 0 && (
                <List>
                  <ListItem>
                    Classes: {education.classes.join(", ")}.
                  </ListItem>
                </List>
              )
            )}

            {/* Events List (Volunteered Events) */}
            {education.events.length > 0 && (
              <List>
                <ListItem>
                  Volunteered for various events, including
                  {education.events.map((event, index) => (
                    <span key={index}>
                      <NoUnderlineLink href={event.link} color="inherit">
                        {event.name}
                      </NoUnderlineLink>
                      {index < education.events.length - 1 ? ", " : "."}
                    </span>
                  ))}
                </ListItem>
              </List>
            )}

            {/* Achievements List */}
            {education.achievements && education.achievements.length > 0 && (
              <List>
                {education.achievements.map((achievement, index) => (
                  <ListItem key={index}>{achievement}</ListItem>
                ))}
              </List>
            )}

            {/* Activities List */}
            {education.activities && education.activities.length > 0 && (
              <List>
                {education.activities.map((activity, index) => (
                  <ListItem key={index}>{activity}</ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Education;
