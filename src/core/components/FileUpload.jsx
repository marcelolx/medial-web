import React from 'react';
import PropTypes from 'prop-types';
import Button from './CustomButton';

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChangeImage(event) {

    event.preventDefault();
    let files = event.target.files;

    let teste = [...new Set([...files, ...this.props.files || []])];

    teste = teste.filter((thing, index, self) =>
      index === self.findIndex((t) => (
        t.name === thing.name
      ))
    )

    this.props.onChange(teste);
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  render() {
    const { adicionarButtonProps } = this.props;

    return (
      <div className='fileinput text-center'>
        <input type='file' multiple accept=".png, .jpeg, .pdf, .docx" onChange={this.handleChangeImage} ref='fileInput' />
        <div>
          <Button {...adicionarButtonProps} onClick={() => this.handleClick()}>
            {'Anexar arquivo'}
          </Button>
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  avatar: PropTypes.bool,
  adicionarButtonProps: PropTypes.object,
  alterarButtonProps: PropTypes.object,
  onChange: PropTypes.func
}

export default FileUpload;