import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import withRouter from 'react-router-dom/withRouter';
import GridContainer from '../../../../core/components/grid/GridContainer';
import GridItem from '../../../../core/components/grid/GridItem';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import { compose } from 'recompose';
import withStyles from '@material-ui/core/styles/withStyles';
import CardBody from '../../../../core/components/card/CardBody';
import CustomInput from '../../../../core/components/CustomInput';
import bindActionCreators from 'redux/src/bindActionCreators';
import * as mediacaoActions from '../services/mediacaoActions';
import { connect } from 'react-redux';
import Editor from '../../../../core/components/Editor'
import buttonStyle from '../../../../assets/jss/components/buttonStyle';
import Button from '../../../../core/components/CustomButton';
import Snackbar from '../../../../core/components/snackbar/Snackbar';


const style = ({
  ...buttonStyle,
  semMargen: {
    margin: 0,
    flex: 1
  },
  multilineTextField: {
    width: '100%'
  },
  inputCenterText: {
    textAlign: 'center'
  },
  videoConferenciaButton: {
    width: '130px',
    height:  '40px',
    margin: 0
  },
  flexCard: {
    display: 'flex'
  }
});

class Solicitacao extends React.PureComponent {

  componentDidMount() {
    this.props.actions.buscarMediacao(this.props.codigoMediacao);
  }

  getMediacaoValueOrDefault(prop) {
    return (this.props.mediacao.mediacao !== null) ? this.props.mediacao.mediacao[prop] : '';
  }

  _handleDashboard() {
    this.props.history.push(`/`);
  }

  _handleClickVideoConferencia() {
    
    this.props.onShowVideoConferencia();
  }

  alteracaoStatus() {
    this.notificationCloseAuto();
    return <Snackbar
      place='tr'
      color={this.props.mediacao.snakBarType}
      message={this.props.mediacao.snakBarMessage}
      open
      closeNotification={() => this.props.actions.closeNotificacao()}
      close
    />
  }

  notificationCloseAuto() {
    setTimeout(
      function () {
        this.props.actions.closeNotificacao()
      }.bind(this),
      6000
    );
  }

  render() {
    const { classes, mediacao } = this.props;

    //When mediacao.failMessage === 'SEM_PERMISSAO_ACESSO_MEDIACAO' redirect to dashboard

    const semAcesso = <SweetAlert
      error
      style={{ display: 'block', color: `#222` }}
      onConfirm={() => this._handleDashboard()}
      confirmBtnCssClass={
        [classes.button, classes.warning].join(' ')
      }
      title='SEM PERMISSÃO'
      confirmBtnText='MENU INICIAL'
      showCancel={false}
    >
      <h4>{`Você não tem permissão para acessar essa mediação`}</h4>
    </SweetAlert>;


    return (
      <React.Fragment>
        {mediacao.failMessage === 'SEM_PERMISSAO_ACESSO_MEDIACAO' ? semAcesso : null}
        {mediacao.showSnackbar? this.alteracaoStatus() :null}
        <Card>
          <CardHeader 
            color='success'
            className={classes.flexCard}
          >
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Mediação</h4>
            <Button
              className={classes.videoConferenciaButton}
              onClick={() => this._handleClickVideoConferencia()}
            >
              Vídeo Conferência
            </Button>
          </CardHeader>
          <CardBody>
            <GridContainer justify='center'>
              <GridItem
                xs={12} sm={12} md={2} lg={2}
                className={classes.gridItemMargin}
              >
                <CustomInput
                  labelText='Protocolo'
                  inputProps={{
                    value: '#' + this.getMediacaoValueOrDefault('protocolo'),
                    disabled: true
                  }}
                  className={classes.inputCenterText}
                  id='protocolo'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText='Conflito'
                  inputProps={{
                    value: this.getMediacaoValueOrDefault('conflito'),
                    disabled: true,
                  }}
                  id='conflito'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                <CustomInput
                  labelText='Assunto'
                  inputProps={{
                    value: this.getMediacaoValueOrDefault('assunto'),
                    disabled: true,
                  }}
                  id='assunto'
                  formControlProps={{
                    fullWidth: true
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={9} lg={9}>
                <Editor value={this.getMediacaoValueOrDefault('motivo')}
                  readOnly
                  noHeader={true}
                />
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mediacao: state.mediacao
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacaoActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps)
)(Solicitacao));