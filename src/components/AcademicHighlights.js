import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid2,
  IconButton,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Grow,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SectionHeader from './SectionHeader';
import { academics } from './dataStores/AcademicsObject';

// Lightweight image carousel used for cards that provide a `gallery` array
const ImageCarousel = ({ images = [], alt = '', height = 140, interval = 3000 }) => {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  const src = images && images.length ? images[index] : undefined;
  if (!src) return null;
  return (
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        image={src}
        alt={alt}
        height={height}
        sx={{ objectFit: 'cover' }}
      />
      {images.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor:
                  i === index ? theme.palette.primary.main : 'rgba(255,255,255,0.7)',
                boxShadow: '0 0 0 1px rgba(0,0,0,0.2) inset',
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

const AcademicHighlights = () => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const cols = isXs ? 1 : isSm ? 2 : 3;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const skeletonArray = Array.from(new Array(cols * 2));

  return (
    <Box
      id="academics"
      sx={{
        minHeight: '60vh',
        py: { xs: 4, sm: 6 },
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <SectionHeader
          icon={SchoolIcon}
          title="Academic Highlights"
          subtitle="Selected coursework projects and outcomes"
          delay={700}
        />

        {/* Leadership & Impact summary removed as requested; details remain within individual cards */}

        <Grid2 container rowSpacing={4} columnSpacing={4} disableEqualOverflow>
          {(loading ? skeletonArray : academics).map((item, idx) => {
            const anchorId = item && (item.courseCode || item.title)
              ? `academics-${String(item.courseCode || item.title).toUpperCase().replace(/\s+/g, '')}`
              : undefined;
            return (
              <Grow in timeout={300 + idx * 100} key={idx}>
                <Grid2
                  size={{ xs: 12, sm: 6, md: 4 }}
                  id={anchorId}
                  sx={{ scrollMarginTop: { xs: '100px', sm: '100px' } }}
                >
                  {loading ? (
                    <Skeleton
                      variant="rectangular"
                      width="100%"
                      height={260}
                      animation="wave"
                      sx={{ borderRadius: 2 }}
                    />
                  ) : (
                    <Card
                      elevation={3}
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.03)' },
                      }}
                    >
                      {item.gallery?.length ? (
                        <ImageCarousel images={item.gallery} alt={item.title} height={140} />
                      ) : item.img ? (
                        <CardMedia component="img" image={item.img} alt={item.title} height="140" sx={{ objectFit: 'cover' }} />
                      ) : (
                        <Box
                          sx={{
                            height: 140,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.action.hover,
                          }}
                        >
                          <FolderOpenOutlinedIcon
                            sx={{ fontSize: 48, color: theme.palette.text.secondary }}
                          />
                        </Box>
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                            {`${(item.courseCode || '').toUpperCase().replace(/\s+/g, '')}: ${(item.title || '').toUpperCase()}`}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.summary}
                        </Typography>

                        {item.skills && (
                          <Box mt={1} sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {item.skills.split(',').map((s, i) => (
                              <Chip key={i} size="small" label={s.trim()} color="secondary" />
                            ))}
                          </Box>
                        )}

                        <Divider sx={{ my: 1.5 }} />

                        <List dense disablePadding>
                          {item.achievements?.slice(0, 2).map((ach, i) => (
                            <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start' }}>
                              <ListItemText
                                primary={
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {ach.name}
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    <Typography variant="body2" color="text.secondary">
                                      {ach.description}
                                    </Typography>
                                    {ach.links?.length ? (
                                      <Box mt={0.5} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {ach.links.map((l, k) => (
                                          <Tooltip title={l.label} key={k}>
                                            <IconButton
                                              component={MuiLink}
                                              href={l.href}
                                              target="_blank"
                                              rel="noopener"
                                              size="small"
                                              sx={{ p: 0.5 }}
                                              aria-label={l.label}
                                            >
                                              <GitHubIcon fontSize="small" />
                                            </IconButton>
                                          </Tooltip>
                                        ))}
                                      </Box>
                                    ) : null}
                                  </>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                      <CardActions sx={{ justifyContent: 'flex-end' }} />
                    </Card>
                  )}
                </Grid2>
              </Grow>
            );
          })}
        </Grid2>
      </Container>
    </Box>
  );
};

export default AcademicHighlights;
