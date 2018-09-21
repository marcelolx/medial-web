import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Logo from '../../components/Root/Logo';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import queryString from 'query-string';
import * as authActions from '../../services/admin/authentication/actions';
import { LOGIN_ERROR } from '../../services/errors/actionTypes';


const styles = theme => ({
  baseRoot: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
  half: {
    flexBasis: '45%',
  }
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  componentDidMount() {

    if( this.props.location.search !== null && this.props.location.search !== ""){
        this.validarAtivacao(this.props.location.search);
        //TODO
    }
    this.redirectLogged();
  }

  componentDidUpdate() {
    this.redirectLogged();
  }

  validarAtivacao(valor){
    let parametros =  queryString.parse(valor);

    this.props.actions.validacaoEmail(parametros)
    if(parametros.user !== null &&  parametros.validacao !== undefined && parametros.validacao !== null)
       this.sucessoCadastro();
  }

  redirectLogged() {
    const { auth, history } = this.props;

    if (auth.isAuthenticated) {
      history.push('/');
    }
  }

  handleLogin = e => {
    const { email, password } = e.target;

    this.props.actions.login(email.value, password.value);

    e.preventDefault();
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleClickShowPassword = () => {
    this.setState(prevState => {
      return ({
        showPassword: !prevState.showPassword,
      });
    })
  }

  sucessoCadastro() { 
      MySwal.fire({
        title: <p>Cadastro realizado com sucesso!</p>,
        type: 'success',
        timer: 3000,
        showConfirmButton: true,
    }).then(() => {
  })}


  render() {
    const { classes, error } = this.props;
    return (
      <React.Fragment>
        <div className={classes.baseRoot}>
          <Logo />
          <form onSubmit={this.handleLogin} className={classes.root}>
            <FormControl
              className={[classes.margin, classes.fill].join(' ')}
              error={(error.message === LOGIN_ERROR)}
              aria-describedby="email-error-text"
            >
              <InputLabel htmlFor="input-email">Email</InputLabel>
              <Input
                name="email"
                id="input-email"
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
              />
              {
                (error.message === LOGIN_ERROR) &&
                <FormHelperText id="email-error-text">{error.adaptedMessage}</FormHelperText>
              }
            </FormControl>

            <FormControl
              className={[classes.margin, classes.fill].join(' ')}
              error={(error.message === LOGIN_ERROR)}
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
                      aria-label="Toque para ver a senha"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {
                (error.message === LOGIN_ERROR) &&
                <FormHelperText id="email-error-text">{error.adaptedMessage}</FormHelperText>
              }
            </FormControl>
            <Button component={Link} to="/user/register" variant="flat" className={[classes.margin, classes.half].join(' ')}>
              Cadastre-se
            </Button>
            <Button type="submit" variant="raised" color="primary" className={[classes.margin, classes.half].join(' ')}>
              Entrar
            </Button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}


const MySwal = withReactContent(Swal)

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Login)); 