import React,{ Component } from 'react';
import { IoMdAdd } from 'react-icons/io';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../formcomponent/dropdownantd';
import DatePicker from '../../formcomponent/calenderbox';
import Inputantd from '../../formcomponent/inputnumberantd';
import Timepickerantd from '../../formcomponent/timepickerantd';
import Calenderbox from '../../formcomponent/calenderbox';

class AddHearing extends React.Component{
    render(){
        return(
            <div className="card card-min-height">   
            <div className="card card-body">   
                  <div>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <Inputantd label={"Case No"} className="w-100"> </Inputantd>
                            </Grid>

                            <Grid item xs={4}>
                                <Calenderbox label={"Date"} className="w-100"> </Calenderbox>
                            </Grid>

                            <Grid item xs={4}>
                                <Calenderbox label={"Case Type"} className="w-100"> </Calenderbox>
                            </Grid>

                            </Grid>
                        </div>

                        <div className="mt-4">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Dropdownantd label={"Petitioner/Respondent"} className="w-100"></Dropdownantd>
                                </Grid>
                                <Grid item xs={4}>
                                    <Dropdownantd label={"Advocate"} className="w-100"></Dropdownantd>
                                </Grid>
                                <Grid item xs={4}>
                                    <Dropdownantd label={"Versus"} className="w-100"></Dropdownantd>
                                </Grid>
                            </Grid>
                        </div>

                        <div className="mt-4">
                            <Grid container spacing={3}>
                                
                                <Grid item xs={4}>
                                    <Timepickerantd label={"Start Time"} className="w-100"></Timepickerantd>
                                </Grid>
                                <Grid item xs={4}>
                                    <Timepickerantd label={"End Time"} className="w-100"></Timepickerantd>
                                </Grid>
   
                                <Grid item xs={4}>
                                   <Calenderbox label={"Case Type"} className="w-100"></Calenderbox>
                                </Grid>
                               
                            </Grid>
                        </div>
                        <div className="mt-4">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <Timepickerantd placeholder={"Time"} className="w-100"></Timepickerantd>
                                </Grid>
                            </Grid>
                        </div>

                        <div class="btn-style">
                        <div className={"p-2"}>
                            <button type="button" class="btn btn-primary btn-lg btn-space">Save</button>
                        </div>

                        <div className={"p-2"}>
                            <button type="button" class="btn btn-warning btn-lg btn-space">Cancel</button>
                        </div>
                    </div>

                    </div>
                    </div>    
 
            </div>
        )
    }
}

export default AddHearing;
