import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // Asegúrate de tener tu configuración de Firebase
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "restaurants", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRestaurant({ id: docSnap.id, ...docSnap.data() });
          setFavorite(isFavorite(docSnap.id));
        } else {
          navigate("/not-found");
        }
      } catch (err) {
        console.error("Error loading restaurant:", err);
        setError("Error al cargar el restaurante");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurant();
  }, [id, navigate]);

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const coords = await geocodeAddress(`${restaurant.address}, ${restaurant.city}`);
        setLocation(coords);
      } catch (err) {
        console.error("Error geocoding address:", err);
      }
    };

    if (restaurant) loadLocation();
  }, [restaurant]);

  const handleToggleFavorite = () => {
    toggleFavorite(restaurant.id);
    setFavorite(!favorite);
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;
  if (!restaurant) return null;

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
        <Rating value={restaurant.rating || 4.5} precision={0.5} readOnly />
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

      {/* Mapa de ubicación */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ubicación {location && `(${location.lat}, ${location.lng})`}
        </Typography>
        <LocationMap lat={location?.lat} lng={location?.lng} address={`${restaurant.address}, ${restaurant.city}`} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Dirección exacta: {restaurant.address}, {restaurant.city}
        </Typography>
      </Box>
    </Box>
  );
};
