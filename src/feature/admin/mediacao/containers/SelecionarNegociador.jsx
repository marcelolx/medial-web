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
  }
});

class SelecionarNegociador extends React.Component {
  constructor() {
    super();

    this.state = {
      mensagem: '',
      negociadores: [],
      isLoading: true,

    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this._adquirirDadosNegociadores();
  }

  _adquirirDadosNegociadores() {

    API.get(`/mediacao/${this.props.codigoMediacao}/negociadoresDisponiveis`)
      .then(response => {
        if (response.data) {
          this.setState({ negociadores: response.data, isLoading: false })
        }

      })
      .catch(error => {
        this.setState({ negociadores: [], isLoading: false })

      });
  }

  closeModal() {
    this.props.closeModal();
  }


  dataToTableData = () => {
    const { negociadores } = this.state;

    let negociadoresRetorno = [];
    negociadores.forEach(element => {
      negociadoresRetorno = negociadoresRetorno.concat([[
        element.value,
        element.label,
        this.botao(element)
      ]])
    });

    return negociadoresRetorno;
  }

  _confirmacaoAdicionar(id) {
    let data = { id };
    this.setState({ isLoading: true });

    API.post(`/mediacao/${this.props.codigoMediacao}/atribuirNegociador`, data)
      .then(response => {
        this.setState({ isLoading: false })
        if (response.data.valor) {
          this.props.closeModal(true);
        }

      })
      .catch(error => {
        this.setState({ isLoading: false, fail: true })

      });
  }


  botao = negociador => {
    const { classes } = this.props;

    return (
      <Button
        round
        color='primary'
        className={classes.actionButton + ' ' + classes.actionButtonRound}
        key={negociador.id}
        onClick={() => this._confirmacaoAdicionar(negociador.value)}
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
        <Table
          tableHead={[
            'Id',
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
        {this.state.fail ? <p className={classes.fail}>Não foi possível processar sua solicitação</p> : null}
      </Modal>
    );
  }
}


export default withStyles(styles)(SelecionarNegociador);
