import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme = ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
  },
  toolbar: theme.mixins.toolbar,
  logged: {
    paddingLeft: 264,
  },
  notLogged: {
    maxWidth: '400px',
    margin: '0 auto',
  },
}); 

class Main extends Component {
  render() {
    const { classes, children, user } = this.props;

    return(
      <main classsName={[classes.content, 'content', user.auth ? classes.logged : classes.notLogged].join(' ')}>
        <div className={[classes.toolbarm 'content-toolbar'].join(' ')} />
        {children}
      </main>
    );
  }
}

Main.prototypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user.data,
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, []),
), (Main));