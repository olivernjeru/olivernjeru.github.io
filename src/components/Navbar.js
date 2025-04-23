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
const ICON_DIM = '1.5rem';          // uniform icon dimension

export default function Navbar({ themeMode, toggleTheme }) {
  const theme = useTheme();                                                        // useTheme for palette access
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));                    // responsive check
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState('home');                                    // track active section

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.offsetTop - 64;
      window.scrollTo({ top: offset > 0 ? offset : 0, behavior: 'smooth' });         // smooth scrolling
    }
    setActive(sectionId);                                                           // update active on click
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0 }}>                                     {/* AppBar component */}
        <Toolbar>
          {/* Mobile: hamburger */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              size={ICON_BUTTON_SIZE}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <MenuIcon fontSize="inherit" />
            </IconButton>
          )}

          {/* Desktop nav links or mobile “Home” + icon */}
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
                <Skeleton variant="rectangular" width={ICON_DIM} height={ICON_DIM} />  // Skeleton while loading
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
                      fontWeight: active === sec ? 600 : 500,                  // bold active link
                      borderBottom: active === sec
                        ? `2px solid ${theme.palette.secondary.main}`        // bottom border for active
                        : '2px solid transparent',
                      mx: 1,
                      px: 0.5,
                      py: 0.5,
                      '&:hover': {
                        borderColor: theme.palette.secondary.light,          // hover border color
                      },
                    }}
                    aria-current={active === sec ? 'page' : undefined}       // accessibility attribute
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
                <Skeleton key={i} variant="circular" width={ICON_DIM} height={ICON_DIM} />
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
              aria-label="Toggle light/dark mode"
            >
              {themeMode === 'dark'
                ? <Brightness7Icon fontSize="inherit" />
                : <Brightness4Icon fontSize="inherit" />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            zIndex: theme.zIndex.drawer + 1,
          },
        }}
      >                                                                               {/* Drawer component */}
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
            <IconButton size={ICON_BUTTON_SIZE} onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <List>
            {SECTIONS.slice(1).map((sec) => (                                  // omit “home” in drawer
              <ListItem key={sec} disablePadding>
                <ListItemButton onClick={() => handleNavigation(sec)}>
                  <ListItemText
                    primary={sec.charAt(0).toUpperCase() + sec.slice(1)}
                    slotProps={{
                      primary: { sx: { fontWeight: active === sec ? 600 : 500 } }
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
}
