import React from 'react';
import { Grid } from '@material-ui/core';
import Inputantd from "../../formcomponent/inputantd";
import Calenderbox from '../../formcomponent/calenderbox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from 'react-bootstrap/Button';
import './Addpolls.css';

class Addpolls extends React.Component {

    state = {
        inputlist: []
    }

    plus_loop = () => {
        var inputstore = []
        inputstore.push(...this.state.inputlist,
            < div >
                <Inputantd className="w-100"></Inputantd>
            </div >
        )
        this.setState({
            inputlist: inputstore
        })
        console.log(this.state.inputlist)
    }



    render() {
        const inputbox = this.state.inputlist.map((box) => box)
        return (
            <div>
                <Grid container spacing={3} className="mt-3" >
                    <Grid item md={4} sm={5}>
                        <Inputantd label={"Tittle"} className="w-100" ></Inputantd>
                    </Grid>
                    <Grid md={1}></Grid>

                    <Grid item md={3} sm={5}>
                        <Calenderbox label="Start Date" className="w-100"></Calenderbox>
                    </Grid>

                    <Grid md={1}></Grid>

                    <Grid item md={3} sm={5}>
                        <Calenderbox label="End Date" className="w-100"></Calenderbox>
                    </Grid>

                </Grid>


                <div className="card top_move" >
                    <div className="card-body">
                        <Grid container spacing={3} >
                            <Grid item md={10} sm={5}>
                                <Inputantd label=" Poll Question" className="w-100"></Inputantd>
                            </Grid>
                            <Grid md={2}></Grid>

                            <Grid item md={5} sm={5} >
                                <Inputantd label="choice" className="w-100" ></Inputantd>
                            </Grid>
                            <Grid md={3}></Grid>
                            <Grid item md={5} sm={5} className="mb-3">
                                <Inputantd className="w-100"></Inputantd>
                                {inputbox}
                            </Grid>
                            <AddBoxIcon className="icon_height_polls" onClick={this.plus_loop}></AddBoxIcon>

                            <Grid container spacing={3}
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >

                                <Grid item >
                                    <Button className="mt-3 btn_space_polls">View Results</Button>
                                </Grid>

                            </Grid>

                        </Grid>

                    </div>

                </div>


            </div >
        )
    }
}
export default Addpolls;