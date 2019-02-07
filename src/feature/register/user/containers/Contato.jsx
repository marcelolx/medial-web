import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withStyles, FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import * as stepsActions from '../../../../core/services/steps/stepsActions';
import * as registerUserActions from '../services/user/registerUserActions'
import * as errorActions from '../../../../core/services/errors/errorActions';
import RegisterStepButton from '../../../../core/components/root/registerstep/buttons/RegisterStepButtons';
import { TextMaskPhone, TextMaskCellPhone } from '../../../../core/components/masks/Masks';
import handleFieldShowError from '../../../../core/utils/validateFields.jsx';
import { CELULAR_NAO_INFORMADO } from '../utils/registerUserMessagesHelper';
import { TELEFONE_NAO_INFORMADO } from '../../../../core/utils/messages/errorMessages';

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
        telefone: this.state.telefone.replace(/\D/g, ''),
        celular: this.state.celular.replace(/\D/g, ''),
      };

      console.log(sendData);      
      this.props.actions.saveUserRegisterData(sendData);
      this.props.actions.clearErrors();
      this.props.actions.userRegister(this.props.registerUser);
    };

    this.props.actions.beforeNextStepError((blankInputs.length > 0));
    return (blankInputs.length === 0);
  };

  handleChange = prop => event => {    
    this.setState({ [prop]: event.target.value });
  }

  render() {
    const { classes, error } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);
    
    return(
      <React.Fragment>
        <div className={classes.root}>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.telefone, [TELEFONE_NAO_INFORMADO])} 
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
              handleFieldShowError(this.props, this.state.telefone, [TELEFONE_NAO_INFORMADO]) &&
              <FormHelperText id="telefone-error-text">{error.message.message || 'Informe o telefone'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.celular, [CELULAR_NAO_INFORMADO])}
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
              handleFieldShowError(this.props, this.state.celular, [CELULAR_NAO_INFORMADO]) &&
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
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ 
    ...stepsActions, 
    ...registerUserActions,
    ...errorActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Contato);