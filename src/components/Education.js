import React from "react";
import { Typography, Box, Link, List, ListItem } from "@mui/material";

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
          <Link
            href="https://www.usiu.ac.ke/history/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            United States International University-Africa
          </Link>
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
            Volunteered for various events, including the{" "}
            <Link
              href="https://www.usiu.ac.ke/2500/pictorial-culture-week-2022/"
              target="_blank"
              rel="noopener"
            >
              Culture Week
            </Link>
            ,{" "}
            <Link
              href="https://www.usiu.ac.ke/2616/endowment-dinner-success-its-touching-impact-financially-needy-students/"
              target="_blank"
              rel="noopener"
            >
              Endowment Dinner
            </Link>
            , and{" "}
            <Link
              href="https://www.usiu.ac.ke/2647/placement-career-services-pacs-hosts-annual-fair/"
              target="_blank"
              rel="noopener"
            >
              Career Fair
            </Link>
            .
          </ListItem>
        </List>
      </Box>

      {/* AmplifyMe */}
      <Box sx={{ marginBottom: "2rem", textAlign: { xs: "left", md: "center" }, width: "100%" }}>
        <Typography variant="h5" gutterBottom>
          <Link
            href="https://amplifyme.com"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            AmplifyMe
          </Link>
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
          <Link
            href="https://strathmore.edu/about-strathmore-2/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            Strathmore University
          </Link>
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
