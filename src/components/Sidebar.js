import React from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ProjectIcon from '@mui/icons-material/Assignment';
import CreateIcon from '@mui/icons-material/AddCircle';
import './sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const styles = {
    drawer: {
      height: '100%',
      top: 0,
      position: 'fixed',
      backgroundColor: '#f8f9fa',
    },
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, link: '/' },
    {
      text: 'Project Manager',
      icon: <ProjectIcon />,
      link: '/project-manager',
      apiEndpoint: 'https://4aae-157-49-242-245.ngrok-free.app/building/projectlist/',
    },
    {
      text: 'Create Manager',
      icon: <CreateIcon />,
      link: '/create-manager',
      apiEndpoint: 'https://4aae-157-49-242-245.ngrok-free.app/building/create_user/',
    },
  ];

  const navigate = useNavigate();

  const handleNavigation = (link, apiEndpoint) => {
    navigate(link, { state: { apiEndpoint, title: link === '/create-manager' ? 'Create Manager' : 'Project Manager' } });
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
      PaperProps={{ style: styles.drawer, className: 'sidebar-paper' }}
    >
      <List className="sidebar-list">
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleNavigation(item.link, item.apiEndpoint)}
            className="sidebar-list-item"
          >
            <ListItemIcon className="sidebar-list-item-icon">{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} className="sidebar-list-text" />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
