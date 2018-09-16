import { ACTIVESTEP_VALID, ACTIVESTEP_CHANGED } from './actionTypes'

const initialState = {
  beforeNextStepError: false,
  activeStep: 0,
  completed: {},
}

export default function(state = initialState, action){  
  switch(action.type){
    case ACTIVESTEP_VALID:
      return {
        ...state,
        ...action.payload,
      }
    case ACTIVESTEP_CHANGED:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }
}