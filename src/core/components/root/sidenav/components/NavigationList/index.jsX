import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './style.scss';
import { compose } from 'recompose';
import IfAnyGranted from '../../../../Permissions/IfAnyGranted';
import NestedList from './NestedList';
import itensMediacao from './NestedList/itensMediacao';
import { TipoUsuarioEnum } from '../../../../../../feature/admin/mediacao/utils/tipoUsuarioEnum';

const NavigationList = (props) => {  
  return (
    <List
      className='nav-link'
      component='nav'
      subheader={<ListSubheader component='div'>Menu</ListSubheader>}
    >
      <ListItem component={NavLink} exact to='/' button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary='Início' />
      </ListItem>
      <NestedList items={itensMediacao} />


      <IfAnyGranted expected={[TipoUsuarioEnum.ADMINISTRADOR,TipoUsuarioEnum.ADMINISTRADOR_NPJ]} actual={props.auth.accessLevel}>
        <List
          className='nav-link'
          component='nav'
          subheader={<ListSubheader component='div'>Administrador</ListSubheader>}
        >
          <ListItem component={NavLink} exact to='/users/all' button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Lista Usuários' />
          </ListItem>
        </List>
      </IfAnyGranted>      
    </List>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default compose(connect(mapStateToProps))(NavigationList);