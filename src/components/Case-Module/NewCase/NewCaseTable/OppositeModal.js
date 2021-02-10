// import React from "react"
// import { Modal, Button } from 'antd';
// import "./viewmodel.css"
// import { Spin, Space } from 'antd';
// import { connect } from 'react-redux';
// import Casedetails from "../Casedetails";
// import CaseresultView from '../CaseresultTable/CaseresultView'
// class ResultView extends React.Component {
//   state = { visible: this.props.modalopen };
// //   componentDidMount() {
// //     console.log("getEmpDetails", this.props.employeeDetails)
// // }

// showModal = () => {
//   this.props.onclickok&&this.props.onclickok()
//   console.log("empty")
// };
//   handleCancel = e => {
//     this.props.onclickok&&this.props.onclickok()
//   };

//   render() {
//     // console.log(this.props.employeeOfficial,"employeemaster")
//     // let {EmpFirstName,EmpLastName,EmpDOB,EmpId,EmpAge,EmailId,EmpGender,
//     //   EmpQualification,EmpSecondaryContact,EmpOfficialMobile,EmpDOJ,EmpBankName,EmpBranchName,EmpAccountNumber,EmpIFSCCode,EmpOfficialEmail,EmpPersEmail}=this.props.employeeOfficial && this.props.employeeOfficial
//     // console.log(this.props,"bla bla")
//     return (
//       <div>
//         {/* <Button type="primary" onClick={this.showModal}>
//           Open Modal
//         </Button> */}
//         <Modal
//           title="sirrrrrrr"
//           visible={this.state.visible}
//           onOk={this.props.onclickok}
//           onCancel={this.handleCancel}
//           className={this.props.modelclassName}

//         >

// <div className="d-flex">

//       <div className="titlekey">
//         <div>Name</div>
//         <div>Email</div>
//         <div>Phone</div>
//         <div>Address</div>
//       </div>

//       <div className="d-flex titlevalue">
//       <div>
//         <div>:</div>
//         <div>:</div>
//         <div>:</div>
//         <div>:</div>
//       </div>
//       <div>
//         <div>{this.props.viewdata.Name}</div>
//         <div>{this.props.viewdata.Email}</div>
//         <div>{this.props.viewdata.phone}</div>
//         <div>{this.props.viewdata.Address}</div>
//       </div>
//       </div>

//     </div>
//           {/* <CaseresultView/> */}
//         </Modal>
//       </div>
//     );
//   }
// }

// export default ResultView;
import React from "react";
import { Modal, Button } from "antd";
import "./viewmodel.css";

class OppositeModal extends React.Component {
  state = { visible: this.props.modalopen };

  showModal = () => {
    this.props.onclickok && this.props.onclickok();
  };

  // handleOk = e => {
  //   console.log(e);
  // this.setState({
  //   visible: false,
  // });
  // };

  handleCancel = (e) => {
    this.props.onclickok && this.props.onclickok();
  };

  render() {
    console.log(this.props.viewdata, "viewdata");
    return (
      <div>
        {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
        <Modal
          title="Opposite party Details"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          // cancelText= 'No'
          // okText= 'Yes'
          // okType= 'danger'
        >
          <div className={"textcontainermodel"}>
            <div className="d-flex">
              <div className="titlekey">
                <div>Name</div>
                <div>Email</div>
                <div>Phone</div>
                <div>Address</div>
              </div>

              <div className="d-flex titlevalue">
                <div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <div>{this.props.OppositeDataView.Name}</div>
                  <div>{this.props.OppositeDataView.Email}</div>
                  <div>{this.props.OppositeDataView.phone}</div>
                  <div>{this.props.OppositeDataView.Address}</div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default OppositeModal;
