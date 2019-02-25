import React from 'react';
import GridContainer from '../../../../../core/components/grid/GridContainer';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../../../core/components/grid/GridItem';
import { bindActionCreators } from 'redux';
import * as assuntosActions from './services/assuntosActions';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import SearchSelect from '../../../../../core/components/SearchSelect';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { MINIMO_CARACTERES_500, SELECIONAR_CONFLITO_E_ASSUNTO, MAXIMO_CARACTERES_3000 } from '../../constants/mediacaoStepConstants';
import { ASSUNTO_INVALIDO, MENSAGEM_MENOS_500_CARACTERES } from '../../../../admin/mediacao/utils/mediacaoMessagesHelper';
import '../../../../../assets/css/quill.snow.css';
import FileUpload from '../../../../../core/components/FileUpload';
import CustomListFiles from '../../../../../core/components/CustomListFiles';
import Editor from '../../../../../core/components/Editor';

const style = {
  multilineTextField: { width: '100%' },
  gridAnexo: { marginTop: 35 }
};

class Motivo extends React.Component {

  state = {
    conflitos: [],
    assuntos: [],
    mensagem: '',
    errorCode: '',
    arquivo: []
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
    } else if (this.state.mensagem.length > 3000) {
      this.setState({
        errorCode: MAXIMO_CARACTERES_3000
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

  _handleChangeFile(files) {
    this.setState({ arquivo: files })
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
          <GridItem xs={12} sm={12} md={10} >
            <span>Relate o motivo:</span>
            <FormControl
              className={classes.multilineTextField}
              error={(this.state.errorCode === MINIMO_CARACTERES_500 || (this.state.errorCode === MAXIMO_CARACTERES_3000))}
              aria-describedby='mensagem-error-text'
            >
              <Editor value={this.state.mensagem}
                placeholder="Relate o motivo da sua solicitação"
                onChange={(valor) => this.setState({ mensagem: valor })} />
              {
                ((this.state.errorCode === MINIMO_CARACTERES_500) || (mediacao.errorCode === MENSAGEM_MENOS_500_CARACTERES) || (this.state.errorCode === MAXIMO_CARACTERES_3000)) &&
                <FormHelperText id='mensagem-error-text'>{mediacao.mensagem || (this.state.errorCode === MAXIMO_CARACTERES_3000) ? 'Informe uma mensagem com no máximo 3000 caracteres com formatação.' : 'Informe uma mensagem com no mínimo 500 caracteres.'}</FormHelperText>
              }
            </FormControl>
          </GridItem>

        </GridContainer>
        <GridContainer justify='center' className={classes.gridAnexo}>
          <GridItem xs={12} sm={12} md={10} >
            <CustomListFiles files={this.state.arquivo} canDelete onChange={(files) => this._handleChangeFile(files)} />

            <FileUpload
              onChange={(valor) => this._handleChangeFile(valor)}
              files={this.state.arquivo}
              adicionarButtonProps={{
                color: 'secondary',
                round: true
              }}
              removerButtonProps={{
                color: 'primary',
                round: true
              }} />
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