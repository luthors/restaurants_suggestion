import { restaurants as initialRestaurants } from "./../../data/restaurants";
// src/api/restaurantsApi.js
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

/**
 * Obtiene todos los restaurantes
 * @returns {Promise<Array>} Lista de restaurantes
 */

export const getRestaurants = () => {
  try {
    // Si usa localStorage:
    const saved = localStorage.getItem("restaurants_data");
    return saved ? JSON.parse(saved) : [...initialRestaurants]; // Usa los datos importados
  } catch (error) {
    console.error("Error loading restaurants:", error);
    return [...initialRestaurants]; // Devuelve copia del array importado
  }
};

/**
 * Crea un nuevo restaurante
 * @param {Object} restaurantData - Datos del restaurante (sin id)
 * @returns {Promise<Object>} Restaurante creado (con id)
 */
export const createRestaurant = async (restaurantData) => {
  try {
    // Si no hay backend, simula creación
    if (!import.meta.env.VITE_API_BASE_URL) {
      console.log("aqui11: ");
      console.log(restaurantData.json);
      return {
        ...restaurantData,
        id: Math.floor(Math.random() * 1000),
        image: await fetchRandomRestaurantImage(),
      };
    }

    const response = await fetch(`${API_URL}/restaurants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurantData),
    });
    if (!response.ok) throw new Error("Error al crear restaurante");
    return await response.json();
  } catch (error) {
    console.error("createRestaurant error:", error);
    throw error;
  }
};

/**
 * Busca restaurantes por nombre o ciudad
 * @param {String} query - Término de búsqueda
 * @returns {Promise<Array>} Restaurantes filtrados
 */
export const searchRestaurants = (query) => {
  const restaurants = getRestaurants();

  if (!query.trim()) return restaurants;

  const searchTerms = query
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);

  return restaurants
    .map((restaurant) => {
      let score = 0;
      const lowerName = restaurant.name.toLowerCase();
      const lowerCity = restaurant.city.toLowerCase();
      const lowerDesc = restaurant.description.toLowerCase();

      searchTerms.forEach((term) => {
        // Ponderación: nombre (3pts), ciudad (2pts), descripción (1pt)
        if (lowerName.includes(term)) score += 3;
        if (lowerCity.includes(term)) score += 2;
        if (lowerDesc.includes(term)) score += 1;
      });

      return { ...restaurant, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => {
      const { score, ...restaurant } = item;
      return restaurant;
    });
};

/**
 * Obtiene una imagen aleatoria de Pexels para restaurantes
 * @returns {Promise<String>} URL de la imagen
 */
export const fetchRandomRestaurantImage = async () => {
  try {
    const query = "restaurant+colombia";
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
      headers: {
        Authorization: "A4yv11ySwO8MRQR0nXp2tqSrZqswQ5V6s22IpjWuTVBZGPunh6QecgeZ",
      },
    });
    const data = await response.json();
    const randomImage = data.photos[Math.floor(Math.random() * data.photos.length)];
    return randomImage.src.large;
  } catch (error) {
    console.warn("Error fetching image from Pexels, using placeholder");
    return "/default-restaurant.jpg"; // Imagen local de respaldo
  }
};

export const getRestaurantById = async (id) => {
  try {
    const restaurants = await getRestaurants(); // Añade await si es async

    // Asegúrate que el ID sea número (depende de cómo lo guardas)
    const restaurantId = Number(id);
    const found = restaurants.find((r) => r.id === restaurantId);

    if (!found) {
      throw new Error(`Restaurante con ID ${id} no encontrado`);
    }

    return found;
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    throw error;
  }
};
