import React from 'react'; 
import Login from './login'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import { apiurl } from "../../App";
import { useAuth } from "../../context/auth";
import { Redirect } from "react-router-dom";
import { userAccessFunc } from "../User Management/action/useraccessAction";
import { connect } from 'react-redux'


const axios = require('axios');


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


function Index (props){

	const [isLoggedIn, setLoggedIn] = React.useState(false);
	const { setAuthTokens } = useAuth();


	const handleSignIn = (email,password)=>{
		axios.post(apiurl+"/login", {
			email:email,
			password:password
		  }).then(result => {
			if (result.status === 200) {
			  setAuthTokens(result.data);
			  setLoggedIn(true);
			  props.dispatch(userAccessFunc(result.data.data[0].id))
			} 
		  }).catch(e => {
		  });
	}

	if (isLoggedIn) {
		return <Redirect to="/Home/dashboard" />;
	  }

	return (
		<div> 
		  
		  <Login  
		  submit ={handleSignIn} 
		  textField = {textField}  
		  button =  {button}
		  link = {link}
		  />

		</div>
	);
}

const mapDispatchToProps = dispatch => ({
	userAccessFunc,
	dispatch                // ← Add this
  })
  
  export default connect(null, mapDispatchToProps)(Index)

// export default class index extends React.Component {

// 	constructor(props) {
// 		super(props);
// 	}  







// 	render() {
		
// 	}
// }
