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
  { href: 'https://github.com/olivernjeru', icon: <GitHubIcon fontSize="inherit" />, alt: 'GitHub' },
  { href: 'https://linkedin.com/in/olivernjeru', icon: <LinkedInIcon fontSize="inherit" />, alt: 'LinkedIn' },
  { href: 'https://figma.com/@olivernjeru', src: '/assets/socials/figma.svg', alt: 'Figma' },
  { href: 'https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en', src: '/assets/socials/google-scholar.svg', alt: 'Google Scholar' },
  { href: 'https://unsplash.com/olivernjeru', src: '/assets/socials/unsplash.svg', alt: 'Unsplash' },
];

const ICON_BUTTON_SIZE = 'large';   // uniform size

const ICON_DIM = '1.5rem';          // uniform icon width/height

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
      const offset = section.offsetTop - 64;
      window.scrollTo({ top: Math.max(offset, 0), behavior: 'smooth' });
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
              size={ICON_BUTTON_SIZE}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon fontSize="inherit" />
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
                <Skeleton variant="rectangular" width={ICON_DIM} height={ICON_DIM} />
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
                    width={ICON_DIM}
                    height={ICON_DIM}
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
                      px: 0.3,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                    }}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </Link>
                )
              )
            )}
          </Box>

          {/* Theme toggle + Social icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {loading
              ? SOCIALS.map((_, i) => (
                <Skeleton
                  key={i}
                  variant="circular"
                  width={ICON_DIM}
                  height={ICON_DIM}
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
                  size={ICON_BUTTON_SIZE}
                  sx={{
                    p: 0,                 // remove extra padding
                    width: ICON_DIM,
                    height: ICON_DIM,
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                >
                  {s.icon || (
                    <Box
                      component="img"
                      src={s.src}
                      alt={s.alt}
                      sx={{
                        width: ICON_DIM,
                        height: ICON_DIM,
                        objectFit: 'contain',
                      }}
                    />
                  )}
                </IconButton>
              ))}

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              size={ICON_BUTTON_SIZE}
              sx={{
                width: ICON_DIM,
                height: ICON_DIM,
                '&:hover': { transform: 'scale(1.1)' },
              }}
            >
              {themeMode === 'dark' ? (
                <Brightness7Icon fontSize="inherit" />
              ) : (
                <Brightness4Icon fontSize="inherit" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
          sx: { zIndex: theme.zIndex.modal + 1 }, // Higher than default modal z-index
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
            <IconButton size={ICON_BUTTON_SIZE} onClick={() => setDrawerOpen(false)}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <List>
            {loading
              ? SECTIONS.slice(1).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width="80%"
                  height={32}
                  sx={{ m: 1 }}
                />
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
