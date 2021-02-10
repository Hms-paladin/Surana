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
                                   <Button className="btnwidth btnclr_outline"  >Next</Button>
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






















// import React from 'react';
// import { Grid } from '@material-ui/core';
// import Button from 'react-bootstrap/Button';
// import Dropdownantd from "../../../../../formcomponent/dropdownantd";
// import './ManagingRating.css'

// class ManagingRating extends React.Component{

//     state = {
//         license: [],
//         educationDetails: [],
//         inputVisible: false,
//         inputValue: '',
//         errordummy: true,
//         educationData:
//         {
//             'InstitutionName':
//             {
//                 'value': '',
//                 validation: [{ 'name': 'required' }],
//                 error: null,
//                 errmsg: null
//             },
//             'QualifyId':
//             {
//                 'value': '',
//                 validation: [{ 'name': 'required' }],
//                 error: null,
//                 errmsg: null
//             },
//             'yearofpassing':
//             {
//                 'value': '',
//                 validation: [],
//                 error: null,
//                 errmsg: null
//             },
//             'percentage': {
//                 'value': '',
//                 validation: [{ 'name': 'required' }],
//                 error: null,
//                 errmsg: null
//             },
//             'certNo': {
//                 'value': '',
//                 validation: [{ 'name': 'required' }, { 'name': 'alphaNumaricOnly' }],
//                 error: null,
//                 errmsg: null
//             },
//             'licenseName': {
//                 'value': '',
//                 validation: [{ 'name': '' }],
//                 error: null,
//                 errmsg: null
//             },
//             'licenseNumber': {
//                 'value': '',
//                 validation: [{ 'name': 'alphaNumaricOnly' }],
//                 error: null,
//                 errmsg: null
//             }
//         },
//     }

    
//     changeDynamic = (data, key) => {
//         console.log("key", key);
//         console.log("data", data);
//         var educationData = this.state.educationData;
//         var targetkeys = Object.keys(educationData);
//         var errorcheck = ValidationLibrary.checkValidation(data, educationData[key].validation);
//         educationData[key].value = data;
//         educationData[key].error = !errorcheck.state;
//         educationData[key].errmsg = errorcheck.msg;
//         this.setState({ educationData });
//         var filtererr = targetkeys.filter((obj) =>
//             educationData[obj].error == true || educationData[obj].error == null);
//         if (filtererr.length > 0) {
//             this.setState({
//                 error: true,
//                 errordummy: false
//             })
//         } else {
//             this.setState({ error: false })
//         }
//     }

//     addEducation = (addTrue) => {
//         // alert(addTrue)
//         // alert(this.props.resumeId)
//         this.setState({ error: true })
//         var educationData = this.state.educationData;
//         var targetkeys = Object.keys(educationData);

//         console.log(targetkeys);

//         for (var i in targetkeys) {
//             var errorcheck = ValidationLibrary.checkValidation(educationData[targetkeys[i]].value, educationData[targetkeys[i]].validation);
//             console.log(errorcheck);
//             educationData[targetkeys[i]].error = !errorcheck.state;
//             educationData[targetkeys[i]].errmsg = errorcheck.msg;
//         }
//         var filtererr = targetkeys.filter((obj) =>
//             educationData[obj].error == true);
//         console.log(filtererr.length)
//         if (filtererr.length > 0) {
//             this.setState({ error: true })
//         } else {
//             this.setState({ error: false })

//         }
//         this.setState({ educationData })

//         this.setState({ editEducation: false })
//         var educationKeys = Object.keys(this.state.educationData).slice(0, 5)
//         var educationValues = Object.values(this.state.educationData)
//         var educationData = [];
//         educationValues.map((val) => {
//             return (
//                 educationData.push(val.value)
//             )
//         })
//         console.log(this.state.educationData)
//         var arr1 = {}
//         for (var i in educationKeys) {
//             arr1[educationKeys[i]] = educationData[i]
//         }
//         arr1.resId = this.props.resumeId; // props coming from CreateResume.js
//         arr1.license = this.state.license;
//         // arr1.license = this.state.tags.toString(); // to send data as comma seperate
//         // if(this.props.educationId.length > 0){
//         //     arr1.resqualifyId=this.props.educationId[0].insertId
//         // }
//         console.log(arr1, "myeducationDetails")


//         this.setState({})


//         if (filtererr.length === 0) { // Add ApI
//             this.state.educationDetails.push(arr1)
//             this.state.license = [];
//             this.setState({})
//             if (this.props.edit === false && addTrue) {
//                 this.addEducationAPI()
//                 this.props.dispatch(educationTab(this.state.educationDetails), () => {
//                     for (var i in educationKeys) {
//                         this.state.educationData[educationKeys[i]].value = ""
//                     }
//                     this.state.license = [];
//                 });
//             }

//             if (this.props.edit === true) {
//                 this.state.educationDetails[0].resqualifyId = this.props.resumeEditData[0].Education.length > 0 ? this.props.resumeEditData[0].Education[this.props.editTabIndex].ResQualifId : ''
//                 this.state.educationDetails[0].resId = this.props.resumeEditData[0].ResId
//                 this.updateEducationAPI()
//                 this.props.dispatch(educationTab(this.state.educationDetails), () => {
//                     for (var i in educationKeys) {
//                         this.state.educationData[educationKeys[i]].value = ""
//                     }
//                 });
//             }

//             if (addTrue === undefined) {
//                 this.props.dispatch(educationTab(this.state.educationDetails), () => {
//                     for (var i in educationKeys) {
//                         this.state.educationData[educationKeys[i]].value = ""
//                     }
//                     this.state.license = [];
//                 });
//                 for (var i in educationKeys) {
//                     this.state.educationData[educationKeys[i]].value = ""
//                 }
//             }
//         }
//     }

  
//     render(){
//         return(
//             <React.Fragment>
//                 <div className="card mt-3">
//                     <div className="card-body">
//                         <Grid container spacing={2} className="d-flex">
//                         <Grid item md={4} sm={5}>
//                             <Dropdownantd label="Appraisee Details" className="w-100"></Dropdownantd>
//                         </Grid>
//                         <div style={{marginRight:'30px', marginLeft:"40px", marginTop:"32px"}} >
//                             <p>DOB</p>
//                             <p>-</p>
//                         </div>
//                         <div style={{marginRight:'30px', marginTop:"32px"}} >
//                             <p>DOJ</p>
//                             <p>-</p>
//                         </div>
//                         <div style={{marginRight:'30px', marginTop:"32px"}} >
//                             <p>Department</p>
//                             <p>-</p>
//                         </div>
//                         <div style={{marginRight:'30px', marginTop:"32px"}} >
//                             <p>Current Position</p>
//                             <p>-</p>
//                         </div>
//                         <div style={{marginRight:'30px', marginTop:"22px"}} >
//                         <Button className="btnwidth btnclr">View</Button>
//                         </div>
//                         </Grid>
//                         <div className="newuser_border">
//                             <div className="newUser_heading">HOD Rating </div>
//      {/* punchuality */}
//                        <div className="">
//                        <div style={{display:'flex', paddingBottom:'14px', borderBottom:'1px solid'}}>
//                            <Grid item md={2} sm={5} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Punctuality </Grid>
//                            <Grid  item md={10} sm={5}>
//                            <Grid container spacing={1} >
//                             <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
//                                 <Grid container>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_para">
//                                             <p>Unable to keep up with times and Requires constant reminderws to Complete the tasks</p>
//                                         </div>
//                                     </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">1</Button>
//                                             <Button className="appRating_page">2</Button>
//                                             <Button className="appRating_page">3</Button>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>    
//                             <Grid item md={1}></Grid>                            
//                             <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}} >
//                             <Grid container>
//                                 <Grid item md={12} sm={12}>
//                                 <div className="appRating_para">
//                                     <p>Maintains the time and completes the Task with few reminders</p>
//                                 </div>
//                                 </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">4</Button>
//                                             <Button className="appRating_page">5</Button>
//                                             <Button className="appRating_page">6</Button>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item md={1}></Grid>  
//                             <Grid item md={3} sm={12} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
//                             <Grid container>
//                                 <Grid itemd md={12} sm={12}>
//                                 <div className="appRating_para">
//                                     <p>Always on time and completes the Tasks well and ahead of time.</p>
//                                 </div>
//                                 </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">7</Button>
//                                             <Button className="appRating_page">8</Button>
//                                             <Button className="appRating_pageselect">9</Button>
//                                             {/* <Button className="appRating_page">NA</Button> */}
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>  
//                             <Grid item md={1} sm={12} className="appRating_grid" style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
//                             <Grid container >                                      
//                                 <div className="appRating_paging">  
//                                     <Button className="appRating_page">NA</Button>
//                                 </div>
                                
//                                 </Grid>
//                             </Grid>                                                         
//                         </Grid>
//                            </Grid>
                        
//                         </div> 
                       
// {/*  communication*/}
//                         <div style={{display:'flex', marginTop:'20px'}}>
//                            <Grid item md={2} sm={5} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>Communication </Grid>
//                            <Grid  item md={10} sm={5}>
//                            <Grid container spacing={1} >
//                             <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
//                                 <Grid container>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_para">
//                                             <p>Unable to keep up with times and Requires constant reminderws to Complete the tasks</p>
//                                         </div>
//                                     </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">1</Button>
//                                             <Button className="appRating_page">2</Button>
//                                             <Button className="appRating_page">3</Button>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>    
//                             <Grid item md={1}></Grid>                            
//                             <Grid item md={3} sm={6} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}} >
//                             <Grid container>
//                                 <Grid item md={12} sm={12}>
//                                 <div className="appRating_para">
//                                     <p>Maintains the time and completes the Task with few reminders</p>
//                                 </div>
//                                 </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">4</Button>
//                                             <Button className="appRating_page">5</Button>
//                                             <Button className="appRating_page">6</Button>
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                             <Grid item md={1}></Grid>  
//                             <Grid item md={3} sm={12} className="appRating_grid" style={{background:'lightgray', borderRadius:'20px'}}>
//                             <Grid container>
//                                 <Grid itemd md={12} sm={12}>
//                                 <div className="appRating_para">
//                                     <p>Always on time and completes the Tasks well and ahead of time.</p>
//                                 </div>
//                                 </Grid>
//                                     <Grid item md={12} sm={12}>
//                                         <div className="appRating_paging">
//                                             <Button className="appRating_page">7</Button>
//                                             <Button className="appRating_page">8</Button>
//                                             <Button className="appRating_pageselect">9</Button>
//                                             {/* <Button className="appRating_page">NA</Button> */}
//                                         </div>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>  
//                             <Grid item md={1} sm={12} className="appRating_grid" style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
//                             <Grid container >                                      
//                                 <div className="appRating_paging">  
//                                     <Button className="appRating_page">NA</Button>
//                                 </div>
                                
//                                 </Grid>
//                             </Grid>                                                         
//                         </Grid>
//                            </Grid>
                        
//                         </div> 

//                           </div>
                          
                   
//                         </div>
//                         <Grid container direction="row" justify="center"  alignItems="center"  className="mt-3" spacing={3}>
                               
//                                 <Grid item >
//                                    <Button className="btnwidth btnclr_outline" onClick={this.nextHod_review}>Next</Button>
//                                </Grid>
//                               </Grid>
  
//                         </div>
                      

//                     {/* </div> */}

//                 </div>
//             </React.Fragment>
//         )
//     }
// }
// export default ManagingRating;
