import React from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import withStyles from '@material-ui/core/styles/withStyles';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as empresaActions from '../../../../services/admin/empresa/actions';
import { compose } from 'recompose';
import { BUSCAR_EMPRESA } from './stepTypes';
import { TextMaskCNPJ, TextMaskPhone } from '../../../../components/Masks';
import { findStepStateIndex, viewInState, viewError, validateEmail, validateCNPJ } from './helpers';
import { CNPJ_INFORMADO_INVALIDO, EMAIL_INVALIDO, NOME_NAO_INFORMADO, TELEFONE_NAO_INFORMADO } from '../../../../utils/Messages/errorMessages';
import getAdaptedMessage from '../../../../services/admin/mediacao/messages';

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
      errorType: '',
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

      const validMail = validateEmail(data.email);
      const validCNPJ = validateCNPJ(data.cnpj);
      
      if ((Object.keys(data).filter(key => data[key] === '').length > 0) ||
         (!validMail || !validCNPJ)) {

        const errorType = !validMail 
          ? EMAIL_INVALIDO 
          : !validCNPJ 
            ? CNPJ_INFORMADO_INVALIDO 
            : '';

        this.setState({
          error: true,
          errorType: errorType,
        });
        
        return false;
      }
    }

    this.setState({
      error: false,
      errorType: '',
    });
    
    return true;
  }

  handleChange = prop => event => {    
    this.setState({ [prop]: event.target.value });
  }

  handleViewSolicitarCadastroEmpresa = () => {
    const { mediacao } = this.props;

    return(
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={(this.state.error && this.state.nome === '') || mediacao.errorCode === NOME_NAO_INFORMADO}
              labelText="Nome da empresa"
              id="nome-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.nome,
                onChange: this.handleChange('nome')
              }}
              errorHelperText={mediacao.mensagem || 'Informe o nome da empresa'}
            />
          </GridItem>        
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput 
              error={(this.state.error && (this.state.email === '' || this.state.errorType === EMAIL_INVALIDO)) || mediacao.errorCode === EMAIL_INVALIDO}
              labelText="E-mail da empresa"
              id="email-empresa"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.email,
                onChange: this.handleChange('email')
              }}
              errorHelperText={mediacao.mensagem || getAdaptedMessage(this.state.errorType) || 'Informe o email da empresa'}
            />
          </GridItem>        
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={(this.state.error && (this.state.cnpj === ''|| this.state.errorType === CNPJ_INFORMADO_INVALIDO)) || mediacao.errorCode === CNPJ_INFORMADO_INVALIDO}
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
              errorHelperText={mediacao.mensagem || getAdaptedMessage(this.state.errorType) || 'Informe o cnpj da empresa'}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              error={(this.state.error && this.state.telefone === '') || mediacao.errorCode === TELEFONE_NAO_INFORMADO}
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
              errorHelperText={mediacao.mensagem || 'Informe o telefone para contato com a empresa'}
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
  mediacao: state.novaMediacao,
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