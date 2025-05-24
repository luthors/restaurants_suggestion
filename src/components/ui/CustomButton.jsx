import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  padding: theme.spacing(1.5, 3),
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
  '&.Mui-disabled': {
    opacity: 0.7,
  },
}));

// Variantes adicionales
export const PrimaryButton = (props) => (
  <CustomButton variant="contained" color="primary" {...props} />
);

export const SecondaryButton = (props) => (
  <CustomButton variant="outlined" color="primary" {...props} />
);