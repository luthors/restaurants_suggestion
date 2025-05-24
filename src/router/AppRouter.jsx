import { Routes, Route, Navigate } from "react-router";
import { HomePage, SearchPage, NewRestaurantPage, NotFoundPage } from "../pages";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/new-restaurant" element={<NewRestaurantPage />} />
      <Route path="/*" element={<div>404 Not Found</div>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};
