import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, HashRouter, Route, Switch  } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import indexRoutes from "./../../routes/index";
import pageRoutes from "./../../routes/pagesIndex";

class Root extends Component {
  render() {
    const {auth} = this.props;
    if(auth.isAuthenticated){
      return (
        <div>
          <HashRouter>
            <Switch>
              {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
              })}

            </Switch>
          </HashRouter>
        </div>
      );
    }else{
      return (
        <div>
          <HashRouter>
            <Switch>
              {pageRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
              })}
            </Switch>
          </HashRouter>
        </div>
      );
    }
  }
}

Root.proptypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(compose(
  connect(mapStateToProps, {}),
)(Root));