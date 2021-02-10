import React from 'react';
import Grid from '@material-ui/core/Grid';
import Inputantd from '../../formcomponent/inputantd';
import Textareaantd from '../../formcomponent/textareaantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Button from 'react-bootstrap/Button';
import './Feedback.css';

class Addfeedback extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Grid container spacing={1} className="ml-1 mt-3" >
                    <Grid item md={3} sm={5} >
                        <Inputantd label={"Name"} className="w-100" ></Inputantd>
                    </Grid>
                    <Grid item md={1}/>
                    <Grid item md={3} sm={5}>
                        <Inputantd label={"Department"} className="w-100" ></Inputantd>
                    </Grid>
                    <Grid md={1}/>
                    <Grid item md={3} sm={5}>
                        <Inputantd label={"Subject"} className="w-100" ></Inputantd>
                    </Grid>
                </Grid>
                <div className="card mt-5" >
             <div className="card-body">
                        <Grid container spacing={2} className="top_move">
                            <Grid item md={11} sm={5}>
                                <Textareaantd label={"Details"} className="w-100"/>
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5} >
                                <Inputantd label={"Forward to"} className="w-100" />
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3}sm={5} >
                                <Inputantd label={"Forward Remarks"} className="w-100" />
                            </Grid>
                            <Grid item md={1}/>
                            <Grid item md={3} sm={5}>
                                <Calenderbox label={"Reply by date"} className="w-100" />
                            </Grid>

                            <Grid container
                                                           
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-5"
                                spacing={3}>
                                <Grid item >
                                <Button className=" btnclr feedback_left"  >Send</Button>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </div>
                </div>    
            </React.Fragment>

        )
    }
}
export default Addfeedback;