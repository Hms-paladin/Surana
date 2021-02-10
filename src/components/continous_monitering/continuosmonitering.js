import React from "react";
import Button from 'react-bootstrap/Button' ;
import Grid from "@material-ui/core/Grid";
import "./continuosmonitering.css"

import Inputantd from '../../formcomponent/inputantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Textareaantd from '../../formcomponent/textareaantd';
import Card from 'react-bootstrap/Card';


class ContinuosMonitering extends React.Component{
    render(){
        return(
            <div className="top_move">
                <h5 ><b>Continuos Monitering</b></h5>
                <Grid container spacing={2} className="text-left mt-2 mb-2">
            <Grid item md={2} sm={6} className="w-100">
            <Inputantd
                  className={"w-100"}
                  label="Employee"
                />
              </Grid>
              <Grid item md={2} sm={6} className="w-100">
            <Calenderbox
                  className={"w-100"}
                  label="Period"
                />
              </Grid>
              <Grid item md={2} sm={6} className="w-100">
            <Calenderbox
                  className={"w-100"}
                  label="To"
                />
              </Grid>
              </Grid>
              <Card className="text-left">
                <div className="card custom-box">
                    <div className="flex mt-2 mb-1 ">
                        <div className="col-3 ">
                            KRA
                        </div>  
                        <div className="col-4 text-center">
                            Target
                        </div>
                        <div className="col-2 flex">
                            Achievement
                        </div>
                        <div className="col-2">
                        </div>
                        
                        </div>
                       
                </div>
                <Card.Body>
                    <Card.Text className="standard-font">
                    <div className="flex mt-1">
                        <div className="col-3">
                            Billable
                        </div>  
                        <div className="col-4 justify-spa-eve">
                            <span className="">70%</span>
                            <span className="">210</span>
                        </div>
                        <div className="col-2 ml-4">
                            63%
                        </div>
                        <div className="col-2 ">
                            <div className="continuos_circle_green"></div>
                        </div>
                        </div>

                        <div className="flex mt-3">
                        <div className="col-3 flex">
                            Practice developement
                        </div>  
                        <div className="col-4 justify-spa-eve">
                        <span className="">70%</span>
                            <span className="">60</span>
                        </div>
                        <div className="col-2 ml-4">
                            26%
                        </div>
                        <div className="col-2">
                        <div className="continuos_circle_yellow"></div>
                        </div>
                        </div>

                        <div className="flex mt-3">
                        <div className="col-3 flex">
                            Value Project
                        </div>  
                        <div className="col-4 justify-spa-eve">
                        <span className="">70%</span>
                            <span className="">60</span>
                        </div>
                        <div className="col-2 ml-4">
                            26%
                        </div>
                        <div className="col-2">
                        <div className="continuos_circle_red"></div>
                        </div>
                        </div>

                        <div className="flex mt-3">
                        <div className="col-4">
                        </div>
                        <div className="flex col-1 p-2 border_total">
                            100%
                        </div>
                        <div className="flex col-1 p-2 border_total ml-4">
                            100
                        </div>
                        <div className="col-1">
                            </div>
                        <div className="col-1 p-2 flex border_total">
                        100%
                        </div>
                        </div>
                    </Card.Text>
                </Card.Body>
                </Card>
                <div>
                <Grid container spacing={6} className="text-left mt-2">
                    <Grid item md={9} sm={6} className="w-100">
                        <Textareaantd label="Remarks" className="w-100"/>
                    </Grid>
                    <Grid item md={3} sm={6} className="w-100 flex continous_btn_mr">
                    <Button className="btnwidth btnclr mr-3">Save</Button>
                    <Button className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
                </Grid>
                </div>

            </div>
        )
    }
}

export default ContinuosMonitering;