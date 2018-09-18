import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { login } from '../../services/users/actions';
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
    this.redirectLogged();
  }

  componentDidUpdate() {
    this.redirectLogged();
  }

  redirectLogged() {
    const { user, history } = this.props;

    if (user.auth) {
      history.push('/');
    }
  }

  handleLogin = e => {
    const { email, password } = e.target;
    const data = {
      email: email.value,
      senha: password.value,
    }

    this.props.login(data);

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

  render() {
    const { classes, error } = this.props;
    return (
      <React.Fragment>
        <div className={classes.baseRoot}>
          <Logo />
          <form onSubmit={this.handleLogin} className={classes.root}>
            <FormControl
              className={[classes.margin, classes.fill].join(' ')}
              error={error.status === 'USER_NOT_FOUND' ? true : false}
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
              {error.status === 'USER_NOT_FOUND' &&
                <FormHelperText id="email-error-text">{error.message}</FormHelperText>
              }
            </FormControl>

            <FormControl
              className={[classes.margin, classes.fill].join(' ')}
              error={error.status === 'PASSWORD_INCORRECT' ? true : false}
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
              {error.status === 'PASSWORD_INCORRECT' &&
                <FormHelperText id="password-error-text">{error.message}</FormHelperText>
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

const mapStateToProps = state => ({
  user: state.user.data,
  error: state.error,
})

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, { login }),
)(Login)); 