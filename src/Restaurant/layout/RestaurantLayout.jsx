import { Grid, Typography } from "@mui/material";

export const RestaurantLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", padding: 4 }}
    >
        <Grid item
            className='box-shadow'
            xs={ 3 }
            sx = {{ backgroundColor: "white", padding: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>{ title }</Typography>
                { children }
        </Grid>
    </Grid>
  );
};
