import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
// creates a beautiful scrollbar
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import Header from '../../core/components/header/Header';
import Sidebar from '../../core/components/sidebar/Sidebar';

import dashboardRoutes from '../../core/routes/dashboard';

import appStyle from '../../assets/jss/layouts/dashboardStyle';
import logo from './../../assets/img/logo_sem_nome.png'


const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

var ps;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      miniActive: false,
      color: 'blue',
      bgColor: 'black',
      hasImage: true,
      fixedClasses: 'dropdown show'
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleColorClick = this.handleColorClick.bind(this);
    this.handleBgColorClick = this.handleBgColorClick.bind(this);
    this.handleFixedClick = this.handleFixedClick.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleImageClick(image) {
    this.setState({ image: image });
  }
  handleColorClick(color) {
    this.setState({ color: color });
  }
  handleBgColorClick(bgColor) {
    this.setState({ bgColor: bgColor });
  }
  handleFixedClick() {
    if (this.state.fixedClasses === 'dropdown') {
      this.setState({ fixedClasses: 'dropdown show' });
    } else {
      this.setState({ fixedClasses: 'dropdown' });
    }
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', this.resizeFunction);
  }
  
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
    }
    window.removeEventListener('resize', this.resizeFunction);
  }
  componentDidUpdate(e) {
      if (e.history.location.pathname !== e.location.pathname) {
        this.refs.mainPanel.scrollTop = 0;
        if (this.state.mobileOpen) {
          this.setState({ mobileOpen: false });
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes,auth, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      ' ' +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf('Win') > -1
      });
    return (
        
      <div style={{ height: '100%' }} className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={'Medial'}
          logo={logo}
          accessLevel= {auth.accessLevel}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor={this.state.bgColor}
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref='mainPanel'>
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            nome={this.props.auth.nome}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

  export default withRouter(compose(
    withStyles(appStyle),
    connect(mapStateToProps, {}),
  )(Dashboard));

// WEBPACK FOOTER //
// ./src/layouts/Dashboard.jsx