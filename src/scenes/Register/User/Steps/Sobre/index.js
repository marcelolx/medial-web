import React, { Component } from "react";
import { compose } from "recompose";
import { withStyles, FormControl, InputLabel, Input, FormHelperText, TextField, FormLabel, RadioGroup, FormControlLabel, Radio, MenuItem } from "@material-ui/core";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';
import { TextMaskCPF, TextMaskCNPJ } from '../../../../../components/Masks'
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';

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
      sendData.transacionador.documento1 = data.cpf_cnpj;
      sendData.transacionador.documento2 = data.rg_ie;

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
    const { classes, error, step } = props;

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
          error={(step.beforeNextStepError && this.state.nome === '') ? true : false}
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
            (step.beforeNextStepError && this.state.nome === '') &&
            <FormHelperText id="name-error-text">Preencha seu nome completo</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={
            ((error.status === 'CPF_JA_CADASTRADO') ||
             (step.beforeNextStepError && this.state.cpf_cnpj === '')) ? true : false}
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
            ((error.status === "CPF_JA_CADASTRADO") || 
              (step.beforeNextStepError && this.state.cpf_cnpj === '')) &&
              <FormHelperText id="cpf-error-text">{error.message || 'Preencha o CPF'}</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.rg_ie === '') ? true : false}
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
            (step.beforeNextStepError && this.state.rg_ie === '') &&
            <FormHelperText id="rg-error-text">Preencha o RG</FormHelperText>
          }
        </FormControl>
        <FormControl 
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.dataNascimento === '1900-01-01') ? true : false}
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
            (step.beforeNextStepError && this.state.dataNascimento === '1900-01-01') &&
            <FormHelperText id="birthday-error-text">Preencha a data de nascimento</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.nomeMae === '') ? true : false}
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
            (step.beforeNextStepError && this.state.nomeMae === '') &&
            <FormHelperText id="mother-error-text">Preencha o nome da mãe</FormHelperText>
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
          error={(step.beforeNextStepError && this.state.estadoCivil === '') ? true : false}           
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
            (step.beforeNextStepError && this.state.estadoCivil === '') &&
            <FormHelperText id="estadocivil-error-text">Selecione seu estado civil</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.escolaridade === '') ? true : false}
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
            (step.beforeNextStepError && this.state.escolaridade === '') &&
            <FormHelperText id="escolaridade-error-text">Selecione sua escolaridade</FormHelperText>
          }
        </FormControl>
      </React.Fragment>
    );
  }

  pessoaJuridica = props => {
    const { classes, error, step } = props;
    
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
          error={(step.beforeNextStepError && this.state.nome === '') ? true : false}
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
            (step.beforeNextStepError && this.state.nome === '') &&
            <FormHelperText id="razao-socail-error-text">Informe a razão social da empresa</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.fantasia === '') ? true : false}
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
            (step.beforeNextStepError && this.state.fantasia === '') &&
            <FormHelperText id="fantasia-error-text">Informe o nome fantasia da empresa</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error= {
            ((error.status === 'CNPJ_JA_CADASTRADO') ||
             (step.beforeNextStepError && this.state.cpf_cnpj === '')) ? true : false}
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
          {
            ((error.status === 'CNPJ_JA_CADASTRADO') || 
            (step.beforeNextStepError && this.state.cpf_cnpj === '')) &&
            <FormHelperText id="cnpj-error-text">{error.message || 'Informe o CNPJ'}</FormHelperText>
          }        
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')}
          error={(step.beforeNextStepError && this.state.rg_ie === '') ? true : false}
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
            (step.beforeNextStepError && this.state.rg_ie === '') &&
            <FormHelperText id="ie-error-text">Informe a Inscrição Estadual</FormHelperText>
          }
        </FormControl>
        <FormControl
          className={[classes.margin, classes.fill].join(' ')} 
          error={(step.beforeNextStepError && this.state.ramoEmpresarial === '') ? true : false}           
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
            (step.beforeNextStepError && this.state.ramoEmpresarial === '') &&
            <FormHelperText id="ramoempresarial-error-text">Selecione o ramo empresarial da empresa</FormHelperText>
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
      
    //registerUser.transacionador.tipoTransacionador = 'F'
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