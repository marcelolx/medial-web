import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import GridItem from '../../../../../components/Grid/GridItem';
import Card from '../../../../../components/Card/Card';
import CardHeader from '../../../../../components/Card/CardHeader';
import CardBody from '../../../../../components/Card/CardBody';
import { bindActionCreators } from 'redux';
import negociadorStyle from '../../../assets/jss/scenes/Dashboard/negociadorStyle';
import { withRouter } from 'react-router-dom';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Button from '../../../../../components/CustomButtons/Button';
import * as negociadorActions from '../../../services/dashboard/negociador/actions';
import GridContainer from '../../../../../components/Grid/GridContainer';
import SweetAlert from 'react-bootstrap-sweetalert/lib/dist/SweetAlert';
import CustomInput from '../../../../../components/CustomInput';
import Table from '../../../../../components/Table';
import CheckCircle from "@material-ui/icons/CheckCircle";
import Loader from '../../../../../components/Loader';

const styles = ({
  ...negociadorStyle,
  imagemUser:{
      width: '100%',
  },
  botaoFechar:{
    display: 'block',
      float: 'right',
  },
});

class Negociador extends React.Component {

  state = {
    pesquisaState: '',
    pesquisa: '',
    alert: null,
    novoNegociador: false,
    pesquisaRealizada: '',
  };

  componentDidMount() {
    this.props.actions.adquirirNegociadores();
  }

  removerNegociador(negociador,empresa) {
    this.props.actions.removerNegociador(empresa,negociador,this.state.novoNegociador,this.state.pesquisaRealizada);
    
    this.hideAlert();
  }
  
  hideAlert =() => {
    this.setState({
      alert: null
    });
  }


  
  confirmacaoRemocao  (negociador,empresa,nome)  {
    this.setState({
      alert: (
        <SweetAlert
          warning
          style={{ display: "block",color:`#222` }}
          onConfirm={() => this.removerNegociador(negociador,empresa)}
          onCancel={this.hideAlert}
          confirmBtnCssClass={
            this.props.classes.button + " " + this.props.classes.success
          }
          cancelBtnCssClass={
            this.props.classes.button + " " + this.props.classes.danger
          }
          confirmBtnText="Remover"
          cancelBtnText="Cancelar"
          showCancel
        >
          <h4>{`Deseja remover ${nome} de seus negociadores?`}</h4>
          <p>{`Depois de remover o negociador, ele deixará de realizar as mediações da sua empresa.`}</p>
        </SweetAlert>
      )
    });
  }

  alterarExibirAdicionarNegociador = exibir => () =>{

    if (!exibir) {
      this.props.actions.clearNegociadoresPesquisa();
    }
    this.setState({novoNegociador: exibir});
  }

  pesquisarNegociadores = () =>{

    if(30 >= this.state.pesquisa.length && this.state.pesquisa.length >= 3){
      this.setState({pesquisaState: '', pesquisaRealizada: this.state.pesquisa });
      this.props.actions.buscarPessoasNegociador(this.state.pesquisa);

    }else{

       this.setState({pesquisaState: 'error'});
    }
  }

  handleKeyPress= (e) =>{
      if (e.key === 'Enter') {
          this.pesquisarNegociadores(); 
      }
  }

  change = (evt) => {
    this.setState({ "pesquisa": evt.target.value });
  }

  novoNegociador(){
    const {classes} = this.props;
    return (
      <GridItem xs={12} sm={12} md={8} lg={8}  >
      <Card className = {classes.cardInteiro}>
        <CardHeader color="primary">
          <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Pesquisar negociador</h4>
        </CardHeader>
        <CardBody pricing className={classes.card}>
            <GridContainer>
               <GridItem xs={12} sm={12} md={6} lg={6} >
                    <CustomInput
                      error={this.state.pesquisaState === "error"}
                      labelText="Informe o nome ou CPF do negociador..."
                      errorHelperText="Mínimo de 3 caracteres"
                      inputProps={{
                        value: this.state.pesquisa,
                        onChange: this.change,
                        onKeyPress:this.handleKeyPress

                      }}
                      id="nome"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
              </GridItem>
              
              <GridItem xs={12} sm={12} md={6} lg={6} >
                  <Button round color="secondary" onClick={this.pesquisarNegociadores}>
                    Pesquisar
                  </Button>
                  <Button simple color="danger" size="sm"  onClick={this.alterarExibirAdicionarNegociador(false)}>
                    Fechar
                  </Button>
              </GridItem >
              <Table 
                            tableHead={[
                              "#",
                              "Nome",
                              "CPF/CNPJ",
                              "Adicionar",
                            ]}
                            tableData={this.dataToTableData()}
                            customCellClasses={[
                              classes.center,
                              classes.right
                            ]}
                            customClassesForCells={[0, 3]}
                            customHeadCellClasses={[
                              classes.center,
                              classes.right
                            ]}
                            customHeadClassesForCells={[0,3]}
                            footer
                          />
          </GridContainer>
        </CardBody>
      </Card>
     </GridItem>
    )
  }


  dataToTableData = () => {
    const { negociadores } = this.props;

    let negociadoresRetorno = [];
    let count = 0;
    negociadores.pessoas.forEach(element => {
      count++;
      negociadoresRetorno = negociadoresRetorno.concat([[
        count,
        element.nome,
        element.documento,
        this.botao(element)
      ]])
    });

    return negociadoresRetorno;
  }

  handleNovoNegociador = negociador => () =>{

    this.props.actions.adicionarNegociador(negociador, this.state.pesquisaRealizada);
    this.hideAlertNovo()
  }

  
  hideAlertNovo = () => {
    this.setState({
      alertNovo: null
    });
  }

  confirmacaoAdicionar  (negociador,nome)  {
    const {classes}= this.props;
    this.setState({
      alertNovo: (
        <SweetAlert
          info
          style={{ display: "block",color:`#222` }}
          onConfirm={this.handleNovoNegociador(negociador)}
          onCancel={this.hideAlertNovo}
          confirmBtnCssClass={
            classes.button + " " + classes.success
          }
          cancelBtnCssClass={
            classes.button + " " + classes.danger + " " + classes.simple
          }

          confirmBtnText="Adicionar"
          cancelBtnText="Cancelar"
          showCancel
        >
        <h4>{`Deseja adicionar ${nome} aos seus negociadores?`}</h4>
        <p>{`Depois de adicionar o negociador, ele ficará responsável por realizar as mediações da sua empresa.`}</p>
        </SweetAlert>
      )
    });
  }

  botao = negociador => {
    const { classes }  = this.props;
    
    return (
      <Button
          round
          color="primary"
          className={classes.actionButton + " " + classes.actionButtonRound}
          key={negociador.id}
          onClick={() => this.confirmacaoAdicionar(negociador.id,negociador.nome)}
        >
          <CheckCircle className={classes.iconList} />
        </Button>
    );
  }

  render() {
    const { classes,negociadores } = this.props;
    
    return(
      <React.Fragment>
        {this.state.alert}
        {this.state.alertNovo}
        
        <GridContainer>

        <Loader open={negociadores.carregando}/>
      
         {negociadores.negociadores.map(negociador => {
            return (
              <GridItem xs={12} sm={12} md={6} lg={3} key={negociador.id} className = {classes.cardInteiro}>
                  <Card className = {classes.cardInteiro}>
                    <CardBody pricing className={classes.card}>
                          <div className={classes.icon}>
                            {negociador.avatar?<img className={classes.imagemUser}  src={negociador.avatar} alt={negociador.negociador}/>
                            : <PersonOutline className={classes.iconColor} />}
                          </div>
                          <h4
                            className={`${classes.cardTitle} ${classes.marginTop20}`}
                          >
                          {negociador.negociador.toUpperCase()}
                          </h4>
                          <Button round color="secondary" onClick={() =>this.confirmacaoRemocao(negociador.id,negociador.empresa,negociador.negociador.toUpperCase())}>
                            Remover
                          </Button>
                        </CardBody>
                  </Card>
                </GridItem>
                
           );
          }, this)}
            <GridContainer>
           <GridItem xs={12} sm={12} md={4} lg={4}  >
                  <Card className = {classes.cardInteiro}>
                    <CardHeader color="primary">
                      <h4 className={[classes.cardTitleWhite, classes.semMargen].join(' ')}>Novo negociador</h4>
                    </CardHeader>
                    <CardBody pricing className={classes.card}>
                          <div className={classes.icon}>
                             <PersonOutline className={classes.iconColor} />
                          </div>
                          <h4
                            className={`${classes.cardTitle} ${classes.marginTop20}`}
                          >
                            Adicionar novo negociador para sua empresa?
                          </h4>
                          <Button round color="info" onClick={this.alterarExibirAdicionarNegociador(true)}>
                            Adicionar
                          </Button>
                        </CardBody>
                  </Card>
            </GridItem>
            {this.state.novoNegociador ? this.novoNegociador() :null }
            </GridContainer>
          </GridContainer>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  negociadores: state.negociadores
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...negociadorActions
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Negociador));
