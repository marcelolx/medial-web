import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as registerUserActions from '../../../../../services/register/user/actions';
import * as stepsActions from '../../../../../services/steps/actions';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',    
    minWidth: '250px',
    maxWidth: '350px',
    margin: '0 auto',
    marginBottom: '10%',
  },
});

class Finalizar extends Component {

  
  render() {

    //TODO; Implementar para cadastrar o usuário na base, e a partir do retorno decidir o que fazer..
    //Se houver inconsistência, será necessário redicionar para o primeiro step e obrigar o usuário 
    //validar as informações.

    setTimeout(
      function() {
        this.props.actions.changeStep(0)
      }.bind(this), 1000);
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
    ...registerUserActions,
    ...stepsActions,
  }, dispatch)
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Finalizar);