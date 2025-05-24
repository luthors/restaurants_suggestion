import { useState, useEffect } from "react";
import { Container, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { RestaurantCard } from "../components/ui/RestaurantCard";
import { searchRestaurants } from "../api/restaurantsApi";
import { useSearchParams } from "react-router";

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const data = await searchRestaurants(query);
          setResults(data);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchResults();
  }, [query]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resultados para: "{query}"
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por nombre o ciudad..."
          defaultValue={query}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search?q=${e.target.value}`;
            }
          }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : results.length > 0 ? (
        <Grid container spacing={3}>
          {results.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <RestaurantCard {...restaurant} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">No se encontraron resultados</Typography>
      )}
    </Container>
  );
};
