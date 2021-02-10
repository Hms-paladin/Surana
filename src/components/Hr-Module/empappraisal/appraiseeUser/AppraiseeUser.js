import React from 'react';
import './AppraiseeUser.css';
import Grid from '@material-ui/core/Grid'
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../../formcomponent/inputantd';
import Inputnumber from '../../../../formcomponent/inputnumberantd';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Calenderbox from "../../../../formcomponent/calenderbox";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DatePickerMui from '../../../../formcomponent/DatePickerMUI';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Textareaantd from '../../../../formcomponent/textareaantd';

class AppraiseeUser extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
                        <div className="appraisal_header_align"><h5>Appraisal</h5></div> 
    {/* Qualiofication */}
                        <div className="newuser_border">
                            <div className="newUser_heading"> Qualification</div>
                            <div><AddCircleOutlineOutlinedIcon  className="newUser_addicon" /></div>
                            <div className="scroll_user">
                            <Grid container spacing={1} className="mt-2">
                                <Grid item md={6} sm={6}>
                                    <Inputantd
                                        label="DEGREE/DIPLOMA"/>
                                        <Inputantd className="mt-3"></Inputantd>
                                        <Inputantd className="mt-3"></Inputantd>
                                </Grid>
                                <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                         <Calenderbox label="Date"  className="w-100"/>  
                                         <Calenderbox  className="w-100"/>  
                                         <Calenderbox   className="w-100"/>  
                                        </Grid>
                            </Grid>

                            </div>
                        </div>
     {/*  Training*/}
                        <div className="newuser_border">
                            <div className="newUser_heading"> Training</div>
                            <div><AddCircleOutlineOutlinedIcon  className="newUser_addicon" /></div>
                            <div className="scroll_user">
                            <Grid container spacing={1} className="mt-2">
                                <Grid item md={6} sm={6}>
                                    <Inputantd
                                        label="PROGRAM"/>
                                        <Inputantd className="mt-3"></Inputantd>
                                        <Inputantd className="mt-3"></Inputantd>
                                </Grid>
                                <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                         <Calenderbox label="Date"  className="w-100"/>  
                                         <Calenderbox  className="w-100"/>  
                                         <Calenderbox   className="w-100"/>  
                                        </Grid>
                            </Grid>

                            </div>
                        </div>
{/* Seminar*/}
                        <div className="newuser_border">
                            <div className="newUser_heading"> Seminar</div>
                            <div><AddCircleOutlineOutlinedIcon  className="newUser_addicon" /></div>
                            <div className="scroll_user">
                            <Grid container spacing={1} className="mt-2">
                                <Grid item md={6} sm={6}>
                                    <Inputantd
                                        label="Title"/>
                                        <Inputantd className="mt-3"></Inputantd>
                                        <Inputantd className="mt-3"></Inputantd>
                                </Grid>
                                <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                         <Calenderbox label="Date"  className="w-100"/>  
                                         <Calenderbox  className="w-100"/>  
                                         <Calenderbox   className="w-100"/>  
                                        </Grid>
                            </Grid>
                            </div>
                        </div>
    {/* specifications */}
                          < Grid container spacing={1} className="mt-2">
                                <Grid item md={12} sm={6}>
                                    <Textareaantd  label="Areas of Specialization "></Textareaantd>
                                </Grid>
                            </Grid>
                    
    {/* self work */}
                            < Grid container spacing={1} className="mt-2">
                                <Grid item md={12} sm={6}>
                                    <Textareaantd  label="Self work description(List out the details of works carreied and the frequency) "></Textareaantd>
                                </Grid>
                            </Grid>
{/* current duies */}
                            < Grid container spacing={1} className="mt-2">
                                <Grid item md={12} sm={6}>
                                    <Textareaantd  label="Out of the above, list out your current duties/work, which is your opinionm, are not your competency  "></Textareaantd>
                                </Grid>
                            </Grid>
{/* majopr achievements */}
                            < Grid container spacing={1} className="mt-2">
                                <Grid item md={12} sm={6}>
                                    <Textareaantd  label="major Achievements in the review period "></Textareaantd>
                                </Grid>
                            </Grid>

{/*  Opinion */}
                                 <h6 style={{marginTop:"15px",fontWeight:'bold'}}>In Your Opinion</h6>
                                 <div style={{marginTop:'10px', marginBottom:'10px', fontSize:'14px'}}>Comfort level of your current job responsibilites</div>
                                 <Grid container spacing={2}>
                                    <Grid item md={4} sm={5}>
                                        <Dropdownantd label="Adequate" className="w-100"></Dropdownantd>
                                    </Grid>
                                  </Grid>                                
                                 <Grid item md={12} sm={12}>
                                     <Textareaantd label="Urge to learn"></Textareaantd>
                                 </Grid>
                                 <Grid item md={12}  sm={12}>
                                     <Textareaantd label="Do you feel any specific training is required to enhance your productivity? If so, please specify."></Textareaantd>
                                 </Grid>
                                 <Grid item md={12}  sm={12}>
                                     <Textareaantd label="Suggestions, If any for improvement at SSIA"></Textareaantd>
                                 </Grid>
                                 <div style={{fontSize:'17px'}}> Is your potential utilized fully in the current assignment</div>
                                 <Grid container spacing={2}>
                                    <Grid item md={2} sm={5}>
                                        <Dropdownantd label="" className="w-100 mt-3"></Dropdownantd>
                                    </Grid>
                                    <Grid item md={10} sm={5}>
                                        <Textareaantd  className="w-100 mt-3" ></Textareaantd>
                                    </Grid>
                                  </Grid> 
                                  <Grid item md={12}  sm={12}>
                                     <Textareaantd label="Any other specific opinion /remarks"></Textareaantd>
                                 </Grid>
                                 <div style={{fontSize:'17px'}}>Spell out your growth plan for the next three years and five years</div>
                                 <Grid container spacing={2}>
                                    <Grid item md={2} sm={5}>
                                        <Dropdownantd label="" className="w-100 mt-3"></Dropdownantd>
                                    </Grid>
                                    <Grid item md={10} sm={5}>
                                        <Textareaantd  className="w-100 mt-3" ></Textareaantd>
                                    </Grid>
                                  </Grid> 
                                  <Grid container direction="row" justify="center"  alignItems="center"  className="mt-3" spacing={3}>
                                    <Grid item >
                                       <Button className="btnwidth btnclr">Save</Button>
                                    </Grid>
                                    <Grid item >
                                       <Button className="btnwidth btnclr_outline">Cancel</Button>
                                   </Grid>
                                  </Grid>
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default AppraiseeUser;