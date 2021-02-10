import React from 'react';
import Grid from '@material-ui/core/Grid';
import  Inputantd from '../../formcomponent/inputantd';
import Textareaantd from '../../formcomponent/textareaantd';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Button from 'react-bootstrap/Button';


class Addclient extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="card top_move">
                     <div className="card-body">
                    <Grid container spacing={2}>
                       <Grid item md={7} sm={10}>
                           <Inputantd label="Client Name" className="w-100"></Inputantd>
                       </Grid>
                       <Grid md={3}/>
                       <Grid md={3} sm={5} className="mt-3">
                           <Textareaantd label="Address 1*" className="w-100"/>
                       </Grid>
                       <Grid  md={1}/>
                       <Grid item md={3} sm={5} className="mt-2">
                           <Textareaantd label="Address 2" className="w-100"/>
                       </Grid>
                       <Grid md={1} sm={1}/>
                       <Grid md={3} sm={5} className="mt-3">
                           <Dropdownantd label="City" className="w-100"/>
                      </Grid>
                      <Grid item md={3} sm={5} className="mt-2">
                           <Dropdownantd label="State" className="w-100"/>
                      </Grid>
                      <Grid md={1}/>
                      <Grid item md={3} sm={5} className="mt-3">
                           <Dropdownantd label="Country" className="w-100"/>
                      </Grid>
                      <Grid md={1}/>
                      <Grid item md={3} sm={5} className="mt-3">
                           <Inputantd label="Phone No" className="w-100"></Inputantd>
                       </Grid>
                       <Grid item sm={12} md={12}>
                            <h6 className="form-subheading">Contact Person 1</h6>
                        </Grid>
                        <Grid item md={7} sm={5} className="mt-3">
                           <Inputantd label="Name" className="w-100"></Inputantd>
                       </Grid> 
                       <Grid md={1}/>
                       <Grid item md={3} sm={5} className="mt-3">
                           <Inputantd label="Email" className="w-100"></Inputantd>
                       </Grid>    
                       <Grid item md={3} sm={5} className="mt-3">
                           <Inputantd label="Designation" className="w-100"></Inputantd>
                       </Grid>    
                       <Grid md={1}/>
                       <Grid item md={3} sm={5} className="mt-3">
                           <Inputantd label="Phone No 1" className="w-100"></Inputantd>
                       </Grid>
                       <Grid md={1}/>
                       <Grid item md={3} sm={5} className="mt-3">
                           <Inputantd label="Phone No 2" className="w-100"></Inputantd>
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
export default Addclient;