import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import * as listActions from './services/usersActions';
import ExibicaoUsuario from './ExibicaoUsuario';
import ListUsersToolbar from './ListUsersToolbar';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', label: 'Nome' },
  { id: 'birthDate', disablePadding: false, label: 'Data de Nascimento' },
  { id: 'email', disablePadding: false, label: 'E-mail' },
  { id: 'total', disablePadding: false, label: 'Total de mediações' },
  { id: 'active', disablePadding: false, label: 'Mediações ativas' },
];

class ListUsersHead extends React.Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title='Ordem'
                  placement={row.numeric ? 'bottom-start' : 'bottom-end'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

ListUsersHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class ListUsers extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    data: [],
    modal: false,
    page: 0,
    rowsPerPage: 10,
  };
  componentDidMount() {
    this.props.actions.getStateUsers(this.state);
  }


  onBlurModal = () => {
    this.setState({
      modal: false,

    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.data.users.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log('ListUsers click')

    this.setState({ modal: true, codigoModal: id });
  };

  handleChangePage = (event, page) => {

    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, data } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.users.length - page * rowsPerPage);
    return (
      <>
        <Paper className={classes.root}>
          <ListUsersToolbar />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby='tableTitle'>
              <ListUsersHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                {data.users
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isSelected}
                        tabIndex={-1}
                        onClick={event => this.handleClick(event, n.id)}
                        key={n.id}
                        selected={isSelected}
                      >

                        <TableCell component='th' scope='row' >
                          {n.name}
                        </TableCell>
                        <TableCell >{n.birthDate}</TableCell>
                        <TableCell >{n.email}</TableCell>
                        <TableCell >{n.total}</TableCell>
                        <TableCell >{n.active}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            component='div'
            count={data.users.length}
            labelRowsPerPage='Linhas por página:'
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />

        </Paper>
        {this.state.modal ? <ExibicaoUsuario
          codigoUsuario={this.state.codigoModal}
          onClose={() => this.setState({ modal: false })}
        /> : null}
      </>
    );
  }
}

ListUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  data: state.listUsers,
  error: state.error,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...listActions,
  }, dispatch)
});

export default withRouter(compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(ListUsers)); 