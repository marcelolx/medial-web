import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfAnyGranted from '../../components/Permissions/IfAnyGranted';
import AdminNPJ from '../Dashboard/AdminNPJ';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <IfAnyGranted expected={[1,2]} actual={this.props.auth.accessLevel}>
          <AdminNPJ />
        </IfAnyGranted>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(compose(connect(mapStateToProps))(HomePage));