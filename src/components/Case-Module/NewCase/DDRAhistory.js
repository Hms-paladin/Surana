import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Case.css";
import { Modal } from "antd";

class DDRAhistory extends React.Component {
  state = { visible: this.props.modalopen };

  showModal = () => {
    this.props.onclickok && this.props.onclickok();
  };

  handleCancel = (e) => {
    this.props.onclickok && this.props.onclickok();
  };
  render() {
    console.log(this.props,"fdlkjgjdfljglfjldjf")
    return (
      <React.Fragment>
        <Modal
          title="DRA History"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          // cancelText= 'No'
          // okText= 'Yes'
          // okType= 'danger'
        >

        <div className="emp_table_name_div">
          <div>
            <p className="">
              Employee Name:{this.props.DRAviewData.EmployeeName  && this.props.DRAviewData.EmployeeName}
            </p>
          </div>

          <Table
            size="small"
            className="dra_table"
            component={Paper}
            aria-label="a dense table"
            className="tcs"
          >
            <TableHead>
              <TableRow>
                <TableCell className="table_head" align="center">
                  Case
                </TableCell>
                <TableCell className="table_head" align="center">
                  Client Name
                </TableCell>
                <TableCell className="table_head" align="center">
                  From
                </TableCell>
                <TableCell className="table_head" align="center">
                  To
                </TableCell>
                <TableCell className="table_head" align="center">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" align="center" scope="row">
                  os
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.ClientName  && this.props.DRAviewData.ClientName}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Fromdate  && this.props.DRAviewData.Fromdate}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Todate  && this.props.DRAviewData.Todate}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Status  && this.props.DRAviewData.Status == 1 ? "Open" : "Closed"}
                </TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell component="th" align="center" scope="row">
                  {this.props.DRAviewData.caseId}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.ClientName}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Fromdate}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Todate}
                </TableCell>
                <TableCell align="center">
                  {this.props.DRAviewData.Status}
                </TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </div>
        </Modal>
      </React.Fragment>
    );
  }
}
export default DDRAhistory;



// import React from "react";
// import { Modal, Button } from "antd";
// import './NewCaseTable/viewmodel.css';

// class DDRAhistory extends React.Component {
//   state = { visible: this.props.modalopen };

//   showModal = () => {
//     this.props.onclickok && this.props.onclickok();
//   };

//   // handleOk = e => {
//   //   console.log(e);
//   // this.setState({
//   //   visible: false,
//   // });
//   // };

//   handleCancel = (e) => {
//     this.props.onclickok && this.props.onclickok();
//   };

//   render() {
//     console.log(this.props.DRAviewData, "DRAviewData");
//     return (
//       <div>
//         {/* <Button type="primary" onClick={this.showModal}>
//           Open Modal
//         </Button> */}
//         <Modal
//           title="VIEW"
//           visible={this.state.visible}
//           onOk={this.props.onclickok}
//           onCancel={this.handleCancel}
//           className={this.props.modelclassName}
//           // cancelText= 'No'
//           // okText= 'Yes'
//           // okType= 'danger'
//         >
//           <div className={"textcontainermodel"}>
//             <div className="d-flex">
//               <div className="titlekey">
//                 <div>Name</div>
//                 <div>Email</div>
//                 <div>Phone</div>
//                 <div>Address</div>
//               </div>

//               <div className="d-flex titlevalue">
//                 <div>
//                   <div>:</div>
//                   <div>:</div>
//                   <div>:</div>
//                   <div>:</div>
//                 </div>
//                 <div>
//                   <div>{this.props.DRAviewData && this.props.DRAviewData.EmployeeName}</div>
//                   <div>{this.props.DRAviewData && this.props.DRAviewData.ClientName}</div>
//                   <div>{this.props.DRAviewData && this.props.DRAviewData.Fromdate}</div>
//                   <div>{this.props.DRAviewData && this.props.DRAviewData.Todate}</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default DDRAhistory;