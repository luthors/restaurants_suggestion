import { restaurants as initialRestaurants } from "./../../data/restaurants";
// src/api/restaurantsApi.js

import { data } from "react-router";
import restaurants from "../../data/restaurants";

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
export const searchRestaurants = async (query) => {
  try {
    // En desarrollo: filtra los mock data
    if (!import.meta.env.VITE_API_BASE_URL) {
      const mockData = await import("../../data/restaurants");
      return mockData.default.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.city.toLowerCase().includes(query.toLowerCase())
      );
    }

    const response = await fetch(`${API_URL}/restaurants?q=${query}`);
    if (!response.ok) throw new Error("Error en la búsqueda");
    return await response.json();
  } catch (error) {
    console.error("searchRestaurants error:", error);
    throw error;
  }
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
