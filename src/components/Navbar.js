import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
  Skeleton,
  Button,
  Link,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const SECTIONS = [
  'home',
  'education',
  'work',
  'projects',
  'skills',
  'awards',
  'certificates',
  'art',
];

const SOCIALS = [
  { href: 'https://github.com/olivernjeru', icon: <GitHubIcon />, alt: 'GitHub' },
  { href: 'https://linkedin.com/in/olivernjeru', icon: <LinkedInIcon />, alt: 'LinkedIn' },
  { href: 'https://figma.com/@olivernjeru', src: '/assets/socials/figma.svg', alt: 'Figma' },
  { href: 'https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en', src: '/assets/socials/google-scholar.svg', alt: 'Google Scholar' },
  { href: 'https://unsplash.com/olivernjeru', src: '/assets/socials/unsplash.svg', alt: 'Unsplash' },
];

const Navbar = ({ themeMode, toggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 64;
      const offset = section.offsetTop - navbarHeight;
      window.scrollTo({ top: offset > 0 ? offset : 0, behavior: 'smooth' });
    }
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0 }}>
        <Toolbar>
          {/* Mobile: hamburger */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop nav links or mobile “Home” + icons */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'space-between' : 'flex-start',
            }}
          >
            {isMobile ? (
              loading ? (
                <Skeleton variant="rectangular" width={80} height={32} />
              ) : (
                <Button
                  onClick={() => handleNavigation('home')}
                  sx={{ color: '#fff', textTransform: 'none' }}
                >
                  Home
                </Button>
              )
            ) : (
              SECTIONS.map((sec) =>
                loading ? (
                  <Skeleton
                    key={sec}
                    variant="rectangular"
                    width={60}
                    height={32}
                    sx={{ mx: 1 }}
                  />
                ) : (
                  <Link
                    key={sec}
                    component="button"
                    underline="none"
                    onClick={() => handleNavigation(sec)}
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                      mx: 0.5,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      px: 0.3,
                    }}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </Link>
                )
              )
            )}
          </Box>

          {/* Theme toggle + Social icons */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
          }}>
            {loading
              ? SOCIALS.map((_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={{ xs: 28, sm: 32 }}
                  height={{ xs: 28, sm: 32 }}
                />
              ))
              : SOCIALS.map((s) => (
                <IconButton
                  key={s.alt}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.alt}
                  sx={{
                    width: { xs: 22, sm: 25 },
                    height: { xs: 22, sm: 25 },
                    p: 0,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    },
                    color: 'inherit'
                  }}
                >
                  {s.icon ? s.icon : (
                    <Box
                      component="img"
                      src={s.src}
                      alt={s.alt}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        p: { xs: 0.5, sm: 0 }, // Adjust padding for different sizes. Larger numbers equal smaller img sizes
                      }}
                    />
                  )}
                </IconButton>
              ))}

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              sx={{
                width: { xs: 34, sm: 40 },
                height: { xs: 34, sm: 40 }
              }}
            >
              {themeMode === 'dark' ? (
                <Brightness7Icon fontSize={isMobile ? 'small' : 'medium'} />
              ) : (
                <Brightness4Icon fontSize={isMobile ? 'small' : 'medium'} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
          sx: {
            zIndex: theme.zIndex.modal + 1, // Higher than default modal z-index
          }
        }}
        slotPropos={{
          paper: {
            sx: {
              width: 240,
              zIndex: (theme) => theme.zIndex.modal + 2, // Ensure paper is above the modal backdrop
            },
          },
        }}
      >
        <Box sx={{ height: '100%' }} role="presentation">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h6">Oliver Njeru</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {loading
              ? SECTIONS.slice(1).map((_, i) => (
                <Skeleton key={i} variant="rectangular" width="80%" height={32} sx={{ m: 1 }} />
              ))
              : SECTIONS.slice(1).map((sec) => (
                <ListItem key={sec} disablePadding>
                  <ListItemButton onClick={() => handleNavigation(sec)}>
                    <ListItemText
                      primary={sec.charAt(0).toUpperCase() + sec.slice(1)}
                      slotProps={{
                        primary: { sx: { fontWeight: 600 } },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
