import React from 'react';
import "./DesignApplication.css";
import Inputantd from '../../../../formcomponent/inputantd';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Calenderbox from '../../../../formcomponent/calenderbox';
import Grid from '@material-ui/core/Grid';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { IoMdInformationCircle } from "react-icons/io";
import Button from 'react-bootstrap/Button';
import { Popover,} from 'antd';
import {Upload,Icon} from 'antd';
import { Tooltip,} from 'antd';  
import { Table } from 'antd';
import ValidationLibrary from "../../../../validationlibrary/validation";
import DesignAppList from './DesignAppList';
import {
    getStatus,
    getAssociate,
    getClass,
    getOurReference,
    getCountry,
    getAllotment,
    getStages,
    getSubstages,
    getClientName,
    getProjectName
} from "../../TradeMark/ApplicationTradeMark/TradeAppAction/TradeAppAction";
import { connect } from "react-redux";
import { apiurl } from "../../../../App";
import moment from 'moment';
import { notification } from "antd";

  const axios = require("axios");
  
const text = <span>+ 4Days</span>;
const columns = [
    {
      title: 'Stages',
      dataIndex: 'stage',
    },
    {
      title: 'Sub Stages',
      dataIndex: 'substage',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
        title: 'Actual Date',
        dataIndex: 'actualdate',
      },
  ];
  const data = [
    {
      key: '1',
      stage: 'ER Received',
      substage: '-',
      date: '14 July 2020',
      actualdate:'14 July 2020',
    },
    {
      key: '2',
      stage: 'ER Reply',
      substage: '-',
      date: '18 July 2020',
      actualdate:'18 July 2020',
    },

  ];

  const content = (
    <div>
      <p className="popover_content_edit">+ 4Days</p>
    </div>
  );
class ForeignDesignApplication extends React.Component{
    state = {        
        tags: [],
        inputVisible: false,
        inputValue: '',
        errordummy:true,
    DesignApp_For_data:{
      projectname:{
        value: "",
        validation: [],
        error: null,
        errmsg: null,
      },
    'Design_For_ClientRef':{
        value:"",
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
    },
    'our_ref':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'applicant':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'country':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'title':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'associate_ref':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'application_no':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    application_date: {
      value: "",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    },
    'comments':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'class':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'status':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'associate':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'priority_country':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'date':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'priority_app_no':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },
    'stages':{
        value:"",
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
    }, 
    'sub_stages':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    }, 
    'date_two':{
        value:null,
        validation:[],
        error:null,
        errmsg:null
    },    
      next_renew: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      further_action: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
      replyto_further: {
        value:null,
        validation: [],
        error: null,
        errmsg: null,
      },
    hearing_date: {
      value:"",
      validation: [{ name: "required" }],
      error: null,
      errmsg: null,
    }      
    },
    }

    async componentDidMount() {
        await this.props.getStatus();
        await this.props.getAssociate();
        await this.props.getClass();
        await this.props.getOurReference();
        await this.props.getCountry();
        await this.props.getAllotment();
        await this.props.getStages();
        await this.props.getSubstages();
        await this.props.getClientName();
        await this.props.getProjectName()


       this.callViewTrademark()

      }

      callViewTrademark=()=>{
        axios({
          method: 'get',
          url: apiurl + "/" + "viewprojectTemplate",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response)=>{
            this.setState({projectList:response.data.data})
      
            var projectList = []
      
              response.data.data.map((value,index)=>{
                  if(value.Type === "Foreign" && value.Template === "Design" && value.Process === "Application"){
                    projectList.push(value)
                  } 
                })
      
                this.setState({projectList:projectList})

                const params = new URLSearchParams(window.location.search)
                const status = params.get("status")
                const userid = params.get("id")

      var self = this
  axios({
    method: 'get',
    url: apiurl + "/viewtrademark",
  })
    .then((response)=> {
      response.data.data[4].DesignappIntl.map((data, index) => {
        if (data.DesInId == userid) {
        console.log(data,"insidedata")

        self.state.DesignApp_For_data.projectname.value = data.ProjectName === "null" ? "" : data.ProjectName
        self.state.DesignApp_For_data.stages.value=projectList[data.Designapp.length] && projectList[data.Designapp.length].Stage
        self.state.DesignApp_For_data.sub_stages.value=projectList[data.Designapp.length] && projectList[data.Designapp.length].Substage
        self.state.DesignApp_For_data.date_two.value=moment(moment(data.Designapp[data.Designapp.length-1].HearingDate, "YYYY-MM-DD").add(projectList[data.Designapp.length] && projectList[data.Designapp.length].TDays ? projectList[data.Designapp.length].TDays : 0, 'days'))

      this.state.DesignApp_For_data.Design_For_ClientRef.value=data.FileCover && data.FileCover
      this.state.DesignApp_For_data.applicant.value=data.Applicant && data.Applicant
      this.state.DesignApp_For_data.application_no.value=data.AppNo && data.AppNo
      this.state.DesignApp_For_data.associate.value=data.Assosciate && data.Assosciate
      this.state.DesignApp_For_data.associate_ref.value=data.AssociateRef && data.AssociateRef
      this.state.DesignApp_For_data.class.value=data.Class && data.Class
      this.state.DesignApp_For_data.comments.value=data.Comments && data.Comments
      this.state.DesignApp_For_data.country.value=data.CounName && data.CounName
      this.state.DesignApp_For_data.date.value=data.PriorityDate && moment(data.PriorityDate)
      this.state.DesignApp_For_data.our_ref.value=data.OurReference && data.OurReference
      this.state.DesignApp_For_data.priority_app_no.value=data.Priorityappno && data.Priorityappno
      this.state.DesignApp_For_data.priority_country.value=data.PriorityCountry && data.PriorityCountry
      this.state.DesignApp_For_data.status.value=data.Status && data.Status
      this.state.DesignApp_For_data.title.value=data.Title && data.Title
      this.state.DesignApp_For_data.further_action.value=data.Furtheraction && moment(data.Furtheraction)
      this.state.DesignApp_For_data.replyto_further.value=data.RplyToFurtherAction && moment(data.RplyToFurtherAction)
      this.state.DesignApp_For_data.next_renew.value=data.NextRenewal && moment(data.NextRenewal)
      self.setState({TrademarkItems:data.Designapp,commonId:data.DesInId})
        }
      })
    })
  })}


      checkValidation = () => {
        var mainvalue = {};
        var DesignApp_For_data = this.state.DesignApp_For_data;
        var targetkeys = Object.keys(DesignApp_For_data);
        console.log(targetkeys, "targetkeys");
        for (var i in targetkeys) {
          var errorcheck = ValidationLibrary.checkValidation(
            DesignApp_For_data[targetkeys[i]].value,
            DesignApp_For_data[targetkeys[i]].validation
          );
          console.log(errorcheck, "errorcheck");
          DesignApp_For_data[targetkeys[i]].error = !errorcheck.state;
          DesignApp_For_data[targetkeys[i]].errmsg = errorcheck.msg;
          mainvalue[targetkeys[i]] = DesignApp_For_data[targetkeys[i]].value;
          console.log(DesignApp_For_data[targetkeys[i]].error,"error")
        }
        var filtererr = targetkeys.filter(
          (obj) => DesignApp_For_data[obj].error == true
        );
        console.log(filtererr.length);
        if (filtererr.length > 0) {
          this.setState({ error: true });
        } else {
          this.setState({ error: false });
          const params = new URLSearchParams(window.location.search)
          const status = params.get("status")
          {
            status==="editable"|| this.state.afterInsert?
          this.updateSubstage():
          this.insert()
          }
        }
    
        this.setState({
          // mainvalue,
          DesignApp_For_data,
        });
      };

      updateSubstage=()=>{
          
        // var Stages = this.props.designStages.filter((data,index)=>{
        //   return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
        // }).filter((val,index)=>{
        //   if(index == this.state.DesignApp_For_data.stages.value-1){
        //     return val.ProjectTemplateId
        //   }
        // })
    
        // console.log(Stages,"StagesStages")
    
        // var sub_stages = this.props.designSubStages.filter((data,index)=>{
        //   return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
        // }).filter((val,index)=>{
        //   if(index == this.state.DesignApp_For_data.sub_stages.value-1){
        //     return val.ProjectTemplateId
        //   }
        // })


        if(typeof this.state.DesignApp_For_data.stages.value === 'string'){
          var Stages = this.props.designStages.filter((data,index)=>{
            return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
          }).filter((val,index)=>{
            if(val.Stage === this.state.DesignApp_For_data.stages.value){
              return val.ProjectTemplateId
            }
          })
        }else{
          var Stages = this.props.designStages.filter((data,index)=>{
            return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
          }).filter((val,index)=>{
            if(index == this.state.DesignApp_For_data.stages.value-1){
              return val.ProjectTemplateId
            }
          })
    
        }
    
    
        if(typeof this.state.DesignApp_For_data.sub_stages.value === 'string'){
          var sub_stages = this.props.designSubStages.filter((data,index)=>{
            return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
          }).filter((val,index)=>{
            if(val.Substage == this.state.DesignApp_For_data.sub_stages.value){
              return val.ProjectTemplateId
            }
          })
        }else{
          var sub_stages = this.props.designSubStages.filter((data,index)=>{
            return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
          }).filter((val,index)=>{
            if(index == this.state.DesignApp_For_data.sub_stages.value-1){
              return val.ProjectTemplateId
            }
          })
        }

      var self = this
    
      var myObject = {
        desInId:this.state.commonId,
        "stages": Stages[0].ProjectTemplateId,
    }
    
    this.state.DesignApp_For_data.sub_stages.value && Object.assign(myObject, {"Substages":sub_stages[0].ProjectTemplateId})
    this.state.DesignApp_For_data.date_two.value && Object.assign(myObject, { "date":this.state.DesignApp_For_data.date_two.value?moment(this.state.DesignApp_For_data.date_two.value).format('YYYY-MM-DD'):""})
    this.state.DesignApp_For_data.hearing_date.value && Object.assign(myObject, {"hearingdate":this.state.DesignApp_For_data.hearing_date.value? moment(this.state.DesignApp_For_data.hearing_date.value).format('YYYY-MM-DD'):""})
    
      axios({
        method: 'put',
        url: apiurl + "/updatedesIntlItems",
        data:
          myObject
        
      })
        .then(function (response) {
          notification.warning({
            message: `Stages updated successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          self.setState({callSubStage:true})
          self.callViewTrademark()
          })
    
      }

      changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);

        const params = new URLSearchParams(window.location.search)
        const status = params.get("status")
    
        if(key==="stages" && status){
    
          var Stages = this.props.designStages.filter((data,index)=>{
            return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
          }).filter((val,index)=>{
            if(index == data-1){
              return val.ProjectTemplateId
            }
          })
    
          var datevalue = this.state.projectList.find((value,index)=>{
            if(Stages[0].ProjectTemplateId == value.ProjectTemplateId){
              return value.TDays
            }
          })
            this.state.DesignApp_For_data.date_two.value = moment(moment(this.state.TrademarkItems[this.state.TrademarkItems.length-1].HearingDate, "YYYY-MM-DD").add( datevalue ? datevalue.TDays : 0, 'days'))
        }

        var DesignApp_For_data = this.state.DesignApp_For_data;
        var targetkeys = Object.keys(DesignApp_For_data);
        var errorcheck = ValidationLibrary.checkValidation(
          data,
          DesignApp_For_data[key].validation
        );
        DesignApp_For_data[key].value = data;
        DesignApp_For_data[key].error = !errorcheck.state;
        DesignApp_For_data[key].errmsg = errorcheck.msg;
        this.setState({ DesignApp_For_data });
        var filtererr = targetkeys.filter(
          (obj) =>
            DesignApp_For_data[obj].error == true ||
            DesignApp_For_data[obj].error == null
        );
        if (filtererr.length > 0) {
          this.setState({ error: true, errordummy: false });
        } else {
          this.setState({ error: false });
        }
      };

      cancelClick=()=>{
        // this.state.DesignApp_For_data.Design_For_ClientRef.value=""
        // this.state.DesignApp_For_data.applicant.value=""
        // this.state.DesignApp_For_data.application_no.value=""
        // this.state.DesignApp_For_data.associate.value=""
        // this.state.DesignApp_For_data.associate_ref.value=""
        // this.state.DesignApp_For_data.class.value=""
        // this.state.DesignApp_For_data.comments.value=""
        // this.state.DesignApp_For_data.country.value=""
        // this.state.DesignApp_For_data.date.value=""
        // this.state.DesignApp_For_data.date_two.value=""
        // this.state.DesignApp_For_data.our_ref.value=""
        // this.state.DesignApp_For_data.priority_app_no.value=""
        // this.state.DesignApp_For_data.priority_country.value=""
        // this.state.DesignApp_For_data.stages.value=""
        // this.state.DesignApp_For_data.status.value=""
        // this.state.DesignApp_For_data.sub_stages.value=""
        // this.state.DesignApp_For_data.title.value=""
        this.setState({})
      }


      insert=()=>{


        
    var Stages = this.props.designStages.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
    }).filter((val,index)=>{
    console.log(val,"StagesStages1")

      if(index == this.state.DesignApp_For_data.stages.value-1){
        return val.ProjectTemplateId
      }
    })

    // console.log(Stages,"StagesStages")

    var sub_stages = this.props.designSubStages.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
    }).filter((val,index)=>{
    console.log(val,"StagesStages")

      if(index == this.state.DesignApp_For_data.sub_stages.value-1){
        return val.ProjectTemplateId
      }
    })

    var calcaulateTDays = this.state.projectList.filter((data,index)=>{
      return(data.Type === "Foreign" && data.Template === "Design" && data.Process === "Application")
    })
        

        var self = this;
          let FordesignData = {
            projectname: this.state.DesignApp_For_data.projectname.value,
            filecover: this.state.DesignApp_For_data.Design_For_ClientRef.value,
            ourReference: this.state.DesignApp_For_data.our_ref.value,
            applicant: this.state.DesignApp_For_data.applicant.value,
            country: this.state.DesignApp_For_data.country.value,
            title: this.state.DesignApp_For_data.title.value,
            assosciateref: this.state.DesignApp_For_data.associate_ref.value,
            appno: this.state.DesignApp_For_data.application_no.value && Number(this.state.DesignApp_For_data.application_no.value),
            comments: this.state.DesignApp_For_data.comments.value,
            class: this.state.DesignApp_For_data.class.value,
            status: this.state.DesignApp_For_data.status.value,
            assosciate: this.state.DesignApp_For_data.associate.value,
            prioritycountry: this.state.DesignApp_For_data.priority_country.value,
            priorityappno: this.state.DesignApp_For_data.priority_app_no.value && Number(this.state.DesignApp_For_data.priority_app_no.value),
            prioritydate: this.state.DesignApp_For_data.date.value && moment(this.state.DesignApp_For_data.date.value).format('YYYY-MM-DD'),
            Stages: Stages[0].ProjectTemplateId,
            Substages: sub_stages[0] && sub_stages[0].ProjectTemplateId,
            // date: this.state.DesignApp_For_data.date_two.value && moment(this.state.DesignApp_For_data.date_two.value).format('YYYY-MM-DD'),
            hearingdate: this.state.DesignApp_For_data.hearing_date.value && moment(this.state.DesignApp_For_data.hearing_date.value).format('YYYY-MM-DD'),
            "furtheraction":moment(this.state.DesignApp_For_data.further_action.value).format('YYYY-MM-DD'),
            "rplytofurtheraction":moment(this.state.DesignApp_For_data.replyto_further.value).format('YYYY-MM-DD'),
            "nextrenewal":moment(this.state.DesignApp_For_data.next_renew.value).format('YYYY-MM-DD'),
            "date":this.state.DesignApp_For_data.application_date.value ? moment(moment(this.state.DesignApp_For_data.application_date.value, "YYYY-MM-DD").add(calcaulateTDays[0].TDays ? calcaulateTDays[0].TDays : 0, 'days')).format('YYYY-MM-DD'): ""
          };

          // console.log(this.state., "report");
    
          axios({
            method: "post",
            url: apiurl + "/adddesignIntl",
            data: FordesignData,
          })
            .then(function (response) {
              console.log(response.data.data, "responseresponse");
              notification.warning({
                message: `Foreign Design Application data submitted successfully`,
                duration: 3.5,
                placement: "topRight",
                className: "notification_dayreport",
              });
              // self.state.DesignApp_For_data.client_name.value = "";
              // self.state.DesignApp_For_data.case_no.value = "";
              // self.state.DesignApp_For_data.court_no.value = "";
              // self.state.DesignApp_For_data.assingned_to.value = "";
              // self.state.DraName = "";
    
              // self.state.opemodaldata.amount.value=""
              // self.props.showclose && self.props.showclose()
          self.setState({afterInsert:true,commonId:response.data.data})

            })
            .catch(function (error) {
              console.log(error, "error");
            });
      }

      update=()=>{

        var our_reference = this.state.DesignApp_For_data.our_ref.value

        if(!Number(this.state.DesignApp_For_data.our_ref.value)){
         var our_reference = this.props.designReference.find((val) => {
            if(our_reference==val.EmpFirstName){
              return val.EmpId 
            }
           }
           )
        }

        var applicant = this.state.DesignApp_For_data.applicant.value

        if(!Number(this.state.DesignApp_For_data.applicant.value)){
         var applicant = this.props.designClient.find((val) => {
            if(applicant==val.ClientName){
              return val.ClientId 
            }
           }
           )
        }


        var designCountry = this.state.DesignApp_For_data.country.value

        if(!Number(this.state.DesignApp_For_data.country.value)){
         var designCountry = this.props.designCountry.find((val) => {
            if(designCountry==val.CounName){
              return val.CounId 
            }
           }
           )
        }

        var AssociateRef = this.state.DesignApp_For_data.associate_ref.value

        if(!Number(this.state.DesignApp_For_data.associate_ref.value)){
         var AssociateRef = this.props.designReference.find((val) => {
            if(AssociateRef==val.EmpFirstName){
              return val.EmpId 
            }
           }
           )
        }

        var classDrop = this.state.DesignApp_For_data.class.value

        if(!Number(this.state.DesignApp_For_data.class.value)){
         var classDrop = this.props.designClass.find((val) => {
            if(classDrop==val.classname){
              return val.classId 
            }
           }
           )
        }

        var Associate = this.state.DesignApp_For_data.associate.value

        if(!Number(this.state.DesignApp_For_data.associate.value)){
         var Associate = this.props.designReference.find((val) => {
            if(Associate==val.EmpFirstName){
              return val.EmpId 
            }
           }
           )
        }

        var statusId = this.state.DesignApp_For_data.status.value

        if(!Number(this.state.DesignApp_For_data.status.value)){
         var statusId = this.props.designStatus.find((val) => {
            if(statusId==val.Status){
              return val.StatusId 
            }
           }
           )
        }

        var priCountry = this.state.DesignApp_For_data.priority_country.value

        if(!Number(this.state.DesignApp_For_data.priority_country.value)){
         var priCountry = this.props.designCountry.find((val) => {
            if(priCountry==val.CounName){
              return val.CounId 
            }
           }
           )
        }

        console.log(AssociateRef,"AssociateRef")

        var self = this;
          let FordesignData = {
            filecover: this.state.DesignApp_For_data.Design_For_ClientRef.value,
            ourReference:!Number(this.state.DesignApp_For_data.our_ref.value)?our_reference && our_reference.EmpId:our_reference,
            applicant: !Number(this.state.DesignApp_For_data.applicant.value)?applicant && applicant.ClientId:applicant,
            country: !Number(this.state.DesignApp_For_data.country.value)?designCountry.CounId:designCountry,
            title: this.state.DesignApp_For_data.title.value,
            assosciateref: !Number(this.state.DesignApp_For_data.associate_ref.value)?AssociateRef && AssociateRef.EmpId:AssociateRef,
            appno: this.state.DesignApp_For_data.application_no.value && Number(this.state.DesignApp_For_data.application_no.value),
            comments: this.state.DesignApp_For_data.comments.value,
            class: !Number(this.state.DesignApp_For_data.class.value)?classDrop && classDrop.classId:classDrop,
            status: !Number(this.state.DesignApp_For_data.status.value)?statusId && statusId.StatusId:statusId,
            assosciate: !Number(this.state.DesignApp_For_data.associate.value)?Associate.EmpId:Associate,
            prioritycountry: !Number(this.state.DesignApp_For_data.priority_country.value)?priCountry && priCountry.CounId:priCountry,
            priorityappno: this.state.DesignApp_For_data.priority_app_no.value && Number(this.state.DesignApp_For_data.priority_app_no.value),
            prioritydate: this.state.DesignApp_For_data.date.value && moment(this.state.DesignApp_For_data.date.value).format('YYYY-MM-DD'),
            "furtheraction":moment(this.state.DesignApp_For_data.further_action.value).format('YYYY-MM-DD'),
            "rplytofurtheraction":moment(this.state.DesignApp_For_data.replyto_further.value).format('YYYY-MM-DD'),
            "nextrenewal":moment(this.state.DesignApp_For_data.next_renew.value).format('YYYY-MM-DD'),
            desInId:this.state.commonId
          };
          // console.log(this.state., "report");
    
          axios({
            method: 'put',
            url: apiurl + "/updatedesignIntl",
            data:FordesignData
          })
            .then(function (response) {
              notification.warning({
                message: `Design International Filing Application has updated successfully`,
                duration: 3.5,
                placement: "topRight",
                className: "notification_dayreport",
              });
              })
      }

    render(){
      
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")

    var stageArr = []
    var stageArrId = []

    this.props.designStages &&
    this.props.designStages.map((val) => {if(val.Type === "Foreign" && val.Template === "Design" && val.Process === "Application"){
      stageArr.push(val.Stage) 
      stageArrId.push(val.ProjectTemplateId)
    }})

    var subStageArr = []
    var subStageArrId = []

    this.props.designSubStages &&
    this.props.designSubStages.map((val)=>{if(val.Type === "Foreign" && val.Template === "Design" && val.Process === "Application" && val.Substage){
      subStageArr.push(val.Substage)
      subStageArrId.push(val.ProjectTemplateId)
    }})
        return(
            <>
               <Grid container spacing={2} className="mt-3">
               <Grid item md={3} sm={5}>

              <Dropdownantd
                  label={"Project Name"}
                  className="w-100"
                  option={
                    this.props.ProjectName &&
                    this.props.ProjectName.map((val) => val.ProjectName)
                  }
                  changeData={(data) =>this.changeDynamic(data, "projectname")}
                  disabled={status==="editable" ? true : false}
                  value={this.state.DesignApp_For_data.projectname.value}
                  error={this.state.DesignApp_For_data.projectname.error}
                  errmsg={this.state.DesignApp_For_data.projectname.errmsg}
                />

                </Grid>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"File Cover"} className="w-100"
                    changeData={(data)=>this.changeDynamic(data,'Design_For_ClientRef')} 
                    value={this.state.DesignApp_For_data.Design_For_ClientRef.value} 
                    error={this.state.DesignApp_For_data.Design_For_ClientRef.error} 
                    errmsg={this.state.DesignApp_For_data.Design_For_ClientRef.errmsg}/>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Dropdownantd label={"Our Reference"} className="w-100"
                    option={
                        this.props.designReference &&
                        this.props.designReference.map((val) => val.EmpFirstName)
                      }
                    changeData={(data)=>this.changeDynamic(data,'our_ref')} 
                    value={this.state.DesignApp_For_data.our_ref.value} 
                    error={this.state.DesignApp_For_data.our_ref.error} 
                    errmsg={this.state.DesignApp_For_data.our_ref.errmsg}></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Dropdownantd label={"Applicant"} className="w-100"
                    option={
                      this.props.designClient &&
                      this.props.designClient.map((val) => val.ClientName)
                      }
                    changeData={(data)=>this.changeDynamic(data,'applicant')} 
                    value={this.state.DesignApp_For_data.applicant.value} 
                    error={this.state.DesignApp_For_data.applicant.error} 
                    errmsg={this.state.DesignApp_For_data.applicant.errmsg}></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                    <Dropdownantd label={"Country"} className="w-100"
                    option={
                        this.props.designCountry &&
                        this.props.designCountry.map((val) => val.CounName)
                      }
                    changeData={(data)=>this.changeDynamic(data,'country')} 
                    value={this.state.DesignApp_For_data.country.value} 
                    error={this.state.DesignApp_For_data.country.error} 
                    errmsg={this.state.DesignApp_For_data.country.errmsg}></Dropdownantd>
                </Grid>
                </Grid>

                <Grid container spacing={2}>
                        <Grid item md={9} sm={5}>
                            <Inputantd label={"Title"}  className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'title')} 
                            value={this.state.DesignApp_For_data.title.value} 
                            error={this.state.DesignApp_For_data.title.error} 
                            errmsg={this.state.DesignApp_For_data.title.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Associate Reference"} className="w-100"
                            option={
                              this.props.designReference &&
                              this.props.designReference.map((val) => val.EmpFirstName)
                              }
                            changeData={(data)=>this.changeDynamic(data,'associate_ref')} 
                            value={this.state.DesignApp_For_data.associate_ref.value} 
                            error={this.state.DesignApp_For_data.associate_ref.error} 
                            errmsg={this.state.DesignApp_For_data.associate_ref.errmsg}/>
                        </Grid>                
                </Grid>

                <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                            <Inputantd label={"Application Number"} className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'application_no')} 
                            value={this.state.DesignApp_For_data.application_no.value} 
                            error={this.state.DesignApp_For_data.application_no.error} 
                            errmsg={this.state.DesignApp_For_data.application_no.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Inputantd label={"Comments"} className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'comments')} 
                            value={this.state.DesignApp_For_data.comments.value} 
                            error={this.state.DesignApp_For_data.comments.error} 
                            errmsg={this.state.DesignApp_For_data.comments.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Class"} className="w-100"
                            option={
                                this.props.designClass &&
                                this.props.designClass.map((val) => val.classname)
                              }
                            changeData={(data)=>this.changeDynamic(data,'class')} 
                            value={this.state.DesignApp_For_data.class.value} 
                            error={this.state.DesignApp_For_data.class.error} 
                            errmsg={this.state.DesignApp_For_data.class.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Status"} className="w-100"
                            option={
                              this.props.designStatus &&
                              this.props.designStatus.map((val) => val.Status)
                            }
                            changeData={(data)=>this.changeDynamic(data,'status')} 
                            value={this.state.DesignApp_For_data.status.value} 
                            error={this.state.DesignApp_For_data.status.error} 
                            errmsg={this.state.DesignApp_For_data.status.errmsg}/>
                        </Grid>               
                </Grid>

                <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Associate"} className="w-100"
                            option={
                              this.props.designReference &&
                              this.props.designReference.map((val) => val.EmpFirstName)
                            }
                            changeData={(data)=>this.changeDynamic(data,'associate')} 
                            value={this.state.DesignApp_For_data.associate.value} 
                            error={this.state.DesignApp_For_data.associate.error} 
                            errmsg={this.state.DesignApp_For_data.associate.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Priority Country"} className="w-100"
                            option={
                              this.props.designCountry &&
                              this.props.designCountry.map((val) => val.CounName)
                            }
                            changeData={(data)=>this.changeDynamic(data,'priority_country')} 
                            value={this.state.DesignApp_For_data.priority_country.value} 
                            error={this.state.DesignApp_For_data.priority_country.error} 
                            errmsg={this.state.DesignApp_For_data.priority_country.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Calenderbox label={"Priority Date"} className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'date')} 
                            value={this.state.DesignApp_For_data.date.value} 
                            error={this.state.DesignApp_For_data.date.error} 
                            errmsg={this.state.DesignApp_For_data.date.errmsg}/>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Inputantd label={"Priority Application Number"} className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'priority_app_no')} 
                            value={this.state.DesignApp_For_data.priority_app_no.value} 
                            error={this.state.DesignApp_For_data.priority_app_no.error} 
                            errmsg={this.state.DesignApp_For_data.priority_app_no.errmsg}/>
                        </Grid>  
                        <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Further Action"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "further_action")
                  }
                  value={this.state.DesignApp_For_data.further_action.value}
                  error={this.state.DesignApp_For_data.further_action.error}
                  errmsg={this.state.DesignApp_For_data.further_action.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Reply to Further Action"}
                  className="w-100"
                  changeData={(data) =>
                    this.changeDynamic(data, "replyto_further")
                  }
                  value={this.state.DesignApp_For_data.replyto_further.value}
                  error={this.state.DesignApp_For_data.replyto_further.error}
                  errmsg={this.state.DesignApp_For_data.replyto_further.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Next Renewal"}
                  className="w-100"
                  changeData={(data) => this.changeDynamic(data, "next_renew")}
                  value={this.state.DesignApp_For_data.next_renew.value}
                  error={this.state.DesignApp_For_data.next_renew.error}
                  errmsg={this.state.DesignApp_For_data.next_renew.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox label={"Application Date"} className="w-75"
                        changeData={(data) => this.changeDynamic(data, 'application_date')}
                        value={this.state.DesignApp_For_data.application_date.value}
                        error={this.state.DesignApp_For_data.application_date.error}
                        errmsg={this.state.DesignApp_For_data.application_date.errmsg} />
              </Grid>
                        {status==="editable"&&
                  <>
                  <Grid item md={9} sm={5}>
                  </Grid>
                  <Grid item >
                    <Button className="btnwidth btnclr indiafilling_topalign"  onClick={()=>this.update()}>Update</Button>
                  </Grid>
                  </>
  }             
                </Grid>
                <div className="border_edit"/>
                <h5>Current Stage</h5>
            <div className="circle_icon_par">
                    <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Stages"} className="w-75"
                            option={
                              stageArr
                              }
                            disableto={this.state.TrademarkItems && this.state.TrademarkItems.length}
                            changeData={(data)=>this.changeDynamic(data,'stages')} 
                            value={this.state.DesignApp_For_data.stages.value} 
                            error={this.state.DesignApp_For_data.stages.error} 
                            errmsg={this.state.DesignApp_For_data.stages.errmsg}></Dropdownantd>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label={"Sub Stages"} className="w-75"
                            option={
                                subStageArr
                              }
                            changeData={(data)=>this.changeDynamic(data,'sub_stages')} 
                            value={this.state.DesignApp_For_data.sub_stages.value} 
                            error={this.state.DesignApp_For_data.sub_stages.error} 
                            errmsg={this.state.DesignApp_For_data.sub_stages.errmsg}></Dropdownantd>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Calenderbox label={"Statutory Deadline"} className="w-75"
                            changeData={(data)=>this.changeDynamic(data,'date_two')} 
                            disabled={true}
                            value={status==="editable" ? this.state.DesignApp_For_data.date_two.value:this.state.DesignApp_For_data.application_date.value}></Calenderbox>
                        </Grid>
                        <Grid item md={3} sm={5}>
                        <div className="d-flex">
                <Calenderbox label={"Filing Date"} className="w-100"
                      changeData={(data) => this.changeDynamic(data, 'hearing_date')}
                      value={this.state.DesignApp_For_data.hearing_date.value}
                      error={this.state.DesignApp_For_data.hearing_date.error}
                      errmsg={this.state.DesignApp_For_data.hearing_date.errmsg}
                    ></Calenderbox>
                  <span className="circle_icon_edit">
                    <AddCircleOutline className="Interfil_addicon" onClick={this.checkValidation} />
                  </span>
                  </div>
                        </Grid>
                    </Grid>
            </div>
            {/* Grid content End */}
            
            {/* Table content start */}
                        <div className="table_info_par">
                            <div><DesignAppList commonId={this.state.commonId} endpoint={"viewdesignIntlitems"} trademark={"DesignInternationalFilling"}/></div>
                            </div>
            {/* Table content end */}
            </>
                ) 
                }            
            }
// export default ForeignDesignApplication;
const mapStateToProps = (state) => {
    console.log("stateeee", state);
  
    return {
      DesignApp_For_data: state.resumeReducer.DesignApp_For_data,
      designStatus: state.tradeapp.getTradestatus,
      designAssociate: state.tradeapp.getTradeassociate,
      designClass: state.tradeapp.getTradeclass,
      designReference: state.tradeapp.getTradeOurReference,
      designCountry: state.tradeapp.getTradecountry,
      designAllotement: state.tradeapp.getTradeallotment,
      designStages: state.tradeapp.getTradestages,
      designSubStages: state.tradeapp.getTradeSubstages,
      designClient:state.tradeapp.getTradeClientname,
      ProjectName:state.tradeapp.getprojectName
    };
  };
  export default connect(mapStateToProps, {
    getStatus,
    getAssociate,
    getClass,
    getOurReference,
    getCountry,
    getAllotment,
    getStages,
    getSubstages,
    getClientName,
    getProjectName
  })(ForeignDesignApplication);