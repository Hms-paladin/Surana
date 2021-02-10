import React from 'react';
import Axios from 'axios';
import MUIDataTable from 'mui-datatables-bitozen';
import PropTypes from 'prop-types';
import brand from './brand';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
import { apiurl } from '../../../App';
import './Application.css';


class Permissiontable extends React.Component {
  state = {
    data: [],
    changeData: [],
    edit: [],
    PName: '',
    PPermOnDate: '',
    PStartTime: '',
    PEndTime: '',
    PPermissionHours: '',
    Preason: '',
    Pcontact: '',
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
      //   label: 'Date',
      //   name: 'PermOnDate',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },
      // {
      //   label: 'Start Time',
      //   name: 'StartTime',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },
      // {
      //   label: 'End Time',
      //   name: 'EndTime',
      //   options: {
      //     filter: true,
      //     sort: false,
      //   }
      // },
      {
        label: <span className='font-weight-bold'>Permission Hours</span>,
        name: 'PermissionHours',
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
    this.getPermissionDetails();

  }
  //   componentWillUpdate() {
  //     this.abc();
  // }
  getPermissionDetails = () => {
    Axios.get('http://54.198.55.249:8159/api/v1/permissiondetails')
      .then(res => this.setState({
        data: res.data.data
      })
      );
  };
  handleRowClick = (event, record) => {
    const { data, PName, PPermOnDate, PStartTime, PEndTime, PPermissionHours, Preason, Pcontact, PEmpLeaveId } = this.state;
    const any = data.find((p, i) => i == record.rowIndex)
    console.log(any)
    this.setState({
      edit: any,
      PName: any.Name,
      PPermOnDate: any.PermOnDate,
      PStartTime: any.StartTime,
      PEndTime: any.EndTime,
      PPermissionHours: any.PermissionHours,
      // Preason:any.reason,
      // Pcontact:any.contact,
      PEmpLeaveId: any.EmpLeaveId
    })
    this.setState({
      open: true
    });

  }
  handleEdit = (event) => {
    const { PName, PPermOnDate, PStartTime, PEndTime, PPermissionHours, PEmpLeaveId } = this.state;
    console.log('editname', PName)
    console.log('editdate', PPermOnDate)
    console.log('editstarttime', PStartTime)
    console.log('editendtime', PEndTime)
    console.log('edithour', PPermissionHours)
    //  console.log ('editreason',Preason )
    //  console.log ('editcontact',Pcontact )
    console.log('editEmpLeaveId', PEmpLeaveId)

    const editper = {
      leaveId: '4',
      permavailed: '5',
      permondate: PPermOnDate,
      startTime: PStartTime,
      endTime: PEndTime,
      permissionrequested: PPermissionHours,
      // reason:'sick',
      //  contact:'9874563210',
      empId: PName,
      empleaveId: PEmpLeaveId


    }
    Axios.put('http://54.198.55.249:8159/api/v1/updatepermission', editper, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.data.status === "Permission Updated") {
          this.setState({ open: true, msg: res.data.msg }, () => {
            setTimeout(() => {
              //this.handleEdit();
              this.props.history.push("http://localhost:3000/surana/?/Home/Leave")
            }, 50)
          })
        }
        else {
          this.setState({ open: true, msg: res.data.msg }, () => {
            setTimeout(() => {
              this.setState({ open: false })
            }, 50)
          })
        }
      });
  }
  handleOpen = (event, record) => {
    const { data } = this.state;
    const any = data.find((p, i) => i == record.rowIndex)
    console.log(data);
    sessionStorage.setItem("deleteRow", JSON.stringify(data));
    this.setState({ open: true });
  };

  handleDelete = (event) => {
    const result = JSON.parse(sessionStorage.getItem("deleteRow"));
    console.log(result);
    Axios.delete('http://54.198.55.249:8159/api/v1/deletepermission')
      .then(Response => Response.data)
      .then(res => res).then(data => {
        this.setState({ setOpen: true });
        this.fetch();
        console.log('data deleted');

      })
  }
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
      this.getPermissionDetails()
    }).catch((error) => {
      this.setState({ open: false });
      console.log(error)
    })
  };

  render() {
    const { PName, PPermOnDate, PStartTime, PEndTime, PPermissionHours, PEmpLeaveId } = this.state;
    const title = brand.name + ' - Users';
    const description = brand.desc;
    const { data, open, columns, setOpen,
      loading, rowsPerPage, page, width,
      style, edit } = this.state;
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
              {'Permission Application'}
              <span className='empContentClose'><CloseIcon onClick={() => this.setState({ open: false })} /></span>
            </DialogTitle>
            <div className='employeeContentContainer'>
              <div className='employeeContent'>
                <div className='mr-2'><span className='employeeContentLabel'>Employee Name: </span> {edit.Name}</div>
                <div className='mr-2'><span className='employeeContentLabel'>State Time: </span>{edit.StartTime}</div>
                <div className='mr-2'><span className='employeeContentLabel'>End Time: </span> {edit.EndTime}</div>
              </div>
              <div className='employeeContentBottom employeeContentBottomPermission'>
                <div className='mb-2'><span className='employeeContentLabel'>Reason: </span>{edit.Reason !== "undefined" ? edit.Reason : '-'}</div>
                <div className='mb-2'><span className='employeeContentLabel'>Emergency Contact Number: </span>{edit.EmergencyContact !== "undefined" ? edit.EmergencyContact : '-'}</div>
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

Permissiontable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default Permissiontable;


