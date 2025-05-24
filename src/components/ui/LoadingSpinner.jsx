import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = ({ message = 'Cargando...', size = 40 }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: 2,
        py: 4 
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

// Versión para botones
export const ButtonProgress = ({ size = 24 }) => (
  <CircularProgress size={size} color="inherit" />
);