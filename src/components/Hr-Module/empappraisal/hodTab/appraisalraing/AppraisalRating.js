import React  from 'react';
import { Grid } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import './AppraisalRating.css';

class AppraisalRating extends React.Component{
    state={
        nextRate:false
    }

    appraisal_rate_nexFunc=()=>{
        this.setState({
            nextRate:! this.state.nextRate
        })
    }
    render(){
        return(
            <React.Fragment>
                <div className="card">
                    <div className="card-body">
            { this.state.nextRate===false ?
// false condition
                    <Grid container> 
                    <Grid item md={12} sm={12}>
                    <div className="appRating_box">
                        <div className="appRating_btnbox">
                            <span>Punctuality</span>
                        </div>
                        <Grid container spacing={1} style={{marginTop:'14px'}}>
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
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            className="mt-2"
                            spacing={3}>
                            {/* <Grid item >
                                <Button className="appRating_btnsize btnclr">Prev</Button>
                            </Grid> */}
                            <Grid item >
                                <Button className="appRating_btnsize btnclr" onClick={this.appraisal_rate_nexFunc}>Next</Button>
                            </Grid>
                        </Grid>
                    </div>
                    </Grid>
                    </Grid>
                    :

     // true condition 
<>
                      <Grid container> 
                        <Grid item md={12} sm={12}>
                        <div className="appRating_box">
                            <div className="appRating_btnbox_next">
                                <span>PR and ntworking for the firm</span>
                            </div>
                            <Grid container spacing={1} style={{marginTop:'14px'}}>
                                <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
                                    <Grid container>
                                        <Grid item md={12} sm={12}>
                                            <div className="appRating_para">
                                                <p style={{margin:'7px'}}>Unable to keep up with times and Requires constant reminderws to Complete the tasks</p>
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
                                        <p style={{margin:'7px'}}>Maintains the time and completes the Task with few reminders</p>
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
                                        <p style={{margin:'7px'}}>Always on time and completes the Tasks well and ahead of time.</p>
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
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-2"
                                spacing={3}>
                                <Grid item >
                                    <Button className="appRating_btnsize btnclr"  onClick={this.appraisal_rate_nexFunc}>Prev</Button>
                                </Grid>
                                {/* <Grid item >
                                    <Button className="appRating_btnsize btnclr" onClick={this.appraisal_rate_nexFunc}>Next</Button>
                                </Grid> */}
                            </Grid>
                        </div>
                        </Grid>
                    </Grid>
{/* button  */}
                         <Grid container direction="row" justify="center"  alignItems="center"  className="mt-3" spacing={3}>
                                <Grid item >
                                   <Button className="btnwidth btnclr">Cancel</Button>
                                </Grid>
                                <Grid item >
                                   <Button className="btnwidth btnclr_outline">Next</Button>
                               </Grid>
                              </Grid>
                              </>
            
        }
                 

                
                    </div>

                </div>
            </React.Fragment>
        )
    }
}
export default AppraisalRating;