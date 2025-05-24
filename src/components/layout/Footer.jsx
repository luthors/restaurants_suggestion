import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto', 
        backgroundColor: '#f5f5f5',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Directorio de Restaurantes - Todos los derechos reservados
      </Typography>
    </Box>
  );
};