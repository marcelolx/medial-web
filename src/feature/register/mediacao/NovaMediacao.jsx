import React, { Component } from 'react';
import mediacaoStyles from '../../../assets/jss/scenes/register/mediacaoStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../core/components/grid/GridItem';
import GridContainer from '../../../core/components/grid/GridContainer';
import Wizard from '../../../core/components/Wizard';
import BuscarEmpresa from './containers/BuscarEmpresa';
import Motivo from './containers/motivo/Motivo';
import Empresa from './containers/Empresa';
import Confirmacao from './containers/Confirmacao';
import { BUSCAR_EMPRESA, EMPRESA, MOTIVO, CONFIRMACAO } from './constants/mediacaoStepConstants';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { findStepStateIndex } from './utils/mediacaoHelper';
import * as novaMediacaoActions from './services/novaMediacaoActions';
import bindActionCreators from 'redux/src/bindActionCreators';

const steps = [
  { stepName: 'Pesquisar', stepComponent: BuscarEmpresa, stepId: BUSCAR_EMPRESA },
  { stepName: 'Requerido', stepComponent: Empresa, stepId: EMPRESA },
  { stepName: 'Relatar motivo', stepComponent: Motivo, stepId: MOTIVO },
  { stepName: 'Confirmação', stepComponent: Confirmacao, stepId: CONFIRMACAO }
];

class NovaMediacao extends Component {

  handleFinish = (allStates) => {
    let data;
    const viewEmpresaIndex = findStepStateIndex(BUSCAR_EMPRESA, allStates);
    const viewMotivoIndex = findStepStateIndex(MOTIVO, allStates);
    const empresa = this.props.mediacaoEmpresas.empresas[allStates[viewEmpresaIndex].BUSCAR_EMPRESA.checked];
    const motivo = allStates[viewMotivoIndex].MOTIVO;

    if (empresa !== undefined) {
      data = {
        requerente: this.props.auth.id,
        requerido: empresa.id,
        assunto: motivo.assuntos.value,
        mensagem: motivo.mensagem,
        pendente: {
          nomeRequerido: '',
          email: '',
          documento: '',
          telefone: 0
        }
      }
    } else {
      const viewEmpresaCadPendente = findStepStateIndex(EMPRESA, allStates);
      const novaEmpresa = allStates[viewEmpresaCadPendente].EMPRESA;

      data = {
        requerente: this.props.auth.id,
        requerido: null,
        assunto: motivo.assuntos.value,
        mensagem: motivo.mensagem,
        pendente: {
          nomeRequerido: novaEmpresa.nome,
          email: novaEmpresa.email,
          documento: novaEmpresa.cnpj.replace(/\D/g, ''),
          telefone: novaEmpresa.telefone.replace(/\D/g, '')
        }
      }
    }

    this.props.actions.cadastrar(data, motivo.arquivo);
  }

  render() {
    return (
      <GridContainer justify='center'>
        <GridItem xs={12} xl={8}>
          <Wizard
            validate
            steps={steps}
            title='Mediação - Nova Solicitação'
            subtitle='Busque a pessoa ou a empresa a partir do nome e relate o motivo para iniciar a mediação'
            finishButtonClick={this.handleFinish}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  mediacaoEmpresas: state.empresa,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...novaMediacaoActions
  }, dispatch)
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(mediacaoStyles)
)(NovaMediacao);