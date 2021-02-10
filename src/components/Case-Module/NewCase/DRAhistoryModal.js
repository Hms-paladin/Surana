import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Case.css';

class DRAhistory extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div>
                    <h4 className ="dra_history_heading">DRA History</h4>
                </div>
                <div className ="emp_table_name_div">
                    <div>
                        <p className="">Employee Name:Rajesh</p>
                    </div>

                    <Table size="small" className="dra_table" component={Paper}  aria-label="a dense table"  className ="tcs">
                        <TableHead>
                        <TableRow >
                            <TableCell className="table_head" align="center">Case</TableCell>
                            <TableCell className="table_head" align="center">Client Name</TableCell>
                            <TableCell className="table_head" align="center">From</TableCell>
                            <TableCell className="table_head" align="center">To</TableCell>
                            <TableCell className="table_head" align="center">Status</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                            <TableCell component="th" align="center" scope="row">OS</TableCell>
                            <TableCell align="center" >TCS</TableCell>
                            <TableCell align="center">01 Jan 2020</TableCell>
                            <TableCell align="center">03 Jan 2020</TableCell>
                            <TableCell align="center">Completed</TableCell>
                            </TableRow>
                            <TableRow >
                            <TableCell component="th" align="center" scope="row">CC</TableCell>
                            <TableCell align="center">Wipro</TableCell>
                            <TableCell align="center">10 July 2020</TableCell>
                            <TableCell align="center">21 July 2020</TableCell>
                            <TableCell align="center">In Progress</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                </div>
               
                    
            </React.Fragment>
        )
    }
}
export default DRAhistory;