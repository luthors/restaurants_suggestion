import { collection, addDoc, writeBatch, getFirestore, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { restaurants as initialRestaurants } from "../../data/restaurants";

const BATCH_SIZE = 500; // Límite de Firestore por lote

export const migrateData = async () => {
  try {
    let batch = writeBatch(db);
    const restaurantsCollection = collection(db, "restaurants");
    let migratedCount = 0;

    // 1. Validación de datos inicial
    if (!Array.isArray(initialRestaurants)) {
      throw new Error("Los datos iniciales deben ser un array");
    }

    console.log(`Iniciando migración de ${initialRestaurants.length} restaurantes...`);

    // 2. Migración por lotes
    for (let i = 0; i < initialRestaurants.length; i++) {
      const restaurant = initialRestaurants[i];

      // Validación básica de campos requeridos
      if (!restaurant.name || !restaurant.city) {
        console.warn(`Restaurante ${i} omitido por datos incompletos`, restaurant);
        continue;
      }

      // Preparar documento
      const docRef = doc(restaurantsCollection); // Auto-ID
      batch.set(docRef, {
        ...restaurant,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      });

      // Ejecutar cada lote
      if ((i + 1) % BATCH_SIZE === 0 || i === initialRestaurants.length - 1) {
        await batch.commit();
        batch = writeBatch(db); // Nuevo lote
        migratedCount = i + 1;
        console.log(`Progreso: ${migratedCount}/${initialRestaurants.length}`);
      }
    }

    console.log(`Migración completada. Total: ${migratedCount} restaurantes`);
    return migratedCount;
  } catch (error) {
    console.error("Error en migración:", error);
    throw error;
  }
};
