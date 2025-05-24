import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getRestaurantById } from "../api/restaurantsApi";
import { Box, Typography, Button, Chip, Divider, Stack, IconButton, Paper, Rating } from "@mui/material";
import { ArrowBack, LocationOn, Phone, Favorite, FavoriteBorder } from "@mui/icons-material";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import LocationMap from "../components/layout/LocationMap";
import { geocodeAddress } from "../api/mapsApi";

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getRestaurantById(id);
        setRestaurant(data);
        setFavorite(isFavorite(data.id));
      } catch (error) {
        console.error("Error loading restaurant:", error);
        navigate("/not-found"); // Redirige si no existe
      }
    };
    loadData();
  }, [id, navigate]);

  useEffect(() => {
    const loadLocation = async () => {
      const coords = await geocodeAddress(`${restaurant.address}, ${restaurant.city}`);
      setLocation(coords);
    };

    if (restaurant) loadLocation();
  }, [restaurant]);

  const handleToggleFavorite = () => {
    toggleFavorite(restaurant.id);
    setFavorite(!favorite);
  };

  if (!restaurant) return <div>Cargando...</div>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Botón de volver */}
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Volver
      </Button>

      {/* Header con favorito */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h3" component="h1">
          {restaurant.name}
        </Typography>
        <IconButton onClick={handleToggleFavorite} size="large">
          {favorite ? <Favorite color="error" fontSize="large" /> : <FavoriteBorder fontSize="large" />}
        </IconButton>
      </Box>

      {/* Imagen principal */}
      <Paper elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      </Paper>

      {/* Información básica */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <Chip icon={<LocationOn />} label={restaurant.city} variant="outlined" />
        <Chip icon={<Phone />} label={restaurant.phone} variant="outlined" />
        <Rating value={4.5} precision={0.5} readOnly />
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Descripción */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sobre nosotros
        </Typography>
        <Typography variant="body1" paragraph>
          {restaurant.long_description || restaurant.description}
        </Typography>
      </Box>

      {/* Dirección completa */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Dirección
        </Typography>
        <Typography variant="body1">
          {restaurant.address}, {restaurant.city}
        </Typography>
      </Box>

      {/* Mapa de ubicación (placeholder) */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ubicación {location && `(${location.lat}, ${location.lng})`}
        </Typography>
        <LocationMap lat={location?.lat} lng={location?.lng} address={(restaurant.address, restaurant.city)} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Dirección exacta: {restaurant.address}, {restaurant.city}
        </Typography>
      </Box>
    </Box>
  );
};
