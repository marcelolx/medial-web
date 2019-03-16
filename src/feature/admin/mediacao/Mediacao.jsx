import React from 'react';
import GridContainer from '../../../core/components/grid/GridContainer';
import GridItem from '../../../core/components/grid/GridItem';
import Situacao from './containers/Situacao';
import Acordos from './containers/Acordos';
import Anexos from './containers/Anexos';
import Mensagens from './containers/Mensagens';
import Solicitacao from './containers/Solicitacao';
import queryString from 'query-string';


class Mediacao extends React.PureComponent {

  state = {
    codigoMediacao: queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
  }

  render() {
    const { codigoMediacao } = this.state;
    
    return (
      <React.Fragment>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={9} lg={9}>
            <Solicitacao codigoMediacao={codigoMediacao} />
            <Mensagens codigoMediacao={codigoMediacao} />
          </GridItem>
          <GridItem xs={12} sm={12} md={3} lg={3}>
            <Situacao codigoMediacao={codigoMediacao} />
            <Acordos codigoMediacao={codigoMediacao} />
            <Anexos codigoMediacao={codigoMediacao} />
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
};

export default Mediacao;