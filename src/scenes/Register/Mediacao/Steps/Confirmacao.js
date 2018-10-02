import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { BUSCAR_EMPRESA, MOTIVO } from './stepTypes';
import { findStepStateIndex, viewInState, viewError } from './helpers';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import { TextMaskCNPJ } from '../../../../components/Masks';
import TextField from '@material-ui/core/TextField';

const style = {
  multilineTextField: {
    width: '100%'
  }
}

class Confirmacao extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return (viewInState(this.props.allStates, BUSCAR_EMPRESA) && viewInState(this.props.allStates, MOTIVO));

    //TODO: Broken when company not registered
  }

  render() {
    const { classes, allStates, mediacaoEmpresas } = this.props;

    if (viewInState(allStates, BUSCAR_EMPRESA) && viewInState(allStates, MOTIVO)) {
      const viewEmpresaIndex = findStepStateIndex(BUSCAR_EMPRESA, allStates);
      const viewMotivoIndex = findStepStateIndex(MOTIVO, allStates);

      const empresa = mediacaoEmpresas.empresas[allStates[viewEmpresaIndex].BUSCAR_EMPRESA.checked];
      const motivo = allStates[viewMotivoIndex].MOTIVO;
    
      if ((empresa !== undefined) && (motivo !== undefined)) {
        return(
          <React.Fragment>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Nome"
                  id="nome-empresa"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: empresa.nome,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Nome da fantasia"
                  id="nome-fantasia"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: empresa.fantasia
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput 
                  labelText="CNPJ"
                  id="cnpj-empresa"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    inputComponent: TextMaskCNPJ,
                    value: empresa.cnpj,
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                  <CustomInput 
                    labelText="Estado"
                    id="estado-empresa"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: empresa.endereco.estado.label,
                    }}
                  />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                  <CustomInput 
                    labelText="Cidade"
                    id="cidade-empresa"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: empresa.endereco.cidade.label,
                    }}
                  />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput 
                  labelText="Conflitos"
                  id="conflitos"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: motivo.conflitos.label,
                  }}
                />
              </GridItem>          
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput 
                  labelText="Assuntos"
                  id="assuntos"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    disabled: true,
                    value: motivo.assuntos.label
                  }}
                />
              </GridItem>
            </GridContainer>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <TextField
                  id="mensagem"
                  label="Mensagem"
                  multiline
                  rows="15"
                  className={classes.multilineTextField}
                  margin="normal"
                  variant="outlined"
                  value={motivo.mensagem}
                  disabled
                />
              </GridItem>
            </GridContainer>
          </React.Fragment>
        );
      }
    }

    return viewError();    
  }
}

const mapStateToProps = state => ({
  mediacaoEmpresas: state.mediacaoEmpresas,
});

export default compose(
  connect(mapStateToProps),
  withStyles(style)
)(Confirmacao);