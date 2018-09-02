import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios';

import { logout } from '../../services/users/actions';



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
  { id: 'name', numeric: false, label: 'Nome' },
  { id: 'birthDate', disablePadding: false, label: 'Data de Nascimento' },
  { id: 'email', disablePadding: false, label: 'E-mail' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total de mediações' },
  { id: 'active', numeric: true, disablePadding: false, label: 'Mediações ativas' },
];

const GET_ORGANIZATION = `
  {
    getUsers{
      id,
      name
      birthDate
      email
      active
      total
    }
  }
`;

const axiosGraphQL = axios.create({
  baseURL: 'http://localhost:8080/api/graphql',
  headers: {
    Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqb25hc3Nqb0BvdXRsb29rLmNvbSIsImV4cCI6MTUzNjAyOTUwM30.SzCMjFAKd1iuYZ8UcRhaQC5zyaDGWjZ2qplXbxqRmjTuJmyaiQ3vawsoSwnl1nMzPH0W9klIZGNEcae5-WrGfg`,
  },
});

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
                  title="Ordem"
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

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let ListUsersToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar>
      <div className={classes.title}>

        <Typography variant="title" id="tableTitle">
          Lista de usuários ativos
          </Typography>

      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>

        <Tooltip title="Filtrar nome">
          <IconButton aria-label="Filtrar nome">
            <FilterListIcon />
          </IconButton>
        </Tooltip>

      </div>
    </Toolbar>
  );
};

ListUsersToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

ListUsersToolbar = withStyles(toolbarStyles)(ListUsersToolbar);

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
    page: 0,
    rowsPerPage: 10,
  };
  componentDidMount() {
    this.onFetchFrom();
  }
  onFetchFrom = () => {
    axiosGraphQL
      .post('', { query: GET_ORGANIZATION })
      .then(result => {
        if (result.data.data !== null) {
          this.setState(() => ({ data :result.data.data.getUsers}));
        }

      });
  };

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
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    console.log(id)
  };

  handleChangePage = (event, page) => {



    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <ListUsersToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ListUsersHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      onClick={event => this.handleClick(event, n.id)}
                      key={n.id}
                      selected={isSelected}
                    >

                      <TableCell component="th" scope="row" >
                        {n.name}
                      </TableCell>
                      <TableCell >{n.birthDate}</TableCell>
                      <TableCell >{n.email}</TableCell>
                      <TableCell numeric>{n.total}</TableCell>
                      <TableCell numeric>{n.active}</TableCell>
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
          component="div"
          count={data.length}
          labelRowsPerPage="Linhas por página:"
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
    );
  }
}

ListUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.data,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, {}),
)(ListUsers);