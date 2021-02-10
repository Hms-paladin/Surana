import React from 'react';
import { Grid } from '@material-ui/core';
import Textareaantd from "../../../formcomponent/textareaantd";
import Calenderbox from '../../../formcomponent/calenderbox';
import Inputantd from '../../../formcomponent/inputantd';
// import './Achievement.css';
import Button from 'react-bootstrap/Button';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import ValidationLibrary from "../../../validationlibrary/validation.js"


class Addachievement extends React.Component {
    state = {
        errordummy:true,
        acheivementdata:
        {'employee_name':
        {'value':'',
        validation:[{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
      },
        'department':
        {'value':'',
        validation:[{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
        },
        'date':
        {'value':'',
        validation:[],
        error:null,
        errmsg:null
        },
        'acheivement':
        {'value':'',
        validation:[{'name':'required'},{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
        },
        'remarks':
        {'value':'',
        validation:[{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
        },
        'done_by':
        {'value':'',
        validation:[{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
        },
        'done_on':
        {'value':'',
        validation:[],
        error:null,
        errmsg:null
        },
        },
    };

checkValidation=()=>{
    var acheivementdata=this.state.acheivementdata;
    var targetkeys=Object.keys(acheivementdata);
    console.log(targetkeys);
    for(var i in targetkeys){
    var errorcheck=ValidationLibrary.checkValidation(acheivementdata[targetkeys[i]].value,acheivementdata[targetkeys[i]].validation);
    console.log(errorcheck);
    acheivementdata[targetkeys[i]].error=!errorcheck.state;
    acheivementdata[targetkeys[i]].errmsg=errorcheck.msg;
    }
    var filtererr=targetkeys.filter((obj)=>
    acheivementdata[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
    }else{
      this.setState({error:false})

    }
    this.setState({acheivementdata})
}
changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var acheivementdata=this.state.acheivementdata;
     var targetkeys=Object.keys(acheivementdata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,acheivementdata[key].validation);
       acheivementdata[key].value=data;
       acheivementdata[key].error=!errorcheck.state;
       acheivementdata[key].errmsg=errorcheck.msg;
        this.setState({acheivementdata});
         var filtererr=targetkeys.filter((obj)=>
         acheivementdata[obj].error==true || acheivementdata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }

  submitData = (e) => {
      alert("dds")
      e.preventDefault();
      console.log("eData",e)
  }
    render() {
        return (
            <div>
                <div className="card card-min-height top_move">
                    <div className="card-body">
                        <Grid container spacing={2}>
                        <Grid item md={3} sm={5}>
                                <Inputantd label={"Employee Name"}  className={"w-100"}
                                changeData={(data)=>this.changeDynamic(data,'employee_name')}
                                value={this.state.acheivementdata.employee_name.value}
                                error={this.state.acheivementdata.employee_name.error}
                                errmsg={this.state.acheivementdata.employee_name.errmsg}/>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={7} sm={5}>
                                <Dropdownantd label={"Department"} className={"w-100"}
                                option={["Bsc","BA"]}
                                changeData={(data)=>this.changeDynamic(data,'department')}
                                value={this.state.acheivementdata.department.value}
                                error={this.state.acheivementdata.department.error}
                                errmsg={this.state.acheivementdata.department.errmsg}/>
                              
                            </Grid>
                            <Grid item md={1}></Grid>

                            <Grid item md={3} sm={5}>
                                <Calenderbox label="Date"  className={"w-100"}
                                format={"DD-MM-YYYY"}
                                changeData={(data)=>this.changeDynamic(data,'date')}
                                value={this.state.acheivementdata.date.value}
                                error={this.state.acheivementdata.date.error}
                                errmsg={this.state.acheivementdata.date.errmsg}
                                />
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={7} sm={5}>
                                <Textareaantd label="Achievement"  className={"w-100"}
                                  changeData={(data)=>this.changeDynamic(data,'acheivement')}
                                  value={this.state.acheivementdata.acheivement.value}
                                  error={this.state.acheivementdata.acheivement.error}
                                  errmsg={this.state.acheivementdata.acheivement.errmsg}></Textareaantd>
                            </Grid>
                            <Grid item md={7} sm={5}>
                                <Textareaantd label="Remarks"  className={"w-100"}
                                changeData={(data)=>this.changeDynamic(data,'remarks')}
                                value={this.state.acheivementdata.remarks.value}
                                error={this.state.acheivementdata.remarks.error}
                                errmsg={this.state.acheivementdata.remarks.errmsg}/>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                              <Inputantd placeholder={"Done By"} className={"w-100"}
                              changeData={(data)=>this.changeDynamic(data,'done_by')}
                              value={this.state.acheivementdata.done_by.value}
                              error={this.state.acheivementdata.done_by.error}
                              errmsg={this.state.acheivementdata.done_by.errmsg}
                              />
                              <Calenderbox placeholder={"Done On"} className={"w-100"} format={"DD-MM-YYYY"}
                              changeData={(data)=>this.changeDynamic(data,'done_on')}
                              value={this.state.acheivementdata.done_on.value}
                              error={this.state.acheivementdata.done_on.error}
                              errmsg={this.state.acheivementdata.done_on.errmsg}
                             />
                            </Grid>
                           
                            

                            <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        className="gridbtnalign"
                         spacing={3}>
                        <Grid item >
                        <Button size="lg" className="btnmargin btnwidth btnclr"  onClick={()=>this.checkValidation()}>Save</Button>
                     </Grid>
                       <Grid item >
                            <Button size="lg" className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
               </Grid>


                        </Grid>
                    </div>
                </div>
            </div>
        )
    }
}
export default Addachievement;