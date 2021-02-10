import React from 'react';
import Grid from '@material-ui/core/Grid';
import Inputantd from '../../formcomponent/inputantd';
import Textareaantd from '../../formcomponent/textareaantd';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Button from 'react-bootstrap/Button';

class AddIpab extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div className="card top_move">
            <div className="card-body">
               <Grid container spacing={3} className="">
               <Grid item md={3} sm={6} className="w-100">
                        <Inputantd label={"Client"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100">
                        <Inputantd label={"Mark"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                    <Dropdownantd label={"Class"} className={"w-100"}
                     option={["Class A","Class B"]} />
                    </Grid>
                    <Grid item md={3} sm={6} className="w-100  ">
                        <Inputantd label={"Appeal No"} className={"w-100"} />
                    </Grid>
                      <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100   ">
                        <Inputantd label={"App No of Opp"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100   ">
                        <Inputantd label={"Opposition No"} className={"w-100"} />
                    </Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Inputantd label={"Agent"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Inputantd label={"Other Side"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Calenderbox label={"Filed On"} className={"w-100"} />
                    </Grid>
                    
                    
                    <Grid item md={3} sm={6} className="w-100  ">
                        <Inputantd label={"Further status/Deadline"} className={"w-100"} />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="address w-100 ">
                        <Textareaantd  
                        className={"w-100 customresize "}
                        label="Details" />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="address w-100 ">
                        <Textareaantd  
                        className={"w-100 customresize "}
                        label="Status" />
                    </Grid>

                   </Grid>
                   <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        className="gridbtnalign"
                         spacing={3}>
                        <Grid item >
                        <Button size="lg" className="btnmargin btnwidth btnclr">Submit</Button>
                     </Grid>
                       <Grid item >
                  <Button size="lg" className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
            </Grid> 

                </div>
                </div>
            </React.Fragment>
        )
    }
}
export default AddIpab;