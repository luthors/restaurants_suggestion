export const cardStyles = {
  root: {
    position: 'relative',
    overflow: 'hidden',
    '&:hover .MuiCardMedia-root': {
      transform: 'scale(1.03)',
    },
  },
  media: {
    transition: 'transform 0.3s ease',
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
};

export const formStyles = {
  container: {
    maxWidth: 800,
    mx: 'auto',
    py: 4,
  },
  field: {
    mb: 3,
  },
  submitButton: {
    mt: 4,
    py: 1.5,
  },
};

export const layoutStyles = {
  header: {
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1200,
  },
  footer: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
};
