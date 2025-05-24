import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { useNavigate } from "react-router";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import DescriptionIcon from '@mui/icons-material/Description';


export const RestaurantCard = ({ id, name, address, city, description, phone, image }) => {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(id));
  }, [id]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setFavorite((prev) => !prev);
    toggleFavorite(id);
  };

  return (
    <Card
      sx={{
        position: "relative",
        mb: 3,
        "&:hover": { transform: "translateY(-2px)", boxShadow: 3 },
      }}
    >
      {/* Botón de favorito */}
      <IconButton
        aria-label="favorite"
        onClick={handleFavoriteClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          color: favorite ? "red" : "white",
          backgroundColor: "rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}
      >
        {favorite ? <Favorite /> : <FavoriteBorder />}
      </IconButton>

      {/* Resto del contenido de la tarjeta */}
      <CardMedia component="img" height="160" image={image} alt={name} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <LocationOnIcon color="primary" sx={{ mr: 0.5, fontSize: "1rem" }} />
          <Typography variant="body2" color="text.secondary">
            {city} • {address}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <DescriptionIcon color="primary" sx={{ mr: 0.5, fontSize: "1rem" }} />
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>      

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PhoneIcon color="primary" sx={{ mr: 0.5, fontSize: "1rem" }} />
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        </Box>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => navigate(`/restaurants/${id}`)}>
            Ver Detalles
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
