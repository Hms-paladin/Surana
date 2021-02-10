import React from 'react';
import { Grid } from '@material-ui/core';
import Inputantd from "../../formcomponent/inputantd";
import Dropdown from "../../formcomponent/dropdownantd";
import Calenderbox from "../../formcomponent/calenderbox";
import './Addquiz.css';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

class Addquiz extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="" >

                    <Grid container spacing={3} className="mb-5 ml-1">
                        <Grid md={2} sm={5}>
                            <Inputantd label={"Tittle"} labelclass="mt-3"></Inputantd>
                        </Grid>

                        <Grid md={1} sm={1}></Grid>

                        <Grid md={2} sm={5}>
                            <Dropdown label={"No.of Questions"} labelclass="mt-3"
                                className="w-100"></Dropdown>
                        </Grid>

                        <Grid md={1} sm={1} ></Grid>

                        <Grid md={2} sm={5}  >
                            <Calenderbox label={"Start Date"}
                                className="w-100" labelclass="mt-3"></Calenderbox  >
                        </Grid>

                        <Grid md={1} sm={1}></Grid>

                        <Grid md={2} sm={5}>
                            <Calenderbox label={"End Date"}
                                className="w-100" labelclass="mt-3"></Calenderbox >
                        </Grid>

                    </Grid>


                    <div className="card top_move">
                        <div className="card-body">
                            <Grid container spacing={3} className="mt-3">
                                <Grid item md={9} sm={5} className="w-100">
                                    <Inputantd label={"1.Question"} className={"w-100"} />
                                </Grid>
                                <Grid md={2} />
                                <Grid item md={4} sm={5} className="mt-2" >
                                    <Dropdown label={"Answer Type"} className="w-100"></Dropdown>
                                </Grid>
                                <Grid md={6} />
                                <Grid item md={4} sm={5}>
                                    <Inputantd label={"Option 1"}></Inputantd>
                                </Grid>
                                <Grid md={1} />
                                <Grid item md={4} sm={5} >
                                    <Inputantd label={"Option 2"}></Inputantd>
                                </Grid>
                                <Grid item md={4} sm={5} >
                                    <Inputantd label={"Option 3"}></Inputantd>
                                </Grid>
                                <Grid md={1} />
                                <Grid item md={4} sm={5} >
                                    <Inputantd label={"Option 4"}></Inputantd>
                                </Grid>
                            </Grid>
                            <div className="move_quizz">
                                <button><ArrowBackIosRoundedIcon type="left" /></button>
                                <button className="btn_color_quizz ml-2"><ArrowForwardIosRoundedIcon type="right" /></button>
                            </div>





                        </div>
                    </div>

                </div >
            </React.Fragment >
        )
    }
}
export default Addquiz; 