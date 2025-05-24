import { useEffect, useState } from "react";
import { RestaurantCard } from "../components/ui/RestaurantCard";
import { getFavorites } from "../utils/favorites";
import { getRestaurants } from "../api/restaurantsApi";
import { Typography, Box, Grid } from "@mui/material";

export const FavoritesPage = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = getFavorites();
      const allRestaurants = await getRestaurants();
      setFavoriteRestaurants(allRestaurants.filter((restaurant) => favorites.includes(restaurant.id)));
    };
    loadFavorites();
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Tus Restaurantes Favoritos
        </Typography>
        <Grid container spacing={3}>
          {favoriteRestaurants.length > 0 ? (
            favoriteRestaurants.map((restaurant) => (
              <Grid key={restaurant.id} size={{ xs: 12, sm: 12, md: 6, xl: 4 }}>
                <RestaurantCard
                  {...restaurant}
                  onViewMore={() => navigate(`/restaurants/${restaurant.id}`)} // Para futura página detalle
                />
              </Grid>
            ))
          ) : (
            <Typography>No tienes favoritos aún</Typography>
          )}
        </Grid>
        
      </Box>
    </>
  );
};
