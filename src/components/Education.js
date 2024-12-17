import React from "react";
import { Typography, Box, List, ListItem } from "@mui/material";
import { NoUnderlineLink } from "./utilities/formats/NoUnderlineLink";

const Education = () => {
  return (
    <Box
      id="education"
      sx={{
        minHeight: "100vh", // Full viewport height
        padding: { xs: "1rem", md: "2rem" }, // Adjust padding for mobile and desktop
        backgroundColor: "#1e1e1e",
        color: "#fff",
        display: "flex", // Flexbox for centering content
        flexDirection: "column", // Stack children vertically
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Optional: Center horizontally
        overflowY: "auto", // Handle overflow if content exceeds 100vh
      }}
    >
      {/* Section Title */}
      <Typography variant="h3" align="center" gutterBottom>
        Education & Research
      </Typography>

      {/* USIU-Africa */}
      <Box sx={{ marginBottom: "2rem", textAlign: { xs: "left", md: "center" }, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          <NoUnderlineLink
            href="https://www.usiu.ac.ke/history/"
            color="inherit"
          >
            United States International University-Africa
          </NoUnderlineLink>
        </Typography>
        <Typography variant="body1">
          BSc in Applied Computer Technology, Concentration in Software Engineering
        </Typography>
        <List>
          <ListItem>
            Classes: Data Structures & Algorithms, Database Systems, Operating
            Systems, Discrete Mathematics, Object Oriented Analysis, Mobile
            Programming, Machine Learning, Business Data Analytics.
          </ListItem>
          <ListItem>
            Volunteered for various events, including the &nbsp;{" "}
            <NoUnderlineLink
              href="https://www.usiu.ac.ke/2500/pictorial-culture-week-2022/"
            >
              Culture Week
            </NoUnderlineLink>
            ,{" "}
            &nbsp;{" "} <NoUnderlineLink
              href="https://www.usiu.ac.ke/2616/endowment-dinner-success-its-touching-impact-financially-needy-students/"
            >
              Endowment Dinner
            </NoUnderlineLink>
            , and
            &nbsp;{" "} <NoUnderlineLink
              href="https://www.usiu.ac.ke/2647/placement-career-services-pacs-hosts-annual-fair/"
            >
              Career Fair
            </NoUnderlineLink>
            .
          </ListItem>
        </List>
      </Box>

      {/* AmplifyMe */}
      <Box sx={{ marginBottom: "2rem", textAlign: { xs: "left", md: "center" }, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          <NoUnderlineLink
            href="https://amplifyme.com"
            color="inherit"
          >
            AmplifyMe
          </NoUnderlineLink>
        </Typography>
        <Typography variant="body1">
          Diploma in Investment Bank Sales & Trading (Awarded March 2023)
        </Typography>
        <List>
          <ListItem>
            Modules: Investment Strategies, Equities (Apple, Tesla),
            Commodities, Currencies, Fixed Income.
          </ListItem>
          <ListItem>
            Placed second in trading simulations, scoring 90% in trades and
            commissions.
          </ListItem>
        </List>
      </Box>

      {/* Strathmore University */}
      <Box sx={{ textAlign: { xs: "left", md: "center" }, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          <NoUnderlineLink
            href="https://strathmore.edu/about-strathmore-2/"
            color="inherit"
          >
            Strathmore University
          </NoUnderlineLink>
        </Typography>
        <Typography variant="body1">
          Diploma in Business Information Technology (Graduated September 2021)
        </Typography>
        <List>
          <ListItem>Classes: Accounting, Business Finance & Economics.</ListItem>
          <ListItem>
            Activities: IEEE (Vice President), Developer Club (Social Media
            Manager), IT Students Association.
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Education;
