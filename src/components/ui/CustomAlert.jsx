import { Snackbar, Alert } from "@mui/material";

export const CustomAlert = ({ open, onClose, severity, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          boxShadow: 3,
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
