// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <Drawer open={isOpen} onClose={toggleSidebar}>
      <List>
        {['Dashboard', 'Users', 'Settings', 'Image View', 'Image Size Display'].map((text, index) => (
          <ListItem button key={text} component={Link} to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
