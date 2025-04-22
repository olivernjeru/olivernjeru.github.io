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
  { href: 'https://github.com/olivernjeru', src: '/assets/socials/github.png', alt: 'GitHub' },
  { href: 'https://linkedin.com/in/olivernjeru', src: '/assets/socials/linkedin.svg', alt: 'LinkedIn' },
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
      <AppBar position="fixed" sx={{ top: 0, zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Mobile: hamburger */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
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
              px: isMobile ? 1 : 3,
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
                      mx: 1.5,
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                      px: 1,
                    }}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </Link>
                )
              )
            )}
          </Box>

          {/* Theme toggle + Social icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: isMobile ? 1 : 3 }}>
            {loading
              ? SOCIALS.map((_, i) => (
                <Skeleton key={i} variant="circular" width={32} height={32} />
              ))
              : SOCIALS.map((s) => (
                <IconButton
                  key={s.alt}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    width: 32,
                    height: 32,
                    p: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={s.src}
                    alt={s.alt}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </IconButton>
              ))}

            <IconButton color="inherit" onClick={toggleTheme}>
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box sx={{ width: 240 }} role="presentation">
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
