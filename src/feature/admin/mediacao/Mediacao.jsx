import React from 'react';
import GridContainer from '../../../../../components/Grid/GridContainer';
import GridItem from '../../../../../components/Grid/GridItem';
import Situacao from '../components/Situacao';
import Acordos from '../components/Acordos';
import Anexos from '../components/Anexos';
import Mensagens from '../components/Mensagens';
import Solicitacao from '../components/Solicitacao';

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