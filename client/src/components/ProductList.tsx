'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Container,
  Grid,
  Typography,
  Box,
  Skeleton,
  Alert,
  Paper,
  IconButton,
} from '@mui/material';
import NorthEast from '@mui/icons-material/NorthEast';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../redux/productsApi';

export default function ProductList() {
  const router = useRouter();
  const { data: products, isLoading, isError } = useGetProductsQuery();

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      {/* 1. Top Ticker Banner ("JUST DO IT") */}
      <Box
        sx={{
          width: '100%',
          mb: 2,
          borderRadius: '8px',
          overflow: 'hidden',
          lineHeight: 0,
        }}
      >
        <Image
          src="/images/21.png"
          alt="Just Do It Ticker"
          width={1400}
          height={40}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority
        />
      </Box>

      {/* 2. Main Hero Banner with Models Background & Swoosh Overlay */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 260, sm: 340, md: 440 },
          borderRadius: '24px',
          overflow: 'hidden',
          bgcolor: '#0f172a',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        }}
      >
        <Image
          src="/images/15.png"
          alt="Summertime Mood Hero"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.95)' }}
          priority
        />
        {/* Centered White Nike Swoosh Overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
          }}
        >

        </Box>
      </Box>

      {/* 3. Two Overlapping Promo Cards (Air Jordan 1 Mid & Air Max 200 SE) */}
      <Container maxWidth="lg" sx={{ mt: { xs: -4, sm: -6, md: -10 }, position: 'relative', zIndex: 3, mb: 6 }}>
        <Grid container spacing={3}>
          {/* Card 1: Air Jordan 1 Mid Light Smoke Grey */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              onClick={() => {
                const item = products?.find((p) => p.name.toLowerCase().includes('jordan')) || products?.[0];
                if (item) router.push(`/product/${item.id}`);
              }}
              sx={{
                cursor: 'pointer',
                p: { xs: 2.5, sm: 3 },
                borderRadius: '20px',
                bgcolor: '#ffffff',
                boxShadow: '0 12px 35px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 150,
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <Box sx={{ zIndex: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#ff3939',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                  }}
                >
                  NEW
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: '#555555',
                    fontSize: '0.78rem',
                    maxWidth: 150,
                    mt: 0.5,
                    lineHeight: 1.3,
                    textTransform: 'uppercase',
                  }}
                >
                  AIR JORDAN 1 MID LIGHT SMOKE GREY
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: '#f5f5f5',
                    mt: 1.5,
                    width: 32,
                    height: 32,
                    '&:hover': { bgcolor: '#000', color: '#fff' },
                  }}
                >
                  <NorthEast sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>

              <Box sx={{ width: 180, height: 130, position: 'relative', flexShrink: 0 }}>
                <Image
                  src="/images/30.png"
                  alt="AIR JORDAN 1 MID"
                  fill
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Card 2: Air Max 200 SE */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              onClick={() => {
                const item = products?.find((p) => p.name.toLowerCase().includes('200')) || products?.[1] || products?.[0];
                if (item) router.push(`/product/${item.id}`);
              }}
              sx={{
                cursor: 'pointer',
                p: { xs: 2.5, sm: 3 },
                borderRadius: '20px',
                bgcolor: '#ffffff',
                boxShadow: '0 12px 35px rgba(0,0,0,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: 150,
                position: 'relative',
                overflow: 'visible',
                transition: 'transform 0.2s ease',
                '&:hover': { transform: 'translateY(-4px)' },
              }}
            >
              <Box sx={{ zIndex: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: '#ff3939',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                  }}
                >
                  NEW
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: '#555555',
                    fontSize: '0.78rem',
                    maxWidth: 150,
                    mt: 0.5,
                    lineHeight: 1.3,
                  }}
                >
                  Air Max 200 SE
                </Typography>
                <IconButton
                  size="small"
                  sx={{
                    bgcolor: '#f5f5f5',
                    mt: 1.5,
                    width: 32,
                    height: 32,
                    '&:hover': { bgcolor: '#000', color: '#fff' },
                  }}
                >
                  <NorthEast sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>

              <Box sx={{ width: 180, height: 130, position: 'relative', flexShrink: 0 }}>
                <Image
                  src="/images/31.png"
                  alt="Air Max 200 SE"
                  fill
                  style={{ objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))' }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 4. Subtitle Section (Summertime Mood) */}
      <Box sx={{ textAlign: 'center', py: 4, mb: 4 }}>
        <Typography variant="body1" sx={{ color: '#666666', fontWeight: 600, fontSize: '1.05rem' }}>
          At the moment
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontStyle: 'italic',
            color: '#000000',
            fontSize: { xs: '2.2rem', sm: '3rem', md: '3.8rem' },
            my: 1,
            letterSpacing: '0.02em',
          }}
        >
          SUMMERTIME MOOD
        </Typography>
        <Typography variant="body1" sx={{ color: '#666666', fontWeight: 500, fontSize: '1.05rem' }}>
          Fight the heat in a sunny look!
        </Typography>
      </Box>

      {/* 5. Top Sneakers Section Header with Slider Navigation Buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            color: '#000000',
            letterSpacing: '-0.02em',
          }}
        >
          Top sneakers
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" sx={{ border: '1px solid #e0e0e0', color: '#000' }}>
            <ArrowBack fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              bgcolor: '#000000',
              color: '#ffffff',
              '&:hover': { bgcolor: '#ff3939' },
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Loading Skeletons */}
      {isLoading && (
        <Grid container spacing={4}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid key={item} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height={400} sx={{ borderRadius: '18px' }} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Error state */}
      {isError && (
        <Alert severity="error" sx={{ my: 4, borderRadius: 2 }}>
          Failed to load products from backend API. Please make sure the NestJS server is running on port 5000.
        </Alert>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && products && (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}