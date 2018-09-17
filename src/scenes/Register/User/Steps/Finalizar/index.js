import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as registerUserActions from '../../../../../services/register/user/actions';
import * as stepsActions from '../../../../../services/steps/actions';
import { compose } from 'recompose';
import { withStyles, Fade, CircularProgress, Typography } from '@material-ui/core';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',    
    minWidth: '250px',
    maxWidth: '350px',
    margin: '0 auto',
    marginBottom: '15%',
    marginTop: '4%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    height: 40,
  },
  margin: {
    margin: theme.spacing.unit,
    marginTop: '8%',
  },
  fill: {
    flexBasis: '100%',
  },
  warning: {
    color: 'red',
  }
});

class Finalizar extends Component {

  state = {
    loading: true,
  };

  handleMessage = () => {
    const { classes, error } = this.props;

    return(
      <React.Fragment>
        {(error.status !== ('' && '200')) ?
          <Typography 
            variant="subheading"
            className={[classes.margin, classes.warning].join(' ')}
          >
            {error.adaptedMessage + '... Você será redirecionado para realizar os ajustes...'}
          </Typography> :
          <Typography 
            variant="subheading"
            className={classes.margin}
          >
            Aguarde...
          </Typography>
        }        
      </React.Fragment>     
    );
  }
  
  render() {
    const { classes, error } = this.props;
    console.log('tá bug');
    console.log(error);
    
    if (error.status !== ('' && '200')) {
      setTimeout(
        function() {          
          this.props.actions.changeStep(0)
        }.bind(this), 5000);
    }

    return(
      <div className={classes.root}>              
        <div className={classes.placeholder}>          
          <Fade
            in={true}
            style={{
              transitionDelay: '800ms', // this.state.loading ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>
        {this.handleMessage()}        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  registerUser: state.registerUser,
  error: state.error,
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