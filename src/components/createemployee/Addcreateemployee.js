import React from 'react';
import { Grid } from '@material-ui/core';
import Inputnumberantd from '../../formcomponent/inputantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Button from 'react-bootstrap/Button';
import './createemployee.css'

class Addcreateemployee extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="card card-min-height top_move">
                    <div className="card card-body">
                    <Grid container spacing={2}>    
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Employee Name" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} sm={5}>
                                <Calenderbox label="Date of Joining" className="w-100"></Calenderbox>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Employee Role" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Employee Id" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={3} />
                            <Grid item md={10} sm={11}>
                                <label className="labelmodify">Personal Details:</label>
                            </Grid> 
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="First name" className="w-100">

                                </Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Last name" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Calenderbox label="DOB" className="w-100"></Calenderbox>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Education Level" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Email" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Mobile Number" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Secondary Contact" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Designation" className="w-100"></Dropdownantd >
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Dropdownantd  label="Department" className="w-100"></Dropdownantd >
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={10} sm={11}>
                                <label className="labelmodify">Bank Details:</label>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={7} sm={5}>
                                <Inputnumberantd label="Bank name" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Branch" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Account number" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item md={3} sm={5}>
                                <Dropdownantd label="Employee status" className="w-100"></Dropdownantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Official Mobile number" className="w-100" 
                                labelclass="empwrap"></Inputnumberantd>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Inputnumberantd label="Official Mail" className="w-100"></Inputnumberantd>
                            </Grid>
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-5"
                                spacing={3}>
                                <Grid item >
                                <Button className="btnwidth btnclr">Save</Button>
                                </Grid>
                                <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                        </Grid>

                    </Grid>
                    </Grid>        
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default Addcreateemployee;