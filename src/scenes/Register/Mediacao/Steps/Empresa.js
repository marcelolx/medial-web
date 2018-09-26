import React from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import { withStyles } from '@material-ui/core';

const style = {
  infoText: {
    fontWeight: '300',
  }
}

class Empresa extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      empresaNome: '',
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
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput 
            error={false}
            labelText="Teste"
            id="teste"
            formControlProps={{
              fullWidth: true
            }}            
            inputProps={{
              disabled: true 
            }}
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Empresa);