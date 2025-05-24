const FAVORITES_KEY = 'restaurant_favorites';

export const getFavorites = () => {
  const favorites = localStorage.getItem(FAVORITES_KEY);
  return favorites ? JSON.parse(favorites) : [];
};

export const toggleFavorite = (restaurantId) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.includes(restaurantId)
    ? favorites.filter(id => id !== restaurantId)
    : [...favorites, restaurantId];
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

export const isFavorite = (restaurantId) => {
  return getFavorites().includes(restaurantId);
};