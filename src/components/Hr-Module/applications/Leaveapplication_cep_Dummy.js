import React from "react";
import Card from 'react-bootstrap/Card';
import { DatePicker } from 'antd';
import Button from 'react-bootstrap/Button' ;
import Grid from "@material-ui/core/Grid";
import "./Application.css";

import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Textareaantd from '../../../formcomponent/textareaantd';
import Inputnumberantd from '../../../formcomponent/inputnumberantd';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { addCepLeave } from "./applyLeaveAction";



class Leaveapplication_cep extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      errordummy:true,
      leavecepdata:
      {'departments':
      {'value':'',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'professional_course':
      {'value':'',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'yearof_joining':
      {'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'NoOfexamdays':
      {'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
      'start_date':
      {'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
      'end_date':
      {'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'totaldaysofleave':
      {'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'address':{
      'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'reference':{
      'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'No_of_avail_leave':{
      'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    },
    'exam_date':{
      'value':'',
      validation:[{'name':'required'}],
      error:null,
      errmsg:null
    }
  },
};
  }

    

checkValidation=()=>{
    var mainvalue={}
    var leavecepdata=this.state.leavecepdata;
    var dutykeys=Object.keys(leavecepdata);
    console.log(dutykeys,"dutykeys");
    for(var i in dutykeys){
    var errorcheck=ValidationLibrary.checkValidation(leavecepdata[dutykeys[i]].value,leavecepdata[dutykeys[i]].validation);
    console.log(errorcheck,"errorcheck");
    leavecepdata[dutykeys[i]].error=!errorcheck.state;
    leavecepdata[dutykeys[i]].errmsg=errorcheck.msg;
    mainvalue[dutykeys[i]] =leavecepdata[dutykeys[i]].value
    }
    var filtererr=dutykeys.filter((obj)=>
      leavecepdata[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
    }else{
      this.setState({error:false})

    }
    this.setState({
      mainvalue,
      leavecepdata
    })
    if(filtererr.length === 0){
      // alert("Leave")
      var cepLeave = {
        leaveId:4,
        deptId:1,
        leaveavailed:1,
        professionalcourse:this.state.leavecepdata.professional_course.value,
        yearofjoining:this.state.leavecepdata.yearof_joining.value,
        NoOfexamdays:this.state.leavecepdata.NoOfexamdays.value,
        refdate:23,
        reference:this.state.leavecepdata.reference.value,
        NoOfOtherdays:2,
        totaldaysofleave:this.state.leavecepdata.totaldaysofleave.value,
        examdates:this.state.leavecepdata.exam_date.value
      }
      this.props.dispatch(addCepLeave(cepLeave))
    }   
}
changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var leavecepdata=this.state.leavecepdata;
     var dutykeys=Object.keys(leavecepdata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,leavecepdata[key].validation);
        leavecepdata[key].value=data;
        leavecepdata[key].error=!errorcheck.state;
        leavecepdata[key].errmsg=errorcheck.msg;
        this.setState({leavecepdata});
         var filtererr=dutykeys.filter((obj)=>
        leavecepdata[obj].error==true || leavecepdata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }

  
    render(){
      const { department } = this.props;
      console.log(department)
        return(
          <div className="card top_move">
          <div className="card-body">
              <Grid container spacing={6} className="text-left mt-2 mb-2">
            <Grid item md={4} sm={6} className="w-100">
            <Dropdownantd
                className={"w-100"}
                label="Department"
                option={department && department.map(val => [val.DeptName])}
                changeData={(data)=>this.changeDynamic(data,'departments')} 
                value={this.state.leavecepdata.departments.value} 
                error={this.state.leavecepdata.departments.error} 
                errmsg={this.state.leavecepdata.departments.errmsg}
                required
              />
              </Grid>
              <Grid item md={4} sm={6} className="w-100">
                <Inputantd
                  className={"w-100"}
                  label="Reference"
                  changeData={(data)=>this.changeDynamic(data,'reference')} 
                  value={this.state.leavecepdata.reference.value} 
                  error={this.state.leavecepdata.reference.error} 
                  errmsg={this.state.leavecepdata.reference.errmsg}
                />
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
            <Dropdownantd
                className={"w-100"}
                label="Professional course"
                option={["Msc","MCA","MBA","Phd"]}
                changeData={(data)=>this.changeDynamic(data,'professional_course')} 
                value={this.state.leavecepdata.professional_course.value} 
                error={this.state.leavecepdata.professional_course.error} 
                errmsg={this.state.leavecepdata.professional_course.errmsg}
                required
              />

            </Grid>
            <Grid item md={4} sm={6} className="w-100">
            <Calenderbox
                className={"w-100"}
                label="Year of joining"
                changeData={(data)=>this.changeDynamic(data,'yearof_joining')} 
                value={this.state.leavecepdata.yearof_joining.value} 
                error={this.state.leavecepdata.yearof_joining.error} 
                errmsg={this.state.leavecepdata.yearof_joining.errmsg}
              />

            </Grid>
            <Grid item md={4} sm={6} className="w-100">
                <Inputantd
                  className={"w-100"}
                  label="No.of exam days"
                  changeData={(data)=>this.changeDynamic(data,'NoOfexamdays')} 
                  value={this.state.leavecepdata.NoOfexamdays.value} 
                  error={this.state.leavecepdata.NoOfexamdays.error} 
                  errmsg={this.state.leavecepdata.NoOfexamdays.errmsg}
                />
              <span className="hint_font">(Other than arrears)</span>

            </Grid>
            <Grid item md={4} sm={6} className="w-100 card_date">
                {/* <Card className="leavecard" > */}
                  {/* <Card.Body> */}
                    <div className="flex labelhgt">
                      <label className="calenderantdstyle">
                        <Calenderbox placeholder=" Start Date" className="mr-2" format={"DD-MM-YYYY"}
                        changeData={(data)=>this.changeDynamic(data,'start_date')} 
                        value={this.state.leavecepdata.start_date.value} 
                        error={this.state.leavecepdata.start_date.error} 
                        errmsg={this.state.leavecepdata.start_date.errmsg}
                        />
                      </label>
                      <label className="calenderantdstyle">
                        <Calenderbox placeholder="End Date" className="" format={"DD-MM-YYYY"}
                        changeData={(data)=>this.changeDynamic(data,'end_date')} 
                        value={this.state.leavecepdata.end_date.value} 
                        error={this.state.leavecepdata.end_date.error} 
                        errmsg={this.state.leavecepdata.end_date.errmsg}
                        />
                      </label>
                    </div>
                  {/* </Card.Body> */}
                {/* </Card>  */}
                <span className="hint_font">(Managing partner's prior permission)</span>
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
            
            <Textareaantd className={"w-100"} label="Address & Phone No"
                changeData={(data)=>this.changeDynamic(data,'address')} 
                value={this.state.leavecepdata.address.value} 
                error={this.state.leavecepdata.address.error} 
                errmsg={this.state.leavecepdata.address.errmsg}
              />
              <span className="hint_font">( During absence )</span>

            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                  className={"w-100"}
                  label="No.of days"
                  changeData={(data)=>this.changeDynamic(data,'No_of_avail_leave')} 
                  value={this.state.leavecepdata.No_of_avail_leave.value} 
                  error={this.state.leavecepdata.No_of_avail_leave.error} 
                  errmsg={this.state.leavecepdata.No_of_avail_leave.errmsg}
                />
              <span className="hint_font">(Leave already availed this month)</span>
            </Grid>
            <Grid item md={4} sm={6} className="w-100">
              <Inputantd
                    className={"w-100"}
                    label="Total days of leave"
                    changeData={(data)=>this.changeDynamic(data,'totaldaysofleave')} 
                    value={this.state.leavecepdata.totaldaysofleave.value} 
                    error={this.state.leavecepdata.totaldaysofleave.error} 
                    errmsg={this.state.leavecepdata.totaldaysofleave.errmsg}
                  /> 
            </Grid>
              <Grid item md={4} sm={6}>
                    <Calenderbox 
                        label="Exam Date"
                        className="w-100"
                        format={"DD-MM-YYYY"}
                        changeData={(data)=>this.changeDynamic(data,'exam_date')} 
                        value={this.state.leavecepdata.exam_date.value} 
                        error={this.state.leavecepdata.exam_date.error} 
                        errmsg={this.state.leavecepdata.exam_date.errmsg}
                    />
              </Grid>            
          </Grid>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center" 
            className=""
            spacing={3}>
            <Grid item >
              <Button className="btnmargin btnwidth btnclr" onClick={()=>this.checkValidation()}>Save</Button>
            </Grid>
            <Grid item >
              <Button className="btnwidth btnclr_outline">Cancel</Button>
            </Grid>
          </Grid>
          </div>
            </div>
        )
    }
}

 

export default Leaveapplication_cep;