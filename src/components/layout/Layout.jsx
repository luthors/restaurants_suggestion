import { Box } from '@mui/material';
import { Header, Footer } from './';

export const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, py: 3 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};