import React, { Component } from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import CustomInput from '../../../../components/CustomInput';
import { withStyles } from '@material-ui/core';

const style = {
  inputAdornment: {
    position: "relative"
  }
};

class Empresa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fantasia: '',
      cnpj: '',
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return true;
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

export default withStyles(style)(Empresa);