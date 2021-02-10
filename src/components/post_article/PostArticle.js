import React from 'react';
import { Grid, Container } from '@material-ui/core';
import Inputantd from '../../formcomponent/inputantd';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Textareaantd from '../../formcomponent/textareaantd';
import {Upload,Button} from 'antd';
import './PostArticle.css';



class PostArticle extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Container>
                <Grid container spacing={3} className="mt-3">
                    <Grid md={3} sm={5}>
                        <Inputantd label="Title"  className="title-space w-100"/>
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid md={3} sm={5}>
                        <Dropdownantd label="Category" className="w-100"/>
                    </Grid>
                    </Grid>
                    </Container>
                     <div className="card mt-5 ml-2">
            <div className="card-body">
            <Grid container spacing={3} className="">
            <Grid item md={11} sm={10} className="">
                        <Textareaantd
                        className={"w-100"}
                        label="Content" />
                    </Grid>
                    <Grid item md={10} sm={8} className="w-100 ">
                  <Inputantd
                        label="Upload Document"/>
                        </Grid>
                        <Grid md={0}></Grid>
                  <Upload className="mt-4 button-change">
                  {/* <Grid item md={1}></Grid> */}
                    <Button className="button-type mt-3">
                    <span className="letter-color">Browse</span>
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
            
                </div>
              </div>
              
            </React.Fragment>
        )
    }
}
export default PostArticle;