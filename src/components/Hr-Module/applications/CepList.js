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

class CepList extends React.Component {
  state = {
    cepLeaveDetails: null,
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
        name: 'TotalDaysofLeave',
        options: {
          filter: true,
          sort: false,
        }
      },
      {
        label: <span className='font-weight-bold'>Course Name</span>,
        name: 'CourseName',
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
    Axios.get('http://54.198.55.249:8159/api/v1/leavecepdetails')
      .then(res => this.setState({
        data: res.data.data
      })
      );

  };

  handleRowClick = (event, record) => {
    const { data } = this.state;
    const any = data.find((p, i) => i == record.rowIndex)
    // console.log(any, "anysdfjk");
    this.getCepLeaveDetails(any.EmpLeaveId)
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


  getCepLeaveDetails = (EmpLeaveId) => {
    Axios({
      method: 'POST',
      url: apiurl + '/viewleavecepdetails',
      data: {
        empleaveId: EmpLeaveId
      }
    }).then((response) => {
      // console.log(response.data.data,'mysdfksdfu')
      this.setState({ cepLeaveDetails: response.data.data[0] })
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
    const { cepLeaveDetails } = this.state;
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
          cepLeaveDetails !== null &&
          <Dialog
            open={open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth={true}
          >
            <DialogTitle id="alert-dialog-title" className={'employeeContentTitle'}>
              {'Leave Application CEP'}
              <span className='empContentClose'><CloseIcon onClick={() => this.setState({ open: false })} /></span>
            </DialogTitle>
            <div className='employeeContentContainerCep'>
              <div className='row'>
                <div className='col-md-5 mb-2'>
                  <div className='mr-2'><span className='employeeContentLabel'>Employee Name: </span> {cepLeaveDetails.Name}</div>
                </div>
                <div className='col-md-4  mb-2'>
                  <div className='mr-2'><span className='employeeContentLabel'>No of Exams Days: </span>{cepLeaveDetails.ExamDays}</div>
                </div>
                <div className='col-md-3  mb-2'>
                  <div><span className='employeeContentLabel'>No of others Days: </span> {cepLeaveDetails.NumberOfOtherDays}</div>
                </div>
                <div className='col-md-12  mb-2'>
                  <div><span className='employeeContentLabel'>Address and Phone Number: </span> {cepLeaveDetails.Address}</div>
                </div>
                <div className='col-md-12  mb-2'>
                  <div><span className='employeeContentLabel'>Exam Schedule(Pdf/Image File): </span> {cepLeaveDetails.Examschedule}</div>
                </div>
                {
                  cepLeaveDetails.Subject.length > 0 &&
                  <div className='col-md-6'>
                    <div className='card'>
                      <div className='card-body'>
                        {
                          cepLeaveDetails.Subject.map((val) => {
                            return (
                              <>
                                <div className='cepCardFlex'>
                                  <h6 className='cepHeaderColor'>Subject Name</h6>
                                  <h6 className='cepHeaderColor'>Date</h6>
                                </div>
                                <div className='cepCardFlex'>
                                  <p>{val.Subname}</p>
                                  <p>{val.Examdate}</p>
                                </div>
                              </>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                }
                <div className='col-md-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='cepCardFlex'>
                        <h6 className='cepHeaderColor'>Date</h6>
                        <h6 className='cepHeaderColor'>Ref</h6>
                      </div>
                      <div className='cepCardFlex'>
                        <p>{cepLeaveDetails.priorDate}</p>
                        <p>{cepLeaveDetails.priorRef}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='float-right'>
                <button className='empContentReject' onClick={() => this.closePop(cepLeaveDetails.EmpLeaveId, 'Rejected')}>Reject</button>
                <button className='empContentApprove' onClick={() => this.closePop(cepLeaveDetails.EmpLeaveId, 'Approved')}>Approve</button>
              </div>
            </div>
          </Dialog>
        }

      </div>
    );
  };
}

CepList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default CepList;