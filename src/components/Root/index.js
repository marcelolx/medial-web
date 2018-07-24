import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';

import Main from './Main';
import getRoutes from '../../routes';

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
    const { classes, user } = this.props;

    return (
      <div className={classes.Root}>
        {user.auth &&
          <React.Fragment>
            <div/>
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
  users: PropTypes.object.isRequired,
}

const MapStateToProps = state => ({
  user: state.user.data,
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(Root));