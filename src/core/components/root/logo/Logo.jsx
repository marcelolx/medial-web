import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  style: {
    maxHeight: '10rem',
    margin: '0 auto',
    display: 'block',
  }
}); 

class Logo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <img src={require('../../../../assets/img/logo.png')} alt='Logotipo Medial' className={classes.style}/>
    );
  }
}

Logo.prototypes = {
  classes: PropTypes.object.isRequired,
}

export default withRouter(compose(
  withStyles(styles),
)(Logo));