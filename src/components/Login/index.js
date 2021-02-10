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
},
{
	name:'password',
	required:'true',
	type:'password',
	placeholder:'Password',
	icon:<HttpsOutlinedIcon />
}]; 

const button  = {
	name:'Login'
} 

const link = {
	name:'forgot Password?',
	route:'/forgot'
}







export default class index extends React.Component {

	constructor(props) {
		super(props);
	}  



	handleSignIn = (data)=>{
		 console.log(data)
	}



	render() {
		return (
			<div> 

			
              
              <Login  

              submit ={this.handleSignIn} 
              textField = {textField}  
              button =  {button}
              link = {link}

              />


			</div>
		);
	}
}
