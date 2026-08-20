'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import ShoppingBag from '@mui/icons-material/ShoppingBag';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlined from '@mui/icons-material/ReplayOutlined';
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useGetProductByIdQuery } from '../../../redux/productsApi';
import { useAddToCartMutation } from '../../../redux/cartApi';
import { useAppSelector } from '../../../redux/hooks';

const SIZES = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: product, isLoading, isError } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();

  const [selectedSize, setSelectedSize] = useState('US 10');
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to add items to your cart!');
      router.push('/login');
      return;
    }

    if (!product) return;

    try {
      await addToCart({
        productId: product.id,
        quantity,
        size: selectedSize,
      }).unwrap();
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const displayImage =
    product?.imageUrl && product.imageUrl.startsWith('/images/')
      ? product.imageUrl
      : '/images/4.png';

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f9f9f9' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        {/* Back Navigation */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => router.back()}
            startIcon={<ArrowBack />}
            sx={{
              color: '#000000',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' },
            }}
          >
            Back to Products
          </Button>
        </Box>

        {/* Loading State */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
            <CircularProgress color="primary" size={50} />
          </Box>
        )}

        {/* Error State */}
        {isError && (
          <Alert severity="error" sx={{ my: 4, borderRadius: 2 }}>
            Product not found or failed to load. Please check the product ID and ensure the backend server is running.
          </Alert>
        )}

        {/* Product Details Content */}
        {!isLoading && !isError && product && (
          <Grid container spacing={6} sx={{ alignItems: 'stretch' }}>
            {/* Left Column: Product Showcase / Image */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '24px',
                  bgcolor: '#efefef',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 480,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Tag Chip */}
                {product.tag && (
                  <Chip
                    label={product.tag}
                    sx={{
                      position: 'absolute',
                      top: 24,
                      left: 24,
                      bgcolor: product.tag === 'NEW' ? '#ff3939' : '#000000',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      letterSpacing: '0.05em',
                      px: 1,
                      zIndex: 2,
                    }}
                  />
                )}

                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 380,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    width={400}
                    height={320}
                    style={{
                      objectFit: 'contain',
                      filter: 'drop-shadow(0px 15px 25px rgba(0,0,0,0.2))',
                    }}
                    priority
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Right Column: Information & Actions */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#888888',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontSize: '0.85rem',
                    mb: 1,
                  }}
                >
                  {product.category || 'LIFESTYLE'}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    color: '#000000',
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    lineHeight: 1.15,
                    mb: 2,
                  }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: '#ff3939',
                    fontSize: '2rem',
                    mb: 3,
                  }}
                >
                  ${Number(product.price).toFixed(2)}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: '#555555',
                    fontSize: '1rem',
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  {product.description ||
                    'Step up your sneaker game with unmatched comfort and iconic performance. Designed for lightweight cushioning and maximum dynamic support.'}
                </Typography>

                <Divider sx={{ mb: 4 }} />

                {/* Size Selection */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#000000', mb: 1.5 }}>
                    Select Size
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {SIZES.map((size) => (
                      <Button
                        key={size}
                        variant={selectedSize === size ? 'contained' : 'outlined'}
                        onClick={() => setSelectedSize(size)}
                        sx={{
                          minWidth: 70,
                          height: 44,
                          borderRadius: '12px',
                          fontWeight: 700,
                          bgcolor: selectedSize === size ? '#000000' : '#ffffff',
                          color: selectedSize === size ? '#ffffff' : '#000000',
                          borderColor: selectedSize === size ? '#000000' : '#e0e0e0',
                          '&:hover': {
                            bgcolor: selectedSize === size ? '#333333' : '#f5f5f5',
                            borderColor: '#000000',
                          },
                        }}
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Quantity Controls & Add to Cart Button */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, alignItems: 'center' }}>
                  {/* Quantity Selector */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid #e0e0e0',
                      borderRadius: '35px',
                      p: 0.5,
                      bgcolor: '#ffffff',
                    }}
                  >
                    <IconButton size="small" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                      <Remove fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 2.5, fontWeight: 800, minWidth: 32, textAlign: 'center' }}>
                      {quantity}
                    </Typography>
                    <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    variant="contained"
                    startIcon={isAdding ? <CircularProgress size={20} color="inherit" /> : <ShoppingBag />}
                    sx={{
                      flexGrow: 1,
                      minWidth: 200,
                      height: 52,
                      bgcolor: '#000000',
                      color: '#ffffff',
                      borderRadius: '35px',
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      letterSpacing: '0.05em',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: '#ff3939',
                        boxShadow: '0 8px 25px rgba(255, 57, 57, 0.4)',
                      },
                    }}
                  >
                    {isAdding ? 'Adding...' : 'ADD TO CART'}
                  </Button>
                </Box>

                {/* Value Propositions */}
                <Grid container spacing={2} sx={{ pt: 2 }}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <LocalShippingOutlined sx={{ color: '#ff3939', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                          Free Delivery
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777' }}>
                          For orders over $100
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <ReplayOutlined sx={{ color: '#ff3939', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                          30 Days Return
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777' }}>
                          Hassle free policy
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <VerifiedOutlined sx={{ color: '#ff3939', fontSize: 28 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.85rem' }}>
                          100% Authentic
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777' }}>
                          Guaranteed original
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
