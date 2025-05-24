import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router';

export const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        La página que estás buscando no existe o fue movida.
      </Typography>
      <Button 
        component={Link} 
        to="/home" 
        variant="contained" 
        size="large"
      >
        Volver al inicio
      </Button>
    </Container>
  );
};
