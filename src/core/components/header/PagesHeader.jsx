import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


// core components
import Button from '../CustomButton';

import pagesRoutes from './../../routes/pages';

import pagesHeaderStyle from '../../../assets/jss/components/pagesHeaderStyle';

class PagesHeader extends React.Component {

  state = {
    open: false
  }

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }
  render() {
    const { classes, color } = this.props;
    const appBarClasses = cx({
      [' ' + classes[color]]: color
    });
    var list = (
      <List className={classes.list}>
        {pagesRoutes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          }
          const navLink =
            classes.navLink +
            cx({
              [' ' + classes.navLinkActive]: this.activeRoute(prop.path)
            });
          return (
            <ListItem key={key} className={classes.listItem}>
              <NavLink to={prop.path} className={navLink}>
                <ListItemIcon className={classes.listItemIcon}>
                  <prop.icon />
                </ListItemIcon>
                <ListItemText
                  primary={prop.short}
                  disableTypography={true}
                  className={classes.listItemText}
                />
              </NavLink>
            </ListItem>
          );
        })}
      </List>
    );
    return (
      <AppBar position='static' className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button href='#' className={classes.title} color='transparent'>
                MEDIAL
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              justIcon
              color="transparent"
              aria-label='open drawer'
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
            <h4 style={{margin: 0,padding:'0 10px', color: 'white'}}>Medial</h4>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant='temporary'
                anchor={'right'}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

PagesHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
};

export default withStyles(pagesHeaderStyle)(PagesHeader);


