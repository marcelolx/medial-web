import React from 'react';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../components/Grid/GridContainer';
import GridItem from '../../../components/Grid/GridItem';
import Card from '../../../components/Card/Card';
import CardHeader from '../../../components/Card/CardHeader';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../components/Card/CardBody';
import CustomInput from '../../../components/CustomInput';
import { TextMaskCNPJ, TextMaskCellPhone } from '../../../components/Masks';
import Button from '../../../components/CustomButtons/Button';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import moment from 'moment';
import getAdaptedMessage, { SOLICITADO_CADASTRO_EMPRESA } from '../../../services/admin/mediacao/messages';
import * as requeridoPendenteActions from '../../../services/admin/mediacao/requeridos/pendentes/action';
import bindActionCreators from 'redux/src/bindActionCreators';
import Snackbar from '../../../components/Snackbar/Snackbar';
 
const styles = ({
  semMargen: {
    margin: 0,
  },
  statusCadastro: {
    marginTop: "3%",
    marginBottom: "3px",
    textAlign: "center"
  },
  botaoEnviar: {
    position: 'inherit',
    float: 'right',
  },
  botaoCadastroSolicitado: {
    flexBasis: '100%',
  }
});

class CadastroPendente extends React.Component {  
  constructor(props) {
    super(props);
    
    this.state = {
      cadastroPendente: this.getCadastroPendente(this.props.match.params.id),
      mensagemHistorico: '',
      mensagemHistoricoEmpty: false,
      successNotification: false,
    }
  }

  getCadastroPendente(paramId) {
    const { pendentes } = this.props.requeridosPendentes;

    if (pendentes && pendentes.length > 0) {
      return pendentes[
        Object
          .keys(pendentes)
          .filter(key => (pendentes[key].idCadastroPendente === parseInt(paramId)))[0]
      ];
    } else {
      console.log('faria request');
    }

    return null;
  }

  getHistoricos() {
    const { cadastroPendente } = this.state;
    
    return cadastroPendente.historico ? (
      cadastroPendente.historico.map((historico, key) => {
        return(
          <Card key={key}>
            <CardBody>
              Mediador: {historico.nomeMediador}<br/>
              Status: {getAdaptedMessage(historico.situacao)}<br/>
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

  handleEnviaMensagemHistorico() {
    if (this.state.mensagemHistorico !== '') {
      this.setState({
        mensagemHistoricoEmpty: false
      });

      const { cadastroPendente } = this.state;
      const mensagemData = {
        requeridoPendente: cadastroPendente.idCadastroPendente,
        mediador: this.props.auth.id,
        situacao: cadastroPendente.situacao,
        mensagem: this.state.mensagemHistorico
      };
      
      this.props.actions.salvarHistorico(mensagemData);
    } else {
      this.setState({
        mensagemHistoricoEmpty: true,
      })
    }
  }

  handleConfirmarSolicitacaoCadastro() {
    const { cadastroPendente } = this.state;

    const data = {
      requeridoPendente: cadastroPendente.idCadastroPendente,
      mediador: this.props.auth.id,
      situacao: cadastroPendente.situacao
    }

    this.props.actions.confirmarSolicitacaoCadastro(data);
  }

  handleCloseSnackBarSuccessHistorico() {
    if (this.state.mensagemHistorico !== '') {
      this.adicionaHistoricoLista();
      this.setState({ mensagemHistorico: '' });
      this.props.actions.limparEstadoHistoricoSalvo();
    }
  }

  adicionaHistoricoLista() {
    const novoHistorico = {
      id: this.props.requeridosPendentes.idHistorico,
      mediador: this.props.auth.id,
      mensagem: this.state.mensagemHistorico,
      nomeMediador: '', //TODO: Verificar se não temos acesso no auth pelo nome já....
      situacao: this.state.cadastroPendente.situacao,
    };

    let cadPendente = this.state.cadastroPendente;
    let historico = cadPendente.historico || [];
    historico.unshift(novoHistorico);
    cadPendente.historico = historico;

    this.setState({
      cadastroPendente: cadPendente
    });
  }

  fecharSnackBarHistoricoSalvo() {
    if (this.props.requeridosPendentes.sucessoSalvarHistorico) {
      setTimeout(
        function() {
          this.handleCloseSnackBarSuccessHistorico()
        }.bind(this), 650);
    }
  }

  fecharSnackBarSolicitacaoCadastroConfirmada() {
    if (this.props.requeridosPendentes.cadastroConfirmado) {
      setTimeout(
        function() {
          let cadPendente = this.state.cadastroPendente;
          cadPendente.situacao = SOLICITADO_CADASTRO_EMPRESA;

          this.setState({
            cadastroPendente: cadPendente
          });
          
          this.props.actions.confirmarSolicitacaoCadastroFinish();
        }.bind(this), 650);
    }
  }

  render() {
    const { classes } = this.props;
    const { cadastroPendente } = this.state;

    this.fecharSnackBarHistoricoSalvo();

    return cadastroPendente === null ? null : (
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Cadastro Empresa Pendente</h4>
                <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>{"Empresa: " + cadastroPendente.nomeRequerido}</p>
              </CardHeader>
              <CardBody>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={4}>
                        <CustomInput
                          labelText="Protocolo"
                          inputProps={{
                            value: cadastroPendente.protocolo,
                            disabled: true,
                          }}
                          id="protocolo"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={5}>
                        <CustomInput
                          labelText="Nome do Solicitante"
                          inputProps={{
                            value: cadastroPendente.nomeRequerente,
                            disabled: true,
                          }}
                          id="nome-solicitante"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="Data da solicitação"
                          inputProps={{
                            value: moment(cadastroPendente.dataSolicitacao).format('DD-MM-YYYY'),
                            disabled: true,
                          }}
                          id="data-solicitacao"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Nome do Requerido"
                          inputProps={{
                            value: cadastroPendente.nomeRequerido,
                            disabled: true,
                          }}
                          id="nome-requerido"
                          formControlProps={{
                            fullWidth: true
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput                      
                          labelText="CNPJ"
                          id="cnpj-empresa"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            disabled: true,
                            value: cadastroPendente.cnpjRequerido,
                            inputComponent: TextMaskCNPJ
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput                      
                          labelText="E-mail"
                          id="email-empresa"
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
                          labelText="Telefone"
                          id="telefone-empresa"
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
                          labelText="Mensagem de histórico"
                          id="msg-historico-cadastro"
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
                          color="secondary" 
                          className={classes.botaoEnviar}
                          onClick={() => this.handleEnviaMensagemHistorico()}
                        >
                          Enviar                          
                        </Button>
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
                <Button 
                  color="secondary"
                  fullWidth
                  onClick={() => this.handleConfirmarSolicitacaoCadastro()}
                  disabled={this.state.cadastroPendente.situacao === SOLICITADO_CADASTRO_EMPRESA}
                >
                  Confirmar a solicitação de cadastro
                </Button>
                <Card>
                  <CardHeader color="primary">
                    <p className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Histórico</p>
                  </CardHeader>
                  <CardBody>
                    { //TODO: Está re-renderizando toda vez....
                      this.getHistoricos()
                    }
                  </CardBody>
                </Card>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place="tc"
          color="success"
          message="Sucesso! Mensagem de histórico enviada."
          open={this.props.requeridosPendentes.sucessoSalvarHistorico}
          closeNotification={() => this.handleCloseSnackBarSuccessHistorico()}
          close
        />
        <Snackbar
          place="tc"
          color="warning"
          message="Enviando mensagem de histórico..."
          open={this.props.requeridosPendentes.salvandoHistorico}
          close
        />
        <Snackbar
          place="tc"
          color="success"
          message="Sucesso! Confirmada solicitação de cadastro!"
          open={this.props.requeridosPendentes.cadastroConfirmado}
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