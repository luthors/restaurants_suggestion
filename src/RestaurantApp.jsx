import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

export const RestaurantApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
