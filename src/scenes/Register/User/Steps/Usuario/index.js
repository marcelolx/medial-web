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
   // return true;   
    const data = {
      email: this.state.email,
      senha: this.state.senha,
      confirmacaoSenha: this.state.confirmacaoSenha,
      tipoTransacionador: this.state.personalidade,
    }
    const senhaConfirmada = data.senha === data.confirmacaoSenha;

    const blankInputs = Object.keys(data).filter(key => data[key] === '');
    
    if ((blankInputs.length === 0) && (senhaConfirmada)) {
      const sendData = this.props.registerUser;
      sendData.transacionador.tipoTransacionador = data.tipoTransacionador;
      sendData.transacionador.usuario.email = data.email;
      sendData.transacionador.usuario.senha = data.senha;
      sendData.transacionador.usuario.confirmacaoSenha = data.confirmacaoSenha;
      sendData.transacionador.usuario.ativo = true;

      this.props.saveUserRegisterData(sendData);
    }
    
    this.props.beforeNextStepError(((blankInputs.length > 0) || (!senhaConfirmada)));
    return ((blankInputs.length === 0) && senhaConfirmada);
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
            error={
              (error.status === 'EMAIL_ALREADY_EXISTS') || 
              (step.beforeNextStepError && this.state.email === '') ? true : false}
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
            {((error.status === 'EMAIL_ALREADY_EXISTS') || (step.beforeNextStepError && this.state.email === '')) &&
              <FormHelperText id="email-error-text">{error.message || 'Preencha o email'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={step.beforeNextStepError && this.state.senha === '' ? true : false}
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
            {(step.beforeNextStepError && this.state.senha === '') &&
              <FormHelperText id="password-error-text">Preencha a senha</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={(step.beforeNextStepError && 
              ((this.state.confirmacaoSenha === '') || (this.state.confirmacaoSenha !== this.state.senha))) ? true : false}
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
            {(step.beforeNextStepError && 
              ((this.state.confirmacaoSenha === '') || (this.state.confirmacaoSenha !== this.state.senha))) &&
              <FormHelperText id="passwordConfirmation-error-text">Confirme a senha</FormHelperText>
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
  bindActionCreators({ ...stepsActions, ...registerUserActions }, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Usuario);