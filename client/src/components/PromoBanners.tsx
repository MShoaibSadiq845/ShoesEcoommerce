'use client';

import React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';

export default function PromoBanners() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: '#efefef',
              borderRadius: '18px',
              p: { xs: 3, md: 5 },
              boxShadow: '5px 5px 25px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 240,
              backgroundImage: "url('/images/8.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right bottom',
              backgroundSize: { xs: '180px auto', md: '240px auto' },
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: '#ff3939',
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
              >
                -20%{' '}
                <Typography component="span" variant="h4" sx={{ fontWeight: 800, color: '#ff3939' }}>
                  Discount
                </Typography>
              </Typography>
              <Typography variant="h6" sx={{ color: '#202727', fontWeight: 500, mt: 1, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                on your first purchase
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#000000',
                color: '#ffffff',
                width: 'fit-content',
                px: 4,
                py: 1.2,
                mt: 3,
                borderRadius: '16px',
                fontWeight: 600,
                '&:hover': { bgcolor: '#ff3939' },
              }}
            >
              Shop now
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              bgcolor: '#efefef',
              borderRadius: '18px',
              p: { xs: 3, md: 5 },
              boxShadow: '5px 5px 25px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 240,
              backgroundImage: "url('/images/16.png')",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right bottom',
              backgroundSize: { xs: '160px auto', md: '220px auto' },
            }}
          >
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: '#ff3939',
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
              >
                -20%{' '}
                <Typography component="span" variant="h4" sx={{ fontWeight: 800, color: '#ff3939' }}>
                  Discount
                </Typography>
              </Typography>
              <Typography variant="h6" sx={{ color: '#202727', fontWeight: 500, mt: 1, fontSize: { xs: '0.9rem', md: '1.1rem' } }}>
                on your first purchase
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#000000',
                color: '#ffffff',
                width: 'fit-content',
                px: 4,
                py: 1.2,
                mt: 3,
                borderRadius: '16px',
                fontWeight: 600,
                '&:hover': { bgcolor: '#ff3939' },
              }}
            >
              Shop now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
