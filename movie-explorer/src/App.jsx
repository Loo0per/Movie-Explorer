import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import AppRoutes from './routes/AppRoute';
import { AuthProvider } from './context/AuthContext';
import theme from './styles/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <AppRoutes />
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;