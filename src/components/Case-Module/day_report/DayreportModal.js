import React from 'react';
import { Grid } from '@material-ui/core';
import Textareaantd from '../../../formcomponent/textareaantd'
import { Modal, Calendar } from 'antd';
import Oppositeparty from './Oppositepartymodal';
import Counselmodal from './Counselmodal';
import DRAhistory from './DRAhistoryModal';
import Calenderbox from '../../../formcomponent/calenderbox';
import OppositeModal from '../NewCase/NewCaseTable/OppositeModal';
import { apiurl } from "../../../App";
import CouncelView from '../NewCase/NewCaseTable/CouncelView';
import DDRAhistory from '../NewCase/DDRAhistory';

const axios = require('axios');
class DayreportModal extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          
            OppositeParty: false,
            CounselDetails:false,
         
            type:'',
            title:'',
            visible:false,
            DRAhistory:false,
            viewmodel:false,
            viewdataCouncel:"",
            viewdataDRA:"",
            OppositeDataView:"",
            CouncelDataView:"",
            DRAviewData:'',
            viewmodel:false,
            viewmodelCouncel:false,
            councelModal:false,
            draModal:false,
            DRAhistory: false,
            DDRAhistory: false,
        }
    }
    setviemodelfalse=()=>{
        this.setState({
          viewmodel:false,
          councelModal:false,
          draModal:false,
        })
      }
     
    handleClickOpen=(s,title)=>
    {
      console.log("type",title,s)
      this.setState({
        type:s,
        title
      })
      this.setState({OppositeParty:true,CounselDetails:true,visible:true,DRAhistory:true})
    
    }  
    handleOk = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }; 

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
            caseId:this.props.dayReportData.caseId
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
            caseId:this.props.dayReportData.caseId
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
            caseId:this.props.dayReportData.caseId
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

    render(){
        console.log(this.props.dayReportData,"dayReportData")
        console.log(this.props.dayCounselData,"dayCounselData")
        console.log(this.props.dayOppositeData,"dayOppositeData")
        return(
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
                          {this.props.dayReportData.CaseTypeName}
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
                          {this.props.dayReportData.InternalCaseNo}
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
                          {this.props.dayReportData.CourtName}
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
                          {this.props.dayReportData.CaseNo}
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
                          {this.props.dayReportData.CityName}
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
                        <label  onClick={() => this.viewOpposite("opposite_party")} className="details_ticket   subreply_link">
                           
                      {this.props.dayOppositeData && this.props.dayOppositeData[0].Name}
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
              {/* <Modal
                            className="casedetails_modal"
                            footer={null}
                            visible={this.state.visibles}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}>
                             
                                    
                        </Modal> */}
            </div>
            {/* <div className="row">
                  <div classname=" col-md-7 ">
                    <div className="vertical_line-case">
                      </div>
                  </div>

                  </div> */}
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
                        {this.props.dayCounselData && this.props.dayCounselData[0].Name}
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
                      <label  onClick={() => this.viewDRA("dra_history")} className="details_ticket subreply_link">
                      {this.props.dayReportData.DRA}
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
                       {this.props.dayReportData.DDRA1}
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
                        {this.props.dayReportData.DueDate}
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
                      <label onClick={() => this.ViewCouncel("counsel_details")} className="details_ticket   subreply_link">
                     {this.props.dayCounselData && this.props.dayCounselData[0].Name}
                      </label>
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
                        {this.props.dayReportData.AdjournmentTaken}
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
                        {this.props.dayReportData.AdjournmentDate}
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
                        {this.props.dayReportData.NoOfAdjournment}
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
                      <label className="details_ticket">
                        {this.props.dayReportData.Details}
                      </label>
                    </div>
                  </div>
              
                </div>
              </div>
            </div>
          </div>
        )
    }
}
export default DayreportModal;






/* <React.Fragment>
          
<Grid container spacing={1}>
    <Grid item md={4} sm={12} className="dayreportmodal_border">
        <div className="dayreportmodal_option">
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Case Type</div>
                    <div >:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">OS</div>
            </div>
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Internal Case no</div>
                    <div >:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">OS/231/2020</div>
            </div>
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Court name</div>
                    <div className="ml-1">:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">Madras high court</div>
            </div>
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Case no</div>
                    <div >:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">1-C-11 in 436-11</div>
            </div>
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >City</div>
                    <div >:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">Chennai</div>
            </div>
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Opposite Party</div>
                    <div >:</div>
                </div>
                <div className="dayreportmodal_subreply_link ml-2" onClick={() => this.handleClickOpen("opposite_party")}>
                    Ranjith&co
                    {/* <Textareaantd className={"w-100"}/> */
    //             </div>
    //         </div>                                   
    //     </div>
    // </Grid>
    // <Grid item md={4} sm={12} className="dayreportmodal_border">
    //     <div className="dayreportmodal_option">
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Outside Counsel</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply ml-2">Vinay</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >DRA</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply_dra ml-2" onClick={() => this.handleClickOpen("dra_history")}>Rajesh</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >DDRA</div>
    //                 <div className="ml-1">:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply_dra ml-2">Kumar,Suresh</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Due Date</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply ml-2">12 Feb 2020</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Counsel</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply_link ml-2" onClick={() => this.handleClickOpen("counsel_details")} >
    //                 Krishna
    //             </div>
    //         </div>                                   
    //     </div>
    // </Grid>
    // <Grid item md={4} sm={12}>
    //     <div className="dayreportmodal_option">
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Adjournment Taken</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply ml-2">Yes</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Adjournment Date</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply ml-2">12 Feb 2020</div>
    //         </div>
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >No.of Adjournment</div>
    //                 <div className="ml-1">:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply ml-2">03</div>
    //         </div>                                    
    //         <div className="dayreportmodal_optiontype">
    //             <div className="dayreportmodal_suboption">
    //                 <div >Details</div>
    //                 <div >:</div>
    //             </div>
    //             <div className="dayreportmodal_subreply_details ml-2">
            //         {/* <Textareaantd className={"w-100"}/> */}
            //     </div>
            // </div>  
            /* <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div >Disposal Number</div>
                    <div className="ml-1">:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">123456789</div>
            </div>         
            <div className="dayreportmodal_optiontype">
                <div className="dayreportmodal_suboption">
                    <div>Physical Bundle move on </div>
                    <div className="ml-1">:</div>
                </div>
                <div className="dayreportmodal_subreply ml-2">
                    <Calenderbox/>
                </div>
            </div>                                           */
//         </div>
//     </Grid>
// </Grid>
// <Modal
//     className="dayreportmodal_modal"
//     footer={null}
//     visible={this.state.visible}
//     onOk={this.handleOk}
//     onCancel={this.handleCancel}>
//         {this.state.type === "opposite_party" && <Oppositeparty/> || this.state.type=== "counsel_details" && <Counselmodal /> || this.state.type === "dra_history" && <DRAhistory/>}
            
// </Modal>

// </React.Fragment> */}