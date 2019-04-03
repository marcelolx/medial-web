import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from './assets/1.jpg'
import img2 from './assets/2.jpg'
import img3 from './assets/3.jpg'

const styles = theme => ({
  baseRoot: {
    margin: '0 auto',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  fill: {
    flexBasis: '100%',
  },
  half: {
    flexBasis: '45%',
  },
  container: {
    maxWidth: '400px',
    zIndex: '4',
  },
});

class Homepage extends Component {


  componentDidMount() {
    this.redirectLogged();
  }

  redirectLogged() {
    const { auth, history } = this.props;

    if (auth.isAuthenticated) {
      history.push('/dashboard');

    }
  }

  render() {
    return (
      <div  >
        <Carousel

          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          dynamicHeight={true}
          interval="5000"
          autoPlay={true}
          infiniteLoop={true}
        >
          <div>
            <img src={img1} alt="banner1" />
          </div>
          <div>
            <img src={img2} alt="banner1" />
          </div>
          <div>
            <img src={img3} alt="banner1" />
          </div>
        </Carousel>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Homepage)); 