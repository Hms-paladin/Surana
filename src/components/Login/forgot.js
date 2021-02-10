import React from 'react'; 
import Login from './login'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';



const textField = [{
	name:'email',
	required:'true',
	type:'text',
	placeholder:'Email Address',
	icon:<EmailOutlinedIcon />
}
]; 

const button  = {
	name:'Forgot Password'
} 

const link = {
	name:'Back to Login',
	route:'/login'
}







export default class forgot extends React.Component {

	constructor(props) {
		super(props);
	}  



	handleForgot = (data)=>{
		 console.log(data)
	}



	render() {
		return (
			<div> 

			
              
              <Login  

              submit ={this.handleForgot} 
              textField = {textField}  
              button =  {button}
              link = {link}

              />


			</div>
		);
	}
}
