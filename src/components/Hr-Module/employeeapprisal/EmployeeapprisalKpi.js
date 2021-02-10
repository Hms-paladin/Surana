import React from 'react';
import './employeeapprisal.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../formcomponent/inputantd';
import ValidationLibrary from "../../../validationlibrary/validation.js";

class EmployeeapprisalKpi extends React.Component{
    state = {
        changeval:true,
        kpidata:
        {'qualification':
        {'value':'',
        validation:[{'name':''}],
        error:"",
        errmsg:null
      },
      'training':
        {'value':'',
        validation:[{'name':''}],
        error:null,
        errmsg:null
      },
      'achievement':
      {'value':'',
      validation:[{'name':'required'},{name:'alphaNumaricOnly'}],
      error:null,
      errmsg:null
    },
    'seminar':
        {'value':'',
        validation:[{name:'alphabetwithspace'}],
        error:null,
        errmsg:null
      },
    }
}

changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var kpidata=this.state.kpidata;
     var targetkeys=Object.keys(kpidata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,kpidata[key].validation);
        kpidata[key].value=data;
        kpidata[key].error=!errorcheck.state;
        kpidata[key].errmsg=errorcheck.msg;
        this.setState({kpidata});
         var filtererr=targetkeys.filter((obj)=>
        kpidata[obj].error==true || kpidata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }
    
      callroot=()=>{
        this.setState({changeval:false})
        
        var kpidata=this.state.kpidata;
        var targetkeys=Object.keys(kpidata);
        console.log(targetkeys);
        for(var i in targetkeys){
        var errorcheck=ValidationLibrary.checkValidation(kpidata[targetkeys[i]].value,kpidata[targetkeys[i]].validation);
        console.log(errorcheck);
        kpidata[targetkeys[i]].error=!errorcheck.state;
        kpidata[targetkeys[i]].errmsg=errorcheck.msg;
        }
        var filtererr=targetkeys.filter((obj)=>
          kpidata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
    
        }
        this.setState({kpidata})
    
        let changenext=[]
        let j=0
        for(j=0;j<targetkeys.length;j++){
          changenext.push(this.state.kpidata[targetkeys[j]].error)
        }
        
        let nextvalue=changenext.every( (val) => val === false )
    
        if(nextvalue===true){
          this.props.propFunc && this.props.propFunc(2)
        }
    
      }
    
      submitData = (e) => {
          e.preventDefault();
          console.log("eData",e)
      }
      componentDidMount(){
        //   alert("Hey")
      }
    render(){
        return(
            <div>
                <div>
                <h5  className="top_move " ><b>Employee Appraisal</b></h5>
                </div>
                <h5 className="ml-3 form-subheading">KPI</h5>
                <Card className="text-left">
                <div className="card custom-box">
                    <div className="flex mt-2 mb-1 ">
                        <div className="col-4 ">
                            Activity
                        </div>  
                        <div className="col-4">
                            Target
                        </div>
                        <div className="col-3 flex">
                            Achievement
                        </div>
                        <div className="col-1">
                        </div>
                        
                        </div>
                       
                </div>
                <Card.Body>
                    <Card.Text className="standard-font">
                    <div className="flex mt-1">
                        <div className="col-4">
                            Billable
                        </div>  
                        <div className="col-4">
                            70%
                        </div>
                        <div className="col-3">
                            63%
                        </div>
                        </div>

                        <div className="flex mt-3">
                        <div className="col-4 flex">
                            Practice Development
                        </div>  
                        <div className="col-4">
                            30%
                        </div>
                        <div className="col-3">
                            26%
                        </div>
                        </div>

                        <div className="flex mt-3">
                        <div className="col-4">
                        </div>
                        <div className="flex col-1 p-2 border_total ">
                            100%
                        </div>
                        <div className="col-3">
                            </div>
                        <div className="col-1 p-2 flex border_total">
                        89%
                        </div>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>

                <div className="mt-5">

                <h5 className="ml-3 form-subheading">OAP</h5>
                
                <Card className="text-left ">
                
                <Card.Body>
                    <Card.Text className="standard-font">
                        <div className="row">
                            <div className="col-md-4 col-sm-6 mt-3 lbl-mr">
                        <Inputantd label="Qualification" className="w-100"
                       changeData={(data)=>this.changeDynamic(data,'qualification')} 

                       value={this.state.kpidata.qualification.value} 
                       error={this.state.kpidata.qualification.error} 
                       errmsg={this.state.kpidata.qualification.errmsg}
                        />
                        
                        </div>

                        <div className="col-md-4 col-sm-6 mt-3 lbl-mr">
                        <Inputantd label="Trainings" className="w-100" 
                            changeData={(data)=>this.changeDynamic(data,'training')} 

                            value={this.state.kpidata.training.value} 
                            error={this.state.kpidata.training.error} 
                            errmsg={this.state.kpidata.training.errmsg}
                            />
                    
                        
                        </div>

                        <div className="col-md-4">
                        </div>

                            <div className="col-md-4 col-sm-6 mt-3 lbl-mr">
                        <Inputantd label="Achievement" className="w-100"
                          changeData={(data)=>this.changeDynamic(data,'achievement')} 

                          value={this.state.kpidata.achievement.value} 
                          error={this.state.kpidata.achievement.error} 
                          errmsg={this.state.kpidata.achievement.errmsg}
                          required
                     />
                        
                        </div>

                        <div className="col-md-4 col-sm-6 mt-3 lbl-mr">
                        <Inputantd label="Seminar" className="w-100"
                        changeData={(data)=>this.changeDynamic(data,'seminar')} 

                        value={this.state.kpidata.seminar.value} 
                        error={this.state.kpidata.seminar.error} 
                        errmsg={this.state.kpidata.seminar.errmsg}
                        />
                        </div>

                        <div className="flex col-md-4 position-top-btn">
                        <Button className="mt-5 mr-3 w-50 btnmargin btnwidth btnclr "  onClick={()=>this.callroot()}>Save</Button>
                        <Button className="mt-5 w-50 btnwidth btnclr_outline">Print</Button>
                        </div>

                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
            </div>    
        )
    }
} 


export default EmployeeapprisalKpi;