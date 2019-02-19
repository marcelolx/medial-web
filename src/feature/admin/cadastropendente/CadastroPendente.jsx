import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../core/components/grid/GridContainer';
import GridItem from '../../../core/components/grid/GridItem';
import Card from '../../../core/components/card/Card';
import CardHeader from '../../../core/components/card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../core/components/card/CardBody';
import CustomInput from '../../../core/components/CustomInput';
import { TextMaskCNPJ, TextMaskCellPhone, TextMaskCPF } from '../../../core/components/Masks';
import Button from '../../../core/components/CustomButton';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';
import getAdaptedMessage, { SOLICITADO_CADASTRO_EMPRESA } from '../mediacao/utils/mediacaoMessagesHelper';
import * as requeridoPendenteActions from './services/requeridoPendenteActions';
import { bindActionCreators } from 'redux';
import Snackbar from '../../../core/components/snackbar/Snackbar';
import queryString from 'query-string';
import CadastroPendenteConstants from './constants/cadastroPendenteConstants';

const styles = ({
  semMargen: {
    margin: 0,
  },
  statusCadastro: {
    marginTop: '3%',
    marginBottom: '3px',
    textAlign: 'center'
  },
  botaoEnviar: {
    position: 'inherit',
    float: 'right',
  },
  paddingGrid: {
    padding: '0 5px',
  },
  paddingBody: {
    padding: '0 10px',
  },
});

class CadastroPendente extends React.Component {

  state = {
    mensagemHistorico: '',
    mensagemHistoricoEmpty: false,
    successNotification: false,
    erroCamposSemInfo: false,
    messageErroCamposSemInfo: ''
  }

  componentDidMount() {
    this.props.actions.getCadastroPendente(queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id);
  }

  getHistoricos() {
    const { cadastroPendente } = this.props.requeridosPendentes;

    return cadastroPendente.historico ? (
      cadastroPendente.historico.map((historico, key) => {
        return (
          <Card key={key}>
            <CardBody>
              Mediador: {historico.nomeMediador}<br />
              Status: {getAdaptedMessage(historico.situacao)}<br />
              Mensagem: {historico.mensagem}
            </CardBody>
          </Card>
        );
      })
    ) : null
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleEnviaMensagemHistorico(e) {
    e.preventDefault();

    if (this.state.mensagemHistorico !== '') {
      this.setState({
        mensagemHistoricoEmpty: false
      });

      const { cadastroPendente } = this.props.requeridosPendentes;
      const mensagemData = {
        requeridoPendente: cadastroPendente.idCadastroPendente,
        mediador: this.props.auth.id,
        situacao: cadastroPendente.situacao,
        mensagem: this.state.mensagemHistorico
      };

      this.props.actions.salvarHistorico(mensagemData);
      this.setState({ mensagemHistorico: '' });
    } else {
      this.setState({
        mensagemHistoricoEmpty: true,
      })
    }
  }

  handleConfirmarSolicitacaoCadastro() {
    const { cadastroPendente } = this.props.requeridosPendentes;

    const data = {
      idMediacao: cadastroPendente.idMediacao,
      requeridoPendente: cadastroPendente.idCadastroPendente,
      mediador: this.props.auth.id,
      situacao: SOLICITADO_CADASTRO_EMPRESA
    }

    const blankInputs = Object.keys(data).filter(key => data[key] === '');

    (blankInputs.length === 0)
      ? this.props.actions.confirmarSolicitacaoCadastro(data)
      : this.exibirErroCampoSemInfo(CadastroPendenteConstants.ERRO_INTERNO_NAO_POSSIVEL_CONFIRMAR_SOLICITACAO);
  }

  exibirErroCampoSemInfo(mensagem) {
    this.setState({
      erroCamposSemInfo: true,
      messageErroCamposSemInfo: mensagem
    });

    setTimeout(
      function () {
        this.setState({
          erroCamposSemInfo: false,
          messageErroCamposSemInfo: ''
        });
      }.bind(this), 650);
  }

  handleCloseSnackBarSuccessHistorico() {
    this.props.actions.limparEstadoHistoricoSalvo();
  }

  fecharSnackBarHistoricoSalvo() {
    if (this.props.requeridosPendentes.sucessoSalvarHistorico) {
      setTimeout(
        function () {
          this.handleCloseSnackBarSuccessHistorico()
        }.bind(this), 650);
    }
  }

  fecharSnackBarSolicitacaoCadastroConfirmada() {
    if (this.props.requeridosPendentes.cadastroConfirmado) {
      setTimeout(
        function () {
          this.props.actions.confirmarSolicitacaoCadastroFinish();
        }.bind(this), 650);
    }
  }

  render() {
    const { classes } = this.props;
    const { cadastroPendente } = this.props.requeridosPendentes;

    this.fecharSnackBarHistoricoSalvo();
    this.fecharSnackBarSolicitacaoCadastroConfirmada();

    return cadastroPendente === null ? null : (
      <React.Fragment >
        <GridContainer justify='center' >
          <GridItem xs={12} sm={12} lg={10} className={classes.paddingGrid}>
            <Card>
              <CardHeader color='primary'>
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Cadastro Pendente</h4>
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>{'Requerido: ' + cadastroPendente.nomeRequerido}</p>
              </CardHeader>
              <CardBody className={classes.paddingBody}>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4} >
                        <CustomInput
                          labelText='Protocolo'
                          inputProps={{
                            value: cadastroPendente.protocolo,
                            disabled: true,
                          }}
                          id='protocolo'
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5} >
                        <CustomInput
                          labelText='Nome do Solicitante'
                          inputProps={{
                            value: cadastroPendente.nomeRequerente,
                            disabled: true,
                          }}
                          id='nome-solicitante'
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3} >
                        <CustomInput
                          labelText='Data da solicitação'
                          inputProps={{
                            value: moment(cadastroPendente.dataSolicitacao).format('DD-MM-YYYY'),
                            disabled: true,
                          }}
                          id='data-solicitacao'
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody >
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText='Nome do Requerido'
                          inputProps={{
                            value: cadastroPendente.nomeRequerido,
                            disabled: true,
                          }}
                          id='nome-requerido'
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText='CPF/CNPJ'
                          id='cnpj-empresa'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            value: cadastroPendente.cnpjRequerido,
                            inputComponent: cadastroPendente.cnpjRequerido.toString().length <= 11 ? TextMaskCPF : TextMaskCNPJ
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText='E-mail'
                          id='email-empresa'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            value: cadastroPendente.emailRequerido,
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText='Telefone'
                          id='telefone-empresa'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            value: cadastroPendente.telefoneRequerido,
                            inputComponent: TextMaskCellPhone
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12}>
                        <h4 className={classes.statusCadastro}>
                          {getAdaptedMessage(cadastroPendente.situacao)}
                        </h4>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <CustomInput
                          labelText='Mensagem de histórico'
                          id='msg-historico-cadastro'
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: this.state.mensagemHistorico,
                            onChange: this.handleChange('mensagemHistorico')
                          }}
                          error={this.state.mensagemHistoricoEmpty}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={12} lg={12}>
                        <Button
                          color='secondary'
                          className={classes.botaoEnviar}
                          onClick={(e) => this.handleEnviaMensagemHistorico(e)}
                        >
                          Enviar
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Button
                  color='secondary'
                  fullWidth
                  onClick={() => this.handleConfirmarSolicitacaoCadastro()}
                  disabled={this.props.requeridosPendentes.cadastroPendente.situacao === SOLICITADO_CADASTRO_EMPRESA}
                >
                  Confirmar a solicitação de cadastro
                </Button>
                <Card>
                  <CardHeader color='primary'>
                    <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Histórico</p>
                  </CardHeader>
                  <CardBody className={classes.paddingBody}>
                    {this.getHistoricos()}
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place='tc'
          color='success'
          message='Sucesso! Mensagem de histórico enviada.'
          open={this.props.requeridosPendentes.sucessoSalvarHistorico}
          closeNotification={() => this.handleCloseSnackBarSuccessHistorico()}
          close
        />
        <Snackbar
          place='tc'
          color='warning'
          message='Enviando mensagem de histórico...'
          open={this.props.requeridosPendentes.salvandoHistorico}
          close
        />
        <Snackbar
          place='tc'
          color='success'
          message='Sucesso! Confirmada solicitação de cadastro!'
          open={this.props.requeridosPendentes.cadastroConfirmado}
          close
        />
        <Snackbar
          place='tc'
          color='warning'
          message={this.state.messageErroCamposSemInfo}
          open={this.state.erroCamposSemInfo}
          close
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  requeridosPendentes: state.requeridosPendentes,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...requeridoPendenteActions
  }, dispatch)
})

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CadastroPendente));