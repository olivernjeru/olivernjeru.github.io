import React, { useState, useEffect } from 'react';
import { Typography, Container, Skeleton } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { imageList } from './dataStores/ArtGallery';

const ArtGallery = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay of 2 seconds
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Box id="art"
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
                <ImageList variant="masonry" cols={3} gap={8}>
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
