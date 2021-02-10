import React from 'react';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Dropdownantd from "../../../../../formcomponent/dropdownantd";
import './ManagingRating.css'

class ManagingRating extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="card mt-3">
                    <div className="card-body">
                        <Grid container spacing={2} className="d-flex">
                        <Grid item md={4} sm={5}>
                            <Dropdownantd label="Appraisee Details" className="w-100"></Dropdownantd>
                        </Grid>
                        <div style={{marginRight:'30px', marginLeft:"40px", marginTop:"32px"}} >
                            <p>DOB</p>
                            <p>-</p>
                        </div>
                        <div style={{marginRight:'30px', marginTop:"32px"}} >
                            <p>DOJ</p>
                            <p>-</p>
                        </div>
                        <div style={{marginRight:'30px', marginTop:"32px"}} >
                            <p>Department</p>
                            <p>-</p>
                        </div>
                        <div style={{marginRight:'30px', marginTop:"32px"}} >
                            <p>Current Position</p>
                            <p>-</p>
                        </div>
                        <div style={{marginRight:'30px', marginTop:"22px"}} >
                        <Button className="btnwidth btnclr">View</Button>
                        </div>
                        </Grid>
                        <div className="newuser_border">
                            <div className="newUser_heading">HOD Rating </div>
     {/* punchuality */}
                       <div className="">
                       <div style={{display:'flex', paddingBottom:'14px', borderBottom:'1px solid'}}>
                           <Grid item md={2} sm={5} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Punctuality </Grid>
                           <Grid  item md={10} sm={5}>
                           <Grid container spacing={1} >
                            <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
                                <Grid container>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_para">
                                            <p>Unable to keep up with times and Requires constant reminderws to Complete the tasks</p>
                                        </div>
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">1</Button>
                                            <Button className="appRating_page">2</Button>
                                            <Button className="appRating_page">3</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>    
                            <Grid item md={1}></Grid>                            
                            <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}} >
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                <div className="appRating_para">
                                    <p>Maintains the time and completes the Task with few reminders</p>
                                </div>
                                </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">4</Button>
                                            <Button className="appRating_page">5</Button>
                                            <Button className="appRating_page">6</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={1}></Grid>  
                            <Grid item md={3} sm={12} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
                            <Grid container>
                                <Grid itemd md={12} sm={12}>
                                <div className="appRating_para">
                                    <p>Always on time and completes the Tasks well and ahead of time.</p>
                                </div>
                                </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">7</Button>
                                            <Button className="appRating_page">8</Button>
                                            <Button className="appRating_pageselect">9</Button>
                                            {/* <Button className="appRating_page">NA</Button> */}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>  
                            <Grid item md={1} sm={12} className="appRating_grid" style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                            <Grid container >                                      
                                <div className="appRating_paging">  
                                    <Button className="appRating_page">NA</Button>
                                </div>
                                
                                </Grid>
                            </Grid>                                                         
                        </Grid>
                           </Grid>
                        
                        </div> 
                       
{/*  communication*/}
                        <div style={{display:'flex', marginTop:'20px'}}>
                           <Grid item md={2} sm={5} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Communication </Grid>
                           <Grid  item md={10} sm={5}>
                           <Grid container spacing={1} >
                            <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
                                <Grid container>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_para">
                                            <p>Unable to keep up with times and Requires constant reminderws to Complete the tasks</p>
                                        </div>
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">1</Button>
                                            <Button className="appRating_page">2</Button>
                                            <Button className="appRating_page">3</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>    
                            <Grid item md={1}></Grid>                            
                            <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}} >
                            <Grid container>
                                <Grid item md={12} sm={12}>
                                <div className="appRating_para">
                                    <p>Maintains the time and completes the Task with few reminders</p>
                                </div>
                                </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">4</Button>
                                            <Button className="appRating_page">5</Button>
                                            <Button className="appRating_page">6</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={1}></Grid>  
                            <Grid item md={3} sm={12} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
                            <Grid container>
                                <Grid itemd md={12} sm={12}>
                                <div className="appRating_para">
                                    <p>Always on time and completes the Tasks well and ahead of time.</p>
                                </div>
                                </Grid>
                                    <Grid item md={12} sm={12}>
                                        <div className="appRating_paging">
                                            <Button className="appRating_page">7</Button>
                                            <Button className="appRating_page">8</Button>
                                            <Button className="appRating_pageselect">9</Button>
                                            {/* <Button className="appRating_page">NA</Button> */}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>  
                            <Grid item md={1} sm={12} className="appRating_grid" style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                            <Grid container >                                      
                                <div className="appRating_paging">  
                                    <Button className="appRating_page">NA</Button>
                                </div>
                                
                                </Grid>
                            </Grid>                                                         
                        </Grid>
                           </Grid>
                        
                        </div> 

                          </div>
                          
                   
                        </div>
                        <Grid container direction="row" justify="center"  alignItems="center"  className="mt-3" spacing={3}>
                               
                                <Grid item >
                                   <Button className="btnwidth btnclr_outline">Next</Button>
                               </Grid>
                              </Grid>
  
                        </div>
                      

                    {/* </div> */}

                </div>
            </React.Fragment>
        )
    }
}
export default ManagingRating;