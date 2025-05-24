import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export const RestaurantCard = ({ id, name, address, city, image, description, phone }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="160"
        image={image || '/restaurant-placeholder.jpg'}
        alt={name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon color="primary" sx={{ mr: 0.5, fontSize: '1rem' }} />
          <Typography variant="body2" color="text.secondary">
            {city} • {address}
          </Typography>
        </Box>

        <Typography variant="body2" paragraph sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PhoneIcon color="primary" sx={{ mr: 0.5, fontSize: '1rem' }} />
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        </Box>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Button 
          size="small" 
          variant="outlined"
          fullWidth
          onClick={() => navigate(`/restaurants/${id}`)}
        >
          Ver Detalles
        </Button>
      </Box>
    </Card>
  );
};