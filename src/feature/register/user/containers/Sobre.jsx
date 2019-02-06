import React, { Component } from "react";
import { compose } from "recompose";
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterStepButton from '../../../../core/components/root/registerstep/buttons/RegisterStepButtons';
import { TextMaskCPF, TextMaskCNPJ } from '../../../../core/components/masks/Masks';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import handleFieldShowError from '../../../../../utils/validateFields';
import { CPF_INVALIDO, CPF_CNPJ_CADASTRADO, RG_IE_NAO_INFORMADO, DATA_IGUAL_DATA_ATUAL, NOME_MAE_NAO_INFORMADO, ESTADO_CIVIL_NAO_INFORMADO, ESCOLARIDADE_NAO_INFORMADA, FANTASIA_NAO_INFORMADO, RAMO_EMPRESARIAL_NAO_INFORMADO } from '../../../../../services/register/user/messages';
import { CNPJ_INFORMADO_INVALIDO, NOME_NAO_INFORMADO } from "../../../../../utils/Messages/errorMessages";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minWidth: '250px',
    maxWidth: '350px',
    margin: '0 auto',
    marginBottom: '10%',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },  
  sexoForm: {
    margin: '0 auto',
    marginTop: '3%',
  },
  radioGroup: {    
    margin: '0 auto',
    display: 'table',
  },
  menu: {
    width: 200,
  }
});

class Sobre extends Component {

  state = {
    nome: this.props.registerUser.transacionador.nome,
    fantasia: this.props.registerUser.transacionador.fantasia,
    cpf_cnpj: this.props.registerUser.transacionador.documento1,
    rg_ie: this.props.registerUser.transacionador.documento2,
    dataNascimento: this.props.registerUser.transacionador.dataNascimento,
    nomeMae: this.props.registerUser.transacionador.nomeMae,
    sexo: this.props.registerUser.transacionador.sexo,
    estadoCivil: this.props.registerUser.transacionador.estadoCivil,
    escolaridade: this.props.registerUser.transacionador.escolaridade,
    ramoEmpresarial: this.props.registerUser.transacionador.ramoEmpresarial,
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  handleValidateFields = () => {
    const data = {
      nome: this.state.nome,
      cpf_cnpj: this.state.cpf_cnpj,
      rg_ie: this.state.rg_ie,
    }

    if (this.props.registerUser.transacionador.tipoTransacionador === 'F') {
      Object.assign(data, {
        dataNascimento: this.state.dataNascimento,
        nomeMae: this.state.nomeMae,
        sexo: this.state.sexo,
        estadoCivil: this.state.estadoCivil,
        escolaridade: this.state.escolaridade,
      });
    } else {
      Object.assign(data, {
        fantasia: this.state.fantasia,
        ramoEmpresarial: this.state.ramoEmpresarial,
      });
    }

    const blankInputs = Object.keys(data).filter(key => data[key] === '');

    if (blankInputs.length === 0) {
      const sendData = this.props.registerUser;
      sendData.transacionador.nome = data.nome;
      sendData.transacionador.documento1 = data.cpf_cnpj.replace(/\D/g, '');
      sendData.transacionador.documento2 = data.rg_ie.replace(/\D/g, '');

      if (sendData.transacionador.tipoTransacionador === 'F') {
        sendData.transacionador.dataNascimento = data.dataNascimento;
        sendData.transacionador.nomeMae = data.nomeMae;
        sendData.transacionador.sexo = data.sexo;
        sendData.transacionador.estadoCivil = data.estadoCivil;
        sendData.transacionador.escolaridade = data.escolaridade;
        sendData.transacionador.fantasia = '';
        sendData.transacionador.ramoEmpresarial = '';
      } else {
        sendData.transacionador.dataNascimento = '';
        sendData.transacionador.nomeMae = '';
        sendData.transacionador.sexo = '';
        sendData.transacionador.estadoCivil = '';
        sendData.transacionador.escolaridade = '';
        sendData.transacionador.fantasia = data.fantasia;
        sendData.transacionador.ramoEmpresarial = data.ramoEmpresarial;
      }
      
      this.props.saveUserRegisterData(sendData);
    }

    this.props.beforeNextStepError((blankInputs.length > 0));
    return (blankInputs.length === 0);
  }

  pessoaFisica = props => {
    const { classes, error } = props;

    const estadosCivis = [
      {
        value: 1,
        label: 'Solteiro',
      },
      {
        value: 2,
        label: 'Casado',
      },
      {
        value: 3,
        label: 'Viúvo',
      },
      {
        value: 4,
        label: 'Divorciado',
      },
      {
        value: 5,
        label: 'Outros',
      },
    ];
    
    const escolaridades = [
      {
        value: 1,
        label: 'Analfabeto',
      },
      {
        value: 2, 
        label: 'Ensino Fundamental - Incompleto',
      },
      {
        value: 3,
        label: 'Ensino Fundamental - Completo',
      },
      {
        value: 4,
        label: 'Ensino Médio - Incompleto',
      },
      {
        value: 5,
        label: 'Ensino Médio - Completo',
      },
      {
        value: 6,
        label: 'Ensino Superior - Incompleto',
      },
      {
        value: 7,
        label: 'Ensino Superior - Completo',
      },
      {
        value: 8,
        label: 'Pós-Graduação - Incompleta',
      },
      {
        value: 9,
        label: 'Pós-Graduação - Completa',
      },
      {
        value: 10,
        label: 'Mestrado - Incompleto',
      },
      {
        value: 11,
        label: 'Mestrado - Completo',
      },
      {
        value: 12,
        label: 'Doutorado - Incompleto',
      },
      {
        value: 13,
        label: 'Doutorado - Completo',
      }
    ];

    return(
      <React.Fragment>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.nome, [NOME_NAO_INFORMADO])}
          aria-describedby="name-error-text"            
        >
          <InputLabel htmlFor="input-nome">Nome Completo</InputLabel>
          <Input
            id="input-nome"
            name="nome"
            type="text"
            placeholder="Nome Completo"
            value={this.state.nome}
            onChange={this.handleChange('nome')}
          />
          {
            handleFieldShowError(this.props, this.state.nome, [NOME_NAO_INFORMADO]) &&
            <FormHelperText id="name-error-text">Preencha seu nome completo</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.cpf_cnpj, [CPF_INVALIDO, CPF_CNPJ_CADASTRADO])}
          aria-describedby="cpf-error-text"
        >
          <InputLabel htmlFor="input-cpf">CPF</InputLabel>
          <Input
            id="input-cpf"
            name="cpf"
            type="text"
            inputComponent={TextMaskCPF}
            value={this.state.cpf_cnpj}
            onChange={this.handleChange('cpf_cnpj')}
          />
          {
            handleFieldShowError(this.props, this.state.cpf_cnpj, [CPF_INVALIDO, CPF_CNPJ_CADASTRADO]) &&
            <FormHelperText id="cpf-error-text">{error.adaptedMessage.message || 'Preencha o CPF'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.rg_ie, [RG_IE_NAO_INFORMADO])}
          aria-describedby="rg-error-text"
        >
          <InputLabel htmlFor="input-rg">RG</InputLabel>
          <Input 
            id="input-rg"
            name="rg"
            type="text"
            value={this.state.rg_ie}
            onChange={this.handleChange('rg_ie')}
          />
          {
            handleFieldShowError(this.props, this.state.rg_ie, [RG_IE_NAO_INFORMADO]) &&
            <FormHelperText id="rg-error-text">{error.adaptedMessage.message || 'Preencha o RG'}</FormHelperText>
          }
        </FormControl>
        <FormControl 
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.dataNascimento, [DATA_IGUAL_DATA_ATUAL], '1900-01-01')}
          aria-describedby="birthday-error-text"
        >            
          <TextField 
            id="dataNascimento"
            type="date"
            label="Data de Nascimento"
            value={this.state.dataNascimento}
            onChange={this.handleChange('dataNascimento')}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {
            handleFieldShowError(this.props, this.state.dataNascimento, [DATA_IGUAL_DATA_ATUAL], '1900-01-01') &&
            <FormHelperText id="birthday-error-text">{error.adaptedMessage.message || 'Preencha a data de nascimento'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.nomeMae, [NOME_MAE_NAO_INFORMADO])}
          aria-describedby="mother-error-text"
        >
          <InputLabel htmlFor="input-nomemae">Nome da mãe</InputLabel>
          <Input 
            id="input-nomemae"
            name="nomemae"
            type="text"
            value={this.state.nomeMae}
            onChange={this.handleChange('nomeMae')}
          />
          {
            handleFieldShowError(this.props, this.state.rg_ie, [RG_IE_NAO_INFORMADO]) &&
            <FormHelperText id="mother-error-text">{error.adaptedMessage.message || 'Preencha o nome da mãe'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.sexoForm, classes.fill].join(' ')}
        >
          <FormLabel className={classes.sexoForm}>Sexo</FormLabel>
          <RadioGroup
            aria-label="Sexo"
            name="sexo1"
            value={this.state.sexo}
            onChange={this.handleChange('sexo')}
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="2" 
              control={<Radio />} 
              label="Feminino" 
            />
            <FormControlLabel 
              value="1"
              control={<Radio />} 
              label="Masculino" 
            />
          </RadioGroup>
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')} 
          error={handleFieldShowError(this.props, this.state.estadoCivil, [ESTADO_CIVIL_NAO_INFORMADO])}
          aria-describedby="estadocivil-error-text"
        >
          <TextField
            id="estado-civil"
            select
            label="Estado Civil"
            value={this.state.estadoCivil}
            onChange={this.handleChange('estadoCivil')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecione seu estado civil"
            margin="normal"
          >
            {estadosCivis.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {
            handleFieldShowError(this.props, this.state.estadoCivil, [ESTADO_CIVIL_NAO_INFORMADO]) &&
            <FormHelperText id="estadocivil-error-text">{error.adaptedMessage.message || 'Selecione seu estado civil'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.escolaridade, [ESCOLARIDADE_NAO_INFORMADA])}
          aria-describedby="escolaridade-error-text"
        >
          <TextField
            id="escolaridade-civil"
            select
            label="Escolaridade"            
            value={this.state.escolaridade}
            onChange={this.handleChange('escolaridade')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecione seu nível de escolaridade"
            margin="normal"
          >
            {escolaridades.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {
            handleFieldShowError(this.props, this.state.escolaridade, [ESCOLARIDADE_NAO_INFORMADA]) &&
            <FormHelperText id="escolaridade-error-text">{error.adaptedMessage.message || 'Selecione sua escolaridade'}</FormHelperText>
          }
        </FormControl>
      </React.Fragment>
    );
  }

  pessoaJuridica = props => {
    const { classes, error } = props;
    
    const ramosEmpresariais = [
      {
        value: 1,
        label: 'Bancário',
      },
      {
        value: 2,
        label: 'Gestora de ativos',
      },
      {
        value: 3,
        label: 'Plano de saúde',
      },
      {
        value: 4,
        label: 'Telecomunicações',
      },
      {
        value: 99,
        label: 'Outros',
      }
    ];

    return(
      <React.Fragment>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.nome, [NOME_NAO_INFORMADO])}
          aria-describedby="razao-social-error-text"
        >
          <InputLabel htmlFor="input-razao-social">Razão Social</InputLabel>
          <Input 
            id="input-razao-social"
            name="razaosocial"
            type="text"
            placeholder="Medial LTDA"
            value={this.state.nome}
            onChange={this.handleChange('nome')}            
          />
          {
            handleFieldShowError(this.props, this.state.nome, [NOME_NAO_INFORMADO]) &&
            <FormHelperText id="razao-socail-error-text">{error.adaptedMessage.message || 'Informe a razão social da empresa'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.fantasia, [FANTASIA_NAO_INFORMADO])}
          aria-describedby="fantasia-error-text"
        >
          <InputLabel htmlFor="input-fantasia">Nome Fantasia</InputLabel>
          <Input
            id="input-fantasia"
            name="fantasia"
            type="text"
            placeholder="Medial"
            value={this.state.fantasia}
            onChange={this.handleChange('fantasia')}
          />
          {
            handleFieldShowError(this.props, this.state.fantasia, [FANTASIA_NAO_INFORMADO]) &&
            <FormHelperText id="fantasia-error-text">{error.fantasia || 'Informe o nome fantasia da empresa'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error= {handleFieldShowError(this.props, this.state.cpf_cnpj, [CNPJ_INFORMADO_INVALIDO, CPF_CNPJ_CADASTRADO])}
          aria-describedby="cnpj-error-text"
        >
          <InputLabel htmlFor="input-cnpj">CNPJ</InputLabel>
          <Input 
            id="input-cnpj"
            name="cnpj"
            type="text"
            inputComponent={TextMaskCNPJ}
            value={this.state.cpf_cnpj}
            onChange={this.handleChange('cpf_cnpj')}            
          />
          {handleFieldShowError(this.props, this.state.cpf_cnpj, [CNPJ_INFORMADO_INVALIDO, CPF_CNPJ_CADASTRADO]) &&
            <FormHelperText id="cnpj-error-text">{error.adaptedMessage.message.message || 'Informe o CNPJ'}</FormHelperText>
          }        
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={handleFieldShowError(this.props, this.state.rg_ie, [RG_IE_NAO_INFORMADO])}
          aria-describedby="ie-error-text"
        >
          <InputLabel htmlFor="ie-input">Inscrição Estadual</InputLabel>
          <Input 
            id="ie-input"
            name="ie"
            type="text"
            value={this.state.rg_ie}
            onChange={this.handleChange('rg_ie')}
          />
          {
            handleFieldShowError(this.props, this.state.rg_ie, [RG_IE_NAO_INFORMADO]) &&
            <FormHelperText id="ie-error-text">{error.adaptedMessage.message || 'Informe a Inscrição Estadual'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')} 
          error={handleFieldShowError(this.props, this.state.ramoEmpresarial, [RAMO_EMPRESARIAL_NAO_INFORMADO])}           
          aria-describedby="ramoempresarial-error-text"
        >
          <TextField
            id="ramo-empresarial"
            select
            label="Ramo Empresarial"
            value={this.state.ramoEmpresarial}
            onChange={this.handleChange('ramoEmpresarial')}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Selecione o ramo empresarial da empresa"
            margin="normal"
          >
            {ramosEmpresariais.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          {
            handleFieldShowError(this.props, this.state.ramoEmpresarial, [RAMO_EMPRESARIAL_NAO_INFORMADO]) &&
            <FormHelperText id="ramoempresarial-error-text">{error.adaptedMessage.message || 'Selecione o ramo empresarial da empresa'}</FormHelperText>
          }
        </FormControl>
      </React.Fragment>
    );
  }

  camposPersonalidadeSelecionada = props => {
    if (props.registerUser.transacionador.tipoTransacionador === 'F') {
      return this.pessoaFisica(props);
    } else {
      return this.pessoaJuridica(props);
    }    
  }

  render() {
    const { classes } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);
    
    return(
      <React.Fragment>
        <div className={classes.root}>
          {this.camposPersonalidadeSelecionada(this.props)}
          <RegisterStepButton 
            onCancelStep={() => cancelStep()}
            onGetSteps={() => getSteps()}
            onValidateFields={() => this.handleValidateFields()}
          />
        </div>        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  registerUser: state.registerUser,
  error: state.error,
  step: state.step,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...stepsActions, ...registerUserActions }, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Sobre);