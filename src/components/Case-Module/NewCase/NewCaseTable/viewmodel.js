import React from "react";
import { Modal, Button, notification} from "antd";
import "./viewmodel.css";
import Oppositeparty from "../ResultView";
import "../Case.css";
import { apiurl } from "../../../../App";
import OppositeModal from '../NewCaseTable/OppositeModal'
import Calenderbox from "../../../../formcomponent/calenderbox";
import CouncelView from './CouncelView'
import DDRAhistory from '../DDRAhistory'
import DatePickerMui from "../../../../formcomponent/DatePickerMUI";
import dateFormat from 'dateformat';


const axios = require('axios');
class Modalreact extends React.Component {
  state = {
    visible: this.props.modalopen,
    OppositeParty: false,
    visibles:this.props.modalopen,
    CounselDetails: false,
    viewdata:"",
    viewdataCouncel:"",
    viewdataDRA:"",
    OppositeDataView:"",
    CouncelDataView:"",
    DRAviewData:'',
    viewmodel:false,
    viewmodelCouncel:false,
    councelModal:false,
    draModal:false,
    type: "",
    title: "",
    DRAhistory: false,
    DDRAhistory: false,
    phyBundleDate:"",
    viewmodel:false,
  };
  
  // setviemodelfalse=()=>{
  //   this.setState({
  //     viewmodel:false,
  //     councelModal:false,
  //     draModal:false,
  //   })
  // }
 





  viewOpposite=(data)=>{
    // this.getcaseDataView(data.id);
    
    console.log(data,"comein")
    axios({
      method: 'post',
      url: apiurl+'/viewopposiepartydetails',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      data: {
        caseId:this.props.caseId
      }
  }).then((response) => {
    let  viewOpp=[]
    viewOpp = response.data.data[0]
           console.log(response.data)
      this.setState({
        viewdata:data,
        viewmodel:true,
        OppositeDataView:viewOpp
        // caseDataView:response.data.data.filter((alldata)=>{return alldata.caseId===data.id })[0]
      })
     
  }).catch((error) => {
      console.log(error)
  })
    console.log(data)
    
  }


  ViewCouncel=(data)=>{
    // this.getcaseDataView(data.id);
    
    console.log(data,"comein")
    axios({
      method: 'post',
      url: apiurl+'/viewcounseldetails',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      data: {
        caseId:this.props.caseId
      }
  }).then((response) => {
    let  viewCoun=[]
    viewCoun = response.data.data[0]
           console.log(response.data)
      this.setState({
        viewdataCouncel:data,
        councelModal:true,
        CouncelDataView:viewCoun
       
      })
     
  }).catch((error) => {
      console.log(error)
  })
    console.log(data)
    
  }

  viewDRA=(data)=>{
    // this.getcaseDataView(data.id);
    
  //  alert(this.props.caseId)
    axios({
      method: 'post',
      url: apiurl+'/viewDRAhistory',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      data: {
        caseId:this.props.caseId
      }
  }).then((response) => {
    let  viewdraHistory=[]
    viewdraHistory = response.data.data[0]
           console.log(response.data,"dlfksdffsdsa")
      this.setState({
        viewdataDRA:data,
        draModal:true,
        DRAviewData:viewdraHistory
        
      })
     
  }).catch((error) => {
      console.log(error)
  })
    console.log(data)
    
  }


  
  showModal = () => {
 
    this.props.onclickok && this.props.onclickok();
    console.log("empty");
  };
  handleCancel = (e) => {
  
    this.props.onclickok && this.props.onclickok();
  };

  movedOnDate = (data) => {
    console.log(data,"fooewkrjtj")
   this.state.phyBundleDate=data
   this.setState({})
  
    }

   
    generateAlert = (description) => {
      notification.success({
        message: "Success",
        description,
        onClick: () => {
          console.log("Notification Clicked!");
        },
      });
    };

    setviemodelfalse=()=>{
      // alert("got it")
       this.props.onclickok && this.props.onclickok();
     
      if(this.state.viewmodel== false && this.state.phyBundleDate !==""){
      
        axios({
          method: 'post',
          url: apiurl+'/Physicalbundlemoveon',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          data: {
            caseId:this.props.caseId,
            Moveddate:this.state.phyBundleDate
          }
      }).then((response) => {
        console.log(response,"fooewkrjtj")
        if(response.data.status==1){
          this.generateAlert("Physical Bundle Moved On Date Updated")
          this.setState({
            viewmodel:false
          }) 
        }
        
      }).catch((error) => {
          console.log(error)
      })
        } 
        this.setState({
          viewmodel:false
        }) 
    }
    
    

  render() {
    return (
      <div className="popup_width">
      
        <Modal
          title="Employee Master View"
          visible={this.state.visible}
          onOk={this.setviemodelfalse}
          onCancel={this.handleCancel}
          className={"simple_class"}
        >
         

          <div className="row">
            <div className={"textcontainermodel1 col-lg-3 col-md-12 col-sm-12"}>
              <div className="">
                <div className="details">
                  <div className="row">
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">Case type:</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label className="details_ticket">
                          {this.props.caseDataView.CaseTypeName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">
                            Internal Case no:
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label className="details_ticket">
                          {this.props.caseDataView.InternalCaseNo}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">Court Name:</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label className="details_ticket">
                          {this.props.caseDataView.CourtName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">Case no:</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label className="details_ticket">
                          {this.props.caseDataView.CaseNo}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">City:</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label className="details_ticket">
                          {this.props.caseDataView.CityName}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div>
                        <label>
                          <span className="case-details">Opposite Party:</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div>
                        <label  onClick={() =>
                              this.viewOpposite()
                            } className="details_ticket   subreply_link">
                           
                            {this.props.caseDataView.opposite[0].Name}
                        </label>
                      </div>
                      {this.state.viewmodel?
          <OppositeModal modalopen={true}
          onclickok={this.setviemodelfalse}
          viewdataCouncel={this.state.viewdataCouncel}
          OppositeDataView={this.state.OppositeDataView}
          modelclassName={"nonebtnmodelknowledge"}
          />
          :null}
                   
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
           
            <div className="col-lg-1 col-md-12 col-sm-12">
              <div className="details">
                <div className="row">
                  <div className="col-md-1">
                    <div className="vertical_line-case"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="details">
                <div className="row">
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Outside Counsel:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {this.props.caseDataView.counsel[0].Name}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">DRA:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label  onClick={() =>this.viewDRA()} className="details_ticket subreply_link">
                        {this.props.caseDataView.DRA}
                      </label>
                    </div>
                  </div>
                  {this.state.draModal?
          <DDRAhistory modalopen={true}
          onclickok={this.setviemodelfalse}
          viewdataDRA={this.state.viewdataDRA}
          DRAviewData={this.state.DRAviewData}
          modelclassName={"nonebtnmodelknowledge"}
          />
          :null}
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">DDRA:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                       {this.props.caseDataView.DDRA1}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Due Date:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {this.props.caseDataView.DueDate}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Counsel:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <div onClick={() =>
                              this.ViewCouncel()
                            } className="details_ticket   subreply_link">
                        {this.props.caseDataView.counsel[0].Name}
                      </div>
                    </div>
                  </div>
                  {this.state.councelModal?
          <CouncelView modalopen={true}
          onclickok={this.setviemodelfalse}
          viewdata={this.state.viewdata}
          CouncelDataView={this.state.CouncelDataView}
          modelclassName={"nonebtnmodelknowledge"}
          />
          :null}
                </div>
              </div>
            </div>
            <div className="col-lg-1 col-md-12 col-sm-12">
              <div className="details">
                <div className="row">
                  <div className="col-md-1">
                    <div className="vertical_line-case"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12">
              <div className="details">
                <div className="row">
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Adjournment taken:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {this.props.caseDataView.AdjournmentTaken}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Adjournment Date:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {dateFormat(this.props.caseDataView.AdjournmentDate,"dd-mm-yyyy")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">No of Adjournment:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {this.props.caseDataView.NoOfAdjournment}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Details:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket dtails">
                        {this.props.caseDataView.Details}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Disposal Number:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div>
                      <label className="details_ticket">
                        {this.props.caseDataView.DisposalNo}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div>
                      <label>
                        <span className="case-details">Physical Bundle move on:</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5">
                       
                    {this.props.caseDataView.Physicalbundle == null ?  
                        <div className="phyBundleDate">    
                      <DatePickerMui
                        value={this.state.phyBundleDate}
                        changeData={(data) =>this.movedOnDate(data)}
                        />  </div>:
                        <label className="details_ticket">  {dateFormat(this.props.caseDataView.Physicalbundle,"dd-mm-yyyy")} </label>
                  }
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Modalreact;
