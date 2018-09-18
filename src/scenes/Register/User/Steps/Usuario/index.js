import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, FormHelperText, InputAdornment, IconButton, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import * as errorActions from '../../../../../services/errors/actions';
import { EMAIL_INVALIDO, EMAIL_CADASTRADO, SENHA_NAO_INFORMADA, SENHA_EXIGE_8_DIGITOS, SENHAS_NAO_COINCIDEM } from '../../../../../services/register/user/messages';
import handleFieldShowError from '../../../../../utils/validateFields';

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
  personalidadeForm: {
    margin: '0 auto',
    marginTop: '3%',
  },
  radioGroup: {    
    margin: '0 auto',
    display: 'table',
  }
});

class Usuario extends Component {

  state = {
    email: this.props.registerUser.transacionador.usuario.email,
    senha: this.props.registerUser.transacionador.usuario.senha,
    confirmacaoSenha: this.props.registerUser.transacionador.usuario.confirmacaoSenha,
    personalidade: this.props.registerUser.transacionador.tipoTransacionador,
    showPassword: false,
    showConfirmationPassword: false,
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  handleClickShowPassword = () => {
    this.setState(previousState => {
      return({
        showPassword: !previousState.showPassword,
      });
    })
  }

  handleClickShowPasswordConfirmation = () => {
    this.setState(previousState => {
      return({
        showConfirmationPassword: !previousState.showConfirmationPassword,
      });
    })
  }

  handleValidateFields = () => {
    const data = {
      email: this.state.email,
      senha: this.state.senha,
      confirmacaoSenha: this.state.confirmacaoSenha,
      tipoTransacionador: this.state.personalidade,
    }
    const senhaQuantidadeMinimaDigitos = (data.senha.length >= 8);
    const senhaConfirmada = data.senha === data.confirmacaoSenha;

    const blankInputs = Object.keys(data).filter(key => data[key] === '');
    
    if ((blankInputs.length === 0) && senhaConfirmada && senhaQuantidadeMinimaDigitos) {
      const sendData = this.props.registerUser;
      sendData.transacionador.tipoTransacionador = data.tipoTransacionador;
      sendData.transacionador.usuario.email = data.email;
      sendData.transacionador.usuario.senha = data.senha;
      sendData.transacionador.usuario.confirmacaoSenha = data.confirmacaoSenha;
      sendData.transacionador.usuario.ativo = true;

      this.props.saveUserRegisterData(sendData);
    }

    if (!senhaQuantidadeMinimaDigitos) {
      this.props.digitosSenhaInsuficientes();
    } else if (this.props.error === SENHA_EXIGE_8_DIGITOS) {
      this.props.clearErrors();
    }
    
    this.props.beforeNextStepError(((blankInputs.length > 0) || !senhaConfirmada || !senhaQuantidadeMinimaDigitos));
    return ((blankInputs.length === 0) && senhaConfirmada && senhaQuantidadeMinimaDigitos);
  }

  render() {   
    const { classes, error, step } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);

    return(
      <React.Fragment>        
        <div className={classes.root}>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.email, [EMAIL_INVALIDO, EMAIL_CADASTRADO])}
            aria-describedby="email-error-text"
          > 
            <InputLabel htmlFor="input-email">E-Mail</InputLabel>
            <Input 
              id="input-email"
              name="email"
              type="email"
              placeholder="example@medial.com.br"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            {
              handleFieldShowError(this.props, this.state.email, [EMAIL_INVALIDO, EMAIL_CADASTRADO]) &&
              <FormHelperText id="email-error-text">{error.adaptedMessage || 'Preencha o email'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.senha, [SENHA_NAO_INFORMADA, SENHA_EXIGE_8_DIGITOS])}
            aria-describedby="password-error-text"
          >
            <InputLabel htmlFor="adornment-password">Senha</InputLabel>
            <Input 
              id="adornment-password"
              name="password"
             type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.senha}
              onChange={this.handleChange('senha')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Exibir senha"
                    onClick={this.handleClickShowPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              (handleFieldShowError(this.props, this.state.senha, [SENHA_NAO_INFORMADA, SENHA_EXIGE_8_DIGITOS])) &&
              <FormHelperText id="password-error-text">{error.adaptedMessage || 'Preencha a senha'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={
              (handleFieldShowError(this.props, this.state.senha, [SENHA_NAO_INFORMADA, SENHA_EXIGE_8_DIGITOS, SENHAS_NAO_COINCIDEM]) ||
              (step.beforeNextStepError && (this.state.confirmacaoSenha !== this.state.senha)))}
            aria-describedby="passwordConfirmation-error-text"
          >
            <InputLabel htmlFor="adornment-passwordConfirmation">Confirmar Senha</InputLabel>
            <Input 
              id="adornment-passwordConfirmation"
              name="passwordConfirmation"
              type={this.state.showConfirmationPassword ? 'text' : 'password'}
              value={this.state.confirmacaoSenha}
              onChange={this.handleChange('confirmacaoSenha')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Exibir senha"
                    onClick={this.handleClickShowPasswordConfirmation}
                  >
                    {this.state.showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {
              (handleFieldShowError(this.props, this.state.senha, [SENHA_NAO_INFORMADA, SENHA_EXIGE_8_DIGITOS, SENHAS_NAO_COINCIDEM]) ||
              (step.beforeNextStepError && (this.state.confirmacaoSenha !== this.state.senha))) &&
              <FormHelperText id="passwordConfirmation-error-text">{error.adaptedMessage || 'Confirme a senha'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.personalidadeForm, classes.fill].join(' ')}
          >
            <FormLabel className={classes.personalidadeForm}>Personalidade</FormLabel>
            <RadioGroup
              aria-label="Personalidade"
              name="personalidade1"                           
              value={this.state.personalidade}
              onChange={this.handleChange('personalidade')}
              className={classes.radioGroup}
            >
              <FormControlLabel 
                value="F" 
                control={<Radio />} 
                label="Pessoa Física" 
              />
              <FormControlLabel 
                value="J"
                control={<Radio />} 
                label="Pessoa Jurídica" 
              />
            </RadioGroup>
          </FormControl>
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
  bindActionCreators({ 
    ...stepsActions, 
    ...registerUserActions,
    ...errorActions 
  }, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Usuario);