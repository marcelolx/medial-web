import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import getRoutes from '../../routes';
import Main from './Main';
import SideNav from './SideNav';
import AppBar from './AppBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
});

class Root extends Component {
  
  render() {
    const { classes, auth } = this.props;

    return (
      <div className={classes.root}>
        {auth.isAuthenticated &&
          <React.Fragment>
            <AppBar />
            <SideNav />
          </React.Fragment>
        }
        <Main>
          { getRoutes() }
        </Main>
      </div>
    );
  }
}

Root.proptypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(Root));