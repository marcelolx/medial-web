import React, { Component } from 'react';

import Logo from '../../../components/Root/Logo';
import RegisterStep from '../../../components/Root/RegisterStep';
import { Typography, Button, withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Usuario from '../User/Steps/Usuario';
import Sobre from '../User/Steps/Sobre';

const styles = theme => ({ 
  root: {
    maxWidth: '60%',
    margin: '0 auto',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    height: '500px',
  },  
});

class RegisterUser extends Component {

  handleGetSteps = () => {
    return ['Usuário', 'Sobre', 'Endereço', 'Contato'];
  }

  handleGetStepContent(stepIndex) {
    switch (stepIndex) {
      case 0: 
        return <Usuario onCancelStep={() => this.handleLoginPage()} onGetSteps={() => this.handleGetSteps()}/>;
      case 1:
        return <Sobre />;
      case 2:
        return 'Endereço Step';
      case 3:
        return 'Contato Step';
      default:
        return 'Unknown Step';
    }
  }

  handleLoginPage = () => {
    this.props.history.push('/login');
  }

  handleFinishStepContent = () => {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography className={classes.instructions}>Cadastro concluído</Typography>
        <Button onClick={this.handleLoginPage} className={classes.margin}>Continuar</Button>
      </React.Fragment>
    );
  }

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <div className={classes.root}>
          <Logo />
          <RegisterStep
            {...this.props}          
            onGetSteps={this.handleGetSteps.bind(this)} 
            onGetStepContent={activeStep => this.handleGetStepContent(activeStep)}            
            onFinishStepContent={this.handleFinishStepContent.bind(this)}
          />          
        </div>        
      </React.Fragment>
      //onCancelSteps={() => this.handleLoginPage()}
    );
  }
}

export default compose(withStyles(styles))(RegisterUser);
