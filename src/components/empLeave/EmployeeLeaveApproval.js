// import React from 'react';
// import { IoMdAdd, IoMdEye } from 'react-icons/io';
// import { Table, Input } from 'antd';
// import TextField from '@material-ui/core/TextField';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
// import SearchIcon from '@material-ui/icons/Search';
// import ClearIcon from '@material-ui/icons/Clear';
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
import './EmployeeLeaveApproval.css';


let counter = 0;
function createData(sno,from_date,to_date,no_of_days,view) {
  counter += 1;
  return { id: counter, sno,from_date,to_date,no_of_days,view };
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

// const { Column } = Table;
// const { Search } = Input;

// const data = [
//     {
//         key: '1',
//         sno: 1,
//         name: 'John Brown',
//         fromdate: '13-08-19',
//         todate: '17-09-19',
//         no_of_days: 2,
//     },
//     {
//         key: '2',
//         sno: 2,
//         name: 'John Brown',
//         fromdate: '13-06-19',
//         todate: '20-09-19',
//         no_of_days: 2,
//     },
// ];

class EmployeeLeaveApproval extends React.Component{
    state = {
        order: 'asc',
        orderBy: 'calories',
        rows: [
          { id: 'sno', numeric: false, disablePadding: false, label: 'Sno' },
          { id: 'from_date', numeric: true, disablePadding: false, label: 'From Date' },
          { id: 'to_date', numeric: true, disablePadding: false, label: 'To Date' },
          { id: 'no_of_days', numeric: true, disablePadding: false, label: 'No Of Days' },
          { id: 'view', numeric: true, disablePadding: false, label: 'View' },
      
      ],
        data: [
          createData(1,"12-6-2019", "23-7-2019", 4),
          createData(2,"28-2-2019", "10-6-2019", 2),
          createData(3,"10-6-2019", "12-9-2019", 6),
          createData(4,"19-3-2019", "5-4-2019", 2),
          createData(5,"6-12-2019", "8-2-2020", 7),
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
    render(){
        const { classes } = this.props;
        const { data, order, orderBy, rowsPerPage, page, rows } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return(
            <React.Fragment>
        <h6 className="mb-3"><strong>Leave Approval List</strong></h6>
        <Paper className={classes.root}>
          <div className="card card-min-height">
            <div className="card-body">
          <div className={classes.tableWrapper}>
            <Table className={classes.table,"leave_table"} aria-labelledby="tableTitle">
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
                          {n.from_date}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.to_date}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {n.no_of_days}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left" className="-2">
                              <button className="btn btn-sm"><IoMdEye className="icon-font" onClick={(e) => {e.stopPropagation(); this.viewContent();}}/></button>
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
        )
    }
}

  
EmployeeLeaveApproval.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(EmployeeLeaveApproval);