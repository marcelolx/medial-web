import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../CustomButton';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import CustomInput from '../CustomInput';
import { Input } from '@material-ui/core';

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
  textAnexo: {
    width: 100,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  }
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
        this.setState({ message: '' });
      }
    }
  }

  handleOnChange = (e) => {
    this.setState({ message: e.target.value });
  }

  catchReturn = (e) => {
    if (!(e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
      this.onEnterPress();
      e.preventDefault();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.disabled !== nextProps.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  _handleClick() {
    this.refs.fileInput.click();
  }


  _handleChangeFile(event) {

    event.preventDefault();
    
    let file = event.target.files[0];

    if (file) {
      this.props.onChangeFile(file)
    }


  }

  _handleUploadFile() {
      this.props.onUploadFile(this.state.file);

  }

  render() {
    const { classes,file } = this.props;

    return (
      <React.Fragment>
        <div className='fileinput text-center'>
          <input type='file' onChange={(evt) => this._handleChangeFile(evt)} ref='fileInput' />
        </div>
        <CustomInput
          labelText='Mensagem'
          inputProps={{
            value: this.state.message,
            onChange: this.handleOnChange,
            onKeyPress: this.catchReturn,
            disabled: this.state.disabled,
            placeholder: this.props.placeholder
          }}
          id='input-mensagem'
          formControlProps={{
            fullWidth: true
          }}
        />
        <Button
          justIcon
          color='secondary'
          onClick={this.onEnterPress}
          className={classes.botaoAnexar}
        >
          <Send />
        </Button>

        <Button
          type="file"
          justIcon
          onClick={() => this._handleClick()}
          color='secondary'
        >
          <AttachFile />
        </Button>
        {file ? <span className={classes.textAnexo}>{file.name}</span> : null}
        <Button
          className={classes.botaoEnviar}
          color='secondary'
          onClick={() => this._handleUploadFile()}
        >
          Enviar Anexo
        </Button>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(ChatInput);