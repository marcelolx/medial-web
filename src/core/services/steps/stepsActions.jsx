import { ACTIVESTEP_CHANGED, ACTIVESTEP_VALID } from './stepsActionTypes';

export function changeStep(activeStep) {
  return {
    type: ACTIVESTEP_CHANGED,
    payload: {
      activeStep: activeStep,
    }
  }  
}

export function beforeNextStepError(stepError) {  
  return {
    type: ACTIVESTEP_VALID,
    payload: {
      beforeNextStepError: stepError,
    } 
  }
}