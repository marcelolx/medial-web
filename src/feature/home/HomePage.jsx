import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfAnyGranted from '../../../core/components/Permissions/IfAnyGranted';
import AdminNPJ from '../dashboard/AdminNPJ';
import Usuario from '../dashboard/Usuario';
import GridContainer from '../../../core/components/Grid/GridContainer';
import GridItem from '../../../core/components/Grid/GridItem';
import EmpresaNegociador from '../dashboard/EmpresaNegociador';

class HomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <GridContainer>
          <IfAnyGranted expected={[1,2]} actual={this.props.auth.accessLevel}>
                <AdminNPJ />       
          </IfAnyGranted>   
          <IfAnyGranted expected={[1,4]} actual={this.props.auth.accessLevel}>
              <EmpresaNegociador />  
          </IfAnyGranted>   
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