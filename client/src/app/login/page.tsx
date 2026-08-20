'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useLoginMutation, useRegisterMutation } from '../../redux/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { setCredentials } from '../../redux/authSlice';

interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export default function AuthPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const [loginUser, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerUser, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AuthFormData>();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    reset();
  };

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (tabIndex === 0) {
        // LOGIN
        const res = await loginUser({ email: data.email, password: data.password }).unwrap();
        dispatch(setCredentials(res));
        toast.success(`Welcome back, ${res.user.name || res.user.email}!`);
        if (res.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      } else {
        // REGISTER
        if (!data.name) {
          toast.error('Please enter your full name');
          return;
        }
        await registerUser({
          name: data.name,
          email: data.email,
          password: data.password,
        }).unwrap();
        
        toast.success('Account created successfully! Please sign in with your email and password.');
        
        // Save registered email/password in form and switch to Login tab
        const registeredEmail = data.email;
        setTabIndex(0);
        reset();
        setValue('email', registeredEmail);
      }
    } catch (err: any) {
      const errMsg = err?.data?.message || 'Authentication failed. Please check your credentials.';
      toast.error(errMsg);
    }
  };

  const isLoading = isLoginLoading || isRegisterLoading;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8f8f8' }}>
      <Navbar />

      <Container maxWidth="xs" sx={{ py: 8, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: 4,
            borderRadius: '24px',
            bgcolor: '#ffffff',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              textAlign: 'center',
              mb: 1,
              fontStyle: 'italic',
              color: '#000000',
            }}
          >
            {tabIndex === 0 ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mb: 3 }}>
            {tabIndex === 0
              ? 'Enter your details to access your account'
              : 'Join Your Sneaker to enjoy exclusive offers'}
          </Typography>

          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="inherit"
            sx={{
              mb: 3,
              borderBottom: '1px solid #eee',
              '& .MuiTabs-indicator': { bgcolor: '#ff3939', height: 3 },
            }}
          >
            <Tab label="Login" sx={{ fontWeight: 700 }} />
            <Tab label="Sign Up" sx={{ fontWeight: 700 }} />
          </Tabs>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {tabIndex === 1 && (
                <TextField
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  {...register('name', { required: 'Name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                />
              )}

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                variant="contained"
                sx={{
                  bgcolor: '#000000',
                  color: '#ffffff',
                  py: 1.6,
                  mt: 1,
                  borderRadius: '30px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  '&:hover': {
                    bgcolor: '#ff3939',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : tabIndex === 0 ? (
                  'SIGN IN'
                ) : (
                  'CREATE ACCOUNT'
                )}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
