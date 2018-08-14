import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import axios from '../../../services/axios';
import { FORM_SUBMIT_FAIL } from '../../../services/errors/actionTypes';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
});

const formSubmitFail = payload => dispatch => {
  return dispatch({
    type: FORM_SUBMIT_FAIL,
    payload,
  });
}

class RegisterUser extends Component {

  state = {
    name: '',
    email: '',    
    registrationPhysicalPerson: '',
    password: '',
    passwordConfirmation: '',
    showPassword: false,
    beforeSubmitError: false,
    dialog: {
      open: false,
      title: '',
      content: '',
    }
  };

  handleRegister = event => {

    event.preventDefault();

    const { formSubmitFail } = this.props;
    const { name, email, password, passwordConfirmation, registrationPhysicalPerson } = event.target;
    const data = {
      nome: name.value,
      email: email.value,      
      senha: password.value,
      confirmacaoSenha: passwordConfirmation.value,
      cpf: registrationPhysicalPerson.value,     
    }

    const blankInputs = Object.keys(data).filter(key => data[key] === '');
    
    if (blankInputs.length > 0) {
      this.setState({ beforeSubmitError: true });
    } else {
      this.setState({ beforeSubmitError: false });
    
      axios.post('/usuario/cadastrar', data)
        .then(response => {
          const { status, message } = response.data;

          if (status !== true){
            formSubmitFail({
              status,
              message,
            });
          } else {
            this.handleOpenDialog(message, 'Usuário cadastrado com sucesso!');
          }
        })
        .catch(erro => console.log(erro));
    }

    event.preventDefault();
  }

  handleOpenDialog = (title, content) => {
    const dialog = {
      title,
      content,
      open: true,
    }
    this.setState({ dialog });
  }

  handleCloseDialog = () => {
    const dialog = {
      title: '',
      content: '',
      open: false,
    }
    this.setState({ dialog });
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

  render() {
    const { classes, error } = this.props;
    return(
      <React.Fragment>
        <form onSubmit={this.handleRegister} className={classes.root}>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={this.state.beforeSubmitError && this.state.name === '' ? true : false}
            aria-describedby="password-error-text"
          >
            <InputLabel htmlFor="input-name">Nome completo</InputLabel>
            <Input 
              id="input-name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
            {(this.state.beforeSubmitError && this.state.name === '') &&
              <FormHelperText id="name-error-text">Preencha o campo</FormHelperText>
            }
          </FormControl>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={
              (error.status === 'EMAIL_ALREADY_EXISTS') || 
              (this.state.beforeSubmitError && this.state.email === '') ? true : false}
            aria-describedby="email-error-text"
          >
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <Input 
              id="input-email"
              name="email"
              type="email"
              placeholder="example@medial.com.br"
              value={this.state.email}
              onChange={this.handleChange('email')}
            />
            {((error.status = 'EMAIL_ALREADY_EXISTS') || (this.state.beforeSubmitError && this.state.email === '')) &&
              <FormHelperText id="email-error-text">{error.message || 'Preencha o email'}</FormHelperText>
            }
          </FormControl>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={
              (error.status === 'RPP_ALREADY_EXISTS') ||
              (this.state.beforeSubmitError && this.state.registrationPhysicalPerson === '') ? true : false}
            aria-describedby="rpp-error-text"
          >
            <InputLabel htmlFor="input-rpp">CPF/CNPJ</InputLabel>
            <Input 
              id="input-rpp" //RPP - Register Physical Person = CPF
              name="registrationPhysicalPerson"
              type="text"
              placeholder="000.000.000-00"
              value={this.state.registrationPhysicalPerson}
              onChange={this.handleChange('registrationPhysicalPerson')}
            />
            {((error.status = 'RPP_ALREADY_EXISTS') || (this.state.beforeSubmitError && this.state.registrationPhysicalPerson === '')) &&
              <FormHelperText id="rpp-error-text">{error.message || 'Preencha o CPF/CNPJ'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.state.beforeSubmitError && this.state.password === '' ? true : false}
            aria-describedby="password-error-text"
          >
            <InputLabel htmlFor="adornment-password">Senha</InputLabel>
            <Input 
              id="adornment-password"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
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
            {(this.state.beforeSubmitError && this.state.password === '') &&
              <FormHelperText id="password-error-text">Preencha a senha</FormHelperText>
            }
          </FormControl>

          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.state.beforeSubmitError && this.state.passwordConfirmation === '' ? true : false}
            aria-describedby="passwordConfirmation-error-text"
          >
            <InputLabel htmlFor="adornment-passwordConfirmation">Confirmar Senha</InputLabel>
            <Input 
              id="adornment-passwordConfirmation"
              name="passwordConfirmation"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.passwordConfirmation}
              onChange={this.handleChange('passwordConfirmation')}
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
            {(this.state.beforeSubmitError && this.state.passwordConfirmation === '') &&
              <FormHelperText id="passwordConfirmation-error-text">Confirme a senha</FormHelperText>
            }
          </FormControl>
          <Button color="default" component={Link} to="/login" variant="flat" className={classes.margin}>
            <ChevronLeft className={classes.rightIcon} />
            Voltar
          </Button>
          <Button type="submit" variant="raised" color="primary" className={classes.margin}>
            Cadastrar
          </Button>
        </form>
        <Dialog
          open={this.state.dialog.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEnforceFocus
        >
          <DialogTitle id="alert-dialog-title">{this.state.dialog.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.dialog.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.history.replace('/login')} color="primary" autoFocus>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
})

export default compose(
  withStyles(styles),
  connect(mapStateToProps, { formSubmitFail }),
)(RegisterUser);

