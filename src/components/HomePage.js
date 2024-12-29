import React from "react";
import { Typography, Box, Button, Grid, Container } from "@mui/material";
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
            <Container>
                <Typography variant="h3" gutterBottom>
                    Hi there! I am Oliver Njeru.
                </Typography>
                <Typography variant="h5" gutterBottom>
                    A Software Engineer, Research Enthusiast and Innovator.
                </Typography>
                <Typography variant="body1" paragraph>
                    I am an undergraduate student at USIU-Africa pursuing a BSc in Applied Computer Technology with a concentration
                    in Software Engineering. I enjoy interacting in a diverse environment and thrive in collaboration and team work.  In my free time, you’ll often find me traveling, swimming, gaming, or simply seeking inspiration from the world around me. Feel free to explore my personal projects, honors & awards, and experience below!
                </Typography>

                {/* Resume Button */}
                <Box sx={{ margin: "1rem 0" }}>
                    <Button
                        variant="contained"
                        href="assets/Resume/Oliver Njeru Résumé.pdf"
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
            </Container>
        </Box>
    );
};

export default HomePage;
