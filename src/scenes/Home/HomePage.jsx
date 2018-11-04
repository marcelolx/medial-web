import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfAnyGranted from '../../components/Permissions/IfAnyGranted';
import AdminNPJ from '../Dashboard/AdminNPJ';
import EmpresaNegociador from '../Dashboard/EmpresaNegociador';
import GridContainer from '../../components/Grid/GridContainer';

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
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(compose(connect(mapStateToProps))(HomePage));