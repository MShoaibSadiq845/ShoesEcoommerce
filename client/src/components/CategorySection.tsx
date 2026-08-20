'use client';

import React from 'react';
import Image from 'next/image';
import { Container, Grid, Box, Typography } from '@mui/material';

const categories = [
  { title: 'WORKOUT', image: '/images/9.png' },
  { title: 'RUN', image: '/images/7.png' },
  { title: 'FOOTBALL', image: '/images/9n9z 1.png' },
];

export default function CategorySection() {
  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: '#000000',
          mb: 6,
          fontSize: { xs: '1.6rem', md: '2.4rem' },
        }}
      >
        Buy by category
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 6 } }}>
        {categories.map((cat, idx) => {
          const isReversed = idx === 1;

          return (
            <Grid
              container
              spacing={4}
              key={idx}
              sx={{
                alignItems: 'center',
                flexDirection: {
                  xs: 'column',
                  md: isReversed ? 'row-reverse' : 'row',
                },
              }}
            >
              {/* Text Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    py: { xs: 2, md: 4 },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: '#000000',
                      fontWeight: 900,
                      fontStyle: 'italic',
                      letterSpacing: '0.15em',
                      fontSize: { xs: '2.2rem', md: '3.2rem' },
                    }}
                  >
                    {cat.title}
                  </Typography>
                </Box>
              </Grid>

              {/* Image Column */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    height: { xs: 280, sm: 340, md: 400 },
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                    width: '100%',
                  }}
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Container>
  );
}