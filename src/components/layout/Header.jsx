import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AppBar, Toolbar, IconButton, InputAdornment, TextField, Box, Button, Typography } from '@mui/material';
import { Search as SearchIcon, Restaurant as RestaurantIcon } from '@mui/icons-material';
import { Link } from 'react-router';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <AppBar position="static" sx={{ 
      backgroundColor: '#1a237e',
      color: 'white',
      py: 1,
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo + Nombre */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton 
            component={Link} 
            to="/" 
            edge="start" 
            color="inherit"
            sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
          >
            <RestaurantIcon sx={{ fontSize: 32 }} />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}
          >
            Restaurantes CO
          </Typography>
        </Box>

        {/* Barra de búsqueda */}
        <Box 
          component="form" 
          onSubmit={handleSearch}
          sx={{ mx: 2, flexGrow: 1, maxWidth: 500 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Buscar restaurantes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="inherit" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 2,
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'transparent'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.3)'
                }
              }
            }}
            sx={{ 
              '& .MuiInputBase-input': {
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.7)',
                  opacity: 1
                }
              }
            }}
          />
        </Box>

        {/* Menú derecho */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            component={Link}
            to="/blog"
            color="inherit"
            sx={{ 
              textTransform: 'none',
              fontWeight: 'medium',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Blog
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
