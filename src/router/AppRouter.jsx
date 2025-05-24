import { Routes, Route, Navigate } from "react-router";
import { HomePage, SearchPage, NewRestaurantPage, NotFoundPage, FavoritesPage } from "../pages";
import { RestaurantDetailPage } from "../pages/RestaurantDetailPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/new-restaurant" element={<NewRestaurantPage />} />
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
    </Routes>
  );
};
