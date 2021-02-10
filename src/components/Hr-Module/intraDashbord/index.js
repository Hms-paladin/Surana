import React from 'react'; 
import CardDesign from '../adminDashbord/card';
import Grid from '@material-ui/core/Grid';
import './styles.css'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddIcon from '@material-ui/icons/Add';


const list  =[
			    {
                  name:'Booked',
                  count:4
			    }
			    ]; 


let add ={
	enabled:true,
	route:'/view',
	count:<h4 style={{fontWeight:'bold'}}>
			12 New
			</h4>,
	icon:<AddIcon  color='primary' fontSize='large'  />
} 


export default class index extends React.Component {
	

	constructor(props) {
		super(props);
	}

	render() {
		return ( 
			<React.Fragment>
			<div className='intraadmin'> 
			    
			 <Grid container   spacing={4}  > 

			  <Grid item xs={12} sm={12} xs={12} >  
			     <div style={{float:'left'}} >
			<h4 className='title'>
			Intra - Admin Panel
			</h4>
			</div> 

			

			  </Grid>
			  
			    <Grid item sm={6} md={4} xs={12} >  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />} 
			    add =  {add}
			    color = 'green'

			     />
			    </Grid> 


			     <Grid item sm={6} md={4} xs={12}>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />}
			    add =  {add}
			    color = 'blue'
			     />
			    </Grid>


			     <Grid item sm={6} md={4} xs={12}>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />} 
			    add =  {add}
			     color = 'pink'
			     />
			    </Grid> 

			       <Grid item sm={6} md={4} xs={12}>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />} 
			    add =  {add}
			    color = 'kathiri'

			     />
			    </Grid> 


			     <Grid item sm={6} md={4} xs={12}>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}
			    icon={<NavigateNextIcon />}
			    add =  {add}
			    color = 'burnOrange'
			     />
			    </Grid>


			     <Grid item sm={6} md={4} xs={12}>  
			    <CardDesign  
			    title='Stock Request' 
			    list={list}	
			    icon={<NavigateNextIcon />} 
			    add =  {add}
			    color = 'pink'	
			     />
			    </Grid>
			    
			    

			 </Grid> 

			</div>  
			 </React.Fragment>

		);
	}
}
