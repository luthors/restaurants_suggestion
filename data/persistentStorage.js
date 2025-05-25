//import { restaurants as initialRestaurants } from './restaurants';
import { fetchRandomRestaurantImage, getRestaurants } from "../src/api/restaurantsApi";
import { restaurants as res } from "../data/restaurants";

const initialRestaurants = getRestaurants();
const STORAGE_KEY = "restaurants_data";
// Cargar datos persistentes
export const loadRestaurants = () => {
  try {
    console.log("entrando a loadRestaurants");

    //const savedData = localStorage.getItem(STORAGE_KEY);
    //console.log("savedData: ", JSON.parse(savedData));
    const data = initialRestaurants.then((data) => {
      console.log("initialRestaurants -->: ", data);
      // sale este error  TypeError: Cannot read properties of undefined (reading 'map')
      const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || data;
      console.log("savedData: ", savedData);

      console.log("Array.isArray(savedData): ", Array.isArray(savedData));

      return savedData;
    });
  } catch (error) {
    console.error("Error loading data:", error);
    return initialRestaurants;
  }
};

// Guardar nuevos restaurantes
export const saveRestaurants = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving data:", error);
    return false;
  }
};

// Añadir nuevo restaurante
export const addRestaurant = async (restaurant) => {
  try {
    // 1. Obtener datos actuales
    const currentData = getRestaurants();

    // 2. Generar nuevo ID (asegurando que sea único)
    const newId = currentData.length > 0 ? Math.max(...currentData.map((r) => r.id)) + 1 : 1;

    // 3. Obtener imagen aleatoria de Pexels si no se proporcionó
    let imageUrl = restaurant.image;
    if (!imageUrl) {
      imageUrl = await fetchRandomRestaurantImage();
    }

    // 4. Crear nuevo restaurante
    const newRestaurant = {
      ...restaurant,
      id: newId,
      image: imageUrl,
      long_description: restaurant.long_description || restaurant.description,
      phone: formatPhoneNumber(restaurant.phone), // Formatear teléfono
    };

    // 5. Actualizar y guardar datos
    const updatedData = [...currentData, newRestaurant];
    saveRestaurants(updatedData);

    return newRestaurant;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Formato: +57 XXX XXX XXXX
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);
  return match ? `+${match[1]} ${match[2]} ${match[3]} ${match[4]}` : phone;
};