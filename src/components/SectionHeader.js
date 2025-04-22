import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Fade,
  Grow,
  Stack,
  Divider,
} from '@mui/material';

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  delay = 200,
}) => {
  const theme = useTheme();

  return (
    <>
      {/* Inject keyframes into the DOM */}
      <Box component="style">
        {`
          @keyframes underlineExpand {
            from { transform: scaleX(0); }
            to   { transform: scaleX(1); }
          }
        `}
      </Box>

      {/* Fade in the whole header */}
      <Fade in timeout={delay}>
        <Stack
          alignItems="center"
          spacing={1}
          sx={{ mb: 4, px: 2 }}
        >
          {/* Grow in the icon & title together */}
          <Grow in style={{ transformOrigin: 'center top' }} timeout={delay + 100}>
            <Box display="flex" alignItems="center">
              {Icon && (
                <Icon
                  sx={{
                    fontSize: 32,
                    color: theme.palette.primary.main,
                    transition: theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shortest,
                    }),
                    '&:hover': { transform: 'scale(1.1)' },
                  }}
                />
              )}
              <Typography
                variant="h4"
                align="center"
                sx={{ fontWeight: 700, ml: Icon ? 1 : 0 }}
              >
                {title}
              </Typography>
            </Box>
          </Grow>

          {/* Optional subtitle */}
          {subtitle && (
            <Typography variant="subtitle1" color="text.secondary">
              {subtitle}
            </Typography>
          )}

          {/* Animated underline */}
          <Divider
            sx={{
              width: 60,
              height: 4,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              transform: 'scaleX(0)',
              transformOrigin: 'left center',
              animation: 'underlineExpand 0.3s ease-out 0.2s forwards',
            }}
          />
        </Stack>
      </Fade>
    </>
  );
};

export default SectionHeader;
