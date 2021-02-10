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
import dateFormat from 'dateformat';

import './Application.css';

class OnDutyList extends React.Component {
  state = {
    onDutyLeaveDetails: null,
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

      {
        label: <span className='font-weight-bold'>No.of days</span>,
        name: 'NoOfDays',
        options: {
          filter: true,
          sort: false,
        }
      },


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
    Axios.get('http://54.198.55.249:8159/api/v1/ondutydetails')
      .then(res => this.setState({
        data: res.data.data
      })
      );

  };

  handleRowClick = (event, record) => {
    const { data } = this.state;
    const any = data.find((p, i) => i == record.rowIndex)
    console.log(any, "anysdfjk");
    this.getOnDutyLeaveDetails(any.EmpLeaveId)
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

  getOnDutyLeaveDetails = (leaveId) => {
    Axios({
      method: 'POST',
      url: apiurl + '/viewondutydetails',
      data: {
        EmpLeaveId: leaveId
      }
    }).then((response) => {
      console.log(response.data, 'mysdfksdfu')
      this.setState({ onDutyLeaveDetails: response.data.data[0] })
    })
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
    const { onDutyLeaveDetails } = this.state;
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
      page: 0
    };
    return (

      <div>

        <div class='userTable'>
          <MUIDataTable
            data={data}
            columns={columns}
            options={options}
            viewColumns={false}
            filter={false}
            options={{
              selectableRows: "none" // <===== will turn off checkboxes in rows
            }}
          />

        </div>
        {
          onDutyLeaveDetails !== null &&
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title" className={'employeeContentTitle'}>
              {'On Duty Form'}
              <span className='empContentClose'><CloseIcon onClick={() => this.setState({ open: false })} /></span>
            </DialogTitle>

            <div className='employeeContentContainer'>

              <div className='card'>
                <div className='card-body'>
                  <div className='cepCardFlex row'>
                    <h6 className='col-md-2 onDutyTextCenter'>Date</h6>
                    <h6 className='col-md-2 onDutyTextCenter'>Start Time</h6>
                    <h6 className='col-md-2 onDutyTextCenter'>End Time</h6>
                    <h6 className='col-md-6 onDutyTextCenter'>Assignment</h6>
                  </div>
                  <div className='row onDutyCardBorder'>
                    <div className='col-md-12 p-0'>
                      <div className='row'>
                        <h6 className='col-md-2 onDutyViewCard'>{onDutyLeaveDetails.Name}</h6>
                        <h6 className='col-md-2 onDutyViewCard'>{dateFormat(new Date(`10-12-2020 ${onDutyLeaveDetails.StartTime}`),'hh:MM TT')}</h6>
                        <h6 className='col-md-2 onDutyViewCard'>{dateFormat(new Date(`10-12-2020 ${onDutyLeaveDetails.EndTime}`),'hh:MM TT')}</h6>
                        <h6 className='col-md-6 onDutyViewCardAssignment'>{onDutyLeaveDetails.Assignment}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                <div className='float-right'>
                  <button className='empContentReject' onClick={() => this.closePop(onDutyLeaveDetails.EmpLeaveId, 'Rejected')}>Reject</button>
                  <button className='empContentApprove' onClick={() => this.closePop(onDutyLeaveDetails.EmpLeaveId, 'Approved')}>Approve</button>
                </div>
            </div>
          </Dialog>
        }



      </div>
    );
  };
}

OnDutyList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default OnDutyList;