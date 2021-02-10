import React from "react";
import Dropdownantd from '../../../formcomponent/dropdownantd';
import "./AddAssignment.css";
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { Input } from 'antd';
import Button from 'react-bootstrap/Button' ;
import LocalOfferRoundedIcon from '@material-ui/icons/LocalOfferRounded';

import Inputantd from '../../../formcomponent/inputantd';
import Calenderbox from '../../../formcomponent/calenderbox';

class AddAssignment extends React.Component{


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
        <Grid item md={3} sm={4} className="w-100">

            <Inputantd className="w-100" placeholder="Task" />

          </Grid>
          <Grid item md={2} sm={4} className="w-100">

            <Inputantd className="w-100" labelclass="dis_none" placeholder="Effect Hours" />

            </Grid>
            <Grid item md={2} sm={4} className="w-100">

            <Calenderbox className="w-100" placeholder="ExpectedDate" />

            </Grid>
            <Grid item md={2} sm={4} className="w-100">
            <Dropdownantd className="w-100" placeholder="Priority" />
            </Grid>
            <Grid item md={3} sm={4} className="w-100 mt-4 flex">

            {/* <LocalOfferOutlinedIcon className="mr-3 localicon_size" /> */}
            <LocalOfferOutlinedIcon className="mr-3 localicon_size" />

            <Input className="w-100 inputantdstyle inputassignment_mt" placeholder="%" />

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
            <Grid item md={11} sm={11} className="w-100 mt-4 flex">

                <span className="mr-4 mt_employee ml-5"><b>Employee:</b></span>
                <Dropdownantd className="w-100" divclass="flex w-100 mt-5" />

              </Grid>
            </Grid>
            <div className=" ml-5 mr-5 mt-5 card">
                <span className="task_font">Task Assignment</span>
                <div className="card-body">
            <Grid container spacing={6}>
        <Grid item md={3} sm={4} className="w-100">

            <Inputantd className="w-100" placeholder="Task" />

          </Grid>
          <Grid item md={2} sm={4} className="w-100">

            <Inputantd className="w-100" labelclass="dis_none" placeholder="Effect Hours"/>

            </Grid>
            <Grid item md={2} sm={4} className="w-100">

            <Calenderbox className="w-100" placeholder="ExpectedDate" />

            </Grid>
            <Grid item md={2} sm={4} className="w-100">
            <Dropdownantd className="w-100" placeholder="Priority" />
            </Grid>
            <Grid item md={3} sm={4} className="w-100 mt-4 flex">

            {/* <LocalOfferOutlinedIcon className="mr-3 localicon_size" /> */}
            <LocalOfferRoundedIcon className="mr-3 localicon_size" />
            <Input className="w-100 inputantdstyle inputassignment_mt" placeholder="%" />
            <AddCircleOutlineOutlinedIcon onClick={this.addlist} className="ml-3 icon_size"/>
            </Grid>

        </Grid>
        <div className="mb-5 ">
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

export default AddAssignment;