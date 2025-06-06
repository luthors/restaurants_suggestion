import { useState } from "react";
import { Container, TextField, Button, Typography, Stack, CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router";
import { fetchRandomRestaurantImage } from "../api/restaurantsApi";
import { addRestaurant } from "../service/restaurantService";
import { CustomAlert } from "../components/ui/CustomAlert";

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

  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setAlert({
        open: true,
        severity: "success",
        message: "¡Restaurante creado exitosamente!",
      });
      await addRestaurant({
        name: formData.name,
        address: formData.address,
        city: formData.city,
        description: formData.description,
        phone: formData.phone,
        image: formData.image || (await fetchRandomRestaurantImage()),
      });
      navigate("/home");
    } catch (error) {
      console.error("Error saving restaurant:", error);
      setAlert({
        open: true,
        severity: "error",
        message: "Error al crear el restaurante: " + error.message,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
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
      <CustomAlert open={alert.open} onClose={handleCloseAlert} severity={alert.severity} message={alert.message} />
    </Container>
  );
};
