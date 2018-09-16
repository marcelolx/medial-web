import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withStyles, FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';
import { TextMaskPhone, TextMaskCellPhone } from '../../../../../components/Masks';

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
});

class Contato extends Component {

  state = {
    telefone: this.props.registerUser.transacionador.contatos.telefone,
    celular: this.props.registerUser.transacionador.contatos.telefone,
  }

  handleValidateFields = () => {
    const blankInputs = Object.keys(this.state).filter(key => this.state[key] === '');

    if (blankInputs.length === 0) {
      const sendData = this.props.registerUser;
      sendData.transacionador.contatos = {
        telefone: this.state.telefone,
        celular: this.state.celular,
      };

      this.props.actions.saveUserRegisterData(sendData);
      this.props.actions.userRegister(this.props.registerUser);
    };

    this.props.actions.beforeNextStepError((blankInputs.length > 0));
    return (blankInputs.length === 0);
  };

  handleFieldShowError = (field) => {
    return (this.props.step.beforeNextStepError && field === '');
  }

  handleChange = prop => event => {    
    this.setState({ [prop]: event.target.value });
  }

  render() {
    const { classes } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);
    
    return(
      <React.Fragment>
        <div className={classes.root}>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={this.handleFieldShowError(this.state.telefone)} 
            aria-describedby="telefone-error-text"
          >
            <InputLabel htmlFor="input-telefone">Telefone</InputLabel>
            <Input 
              id="input-telefone"
              name="telefone"
              type="text"
              inputComponent={TextMaskPhone}
              value={this.state.telefone}
              onChange={this.handleChange('telefone')}
            />
            {
              this.handleFieldShowError(this.state.telefone) &&
              <FormHelperText id="telefone-error-text">Informe o telefone</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.handleFieldShowError(this.state.celular)}
            aria-describedby="celular-error-text"
          >
            <InputLabel htmlFor="input-celular">Celular</InputLabel>
            <Input 
              id="input-celular"
              name="celular"
              type="text"
              inputComponent={TextMaskCellPhone}
              value={this.state.celular}
              onChange={this.handleChange('celular')}
            />
            {
              this.handleFieldShowError(this.state.celular) &&
              <FormHelperText id="celular-error-text">Informe o celular</FormHelperText>
            }
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
  step: state.step,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ 
    ...stepsActions, 
    ...registerUserActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Contato);