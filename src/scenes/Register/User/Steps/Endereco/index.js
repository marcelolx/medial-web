import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import { compose } from 'recompose';
import { withStyles, FormControl, FormHelperText, InputLabel, Input, Select } from '@material-ui/core';
import { connect } from 'react-redux';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';
import { TextMaskCEP } from '../../../../../components/Masks';
//import NoSsr from '@material-ui/core/NoSsr';

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

const paises = [
  { label: 'Brasil' }
].map(pais => ({
  value: pais.label,
  label: pais.label,
}));

const selectComponents = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Endereco extends Component {

  state = {
    pais: this.props.registerUser.transacionador.endereco.pais,
    cep: this.props.registerUser.transacionador.endereco.cep,
  }

  handleValidateFields = () => {
    return true;
  }
  
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  render() {
    const { classes, step } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);

    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        '& input': {
          font: 'inherit',
        },
      }),
    };

    return(
      <React.Fragment>
        <div className={classes.root}>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={(step.beforeNextStepError && this.state.pais === '') ? true : false}
            aria-describedby="pais-error-text"
          >
            <InputLabel htmlFor="pais-input">País</InputLabel>
           {/* <NoSsr>
              <Select 
                classes={classes}
                styles={selectStyles}
                options={paises}
                components={selectComponents}
                value={this.state.pais}
                onChange={this.handleChange('pais')}
                placeholder="Pesquise seu país"
              />
           </NoSsr>*/}
            {
              (step.beforeNextStepError && this.state.pais === '') &&
              <FormHelperText id="pais-error-text">Informe o País</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={(step.beforeNextStepError && this.state.cep  === '') ? true : false}
            aria-describedby="cep-error-text"
          >
            <InputLabel htmlFor="input-cep">CEP</InputLabel>
            <Input 
              id="input-cep"
              name="cep"
              type="text"
              inputComponent={TextMaskCEP}
              value={this.state.cep}
              onChange={this.handleChange('cep')}
            />
            {
              (step.beforeNextStepError && this.state.cep === '') && 
              <FormHelperText id="cep-error-text">Informe o CEP</FormHelperText>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...stepsActions, ...registerUserActions }, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Endereco);