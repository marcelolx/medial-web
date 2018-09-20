import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}
    />
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, {})(PrivateRoute));