import { useEffect, useState } from "react";
import { Grid, Container, Typography, Button, CircularProgress, Box } from "@mui/material";
import { RestaurantCard } from "../components/ui/RestaurantCard";
import { getRestaurants } from "../api/restaurantsApi";
import { useNavigate } from "react-router";
import { AddCircleOutline } from "@mui/icons-material";
import { loadRestaurants } from "../../data/persistentStorage";

export const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getRestaurants();
        if (!localStorage.getItem("restaurants_data")) {
          localStorage.setItem("restaurants_data", JSON.stringify(data));
          setRestaurants(data);
        } else {
          const savedData = JSON.parse(localStorage.getItem("restaurants_data"));
          setRestaurants(savedData);
        }
      } catch (error) {
        console.error("Error loading restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
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

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {restaurants.map((restaurant) => (
            <Grid key={restaurant.id} size={{ xs: 12, sm: 12, md: 6, xl: 4 }} item>
              <RestaurantCard
                {...restaurant}
                onViewMore={() => navigate(`/restaurants/${restaurant.id}`)} // Para futura página detalle
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
