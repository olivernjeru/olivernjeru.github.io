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
    <AppBar position="fixed" sx={{ backgroundColor: '#333', zIndex: (theme) => theme.zIndex.drawer + 1, top: 0 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Mobile Hamburger Menu Icon */}
        {isMobile && (
          <IconButton color="inherit" edge="start" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Mobile Home and Social Links */}
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a href="#home" style={linkStyle}>Home</a>
            <a href="https://github.com/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/github.png" alt="GitHub" style={socialIconStyle} />
            </a>
            <a href="https://linkedin.com/in/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/linkedin.svg" alt="LinkedIn" style={socialIconStyle} />
            </a>
            <a href="https://figma.com/@olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/figma.svg" alt="Figma" style={socialIconStyle} />
            </a>
            <a href="https://dribbble.com/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/dribbble.svg" alt="Dribbble" style={socialIconStyle} />
            </a>
            <a href="https://unsplash.com/olivernjeru" target="blank" rel="noopener noreferrer">
              <img src="assets/socials/unsplash.svg" alt="Unsplash" style={socialIconStyle} />
            </a>
          </Box>
        )}

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
            <div className="nav-links" style={{ margin: 0, padding: 0 }}>
              <div style={navLinksContainerStyle}>
                <a href="#home" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>Home</a>
                <a href="#education" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('education'); }}>Education</a>
                <a href="#work" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('work'); }}>Work Experience</a>
                <a href="#projects" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('projects'); }}>Projects</a>
                <a href="#skills" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('skills'); }}>Skills</a>
                <a href="#awards-and-honors" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('awards-and-honors'); }}>Awards & Honors</a>
                <a href="#certificates" style={linkStyle} onClick={(e) => { e.preventDefault(); handleNavigation('certificates'); }}>Certificates</a>
              </div>
            </div>
          </Box>
        )}

        {/* Social Links Section - Desktop */}
        {!isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <a href="https://github.com/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/github.png" alt="GitHub" style={socialIconStyle} />
            </a>
            <a href="https://linkedin.com/in/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/linkedin.svg" alt="LinkedIn" style={socialIconStyle} />
            </a>
            <a href="https://figma.com/@olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/figma.svg" alt="Figma" style={socialIconStyle} />
            </a>
            <a href="https://dribbble.com/olivernjeru" target="blank" rel="noopener">
              <img src="assets/socials/dribbble.svg" alt="Dribbble" style={socialIconStyle} />
            </a>
            <a href="https://unsplash.com/olivernjeru" target="blank" rel="noopener noreferrer">
              <img src="assets/socials/unsplash.svg" alt="Unsplash" style={socialIconStyle} />
            </a>
          </Box>
        )}
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
            backgroundColor: '#333',
            color: 'white',
            position: 'relative',
            height: '100%',
          }}
          role="presentation"
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px',
              borderBottom: '1px solid #444',
              position: 'relative',
              zIndex: 2, // Ensure this is above everything else
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: 'center', color: 'white' }}
            >
              Oliver Njeru
            </Typography>
            <IconButton
              onClick={toggleMenu}
              sx={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                color: 'white',
                zIndex: 3, // Ensure button is above everything
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Drawer Links */}
          <List>
            <ListItem button onClick={() => handleNavigation('education')}>
              <ListItemText primary="Education" sx={drawerLinkStyle} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('work')}>
              <ListItemText primary="Work Experience" sx={drawerLinkStyle} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('projects')}>
              <ListItemText primary="Projects" sx={drawerLinkStyle} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('skills')}>
              <ListItemText primary="Skills" sx={drawerLinkStyle} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('awards-and-honors')}>
              <ListItemText primary="Awards & Honors" sx={drawerLinkStyle} />
            </ListItem>
            <ListItem button onClick={() => handleNavigation('certificates')}>
              <ListItemText primary="Certificates" sx={drawerLinkStyle} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

// CSS styles in JavaScript
const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '5px',
  transition: 'color 0.3s ease, background-color 0.3s ease',
};

const socialIconStyle = {
  width: '30px',
  height: '30px',
  transition: 'transform 0.3s ease',
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
  color: 'white',
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '12px 0',
};

export default Navbar;
