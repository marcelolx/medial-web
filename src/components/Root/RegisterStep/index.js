import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel } from '@material-ui/core';

const styles = theme => ({
  root: {
    maxWidth: '100%',
    margin: '1px',
  },
  margin: {
    margin: theme.spacing.unit,
  },  
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

class RegisterStep extends Component {

  render() {
    const { activeStep } = this.props.step;
    const steps = this.props.onGetSteps();
    const finishStep = this.props.onFinishStepContent();

    return (
      <React.Fragment>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? ( 
          finishStep
        ) : (
            this.props.onGetStepContent(activeStep)                      
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  step: state.step,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(RegisterStep);