'use client';

import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';

export default function MembershipBanner() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: '#000000',
          mb: 3,
          fontSize: { xs: '1.6rem', md: '2.4rem' },
        }}
      >
        MORE NIKE PRODUCTS
      </Typography>

      <Box
        sx={{
          borderRadius: '18px',
          overflow: 'hidden',
          minHeight: { xs: 220, md: 300 },
          backgroundImage: "url('/images/image 11 (1).png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          p: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 450, color: '#ffffff', zIndex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.5rem', md: '2.2rem' },
              lineHeight: 1.2,
              mb: 1.5,
              textTransform: 'uppercase',
            }}
          >
            YOUR NIKE MEMBERSHIP
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '0.85rem', md: '1rem' },
              mb: 3,
              opacity: 0.9,
            }}
          >
            Join our members and show your love with Nike By You!
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#ffffff',
              color: '#000000',
              fontWeight: 800,
              px: 3,
              py: 1,
              borderRadius: '20px',
              textTransform: 'none',
              '&:hover': { bgcolor: '#ff3939', color: '#ffffff' },
            }}
          >
            Join Us
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
