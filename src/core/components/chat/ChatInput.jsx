import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../CustomButton';
import AttachFile from '@material-ui/icons/AttachFile';
import CustomInput from '../CustomInput';

const isBlank = require('is-blank');

const style = ({
  botaoEnviar: {
    width: '105px',
    marginLeft: '5px',
    marginTop: '5px'
  },
  botaoAnexar: {
    marginLeft: '15px',
    marginTop: '5px'
  },
});

class ChatInput extends React.Component { 

  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    placeHolder: 'Envie uma mensagem',
    disabled: true
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      disabled: props.disabled
    }
  }

  onEnterPress = () => {
    if (!isBlank(this.state.message)) {
      if (this.props.onSendMessage(this.state.message)) {        
        this.setState({ message: "" });
      }
    }
  }

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  }

  catchReturn = (e) => {
    if (!(e.ctrlKey || e.shiftKey) && e.key === "Enter") {
      this.onEnterPress();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <CustomInput 
          labelText="Mensagem"
          inputProps={{
            value: this.state.message,
            onChange: this.handleOnChange,
            onKeyPress: this.catchReturn,
            disabled: this.state.disabled,
            placeholder: this.props.placeholder
          }}
          id="input-mensagem"
          formControlProps={{
            fullWidth: true
          }}
        />
      
        <Button
          justIcon
          color="secondary"
          className={classes.botaoAnexar}
        >
          <AttachFile />
        </Button>
        <Button   
          className={classes.botaoEnviar}
          color="secondary"
        >
          Enviar Anexo
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(ChatInput);