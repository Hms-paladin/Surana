import React from 'react';
import Axios from 'axios';
import MUIDataTable from 'mui-datatables-bitozen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import brand from './brand';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { apiurl } from "../../../App";

import './Application.css';

class Leaveapplicationlist extends React.Component {
  state = {
    data: [],
    changeData: [],
    edit: [],
    PName: '',
    PStartDate: '',
    PEndDate: '',
    PNoOfDays: '',
    PEmpLeaveId: '',
    vertical: 'bottom',
    horizontal: 'left',
    open: false,
    setOpen: false,
    loading: false,
    style: this.props.mode,
    page: 0,
    rowsPerPage: 5,
    columns: [
      {
        label: <span className='font-weight-bold'>Employee Name</span>,
        name: 'Name',
        options: {
          filter: true,
          sort: false,
        }
      },

      // {
      //   label: 'Start Date',
      //   name: 'StartDate',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },
      // {
      //   label: 'End Date',
      //   name: 'EndDate',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },
      {
        label: <span className='font-weight-bold'>No.of days</span>,
        name: 'NoOfDays',
        options: {
          filter: true,
          sort: false,
        }
      },
      // {
      //   label: 'EmpLeave Id',
      //   name: 'EmpLeaveId',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },


      {
        label: <span className='font-weight-bold'>Action</span>,
        name: 'status',
        options: {
          customBodyRender: (name, record) => (
            <span className={'empContentViewIcon'} onClick={(event) => this.handleRowClick(event, record)}>
              <VisibilityIcon />
            </span>
          ),

          filter: false,
          sort: false,

        },

      },

      {
        label: <span className='font-weight-bold'>Status</span>,
        name: 'status',
        options: {
          customBodyRender: (name, record) => (
            <span
              className={
                name === null && 'text-warning' || name === 'Approved' && 'text-success' || name === 'Rejected' && 'text-danger'
              }
            >
              {name === null ? 'Pending' : name}
            </span>
          )
        },

      }
    ],
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ setOpen: false });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  componentWillMount() {
    this.getLeaveDetails();

  }

  getLeaveDetails = () => {
    Axios.get('http://54.198.55.249:8159/api/v1/leavedetails')
      .then(res => this.setState({
        data: res.data.data
      })
      );

  };

  handleRowClick = (event, record) => {
    const { data } = this.state;
    const any = data.find((p, i) => i == record.rowIndex)
    console.log(any, "anysdfjk");
    this.setState({
      edit: any,
      PName: any.Name,
      PStartDate: any.StartDate,
      PEndDate: any.EndDate,
      PNoOfDays: any.NoOfDays,
      PEmpLeaveId: any.EmpLeaveId
    })
    this.setState({
      open: true
    });
  }
  // handleEdit = (event) => {
  //   const { PName, PStartDate, PEndDate, PNoOfDays, PEmpLeaveId } = this.state;
  //   console.log('editname', PName)
  //   console.log('editstartdate', PStartDate)
  //   console.log('editenddate', PEndDate)
  //   console.log('editdays', PNoOfDays)
  //   console.log('editEmpLeaveId', PEmpLeaveId)

  //   const editper = {
  //     // leaveId:"2",
  //     empId: PName,
  //     startdate: PStartDate,
  //     endDate: PEndDate,
  //     leaveavailed: PNoOfDays,
  //     empleaveId: PEmpLeaveId

  //   }
  //   Axios.put('http://54.198.55.249:8159/api/v1/updateleave', editper, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then(res => {
  //       if (res.data.status === "Leave Updated") {
  //         this.setState({ open: true, msg: res.data.msg }, () => {
  //           setTimeout(() => {
  //             this.props.history.push("http://localhost:3000/surana/?/Home/Leave")
  //           }, 50)
  //         })
  //       }
  //       else {
  //         this.setState({ open: true, msg: res.data.msg }, () => {
  //           setTimeout(() => {
  //             this.setState({ open: false })
  //           }, 50)
  //         })
  //       }
  //     });
  // }



  closePop = (id, status) => {
    Axios({
      url: apiurl + '/updateleavestatus',
      method: 'PUT',
      data: {
        empleaveId: id,
        status: status
      }
    }).then((response) => {
      this.setState({ open: false });
      this.getLeaveDetails()
    }).catch((error) => {
      this.setState({ open: false });
      console.log(error)
    })
  };

  render() {
    const { PName, PStartDate, PEndDate, PNoOfDays, PEmpLeaveId, edit } = this.state;
    const title = brand.name + ' - Users';
    const description = brand.desc;
    const { data, open, columns, setOpen,
      loading, rowsPerPage, page, width,
      style } = this.state;
    console.log('s', data)
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    const { classes } = this.props;

    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 5,
      page: 0,
    };
    return (

      <div>

        <div class='userTable'>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            options={{
              selectableRows: "none" // <===== will turn off checkboxes in rows
            }}
          />

        </div>
        <form >
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title" className={'employeeContentTitle'}>
              {'Leave Application'}
              <span className='empContentClose'><CloseIcon onClick={() => this.setState({ open: false })} /></span>
            </DialogTitle>
            <div className='employeeContentContainer'>
              <div className='employeeContent'>
                <div className='mr-2'><span className='employeeContentLabel'>Employee Name: </span> {edit.Name}</div>
                <div className='mr-2'><span className='employeeContentLabel'>State Date: </span>{edit.StartDate}</div>
                <div className='mr-2'><span className='employeeContentLabel'>End Date: </span> {edit.EndDate}</div>
              </div>
              <div className='employeeContentBottom'>
                <div className='mb-2'><span className='employeeContentLabel'>Address: </span>{edit.Address}</div>
                <div className='mb-2'><span className='employeeContentLabel'>Reason For Leave: </span>{edit.Reason}</div>
                <div className='mb-2'><span className='employeeContentLabel'>Emergency Contact Number: </span>{edit.EmergencyContact}</div>
              </div>
              <div className='float-right'>
                <button className='empContentReject' onClick={() => this.closePop(edit.EmpLeaveId, 'Rejected')}>Reject</button>
                <button className='empContentApprove' onClick={() => this.closePop(edit.EmpLeaveId, 'Approved')}>Approve</button>
              </div>
            </div>
          </Dialog>
        </form>


      </div>
    );
  };
}

Leaveapplicationlist.propTypes = {
  classes: PropTypes.object.isRequired,
};
//export default withStyles(styles)(Leaveapplicationlist);
export default Leaveapplicationlist;










