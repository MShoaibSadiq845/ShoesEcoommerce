'use client';

import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

export default function HeroBanner() {
  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: '#010010',
        backgroundImage: "url('/images/10.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        minHeight: { xs: 260, md: 340 },
        py: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
        my: 2,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: { xs: '100%', md: 550 }, position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
              fontWeight: 900,
              fontStyle: 'italic',
              mb: 1.5,
              letterSpacing: '0.02em',
            }}
          >
            WE ARE NEVER DONE
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.85rem', sm: '1rem', md: '1.1rem' },
              mb: 3,
              lineHeight: 1.5,
              color: '#E2E8F0',
            }}
          >
            Celebrating 50 years of Nike from May 16th!
            <br />
            Exclusive products, experiences and much more await you for five days. Scan and join the Nike app!
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#ffffff',
              color: '#000000',
              fontWeight: 800,
              px: 4,
              py: 1.2,
              borderRadius: '25px',
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#ff3939',
                color: '#ffffff',
              },
            }}
          >
            Celebrate with us
          </Button>
        </Box>
      </Container>
    </Box>
  );
}