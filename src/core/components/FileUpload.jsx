import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from './CustomButton';
import { validateFile ,validateFileSize } from '../utils/utils';

const styles = ({
  paragrafo: {
    margin: 0,
    textTransform: 'none',
  }
})

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeImage(event) {

    event.preventDefault();
    let files = event.target.files;

    let filesFinal = [...new Set([...files, ...this.props.files || []])];

    let errors = filesFinal.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.name === thing.name && (!validateFile(t.name) || !validateFileSize(t.size))
      ))
    )

    filesFinal = filesFinal.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.name === thing.name && validateFile(t.name) && validateFileSize(t.size)
      ))
    )

    this.props.onChange(filesFinal);
    this.props.onChangeError(errors);
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  render() {
    const { adicionarButtonProps, classes } = this.props;

    return (
      <div className='fileinput'>
        <input type='file' multiple accept=".docx, .doc, .png, .jpg, .jpeg, .gif, .zip, .rar, .pdf, .xml, .bmp, .ppt, .xls" onChange={this.handleChangeImage} ref='fileInput' />
        <div>
          <Button {...adicionarButtonProps} onClick={() => this.handleClick()}>
            {'Anexar arquivo'}
          </Button>
        </div>
        <div>
          <h6 className={classes.paragrafo}> Formatos: docx, doc, png, jpg, zip, rar, jpeg, gif, pdf, xml, bmp, ppt, xls</h6>
          <h6 className={classes.paragrafo}> Tamanho máximo: 10Mb</h6>
        </div>


      </div >
    );
  }
}

FileUpload.propTypes = {
  avatar: PropTypes.bool,
  adicionarButtonProps: PropTypes.object,
  alterarButtonProps: PropTypes.object,
  onChange: PropTypes.func,
  onChangeError: PropTypes.func
}

export default withStyles(styles)(FileUpload);