import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, CircularProgress } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const LocationMap = ({ lat, lng, address }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvZJMvvGRe3kFB-C3-MzKaq0gS4wYNkSw",
    libraries: ["places"], // Añadimos la librería places para mejor geocodificación
  });

  // Manejo de coordenadas inválidas o faltantes
  const isValidLocation = lat && lng && !isNaN(lat) && !isNaN(lng);

  const center = isValidLocation
    ? {
        lat: Number(lat),
        lng: Number(lng),
      }
    : {
        lat: 4.710989, // Coordenadas por defecto (Bogotá)
        lng: -74.072092,
      };

  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return (
      <Box
        sx={{
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        Error al cargar el mapa. Por favor intenta recargar la página.
      </Box>
    );
  }

  if (!isLoaded) {
    return (
      <Box
        sx={{
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {isValidLocation && (
          <Marker
            position={center}
            title={address}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        )}
      </GoogleMap>

      {!isValidLocation && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bgcolor: "warning.light",
            color: "warning.contrastText",
            p: 1,
            textAlign: "center",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Ubicación aproximada - no se encontraron coordenadas exactas
        </Box>
      )}
    </Box>
  );
};

export default LocationMap;
