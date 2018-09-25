import React, { Component } from 'react';
import mediacaoStyles from '../../../assets/jss/scenes/Register/mediacaoStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Wizard from '../../../components/Wizard';

import BuscarEmpresa from './Steps/BuscarEmpresa';
import Motivo from './Steps/Motivo';

const steps = [
  { stepName: 'Pesquisar empresa', stepComponent: BuscarEmpresa, stepId: 'pesquisar_empresa' },
  { stepName: 'Empresa', stepComponent: BuscarEmpresa, stepId: 'empresa'},
  { stepName: 'Relatar motivo', stepComponent: Motivo, stepId: 'motivo' },
  { stepName: 'Confirmação', stepComponent: Motivo, stepId: 'confirmacao'}
];

class Mediacao extends Component {
  render(){
    return(      
      <GridContainer>
        <GridItem xs={12} sm={12} mb={8}>
          <Wizard 
            validate
            steps={steps}
            title="Informe a empresa"
            subtitle="Busque a empresa a partir do CNPJ ou nome fantasia."
          />
        </GridItem>
      </GridContainer> 
    );
  }
}

export default withStyles(mediacaoStyles)(Mediacao);