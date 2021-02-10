import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import './PostApproved.css';
import Card from 'react-bootstrap/Card'
import Calenderbox from '../../formcomponent/calenderbox'
import Dropdownantd from '../../formcomponent/dropdownantd'
import Button from 'react-bootstrap/Button';
class PostApproved extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Container>
                <div className="top_move">
                    <label className="article">Article post Approved</label>
                    </div>
                    <div className="flex-title">
                        <div>
                     <label className="mt-3 ml-1 title-font">Title</label>
                     <p className="ml-3">Use Negatives</p>
                     </div>
                     <div className="category-place">
                     <label className="mt-3 category-font">Category</label>
                     <p className="ml-3">Information</p>
                     </div>
                    </div>
                    </Container>
                    <Card className=" content-move">
                    <div className="Card.Body">
                        <label className="content-font mt-3 ml-2">Content</label>
                        <p className="ml-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, also the leap into electronic typesetting, 
                        remaining essentially unchanged.</p>
                        <Grid container spacing={3} className="mt-4">
                        <Grid md={3} sm={5} className="ml-4">
                        <Dropdownantd label={"Approved by"} className="w-100 qualification-height" 
                       option={[1,2,3,]}/>
                        </Grid>
                        <Grid md={1}></Grid>
                        <Grid md={3} sm={5}>
                        <Calenderbox className="w-100" label="Approved on" />
                        </Grid>
                        </Grid>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center" 
                            className="mt-5 mb-4"
                            spacing={3}>
                            <Grid item >
                            <Button className="btnwidth btnclr">Save</Button>
                            </Grid>
                            <Grid item >
                            <Button className="btnwidth btnclr_outline">Cancel</Button>
                            </Grid>
                            </Grid>
                    </div>
                    </Card>
            
            </React.Fragment>
        )
    }
}
export default PostApproved;