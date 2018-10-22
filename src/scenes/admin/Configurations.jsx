import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import NavPills from '../../components/NavPills/NavPills';
import CardBody from '../../components/Card/CardBody';
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";

import CustomInput from '../../components/CustomInput';
import CardHeader from '../../components/Card/CardHeader';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table';
import CardIcon from '../../components/Card/CardIcon';
import SearchSelect from '../../components/Root/RegisterStep/SearchSelect';

import * as configuracaoActions from './../../services/admin/configuracao/actions'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  }, right: {
    textAlign: "right"
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
      conflitosAssuntosState: "error",
      assuntoState: "error",
      conflito: "",
      assunto: "",
      conflitoSelect: [],
      conflitosAssuntos: [
        {value:1,
          label:"teste"
        }],
      conflitos: [],
      assuntos: [],
      atualizar: true,
    }
  }

  atualizarConflito = linha =>{
    alert(`conflito selecionado:` +linha.conflito + ` ` + linha.id)
  }
  atualizarAssunto = linha => {
    alert(`assunto selecionado:` +linha.assunto + ` ` + linha.id)
  }

  componentDidMount(){
    this.props.actions.getConfiguracao();
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
    const {classes} = this.props;
    if (this.state.atualizar) {
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
  
  }

  render() {
    const {classes}  = this.props;
    const {conflitosAssuntos} = this.state;
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
                   <Button color="primary" onClick={() => this.salvarAssunto()}>Novo Conflito</Button>
               </CardHeader>
              <CardBody>
           
                        <Table
                        tableHead={[
                          "#",
                          "Conflitos",
                          "Acões"
                        ]}
                        tableData={this.state.conflitos !== undefined ? this.state.conflitos.map(
                          n=> [
                           n.id,
                           n.conflito,
                           n.actions
                          ]
                        ):[]}
                        customCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customClassesForCells={[0, 2]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customHeadClassesForCells={[0, 2]}
                      />
                     
                        <GridItem xs={12} sm={12} md={12}>
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
                        </GridItem>
                        
                        <Button color="secondary" onClick={() => this.salvarAssunto()}>Salvar Conflito</Button>
                        
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
                   <Button color="primary" onClick={() => this.salvarAssunto()}>Novo Assunto</Button>
               </CardHeader>
              <CardBody>
                        <Table
                        tableHead={[
                          "#",
                          "Assuntos",
                          "Acões"
                        ]}
                        tableData={this.state.assuntos !== undefined ? this.state.assuntos.map(
                          n=> [
                           n.id,
                           n.assunto,
                           n.actions
                          ]
                        ):[]}
                        customCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customClassesForCells={[0, 2]}
                        customHeadCellClasses={[
                          classes.center,
                          classes.right,
                        ]}
                        customHeadClassesForCells={[0, 2]}
                      />
                        <GridItem xs={12} sm={12} md={4}>
                            <SearchSelect
                              opcoes={conflitosAssuntos}
                              name="conflitoSelect"
                              onChange={(name, value) => this.handleSelectChange(name, value)}
                              value={this.state.conflitoSelect}
                              placeholder="Conflitos"
                              formControlProps={{
                                fullWidth: true,
                              }}
                              error={this.state.conflitosAssuntosState === "error"}
                              errorHelperText="Selecione o conflito"
                            />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
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
                          />
                        </GridItem>
                        <Button color="secondary" onClick={() => this.salvarAssunto()}>Salvar Assunto</Button>
              </CardBody>
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