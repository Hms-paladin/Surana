import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import './Addcandidate.css';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { addCandidateInduction } from './Action';
import { apiurl } from "../../../App";
import { Spin } from 'antd';
import {notification} from 'antd';


const axios = require('axios');
var checklistItem = false;

class Addaddcandidatedata extends React.Component {
    state = {
        checkListItem: false,
        checkItem:[],
        colorchange: [],
        cardval: "prelegal",
        departmentoption:[],
        checklistoption:[],
        employeeoption:[],
        InductionFullValue:[],
        unselectvalue:[],
        InduIdvaluearr:[],
        insideloading:false,
        addcandidatedata:
        {
            'Checklist':
            {
                'value': '',
                validation: [{ 'name': 'required' }],
                error: null,
                errmsg: null
            },
            'department':
            {
                'value':[],
                validation:[{'name':'required'}],
                error:null,
                errmsg:null
            },
            'candidate':
            {
                'value':'',
                validation:[{'name':'required'}],
                error:null,
                errmsg:null
            }
        }
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
      alertGenerate = (description) => {
        notification.warning({
          message: "Failed",
          description,
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
      };

    changeDynamic = (data, key,editTrue) => {

        console.log(this.state.addcandidatedata.department.value,"deptId")
        console.log(this.state.addcandidatedata.Checklist.value,"deptId")
        console.log(this.state.addcandidatedata.candidate.value,"deptId")

        console.log("key", key);
        console.log("datadata", data);
        var addcandidatedata = this.state.addcandidatedata;
        var targetkeys = Object.keys(addcandidatedata);
        this.props.addCandidateDataEmpty()
        var errorcheck = ValidationLibrary.checkValidation(data, addcandidatedata[key].validation);
        if(data === "candidate"){
        addcandidatedata[key].value = data;
        }else{
        addcandidatedata[key].value = data;  
        }
        addcandidatedata[key].error = !errorcheck.state;
        addcandidatedata[key].errmsg = errorcheck.msg;
        this.setState({ addcandidatedata });
        var filtererr = targetkeys.filter((obj) =>
            addcandidatedata[obj].error == true || addcandidatedata[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false,
            })
        } else {
            if(editTrue){
                var deptId=key==="department" && data
                var CLId=key==="Checklist" && data
                var empId=key==="candidate" && data
            }else{
                var deptId=this.state.fulldepartmentvalue[this.state.addcandidatedata.department.value-1].id
                var CLId=this.state.fullchecklistvalue[this.state.addcandidatedata.Checklist.value-1].id
                var empId=this.state.fullemployeevalue[this.state.addcandidatedata.candidate.value-1].id
            }

            console.log(empId,"deptIdafter")



            var colorvaluearr=[]
            var InduIdvaluearr = []
            this.state.getInduction.map((data)=>{
                if(deptId===data.DeptId && CLId===data.CLId && empId===data.empId){
                    colorvaluearr.push(data.InduCLId.toString())
                    InduIdvaluearr.push(data)

                    console.log(data,"colorvaluearr")
                    this.setState({InductionFullValue:colorvaluearr,InduIdvaluearr:InduIdvaluearr})
                }
                else if(deptId!==data.DeptId || CLId!==data.CLId || empId!==data.empId){
                console.log(colorvaluearr,"colorvaluearr")
                colorvaluearr.push()
            }
        })
            console.log(colorvaluearr,"colorvaluearr")

            this.setState({colorchange:colorvaluearr})
            this.setState({ error: false })
        }
        if (this.state.addcandidatedata.Checklist.value != "") {
            this.setState({ checkListItem: true })
        }
    }
    callroot = () => {
        var addcandidatedata = this.state.addcandidatedata;
        var targetkeys = Object.keys(addcandidatedata);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(addcandidatedata[targetkeys[i]].value, addcandidatedata[targetkeys[i]].validation);
            console.log(errorcheck);
            addcandidatedata[targetkeys[i]].error = !errorcheck.state;
            addcandidatedata[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            addcandidatedata[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
            
        } else {
            this.setState({ error: false })
        }
        this.setState({ addcandidatedata })

        if(filtererr.length === 0){
            this.addCandidateInductionApi()
        }
    }

  
    parabox1 = (data,InduIdvaluearr) => {

        if (!this.state.colorchange.includes(data)) {
            var values = this.state.colorchange.push(data)
            let unique = [...new Set(this.state.colorchange)]
            console.log(InduIdvaluearr,"uniqueselect")
            console.log(this.props.addCandidateData,"props.addCandidateData")

            this.setState({checkItem:unique,insideloading:true})

            if(this.props.addCandidateData && this.props.addCandidateData.Candidatename){


            var empId = this.state.addcandidatedata.candidate.value

            console.log(empId,"empId")

            if(!Number(this.state.addcandidatedata.candidate.value)){
            var empId = this.state.responseEMPID.find((val) => {
            console.log(val,"empIdIIIIII")

                if(empId==val.Candidatename){
                return val.empId 
                }
            }
            )
            }

            console.log(empId,"empId")


            var CLId = this.state.addcandidatedata.Checklist.value

            if(!Number(this.state.addcandidatedata.Checklist.value)){
            var CLId = this.state.responseCLID.find((val) => {
                if(CLId==val.CLName){
                return val.CLId 
                }
            }
            )
            }

            var DeptId = this.state.addcandidatedata.department.value

            if(!Number(this.state.addcandidatedata.department.value)){
            var DeptId = this.state.responseDEPTID.find((val) => {
                if(DeptId==val.DeptName){
                return val.DeptId 
                }
            }
            )
            }
        }

            else{
                var self = this

                var DeptId=self.state.fulldepartmentvalue[self.state.addcandidatedata.department.value-1].id
                var CLId=self.state.fullchecklistvalue[self.state.addcandidatedata.Checklist.value-1].id
                var empId=self.state.fullemployeevalue[self.state.addcandidatedata.candidate.value-1].id
            }

            var self = this
            axios({
                method: 'post',
                url: `${apiurl}/masinduction`,
                data:{
                    "empId":!Number(this.state.addcandidatedata.candidate.value)?empId.empId:empId,

                    "Inductionchecklist":[{
                        "InduCLId":data
                    }],
                    "deptId":!Number(this.state.addcandidatedata.department.value)?DeptId.DeptId:DeptId,
                    "CLId":!Number(this.state.addcandidatedata.Checklist.value)?CLId.CLId:CLId,
                    }
            })
                .then(function (response) {
                    console.log(response.data.status, "responseinduction");
                    if(response.data.status == 0 ){
                        notification.success({
                            message: `Added Successfully`,
                            duration: 3.5,
                            placement: "topRight",
                          });
                       
                    }
            //         var deptId=self.state.fulldepartmentvalue[self.state.addcandidatedata.department.value-1].id
            // var CLId=self.state.fullchecklistvalue[self.state.addcandidatedata.Checklist.value-1].id
            // var empId=self.state.fullemployeevalue[self.state.addcandidatedata.candidate.value-1].id

        //     console.log(deptId,"deptId")
        //     console.log(CLId,"deptId")
        //     console.log(empId,"deptId")

        //     var colorvaluearr=[]
        //     var InduIdvaluearr = []
        //     self.state.getInduction.map((data)=>{
        //         if(deptId===data.DeptId && CLId===data.CLId && empId===data.EmpId){
        //             colorvaluearr.push(data.InduCLId.toString())
        //             InduIdvaluearr.push(data)

        //             console.log(data,"colorvaluearr")
        //             self.setState({InductionFullValue:colorvaluearr,InduIdvaluearr:InduIdvaluearr})
        //         }
        //         else if(deptId!==data.DeptId || CLId!==data.CLId || empId!==data.EmpId){
        //         console.log(colorvaluearr,"colorvaluearr")
        //         colorvaluearr.push()
        //     }
        // })
        //     console.log(colorvaluearr,"colorvaluearr")

            // self.setState({colorchange:colorvaluearr})
                    // self.state.colorchange.push(data)
                    // self.setState({InduIdvaluearr:})
                    self.callgetinduction()
                    self.setState({insideloading:false})
                    
                })
                .catch(function (error) {
                    console.log(error, "error");
                });
        } else {

            var indexChange = this.state.colorchange.indexOf(data)
            if (indexChange != -1) {
                this.state.colorchange.splice(indexChange, 1);
                let unique = [...new Set(this.state.colorchange)]
                console.log(InduIdvaluearr,"uniqueunselect")
                this.setState({checkItem:unique,insideloading:true})
            }


            var deletemasinduction = InduIdvaluearr.find((value)=>{
                if(value.InduCLId == data){
                    return value.InduId
                }

            })
            console.log(deletemasinduction, "deletemasinduction");


            var self = this
            axios({
                method: 'delete',
                url: `${apiurl}/deletemasinduction`,
                data:{
                    "Inductionchecklist":[{
                        "InduId":deletemasinduction.InduId,
                        "InduCLId":deletemasinduction.InduCLId
                    }]
                    }
                })
                .then(function (response) {
                    console.log(response, "responseinduction");
                    self.callgetinduction(true)
                    notification.success({
                        message: `Removed Successfully`,
                        duration: 3.5,
                        placement: "topRight",
                      });
                })
                .catch(function (error) {
                    console.log(error, "error");
                });
            
        }
    }

    addCandidateInductionApi = () => {
        var Inductionchecklist = this.state.colorchange !== null && this.state.colorchange.map(x=>{
            return{InduCLId:x}})
        var data = {
            empId:this.state.addcandidatedata.candidate.value,
            deptId:this.state.addcandidatedata.department.value,
            Inductionchecklist
        }
        this.props.dispatch(addCandidateInduction(data))
    }

    componentDidMount(){

        let editdata = this.props.addCandidateData
        console.log(editdata,"editdata")
        if(editdata.Candidatename){
            this.state.addcandidatedata.candidate.value=editdata.Candidatename
            this.state.addcandidatedata.department.value=editdata.DeptName
            this.state.addcandidatedata.Checklist.value=editdata.CLName
            this.changeDynamic(editdata.CLId, 'Checklist')

            this.setState({})
        }

        var self = this
        axios({
            method: 'get',
            url: `${apiurl}/listofdepartments`
        })
            .then(function (response) {
                var departmentarr=[]
                var fulldepartmentarr=[]
                response.data.data.map((data)=>{
                departmentarr.push(data.DeptName)
                fulldepartmentarr.push({name:data.DeptName,id:data.DeptId})
                })

                self.setState({departmentoption:departmentarr,fulldepartmentvalue:fulldepartmentarr,responseDEPTID:response.data.data})

            })
            .catch(function (error) {
                console.log(error, "error");
            });

        axios({
            method: 'get',
            url: `${apiurl}/checklist`
        })
            .then(function (response) {
                var checklistarr=[]
                var fullchecklistarr=[]
                response.data.data.map((data)=>{
                    checklistarr.push(data.CLName)
                    fullchecklistarr.push({name:data.CLName,id:data.CLId})
                })

                self.setState({checklistoption:checklistarr,fullchecklistvalue:fullchecklistarr,responseCLID:response.data.data})

            })
            .catch(function (error) {
                console.log(error, "error");
            });
            axios({
                method: 'get',
                url: `${apiurl}/candidatename`
            })
                .then(function (response) {
                    var employeearr=[]
                    var fullemployeevalue=[]
                    response.data.data.map((data)=>{
                        employeearr.push(data.Candidatename)
                        fullemployeevalue.push({name:data.Candidatename,id:data.empId})
                    })
    
                    self.setState({employeeoption:employeearr,fullemployeevalue:fullemployeevalue,responseEMPID:response.data.data})
    
                })
                .catch(function (error) {
                    console.log(error, "error");
                });  

        axios({
            method: 'get',
            url: `${apiurl}/getInduction`
        })
            .then(function (response) {
                var getInductionarr=[]

                self.setState({getInduction:response.data.data,getInductionId:getInductionarr})
                if(editdata.Candidatename){
                    let colorchange = []
                    let InduIdvaluearr = []

                    response.data.data.map((data)=>{
                        if(editdata.empId === data.empId){
                            colorchange.push(data.InduCLId.toString())
                            InduIdvaluearr.push(data)
                        }
                    })
                console.log(colorchange, "errorerrorerror");
                    self.changeDynamic(editdata.CLId, 'Checklist',true)
                    self.changeDynamic(editdata.DeptId, 'department',true)
                    self.changeDynamic(editdata.empId, 'candidate',true)
                    self.setState({colorchange,InduIdvaluearr})

                }

            })
            .catch(function (error) {
                console.log(error, "error");
            });              
    }

    callgetinduction=(opengetid)=>{


        var self = this

        axios({
            method: 'get',
            url: `${apiurl}/getInduction`
        })
            .then(function (response) {
                var getInductionarr=[]
                self.setState({getInduction:response.data.data,getInductionId:getInductionarr})
                if(opengetid){

                    var colorchangeafterget = []

                    response.data.data.map((getid)=>{
                        colorchangeafterget.push(getid.InduCLId.toString())
                    })

                    self.setState({insideloading:false})
                    // colorchange:colorchangeafterget,

                }
                else{
                    var deptId=self.state.fulldepartmentvalue[self.state.addcandidatedata.department.value-1].id
            var CLId=self.state.fullchecklistvalue[self.state.addcandidatedata.Checklist.value-1].id
            var empId=self.state.fullemployeevalue[self.state.addcandidatedata.candidate.value-1].id

            var colorvaluearr=[]
            var InduIdvaluearr = []
            response.data.data.map((data)=>{
                if(deptId===data.DeptId && CLId===data.CLId && empId===data.empId){
                    colorvaluearr.push(data.InduCLId.toString())
                    InduIdvaluearr.push(data)

                    console.log(data,"colorvaluearr")
                    self.setState({InductionFullValue:colorvaluearr,InduIdvaluearr:InduIdvaluearr})
                }
                else if(deptId!==data.DeptId || CLId!==data.CLId || empId!==data.empId){
                console.log(colorvaluearr,"colorvaluearr")
                colorvaluearr.push()
            }
        })
            console.log(colorvaluearr,"colorvaluearr")

            self.setState({colorchange:colorvaluearr,insideloading:false})
                }
          

            })
            .catch(function (error) {
                console.log(error, "error");
            });     

    }

    cancel=()=>{
        this.state.addcandidatedata.candidate.value=""
        this.state.addcandidatedata.candidate.error=null
        this.state.addcandidatedata.candidate.errmsg=null

        this.state.addcandidatedata.department.value=""
        this.state.addcandidatedata.department.error=null
        this.state.addcandidatedata.department.errmsg=null

        this.state.addcandidatedata.Checklist.value=""
        this.state.addcandidatedata.Checklist.error=null
        this.state.addcandidatedata.Checklist.errmsg=null

        this.state.checkListItem=""
        // this.setState({fulldepartmentvalue:"",fullchecklistvalue:"",fullemployeevalue:""})
        this.setState({})
    }



    render() {
        const { inductionCheckList,} = this.props;
        console.log(this.props,"unselectvalue")
        return (
            <React.Fragment>
                <div className="card induct_cardheight top_move">
                    <div className="card card-body">
                        <Grid container spacing={2}>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                    label="Candidate Name"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'candidate')}
                                    value={this.state.addcandidatedata.candidate.value}
                                    error={this.state.addcandidatedata.candidate.error}
                                    errmsg={this.state.addcandidatedata.candidate.errmsg}
                                    option={this.state.employeeoption}
                                    required
                                    // convertString
                                />
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} sm={5}>
                                <Dropdownantd
                                    label="Department"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'department')}
                                    value={this.state.addcandidatedata.department.value}
                                    error={this.state.addcandidatedata.department.error}
                                    errmsg={this.state.addcandidatedata.department.errmsg}
                                    option={this.state.departmentoption}
                                    required
                                />
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Checklist"
                                    className="w-100"
                                    changeData={(data) => this.changeDynamic(data, 'Checklist')}
                                    value={this.state.addcandidatedata.Checklist.value}
                                    error={this.state.addcandidatedata.Checklist.error}
                                    errmsg={this.state.addcandidatedata.Checklist.errmsg}
                                    option={this.state.checklistoption}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Spin spinning={this.state.insideloading}> 

                            {
                                inductionCheckList && this.state.checkListItem === true &&
                                <div className="card skillsdata-card-min-height mt-3">
                                    <div className="card-body">
                                        {
                                            inductionCheckList.map((val) => {
                                                console.log(this.state.colorchange, "last");
                                                console.log(val, "lasts");

                                                return (
                                                    <div type="checkbox"
                                                        onClick={() => this.parabox1(val.InduCLId.toString(),this.state.InduIdvaluearr)}
                                                        className={`${this.state.colorchange.includes(`${val.InduCLId}`) ? "candidatebutton" : "candidatebtnwhite"}`}
                                                    >
                                                        {val.InduCheckListItem}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                            }
                        </Spin>

                    </div>
                </div>
                {/* <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    // className="mt-5"
                    spacing={3}>
                    <Grid item >
                        <Button className="btnwidth btnclr" onClick={this.callroot}>Submit</Button>
                    </Grid>
                    <Grid item >
                        <Button className="btnwidth btnclr_outline" onClick={this.cancel}>Cancel</Button>
                    </Grid>

                </Grid> */}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    tags: state.resumeReducer.taglist
});
export default connect(mapStateToProps)(Addaddcandidatedata);