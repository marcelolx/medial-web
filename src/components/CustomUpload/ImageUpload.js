import React from 'react';
import PropTypes from 'prop-types';
import Button from '../CustomButtons/Button';
import avatar from '../../assets/img/avatar.png';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      previewImageUrl: avatar
    }
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemover = this.handleRemover.bind(this);
  }

  handleChangeImage(event) {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        previewImageUrl: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  handleRemover() {
    this.setState({
      file: null,
      previewImageUrl: avatar
    });
    this.refs.fileInput.value = null;
  }

  handleClick() {
    this.refs.fileInput.click();
  }

  render() {
    const { avatar, adicionarButtonProps, alterarButtonProps, removerButtonProps } = this.props;

    return(
      <div className="fileinput text-center">
        <input type="file" onChange={this.handleChangeImage} ref="fileInput" />
        <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
          <img src={this.state.previewImageUrl} alt="..."/>
        </div>
        <div>
          {this.state.file === null ? (
            <Button {...adicionarButtonProps} onClick={() => this.handleClick()}>
              {avatar ? "Adicionar Avatar" : "Selecionar Imagem"}
            </Button>
          ) : (
            <span>
              <Button {...alterarButtonProps} onClick={() => this.handleClick()}>
                Alterar
              </Button>
              {avatar ? <br /> : null}
              <Button {...removerButtonProps} onClick={() => this.handleRemover()}>
                <i className="fas fa-times"/> Remover
              </Button>
            </span>
          )}
        </div>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
  adicionarButtonProps: PropTypes.object,
  alterarButtonProps: PropTypes.object,
  removerButtonProps: PropTypes.object
}

export default ImageUpload;