import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/icons/Menu';

// material-ui icons
import MoreVert from '@material-ui/icons/MoreVert';
import ViewList from '@material-ui/icons/ViewList';

// core components
import HeaderLinks from './HeaderLinks';
import Button from '../CustomButton';

import headerStyle from '../../../assets/jss/components/headerStyle';

function Header({ ...props }) {
  function makeBrand() {
    var name;
    props.routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === props.location.pathname) {
            name = prop.name;
          }
          return null;
        });
      }
      if (prop.path === props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    if (name) {
      return name;
    } else {
      return 'Default Brand Name';
    }
  }
  let pathname  = props.location.pathname;
  const { classes, color, rtlActive,nome } = props;
  const appBarClasses = cx({
    [' ' + classes[color]]: color
  });
  const sidebarMinimize =
    classes.sidebarMinimize +
    ' ' +
    cx({
      [classes.sidebarMinimizeRTL]: rtlActive
    });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <Hidden smDown implementation='css'>
          <div className={sidebarMinimize}>
            {props.miniActive ? (
              <Button
                justIcon
                round
                color='white'
                onClick={props.sidebarMinimize}
              >
                <ViewList className={classes.sidebarMiniIcon} />
              </Button>
            ) : (
              <Button
                justIcon
                round
                color='white'
                onClick={props.sidebarMinimize}
              >
                <MoreVert className={classes.sidebarMiniIcon} />
              </Button>
            )}
          </div>
        </Hidden>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button href={'#'+pathname} className={classes.title} color='transparent'>
              {makeBrand()}
          </Button> 
        </div>
        <Hidden smDown implementation='css'>
          <HeaderLinks rtlActive={rtlActive} nome={nome} />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <Button
            className={classes.appResponsive}
            color='transparent'
            justIcon
            aria-label='open drawer'
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  nome: PropTypes.string,
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool
};

export default withStyles(headerStyle)(Header);



// WEBPACK FOOTER //
// ./src/components/Header/Header.jsx