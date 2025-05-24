import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material"; // Cambiamos Typography por Box

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
};

const LocationMap = ({ lat, lng, address }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvZJMvvGRe3kFB-C3-MzKaq0gS4wYNkSw",
  });
  console.log(" lat: ", lat, " lng: ", lng);

  const center = {
    lat: lat,
    lng: lng,
  };

  if (loadError) return <Box>Error cargando mapa</Box>; // Cambiado a Box
  if (!isLoaded) return <Box>Cargando mapa...</Box>; // Cambiado a Box

  return (
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
      <Marker position={center} title={address} />
    </GoogleMap>
  );
};

export default LocationMap;
