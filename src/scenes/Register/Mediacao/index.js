import React, { Component } from 'react';
import mediacaoStyles from '../../../assets/jss/scenes/Register/mediacaoStyles';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../components/Grid/GridItem';
import GridContainer from '../../../components/Grid/GridContainer';
import Wizard from '../../../components/Wizard';

import BuscarEmpresa from './Steps/BuscarEmpresa';
import Motivo from './Steps/Motivo';
import Empresa from './Steps/Empresa';

const steps = [
  { stepName: 'Pesquisar empresa', stepComponent: BuscarEmpresa, stepId: 'buscarempresa' },
  { stepName: 'Empresa', stepComponent: Empresa, stepId: 'empresa' },
  { stepName: 'Relatar motivo', stepComponent: Motivo, stepId: 'motivo' },
];

class Mediacao extends Component {
  render(){
    return(      
      <GridContainer>
        <GridItem xs={12} sm={12} mb={8}>
          <Wizard 
            validate
            steps={steps}
            title="Mediação - Nova Solicitação"
            subtitle="Busque a empresa a partir do nome fantasia e relate o motivo para a mediação"
          />
        </GridItem>
      </GridContainer> 
    );
  }
}

export default withStyles(mediacaoStyles)(Mediacao);