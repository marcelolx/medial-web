import React, { Component } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DatePicker from 'material-ui-pickers/DatePicker';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import * as authActions from '../../services/admin/authentication/actions';
import API from '../../services/API';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
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

class Profile extends Component {

  constructor(props) {
    super(props);
    
    //const { name, birthDate } = this.props.user;
    this.state = {
      name: 'SEM NOME', 
      birthDate: '',
      snackbarOpen: false,
    };
  }

  componentDidUpdate(prevProps) {
    /*if (prevProps.user.updatedDate !== this.props.user.updatedDate) {
      this.setState({ snackbarOpen: true });
    }*/
  }

  handleUpdate = e => {
    //const { user, updateProfile } = this.props;
    const { name, birthDate } = e.target;
    const formData = {
      name: name.value,
      birthDate: birthDate.value,
      updatedDate: new Date(),
    }

    //updateProfile(formData, user.token);

    e.preventDefault();
  }

  handleDeleteAccount = () => {
    const { auth, logout } = this.props;

    var config = {
      headers: {
        'Accept':'',
        'Authorization': auth.token,
      }
    };

    API.delete('usuario/delete', config)
    .then(response => {
      alert('Conta deletada com sucesso!');
      logout();
    })
    .catch(erro => console.log(erro));
  }

  handleChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  }

  handleBirthDateChange = (date) => {
    this.setState({ birthDate: date });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };


  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="subheading" color="textSecondary" noWrap>
          Meu Perfil
        </Typography>
        <form onSubmit={this.handleUpdate} className={classes.root}>
          <FormControl className={[classes.margin, classes.fill].join(' ')}>
            <InputLabel htmlFor="input-name">Nome completo</InputLabel>
            <Input 
              id="input-name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange('name')}
            />
          </FormControl>
          <FormControl className={[classes.margin, classes.fill].join(' ')}>
            <InputLabel htmlFor="input-email">Email</InputLabel>
            <Input 
              id="input-email"
              type="text"
              disabled={true}
              value={0/*user.email*/}
            />
          </FormControl>          
          <FormControl className={[classes.margin].join(' ')}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker 
                keyboard
                name="birthDate"
                label="Data de nascimento"
                format="DD/MM/YYYY"
                placeholder="12/01/1998"
                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                value={this.state.birthDate}
                onChange={this.handleBirthDateChange}
              />
            </MuiPickersUtilsProvider> 
          </FormControl>
          <FormControl className={[classes.margin].join(' ')}>
            <InputLabel htmlFor="input-created-date">Criado em</InputLabel>
            <Input 
              id="input-created-date"
              type="text"
              disabled={true}
              //value={moment(user.createdDate).format('MMMM Do YYYY, h:mm:ss a')}
            />
          </FormControl>
          <FormControl className={[classes.margin].join(' ')}>
            <InputLabel htmlFor="input-updated-date">Atualizado em</InputLabel>
            <Input 
              id="input-updated-date"
              type="text"
              disabled={true}
              //value={moment(user.updatedDate).format('MMMM do YYYY, h:mm:ss a')}
            />
          </FormControl>
          <Button type="submit" variant="raised" color="primary" className={classes.margin}>
            Atualizar
          </Button>
        </form>
        <Button onClick={this.handleDeleteAccount} variant="raised" color="secondary" className={classes.margin}>
          Deletar conta
        </Button>
        <Snackbar 
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2500}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Perfil Atualizado</span>}
          action={[
            <IconButton 
              key="close"
              aria-label="Fechar"
              className={classes.close}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}        
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Profile);
