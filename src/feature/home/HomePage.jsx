import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfAnyGranted from '../../core/components/permissions/IfAnyGranted';
import AdminNPJ from '../dashboard/AdminNPJ';
import MediacoesUsuario from '../dashboard/usuario/MediacoesUsuario';
import GridContainer from '../../core/components/grid/GridContainer';
import GridItem from '../../core/components/grid/GridItem';
import EmpresaNegociador from '../dashboard/negociador/EmpresaNegociador';
import { TipoUsuarioEnum } from '../admin/mediacao/utils/tipoUsuarioEnum';

class HomePage extends Component {

  render() {
    return (
      <React.Fragment>         
        <GridContainer>
          <IfAnyGranted expected={[TipoUsuarioEnum.ADMINISTRADOR, TipoUsuarioEnum.ADMINISTRADOR_NPJ]} actual={this.props.auth.accessLevel}>
            <AdminNPJ />       
          </IfAnyGranted>   
          <IfAnyGranted expected={[TipoUsuarioEnum.ADMINISTRADOR, TipoUsuarioEnum.ADMINISTRADOR_NPJ, TipoUsuarioEnum.EMPRESA]} actual={this.props.auth.accessLevel}>
            <EmpresaNegociador />  
          </IfAnyGranted>   
          <GridItem xs={12} sm={8} md={6} lg={6}>
            <MediacoesUsuario />
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