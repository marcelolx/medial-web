import React, { Component } from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core";
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class Sobre extends Component {
  render() {
    console.log(this.props.registerUser);
    
    return(
      <div>
        Teste
      </div>
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