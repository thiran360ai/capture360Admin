import React from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const styles = {
    drawer: {
      backgroundColor: 'grey',
      color: 'white',
      width: '250px',
      position: 'fixed',
      height: '100%',
    },
    list: {
      padding: 0,
    },
    listItem: {
      padding: '15px 20px',
    },
    listItemHover: {
      backgroundColor: '#555',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    linkHover: {
      color: '#ddd',
    },
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={toggleSidebar}
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
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
