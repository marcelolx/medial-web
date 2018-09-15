import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import * as stepsActions from '../../../../../services/steps/actions';
import * as registerUserActions from '../../../../../services/register/user/actions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class Contato extends Component {
  render() {
    console.log(this.props);
    
    return(
      <div/>
    );
  }
}

const mapStateToProps = state => ({
  registerUser: state.registerUser,
  step: state.step,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ 
    ...stepsActions, 
    ...registerUserActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Contato);