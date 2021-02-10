import React from 'react';
import Button from 'react-bootstrap/Button';
import Grid from '@material-ui/core/Grid'

class Buttons extends React.Component{
    
render(){
    return(
<div>
    
<div className="row ml-2 button-top">
<Grid container
                direction="row"
                justify="center"
                alignItems="center" 
                className="mb-3"
                spacing={3}>
                    <Grid item>
                    <Button size="lg" className="btnmargin btnwidth btnclr btn" onClick={()=>this.checkValidation()}>Save</Button>
                    </Grid>
                    <Grid item > 
                        <Button className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
                    </Grid>
              </div>  
</div>
    )
}
}
export default Buttons;
 