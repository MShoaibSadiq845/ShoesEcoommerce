'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#000000', color: '#ffffff', mt: 'auto' }}>
      {/* Thanks for watching / Glory to Ukraine section */}
      <Box sx={{ bgcolor: '#ffffff', color: '#000000', py: 6, textAlign: 'center' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#666666',
            mb: 1,
          }}
        >
          THANKS FOR WATCHING
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
          }}
        >
          Glory to Ukraine
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src="/images/5.png" alt="Ukraine Flag" style={{ width: 48, height: 'auto' }} />
        </Box>
      </Box>

      {/* Main Footer Links & Swoosh Logo */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                ALL
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                WOMAN
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                MEN
              </MuiLink>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src="/images/20.png"
                alt="Nike Swoosh Ukraine"
                style={{ maxWidth: '100%', maxHeight: 140, objectFit: 'contain' }}
              />
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', sm: 'flex-end' } }}>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                WORKOUT
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                RUN
              </MuiLink>
              <MuiLink href="#" color="inherit" underline="none" sx={{ fontWeight: 700, fontSize: '0.95rem', '&:hover': { color: '#ff3939' } }}>
                FOOTBALL
              </MuiLink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
