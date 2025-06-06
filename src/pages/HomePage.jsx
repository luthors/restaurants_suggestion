import { useEffect, useState } from "react";
import { Grid, Container, Typography, Button, CircularProgress, Box } from "@mui/material";
import { RestaurantCard } from "../components/ui/RestaurantCard";
import { getRestaurants } from "../service/restaurantService"; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router";
import { AddCircleOutline } from "@mui/icons-material";

export const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await getRestaurants(); // Usamos el servicio de Firestore
        setRestaurants(data);
      } catch (err) {
        console.error("Error cargando restaurantes:", err);
        setError("Error al cargar los restaurantes");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ textAlign: "center", mt: 4 }}>
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Reintentar
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" component="h1">
          Restaurantes en Colombia
        </Typography>
        <Button variant="contained" onClick={() => navigate("/new-restaurant")} startIcon={<AddCircleOutline />}>
          Nuevo Restaurante
        </Button>
      </Box>

      <Grid container spacing={3}>
        {restaurants.map((restaurant) => (
          <Grid key={restaurant.id} size={{ xs: 12, sm: 12, md: 4, xl: 4 }} item>
            <RestaurantCard
              {...restaurant}
              onViewMore={() => navigate(`/restaurants/${restaurant.id}`)} // Para futura página detalle
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
