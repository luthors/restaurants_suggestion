export const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyBvZJMvvGRe3kFB-C3-MzKaq0gS4wYNkSw`
    );
    const data = await response.json();
    console.log("response:", data);
    if (data.results.length > 0) {
        console.log("entro:  data.results[0].geometry.location", data.results[0].geometry.location);
      return data.results[0].geometry.location;
    }
    return null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};
