import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';
import { compose } from 'recompose';
import { withStyles, FormControl, FormHelperText, InputLabel, Input } from '@material-ui/core';
import { connect } from 'react-redux';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';
import { TextMaskCEP } from '../../../../../components/Masks';
import SearchSelect from '../../../../../components/Root/RegisterStep/SearchSelect';
import * as paisesActions from '../../../../../services/graphql/paises/actions';
import * as estadosActions from '../../../../../services/graphql/estados/actions';
import * as cidadesActions from '../../../../../services/graphql/cidades/actions';

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
  }

  componentDidMount() {
    if (this.props.paises.list.length === 0) {
      this.props.actions.getAllCountries();
    }
  }

  handleValidateFields = () => {
    this.props.actions.beforeNextStepError(true);
    return false;
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

  render() {
    const { classes, step, paises, estados, cidades } = this.props;
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);      

    //paises.list.filter(pais => this.setCountry(pais)); Vai ficar em looop infinito    
    
    return(
      <React.Fragment>        
        <div className={classes.root}>          
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}            
            error={
              (((step.beforeNextStepError && this.state.pais.value === undefined) ? true : false) ||
              (((paises.list.length === 0) && (paises.message !== null)) ? true : false))
            }
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
              ((step.beforeNextStepError && this.state.pais.value === undefined) ||
              ((paises.list.length === 0) && (paises.message !== null))) &&
              <FormHelperText id="pais-error-text">{paises.message || 'Informe o País'}</FormHelperText>
            }
          </FormControl>          
          <FormControl            
            className={[classes.margin, classes.fill].join(' ')}            
            error={
              (((step.beforeNextStepError && this.state.estado.value === undefined) ? true : false) ||
              (((estados.list.length === 0) && (estados.message !== null)) ? true : false))
            }
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
              (((step.beforeNextStepError && this.state.estado.value === undefined) ? true : false) ||
              (((estados.list.length === 0) && (estados.message !== null)) ? true : false)) && 
              <FormHelperText id="estado-error-text">Informe o Estado</FormHelperText>
            }
          </FormControl>
          <FormControl
            className={[classes.margin, classes.fill].join(' ')}
            error={
              (((step.beforeNextStepError && this.state.cidade.value === undefined) ? true : false) ||
              (((cidades.list.length === 0) && (cidades.message !== null)) ? true : false))
            }
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
              (((step.beforeNextStepError && this.state.cidade.value === undefined) ? true : false) ||
              (((cidades.list.length === 0) && (cidades.message !== null)) ? true : false)) &&
              <FormHelperText id="cidade-error-text">Informe a Cidade</FormHelperText>
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