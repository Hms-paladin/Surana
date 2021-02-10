import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import  './styles.css'
import Icon from '@material-ui/core/Icon';
import RemoveRedEyeOutlinedIcon from '@material-ui/icons/RemoveRedEyeOutlined';



const columns = [
  { id: 'sno', label: 'S.NO', minWidth: 170, align: 'center' },
  {
    id: 'name',
    label: 'Name',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'department',
    label: 'Department',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString(),
  },
  {
    id: 'subject',
    label: 'Subject',
    minWidth: 170,
    align: 'center',
    format: value => value.toFixed(2),
  },
   {
    id: 'view',
    label: 'View',
    minWidth: 170,
    align: 'center',
    format: value => value.toFixed(2),
  },
];

function createData(name, department, subject) {
  return { name, department, subject };
}

const rows = [
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
  createData('India', 'IT FIELD', 'Maths'),
];



const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'black',
    },
  },
}))(TableRow);


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    padding:10,
  },
  table: {
    minWidth: 500,
  },
})); 




export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }; 

   
   const viewFeedback =  (row)=>{
      
      console.log(row)
   }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="Table_div1">
    <Paper className={classes.root}>
      <div className={classes.table}>
        <Table   stickyHeader aria-label="customized table"  >
          <TableHead   >
            <TableRow >
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth,
                   }}
                   className="MuiTableCell-stickyHeader"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody  >
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
             
              return (
                             <TableRow
                      hover
                      tabIndex={-1}
                      key={row.code} 
                      className='striped' 
                    >
                     
                      <TableCell component="th"  scope="row" padding="none" align="center">
                        {i+1}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{row.subject}</TableCell>
                       <TableCell  align="center"> 
                             <RemoveRedEyeOutlinedIcon  color='primary' fontSize='medium' 
                             onClick={(row)=>viewFeedback(row)}/>
                              </TableCell> 



                    </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper></div>
  );
}
