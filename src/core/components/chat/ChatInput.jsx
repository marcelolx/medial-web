import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../CustomButton';
import AttachFile from '@material-ui/icons/AttachFile';
import Send from '@material-ui/icons/Send';
import { validateFile, validateFileSize } from '../../utils/utils';
import CustomInput from '../CustomInput';
import SweetAlert from 'react-bootstrap-sweetalert';
import buttonStyle from '../../../assets/jss/components/buttonStyle';

const isBlank = require('is-blank');

const style = ({
  ...buttonStyle,
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

    if (file && validateFile(file.name) && validateFileSize(file.size)) {
      this.props.onChangeFile(file)
    } else {
      this.setState({ fileError: true });
    }


  }


  alertAnexoError() {

    const { classes } = this.props;

    return (<SweetAlert
      error
      style={{ display: 'block', color: `#222` }}
      onConfirm={() => this.setState({ fileError: false })}
      confirmBtnCssClass={
        [classes.button, classes.success].join(' ')
      }
      title='Anexo inválido'
      confirmBtnText='Continuar'
      showCancel={false}
    >
      <h4>{`Formato inválido ou o tamanho do arquivo é maior que 10MB`}</h4>
    </SweetAlert>);
  }

  _handleUploadFile() {
    this.props.onUploadFile(this.state.file);

  }

  render() {
    const { classes, anexo, file } = this.props;

    return (
      <React.Fragment>
        {this.state.fileError ? this.alertAnexoError() : null}
        <div className='fileinput text-center'>
          <input type='file' accept=".docx, .doc, .png, .jpg, .jpeg, .gif, .zip, .rar, .pdf, .xml, .bmp, .ppt, .xls" onChange={(evt) => this._handleChangeFile(evt)} ref='fileInput' />
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
          disabled={this.state.disabled}
          color='secondary'
          onClick={this.onEnterPress}
          className={classes.botaoAnexar}
        >
          <Send />
        </Button>
        {anexo ? <Button
          type="file"
          disabled={this.state.disabled}
          justIcon
          onClick={() => this._handleClick()}
          color='secondary'
        >
          <AttachFile />
        </Button> : null}

        {file ? <span className={classes.textAnexo}>{file.name}</span> : null}

        {anexo ? <Button
          className={classes.botaoEnviar}
          disabled={this.state.disabled}
          color='secondary'
          onClick={() => this._handleUploadFile()}
        >
          Enviar Anexo
         </Button>
          : null}

      </React.Fragment>
    );
  }
}

export default withStyles(style)(ChatInput);