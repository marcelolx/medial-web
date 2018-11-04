import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ReactLoading from 'react-loading';
import Modal from 'react-responsive-modal'; 

const styles = ({
  overlay: {
    zIndex: 99999,
  },
  modal: {
    background: 'transparent',
    boxShadow: 'none',
  }
})

class Loader extends React.Component {


  closeModal = () =>{
    this.props = false;
  }

  render() {
    const {
      classes,
      open
    } = this.props;
    return (
      <Modal open={open} center showCloseIcon={false} onClose={()=>this.closeModal} blockScroll classNames={classes}>         
             <ReactLoading type='spin' color='#d23' height={90} width={90} />
      </Modal>
    );
  }
}

Loader.defaultProps = {
  open: false
};

Loader.propTypes = {
  open: PropTypes.bool
};

export default withStyles(styles)(Loader);