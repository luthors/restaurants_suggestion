import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
        },
      }}
    >
      <List>
        {/* Ítem Home */}
        <ListItem 
          button 
          component={Link} 
          to="/home"
          onClick={onClose}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItem>

        {/* Ítem Búsqueda */}
        <ListItem 
          button 
          component={Link} 
          to="/search"
          onClick={onClose}
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Buscar" />
        </ListItem>

        {/* Ítem Nuevo Restaurante */}
        <ListItem 
          button 
          component={Link} 
          to="/new-restaurant"
          onClick={onClose}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Agregar Restaurante" />
        </ListItem>
      </List>
    </Drawer>
  );
};