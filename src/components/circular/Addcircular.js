import React from 'react';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Inputantd from '../../formcomponent/inputantd';
import Grid from '@material-ui/core/Grid';
import Textareaantd from '../../formcomponent/textareaantd';
import Calenderbox from '../../formcomponent/calenderbox';
import Button from 'react-bootstrap/Button';
import './circular.css';
import {Upload,Icon} from 'antd';

 


class Addcircular extends React.Component{

    handleClick = (e) => {
        this.inputElement.click();
      }
   
    
    render(){
        
        return(
            <React.Fragment>
                <Grid container spacing={2} className="mt-3">
                    <Grid item md={3} sm={5}>
                        <Dropdownantd label={"Type"} className="w-100" />
                </Grid>
                <Grid item md={1}/>
                <Grid item md={3} sm={5} >
                        <Inputantd label={"Title"} className="w-100"/>
                    </Grid>
                </Grid>
                <div className="card top_move">
                   <div className="card-body">
                    <Grid container spacing={2} >
                    <Grid item md={11} sm={10}>
                        <Textareaantd label={"Details"} className="w-100"/>
                    </Grid>
                   
                        <Grid item md={3} sm={5}  >
                            <Calenderbox label={"Valid From"} className="w-100"/>
                        </Grid>
                        <Grid item md={1}/>
                        <Grid item md={3} sm={5}  >
                            <Calenderbox label={"Valid Till"} className="w-100"/>
                        </Grid>
                        <Grid item md={1}/>
                        <Grid item md={3} sm={5}>
                        <Dropdownantd label="Originated" className="w-100 mt-2"/>
                        </Grid>
                        <Grid item md={1}/>
                        <Grid item md={3} sm={5} > 
                               <label>
                                   Attachment
                               </label>
                            <Upload className="attachment_margin">
                            <Inputantd placeholder={"click to upload"} onClick={this.handleClick} className="w-100 "></Inputantd>
                                <Button className="attachment_width"  ref={input => this.inputElement = input} >
                                </Button>
                            </Upload>
            
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
            </React.Fragment>
        )
    }
}
export default Addcircular;