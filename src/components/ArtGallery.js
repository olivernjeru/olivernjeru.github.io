import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
  Grow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Masonry } from '@mui/lab';
import SectionHeader from './SectionHeader';
import { imageList } from './dataStores/ArtGalleryObject';

const ArtGallery = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  const columns = isXs ? 1 : isSm ? 2 : isMd ? 2 : 3;
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, src: '', title: '', description: '' });

  useEffect(() => {
    // Simulate a loading delay of 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = (item) => {
    setLightbox({
      open: true,
      src: item.img,
      title: item.title,
      description: item.description,
    });
  };
  const handleClose = () => setLightbox({ open: false, src: '', title: '', description: '' });

  return (
    <Box
      id="art"
      sx={{
        padding: { xs: '1rem', sm: '2rem' },
        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={require('@mui/icons-material/PhotoCamera').default}
          title="Art Gallery"
          subtitle="A Showcase of My Artistic Photography Work"
          delay={800}
        />

        <Masonry columns={columns} spacing={2}>
          {(loading ? Array.from(new Array(columns * 3)) : imageList).map((item, idx) => (
            <Grow in timeout={300 + idx * 100} key={idx}>
              <Box
                onClick={() => !loading && handleOpen(item)}
                sx={{
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: loading ? 'default' : 'pointer',
                  transition: theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shortest,
                  }),
                  '&:hover': { transform: loading ? 'none' : 'scale(1.03)' },
                  '&:hover .overlay': { opacity: loading ? 0 : 1 },
                }}
              >
                {loading ? (
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    animation="wave"
                    sx={{ borderRadius: 2 }}
                  />
                ) : (
                  <>
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', display: 'block' }}
                    />
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        p: 1,
                        bgcolor: 'rgba(0, 0, 0, 0.6)',
                        color: '#fff',
                        opacity: 0,
                        transition: theme.transitions.create('opacity', {
                          duration: theme.transitions.duration.shortest,
                        }),
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom noWrap>
                        {item.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Grow>
          ))}
        </Masonry>

        {/* Lightbox Dialog */}
        <Dialog open={lightbox.open} onClose={handleClose} maxWidth="lg">
          <DialogContent sx={{ position: 'relative', p: 0 }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 8, right: 8, color: '#fff', zIndex: 1 }}
            >
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={lightbox.src}
              alt={lightbox.title}
              sx={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <Box sx={{ p: 2, bgcolor: theme.palette.background.paper }}>
              <Typography variant="h6">{lightbox.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {lightbox.description}
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ArtGallery;
