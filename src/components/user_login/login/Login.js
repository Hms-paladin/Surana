import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './Login.css';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import Surana from '../../../images/surana.gif'
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(images/login.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position:'relative'
  },
  paper: {
    margin: theme.spacing(10, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:30
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height:60,
    borderRadius:50
  },
  left:{
     position:'relative'
  },
   fab: {

    margin: theme.spacing(3, 0, 2),
  },
  extendedIcon: {
    margin: theme.spacing(3, 0, 2),
  },
})); 


const renderTextField = (text)=>{
  console.log("item",text)
	return text.map(item=>{
   
		return ( 
  
              <div className='login_text'>
            <TextField
             
              required={item.required}
              variant="outlined"
              margin="normal"
              fullWidth
            //   id={item.name}
            //   placeholder={item.placeholder}
            //   name={item.name}
            //   autoComplete={item.name} 
              // value={username}
           

             
              InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {item.icon}
            </InputAdornment>
          ),
        }}
            />
            </div>



			)
	})
} 

// const renderLink = (link)=>{
// 	return(
// 		      <Link to={link.route} variant="body2">
//                   {link.name}
//                 </Link>


//                 )
// }


const Userlogin = (props) =>  {

  const classes = useStyles();  
  const  { textField,button,submit,link} =  props;

  const [email,setEmail] = useState("")
  const [emailError,setEmailError] = useState(false)
  const [password,setPassword] = useState("")
  const [passwordError,setPasswordError] = useState(false)
  const [invalidEmail,setInvalidEmail] = useState(false)

  const handleSubmit = event=>{
   
    event.preventDefault()
    if(email === "") {
        setEmailError(true)
    }

 

    if(password === "") {
       setPasswordError(true)
    }

 
    if(!emailError && !passwordError && !invalidEmail) {
           props.submit(email,password)
    }
  }


  const validateEmail = data => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(data)) {
      setInvalidEmail(false)
    }else {
      setInvalidEmail(true)
    }
  }


  const storeUserDetails = (event) => {

    console.log("sdfkjasdhfhasdf",event.target.name)
    if(event.target.name === "email") {
      setEmail(event.target.value)
      validateEmail(email)
      setEmailError(false)
    }

    if(event.target.name === "password") {
      setPassword(event.target.value)
      setPasswordError(false)
    }
  }
   
   const renderButton =  (btn)=>{ 

	return (

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {/* {btn.name} */}
            </Button> 


            )

}



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={6}  md={8} className={classes.image}   > 
          <div className='login-left-content'> 
       
      <Typography variant="h3" gutterBottom 
      style={{color:'white',fontWeight:'bold',fontSize:35}}>
     WELCOME TO SURANA
      </Typography> 

      <Typography variant="h6" gutterBottom 
       style={{color:'white',fontSize:14}}
       >
        A law is valuable, not because its a law,but <br></br> because there is right on
         it!!
      </Typography> 
  
          </div>
      </Grid> 


      <Grid item xs={12} sm={6}  md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
           <img src={Surana}  width='155px' height='130px' />   <Typography component="h5" variant="h6">
            Client Portal
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
           
{/*             
             {
              renderTextField(textField)
              

            }  */}

       <TextField
             
             required={true}
             variant="outlined"
             margin="normal"
             fullWidth
         
             placeholder={"Email Adress"}
      
            //  name={"email"}
            //  value={email}
            //  type="email"
            //  autoComplete={false}
            //  onChange={(e) => storeUserDetails(e)}

            
             InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">

                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
               }}
           />

           <div>
             {emailError && "Email is required"}
             {invalidEmail && "Invalid email"}
           </div>

       <TextField
             
             required={true}
             variant="outlined"
             margin="normal"
             fullWidth
         
             placeholder={"Password"}

            //  value={password}
            //  name={"password"}
            //  type="password"
            //  onChange={(e) => storeUserDetails(e)}

            
             InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">

                      <LockOutlinedIcon/>
                    </InputAdornment>
                  ),
               }}
           />

         <div>
             {passwordError && "Password required"}
          </div>

          
           {
           	renderButton(button)
           }


            {/* <Grid container>
              <Grid item xs />
              <Grid item>
              
          
              </Grid>
            </Grid> */}
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


export default Userlogin;

  