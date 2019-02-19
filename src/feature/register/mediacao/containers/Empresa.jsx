import React from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../../core/components/grid/GridContainer';
import GridItem from '../../../../core/components/grid/GridItem';
import CustomInput from '../../../../core/components/CustomInput';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { BUSCAR_EMPRESA } from '../constants/mediacaoStepConstants';
import { TextMaskCNPJ, TextMaskPhone, TextMaskCPF } from '../../../../core/components/Masks';
import { findStepStateIndex, viewInState, viewError, validateEmail, validateCNPJ, validateCPF } from '../utils/mediacaoHelper';
import { CNPJ_INFORMADO_INVALIDO, EMAIL_INVALIDO, NOME_NAO_INFORMADO, TELEFONE_NAO_INFORMADO } from '../../../../core/utils/messages/errorMessages';
import getAdaptedMessage from '../../../../feature/admin/mediacao/utils/mediacaoMessagesHelper';
import { Radio, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';

const style = {
  disabled: {
    color: 'black',
  },
  personalidadeInput: {
    marginRight: 25,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  radioInput: {
    marginTop: -3,
  }
}

class Empresa extends React.Component {

  state = {
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    personalidade: 'F',
    error: false,
    errorType: ''
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    const { allStates } = this.props;
    const viewIndex = findStepStateIndex(BUSCAR_EMPRESA, allStates);

    if (allStates[viewIndex].BUSCAR_EMPRESA.solicitarCadastro) {
      const data = {
        nome: this.state.nome,
        cnpj: this.state.cnpj,
        email: this.state.email,
        telefone: this.state.telefone,
      }

      const validMail = validateEmail(data.email);
      const validCNPJ = this.state.personalidade === 'F' ? validateCPF(data.cnpj) : validateCNPJ(data.cnpj);

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

  handleViewSolicitarCadastro = () => {
    const { mediacao } = this.props;

    return (
      <React.Fragment>

        <GridContainer justify='center'>
          <FormControl>
            <div className={{}}>
              <FormLabel style={style.personalidadeInput}>Personalidade</FormLabel>
              <FormControlLabel
                style={style.radioInput}
                control={<Radio
                  value='F'
                  checked={this.state.personalidade === 'F'}
                  onChange={this.handleChange('personalidade')}
                />}
                label='Pessoa Física'
              />
              <FormControlLabel
                style={style.radioInput}
                control={<Radio
                  value='J'
                  checked={this.state.personalidade === 'J'}
                  onChange={this.handleChange('personalidade')}
                />}
                label='Pessoa Jurídica'
              />
            </div>

          </FormControl>
        </GridContainer>

        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={(this.state.error && this.state.nome === '') || mediacao.errorCode === NOME_NAO_INFORMADO}
              labelText='Nome do requerido'
              id='nome-empresa'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.nome,
                onChange: this.handleChange('nome')
              }}
              errorHelperText={mediacao.mensagem || 'Informe o nome'}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              error={(this.state.error && (this.state.email === '' || this.state.errorType === EMAIL_INVALIDO)) || mediacao.errorCode === EMAIL_INVALIDO}
              labelText='E-mail'
              id='email-empresa'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.email,
                onChange: this.handleChange('email')
              }}
              errorHelperText={mediacao.mensagem || getAdaptedMessage(this.state.errorType) || 'Informe o email'}
            />
          </GridItem>
        </GridContainer>

        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              error={(this.state.error && (this.state.cnpj === '' || this.state.errorType === CNPJ_INFORMADO_INVALIDO)) || mediacao.errorCode === CNPJ_INFORMADO_INVALIDO}
              labelText='CPF/CNPJ'
              id='cnpj-empresa'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.cnpj,
                onChange: this.handleChange('cnpj'),
                inputComponent: this.state.personalidade === 'F' ? TextMaskCPF : TextMaskCNPJ
              }}
              errorHelperText={mediacao.mensagem || getAdaptedMessage(this.state.errorType) || 'Informe o cpf/cnpj'}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              error={(this.state.error && this.state.telefone === '') || mediacao.errorCode === TELEFONE_NAO_INFORMADO}
              labelText='Telefone'
              id='telefone-empresa'
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: this.state.telefone,
                onChange: this.handleChange('telefone'),
                inputComponent: TextMaskPhone
              }}
              errorHelperText={mediacao.mensagem || 'Informe o telefone para contato com a pessoa ou empresa'}
            />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }

  handleViewInfosEmpresaSelecionada = (empresa) => {
    return (
      <GridContainer justify='center'>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            error={false}
            labelText='Nome'
            id='nome-empresa'
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
            labelText='Nome da fantasia'
            id='nome-fantasia'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: true,
              value: validateCNPJ(empresa.cnpj) ? empresa.fantasia : empresa.nome
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            error={false}
            labelText='CNPJ'
            id='cnpj-empresa'
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              disabled: true,
              inputComponent: validateCNPJ(empresa.cnpj) ? TextMaskCNPJ : TextMaskCPF,
              value: empresa.cnpj,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText='País'
            id='pais-empresa'
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
            labelText='Estado'
            id='estado-empresa'
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
            labelText='Cidade'
            id='cidade-empresa'
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
            labelText='Bairro'
            id='bairro-empresa'
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
            labelText='Rua'
            id='rua-empresa'
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
            labelText='Número'
            id='numero-empresa'
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

        if ((allStates[viewIndex].BUSCAR_EMPRESA.checked.length === 0) && (allStates[viewIndex].BUSCAR_EMPRESA.solicitarCadastro)) {
          return this.handleViewSolicitarCadastro();
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

export default compose(
  connect(mapStateToProps),
  withStyles(style)
)(Empresa);