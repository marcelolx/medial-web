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
    <GridContainer justify='center'>
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
  let validMailRegx = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validMailRegx.test(email);
}

export function validateCPF(cpf) {
  
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf === '') return false;	
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length !== 11 || 
		cpf === "00000000000" || 
		cpf === "11111111111" || 
		cpf === "22222222222" || 
		cpf === "33333333333" || 
		cpf === "44444444444" || 
		cpf === "55555555555" || 
		cpf === "66666666666" || 
		cpf === "77777777777" || 
		cpf === "88888888888" || 
		cpf === "99999999999")
			return false;		
	// Valida 1o digito	
	let add = 0;	
	for (let i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
  	var	rev = 11 - (add % 11);	
		if (rev === 10 || rev === 11)		
			rev = 0;	
		if (rev !== parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (let i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev === 10 || rev === 11)	
		rev = 0;	
	if (rev !== parseInt(cpf.charAt(10)))
		return false;		
	return true;   
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