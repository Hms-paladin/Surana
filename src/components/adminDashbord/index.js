import React from 'react'; 
import CardDesign from './card';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'; 
import Button from '@material-ui/core/Button';
import './styles.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';



const list  =[
			    {
                  name:'Booked',
                  count:4
			    },
			    {
                  name:'Free',
                  count:23
			    },
			    {
                  name:'Request',
                  count:3
			    }
			    ]; 


let add ={
	enabled:true,
	route:'/view',
	count:'12 New',
	icon:<VisibilityOutlinedIcon />
} 

let color =  'green';

export default class index extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<React.Fragment>
			<div className='root1'> 
			    
			 <Grid container   spacing={6}  > 

			  <Grid item xs={12} sm={12} xs={12} >  
			     <div style={{float:'left'}} >
			<h3 className='adtitle'>
			Admin Dashboard
			</h3>
			</div> 

			<div style={{float:'right'}} >
			
			  <h5 style={{paddingRight:10,paddingTop:10}}><NavigateBeforeIcon  color='default' fontSize='large' 
                             />  Today  <NavigateNextIcon  color='default' fontSize='large' 
                             /></h5>
                             
			
			</div>

			  </Grid>
			  
			    <Grid item xs>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />} 
			   color='green'

			     />
			    </Grid> 


			     <Grid item xs>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />}
			  color='blue'
			     />
			    </Grid>


			     <Grid item xs>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />}  
			    color='orange'
			   
			     />
			    </Grid>
			    

			 </Grid> 

			</div>  
			 </React.Fragment>

		);
	}
}
