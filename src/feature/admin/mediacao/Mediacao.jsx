import React from 'react';
import GridContainer from '../../../../../components/grid/GridContainer';
import GridItem from '../../../../../components/grid/GridItem';
import Situacao from './containers/Situacao';
import Acordos from './containers/Acordos';
import Anexos from './containers/Anexos';
import Mensagens from './containers/Mensagens';
import Solicitacao from './containers/Solicitacao';

class Mediacao extends React.PureComponent {

  render() {
    return(
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={9} lg={9}>
            <Solicitacao />
            <Mensagens />
          </GridItem>
          <GridItem xs={12} sm={12} md={3} lg={3}>
            <Situacao />
            <Acordos />
            <Anexos />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
};

export default Mediacao;