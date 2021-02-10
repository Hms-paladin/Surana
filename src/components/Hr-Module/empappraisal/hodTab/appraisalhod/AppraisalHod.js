import React from 'react';
import '../../appraiseeUser/AppraiseeUser.css';
import Grid from '@material-ui/core/Grid'
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../../../formcomponent/inputantd';
import Dropdownantd from '../../../../../formcomponent/dropdownantd';
import Textareaantd from '../../../../../formcomponent/textareaantd';
import './AppraisalHod.css';

class AppraisalHod extends React.Component{
    render(){
        return(
            <React.Fragment>
            <div className="card">
                <div className="card-body">
 
{/* name */}
                    <Grid item md={4} sm={5} className="mt-3">
                        <Dropdownantd label="Name" className="w-100"></Dropdownantd>
                    </Grid>
                    <div style={{display:'flex' , marginTop:'10px'}}>
                    <div style={{marginRight:'28px'}}>
                        <p>DOB</p>
                        <p>31 jan 1992</p>
                    </div>
                    <div style={{marginRight:'28px'}}>
                        <p>DOJ</p>
                        <p>31 jan 1992</p>
                    </div>
                    <div style={{marginRight:'28px'}}>
                        <p>Department</p>
                        <p>Advocate</p>
                    </div>
                    </div>
{/* Qualiofication */}
                    <div className="newuser_border">
                        <div className="newUser_heading">Qualification</div>
                        <div className="scroll_user">
                        <Grid container spacing={1} className="mt-2">
                            <Grid item md={6} sm={6}>
                                  <p>Diploma in LLB</p>
                                  <p>Jurios Docor</p>
                                  <p>LLB HONS</p>
                            </Grid>
                            <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                     <p>31 Jan 2020</p> 
                                     <p>21 Dec 2020</p>  
                                     <p>09 Jan 2020</p> 
                                </Grid>
                        </Grid>
                        </div>
                    </div>
 {/*  Training*/}
                    <div className="newuser_border">
                        <div className="newUser_heading"> Training</div>
                        <div className="scroll_user">
                        <Grid container spacing={1} className="mt-2">
                            <Grid item md={6} sm={6}>
                               <p>BUSINESS AND MANAGEMENT AT LAW FIRMS</p>
                               <p>BUSINESS AND MANAGEMENT AT LAW FIRMS</p>
                            </Grid>
                            <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                     <p>05 jan 2020</p>
                                     <p>09 jan 2020</p>
                                </Grid>
                         </Grid>
                        </div>
                    </div>
{/* Seminar*/}
                    <div className="newuser_border">
                        <div className="newUser_heading"> Seminar</div>
                        <div className="scroll_user">
                        <Grid container spacing={1} className="mt-2">
                            <Grid item md={6} sm={6}>
                                <p>Buying & selling Eletric power</p>
                                <p>Buying & selling Eletric power</p>
                            </Grid>
                            <Grid item md={2}></Grid>
                                <Grid item md={3} sm={5}>
                                   <p>09 Feb 2020</p>
                                   <p>29 Feb 2020</p>
                                </Grid>
                        </Grid>
                        </div>
                    </div>
{/* specifications */}
                     < Grid container spacing={1} className="mt-2">
                            <Grid item md={12} sm={6}>
                            <div className="newuser_border_hod">
                            <div className="newUser_heading_hod"> Areas of Specialization</div>
                            </div>
                            </Grid>
                        </Grid>

{/* self work */}
                        < Grid container spacing={1} className="mt-2">
                            <Grid item md={12} sm={6}>
                            <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">Self work description(List out the details of works carreied and the frequency)</div>
                            </div>
                            </Grid>
                        </Grid>
{/* current duies */}
                        < Grid container spacing={1} className="mt-2">
                            <Grid item md={12} sm={6}>
                            <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">Out of the above, list out your current duties/work, which is your opinionm, are not your competency </div>
                            </div>
                            </Grid>
                        </Grid>
{/* majopr achievements */}
                        < Grid container spacing={1} className="mt-2">
                            <Grid item md={12} sm={6}>
                            <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">major Achievements in the review period </div>
                            </div>
                            </Grid>
                        </Grid>

{/*  Opinion */}
                             <h6 style={{marginTop:"15px",fontWeight:'bold',color: '#46469b'}}>In Employee's Opinion</h6>
                             <div style={{marginTop:'10px', marginBottom:'10px', fontSize:'14px'}}>Comfort level of your current job responsibilites</div>
                             <Grid container spacing={2}>
                                <Grid item md={4} sm={5}>
                                    <Inputantd placeholder="Adequate" className="w-100"></Inputantd>
                                </Grid>
                              </Grid>                                
                             <Grid item md={12} sm={12}>
                             <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">Urge to learn</div>
                            </div>
                             </Grid>
                             <Grid item md={12}  sm={12}>
                             <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">Do you feel any specific training is required to enhance your productivity? If so, please specify.</div>
                            </div>
                             </Grid>
                             <Grid item md={12}  sm={12}>
                             <div className="newuser_border_hod">
                            <div className="newUser_heading_hod">Suggestions, If any for improvement at SSIA</div>
                            </div>
                             </Grid>
                             {/* <div style={{fontSize:'17px'}}></div> */}
                             <Grid container spacing={2}>
                                <Grid item md={2} sm={5}  style={{marginTop:'31px'}}>
                                    <Inputantd  placeholder="yes" className="w-100 "></Inputantd>
                                </Grid>
                                <Grid item md={10} sm={5}>
                                <div className="newuser_border_hod">
                                     <div className="newUser_heading_hod"> Is your potential utilized fully in the current assignment</div>
                               </div>
                                </Grid>
                              </Grid> 
                              <Grid item md={12}  sm={12}>
                              <div className="newuser_border_hod">
                                     <div className="newUser_heading_hod"> Any other specific opinion /remarks</div>
                               </div>
                               
                             </Grid>
                          
                             <Grid container spacing={2}>
                                <Grid item md={2} sm={5} style={{marginTop:'31px'}} >
                                    <Inputantd placeholder="yes "className="w-100 mt-3"></Inputantd>
                                </Grid>
                                <Grid item md={10} sm={5}>
                                <div className="newuser_border_hod">
                                     <div className="newUser_heading_hod"> Spell out your growth plan for the next three years and five years</div>
                               </div>
                                </Grid>
                              </Grid>
                              <Grid item md={12}  sm={12} style={{marginTop:'15px'}}>
                                 <Textareaantd label="Your Feed back"></Textareaantd>
                             </Grid> 
                              <Grid container direction="row" justify="center"  alignItems="center"  className="mt-3" spacing={3}>
                                <Grid item >
                                   <Button className="btnwidth btnclr">Cancel</Button>
                                </Grid>
                                <Grid item >
                                   <Button className="btnwidth btnclr_outline">Next</Button>
                               </Grid>
                              </Grid>
                </div>

            </div>
        </React.Fragment>
            
        )
    }
}
export default AppraisalHod;