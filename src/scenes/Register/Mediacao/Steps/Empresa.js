import React from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import { withStyles } from '@material-ui/core';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as mediacaoStepActions from '../../../../services/admin/mediacao/nova/actions';
import { compose } from 'recompose';
import { BUSCAR_EMPRESA } from './stepTypes';

const style = {
  infoText: {
    fontWeight: '300',
  }
}

function findStepStateIndex(stepId, allStates) {
  return Object.keys(allStates).filter(
    function(key) {
      return (Object.keys(allStates[key]).filter(
        function(prop) {
          return prop === stepId;
        }
      ).length === 1)
    }
  );  
}

class Empresa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      empresaNome: '',
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
  }

  handleViewSolicitarCadastroEmpresa = () => {

    return(
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput 
            error={false}
            labelText="Nome da empresa"
            id="nome-empresa"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput 
            error={false}
            labelText="Nome da fantasia"
            id="nome-fantasia"
            formControlProps={{
              fullWidth: true
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }

  handleViewInfosEmpresaSelecionada = () => {
    return(
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput 
            error={false}
            labelText="Nome"
            id="nome-empresa"
            formControlProps={{
              fullWidth: true
            }}            
            inputProps={{
              disabled: true 
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }

  handleViewErro = () => {
    return(
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={3}>
          <h4>
            Ops... Tivemos um problema, volte para a página anterior, verifique as informações fornecidas
            e avance novamente.
          </h4>
        </GridItem>
      </GridContainer>
    );
  }

  handlePreviousViewInState = (allStates) => {
    return (Object.keys(allStates).filter(key => 
        (Object.keys(allStates[key]).filter(keyname => 
          (keyname === BUSCAR_EMPRESA)).length === 1)
      ).length === 1);
  }

  render() {    
    const { allStates } = this.props;

    if (allStates[0] === undefined) {
      return null;
    } else {      
      if (this.handlePreviousViewInState(this.props.allStates)) {
        const viewIndex = findStepStateIndex(BUSCAR_EMPRESA, this.props.allStates);

        if ((allStates[viewIndex].BUSCAR_EMPRESA.checked.length === 0) && (allStates[viewIndex].BUSCAR_EMPRESA.solicitarCadastroEmpresa)) {
          return this.handleViewSolicitarCadastroEmpresa();
        } else if (allStates[viewIndex].BUSCAR_EMPRESA.checked.length === 1) {
          return this.handleViewInfosEmpresaSelecionada();
        }
      }

      return this.handleViewErro();
    }    
  }
}

const mapDispatchProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacaoStepActions,
  }, dispatch)
});

export default compose(
  connect(null, mapDispatchProps),
  withStyles(style)
)(Empresa);