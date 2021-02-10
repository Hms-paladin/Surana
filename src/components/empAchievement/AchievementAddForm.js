import React from 'react';
import {IoMdAdd} from 'react-icons/io';
import { Select, DatePicker, Input } from 'antd';
import Grid from '@material-ui/core/Grid';
import Button from 'react-bootstrap/Button' ;
import './EmployeeAchievement.css';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Textareaantd from '../../formcomponent/textareaantd';


const { TextArea } = Input;

class AchievementAddForm extends React.Component{
    render(){
        return(
            // <React.Fragment>
            //     <div className="">
            //         <div className="row">
            //             <div className="col-sm-12 col-md-3 mb-4">
            //             <Select
            //                 className="w-100"
            //                 placeholder="Department"
            //             >
            //             </Select>
            //             </div>
            //             <div className="col-1" />
            //             <div className="col-sm-12 col-md-8">
            //             <Select
            //                 className="w-100"
            //                 placeholder="Employee Name"
            //             >
            //             </Select>
            //             </div>
            //             <div className="col-sm-12 col-md-3 mt-4">
            //                 <DatePicker className="w-100" placeholder="Date"/>
            //             </div>
            //             <div className="col-1" />
            //             <div className="col-sm-12 col-md-8 mt-4">
            //                 <TextArea
            //                     placeholder="Achievement"
            //                     className="textareasize"
            //                     autosize={{ minRows: 3, maxRows: 5 }}
            //                 />
            //             </div>
            //             <div className=" col-sm-12 col-md-9 mt-4">
            //                 <TextArea
            //                     placeholder="Remarks"
            //                     className="textareasize"
            //                     autosize={{ minRows: 3, maxRows: 5 }}
            //                 />
            //             </div>
            //             <div className="col-sm-12 col-md-3 mt-4">
            //                 <DatePicker placeholder="Done By" className="mb-4 w-100"/>
            //                 <DatePicker placeholder="Done On" className="w-100" />
            //             </div>
            //         </div>
                    
            //     </div>
            //     <div className="parollbtn">
            //             <button className="btn btn-primary btn-lg mr-3">Generate Salary</button>
            //             <button className="btn btn-warning btn-lg">Cancel</button>
            //     </div>
            // </React.Fragment>
            <React.Fragment>
                   <div className="card top_move ">
                       <div className="card-body">
                        <div className="achievementcontent payrollcontentleftspace">
                            <div className="row">
                                <Grid container spacing={2}>
                                        <Grid item sm={5} md={3}>
                                            <Dropdownantd label={"Department"} className={"w-100"} option={["UI","React"]} />
                                        </Grid>
                                        <Grid md={1}/>
                                        <Grid item sm={5} md={3}>
                                            <Dropdownantd label={"Employee Name"} className={"w-100"} option={["Eswer","Pvk"]} />
                                        </Grid>
                                        <Grid md={1}/>
                                            <Grid item sm={5} md={3} spacing={3}>
                                                <Calenderbox label="Date" className={"w-100"}/>
                                            </Grid>
                                            <Grid md={1} />
                                            <Grid item sm={5} md={3}>
                                               <Calenderbox label="Done By" className="mb-4 w-100"/>
                                            </Grid>
                                            <Grid md={1} />
                                            <Grid item sm={5} md={3}>
                                               <Calenderbox label="Done On" className="w-100" />
                                            </Grid>
                                            <Grid md={3} />
                                            <Grid item sm={5} md={7}>
                                                <Textareaantd label={"Achievement"} className={"w-100"} option={["May","June"]} />
                                            </Grid>
                                            <Grid item sm={5} md={7}>
                                                <Textareaantd label={"Remarks"} className={"w-100"} option={["May","June"]} />
                                            </Grid>
                                </Grid>
                
                            </div> {/* Row Ends*/}

                            <div className="payrollbtn">
                                <button className="btn btn-primary btn-lg mr-2">Generate Salary</button>
                                <button className="btn btn-warning btn-lg">Cancel</button>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default AchievementAddForm;