import React, { Component } from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';
import RegisterStepButton from '../../../../../components/Root/RegisterStep/Buttons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Sobre extends Component {

  handleValidateFields = () => {
    return true;
  }

  render() {
    console.log(this.props.registerUser);
    const cancelStep = this.props.onCancelStep.bind(this);
    const getSteps = this.props.onGetSteps.bind(this);
    
    return(
      <React.Fragment>
        <div>
          Teste
          <RegisterStepButton 
            onCancelStep={() => cancelStep()}
            onGetSteps={() => getSteps()}
            onValidateFields={() => this.handleValidateFields()}
          />
        </div>        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  registerUser: state.registerUser,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Sobre);