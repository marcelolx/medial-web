import React from 'react';
import GridContainer from '../../../core/components/grid/GridContainer';
import Conflitos from './Conflitos';
import Assuntos from './Assuntos';


class Configurations extends React.Component {

  render() {

    return (
      <>
        <GridContainer>
          <Conflitos />
          <Assuntos />
        </GridContainer>

      </>
    );
  }
}

export default (Configurations); 