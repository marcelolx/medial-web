import React from 'react';
import GridContainer from '../../../../../core/components/grid/GridContainer';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../../../core/components/grid/GridItem';
import { bindActionCreators } from 'redux';
import * as assuntosActions from './services/assuntosActions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import SearchSelect from '../../../../../core/components/SearchSelect';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MINIMO_CARACTERES_500, SELECIONAR_CONFLITO_E_ASSUNTO } from '../../constants/mediacaoStepConstants';
import { ASSUNTO_INVALIDO, MENSAGEM_MENOS_500_CARACTERES } from '../../../../admin/mediacao/utils/mediacaoMessagesHelper';

const style = {
  multilineTextField: {
    width: '100%'
  }
};

class Motivo extends React.Component {
  
  state = {
    conflitos: [],
    assuntos: [],
    mensagem: '',
    errorCode: '',
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    let isValid = (
      ((this.state.conflitos.value !== undefined) && (this.state.conflitos.value > 0)) &&
      ((this.state.assuntos.value !== undefined) && (this.state.assuntos.value > 0)));

    if (!isValid) {
      this.setState({
        errorCode: SELECIONAR_CONFLITO_E_ASSUNTO
      });
      return isValid;
    }

    if (this.state.mensagem.length < 500) {
      this.setState({
        errorCode: MINIMO_CARACTERES_500
      });
      isValid = false;
    } else {
      this.setState({
        errorCode: ''
      });
    }

    return isValid;
  }

  componentDidMount() {
    if (this.props.assuntos.conflitos.length === 0) {
      this.props.actions.getConflitos();
    }
  }

  handleSelectChange = name => selecionado => {
    this.setState({ [name]: selecionado });

    if (name === 'conflitos') {
      (selecionado.value !== undefined)
        ? this.buscarListaAssuntos(selecionado.value)
        : this.limparListasAssutos();
    }
  }

  buscarListaAssuntos(idConflito) {
    this.setState({
      assuntos: [],
    });

    this.props.actions.getAssuntos(idConflito);
  }

  limparListasAssutos() {
    this.setState({
      assuntos: []
    });
    this.props.actions.clearAssuntos();
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  render() {
    const { classes, assuntos, mediacao } = this.props;

    return (
      <React.Fragment>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={5}>
            <SearchSelect
              opcoes={assuntos.conflitos}
              name='conflitos'
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.conflitos}
              placeholder='Conflitos'
              formControlProps={{
                fullWidth: true
              }}
              error={((this.state.errorCode === SELECIONAR_CONFLITO_E_ASSUNTO) && (this.state.conflitos.length === 0))}
              errorHelperText='Selecione o tipo de conflito'
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={5}>
            <SearchSelect
              opcoes={assuntos.assuntos}
              name='assuntos'
              onChange={(name, value) => this.handleSelectChange(name, value)}
              value={this.state.assuntos}
              placeholder='Assuntos'
              formControlProps={{
                fullWidth: true,
              }}
              error={((this.state.errorCode === SELECIONAR_CONFLITO_E_ASSUNTO) && (this.state.assuntos.length === 0)) || (mediacao.errorCode === ASSUNTO_INVALIDO)}
              errorHelperText={mediacao.mensagem || 'Selecione o assunto relacionado ao conflito'}
            />
          </GridItem>
        </GridContainer>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={5}>
            <FormControl
              className={classes.multilineTextField}
              error={(this.state.errorCode === MINIMO_CARACTERES_500)}
              aria-describedby='mensagem-error-text'
            >
              <TextField
                id='mensagem'
                label='Mensagem'
                multiline
                rows='15'
                className={classes.multilineTextField}
                margin='normal'
                variant='outlined'
                value={this.state.mensagem}
                onChange={this.handleChange('mensagem')}
              />
              {
                ((this.state.errorCode === MINIMO_CARACTERES_500) || (mediacao.errorCode === MENSAGEM_MENOS_500_CARACTERES)) &&
                <FormHelperText id='mensagem-error-text'>{mediacao.mensagem || 'Informe uma mensagem com no mínimo 500 caracteres.'}</FormHelperText>
              }
            </FormControl>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  assuntos: state.mediacaoAssuntos,
  mediacao: state.novaMediacao,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...assuntosActions
  }, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(style)
)(Motivo);