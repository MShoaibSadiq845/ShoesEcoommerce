'use client';

import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff3939',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#efefef',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'Work Sans', 'sans-serif'].join(','),
    h1: {
      fontWeight: 900,
      fontStyle: 'italic',
      textTransform: 'uppercase',
    },
    h2: {
      fontWeight: 800,
      fontStyle: 'italic',
    },
    h3: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 18,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 35,
          padding: '8px 24px',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '5px 5px 25px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
