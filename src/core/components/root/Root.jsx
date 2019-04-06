import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter, HashRouter, Route, Switch  } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import indexRoutes from '../../routes/index';
import pageRoutes from '../../routes/pagesIndex';
import * as authActions from '../../services/authentication/loginActions';

class Root extends Component {

componentDidMount(){
  const {auth} = this.props; 
  
    if (auth.isAuthenticated) {
      this.props.actions.validarLogin();
    } 
}

  render() {
    const {auth} = this.props; 
    if(auth.isAuthenticated){
      return (
        <div style={ { height: '100%', width: '100%' } }>
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

Root.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch)
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Root));