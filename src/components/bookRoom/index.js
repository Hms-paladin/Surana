import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper'; 
import './styles.css'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
const dummy = {
	image:'images/room.jpg',
	title:'Anand Conference Room',
	subtitle:'Lorum Ipsum lorum Ipsum subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
	capacity:'12'
}


class index extends Component {
  render() {
    return (
      
      <div className='bookroomRoot'>
      <Paper >
         <Grid container spacing={2}>
        
        <Grid item sm={12} md={5} xs={12}  >
          
          <img src={dummy.image}  className='brimage'/>
          
        </Grid>
        <Grid item sm={12} md={7} xs={12}> 

      <Typography variant="h5" gutterBottom>
     {dummy.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
         {dummy.subtitle}
      </Typography> 

      <Chip  label="Capacity" color="primary" size="medium" avatar={<Avatar style={{backgroundColor:'red'}}>{dummy.capacity}</Avatar>} />

        </Grid>


        <Grid item xs  style={{textAlign:'center'}}> 
         <Button size='large' variant="contained" color="primary" style={{
         	backgroundColor:'#2196f3'
         }}>
        Book This Room
      </Button> 
        </Grid>

        </Grid>

       
      </Paper>
    </div>

    );
  }
}

export default index;
