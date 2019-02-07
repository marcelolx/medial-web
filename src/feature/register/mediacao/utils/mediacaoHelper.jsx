import React from 'react';
import GridContainer from '../../../../core/components/grid/GridContainer';
import GridItem from '../../../../core/components/grid/GridItem';

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

export function validateEmail(email) {
  let validMailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validMailRegx.test(email);
}

export function validateCNPJ(cnpj) {
  const newCnpj = cnpj.replace(/[^\d]/g, '');
  const regex = /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/;
  if (!newCnpj || newCnpj.length !== 14 || regex.test(newCnpj)) {
      return false;
  }
  const factors = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const cnpjArray = newCnpj.split('');
  let n = 0;
  for (let i = 0; i < 12; i++) {
      n += cnpjArray[i.toString()] * factors[i + 1];
  }
  n = 11 - n % 11;
  n = n >= 10 ? 0 : n;
  if (parseInt(cnpjArray[12]) !== n) {
      return false;
  }
  n = 0;
  for (let i = 0; i <= 12; i++) {
      n += cnpjArray[i.toString()] * factors[i];
  }
  n = 11 - n % 11;
  n = n >= 10 ? 0 : n;
  if (parseInt(cnpjArray[13]) !== n) {
      return false;
  }
  return true;
}