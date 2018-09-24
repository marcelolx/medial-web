import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Logo from '../../../components/Root/Logo';
import RegisterStep from '../../../components/Root/RegisterStep';
import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Usuario from './Steps/Usuario';
import Sobre from './Steps/Sobre';
import Endereco from './Steps/Endereco';
import Contato from './Steps/Contato';
import Finalizar from './Steps/Finalizar';
import * as registerUserActions from '../../../services/register/user/actions';
import * as stepsActions from '../../../services/steps/actions';

const styles = theme => ({ 
  root: {
    maxWidth: '60%',    
    marginTop: '0%',
    marginBottom: '10%',
    marginRight: '25%',
    marginLeft: '25%',    
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
        return <Sobre onCancelStep={() => this.handleLoginPage()} onGetSteps={() => this.handleGetSteps()}/>;
      case 2:
        return <Endereco onCancelStep={() => this.handleLoginPage()} onGetSteps={() => this.handleGetSteps()}/>;
      case 3:
        return <Contato onCancelStep={() => this.handleLoginPage()} onGetSteps={() => this.handleGetSteps()}/>;
      default:
        return 'Unknown Step';
    }
  }

  handleLoginPage = () => {
    this.props.changeStep(0);
    this.props.clearRegisterData();  
    this.props.history.push('/login');
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
            onFinishStepContent={<Finalizar onFinishRegisterUser={() => this.handleLoginPage()}/>}
          />          
        </div>        
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...stepsActions, ...registerUserActions }, dispatch);

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(RegisterUser);
