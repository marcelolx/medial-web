import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Modal from 'react-responsive-modal';
import Button from '../../../../core/components/CustomButton';
import { defaultFont, successColor, dangerColor } from '../../../../assets/jss/styles';
import Loader from '../../../../core/components/Loader';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Table from '../../../../core/components/CustomTable';
import API from '../../../../core/http/API';


const styles = theme => ({
  modal: {
    width: 350,
    maxHeight: 440,
  },
  selecionar: {
    textAlign: 'right',
    width: 80,
  },
  nome: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  marginZero: {
    ...defaultFont,
    margin: 0
  },
  actionButton: {
    margin: '0 0 0 5px',
    padding: '5px',
    '& svg,& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0px'
    }
  },
  actionButtonRound: {
    width: 'auto',
    height: 'auto',
    minWidth: 'auto',
  },
  overlay: {
    zIndex: 99999,
  },
  center: {
    textAlign: 'center'
  },
  closeButton: {
    cursor: 'pointer'
  },
  buttomConfirm: {
    float: 'right',
  },
  success: {
    color: successColor
  },
  fail: {
    color: dangerColor
  },
  statusAcordo: {
    float: 'left',
    marginTop: 10,
  },
  footer: {
    width: '100%'
  },
  iconList: {
    verticalAlign: 'middle',
    width: '17px',
    height: '17px',
    top: '-1px',
    position: 'relative'
  },
});

class SelecionarMediador extends React.Component {
  constructor() {
    super();

    this.state = {
      mensagem: '',
      mediadores: []

    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._adquirirDadosMediadores();
  }

  _adquirirDadosMediadores(){

    API.get(`/mediacao/${this.props.codigoMediacao}/mediadoresDisponiveis`)
      .then(response => {
        if (response.data) {
          this.setState({ mediadores: response.data })
        }

      })
      .catch(error => {

      });
  }

  closeModal() {
    this.props.closeModal();
  }


  dataToTableData = () => {
    const { mediadores } = this.state;

    let negociadoresRetorno = [];
    mediadores.forEach(element => {
      negociadoresRetorno = negociadoresRetorno.concat([[
        element.value,
        element.label,
        this.botao(element)
      ]])
    });

    return negociadoresRetorno;
  }


  botao = mediador => {
    const { classes } = this.props;

    return (
      <Button
        round
        color='primary'
        className={classes.actionButton + ' ' + classes.actionButtonRound}
        key={mediador.id}
        onClick={() => this.confirmacaoAdicionar(mediador.id)}
      >
        <CheckCircle className={classes.iconList} />
      </Button>
    );
  }



  render() {
    const { classes } = this.props;

    return (

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open
        onClose={this.closeModal}
        center
        styles={{ width: 200 }}
        classNames={classes}
      >

        <Loader open={this.state.isLoading} />
        <div>
          <Table
            tableHead={[
              '#',
              'Nome',
              'Selecionar',
            ]}
            tableData={this.dataToTableData()}
            customCellClasses={[
              classes.center,
              classes.nome,
              classes.selecionar
            ]}
            customClassesForCells={[0, 1, 2]}
            customHeadCellClasses={[
              classes.center,
              classes.nome,
              classes.selecionar
            ]}
            customHeadClassesForCells={[0, 1, 2]}
            footer
          />
        </div>
      </Modal>
    );
  }
}


export default withStyles(styles)(SelecionarMediador);
