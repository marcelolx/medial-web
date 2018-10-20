import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import IfGranted from '../../components/Permissions/IfGranted';
import IfAnyGranted from '../../components/Permissions/IfAnyGranted';
import IfAllGranted from '../../components/Permissions/IfAllGranted';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import ImageUpload from '../../components/CustomUpload/ImageUpload';
import AdminNPJ from '../Dashboard/AdminNPJ.jsx';

class Home extends Component {
  render() {
    return <AdminNPJ />;

    return (
      <React.Fragment>
        <IfGranted expected={99} actual={this.props.auth.accessLevel}>
          Teste  IfGranted               1 Massa!
        </IfGranted>
        <IfAnyGranted expected={[1,4,99]} actual={this.props.auth.accessLevel}>
          Teste   IfAnyGranted           1 Massa!!         
        </IfAnyGranted>
        <IfAllGranted expected={[99]} actual={this.props.auth.accessLevel}>
          Teste   IfAllGranted           1 Massa!!!
        </IfAllGranted>
        <GridContainer justify="center">
          <GridItem xs={12} sm={4} md={3}>
            <legend>Imagem teste</legend>
            <ImageUpload 
              //avatar //Se descomentar, ele fica tipo avatar, senão imagem normal
              adicionarButtonProps={{
                color: "primary",
                round: true
              }}
              alterarButtonProps={{
                color: "primary",
                round: true
              }}
              removerButtonProps={{
                color: "danger",
                round: true
              }}
            />
          </GridItem>
        </GridContainer>      
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default withRouter(compose(connect(mapStateToProps))(Home));