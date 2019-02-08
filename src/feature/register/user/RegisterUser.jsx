import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Logo from '../../../core/components/root/logo/Logo';
import RegisterStep from '../../../core/components/root/registerstep/RegisterStep';
import { withStyles } from '@material-ui/core';
import { compose } from 'recompose';
import Usuario from './containers/Usuario';
import Sobre from './containers/Sobre';
import Endereco from './containers/Endereco';
import Contato from './containers/Contato';
import Finalizar from './containers/Finalizar';
import * as registerUserActions from './services/user/registerUserActions';
import * as stepsActions from '../../../core/services/steps/stepsActions';

const styles = theme => ({ 
  root: {
    paddingRight: '15px',
    paddingLeft: '15px',
    marginTop: '60px',
    marginRight: 'auto',
    marginLeft: 'auto',
    zIndex: '4',
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
        return <Usuario onCancelStep={() => this.handleLoginPage()} onGetSteps={() => this.handleGetSteps()}/>;
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

        <div className={classes.root}>
          <Logo/>
          <RegisterStep
            {...this.props}          
            onGetSteps={this.handleGetSteps.bind(this)} 
            onGetStepContent={activeStep => this.handleGetStepContent(activeStep)}            
            onFinishStepContent={<Finalizar onFinishRegisterUser={() => this.handleLoginPage()}/>}
          />          
        </div>        
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...stepsActions, ...registerUserActions }, dispatch);

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps),
)(RegisterUser);
