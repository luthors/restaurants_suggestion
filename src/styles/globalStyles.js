import { Global, css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          background-color: ${theme.palette.background.default};
          color: ${theme.palette.text.primary};
          line-height: 1.5;
          font-family: ${theme.typography.fontFamily};
          -webkit-font-smoothing: antialiased;
        }
        
        a {
          text-decoration: none;
          color: inherit;
        }
        
        ul {
          list-style: none;
        }
        
        img {
          max-width: 100%;
          height: auto;
          display: block;
        }
        
        /* Scrollbar personalizada */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.palette.grey[100]};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.palette.primary.main};
          border-radius: 4px;
        }
        
        /* Animaciones */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-in;
        }
      `}
    />
  );
};
