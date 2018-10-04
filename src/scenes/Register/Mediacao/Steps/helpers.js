import React from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';

export function findStepStateIndex(stepId, allStates) {
  return Object.keys(allStates).filter(
    function(key) {
      return (Object.keys(allStates[key]).filter(
        function(prop) {
          return prop === stepId;
        }
      ).length === 1)
    }
  );  
}

export function viewInState(allStates, viewName) {
  return (Object.keys(allStates).filter(key => 
    (Object.keys(allStates[key]).filter(keyname => 
      (keyname === viewName)).length === 1)
  ).length === 1);
}

export function viewError() {
  return(
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={3}>
        <h4>
          Ops... Tivemos um problema, volte para a página anterior, verifique as informações fornecidas
          e avance novamente.
        </h4>
      </GridItem>
    </GridContainer>
  );
}