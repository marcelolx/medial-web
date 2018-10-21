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
import Close from "@material-ui/icons/Close";

import CustomInput from '../../components/CustomInput';
import CardHeader from '../../components/Card/CardHeader';
import Button from '../../components/CustomButtons/Button';
import Table from '../../components/Table';
import CardIcon from '../../components/Card/CardIcon';




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
  render() {
    const {classes}  = this.props;
    
    const fillButtons = [
      { color: "success", icon: Edit }
    ].map((prop, key) => {
      return (
        <Button color={prop.color} className={classes.actionButton} key={key}>
          <prop.icon className={classes.icon}/>
        </Button>
      );
    });
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
               </CardHeader>
              <CardBody>
                <NavPills
                  color="info"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 12, md: 4 },
                    contentGrid: { xs: 12, sm: 12, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Conflitos",
                      tabContent: (
                        <Table
                        tableHead={[
                          "#",
                          "Conflitos",
                          "Acões"
                        ]}
                        tableData={[
                          [
                            "1",
                            "Tipo",
                            fillButtons
                          ],
                          ["2",
                           "Serviço",
                            fillButtons
                          ],
                          [
                            "3",
                            "Serviço",
                            fillButtons
                          ],
                          [
                            "4",
                            "Produto",
                            fillButtons
                          ],
                          [
                            "5",
                            "Viagem",
                            fillButtons
                          ]
                        ]}
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
                      )
                    },
                    {
                      tabButton: "Novo Conflito",
                      tabContent: (
                        <>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Conflito *"
                            id="conflito"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                    </>
                      )
                    }
                  ]}
                />
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
               </CardHeader>
              <CardBody>
                <NavPills
                  color="info"
                  horizontal={{
                    tabsGrid: { xs: 12, sm: 12, md: 4 },
                    contentGrid: { xs: 12, sm: 12, md: 8 }
                  }}
                  tabs={[
                    {
                      tabButton: "Assuntos",
                      tabContent: (
                        <Table
                        tableHead={[
                          "#",
                          "Assuntos",
                          "Acões"
                        ]}
                        tableData={[
                          [
                            "1",
                            "Troca",
                            fillButtons
                          ],
                          ["2", "Aluguem", fillButtons],
                          [
                            "3",
                            "Venda",
                            fillButtons
                          ],
                          [
                            "4",
                            "Mike Monday",
                            fillButtons
                          ],
                          [
                            "5",
                            "Paul Dickens",
                            fillButtons
                          ], [
                            "21",
                            "Andrew Mike",
                            fillButtons
                          ],
                          ["22", "John Doe", fillButtons],
                          [
                            "32",
                            "Alex Mike",
                            fillButtons
                          ],
                          [
                            "42",
                            "Mike Monday",
                            fillButtons
                          ],
                          [
                            "52",
                            "Paul Dickens",
                            fillButtons
                          ]
                        ]}
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
                      )
                    },
                    {
                      tabButton: "Novo Assunto",
                      tabContent: (
                        <>
                        <GridItem xs={12} sm={12} md={12}>
                          <CustomInput
                            labelText="Conflito *"
                            id="assuntoConflito"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                          <CustomInput
                            labelText="Assunto *"
                            id="assunto"
                            formControlProps={{
                              fullWidth: true
                            }}
                          />
                        </GridItem>
                    </>
                      )
                    }
                  ]}
                />
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
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Configurations)); 