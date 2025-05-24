import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RestaurantApp } from "./RestaurantApp.jsx";
import { BrowserRouter } from "react-router";
import { App } from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/restaurants-suggestion">
      <App />
    </BrowserRouter>
  </StrictMode>
);
