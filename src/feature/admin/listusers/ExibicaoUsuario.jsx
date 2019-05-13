import React, { Component } from 'react'
import { Button, withStyles, Typography } from '@material-ui/core';
import CustomInput from '../../../core/components/CustomInput';
import Modal from 'react-responsive-modal';
import API from '../../../core/http/API';
import GridContainer from '../../../core/components/grid/GridContainer';
import GridItem from '../../../core/components/grid/GridItem';

const styles = {
  titleCard: {
    width: '100px',
    float: 'left',
    marginTop: '10px',
    fontWeight: 300,
    color: '#3C4858'
  },
  modal: {
    padding: '35px 25px 15px 25px',
    width: 800
  },
  overlay: {
    zIndex: 99999,
  },
  closeButton: {
    cursor: 'pointer'
  },
  right: {
    float: 'right'
  }

}


class ExibicaoUsuario extends Component {

  state = {
    usuario: {
      nome: '',
      nascimento: '',
      documento: '',
      email: '',
      celular: '',
      bairro: '',
      cidade: '',
      estado: '',
      rua: '',
      ruaNumero: '',
      cep: '',
    }
  };


  componentDidMount() {
    API.get(`usuario/informacao/${this.props.codigoUsuario}`).then((success) => {
      this.setState({ fail: false, usuario: success.data });

    }).catch(() => {
      this.setState({ fail: true });
    })

  }

  render() {

    const { classes } = this.props;

    return (

      <Modal classNames={classes} open={true} onExited={() => this.props.onClose()} onClose={() => this.props.onClose()} center>

        {this.state.fail ?
          <Typography variant="display1" color="error"> Falha ao adquirir as informações</Typography>
          :

          <GridContainer>
            <GridItem sm={12} xs={12}>
              <Typography variant="display2"> Dados Pessoais</Typography>
            </GridItem>
            <GridItem sm={6} xs={12}>
              <CustomInput
                labelText='Nome'
                id='nome'
                disabled
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.nome,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem sm={6} xs={12}>
              <CustomInput
                labelText='Data Nascimento'
                id='date'
                disabled
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.nascimento,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem sm={6} xs={12}>
              <CustomInput
                labelText='CPF/CNPJ'
                id='document'
                disabled
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.documento,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem sm={6} xs={12}>
              <CustomInput
                labelText='E-mail'
                id='email'
                disabled
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.email,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem sm={6} xs={12}>
              <CustomInput
                labelText='Celular'
                id='celular'
                disabled
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.celular,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem sm={12} xs={12}>
              <Typography variant="display2"> Endereço</Typography>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>

              <CustomInput
                labelText='Rua'
                id='rua'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.rua,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>

              <CustomInput
                labelText='Numero'
                id='numero'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.ruaNumero,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>

              <CustomInput
                labelText='Bairro'
                id='bairro'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.bairro,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText='Estado'
                id='estado'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.estado,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText='Cidade'
                id='cidade'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.cidade,
                  disabled: true
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <CustomInput
                labelText='CEP'
                id='cep'
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: this.state.usuario.cep,
                  disabled: true
                }}
              />
            </GridItem>
          </GridContainer>

        }
        <Button className={classes.right} variant="contained" color='secondary' onClick={() => this.props.onClose()}>Fechar</Button>

      </Modal>
    )
  }
}


export default
  withStyles(styles)(ExibicaoUsuario); 