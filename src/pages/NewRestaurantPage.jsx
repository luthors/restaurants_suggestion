import { useState } from "react";
import { Container, TextField, Button, Typography, Stack, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { createRestaurant } from "../api/restaurantsApi";
import { addRestaurant } from "../../data/persistentStorage";

export const NewRestaurantPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    description: "",
    phone: "",
    long_description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = addRestaurant(formData);
      if (result) {
        alert(`Restaurante "${result.name}" guardado con ID: ${result.id}`);
        navigate("/home");
      }

      //await createRestaurant(formData);

      //navigate("/home", { state: { message: "Restaurante creado con éxito!" } });
    } catch (error) {
      console.error("Error creating restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Nuevo Restaurante
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField required name="name" label="Nombre" value={formData.name} onChange={handleChange} fullWidth />

          <TextField
            required
            name="address"
            label="Dirección"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />

          <TextField required name="city" label="Ciudad" value={formData.city} onChange={handleChange} fullWidth />

          <TextField required name="phone" label="Teléfono" value={formData.phone} onChange={handleChange} fullWidth />

          <TextField
            required
            name="description"
            label="Descripción corta"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            name="long_description"
            label="Descripción detallada"
            value={formData.long_description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={() => navigate("/home")}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Guardando..." : "Guardar Restaurante"}
            </Button>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};
