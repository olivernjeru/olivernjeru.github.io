import React from "react";
import { Typography, Box, List, ListItem, Container } from "@mui/material";
import { NoUnderlineLink } from "./utilities/formats/NoUnderlineLink";
import { educationData, publications } from "./dataStores/EducationObject";

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        minHeight: "100vh", // Full viewport height
        padding: { xs: "1rem", md: "2rem" }, // Adjust padding for mobile and desktop
        display: "flex", // Flexbox for centering content
        flexDirection: "column", // Stack children vertically
        justifyContent: "flex-start", // Start content at the top
        alignItems: "center", // Optional: Center horizontally
        overflowY: "auto", // Handle overflow if content exceeds 100vh
      }}
    >
      <Container>
        {/* Section Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Education and Research
        </Typography>

        {/* Map through the education data */}
        {Object.values(educationData).map((education, index) => (
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
            {education.classes.length > 0 && (
              <List>
                <ListItem>
                  Classes: {education.classes.join(", ")}.
                </ListItem>
              </List>
            )}

            {/* Events List */}
            {education.events.length > 0 && (
              <List>
                <ListItem>Volunteered for various events:</ListItem>
                {education.events.map((event, index) => (
                  <ListItem key={index} sx={{ paddingLeft: 4 }}>
                    <NoUnderlineLink href={event.link}>{event.name}</NoUnderlineLink>
                  </ListItem>
                ))}
              </List>
            )}

            {/* Achievements List */}
            {education.achievements.length > 0 && (
              <List>
                {education.achievements.map((achievement, index) => (
                  <ListItem key={index}>{achievement}</ListItem>
                ))}
              </List>
            )}

            {/* Activities List */}
            {education.activities.length > 0 && (
              <List>
                {education.activities.map((activity, index) => (
                  <ListItem key={index}>{activity}</ListItem>
                ))}
              </List>
            )}
          </Box>
        ))}

        {/* Publications Section */}
        <Box
          id="publications"
          sx={{
            marginTop: "4rem", // Add space above the Publications section
            textAlign: { xs: "left", md: "center" },
            width: "100%",
          }}
        >
          {/* Section Title */}
          <Typography variant="h4" align="center" gutterBottom>
            Publications
          </Typography>

          {/* List of Publications */}
          <List>
            {publications.map((publication, index) => (
              <ListItem key={index} sx={{ marginBottom: "1rem" }}>
                <Typography variant="body1">
                  <NoUnderlineLink href={publication.link} color="inherit">
                    <strong>{publication.title}</strong>
                  </NoUnderlineLink>
                  {publication.description}
                  {publication.conference && (
                    <> (Presented at the {publication.conference.name}, {publication.conference.date}).</>
                  )}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Education;
