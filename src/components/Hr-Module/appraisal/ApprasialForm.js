import React from 'react'
import Grid from '@material-ui/core/Grid'
import Textareaantd from '../../../formcomponent/textareaantd';
import Calenderbox from '../../../formcomponent/calenderbox';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import AddIcon from '@material-ui/icons/Add';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Inputantd from '../../../formcomponent/inputantd';


class AppraisalForm extends React.Component {
    state = {
        changeval:true,
        appraisaldata:
        {'name':
        {'value':'',
        validation:[{'name':'required'},{name:'alphabetsOnly'}],
        error:"",
        errmsg:null
      },
      'department':
      {'value':'',
      validation:[{'name':''}],
      error:null,
      errmsg:null
      },
      'joining':
       {'value':'',
       validation:[{'name':''}],
       error:null,
       errmsg:null
       },
      'dob':
        {'value':'',
        validation:[{'name':''}],
        error:null,
        errmsg:null
      },
    //   'joining':
    //   {'value':'',
    //   validation:[{'name':''}],
    //   error:null,
    //   errmsg:null
    // },
      
    }
}

changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data);   
    var appraisaldata=this.state.appraisaldata;
     var targetkeys=Object.keys(appraisaldata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,appraisaldata[key].validation);
        appraisaldata[key].value=data;
        appraisaldata[key].error=!errorcheck.state;
        appraisaldata[key].errmsg=errorcheck.msg;
        this.setState({appraisaldata});
         var filtererr=targetkeys.filter((obj)=>
        appraisaldata[obj].error==true || appraisaldata[obj].error==null );
        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
        }else{
            this.setState({error:false})
        }
  }
    
      callroot=()=>{
        this.setState({changeval:false})
        
        var appraisaldata=this.state.appraisaldata;
        var targetkeys=Object.keys(appraisaldata);
        console.log(targetkeys);
        for(var i in targetkeys){
        var errorcheck=ValidationLibrary.checkValidation(appraisaldata[targetkeys[i]].value,appraisaldata[targetkeys[i]].validation);
        console.log(errorcheck);
        appraisaldata[targetkeys[i]].error=!errorcheck.state;
        appraisaldata[targetkeys[i]].errmsg=errorcheck.msg;
        }
        var filtererr=targetkeys.filter((obj)=>
          appraisaldata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
    
        }
        this.setState({appraisaldata})
    
        let changenext=[]
        let j=0
        for(j=0;j<targetkeys.length;j++){
          changenext.push(this.state.appraisaldata[targetkeys[j]].error)
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

    render() {
        return (
            <React.Fragment>
                <div>
                    <Grid container spacing={6} className="mt-2">
                        <Grid item md={3} sm={6}>                            
                            <Inputantd label="Name" className="w-100"
                            changeData={(data)=>this.changeDynamic(data,'name')}
                            value={this.state.appraisaldata.name.value}
                            error={this.state.appraisaldata.name.error}
                            errmsg={this.state.appraisaldata.name.errmsg}
                            required/>
                            <Grid container>
                                <Grid item md={12} sm={4} className="mt-3" >
                                    <Calenderbox placeholder={"dd-mm-yyyy"} label="DOB" className="w-100" 
                                     changeData={(data)=>this.changeDynamic(data,'dob')} 
                                     value={this.state.appraisaldata.dob.value} 
                                     error={this.state.appraisaldata.dob.error} 
                                     errmsg={this.state.appraisaldata.dob.errmsg}
                                     required
                                    />
                                </Grid>
                                <Grid item md={2}/>

                            </Grid>
                        </Grid>
                        <Grid item md={3} sm={5}>
                            <Dropdownantd label="Department" className="w-100" />
                            <Grid container>
                                <Grid item md={12} sm={4} className="mt-3">
                                    <Calenderbox placeholder={"dd-mm-yyyy"} label="DOJ" className="w-100 "
                                    
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={5} sm={6}>
                            <Textareaantd label="Full Address" className="w-100" />
                        </Grid>

                        <Grid item md={12} sm={6} className="w-100 ">
                            <div>
                                <h6>Academic Qualification</h6>

                            </div>
                            {/* <AddIcon className="add_adjust" onClick={this.addDuty} /> */}
                            <div className="card top_move">
                                <div className="card-body">
                                      <div className="newExp_border">
                                      <div><AddCircleOutlineOutlinedIcon onClick={this.AddClick} className="newExp_addicon" /></div>
                                    <div className="flex">
                                        <Grid item md={2} sm={6} className="w-100">
                                            <Inputantd className="w-100" label="Degree/Diploma" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={1} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Year" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={3} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Institution" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={3} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Main Subjects" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={2} sm={6} className="w-100 ml-2">
                                            <Dropdownantd className="w-100" label="Joining" 
                                             changeData={(data)=>this.changeDynamic(data,'joining')} 
                                             value={this.state.appraisaldata.joining.value} 
                                             error={this.state.appraisaldata.joining.error} 
                                             errmsg={this.state.appraisaldata.joining.errmsg}
                                            />
                                        </Grid>
                                        <Grid item md={1} sm={2} className="mt-4">
                                            <AddIcon className="add_adjust" />
                                        </Grid>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={12} sm={6} className="w-100 ">
                            <div>
                                <h6>Trainings/Seminars Attended</h6>

                            </div>
                            {/* <AddIcon className="add_adjust" onClick={this.addDuty} /> */}
                            <div className="card top_move">
                                <div className="card-body">
                                      <div className="newExp_border">
                                      <div><AddCircleOutlineOutlinedIcon onClick={this.AddClick} className="newExp_addicon" /></div>
                                    <div className="flex">
                                        <Grid item md={2} sm={6} className="w-100">
                                            <Inputantd className="w-100" label="Date" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={1} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Program" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={3} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Conducted By " />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={3} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="Venue" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                        </Grid>
                                        <Grid item md={2} sm={6} className="w-100 ml-2">
                                            <Inputantd className="w-100" label="OPE Credit" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" />
                                            <Inputantd className="w-100" label="Total OPE Credit" />
                                        </Grid>

                                    </div>
                                </div>
                            </div>
                            </div>
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h6>Area of Specilization</h6>

                            </div>
                            {/* <AddIcon className="add_adjust" onClick={this.addDuty} /> */}
                            <div className="card top_move">
                                <div className="card-body">
                                      <div className="newExp_border">
                                      <div><AddCircleOutlineOutlinedIcon onClick={this.AddClick} className="newExp_addicon" /></div>
                
                                      <div className="flex">
                            <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" >       </Textareaantd>
                            </Grid>
                            </div>
                            </div>
                            </div>
                            </div>
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h6>Self work Description(List out the details of work carried and the frequency)</h6>

                            </div>
                            <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" />
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h6>Out of the above,list out your current duties/work,which is your opinion,are not your work competency  </h6>

                            </div>
                            <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" />
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h6>Major acheivements in review period</h6>

                            </div>
                            <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" />
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h5>In Your Opinion</h5>
                            </div>
                            <Grid item md={4} sm={6}>
                                <Dropdownantd className="w-100" label="Comfort level of your job responsibilities" />
                            </Grid>
                        </Grid>

                        <Grid item md={12} sm={6}>
                            <Textareaantd className="w-100" label="Urge to Learn" />
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <Textareaantd className="w-100" label="Do you feel any specific is required to enhance your productivity?If so,please specify." />
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <Textareaantd className="w-100" label="Suggestions,If any,for improvement of work-environment at SSIA" />
                        </Grid>
                        <Grid item md={12} sm={6}>
                            <div>
                                <h6>Is your potential utilized fully in the current assignment(Job Satisfaction)</h6>
                            </div>
                            <Grid container>
                            <Grid item md={2} sm={5}>
                                 <Dropdownantd className="w-100"  option={["Yes","No"]}  />
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={9} sm={6}>
                                <Textareaantd className="w-100"/>
                            </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" label="Any other specific opinion/remarks" />
                            </Grid>
                            <Grid item md={12} sm={6}>
                                <div>
                                <h6>Spell out your growth plan for the next three years and five years    </h6>
                                </div>
                                <Grid item md={12} sm={6}>
                                <Textareaantd className="w-100" label="3 Years"/>
                                <Textareaantd className="w-100" label="5 Years"/>
                                </Grid>
                            </Grid>

                            <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        className="gridbtnalign"
                         spacing={3}>
                        <Grid item >
                        <Button size="lg" className="btnmargin btnwidth btnclr"  onClick={()=>this.callroot()}>Submit</Button>
                     </Grid>     
               </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        )
    }
}
export default AppraisalForm;