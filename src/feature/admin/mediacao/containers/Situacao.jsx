import React from 'react';
import Card from '../../../../core/components/card/Card';
import CardHeader from '../../../../core/components/card/CardHeader';
import CardBody from '../../../../core/components/card/CardBody';
import FaceIcon from '@material-ui/icons/Face';
import CustomChip from '../../../../core/components/CustomChip';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import getAdaptedMessage from '../utils/mediacaoMessagesHelper';
import SelecionarMediador from './SelecionarMediador';
import * as mediacaoActions from './../services/mediacaoActions'
import bindActionCreators from 'redux/src/bindActionCreators';
import { TipoUsuarioEnum } from '../utils/tipoUsuarioEnum';
import SelecionarNegociador from './SelecionarNegociador';

const style = theme => ({
  semMargen: {
    margin: 0,
  },
  marginChip: {
    margin: '5px 0',
  },
  icon: {
    color: theme.palette.type === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
    marginLeft: 4,
    marginRight: 'auto'
  },
});

class Situacao extends React.Component {

  state = {
    selectMediadorVisible: false,
    selectNegociadorVisible: false,
  }

  handleGetValue(name) {
    return this.props.situacao[name] ? this.props.situacao[name] : 'Pendente';
  }

  _fecharSelecaoMediador(recarregarMediacao) {
    this.setState({ selectMediadorVisible: false });
    if (recarregarMediacao) {
      this.props.actions.buscarMediacao(this.props.codigoMediacao);
    }
  }

  _fecharSelecaoNegociador(recarregarMediacao) {
    this.setState({ selectNegociadorVisible: false });
    if (recarregarMediacao) this.props.actions.buscarMediacao(this.props.codigoMediacao);
  }

  render() {
    const { classes, situacao, auth, mediacao } = this.props;
    let mediacaoFinalizada = mediacao.mediacao ? mediacao.mediacao.finalizado : true;

    const possuiPermissaoDefinirMediador = auth.accessLevel === TipoUsuarioEnum.ADMINISTRADOR || auth.accessLevel === TipoUsuarioEnum.ADMINISTRADOR_NPJ;
    const possuiPermissaoDefinirNegociador = auth.accessLevel === TipoUsuarioEnum.ADMINISTRADOR || auth.accessLevel === TipoUsuarioEnum.EMPRESA;

    return (
      <React.Fragment>
        { this.state.selectMediadorVisible && 
          possuiPermissaoDefinirMediador && 
          !mediacaoFinalizada ? 
            <SelecionarMediador 
              codigoMediacao={this.props.codigoMediacao}
              closeModal={(recarregarMediacao) => this._fecharSelecaoMediador(recarregarMediacao)}
            /> 
          : null
        }

        {
          this.state.selectNegociadorVisible &&
          possuiPermissaoDefinirNegociador &&
          !mediacaoFinalizada ?
            <SelecionarNegociador
              codigoMediacao={this.props.codigoMediacao}
              closeModal={(recarregarMediacao) => this._fecharSelecaoNegociador(recarregarMediacao)}
            />
          : null
        }

        <Card>
          <CardHeader color='success'>
            <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Situação: {getAdaptedMessage(situacao.situacao)}</h4>
          </CardHeader>
          <CardBody>
            <CustomChip
              icon={<FaceIcon className={classes.icon} />}
              label={'Requerente: ' + this.handleGetValue('nomeRequerente')}
              color='success'
              variant='outlined'
              width='fullWidth'
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon} />}
              label={'Requerido: ' + this.handleGetValue('nomeRequerido')}
              color='success'
              variant='outlined'
              width='fullWidth'
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon} />}
              label={'Mediador: ' + this.handleGetValue('nomeMediador')} 
              clickable={possuiPermissaoDefinirMediador && !mediacaoFinalizada}
              onClick={() => this.setState({ selectMediadorVisible: !this.state.selectMediadorVisible })}
              color='success'
              variant='outlined'
              width='fullWidth'
              className={classes.marginChip}
            />
            <CustomChip
              icon={<FaceIcon className={classes.icon} />}
              label={'Negociador: ' + this.handleGetValue('nomeNegociador')}
              clickable={possuiPermissaoDefinirNegociador && !mediacaoFinalizada}
              onClick={() => this.setState({ selectNegociadorVisible: !this.state.selectNegociadorVisible })}
              color='success'
              variant='outlined'
              width='fullWidth'
              className={classes.marginChip}
            />
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  situacao: state.mediacaoSituacao,
  mediacao: state.mediacao,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...mediacaoActions
  }, dispatch)
});

export default compose(
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps)
)(Situacao);