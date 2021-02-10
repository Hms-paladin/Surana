import React from "react";
import { Modal, Button } from "antd";
import '../NewCase/NewCaseTable/viewmodel.css';
import axios from 'axios';
import { apiurl } from "../../../App";
import StarIcon from '@material-ui/icons/Star';
import {AiFillCaretLeft} from "react-icons/ai"
import {AiFillCaretRight} from "react-icons/ai"
import {RiDownloadLine} from "react-icons/ri"
import FileNotFound from '../../../images/FileNotFound.png'

import { Spin } from 'antd';
import "../NewCase/CaseresultTable/CaseresultTable.css"
class ResultView extends React.Component {
  state = { 
    visible: this.props.modalopen,
  fileView:"",
  star:"",
  favourite:"",
 };
 

componentDidMount(){
  
axios({
  method: 'post',
  url: apiurl+'/getcaseResult',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  data: {
   "caseId":this.props.caseId,
   
  }
}).then((response) => {
console.log(response.data.data[0].Case_file_name,response.data.data[0].cas_fav,"vbmcvbfkjghkfhit")
this.setState({
  fileView:response.data.data[0].Case_file_name,
  star:response.data.data[0].cas_fav
})
}).catch((error) => {
  console.log(error)
})

 }



 

  handleCancel = (e) => {
    this.props.onclickok && this.props.onclickok();
  };

  clickStar =(e)=>{
    console.log(this.state.star,"cbxbcmbcmxbmv")
            // this.setState({star: 1})
          if(this.state.star==null){
            this.setState({star:0})
          }
           if(this.state.star==0 ){
            console.log(this.state.star,"cbxbcmbcmxbmv")

            axios({
                method: 'post',
                url: apiurl+'/addfavourite',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                  "caseId":this.props.caseId,
                  
                 }
                
            }).then((response) => {
             console.log(response,"vbmcvbfkjghkfhit")
             if(response.data.status==0){
               this.props.generateAlert("Added To Important")
               this.setState({star:1})
             }
               
            }).catch((error) => {
                console.log(error)
            })
           }
           if(this.state.star==1) {
            axios({
              method: 'post',
              url: apiurl+'/removefavresult',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              data: {
                "case_id":this.props.caseId,
                
               }
              
          }).then((response) => {
           console.log(response,"vbmcvbfkjghkfhit")
           if(response.data.status==0){
             this.props.generateAlert("Removed From Important")
             this.setState({star:0})
           }
             
          }).catch((error) => {
              console.log(error)
          })
           }
         
              
            
        }
        

  render() {
    console.log(this.state.favourite,this.state.star,"emptyempty");
    return (
      <div>
         <Modal
          title="Councel Details"
          visible={this.state.visible}
          onOk={this.props.onclickok}
          onCancel={this.handleCancel}
          className={this.props.modelclassName}
          // cancelText= 'No'
          // okText= 'Yes'
          // okType= 'danger'
        >
           
<div className ="image_icons_div mt-2">
  
               <div className ="case_image_part">
                    <div className ="court_img_div">
                    {this.state.fileView=="" || this.state.fileView==null ? 
                    <div className="wrap_empty">
                    <img 
                    src={FileNotFound}   />
                    <div className="content_empty">File Not Found!</div>
                    </div> :  
                    <iframe 
                        src={this.state.fileView=="" || this.state.fileView==null ? <img src={FileNotFound}/> : this.state.fileView} 
                        className ="court_img_align"/>
                    }
                    </div>
                    {/* <div  className ="court_navigatenext_div">
                    <AiFillCaretLeft className="arrow_edit_caseresult"/><h4 className="four_edit_caseresult">4</h4><AiFillCaretRight className="arrow_edit_caseresult"/>
                    </div> */}
               </div>
            
               <div className ="case_download_icon">
                   {/* {this.state.favourite==1 ? } */}
               <StarIcon className ={this.state.star==1 ? "star_icon_color_caseresult":"star_icon_align_caseresult"} onClick={this.clickStar}/>
               <a href ={this.state.fileView} download={this.state.fileView}>
               <RiDownloadLine className ="star_icon_align_caseresult"/>
               </a>
               </div>

           </div>
        </Modal>
      </div>
    );
  }
}

export default ResultView;
