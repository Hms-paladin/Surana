import React from 'react';
import { Grid } from '@material-ui/core';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Button from 'react-bootstrap/Button';
import Inputnumberantd from '../../formcomponent/inputnumberantd';
import './Addrating.css';

class Addrating extends React.Component {
    render() {
        return (

            <div className="card top_move">
            <div className="card-body">
                    <Grid container spacing={2} className="mt-2">

                        <Grid item md={3} sm={5}>
                            <Dropdownantd label="Employee Name" className="w-100" ></Dropdownantd>
                        </Grid>

                        <Grid md={1} sm={2}></Grid>

                        <Grid item md={3} sm={5}>
                            <Dropdownantd label="Task Assigned" className="w-100"></Dropdownantd>
                        </Grid>

                        <Grid md={1} ></Grid>

                        <Grid item md={3} sm={5}>
                            <Calenderbox label=" Date of Completion" className="w-100" ></Calenderbox>
                        </Grid>
                        <Grid md={1} sm={2}></Grid>

                        <Grid item md={3} sm={5}>
                            <Calenderbox label="Actual Date of Completion" className="w-100" labelclass="rate_wrap"></Calenderbox>
                        </Grid>

                        <Grid md={1}></Grid>

                        <Grid item md={3} sm={5}>
                            <Inputnumberantd label="Completion Early/Extended" className="w-100" labelclass="rate_wrap"></Inputnumberantd>
                        </Grid>

                        <Grid md={1} sm={2}></Grid>


                        <Grid item md={3} sm={5} >
                            <Inputnumberantd label="Rate" className="w-100" ></Inputnumberantd>
                        </Grid>

                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-5"
                            spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr">Update</Button>
                            </Grid>
                            <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </div >


        )
    }
}
export default Addrating;