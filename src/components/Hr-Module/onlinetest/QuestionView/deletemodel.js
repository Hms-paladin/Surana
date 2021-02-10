import React from "react"
import { Modal, notification } from 'antd';
import "./QuestionView.css"
import axios from 'axios';
import { apiurl } from "../../../../App"

class Deletemodal extends React.Component {
  state = { visible: true };


  // showModal = () => {
  //   // this.props.deleterow && this.props.deleterow()
  // };
  
  handleCancel = (e) => {
    this.setState({
        visible:false
    })
  };

  generateAlert = (description) => {
    notification.success({
        message: 'Success',
        description,
        onClick: () => {
          console.log('Notification Clicked!');
          
        },
      });
}

  deleterow = () => {
      this.setState({ props_loading: true })
      var self = this
      axios({
          method: 'delete',
          url: apiurl + '/removeInterviewquestion',
          data: {
              "QuesId": this.props.deleteQues,
          }
      }).then((response) =>{
             console.log(response,"sdkjnkdsf")
             if(response.data.status==0){
             this.props.closemodal()
             this.props.getAvailableQuestions()
             this.generateAlert("Question Deleted Successfully")
             }
             if(response.data.status==1){
              this.props.closemodal()
              this.props.getAvailableQuestions()
              this.generateAlert("Question Cannot Be Deleted")
              }
          })
        
    }

  render() {
    console.log(this.props.viewdata,"viewdata")
    return (
      <div className="delmodelwidth">
        <Modal
          title="Delete"
          visible={this.state.visible}
          onOk={this.deleterow}
          onCancel={this.props.closemodal}
          cancelText= 'No'
          okText= 'Yes'
          okType= 'danger'
          className="delmodelwidth"
        >
          <div className={"textcontainermodel"}>
          <p>Are you sure do you want delete?</p>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Deletemodal;