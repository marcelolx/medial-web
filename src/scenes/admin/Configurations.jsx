import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Modal from 'react-responsive-modal';

import CustomInput from '../../components/CustomInput';
import CardHeader from '../../components/Card/CardHeader';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table';
import CardIcon from '../../components/Card/CardIcon';
import SearchSelect from '../../components/SearchSelect';

import * as configuracaoActions from './../../services/admin/configuracao/actions'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  }, 
  textRight: {
    textAlign: "right",
  },
  right: {
    float: "right",
  },
  center: {
    textAlign: "center"
  },
  description: {
    maxWidth: "150px"
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px"
    }
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative"
  },
  marginZero:{
    margin: "0",
  },
  paddingGrid:{
    padding: "0 5px",
  },
  titleCard:{
    width: "100px",
    float: "left",
    marginTop:"10px",
    fontWeight:300,
    color:"#3C4858"
  }
});
class Configurations extends React.Component {

  constructor(props){
    super(props);

    this.state={
      conflitoState: "error",
      conflitoAssuntoState: "error",
      assuntoState: "error",
      conflito: "",
      assunto: "",
      conflitoAssunto: [],
      conflitos: [],
      assuntos: [],
      atualizar: true,
      modalAssunto: false,
      modalConflito: false,
      codigo:null,
    }
    this.openModal = this.openModal.bind(this);
  }
  openModal(modal) {
    if (modal === "modalAssunto") {
      this.props.actions.getConflitos();
    }
      
    this.setState({[modal]: true});
  }
  closeModal(modal) {
    this.setState({[modal]: false});
  }

  atualizarConflito = linha =>{
    this.setState({
      conflito: linha.conflito,
      codigo:linha.id,
      conflitoState: "success",
    })

    this.openModal("modalConflito");
  }

  onBlurModal =() =>{
    this.setState({
      codigo: null,
      conflitoState: "error",
      conflitoAssuntoState: "error",
      assuntoState: "error",
      conflitoAssunto:null,
      conflito: ``,
      assunto:``,
    })
  }
  atualizarAssunto = linha => {
    this.setState({
      conflitoAssunto: {"value":linha.codigoConflito,"label":linha.conflito},
      assunto: linha.assunto ,
      conflitoAssuntoState: "success",
      assuntoState: "success",
      codigo:linha.id,
    })
   this.openModal("modalAssunto");
  }

  componentDidMount(){
    this.props.actions.getConfiguracao();
  }


  salvarConflito =() =>{

    if (this.state.conflitoState === "error"){
      this.error();
      return;
    }

    let data = {
      id: this.state.codigo,
      conflito: this.state.conflito,
    }
    this.props.actions.salvarConflito(data);
    
    this.sucessoRecarregar("modalConflito");
  }
  
  sucessoRecarregar= tipoModal =>{
    this.closeModal(tipoModal);
    this.setState({
      atualizar: true,
    })

  
  }

  salvarAssunto =() =>{
    if (this.state.conflitoAssuntoState === "error" || this.state.assuntoState === "error"){
      this.error();
      
      return;
    }

    let data = {
      id: this.state.codigo,
      assunto: this.state.assunto,
      codigoConflito: this.state.conflitoAssunto.value,
    }
    this.props.actions.salvarAssunto(data);
  
    this.sucessoRecarregar("modalAssunto");
  }

  error=()=>{
    alert("Erro")
  }

  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  change(event, stateName, type) {
    switch (type) {
      case "texto":
          if (this.verifyLength(event.target.value, 3)) {
            this.setState({
              [stateName + "State"]: "success"
            });
          } else {
            this.setState({
              [stateName + "State"]: "error"
            });
          }
        break;
      default:
          
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  handleSelectChange = name => selecionado => {
    this.setState({
      [name]: selecionado
    });
    if (selecionado.length !== 0) {       
      this.setState({
        [name + "State"]: "success"
      });
    } else {
      this.setState({
        [name + "State"]: "error"
      });
    }
  }

  componentWillUpdate  = () => {
    if (this.state.atualizar) {
        this.atribuirBotoes()
    }
  
  }

  atribuirBotoes = () => {
    const {classes} = this.props;
    this.setState({
      conflitos: this.props.configuracao.conflitos!== undefined 
        ? this.props.configuracao.conflitos.map((prop, key) => {
          return {
            id: prop.id,
            conflito:  prop.conflito,
            actions: (     
              <div>
                {
                  <Button color="success" className={classes.actionButton} key={key}  onClick={() => this.atualizarConflito(prop)}>
                    <Edit/>
                  </Button>
                }
              </div>
            )
          }
        })
      :[],
      assuntos: this.props.configuracao.assuntos!== undefined 
        ? this.props.configuracao.assuntos.map((prop, key) => {
          return {
            id: prop.id,
            assunto:  prop.assunto,
            conflito: prop.conflito,
            actions: (     
               <div>
                  {
                    <Button color="success" className={classes.actionButton} key={key}  onClick={() => this.atualizarAssunto(prop)}>
                      <Edit/>
                    </Button>
                  }
               </div>
            )
          }
        })
      :[],
      atualizar:false,
      })
  } 

  render() {
    const {classes}  = this.props;
    const {conflitosAssuntos} = this.props.configuracao;
    
    return (
      <>
       <GridContainer>
          <GridItem xs={12} sm={12} md={6} className={classes.paddingGrid}>
            <Card>
             <CardHeader  color="primary" icon>
                  <CardIcon  color="primary">
                    <Person/>
                  </CardIcon>
                   <h4 className={[classes.marginZero,classes.titleCard].join(` `)}> Conflitos</h4>
                   <Button color="primary" className={classes.right}  onClick={() => this.openModal("modalConflito")}>Novo Conflito</Button>
               </CardHeader>
              <CardBody>
                        <Table
                        tableHead={[
                          "#",
                          "Conflitos",
                          "Acões"
                        ]}
                        tableData={ this.state.conflitos !== undefined ? this.state.conflitos.map(
                          n=> 
                          [
                           n.id,
                           n.conflito,
                           n.actions
                          ]
                        ):[]}
                        customCellClasses={[
                          classes.center,
                          classes.textRight,
                        ]}
                        customClassesForCells={[0, 2]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.textRight,
                        ]}
                        customHeadClassesForCells={[0, 2]}
                      />
                        <Modal open={this.state.modalConflito}  onExited={()=>this.onBlurModal()} onClose={()=>this.closeModal("modalConflito")} center>
                          
                        <CustomInput
                            success={this.state.conflitoState === "success"}
                            error={this.state.conflitoState === "error"}
                            labelText="Conflito *"
                            id="conflito"
                            formControlProps={{
                              fullWidth: true
                            }} 
                            inputProps={{
                              value: this.state.conflito,
                              onChange: event =>
                              this.change(event, "conflito", "texto")
                            }}
                          />
                        <Button className={classes.right} color="secondary" onClick={() => this.salvarConflito()}>Salvar Conflito</Button>
               </Modal>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} className={classes.paddingGrid}>
            <Card>
              <CardHeader  color="primary" icon>
                  <CardIcon  color="primary">
                    <Person/>
                  </CardIcon>
                   <h4 className={[classes.marginZero,classes.titleCard].join(` `)}> Assuntos</h4>
                   <Button color="primary" className={classes.right} onClick={() => this.openModal("modalAssunto")}>Novo Assunto</Button>
               </CardHeader>
              <CardBody>
                        <Table
                        tableHead={[
                          "#",
                          "Assunto",
                          "Conflito",
                          "Acões"
                        ]}
                        tableData={this.state.assuntos !== undefined ? this.state.assuntos.map(
                          n=> [
                           n.id,
                           n.assunto,
                           n.conflito,
                           n.actions
                          ]
                        ):[]}
                        customCellClasses={[
                          classes.center,
                          classes.textRight,
                        ]}
                        customClassesForCells={[0, 3]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.textRight,
                        ]}
                        customHeadClassesForCells={[0, 3]}
                      />
              </CardBody> 
            
                 <Modal open={this.state.modalAssunto} onExited={()=>this.onBlurModal()} onClose={()=>this.closeModal("modalAssunto")} center>
                            <SearchSelect
                              opcoes={conflitosAssuntos}
                              name="conflitoAssunto"
                              onChange={(name, value) => this.handleSelectChange(name, value)}
                              value={this.state.conflitoAssunto}
                              placeholder="Conflitos"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              error={this.state.conflitoAssuntoState === "error"}
                              errorHelperText="Selecione o conflito"
                            />
                       
                          <CustomInput
                            success={this.state.assuntoState === "success"}
                            error={this.state.assuntoState === "error"}
                            labelText="Assunto *"
                            id="assunto"
                            formControlProps={{
                              fullWidth: true
                            }} 
                            inputProps={{
                              value: this.state.assunto,
                              onChange: event =>
                              this.change(event, "assunto", "texto")
                            }}
                            errorHelperText="Selecione o conflito"
                          />
                       
                        <Button color="secondary" className={classes.right}  onClick={() => this.salvarAssunto()}>Salvar Assunto</Button>
               </Modal>
            </Card>
          </GridItem>
        </GridContainer>
        
     </>
    );
  }
}

Configurations.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
  configuracao: state.configuracao,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...configuracaoActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Configurations)); 