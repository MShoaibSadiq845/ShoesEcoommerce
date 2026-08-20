'use client';

import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import ProductList from '../components/ProductList';
import PromoBanners from '../components/PromoBanners';
import CategorySection from '../components/CategorySection';
import MembershipBanner from '../components/MembershipBanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#ffffff' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <HeroBanner />
        <ProductList />
        <PromoBanners />
        <CategorySection />
        <MembershipBanner />
      </Box>
      <Footer />
    </Box>
  );
}
