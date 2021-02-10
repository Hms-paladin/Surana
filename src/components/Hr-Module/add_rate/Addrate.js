import React from 'react';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';


class Addrate extends React.Component{
    render(){
        return(
          <div className="card top_move">
          <div className="card-body">
            <Grid container spacing={2}>
                <Grid item md={3} sm={5}>
                  <Dropdownantd label={"Role"} className="w-100"/>
                </Grid>
                <Grid md={1}/>
                <Grid item md={3} sm={5}>
                  <Dropdownantd label={"Activity"} className="w-100"/>
                </Grid>
                <Grid md={1}/>
                <Grid item md={3} sm={5}>
                    <Inputantd label={"Billable"} className="w-100"/>
                </Grid>
                    <Grid item md={3} sm={5}>
                  <Dropdownantd label={"Rate/Hr"} className="w-100"/>
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
        )
    }
}
export default Addrate;