import React, { Component } from 'react';
import { compose } from 'recompose';
import { withStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as stepsActions from '../../../../services/steps/stepsActions';
import { bindActionCreators } from 'redux';


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,  
  },
  fill: {
    flexBasis: '100%',
  },
  buttonsArea: {
    height: '20px',
    margin: '0 auto',
  },
});

class RegisterStepButtons extends Component {
  
  handleBackStep = () => {
    const { activeStep } = this.props.step;
    this.props.changeStep(activeStep - 1);
  };

  handleNextStep = () => {
    if (this.props.onValidateFields()) {      
      this.props.changeStep(this.props.step.activeStep + 1);
    }    
  };

  render() {
    const cancelStep = this.props.onCancelStep.bind(this);
    const steps = this.props.onGetSteps();
    const { classes } = this.props;
    const { activeStep } = this.props.step;
    
    return(
      <React.Fragment>
        <div className={classes.buttonsArea}>
          <Button               
            onClick={cancelStep}
            className={classes.margin} 
          >
            Cancelar
          </Button>
          {activeStep !== 0? <Button 
            onClick={this.handleBackStep}
            className={classes.margin}
          >
            Voltar
          </Button>: null}
          <Button 
            type='submit' 
            variant='contained' 
            color='primary' 
            onClick={this.handleNextStep}            
            className={classes.margin}
          >
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>    
        </div>        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({  
  step: state.step,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(stepsActions, dispatch);

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterStepButtons);