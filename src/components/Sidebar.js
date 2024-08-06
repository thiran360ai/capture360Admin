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
<<<<<<< HEAD
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
      apiEndpoint: 'https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/projectlist/',
    },
    {
      text: 'Create Manager',
      icon: <CreateIcon />,
      link: '/create-manager',
      apiEndpoint: 'https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/create_user/',
    },
  ];

  const navigate = useNavigate();

  const handleNavigation = (link, apiEndpoint) => {
    navigate(link, { state: { apiEndpoint, title: link === '/create-manager' ? 'Create Manager' : 'Project Manager' } });
  };

=======
  const navbarHeight = 64; // Adjust this value to match the height of your navbar

  const styles = {
    drawer: {
      backgroundColor: 'grey',
      color: 'white',
      width: '250px',
      height: `calc(100% - ${navbarHeight}px)`, // Adjust height to fill the remaining space below the navbar
      top: `${navbarHeight}px`, // Position below the navbar
      position: 'fixed',
    },
    list: {
      padding: 0,
    },
    listItem: {
      padding: '15px 20px',
    },
    listItemHover: {
      backgroundColor: '#12cad7',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    linkHover: {
      color: '#ddd',
    },
  };

>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
<<<<<<< HEAD
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
=======
      PaperProps={{ style: styles.drawer }}
    >
      <List style={styles.list}>
        {['Dashboard', 'Users', 'Settings', 'Image View', 'Image Size Display'].map((text) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={toggleSidebar}
            style={styles.listItem}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.listItemHover.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
          >
            <ListItemText
              primary={text}
              primaryTypographyProps={{ style: styles.link }}
              onMouseEnter={(e) => (e.currentTarget.style.color = styles.linkHover.color)}
              onMouseLeave={(e) => (e.currentTarget.style.color = styles.link.color)}
            />
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
