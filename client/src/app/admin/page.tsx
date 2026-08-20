'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useGetProductsQuery, useCreateProductMutation } from '../../redux/productsApi';
import { useGetAllOrdersQuery } from '../../redux/ordersApi';
import { useAppSelector } from '../../redux/hooks';

interface ProductFormData {
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  tag: string;
  brand: string;
}

const IMAGE_OPTIONS = [
  { label: 'Air Max 97 (Yellow)', value: '/images/4.png' },
  { label: 'KD13 EP (Red/Blue)', value: '/images/6.png' },
  { label: 'Air Max 90 Black', value: '/images/8.png' },
  { label: 'Air Max 200 SE', value: '/images/16.png' },
  { label: 'React Presto (Blue)', value: '/images/17.png' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: products, isLoading: isProductsLoading } = useGetProductsQuery();
  const { data: orders, isLoading: isOrdersLoading } = useGetAllOrdersQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      category: 'SNEAKERS',
      tag: 'NEW',
      brand: 'NIKE',
      imageUrl: '/images/4.png',
    },
  });

  // Guard route for Admin only
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Admin authentication required');
      router.push('/login');
    } else if (user?.role !== 'admin') {
      toast.error('Access denied. Admin role required.');
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct({
        ...data,
        price: Number(data.price),
      }).unwrap();
      toast.success('Product added successfully!');
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create product');
    }
  };

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f4f5f7' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 6, flexGrow: 1 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, color: '#000', fontStyle: 'italic' }}>
            ADMIN DASHBOARD
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Manage store inventory and view real-time customer purchases stored in MongoDB.
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs
            value={tabIndex}
            onChange={(_e, val) => setTabIndex(val)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ '& .MuiTabs-indicator': { bgcolor: '#ff3939', height: 3 } }}
          >
            <Tab label="Product Management" sx={{ fontWeight: 800, fontSize: '1rem' }} />
            <Tab label={`Customer Orders (${orders?.length || 0})`} sx={{ fontWeight: 800, fontSize: '1rem' }} />
          </Tabs>
        </Box>

        {/* Tab 0: Product Management */}
        {tabIndex === 0 && (
          <Grid container spacing={4}>
            {/* Add Product Form */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  bgcolor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#000' }}>
                  Add New Product
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <TextField
                      label="Product Name"
                      fullWidth
                      {...register('name', { required: 'Product name is required' })}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />

                    <TextField
                      label="Price ($)"
                      type="number"
                      slotProps={{ htmlInput: { step: '0.01' } }}
                      fullWidth
                      {...register('price', { required: 'Price is required', min: 0 })}
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />

                    <TextField
                      label="Category"
                      select
                      fullWidth
                      defaultValue="SNEAKERS"
                      {...register('category')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    >
                      <MenuItem value="SNEAKERS">SNEAKERS</MenuItem>
                      <MenuItem value="RUNNING">RUNNING</MenuItem>
                      <MenuItem value="BASKETBALL">BASKETBALL</MenuItem>
                      <MenuItem value="JORDAN">JORDAN</MenuItem>
                      <MenuItem value="LIFESTYLE">LIFESTYLE</MenuItem>
                    </TextField>

                    <TextField
                      label="Select Image"
                      select
                      fullWidth
                      defaultValue="/images/4.png"
                      {...register('imageUrl')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    >
                      {IMAGE_OPTIONS.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Tag / Label"
                      select
                      fullWidth
                      defaultValue="NEW"
                      {...register('tag')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    >
                      <MenuItem value="NEW">NEW</MenuItem>
                      <MenuItem value="POPULAR">POPULAR</MenuItem>
                      <MenuItem value="HOT">HOT</MenuItem>
                      <MenuItem value="FEATURED">FEATURED</MenuItem>
                      <MenuItem value="LIMITED">LIMITED</MenuItem>
                    </TextField>

                    <TextField
                      label="Description"
                      multiline
                      rows={3}
                      fullWidth
                      {...register('description')}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isCreating}
                      sx={{
                        bgcolor: '#000000',
                        color: '#ffffff',
                        py: 1.5,
                        borderRadius: '25px',
                        fontWeight: 800,
                        mt: 1,
                        '&:hover': { bgcolor: '#ff3939' },
                      }}
                    >
                      {isCreating ? <CircularProgress size={24} color="inherit" /> : 'ADD PRODUCT'}
                    </Button>
                  </Box>
                </form>
              </Paper>
            </Grid>

            {/* Existing Products List */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  bgcolor: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#000' }}>
                  Store Products Inventory ({products?.length || 0})
                </Typography>

                {isProductsLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                    <CircularProgress color="primary" />
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ bgcolor: '#fafafa' }}>
                          <TableCell sx={{ fontWeight: 800 }}>Image</TableCell>
                          <TableCell sx={{ fontWeight: 800 }}>Name</TableCell>
                          <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                          <TableCell sx={{ fontWeight: 800 }}>Price</TableCell>
                          <TableCell sx={{ fontWeight: 800 }}>Tag</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products?.map((prod) => (
                          <TableRow key={prod.id} hover>
                            <TableCell>
                              <img
                                src={prod.imageUrl}
                                alt={prod.name}
                                style={{ width: 50, height: 40, objectFit: 'contain' }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>{prod.name}</TableCell>
                            <TableCell>{prod.category}</TableCell>
                            <TableCell sx={{ fontWeight: 700, color: '#ff3939' }}>
                              ${Number(prod.price).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={prod.tag || 'NEW'}
                                size="small"
                                sx={{
                                  bgcolor: '#000',
                                  color: '#fff',
                                  fontWeight: 700,
                                  fontSize: '0.7rem',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Tab 1: Customer Orders Management */}
        {tabIndex === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '20px',
              bgcolor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: '#000' }}>
              Customer Orders Placed ({orders?.length || 0})
            </Typography>

            {isOrdersLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : !orders || orders.length === 0 ? (
              <Typography variant="body1" sx={{ color: '#888', py: 4, textAlign: 'center' }}>
                No customer orders placed yet.
              </Typography>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                      <TableCell sx={{ fontWeight: 800 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Customer Name</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Customer Email</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Items Purchased</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 800 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((ord) => (
                      <TableRow key={ord.id} hover>
                        <TableCell sx={{ fontWeight: 700, fontSize: '0.8rem', color: '#666' }}>
                          {ord.id.substring(0, 8)}...
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>{ord.userName}</TableCell>
                        <TableCell>{ord.userEmail}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            {ord.items.map((it, idx) => (
                              <Typography key={idx} variant="body2" sx={{ fontSize: '0.82rem' }}>
                                • <strong>{it.name}</strong> x{it.quantity} (${it.itemTotal.toFixed(2)})
                              </Typography>
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontWeight: 800, color: '#ff3939' }}>
                          ${ord.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.8rem', color: '#666' }}>
                          {new Date(ord.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ord.status || 'PLACED'}
                            size="small"
                            sx={{
                              bgcolor: '#ff3939',
                              color: '#fff',
                              fontWeight: 800,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
