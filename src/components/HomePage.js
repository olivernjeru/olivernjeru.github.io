import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Stack,
    Typography,
    Button,
    IconButton,
    GlobalStyles,
    Fade,
    useTheme,
    useMediaQuery,
    Skeleton,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArticleIcon from '@mui/icons-material/Article';

const HomePage = () => {
    const theme = useTheme();
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
    const [loading, setLoading] = useState(true);

    // Simulate content loading
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {/* Global keyframes for bounce animation */}
            <GlobalStyles styles={{
                '@keyframes bounce': {
                    '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                    '40%': { transform: 'translateY(-10px)' },
                    '60%': { transform: 'translateY(-5px)' },
                },
            }} />

            <Box
                id="home"
                component="section"
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
                {/* Centers content horizontally */}
                <Container maxWidth="md">
                    {loading ? (
                        <Stack spacing={2}>
                            <Skeleton variant="text" width="70%" height={isSmUp ? 60 : 40} />
                            <Skeleton variant="text" width="50%" height={isSmUp ? 40 : 30} />
                            <Skeleton variant="rectangular" width="100%" height={100} sx={{ borderRadius: 1 }} />
                            <Skeleton variant="rectangular" width={150} height={48} sx={{ borderRadius: 2 }} />
                        </Stack>
                    ) : (
                        <Stack spacing={3}>
                            <Fade in timeout={500}>
                                <Typography
                                    variant={isSmUp ? 'h2' : 'h4'}
                                    sx={{ fontWeight: 700 }}
                                >
                                    Yo! I'm Oliver Njeru.
                                </Typography>
                            </Fade>

                            <Fade in timeout={700}>
                                <Typography
                                    variant={isSmUp ? 'h5' : 'subtitle1'}
                                >
                                    A Founding Engineer at Replicant Trader and Research Enthusiast.
                                </Typography>
                            </Fade>

                            <Fade in timeout={900}>
                                <Typography variant="body1">
                                    I am passionate about Artificial Intelligence, Optimization, Game Theory, Machine Learning,
                                    Algorithmic Economics, and Stochastic Optimization. I love
                                    collaborating on cutting-edge research and building solutions
                                    that make a difference. Outside work, I am often traveling,
                                    swimming, or gaming and always seeking new inspiration.
                                </Typography>
                            </Fade>

                            <Fade in timeout={1100}>
                                <Box>
                                    {/* Resume Button */}
                                    <Button
                                        variant="contained"
                                        href="assets/Resume/Oliver Njeru Résumé.pdf"
                                        target="_blank"
                                        rel="noopener"
                                        startIcon={<ArticleIcon />}
                                        sx={{ padding: "1rem 2rem" }}
                                    >
                                        Résumé
                                    </Button>
                                </Box>
                            </Fade>
                        </Stack>
                    )}

                    {/* Scroll Arrow */}
                    {!loading && (
                        <IconButton
                            onClick={() => {
                                const next = document.getElementById('education');
                                if (next) {
                                    window.scrollTo({
                                        top: next.offsetTop - 64,
                                        behavior: 'smooth',
                                    });
                                }
                            }}
                            sx={{
                                position: 'absolute',
                                bottom: theme.spacing(4),
                                left: '49%',
                                transform: 'translateX(-50%)',
                                animation: 'bounce 2s infinite',
                                bgcolor: 'rgba(0,0,0,0.3)',
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                            }}
                            aria-label="Scroll to Education"
                        >
                            <ArrowDownwardIcon fontSize="large" />
                        </IconButton>
                    )}
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
