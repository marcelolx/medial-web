import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import './style.scss';

const NavigationList = (props) => {
  return (
    <List
      className="nav-link"
      component="nav"
      subheader={<ListSubheader component="div">Menu</ListSubheader>}
    >
      <ListItem component={NavLink} exact to="/" button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Início" />
      </ListItem>
      <List
        className="nav-link"
        component="nav"
        subheader={<ListSubheader component="div">Administrador</ListSubheader>}
      >
        <ListItem component={NavLink} exact to="/users/all" button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Lista Usuários" />
        </ListItem>
      </List>
    </List>
  );
}

export default NavigationList;