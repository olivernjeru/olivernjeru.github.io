import React, { useState, useEffect } from 'react';
import { Typography, Container, Skeleton } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';
import { imageList } from './dataStores/ArtGallery';

const ArtGallery = () => {
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    // Media queries to detect screen sizes
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Mobile (xs)
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md')); // Tablet (sm to md)
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // Desktop (lg and above)

    useEffect(() => {
        // Simulate a loading delay of 2 seconds
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Determine the number of columns based on the screen size
    let cols = 1;
    if (isMediumScreen) {
        cols = 2;  // For tablets (medium screens)
    } else if (isLargeScreen) {
        cols = 3;  // For desktops (large screens)
    }

    return (
        <Box
            id="art"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                padding: { xs: '1rem', sm: '2rem' },
                overflowY: 'auto',
            }}
        >
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Art Gallery
                </Typography>

                {/* ImageList with dynamic columns based on screen size */}
                <ImageList variant="masonry" cols={cols} gap={8}>
                    {loading
                        ? Array.from(new Array(9)).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                height={200}
                                animation="wave"
                                sx={{ borderRadius: 1 }}
                            />
                        ))
                        : imageList.map((item, index) => (
                            <ImageListItem key={index}>
                                <img
                                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${item.img}?w=248&fit=crop&auto=format`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                </ImageList>
            </Container>
        </Box>
    );
};

export default ArtGallery;
