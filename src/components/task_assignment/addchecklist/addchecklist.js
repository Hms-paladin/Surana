import React from "react";
import Dropdownantd from '../../../formcomponent/dropdownantd';
import "./addchecklist.css";
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from 'react-bootstrap/Button' ;
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';

import Inputantd from '../../../formcomponent/inputantd';

class Addchecklist extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            totalitem:[]
        };
      }

addlist=()=>{
    const listitem=[]

    listitem.push(...this.state.totalitem,
    <Grid container spacing={6}>
        <Grid item md={4} sm={4} className="w-100">
            <Inputantd className="w-100" placeholder="Checklist Task" />
        </Grid>
        <Grid item md={4} sm={4} className="w-100">
          <Dropdownantd className="w-100" placeholder="Frequency" />
        </Grid>
        <Grid item md={4} sm={4} className="w-100">
            <Dropdownantd className="w-100" placeholder="Priority" />
        </Grid>
    </Grid>
    )
    this.setState({
        totalitem:listitem
    })

    console.log((this.state.totalitem).length)
}
    
    render(){

        const addassignment =this.state.totalitem.map((item) =>item);

        return(
            <div >
            <Grid container spacing={6}>
            <Grid item md={11} sm={11} className="w-100 mt-4 flex mb-2">

                <span className="mr-4 mt_checklist ml-5" >Checklist Name:</span>
                <Dropdownantd className="w-100" divclass="flex w-100 mt-5" />

              </Grid>
            </Grid>
            <div className=" ml-5 mr-5 mt-5 card">
                <span className="task_font_checklist" style={{zindex:"1000"}}>Checklist items</span>
                <div className="card-body" style={{zindex:"10"}}>
            <Grid container spacing={6}>
            <Grid item md={4} sm={4} className="w-100">
            <Inputantd className="w-100" placeholder="Checklist Task" />
        </Grid>
        <Grid item md={4} sm={4} className="w-100">
          <Dropdownantd className="w-100" placeholder="Frequency" />
        </Grid>
        <Grid item md={3} sm={3} className="w-100">
            <Dropdownantd className="w-100" placeholder="Priority" />
        </Grid>
            <Grid item md={1} sm={1} className="w-100 mt-3">
            <AddCircleOutlineOutlinedIcon onClick={this.addlist} className="icon_size w-100"/>
            </Grid>

        </Grid>
        <div className="mt-3 mb-5">
            {addassignment}
            </div>
            </div>
            </div>
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
            </div>
            
        )
    }
}

export default Addchecklist;