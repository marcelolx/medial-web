import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfGranted from '../../components/Permissions/IfGranted';
import IfAnyGranted from '../../components/Permissions/IfAnyGranted';
import IfAllGranted from '../../components/Permissions/IfAllGranted';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <IfGranted expected={99} actual={this.props.auth.accessLevel}>
          Teste  IfGranted               99 Massa!
        </IfGranted>
        <IfAnyGranted expected={[1,4,99]} actual={this.props.auth.accessLevel}>
          Teste   IfAnyGranted          3222 Massa!!         
        </IfAnyGranted>
        <IfAllGranted expected={[99]} actual={this.props.auth.accessLevel}>
          Teste   IfAllGranted           2322 Massa!!!
        </IfAllGranted>
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(compose(connect(mapStateToProps))(Home));