import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import tableStyle from '../../assets/jss/components/tableStyle';
import { TableFooter, TablePagination } from '@material-ui/core';

class CustomTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 0
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  render() {
    const {
      classes,
      tableHead,
      tableData,
      tableHeaderColor,
      hover,
      colorsColls,
      coloredColls,
      customCellClasses,
      customClassesForCells,
      striped,
      tableShopping,
      customHeadCellClasses,
      customHeadClassesForCells,
      footer,
      rowsPerPage
    } = this.props;

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          {tableHead !== undefined ? (
            <TableHead className={classes[tableHeaderColor]}>
              <TableRow className={classes.tableRow /*+ " " + classes.tableId*/}>
                {tableHead.map((prop, key) => {
                  const tableCellClasses =
                    classes.tableHeadCell +
                    //" " + classes.tableId+ //TODO: Repensar nisso, só deveria aplicar quando a coluna tiver # ..... estava bugando todas as outras tables, limitando as colunas em 80px
                    " " +
                    classes.tableCell +
                    " " +
                    cx({
                      [customHeadCellClasses[
                        customHeadClassesForCells.indexOf(key)
                      ]]:
                        customHeadClassesForCells.indexOf(key) !== -1,
                      [classes.tableShoppingHead]: tableShopping,
                      [classes.tableHeadFontSize]: !tableShopping
                    });
                  return (
                    <TableCell className={tableCellClasses} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          ) : null}
          <TableBody>
            {tableData.slice(this.state.page * rowsPerPage, this.state.page * rowsPerPage + rowsPerPage).map((prop, key) => {
              var rowColor = "";
              var rowColored = false;
              if (prop.color !== undefined) {
                rowColor = prop.color;
                rowColored = true;
                prop = prop.data;
              }
              const tableRowClasses = cx({
                [classes.tableRowHover]: hover,
                [classes[rowColor + "Row"]]: rowColored,
                [classes.tableStripedRow]: striped && key % 2 === 0
              });
              if (prop.total) {
                return (
                <TableRow key={key} hover={hover} className={tableRowClasses /*+ " " + classes.tableId */}>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    />
                    <TableCell
                      className={classes.tableCell + " " + classes.tableCellTotal}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      className={
                        classes.tableCell + " " + classes.tableCellAmount
                      }
                    >
                      {prop.amount}
                    </TableCell>
                    {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                      <TableCell
                        className={classes.tableCell}
                        colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                      />
                    ) : null}
                  </TableRow>
                );
              }
              if (prop.purchase) {
                return (
                  <TableRow key={key} hover={hover} className={tableRowClasses}>
                    <TableCell
                      className={classes.tableCell}
                      colSpan={prop.colspan}
                    />
                    <TableCell
                      className={classes.tableCell + " " + classes.right}
                      colSpan={prop.col.colspan}
                    >
                      {prop.col.text}
                    </TableCell>
                  </TableRow>
                );
              }
              return (
                <TableRow
                  key={key}
                  hover={hover}
                  className={classes.tableRow + " " + tableRowClasses /*+ " " + classes.tableId */}
                >
                  {prop.map((prop, key) => {
                    const tableCellClasses =
                      classes.tableCell +
                      " " +
                      cx({
                        [classes[colorsColls[coloredColls.indexOf(key)]]]:
                          coloredColls.indexOf(key) !== -1,
                        [customCellClasses[customClassesForCells.indexOf(key)]]:
                          customClassesForCells.indexOf(key) !== -1
                      });
                    return (
                      <TableCell className={tableCellClasses} key={key}>
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          {
            footer && tableData.length > rowsPerPage ? (
              <TableFooter>
                <TableRow>
                  <TablePagination 
                    colSpan={3}
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    labelRowsPerPage= {false}
                  />
                </TableRow>
              </TableFooter>
            ) : null
          }
          
        </Table>
       {(tableData || []).length === 0 ? <h4 className={classes.naoHaDados}>Não hà dados</h4>: null}
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
  footer: true,
  rowsPerPage: 5,
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "secondary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  tableShopping: PropTypes.bool,
  footer: PropTypes.bool,
  rowsPerPage: PropTypes.number
};

export default withStyles(tableStyle)(CustomTable);