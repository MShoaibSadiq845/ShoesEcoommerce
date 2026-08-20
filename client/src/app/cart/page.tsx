'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  Container,
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import ArrowBack from '@mui/icons-material/ArrowBack';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
} from '../../redux/cartApi';
import { useCreateOrderMutation } from '../../redux/ordersApi';
import { useAppSelector } from '../../redux/hooks';

export default function CartPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { data: cart, isLoading, isError } = useGetCartQuery();
  const [updateCartItem, { isLoading: isUpdating }] = useUpdateCartItemMutation();
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [clearCart, { isLoading: isClearing }] = useClearCartMutation();
  const [createOrder, { isLoading: isOrdering }] = useCreateOrderMutation();

  const handleQuantityChange = async (itemId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty <= 0) {
      await removeFromCart(itemId);
    } else {
      await updateCartItem({ itemId, quantity: newQty });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeFromCart(itemId);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to place your order!');
      router.push('/login');
      return;
    }

    try {
      await createOrder().unwrap();
      await clearCart().unwrap();
      toast.success('Your order has been placed!');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to place order');
    }
  };

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f9f9f9' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => router.push('/')} sx={{ color: '#000' }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#000' }}>
              Your Shopping Cart
            </Typography>
          </Box>

          {!isEmpty && (
            <Button
              variant="text"
              color="error"
              onClick={handleClearCart}
              disabled={isClearing}
              startIcon={<DeleteOutlined />}
              sx={{ fontWeight: 600 }}
            >
              Clear Cart
            </Button>
          )}
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {/* Error */}
        {isError && (
          <Alert severity="error" sx={{ my: 4, borderRadius: 2 }}>
            Failed to connect to cart backend API. Make sure the NestJS server is running on port 5000.
          </Alert>
        )}

        {/* Empty */}
        {!isLoading && !isError && isEmpty && (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: '18px',
              bgcolor: '#ffffff',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
            }}
          >
            <ShoppingBagOutlined sx={{ fontSize: 80, color: '#ccc', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 1 }}>
              Your cart is empty
            </Typography>
            <Typography variant="body1" sx={{ color: '#777', mb: 4 }}>
              Looks like you haven&apos;t added any products to your cart yet.
            </Typography>
            <Button
              component={Link}
              href="/"
              variant="contained"
              sx={{
                bgcolor: '#000000',
                color: '#ffffff',
                px: 4,
                py: 1.5,
                borderRadius: '35px',
                fontWeight: 700,
                '&:hover': { bgcolor: '#ff3939' },
              }}
            >
              Start Shopping
            </Button>
          </Paper>
        )}

        {/* Cart Content */}
        {!isLoading && !isError && !isEmpty && (
          <Grid container spacing={4}>
            {/* Items Column */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {items.map((item) => (
                  <Paper
                    key={item.id}
                    elevation={0}
                    onClick={() => {
                      if (item.productId) {
                        router.push(`/product/${item.productId}`);
                      }
                    }}
                    sx={{
                      cursor: 'pointer',
                      p: 3,
                      borderRadius: '18px',
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center',
                      gap: 3,
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    {/* Product Image */}
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        position: 'relative',
                        bgcolor: '#efefef',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={100}
                        height={90}
                        style={{ objectFit: 'contain' }}
                      />
                    </Box>

                    {/* Product Info */}
                    <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: '#888', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.75rem' }}
                      >
                        {item.category}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#000', mb: 0.5 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Size: <strong>{item.size}</strong>
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#000', mt: 1 }}>
                        ${item.price.toFixed(2)} each
                      </Typography>
                    </Box>

                    {/* Quantity Controls */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid #e0e0e0',
                          borderRadius: '25px',
                          p: 0.5,
                          bgcolor: '#fafafa',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, item.quantity, -1);
                          }}
                          disabled={isUpdating || isRemoving}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ px: 2, fontWeight: 700, minWidth: 24, textAlign: 'center' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(item.id, item.quantity, 1);
                          }}
                          disabled={isUpdating || isRemoving}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#ff3939' }}>
                          ${item.itemTotal.toFixed(2)}
                        </Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveItem(item.id);
                          }}
                          disabled={isRemoving}
                          sx={{ color: '#999', '&:hover': { color: '#ff3939' } }}
                        >
                          <DeleteOutlined />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </Grid>

            {/* Summary Column */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '18px',
                  bgcolor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  position: 'sticky',
                  top: 100,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 900, color: '#000', mb: 3 }}>
                  Order Summary
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Subtotal ({cart?.itemCount} item{cart?.itemCount !== 1 ? 's' : ''})
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    ${cart?.subtotal.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body1" sx={{ color: '#666' }}>
                    Estimated Shipping
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {cart?.shipping === 0 ? 'FREE' : `$${cart?.shipping.toFixed(2)}`}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: '#000' }}>
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#ff3939' }}>
                    ${cart?.total.toFixed(2)}
                  </Typography>
                </Box>

                <Button
                  onClick={handleBuyNow}
                  disabled={isOrdering}
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#ff3939',
                    color: '#ffffff',
                    py: 1.6,
                    mb: 2,
                    borderRadius: '35px',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 15px rgba(255, 57, 57, 0.35)',
                    '&:hover': {
                      bgcolor: '#d62828',
                      boxShadow: '0 6px 20px rgba(255, 57, 57, 0.5)',
                    },
                  }}
                >
                  {isOrdering ? <CircularProgress size={24} color="inherit" /> : 'BUY NOW'}
                </Button>

                <Button
                  component={Link}
                  href="/"
                  fullWidth
                  variant="outlined"
                  sx={{
                    borderColor: '#000000',
                    color: '#000000',
                    py: 1.5,
                    borderRadius: '35px',
                    fontWeight: 700,
                    '&:hover': {
                      bgcolor: '#000000',
                      color: '#ffffff',
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
