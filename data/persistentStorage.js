//import { restaurants as initialRestaurants } from './restaurants';
import { getRestaurants } from "../src/api/restaurantsApi";
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
export const addRestaurant = (restaurant) => {
  const currentData = res;
  console.log("currentData+: ", currentData);

  const newId = res.length + 1;

  const newRestaurant = {
    ...restaurant,
    id: newId,
    image: restaurant.image || "/default-restaurant.jpg",
  };

  console.log("newRestaurant: ", newRestaurant);

  const updatedData = [...currentData, newRestaurant];
  console.log("updatedData: ", updatedData);
  saveRestaurants(updatedData);
  return newRestaurant;
};
