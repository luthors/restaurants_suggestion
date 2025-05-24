import { Routes } from "react-router";
import { HomePage, RestaurantForm } from "../pages";
import { Route, Navigate } from "react-router";

export const RestRouter = () => {
  return (
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="restaurantform" element={<RestaurantForm />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
