import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfAnyGranted from '../../components/Permissions/IfAnyGranted';
import AdminNPJ from '../Dashboard/AdminNPJ';
import Usuario from '../Dashboard/Usuario';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <GridContainer>
          <GridItem xs={12} sm={8} md={6} lg={6}>
            <IfAnyGranted expected={[1,2]} actual={this.props.auth.accessLevel}>
              <AdminNPJ />
            </IfAnyGranted>
          </GridItem>
          <GridItem xs={12} sm={8} md={6} lg={6}>
            <Usuario />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(compose(connect(mapStateToProps))(HomePage));