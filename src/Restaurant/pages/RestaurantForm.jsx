import { MailOutline } from "@mui/icons-material";
import { Grid, TextField, Typography } from "@mui/material";
import ResponsiveAppBar from "../../components/AppBar";
import { RestaurantLayout } from "../layout/RestaurantLayout";

export const RestaurantForm = () => {
  return (
    <>
      <ResponsiveAppBar />
      <RestaurantLayout title="New restaurant">
        <form style={{ width: "100%" }}>
          <Grid container spacing={2} width="100%">
            <Grid item width="100%">
              <TextField
                label="Nombre Comercial"
                variant="outlined"
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}
              />
            </Grid>
            <Grid item width="100%">
              <TextField
                label="Teléfono"
                variant="outlined"
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { width: "100%" } }}
              />
            </Grid>
          </Grid>
        </form>
      </RestaurantLayout>
    </>
  );
};
