import React from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArticleIcon from "@mui/icons-material/Article"; // Import AttachFileIcon

const HomePage = () => {
    return (
        <Box
            id="home"
            sx={{
                minHeight: "100vh", // Full viewport height
                display: "flex", // Flexbox for centering
                flexDirection: "column", // Stack content vertically
                justifyContent: "center", // Center content vertically
                alignItems: "center", // Center content horizontally
                textAlign: "center",
                padding: "2rem",
                backgroundColor: "#121212",
                color: "#fff",
            }}
        >
            <Typography variant="h3" gutterBottom>
                Hi, I am Oliver Njeru.
            </Typography>
            <Typography variant="h5" gutterBottom>
                A Software Engineering & Research Enthusiast.
            </Typography>
            <Typography variant="body1" paragraph>
                I am an undergraduate student at USIU-Africa pursuing a BSc in Applied Computer Technology with a concentration
                in Software Engineering. I am interested in Software Engineering and Research. In my free time, I enjoy creating
                and sharing my art & creations on Unsplash & Dribbble. I occasionally travel, swim, and game. Please check out
                my personal projects, honors & awards, and experience below!
            </Typography>

            {/* Resume Button */}
            <Box sx={{ margin: "1rem 0" }}>
                <Button
                    variant="contained"
                    href="assets/Resume/Njeru Oliver USIU-Africa Résumé.pdf"
                    target="_blank"
                    rel="noopener"
                    startIcon={<ArticleIcon />}
                    sx={{ padding: "1rem 2rem" }}
                >
                    Resume
                </Button>
            </Box>

            {/* Scroll Arrow */}
            <Grid container justifyContent="center" sx={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)" }}>
                <ArrowDownwardIcon
                    fontSize="large"
                    sx={{
                        color: "#fff",
                        animation: "bounce 2s infinite", // Bounce animation
                    }}
                />
            </Grid>

            {/* Adding keyframes for the bounce animation */}
            <style>
                {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
            </style>
        </Box>
    );
};

export default HomePage;
