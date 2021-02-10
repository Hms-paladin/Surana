import React from 'react';
import classNames from 'classnames';
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
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { IoMdEye } from "react-icons/io";
import EnhancedTableHead from '../enhancedTableHead/EnhancedTableHead';
import { modalAction } from '../../hoc/modalAction';


let counter = 0;
function createData(sno,name,age,gender,experience,view,sms,email) {
  counter += 1;
  return { id: counter, sno,name,age,gender,experience,view,sms,email };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

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
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });
  
  class CandidatesList extends React.Component {
    state = {
      order: 'asc',
      orderBy: 'calories',
      rows: [
        { id: 'sno', numeric: false, disablePadding: false, label: 'Sno' },
        { id: 'name', numeric: true, disablePadding: false, label: 'Name' },
        { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
        { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
        { id: 'experience', numeric: true, disablePadding: false, label: 'Experience' },
        { id: 'view', numeric: true, disablePadding: false, label: 'View' },
        { id: 'sms', numeric: true, disablePadding: false, label: 'Sms' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
    
    ],
      data: [
        createData(1,"Mani", 37, "Male", 4.3),
        createData(2,"Venkatesh", 27, "Male", 2),
        createData(3,"Karthick", 57, "Male", 6),
        createData(4,"Surya", 17, "Male", 2),
        createData(5,"Balaji", 22, "Male", 7),
      ],
      page: 0,
      rowsPerPage: 5
    };
  
    handleRequestSort = (event, property) => {
      const orderBy = property;
      let order = 'desc';
  
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
      }
  
      this.setState({ order, orderBy });
    };
  
  handleChangePage = (event, page) => {
      this.setState({ page });
  };
  
    handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: event.target.value });
    };

    viewContent = () => {
      this.props.dispatch(modalAction({ edit: true }));
    }
  
    render() {
      const { classes } = this.props;
      const { data, order, orderBy, rowsPerPage, page, rows } = this.state;
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
      return (
        <React.Fragment>
        <h6 className="mb-3"><strong>Candidates List</strong></h6>
        <Paper className={classes.root}>
          <div className="card card-min-height">
            <div className="card-body">
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
                rows={rows}
              />
              <TableBody>
                {stableSort(this.state.data, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    return (
                      <TableRow
                        hover
                        key={n.id}
                      >
                        <TableCell className="p-2">
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {n.sno}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.age}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.gender}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.experience}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left" className="-2">
                              <button className="btn btn-sm"><IoMdEye className="icon-font" onClick={(e) => {e.stopPropagation(); this.viewContent();}}/></button>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                              <button className="btn btn-sm btn-success">Send</button>
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                              <button className="btn btn-sm btn-secondary">Send</button>
                        </TableCell>
                        <TableCell padding="checkbox">
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
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
          </div>
          </div>
        </Paper>
        </React.Fragment>
      );
    }
  }
  
  CandidatesList.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(CandidatesList);
