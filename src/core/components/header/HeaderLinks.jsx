import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import SweetAlert from 'react-bootstrap-sweetalert';
import { compose, bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import * as authActions from '../../services/authentication/loginActions';

import Button from '../CustomButton';

import headerLinksStyle from '../../../assets/jss/components/headerLinksStyle';

class HeaderLinks extends React.PureComponent {
  state = {
    open: false,
    show: false
  };
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  logout = () => {
    this.hideAlert();
    this.props.actions.logout();
  }

  hideAlert = () => {
    this.setState({
      alert: null
    });
  }

  confirmacaoLogout = () => {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: 'block', color: `#222` }}
          title='Deseja sair?'
          onConfirm={() => this.logout()}
          onCancel={() => this.hideAlert()}
          confirmBtnCssClass={
            this.props.classes.button + ' ' + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + ' ' + this.props.classes.danger
          }
          confirmBtnText='Continuar'
          cancelBtnText='Cancelar'
          showCancel
        >
        </SweetAlert>
      )
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>

        {this.state.alert}

        <Link to={`/profile`}>

          <Button
            color='transparent'
            aria-label='Perfil'
            justIcon
            className={classes.buttonLink}
          >
            <Person
              className={
                classes.headerLinksSvg +
                ' ' +
                (classes.links)
              }
            />
            <Hidden mdUp implementation='css'>
              <span className={classes.linkText}>
                {this.props.auth.nome}
              </span>
            </Hidden>
          </Button>

        </Link>
        <Button
          color='transparent'
          aria-label='Sair'
          justIcon
          className={classes.buttonLink}
          onClick={() => this.confirmacaoLogout()}
        >
          <ExitToApp
            className={
              classes.headerLinksSvg +
              ' ' +
              (classes.links)
            }
          />
          <Hidden mdUp implementation='css'>
            <span className={classes.linkText}>
              {'Desconectar-se'}
            </span>
          </Hidden>
        </Button>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  classes: PropTypes.object.isRequired,
  rtlActive: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  history: state.history
});


const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch)
});

export default compose(
  withStyles(headerLinksStyle),
  connect(mapStateToProps, mapDispatchToProps),
)(HeaderLinks);
