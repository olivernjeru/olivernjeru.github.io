import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check for mobile screen size

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handles the scroll and closes the drawer
  const handleNavigation = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 64; // Adjust based on your Navbar height
      const offsetPosition = section.offsetTop - navbarHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
    setMenuOpen(false); // Close the drawer
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, top: 0 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Mobile Hamburger Menu Icon */}
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Home and Social Links */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            <a href="#home" style={linkStyle} onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleNavigation('home'); // Call the handleNavigation function
            }}>Home</a>
            <SocialLinks />
          </Box>
        )}

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
            <div className="nav-links" style={{ margin: 0, padding: 0 }}>
              <div style={navLinksContainerStyle}>
                {['home', 'education', 'work', 'projects', 'skills', 'awards', 'certificates', 'art'].map((section) => (
                  <a
                    href={`#${section}`}
                    style={linkStyle}
                    key={section}
                    onClick={(e) => { e.preventDefault(); handleNavigation(section); }}
                  >
                    {capitalizeFirstLetter(section)}
                  </a>
                ))}
              </div>
            </div>
          </Box>
        )}

        {/* Social Links Section - Desktop */}
        {!isMobile && <SocialLinks />}
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        open={menuOpen}
        onClose={toggleMenu}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 2, // Ensure drawer is on top of the AppBar
        }}
      >
        <Box
          sx={{
            width: 250,
            position: 'relative',
            height: '100%',
          }}
          role="presentation"
        >
          {/* Drawer Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', borderBottom: '1px solid #444', position: 'relative' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Oliver Njeru
            </Typography>
            <IconButton onClick={toggleMenu} sx={{ position: 'absolute', top: '8px', right: '8px' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer Links */}
          <List>
            {['education', 'work', 'projects', 'skills', 'awards', 'certificates', 'art'].map((section) => (
              <ListItem button onClick={() => handleNavigation(section)} key={section}>
                <ListItemText primary={capitalizeFirstLetter(section)} sx={drawerLinkStyle} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

// Social Links Component
const SocialLinks = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
    {[
      { href: 'https://github.com/olivernjeru', src: 'assets/socials/github.png', alt: 'GitHub' },
      { href: 'https://linkedin.com/in/olivernjeru', src: 'assets/socials/linkedin.svg', alt: 'LinkedIn' },
      { href: 'https://figma.com/@olivernjeru', src: 'assets/socials/figma.svg', alt: 'Figma' },
      { href: 'https://scholar.google.com/citations?user=V9-eteEAAAAJ&hl=en', src: 'assets/socials/google-scholar.svg', alt: 'Google Scholar' },
      { href: 'https://unsplash.com/olivernjeru', src: 'assets/socials/unsplash.svg', alt: 'Unsplash' }
    ].map((social) => (
      <a href={social.href} target="blank" rel="noopener" key={social.alt}>
        <img src={social.src} alt={social.alt} style={socialIconStyle} />
      </a>
    ))}
  </Box>
);

// Capitalize the first letter of each section for display
const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// CSS styles in JavaScript
const linkStyle = {
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '5px',
  transition: 'color 0.3s ease, background-color 0.3s ease',
  color: '#fff',
};

const socialIconStyle = {
  width: '30px',
  height: '30px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
};

const navLinksContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  listStyleType: 'none',
  padding: 0,
  margin: 0,
};

const drawerLinkStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 0',
};

// Hover effect for links
linkStyle['&:hover'] = {
  backgroundColor: '#444',
  color: '#ffcc00',
};

export default Navbar;
