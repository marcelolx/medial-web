import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  content: {
    flexGrow: 1,
    paddingRight: '15px',
    minWidth: 0,
  },
  logged: {
  },
  notLogged: {
    //maxWidth: '400px', Se definimos 400px aqui, tanto para tela de login quanto para tela de cadastro fica esse tamanho ou menor
    margin: '0 auto',
  }
}); 

class Main extends Component {
  render() {
    const { classes, children, auth } = this.props;
    return (
      <main className={[classes.content, 'content', auth.isAuthenticated ? classes.logged : classes.notLogged].join(' ')}>
        {children}
      </main>
    );
  }
}

Main.prototypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(Main));