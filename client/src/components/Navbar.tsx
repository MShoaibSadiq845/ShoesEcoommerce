'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Badge,
  IconButton,
  InputBase,
  Container,
  Paper,
  Button,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useGetCartQuery } from '../redux/cartApi';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/authSlice';
import toast from 'react-hot-toast';

const navLinks = [
  { label: 'WOMAN', href: '/?category=woman' },
  { label: 'MEN', href: '/?category=men' },
  { label: 'ALL', href: '/' },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { data: cartData } = useGetCartQuery();
  const itemCount = cartData?.itemCount || 0;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('ALL');

  const handleNavClick = (label: string, href: string) => {
    setActiveNav(label);
    setDrawerOpen(false);
    router.push(href);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/');
    setDrawerOpen(false);
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.push('/admin');
      } else {
        toast(`Logged in as ${user?.name || user?.email}`);
      }
    } else {
      router.push('/login');
    }
    setDrawerOpen(false);
  };

  /* ── Mobile Drawer ── */
  const drawer = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#fff' }}>
      {/* Drawer header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.08em' }}>
          YOUR <span style={{ color: '#000' }}>SNEAKER</span>
        </Typography>
        <IconButton onClick={() => setDrawerOpen(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav links */}
      <List sx={{ px: 1, pt: 2, flexGrow: 1 }}>
        {navLinks.map((link) => {
          const isActive = activeNav === link.label;
          return (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                onClick={() => handleNavClick(link.label, link.href)}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  position: 'relative',
                  '&::after': isActive
                    ? {
                        content: '""',
                        position: 'absolute',
                        left: 16,
                        right: 16,
                        bottom: 6,
                        height: '2px',
                        bgcolor: '#000',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease',
                      }
                    : {},
                }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontWeight: isActive ? 900 : 600,
                        fontSize: '1rem',
                        color: '#000',
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        {isAuthenticated && user?.role === 'admin' && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => { router.push('/admin'); setDrawerOpen(false); }}
              sx={{ borderRadius: '10px', mb: 0.5 }}
            >
              <ListItemText
                primary="ADMIN PANEL"
                slotProps={{ primary: { sx: { fontWeight: 800, fontSize: '1rem', color: '#ff3939' } } }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>

      {/* Search inside drawer */}
      <Box sx={{ px: 2, py: 2 }}>
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#f5f5f5',
            px: 2,
            py: 1,
            borderRadius: '12px',
          }}
        >
          <SearchIcon sx={{ color: '#999', fontSize: 18, mr: 1 }} />
          <InputBase placeholder="Search sneakers..." sx={{ fontSize: '0.9rem', flexGrow: 1 }} />
        </Paper>
      </Box>

      <Divider />

      {/* Auth buttons */}
      <Box sx={{ px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            p: 1.5,
            borderRadius: '10px',
            '&:hover': { bgcolor: '#f9f9f9' },
          }}
          onClick={handleUserClick}
        >
          <img src="/images/1.png" alt="User" style={{ width: 22, height: 22 }} />
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
            {isAuthenticated ? user?.name || user?.email : 'Sign In'}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            p: 1.5,
            borderRadius: '10px',
            '&:hover': { bgcolor: '#f9f9f9' },
          }}
          onClick={() => { router.push('/cart'); setDrawerOpen(false); }}
        >
          <Badge badgeContent={itemCount} color="error">
            <img src="/images/2.png" alt="Cart" style={{ width: 22, height: 22 }} />
          </Badge>
          <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', ml: 1 }}>
            Cart {itemCount > 0 && `(${itemCount})`}
          </Typography>
        </Box>

        {isAuthenticated ? (
          <Button
            fullWidth
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: '#000',
              color: '#000',
              fontWeight: 700,
              borderRadius: '25px',
              py: 1,
            }}
          >
            Logout
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={() => { router.push('/login'); setDrawerOpen(false); }}
            sx={{
              bgcolor: '#ff3939',
              color: '#fff',
              fontWeight: 700,
              borderRadius: '25px',
              py: 1,
              '&:hover': { bgcolor: '#d62828' },
            }}
          >
            Login / Register
          </Button>
        )}
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: '1px solid #eaeaea', bgcolor: '#ffffff', zIndex: theme.zIndex.appBar }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: { xs: 56, md: 64 } }}>

            {/* ── LEFT: Hamburger (mobile) or Nav Links (desktop) ── */}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: { md: 3 } }}>
              {/* Hamburger – mobile only */}
              {isMobile && (
                <IconButton
                  onClick={() => setDrawerOpen(true)}
                  sx={{ color: '#000', p: 0.8 }}
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </IconButton>
              )}

              {/* Desktop nav links */}
              {!isMobile && navLinks.map((link) => {
                const isActive = activeNav === link.label;
                return (
                  <Box
                    key={link.label}
                    onClick={() => handleNavClick(link.label, link.href)}
                    sx={{
                      position: 'relative',
                      cursor: 'pointer',
                      pb: 0.5,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: isActive ? '100%' : '0%',
                        height: '2px',
                        bgcolor: '#000',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 900 : 700,
                        color: '#000',
                        userSelect: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Box>
                );
              })}

              {/* Admin chip – desktop only */}
              {!isMobile && isAuthenticated && user?.role === 'admin' && (
                <Chip
                  label="ADMIN"
                  onClick={() => router.push('/admin')}
                  size="small"
                  sx={{
                    fontWeight: 900,
                    cursor: 'pointer',
                    bgcolor: '#ff3939',
                    color: '#fff',
                    fontSize: '0.72rem',
                  }}
                />
              )}
            </Box>

            {/* ── CENTER: Logo ── */}
            <Box
              onClick={() => router.push('/')}
              sx={{
                flex: { xs: 1, md: 2 },
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Typography
                component="span"
                sx={{
                  fontWeight: 300,
                  letterSpacing: '0.1em',
                  color: '#a0a0a0',
                  fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                }}
              >
                YOUR
                <Typography
                  component="span"
                  sx={{
                    fontWeight: 900,
                    color: '#000',
                    letterSpacing: '0.1em',
                    ml: 1,
                    fontSize: { xs: '1rem', sm: '1.3rem', md: '1.8rem' },
                  }}
                >
                  SNEAKER
                </Typography>
              </Typography>
            </Box>

            {/* ── RIGHT: Actions ── */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: { xs: 0.5, md: 1.5 },
                justifyContent: 'flex-end',
              }}
            >
              {/* Search bar – desktop only */}
              {!isMobile && (
                <Paper
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#f5f5f5',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '20px',
                    width: { md: 130, lg: 160 },
                  }}
                >
                  <SearchIcon sx={{ color: '#999', fontSize: 16, mr: 0.8 }} />
                  <InputBase placeholder="Search..." sx={{ fontSize: '0.85rem', width: '100%' }} />
                </Paper>
              )}

              {/* Profile icon */}
              <IconButton onClick={handleUserClick} sx={{ color: '#000', p: 0.8 }}>
                <img src="/images/1.png" alt="Profile" style={{ width: 22, height: 22 }} />
              </IconButton>

              {/* Cart icon */}
              <IconButton
                onClick={() => router.push('/cart')}
                sx={{ color: '#000', bgcolor: '#f5f5f5', '&:hover': { bgcolor: '#e5e5e5' }, p: 0.8 }}
              >
                <Badge badgeContent={itemCount} color="error">
                  <img src="/images/2.png" alt="Cart" style={{ width: 22, height: 22 }} />
                </Badge>
              </IconButton>

              {/* Logout / Login – desktop only */}
              {!isMobile && (
                isAuthenticated ? (
                  <Button
                    size="small"
                    onClick={handleLogout}
                    sx={{ color: '#666', fontWeight: 600, fontSize: '0.8rem', minWidth: 'auto' }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() => router.push('/login')}
                    sx={{ color: '#ff3939', fontWeight: 700, fontSize: '0.8rem' }}
                  >
                    Login
                  </Button>
                )
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ── Mobile Drawer ── */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: 280 } } }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
