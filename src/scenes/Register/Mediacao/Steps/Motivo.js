import React, { Component } from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import CustomInput from '../../../../components/CustomInput';

class Motivo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nome: '',
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return false;
  }

  render() {
    return(
      <GridContainer justify="center">
        <CustomInput 
          success={true}
          error={false}
          labelText={
            <span>
              Nome completo <small>(obrigatório)</small>
            </span>
          }
          id="nome-completo"
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridContainer>
    );
  }
}

export default Motivo;