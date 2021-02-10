import React from 'react'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'; 
import Button from '@material-ui/core/Button';
import './styles.css';
import Input from '../../formcomponent/inputantd';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'; 

class Bookrequest extends React.Component { 

    constructor(props) {
        super(props)
    
        this.state = {
             selected:'Book'
        }
    } 


    componentDidMount() {
        // To disabled submit button at the beginning.
        // this.props.form.validateFields();
    }

  
     

     onChange1 = e => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      selection: e.target.value,
    });
  };
   

    handleChange = event => {
   this.setState({
     selected:event.target.value
   });
  };
    
  render() {  
    const {selected}  = this.state;
      
    return (
      <React.Fragment> 



           <div style={{float:'left',padding:10}} >
      <h4 className='intraadmintitle'>
      Book Request
      </h4>
      </div> 

 

         

<div className='bookrequest'>
        <Grid
  container
   direction="row"
  justify="center"
  alignItems="flex-start"
 spacing={8}
>   
 

   <Grid item  md={12} sm={12} xs={12}  className='textLeft'  > 

 <FormControl component="fieldset" >
      
       <RadioGroup aria-label="gender" name="gender1" value={selected} row onChange={this.handleChange}>
         
          <FormControlLabel value="Book" control={<Radio />} label="Book" />
          <FormControlLabel value="Web Access" control={<Radio />} label="Web Access" />
          
        </RadioGroup>

      </FormControl>

      </Grid>
   
   <Grid item  md={6} sm={12} xs={12} >
   
   <Input  
     label='Book Title' 
     name='title'
     type='text'

   /> 
   </Grid>   





    <Grid item  md={6} sm={12} xs={12} >
   
   <Input  
     label='Web Link'
     name='link' 
     type='text'

   /> 
   </Grid>   




   <Grid item  md={6} sm={12} xs={12} >
   
   <Input  
     label='Author' 
     name='author'
     type='text'

   /> 
   </Grid>   





    <Grid item  md={6} sm={12} xs={12} >
   
   <Input  
     label='Publication'
     name='publish' 
     type='text' 


   /> 
   </Grid>   



   <Grid item  xs  className='textLeft'>
   <Button variant="contained" color="primary" size='large'>
        Create Book Request
    </Button>

</Grid>




 </Grid> 
 </div>


          
                
      </React.Fragment>
    );
  }
}
 



export default Bookrequest;
