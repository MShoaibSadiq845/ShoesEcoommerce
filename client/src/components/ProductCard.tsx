'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CircularProgress,
} from '@mui/material';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import { Product } from '../redux/productsApi';
import { useAddToCartMutation } from '../redux/cartApi';
import { useAppSelector } from '../redux/hooks';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [addToCart, { isLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart!');
      router.push('/login');
      return;
    }

    try {
      await addToCart({ productId: product.id, quantity: 1, size: 'US 10' }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  // Standardize image path to /images/*.png if needed
  const displayImage = product.imageUrl && product.imageUrl.startsWith('/images/')
    ? product.imageUrl
    : '/images/4.png';

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: '18px',
        bgcolor: '#efefef',
        boxShadow: '5px 5px 25px rgba(0, 0, 0, 0.15)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '5px 12px 30px rgba(0, 0, 0, 0.22)',
        },
      }}
    >
      {/* Tag Chip */}
      {product.tag && (
        <Chip
          label={product.tag}
          size="small"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: product.tag === 'NEW' ? '#ff3939' : '#000000',
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
            zIndex: 2,
          }}
        />
      )}

      {/* Image container */}
      <Box
        sx={{
          p: 3,
          pt: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 240,
          position: 'relative',
        }}
      >
        <Image
          src={displayImage}
          alt={product.name}
          width={220}
          height={180}
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.18))',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 3 }}>
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: '#888888',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 0.5,
            }}
          >
            {product.category}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: '1.15rem',
              color: '#000000',
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            {product.name}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              color: '#000000',
              fontSize: '1.25rem',
            }}
          >
            ${Number(product.price).toFixed(2)}
          </Typography>

          <Button
            onClick={handleAddToCart}
            disabled={isLoading}
            variant="contained"
            sx={{
              bgcolor: '#000000',
              color: '#ffffff',
              minWidth: 44,
              width: 44,
              height: 44,
              borderRadius: '50%',
              p: 0,
              boxShadow: 'none',
              '&:hover': {
                bgcolor: '#ff3939',
                boxShadow: '0 4px 12px rgba(255, 57, 57, 0.4)',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <ShoppingBag sx={{ fontSize: 20 }} />
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
