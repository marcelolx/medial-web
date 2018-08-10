import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LogoutIcon from '@material-ui/icons/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { logout } from '../../../services/users/actions';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  flex: {
    flex: 1,
  },
});

class _AppBar extends Component {
  state = {
    anchorEl: null,
    dialogOpen: false,
  };

  handleLogout = () => {
    this.handleMenuClose();
    this.props.logout();
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleToggleDialog = () => {
    this.setState(prevState => ({
        dialogOpen: !prevState.dialogOpen,
      })
    )
  }
  
  render() {
    { /*const { classes, user } = this.props;*/ }
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="absolute" className={[classes.appBar, 'appBar'].join(' ')}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex} noWrap>
            Medial
          </Typography>
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
              src=""
            >
              {/*<Avatar alt="Remy Sharp" src={user.profile} />*/}
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              onClose={this.handleMenuClose}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
            >
              <MenuItem onClick={this.handleMenuClose} component={NavLink} to="/profile">
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Perfil"/>
              </MenuItem>
              <MenuItem onClick={() => {
                this.handleMenuClose();
                this.handleToggleDialog();
              }}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleToggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEnforceFocus
        >
          <DialogTitle id="alert-dialog-title">Tem certeza de que deseja sair?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Continue mais um tempo com a gente, somos tão legais :)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggleDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleLogout} color="primary" autoFocus>
              Sair mesmo assim
            </Button>
          </DialogActions>
        </Dialog>
      </AppBar>
    );
  }
}

_AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { logout }),
)(_AppBar);