import React from "react";
import tableschema from './TradeMarkDetailsSchema.json';
import TradeMarkDetailstable from './DynTable'
// import "./previewresume.css"
import { apiurl } from "../../../App";
import { Modal } from 'antd'
import { Input,Button } from 'antd';
import Modalreact from "../../../table/viewmodel";
import "./projectdetails.css"
import {Redirect} from "react-router-dom";
import moment from 'moment'

const axios = require('axios');

class TradeMarkDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      userdata: null,
      edituserdata: null,
      usertabledata: [],
      edit: null,
      modalShow: false,
      modalShowsms: false,
    };
  }
  setModalShow = (e) => {
    this.setState({
      modalShow: e
    })
  }
  setModalShowsms = (e) => {
    this.setState({
      modalShowsms: e
    })
  }

  changeDynamic = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  componentDidMount() {
    var self = this
    axios({
      method: 'get',
      url: apiurl + "/viewtrademark",
    })
      .then(function (response) {
        var usertabledata = []
        var allusertabledata = []
        var domesticId = []
        var internationalId = []
        var filedId = []
        var defendedId = []
        var designAppInter = []
        var designAppDomestic = []
        var designRectDef = []
        var designRectFil = []
        var designCanFil = []
        var designCanDef = []
        var Copyright = []
        var PatentappDomestic = []
        var Patentforeign = []
        var PatentappPct = []
        

        console.log(response.data.data,"response")
        // console.log(Object.keys(response.data.data.map((obj)=>{obj})),"object")
        response.data.data[0] && response.data.data[0].domestic.map((data, index) => {
          allusertabledata.push(data)
          domesticId.push(data)
          usertabledata.push({
            type:"TradeMark -> Application -> IndiaFilling",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: data.Mark && data.Mark!=="null" ?data.Mark:"----",
            actual_date: data.Appdate && data.Appdate!=="null" ?data.Appdate:"----",
            appno:data.AppNo && data.AppNo!=="null" ?data.AppNo:"----",
            id: data.TrdoId,
            trademark:"domestic"
          })

        })
        response.data.data[1] && response.data.data[1].International.map((data, index) => {
          allusertabledata.push(data)
          internationalId.push(data)
          usertabledata.push({
            type:"TradeMark -> Application -> InternationalFilling",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: data.Mark && data.Mark!=="null" ?data.Mark:"----",
            actual_date: data.Appdate && data.Appdate!=="null" ?data.Appdate:"----",
            appno:data.Appno && data.Appno!=="null" ?data.Appno:"----",
            id: data.TrId,
            trademark:"international"
          })
        })

        response.data.data[2] && response.data.data[2].Trademarkoppfiled.map((data, index) => {
          allusertabledata.push(data)
          filedId.push(data)
          usertabledata.push({
            type:"TradeMark -> Opposition -> Filed",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: data.Mark && data.Mark!=="null" ?data.Mark:"----",
            actual_date: "----",
            // data.Appdate
            appno:data.ApplicationNo && data.ApplicationNo!=="null" ?data.ApplicationNo:"----",
            id: data.TropId,
            trademark:"filed"
          })
        })

        response.data.data[3] && response.data.data[3].Oppdefended.map((data, index) => {
          allusertabledata.push(data)
          defendedId.push(data)
          usertabledata.push({
            type:"TradeMark -> Opposition -> Defended",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: data.Mark && data.Mark!=="null" ?data.Mark:"----",
            actual_date: "----",
            appno:data.AppNo && data.AppNo!=="null" ?data.AppNo:"----",
            id: data.TdId,
            trademark:"defended"
          })
        })

        response.data.data[4] && response.data.data[4].DesignappIntl.map((data, index) => {
          allusertabledata.push(data)
          designAppInter.push(data)
          usertabledata.push({
            type:"Design -> Application -> InternationalFilling",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: "----",
            actual_date: "----",
            appno:data.AppNo && data.AppNo!=="null" ?data.AppNo:"----",
            id: data.DesInId,
            trademark:"designAppInter"
          })
        })

        response.data.data[5] && response.data.data[5].DesignappDomestic.map((data, index) => {
          allusertabledata.push(data)
          designAppDomestic.push(data)
          usertabledata.push({
            type:"Design -> Application -> IndiaFilling",
            client: data.ClientName && data.ClientName!=="null" ?data.ClientName:"----",
            mark: "----",
            actual_date: "----",
            appno:data.AppNo && data.AppNo!=="null" ?data.AppNo:"----",
            id: data.DesIndId,
            trademark:"designAppDomestic"
          })
        })

        response.data.data[6] && response.data.data[6].DesignRectdefended.map((data, index) => {
          allusertabledata.push(data)
          designRectDef.push(data)
          usertabledata.push({
            type:"Design -> Rectification -> Defended",
            client: data.ClientRespondent && data.ClientRespondent!=="null" ?data.ClientRespondent:"----",
            mark: "----",
            actual_date: "----",
            appno:"----",
            id: data.RdId,
            trademark:"designRectDef"
          })
        })

        response.data.data[7] && response.data.data[7].DesRectfiled.map((data, index) => {
          allusertabledata.push(data)
          designRectFil.push(data)
          usertabledata.push({
            type:"Design -> Rectification -> Filled",
            client: data.ClientPetitioner && data.ClientPetitioner!=="null" ?data.ClientPetitioner:"----",
            mark: "----",
            actual_date: "----",
            appno:"----",
            id: data.RfId,
            trademark:"designRectFil"
          })
        })

        response.data.data[8] && response.data.data[8].DesCancellationdef.map((data, index) => {
          allusertabledata.push(data)
          designCanDef.push(data)
          usertabledata.push({
            type:"Design -> Cancellation -> Defended",
            client: data.ClientRespondent && data.ClientRespondent!=="null" ?data.ClientRespondent:"----",
            mark: "----",
            actual_date: "----",
            appno:"----",
            id: data.CdId,
            trademark:"designCanDef"
          })
        })

        response.data.data[9] && response.data.data[9].DesCancellationfiled.map((data, index) => {
          allusertabledata.push(data)
          designCanFil.push(data)
          usertabledata.push({
            type:"Design -> Cancellation -> Filed",
            client: data.ClientPetitioner && data.ClientPetitioner!=="null" ?data.ClientPetitioner:"----",
            mark: "----",
            actual_date: "----",
            appno:"----",
            id: data.TfId,
            trademark:"designCanFil"
          })
        })

        response.data.data[10] && response.data.data[10].PatentappDomestic.map((data, index) => {
          allusertabledata.push(data)
          PatentappDomestic.push(data)
          usertabledata.push({
            type:"Patent -> Application -> Domestic",
            client: data.ClientRef && data.ClientRef!=="null" ?data.ClientRef:"----",
            mark: "----",
            actual_date: "----",
            appno:data.ApplicatioNo,
            id: data.PatentId,
            trademark:"PatentappDomestic"
          })
        })

        response.data.data[11] && response.data.data[11].PatentappForeign.map((data, index) => {
          allusertabledata.push(data)
          Patentforeign.push(data)
          usertabledata.push({
            type:"Patent -> Application -> Foreign",
            client: "----",
            mark: "----",
            actual_date: "----",
            appno:data.AppNo === "null" ? "----" :data.AppNo,
            id: data.PatIndId,
            trademark:"PatentappForeign"
          })
        })

        response.data.data[12] && response.data.data[12].PatentappPct.map((data, index) => {
          allusertabledata.push(data)
          PatentappPct.push(data)
          usertabledata.push({
            type:"Patent -> Application -> PCT",
            client: "----",
            mark: "----",
            actual_date: data.Appdate === "null" ? "----" :data.Appdate,
            appno:data.AppNo === "null" ? "----" :data.AppNo,
            id: data.PapctId,
            trademark:"PatentappPCT"
          })
        })


        response.data.data[15] && response.data.data[15].Copyrightdetails.map((data, index) => {
          allusertabledata.push(data)
          Copyright.push(data)
          usertabledata.push({
            type:"Copyright",
            client: data.client_id && data.client_id!=="null" ?data.client_id:"----",
            mark: "----",
            actual_date: "----",
            appno:"----",
            id: data.id,
            trademark:"Copyright"
          })
        })
        
        self.setState({ usertabledata: usertabledata,allusertabledata:allusertabledata,domesticId:domesticId,internationalId:internationalId,filedId:filedId,defendedId:defendedId,designAppInter:designAppInter,designAppDomestic:designAppDomestic,designRectDef:designRectDef,designRectFil:designRectFil,designCanDef,designCanFil,Copyright })
      })
  }

  viewData=(data)=>{

    var id = data.rowId
    var project = data.trademark

    var viewdata=this.state.allusertabledata.filter((data)=>id===data.TrdoId || id === data.TrId || id === data.TropId || id===data.TdId || id === data.DesIndId || id === data.DesInId || id === data.RdId || id === data.RfId || id===data.CdId || id === data.id)
    var viewdata = viewdata[0]

    var modelviewData=[]
    if(project === "domestic"){
      this.state.domesticId.map((viewdata)=>{
        if(viewdata.TrdoId==id){
          modelviewData.push(
            <div className="projectDetailsview_container">
            <div className="projectDetailsview_key">
          <div>status</div>
          <div>Client</div>
          <div>Mark</div>
          <div>Upload Image</div>
          <div>Application Number</div>
          <div>Application Date</div>
          <div>Class</div>
          <div>Good and Service Description</div>
          <div>User Details</div>
          <div>Next Renewal</div>
          <div>Comments</div>
          <div>Internal Status</div>
          <div>Allotment</div>
          <div>Order</div>
          <div>Amendment</div>
          <div>condition</div>
          <div>Priority Details</div>
          <div>TMJ Number</div>
          <div>TMJ Date</div>
          <div>Journal Extract</div>
          <div>POA</div>
          <div>Certificate Date</div>
          <div>Renewal Certificate Date</div>
          </div>
          <div className="projectDetailsview_colon">
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
          </div>
          <div className="projectDetailsview_value">
          <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
          <div>{viewdata.ClientName && viewdata.ClientName!=="null" ?viewdata.ClientName:"----"}</div>
          <div>{viewdata.Mark && viewdata.Mark!=="null" ?viewdata.Mark:"----"}</div>
          <div>{viewdata.Image && viewdata.Image!=="null" ?viewdata.Image.slice(35):"----"}</div>
          <div>{viewdata.AppNo && viewdata.AppNo!=="null" ?viewdata.AppNo:"----"}</div>
          <div>{viewdata.Appdate && viewdata.Appdate!=="null" ?viewdata.Appdate:"----"}</div>
          <div>{viewdata.classname && viewdata.classname!=="null" ?viewdata.classname:"----"}</div>
          <div>{viewdata.GoodsandServiceDescription && viewdata.GoodsandServiceDescription!=="null" ?viewdata.GoodsandServiceDescription:"----"}</div>
          <div>{viewdata.Userdate && viewdata.Userdate!=="null" ?viewdata.Userdate:"----"}</div>
          <div>{viewdata.Appdate && viewdata.Appdate!=="null" && viewdata.Appdate?moment(moment(new Date(viewdata.Appdate), "DD-MM-YYYY").add(10, 'year')).format('YYYY-MM-DD'):"----"}</div>
          <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
          <div>{viewdata.Internalstatus && viewdata.Internalstatus!=="null" ?viewdata.Internalstatus:"----"}</div>
          <div>{viewdata.Allotment && viewdata.Allotment!=="null" ?viewdata.Allotment:"----"}</div>
          <div>{viewdata.orderurl && viewdata.orderurl!=="null" ?viewdata.orderurl.slice(35):"----"}</div>
          <div>{viewdata.Amendment && viewdata.Amendment!=="null" ?viewdata.Amendment:"----"}</div>
          <div>{viewdata.Condition && viewdata.Condition!=="null" ?viewdata.Condition:"----"}</div>
          <div>{viewdata.Prioritydetails && viewdata.Prioritydetails!=="null" ?viewdata.Prioritydetails:"----"}</div>
          <div>{viewdata.TMJNo && viewdata.TMJNo!=="null" ?viewdata.TMJNo:"----"}</div>
          <div>{viewdata.TMJdate && viewdata.TMJdate!=="null" ?viewdata.TMJdate:"----"}</div>
          <div>{viewdata.JournalExtract && viewdata.JournalExtract!=="null" ?viewdata.JournalExtract:"----"}</div>
          <div>{viewdata.POA && viewdata.POA!=="null" ?viewdata.POA.slice(35):"----"}</div>
          <div>{viewdata.Certdate && viewdata.Certdate!=="null" ?viewdata.Certdate:"----"}</div>
          <div>{viewdata.Rencertdate && viewdata.Rencertdate!=="null" ?viewdata.Rencertdate:"----"}</div>
      
          </div>
      
          </div>
      
          )
        }
      })

    }
    else if(project === "international"){
      this.state.internationalId.map((viewdata)=>{
        if(viewdata.TrId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>status</div>
      <div>Associate Reference</div>
      <div>Our Reference</div>
      <div>Class</div>
      <div>Goods and Service Description</div>
      <div>Client</div>
      <div>Mark</div>
      <div>Upload</div>
      <div>Associate</div>
      <div>Application Date</div>
      <div>Application Number</div>
      <div>Country</div>
      <div>Priority Details</div>
      <div>User Claim</div>
      <div>Allotment</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.Assref && viewdata.Assref!=="null" ?viewdata.Assref:"----"}</div>
      <div>{viewdata.OurReference && viewdata.OurReference!=="null" ?viewdata.OurReference:"----"}</div>
      <div>{viewdata.classname && viewdata.classname!=="null" ?viewdata.classname:"----"}</div>
      <div>{viewdata.Goodsandservicedescription && viewdata.Goodsandservicedescription!=="null" ?viewdata.Goodsandservicedescription:"----"}</div>
      <div>{viewdata.ClientName && viewdata.ClientName!=="null" ?viewdata.ClientName:"----"}</div>
      <div>{viewdata.Mark && viewdata.Mark!=="null" ?viewdata.Mark:"----"}</div>
      <div>{viewdata.File && viewdata.File!=="null" ?viewdata.File.slice(35):"----"}</div>
      <div>{viewdata.Associate && viewdata.Associate!=="null" ?viewdata.Associate:"----"}</div>
      <div>{viewdata.Appdate && viewdata.Appdate!=="null" ?viewdata.Appdate:"----"}</div>
      <div>{viewdata.Appno && viewdata.Appno!=="null" ?viewdata.Appno:"----"}</div>
      <div>{viewdata.Country && viewdata.Country!=="null" ?viewdata.Country:"----"}</div>
      <div>{viewdata.PriorityDetails && viewdata.PriorityDetails!=="null" ?viewdata.PriorityDetails:"----"}</div>
      <div>{viewdata.UserClaim && viewdata.UserClaim!=="null" ?viewdata.UserClaim:"----"}</div>
      <div>{viewdata.AllotmentId && viewdata.AllotmentId!=="null" ?viewdata.AllotmentId:"----"}</div>
  
      </div>
  
      </div>
  
      )
    }})
    }
    else if(project=== "filed"){
      this.state.filedId.map((viewdata)=>{
        if(viewdata.TropId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>status</div>
      <div>Client</div>
      <div>Our Reference</div>
      <div>Mark</div>
      <div>Upload</div>
      <div>Class</div>
      <div>Application Number</div>
      <div>TMJ Number</div>
      <div>TNJ Date</div>
      <div>Opposition Number</div>
      <div>Applicant</div>
      <div>Applicant agent</div>
      <div>Status</div>
      <div>Deadline</div>
      <div>Hearing Notice</div>
      <div>Further Action</div>
      <div>Order</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.ClientName && viewdata.ClientName!=="null" ?viewdata.ClientName:"----"}</div>
      <div>{viewdata.OurReference && viewdata.OurReference!=="null" ?viewdata.OurReference:"----"}</div>
      <div>{viewdata.Mark && viewdata.Mark!=="null" ?viewdata.Mark:"----"}</div>
      <div>{viewdata.Image && viewdata.Image!=="null" ?viewdata.Image.slice(35):"----"}</div>
      <div>{viewdata.classname && viewdata.classname!=="null" ?viewdata.classname:"----"}</div>
      <div>{viewdata.ApplicationNo && viewdata.ApplicationNo!=="null" ?viewdata.ApplicationNo:"----"}</div>
      <div>{viewdata.TMJNo && viewdata.TMJNo!=="null" ?viewdata.TMJNo:"----"}</div>
      <div>{viewdata.TMJDate && viewdata.TMJDate!=="null" ?viewdata.TMJDate:"----"}</div>
      <div>{viewdata.OppNo && viewdata.OppNo!=="null" ?viewdata.OppNo:"----"}</div>
      <div>{viewdata.Applicant && viewdata.Applicant!=="null" ?viewdata.Applicant:"----"}</div>
      <div>{viewdata.AppAgent && viewdata.AppAgent!=="null" ?viewdata.AppAgent:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.Deadline && viewdata.Deadline!=="null" ?viewdata.Deadline:"----"}</div>
      <div>{viewdata.HearingNotice && viewdata.HearingNotice!=="null" ?viewdata.HearingNotice:"----"}</div>
      <div>{viewdata.Furtheraction && viewdata.Furtheraction!=="null" ?viewdata.Furtheraction:"----"}</div>
      <div>{viewdata.Orderone && viewdata.Orderone!=="null" ?viewdata.Orderone.slice(35):"----"}</div>
      </div>
      </div>
      )
      }})
    }else if(project=== "defended"){
      this.state.defendedId.map((viewdata)=>{
        if(viewdata.TdId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>Client</div>
      <div>Our Reference</div>
      <div>Mark</div>
      <div>Upload</div>
      <div>Class</div>
      <div>Application Number</div>
      <div>TMJ Number</div>
      <div>TNJ Date</div>
      <div>Opposition Number</div>
      <div>Opponent</div>
      <div>Agent</div>
      <div>Status</div>
      <div>Deadline</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.ClientName && viewdata.ClientName!=="null" ?viewdata.ClientName:"----"}</div>
      <div>{viewdata.OurReference && viewdata.OurReference!=="null" ?viewdata.OurReference:"----"}</div>
      <div>{viewdata.Mark && viewdata.Mark!=="null" ?viewdata.Mark:"----"}</div>
      <div>{viewdata.Image && viewdata.Image!=="null" ?viewdata.Image.slice(35):"----"}</div>
      <div>{viewdata.classname && viewdata.classname!=="null" ?viewdata.classname:"----"}</div>
      <div>{viewdata.AppNo && viewdata.AppNo!=="null" ?viewdata.AppNo:"----"}</div>
      <div>{viewdata.TMJNo && viewdata.TMJNo!=="null" ?viewdata.TMJNo:"----"}</div>
      <div>{viewdata.TMJDate && viewdata.TMJDate!=="null" ?viewdata.TMJDate:"----"}</div>
      <div>{viewdata.OppNo && viewdata.OppNo!=="null" ?viewdata.OppNo:"----"}</div>
      <div>{viewdata.Opponent && viewdata.Opponent!=="null" ?viewdata.Opponent:"----"}</div>
      <div>{viewdata.Agent && viewdata.Agent!=="null" ?viewdata.Agent:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.Deadline && viewdata.Deadline!=="null" ?viewdata.Deadline:"----"}</div>
      </div>
      </div>
      )
      }})
    }    else if(project === "designAppDomestic"){
      this.state.designAppDomestic.map((viewdata)=>{
        if(viewdata.DesIndId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>File Cover</div>
      <div>Our Reference</div>
      <div>Applicant</div>
      <div>Country</div>
      <div>Title</div>
      <div>Application Number</div>
      <div>Class</div>
      <div>Client Reference</div>
      <div>Comments</div>
      <div>Status</div>
      <div>Associate</div>
      <div>Priority Country</div>
      <div>Priority Date</div>
      <div>Further Action</div>
      <div>Reply to Further Action</div>
      <div>Next Renewal</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.FileCover && viewdata.FileCover!=="null" ?viewdata.FileCover:"----"}</div>
      <div>{viewdata.OurReference && viewdata.OurReference!=="null" ?viewdata.OurReference:"----"}</div>
      <div>{viewdata.Applicant && viewdata.Applicant!=="null" ?viewdata.Applicant:"----"}</div>
      <div>{viewdata.Country && viewdata.Country!=="null" ?viewdata.Country:"----"}</div>
      <div>{viewdata.Title && viewdata.Title!=="null" ?viewdata.Title:"----"}</div>
      <div>{viewdata.AppNo && viewdata.AppNo!=="null" ?viewdata.AppNo:"----"}</div>
      <div>{viewdata.class && viewdata.class!=="null" ?viewdata.class:"----"}</div>
      <div>{viewdata.ClientReference && viewdata.ClientReference!=="null" ?viewdata.ClientReference:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.Assosciate && viewdata.Assosciate!=="null" ?viewdata.Assosciate:"----"}</div>
      <div>{viewdata.PriorityCountry && viewdata.PriorityCountry!=="null" ?viewdata.PriorityCountry:"----"}</div>
      <div>{viewdata.PriorityDate && viewdata.PriorityDate!=="null" ?viewdata.PriorityDate:"----"}</div>
      <div>{viewdata.FurtherAction && viewdata.FurtherAction!=="null" ?viewdata.FurtherAction:"----"}</div>
      <div>{viewdata.RplyToFurtherAction && viewdata.RplyToFurtherAction!=="null" ?viewdata.RplyToFurtherAction:"----"}</div>
      <div>{viewdata.NextRenewal && viewdata.NextRenewal!=="null" ?viewdata.NextRenewal:"----"}</div>
  
      </div>
  
      </div>
  
      )
    }})
    }
    else if(project === "designAppInter"){
      this.state.designAppInter.map((viewdata)=>{
        if(viewdata.DesInId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>File Cover</div>
      <div>Our Reference</div>
      <div>Applicant</div>
      <div>Country</div>
      <div>Title</div>
      <div>Associate Reference</div>
      <div>Application Number</div>
      <div>Comments</div>
      <div>Class</div>
      <div>Status</div>
      <div>Associate</div>
      <div>Priority Country</div>
      <div>Priority Date</div>
      <div>Priority Application Number</div>
      <div>Next Renewal</div>
      <div>Further Action</div>
      <div>Reply to Further Action</div>

      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.FileCover && viewdata.FileCover!=="null" ?viewdata.FileCover:"----"}</div>
      <div>{viewdata.OurReference && viewdata.OurReference!=="null" ?viewdata.OurReference:"----"}</div>
      <div>{viewdata.Applicant && viewdata.Applicant!=="null" ?viewdata.Applicant:"----"}</div>
      <div>{viewdata.CounName && viewdata.CounName!=="null" ?viewdata.CounName:"----"}</div>
      <div>{viewdata.Title && viewdata.Title!=="null" ?viewdata.Title:"----"}</div>
      <div>{viewdata.AssociateRef && viewdata.AssociateRef!=="null" ?viewdata.AssociateRef:"----"}</div>
      <div>{viewdata.AppNo && viewdata.AppNo!=="null" ?viewdata.AppNo:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Class && viewdata.Class!=="null" ?viewdata.Class:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      <div>{viewdata.Assosciate && viewdata.Assosciate!=="null" ?viewdata.Assosciate:"----"}</div>
      <div>{viewdata.PriorityCountry && viewdata.PriorityCountry!=="null" ?viewdata.PriorityCountry:"----"}</div>
      <div>{viewdata.PriorityDate && viewdata.PriorityDate!=="null" ?viewdata.PriorityDate:"----"}</div>
      <div>{viewdata.Priorityappno && viewdata.Priorityappno!=="null" ?viewdata.Priorityappno:"----"}</div>
      <div>{viewdata.NextRenewal && viewdata.NextRenewal!=="null" ?viewdata.NextRenewal:"----"}</div>
      <div>{viewdata.Furtheraction && viewdata.Furtheraction!=="null" ?viewdata.Furtheraction:"----"}</div>
      <div>{viewdata.RplyToFurtherAction && viewdata.RplyToFurtherAction!=="null" ?viewdata.RplyToFurtherAction:"----"}</div>

      </div>
  
      </div>
  
      )
    }})
    }
    else if(project === "designRectDef"){
      this.state.designRectDef.map((viewdata)=>{
        if(viewdata.RdId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>Client Respondent</div>
      <div>Design Number</div>
      <div>Petitioner</div>
      <div>Petitioner Rep</div>
      <div>Comments</div>
      <div>Status</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.ClientRespondent && viewdata.ClientRespondent!=="null" ?viewdata.ClientRespondent:"----"}</div>
      <div>{viewdata.DesignNo && viewdata.DesignNo!=="null" ?viewdata.DesignNo:"----"}</div>
      <div>{viewdata.Petitioner && viewdata.Petitioner!=="null" ?viewdata.Petitioner:"----"}</div>
      <div>{viewdata.PetitionerRep && viewdata.PetitionerRep!=="null" ?viewdata.PetitionerRep:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      </div>
      </div>
      )
      }})
    }else if(project === "designRectFil"){
      this.state.designRectFil.map((viewdata)=>{
        if(viewdata.RfId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>Client Petitioner</div>
      <div>Design Number</div>
      <div>Respondent</div>
      <div>Respondent Rep</div>
      <div>Comments</div>
      <div>Status</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.ClientPetitioner && viewdata.ClientPetitioner!=="null" ?viewdata.ClientPetitioner:"----"}</div>
      <div>{viewdata.DesignNo && viewdata.DesignNo!=="null" ?viewdata.DesignNo:"----"}</div>
      <div>{viewdata.Respondent && viewdata.Respondent!=="null" ?viewdata.Respondent:"----"}</div>
      <div>{viewdata.Respondentrep && viewdata.Respondentrep!=="null" ?viewdata.Respondentrep:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      </div>
      </div>
      )
      }})
    }else if(project === "designCanDef"){
      this.state.designCanDef.map((viewdata)=>{
        if(viewdata.CdId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>Client Respondent</div>
      <div>Design Number</div>
      <div>Petitioner</div>
      <div>Petitioner Rep</div>
      <div>Comments</div>
      <div>Status</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.ClientRespondent && viewdata.ClientRespondent!=="null" ?viewdata.ClientRespondent:"----"}</div>
      <div>{viewdata.DesignNo && viewdata.DesignNo!=="null" ?viewdata.DesignNo:"----"}</div>
      <div>{viewdata.Petitioner && viewdata.Petitioner!=="null" ?viewdata.Petitioner:"----"}</div>
      <div>{viewdata.PetitionerRep && viewdata.PetitionerRep!=="null" ?viewdata.PetitionerRep:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      </div>
      </div>
      )
      }})
    }else if(project === "designCanFil"){
      this.state.designCanFil.map((viewdata)=>{
        if(viewdata.TfId==id){
      modelviewData.push(
        <div className="projectDetailsview_container">
        <div className="projectDetailsview_key">
      <div>Client Petitioner</div>
      <div>Design Number</div>
      <div>Respondent</div>
      <div>Respondent Rep</div>
      <div>Comments</div>
      <div>Status</div>
      </div>
      <div className="projectDetailsview_colon">
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
        <div>:</div>
      </div>
      <div className="projectDetailsview_value">
      <div>{viewdata.ClientPetitioner && viewdata.ClientPetitioner!=="null" ?viewdata.ClientPetitioner:"----"}</div>
      <div>{viewdata.DesignNo && viewdata.DesignNo!=="null" ?viewdata.DesignNo:"----"}</div>
      <div>{viewdata.Respondent && viewdata.Respondent!=="null" ?viewdata.Respondent:"----"}</div>
      <div>{viewdata.RespondentRep && viewdata.RespondentRep!=="null" ?viewdata.RespondentRep:"----"}</div>
      <div>{viewdata.Comments && viewdata.Comments!=="null" ?viewdata.Comments:"----"}</div>
      <div>{viewdata.Status && viewdata.Status!=="null" ?viewdata.Status:"----"}</div>
      </div>
      </div>
      )
      }})
    }else if(project === "Copyright"){
      this.state.Copyright.map((viewdata)=>{
        if(viewdata.id==id){
          modelviewData.push(
            <div className="projectDetailsview_container">
            <div className="projectDetailsview_key">
          <div>Client Name</div>
          <div>Title</div>
          <div>Type of Work</div>
          <div>Upload Image</div>
          </div>
          <div className="projectDetailsview_colon">
            <div>:</div>
            <div>:</div>
            <div>:</div>
            <div>:</div>
          </div>
          <div className="projectDetailsview_value">
          <div>{viewdata.client_id && viewdata.client_id!=="null" ?viewdata.client_id:"----"}</div>
          <div>{viewdata.title && viewdata.title!=="null" ?viewdata.title:"----"}</div>
          <div>{viewdata.type_of_work && viewdata.type_of_work!=="null" ?viewdata.type_of_work:"----"}</div>
          <div>{viewdata.image_path && viewdata.image_path!=="null" ?viewdata.image_path.slice(48):"----"}</div>     
          </div>
      
          </div>
      
          )
        }
      })

    }

    this.setState({
      viewopen:true,
      modelviewData
    })
  }

  editData=(data)=>{
    console.log(data,"editData")
    if(data.trademark==="domestic" || data.trademark==="international" || data.trademark==="filed" || data.trademark==="defended"){   
      var url = "trademark"
    }else if(data.trademark==="Copyright"){
      var url = "Copyright"
    }
    else if(data.trademark==="PatentappDomestic" || data.trademark === "PatentappForeign" || data.trademark === "PatentappPCT"){
      var url = "patent"
    }
    else{
      var url = "design"
    }

    this.setState({url:url,redirectToTrademark:true,currentid:data.rowId,trademark:data.trademark})
  }
  render() {
      console.log(this.state.usertabledata,"usertabledata")
    //   const searchdata = this.state.usertabledata.filter((data) => {
    //     return data
    // })
    if(this.state.redirectToTrademark){
    return <Redirect to={this.state.url+"?&id="+this.state.currentid+"&trademark="+this.state.trademark+"&status=editable"} />
    }
    return (
      <div>
        <div className="filedOpp_tablemain">
          <div className="table_x_scroll">
            <TradeMarkDetailstable
              viewopen={(data) => this.viewData(data)}
              editOpen={(data) => this.editData(data)}
              tabledata={this.state.usertabledata && this.state.usertabledata}
              primaryKey="userId"
              tableschema={tableschema.fields}
              deleteclose={"deleteicon"}
            //   mainclassName={"userwidth"}
              tablehead={"Trade Mark Details"}
            />

          </div>
        </div>
        <Modalreact modalopen={this.state.viewopen} onclickok={()=>this.setState({viewopen:!this.state.viewopen})} viewdata={this.state.modelviewData} />
      </div>

    )
  }
}
export default TradeMarkDetails;