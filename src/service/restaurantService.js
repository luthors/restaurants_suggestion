// src/services/restaurantService.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

const restaurantsRef = collection(db, "restaurants");

// CREATE - Agregar nuevo restaurante
export const addRestaurant = async (restaurantData) => {
  try {
    const docRef = await addDoc(restaurantsRef, {
      ...restaurantData,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    return { id: docRef.id, ...restaurantData };
  } catch (error) {
    console.error("Error adding restaurant: ", error);
    throw error;
  }
};

// READ - Obtener todos los restaurantes
export const getRestaurants = async () => {
  try {
    // query seleccionar todos todos los restaurantes no importa si no estan activos
    const q = query(restaurantsRef, where("isActive", "==", true), orderBy("name"));

    const querySnapshot = await getDocs(collection(db, "restaurants"));

    console.log("querySnapshot: ", querySnapshot.docs.length);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting restaurants: ", error);
    throw error;
  }
};

// READ - Obtener un restaurante por ID
export const getRestaurantById = async (id) => {
  try {
    const docRef = doc(db, "restaurants", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Restaurante no encontrado");
    }
  } catch (error) {
    console.error("Error getting restaurant: ", error);
    throw error;
  }
};

// UPDATE - Actualizar restaurante
export const updateRestaurant = async (id, updateData) => {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating restaurant: ", error);
    throw error;
  }
};

// DELETE - Borrado lógico
export const deleteRestaurant = async (id) => {
  try {
    const docRef = doc(db, "restaurants", id);
    await updateDoc(docRef, {
      isActive: false,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error deleting restaurant: ", error);
    throw error;
  }
};

// Búsqueda avanzada
export const searchRestaurants = async (searchTerm) => {
  try {
    const q = query(
      restaurantsRef,
      where("isActive", "==", true),
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error searching restaurants: ", error);
    throw error;
  }
};
