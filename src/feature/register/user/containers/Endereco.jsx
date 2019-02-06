import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import { compose } from 'recompose';
import { withStyles, FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import RegisterStepButton from '../../../../core/components/root/registerstep/buttons/RegisterStepButtons';
import { TextMaskCEP, TextMaskForNumbers } from '../../../../core/components/masks/Masks';
import SearchSelect from '../../../../core/components/root/registerstep/searchselect/SearchSelect';
import * as paisesActions from '../../../../../services/graphql/paises/actions';
import * as estadosActions from '../../../../../services/graphql/estados/actions';
import * as cidadesActions from '../../../../../services/graphql/cidades/actions';
import handleFieldShowError from '../../../../../utils/validateFields';
import { PAIS_NAO_INFORMADO, ESTADO_NAO_INFORMADO, CIDADE_NAO_INFORMADA, CEP_NAO_INFORMADO, BAIRRO_NAO_INFORMADO, RUA_NAO_INFORMADA, NUMERO_NAO_INFORMADO } from '../../../../../services/register/user/messages';

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

class Endereco extends Component {

  state = {
    pais: this.props.registerUser.transacionador.endereco.pais,
    estado: this.props.registerUser.transacionador.endereco.estado,
    cidade: this.props.registerUser.transacionador.endereco.cidade,
    cep: this.props.registerUser.transacionador.endereco.cep,
    bairro: this.props.registerUser.transacionador.endereco.bairro,
    rua: this.props.registerUser.transacionador.endereco.rua,
    numero: this.props.registerUser.transacionador.endereco.numero,    
  }

  componentDidMount() {
    if (this.props.paises.list.length === 0) {
      this.props.actions.getAllCountries();
    }
  }

  handleValidateFields = () => {
    const data = {
      pais: this.state.pais.value,
      estado: this.state.estado.value,
      cidade: this.state.cidade.value,
      cep: this.state.cep,
      bairro: this.state.bairro,
      rua: this.state.rua,
      numero: this.state.numero,
    }

    const blankInputs = Object.keys(data).filter(key => data[key] === '')

    if (blankInputs.length === 0) {
      const sendData = this.props.registerUser;
      sendData.transacionador.endereco = { 
        pais: this.state.pais,
        estado: this.state.estado,
        cidade: this.state.cidade,
        cep: this.state.cep.replace(/\D/g, ''),
        bairro: this.state.bairro,
        rua: this.state.rua,
        numero: this.state.numero.replace(/\s/g, ''),
      };
      
      this.props.actions.saveUserRegisterData(sendData);
    };

    this.props.actions.beforeNextStepError((blankInputs.length > 0));
    return (blankInputs.length === 0);
  }
  
  handleChange = prop => event => {    
    this.setState({ [prop]: event.target.value });
  }

  handleSelectChange = name => selecionado => {
    this.setState({ [name]: selecionado });
    
    if (selecionado.value !== undefined) {
      switch (name) {
        case 'pais':  
          this.props.actions.getCountryStates(selecionado.value);
        break;
        case 'estado':
          this.props.actions.getStateCities(selecionado.value);
        break;
        default: break;
      };
    } else {
      switch (name) {
        case 'pais':
          this.setState({
            estado: [],
            cidade: [],
          });
          this.props.actions.clearStates();
          this.props.actions.clearCities();
        break;
        case 'estado':
          this.setState({
            cidade: [],
          });
          this.props.actions.clearCities();
        break;
        default: break;
      };
    }
  }

  setCountry = pais => {
    if (pais.value === this.state.pais.value) {
      this.setState({
        pais: {
          value: pais.value,
          label: pais.label,
        },
      });
    }
  }

  handleFieldListShowError = (props, field, storeField, typeErros) => {
    const { error, step } = props;

    return(
      (step.beforeNextStepError && field.value === undefined) ||
      ((storeField.list.length === 0) && (storeField.message !== null)) ||
      (Object.keys(typeErros).filter(key => typeErros[key] === error.message.message).length > 0));
  }

  render() {
    const { classes, error, paises, estados, cidades } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);
    
    return(
      <React.Fragment>        
        <div className={classes.root}>          
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}            
            error={this.handleFieldListShowError(this.props, this.state.pais, paises, [PAIS_NAO_INFORMADO])}
            aria-describedby="pais-error-text"
          >      
            <SearchSelect 
              opcoes={paises.list}
              name="pais"
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.pais}              
              placeholder="País"            
            />
            { 
              this.handleFieldListShowError(this.props, this.state.pais, paises, [PAIS_NAO_INFORMADO]) &&
              <FormHelperText id="pais-error-text">{paises.message || 'Informe o País'}</FormHelperText>
            }
          </FormControl>          
          <FormControl            
            className={[classes.margin, classes.fill].join(' ')}            
            error={this.handleFieldListShowError(this.props, this.state.estado, estados, [ESTADO_NAO_INFORMADO])}
            aria-describedby="estado-error-text"
          > 
            <SearchSelect 
              opcoes={estados.list}
              name="estado"
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.estado}
              placeholder="Estado"
            />
            {
              this.handleFieldListShowError(this.props, this.state.estado, estados, [ESTADO_NAO_INFORMADO]) && 
              <FormHelperText id="estado-error-text">{error.message.message || 'Informe o Estado'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={this.handleFieldListShowError(this.props, this.state.cidade, cidades, [CIDADE_NAO_INFORMADA])}
            aria-describedby="cidade-error-text"
          >
            <SearchSelect 
              opcoes={cidades.list}
              name="cidade"
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.cidade}
              placeholder="Cidade"
            />
            {
              this.handleFieldListShowError(this.props, this.state.cidade, cidades, [CIDADE_NAO_INFORMADA]) &&
              <FormHelperText id="cidade-error-text">{error.message.message || 'Informe a Cidade'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.cep, [CEP_NAO_INFORMADO])}
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
              handleFieldShowError(this.props, this.state.cep, [CEP_NAO_INFORMADO]) && 
              <FormHelperText id="cep-error-text">{error.message.message || 'Informe o CEP'}</FormHelperText>
            }
          </FormControl>
          <FormControl 
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.bairro, [BAIRRO_NAO_INFORMADO])}
            aria-describedby="bairro-error-text"
          >
            <InputLabel htmlFor="input-bairro">Bairro</InputLabel>
            <Input 
              id="input-bairro"
              name="bairro"
              type="text"
              value={this.state.bairro}
              onChange={this.handleChange('bairro')}
            />
            {
              handleFieldShowError(this.props, this.state.bairro, [BAIRRO_NAO_INFORMADO]) && 
              <FormHelperText id="bairro-error-text">{error.message.message || 'Informe o Bairro'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.rua, [RUA_NAO_INFORMADA])}
            aria-describedby="rua-error-text"
          >
            <InputLabel htmlFor="input-rua">Rua</InputLabel>
            <Input 
              id='input-rua'
              name="rua"
              type="text"
              value={this.state.rua}
              onChange={this.handleChange('rua')}
            />
            {
              handleFieldShowError(this.props, this.state.rua, [RUA_NAO_INFORMADA]) &&
              <FormHelperText id="rua-error-text">{error.message.message || 'Informe a Rua'}</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={handleFieldShowError(this.props, this.state.numero, [NUMERO_NAO_INFORMADO])}
            aria-describedby="numero-error-text"
          >
            <InputLabel htmlFor="input-numero">Número</InputLabel>
            <Input 
              id="input-numero"
              name="numero"
              type="text"
              inputComponent={TextMaskForNumbers}
              value={this.state.numero}              
              onChange={this.handleChange('numero')}
            />
            {
              handleFieldShowError(this.props, this.state.numero, [NUMERO_NAO_INFORMADO]) &&
              <FormHelperText id="numero-error-text">{error.message.message || 'Informe o número do seu endereço'}</FormHelperText>
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
  paises: state.paises,
  estados: state.estados,
  cidades: state.cidades,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ 
    ...stepsActions,
    ...registerUserActions,
    ...paisesActions,
    ...estadosActions,
    ...cidadesActions,
  }, dispatch)
});
  
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Endereco);