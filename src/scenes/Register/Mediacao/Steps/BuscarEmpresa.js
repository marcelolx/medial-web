import React, { Component } from 'react';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import CustomInput from '../../../../components/CustomInput';
import Checkbox from '@material-ui/core/Checkbox';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../../components/CustomButtons/Button';
import Table from '../../../../components/Table';
import empresasTableStyle from '../../../../assets/jss/scenes/empresasTableStyle';
import Check from "@material-ui/icons/Check";
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardBody from '../../../../components/Card/CardBody';
import CardIcon from '../../../../components/Card/CardIcon';
import Assignment from "@material-ui/icons/Assignment";

const style = {
  ...empresasTableStyle,
  inputAdornment: {
    position: "relative"
  },
  searchButton: {
    marginTop: '20%',
  },
};

class BuscarEmpresa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fantasia: '',
      cnpj: '',
      searchWithoutFillFields: false,
    }
  }

  sendState() {
    return this.state;
  }

  isValidated() {
    return false;
  }

  render() {
    const { classes } = this.props;

    return(
      <React.Fragment>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={5}>
            <CustomInput 
              error={false}
              errorHelperText="Informe o Nome Fantasia e/ou o CNPJ da empresa"
              labelText="Nome fantasia"
              id="nome-fantasia"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <CustomInput 
              error={true}
              errorHelperText="Informe o Nome Fantasia e/ou o CNPJ da empresa"
              labelText="CNPJ"
              id="nome-fantasia"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button
              className={classes.searchButton}
            >
              Buscar
            </Button>
          </GridItem>
        </GridContainer>      
        <GridContainer justify="center">
          <GridItem xs={12}>
            <Card>
              <CardHeader color="primary" icon>
                <CardIcon color="primary">
                  <Assignment />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Empresas</h4>
              </CardHeader>
              <CardBody>
                <Table 
                striped
                tableHead={[
                  "#",
                  "",
                  "Nome",
                  "Fantasia",
                  "CNPJ",
                  "Estado",
                  "Cidade",
                ]}
                tableData={[
                  [
                    "1",
                    <Checkbox
                      className={classes.positionAbsolute}
                      tabIndex={-1}
                      onClick={() => this.handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    />,
                    "Sysmo Sistemas LTDA",
                    "Sysmo Sistemas",
                    "9878979878978",
                    "Santa Catarina",
                    "São Miguel do Oeste"
                  ],
                  [
                    "2",
                    <Checkbox
                      className={classes.positionAbsolute}
                      tabIndex={-1}
                      onClick={() => this.handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    />,
                    "Sysmo Sistemas LTDA",
                    "Sysmo Sistemas",
                    "9878979878978",
                    "Santa Catarina",
                    "São Miguel do Oeste"
                  ],
                  [
                    "3",
                    <Checkbox
                      className={classes.positionAbsolute}
                      tabIndex={-1}
                      onClick={() => this.handleToggle(1)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked
                      }}
                    />,
                    "Sysmo Sistemas LTDA",
                    "Sysmo Sistemas",
                    "9878979878978",
                    "Santa Catarina",
                    "São Miguel do Oeste"
                  ],
                ]}
                customCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customClassesForCells={[0, 5, 6]}
                customHeadCellClasses={[
                  classes.center,
                  classes.right,
                  classes.right
                ]}
                customHeadClassesForCells={[0, 5, 6]}
              />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(style)(BuscarEmpresa);