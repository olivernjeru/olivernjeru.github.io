import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid, Container, Skeleton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArticleIcon from "@mui/icons-material/Article";

const HomePage = () => {
    const [loading, setLoading] = useState(true);

    // Use good old simulate content loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 2 seconds
        }, 2000);
        return () => clearTimeout(timer); // Clean up the timer on unmount
    }, []);

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
            }}
        >
            <Container>
                {loading ? (
                    <>
                        {/* Skeleton for the main heading */}
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="60%"
                            height={40}
                            sx={{ margin: "auto", mb: 2 }}
                        />
                        {/* Skeleton for the subheading */}
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="50%"
                            height={30}
                            sx={{ margin: "auto", mb: 3 }}
                        />
                        {/* Skeleton for the paragraph */}
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width="100%"
                            height={100}
                            sx={{ mb: 3, borderRadius: 1 }}
                        />
                        {/* Skeleton for the button */}
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={150}
                            height={50}
                            sx={{ margin: "auto", borderRadius: 3 }}
                        />
                    </>
                ) : (
                    <>
                        <Typography variant="h3" gutterBottom>
                            Yoh! I'm Oliver Njeru.
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            A Research Enthusiast.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            I am very much interested in Research in the following areas: Optimization, Game Theory, Machine Learning, Algorithmic Economics, and Stochastic Optimization. I enjoy diverse interactions and thrive in collaboration and teamwork. In my free time, you’ll often find me traveling, swimming, gaming, or simply seeking inspiration from the world around me. Feel free to explore my experience, projects, and more below!
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
                    </>
                )}
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
