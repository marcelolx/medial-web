import React from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import { withStyles } from '@material-ui/core';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as empresaActions from '../../../../services/admin/empresa/actions';
import { compose } from 'recompose';
import { BUSCAR_EMPRESA } from './stepTypes';
import { TextMaskCNPJ, TextMaskPhone } from '../../../../components/Masks';
import { findStepStateIndex, viewInState, viewError } from './helpers';

const style = {
  disabled: {
    color: 'black',
  }
}

class Empresa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cnpj: '',
      email: '',
      telefone: '',
      error: false,
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    const { allStates } = this.props;
    const viewIndex = findStepStateIndex(BUSCAR_EMPRESA, allStates);    
    
    if (allStates[viewIndex].BUSCAR_EMPRESA.solicitarCadastroEmpresa) {
      const data = {
        nome: this.state.nome,
        cnpj: this.state.cnpj,
        email: this.state.email,
        telefone: this.state.telefone,
      }
      
      if (Object.keys(data).filter(key => data[key] === '').length > 0) {
        this.setState({
          error: true
        });
        
        return false;
      }  

      return true;
    }

    return true;
  }

  handleChange = prop => event => {    
    this.setState({ [prop]: event.target.value });
  }

  handleViewSolicitarCadastroEmpresa = () => {

    return(
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={this.state.error && this.state.nome === ''}
              labelText="Nome da empresa"
              id="nome-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.nome,
                onChange: this.handleChange('nome')
              }}
              errorHelperText="Informe o nome da empresa"
            />
          </GridItem>        
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput 
              error={this.state.error && this.state.email === ''}
              labelText="E-mail da empresa"
              id="email-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.email,
                onChange: this.handleChange('email')
              }}
              errorHelperText="Informe o email da empresa"
            />
          </GridItem>        
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={this.state.error && this.state.cnpj === ''}
              labelText="CNPJ"
              id="cnpj-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.cnpj,
                onChange: this.handleChange('cnpj'),
                inputComponent: TextMaskCNPJ
              }}
              errorHelperText="Informe o cnpj da empresa"
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              error={this.state.error && this.state.telefone === ''}
              labelText="Telefone da empresa"
              id="telefone-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.telefone,
                onChange: this.handleChange('telefone'),
                inputComponent: TextMaskPhone
              }}
              errorHelperText="Informe o telefone para contato com a empresa"
            />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }

  handleViewInfosEmpresaSelecionada = (empresa) => {
    return(
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            error={false}
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
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput 
            error={false}
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
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput 
            error={false}
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
        <GridItem xs={12} sm={12} md={4}>
            <CustomInput 
              labelText="País"
              id="pais-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: empresa.endereco.pais.label,
              }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
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
        <GridItem xs={12} sm={12} md={4}>
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
        <GridItem xs={12} sm={12} md={4}>
            <CustomInput 
              labelText="Bairro"
              id="bairro-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: empresa.endereco.bairro,
              }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
            <CustomInput 
              labelText="Rua"
              id="rua-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: empresa.endereco.rua,
              }}
            />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Número"
              id="numero-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                disabled: true,
                value: empresa.endereco.numero,
              }}
            />
        </GridItem>
      </GridContainer>
    );
  }

  render() {    
    const { allStates, mediacaoEmpresas } = this.props;    

    if (allStates[0] === undefined) {
      return null;
    } else {      
      if (viewInState(allStates, BUSCAR_EMPRESA)) {
        const viewIndex = findStepStateIndex(BUSCAR_EMPRESA, allStates);
        const empresa = mediacaoEmpresas.empresas[allStates[viewIndex].BUSCAR_EMPRESA.checked];

        if ((allStates[viewIndex].BUSCAR_EMPRESA.checked.length === 0) && (allStates[viewIndex].BUSCAR_EMPRESA.solicitarCadastroEmpresa)) {
          return this.handleViewSolicitarCadastroEmpresa();
        } else if (allStates[viewIndex].BUSCAR_EMPRESA.checked.length === 1) {
          return this.handleViewInfosEmpresaSelecionada(empresa);
        }
      }

      return viewError();
    }    
  }
}

const mapStateToProps = state => ({
  mediacaoEmpresas: state.empresa,
});

const mapDispatchProps = dispatch => ({
  actions: bindActionCreators({
    ...empresaActions,
  }, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchProps),
  withStyles(style)
)(Empresa);