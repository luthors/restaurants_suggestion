import { Box } from "@mui/material";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { AppRouter } from "./router/AppRouter";

export function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppRouter />
      </Box>
      <Footer />
    </Box>
  );
}
