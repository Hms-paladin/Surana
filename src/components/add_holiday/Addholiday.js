import React from 'react';
import Grid from '@material-ui/core/Grid';
import Calenderbox from '../../formcomponent/calenderbox';
import Inputnumberantd from '../../formcomponent/inputnumberantd';
import Inputantd from '../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';



class Addholiday extends React.Component{
    state={
        date1:"",
        date2:"",
        holiday:String,
        noofdays:Number,
        
    
      }
    
      updatevalue=(e)=>{
        console.log(e.target.name+"value")
        console.log(e.target.value+"value")
    
        this.setState({
          [e.target.name]:e.target.value
        })
    
    }
    render(){
        return(
            <React.Fragment>
                  <div className="card top_move">
             <div className="card-body">
                  <Grid container spacing={2}>
                     <Grid item md={3} sm={5}>
                         <Calenderbox label="From Date"  onChange={(e)=>this.updatevalue({
                          target:{name:"date1",value:e}
                        })}
                        name="date1" value={this.state.date1} className="w-100"/>                       
                     </Grid>
                     <Grid md={1}/>
                     <Grid item md={3} sm={5}>
                         <Calenderbox label="To Date" format={"DD-MM-YYYY"} 
                          onChange={(e)=>this.updatevalue({
                          target:{name:"date2",value:e}
                        })}
                        name="date2" value={this.state.date2} className="w-100"/>                       
                     </Grid>
                     <Grid md={1}/>
                     <Grid item md={3} sm={5}>
                         <Inputnumberantd label="No of days" onChange={(e)=>this.updatevalue({
                        target:{name:"noofdays",value:e}
                         })}
                        name="noofdays" value={this.state.noofdays} className="w-100"/>
                     </Grid>
                     <Grid item md={3} sm={5}>
                         <Inputantd label="Holiday"  onChange={this.updatevalue}
                      name="holiday" value={this.state.holiday} className="w-100"/>
                     </Grid>
                     <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-5"
                                spacing={3}>
                                <Grid item >
                                <Button className="btnwidth btnclr">Update</Button>
                                </Grid>
                                <Grid item >
                                <Button className="btnwidth btnclr_outline">Cancel</Button>
                        </Grid>
                        </Grid>
                  </Grid>
                  </div>
                  </div>
                  </React.Fragment>
        )
    }
}
export default Addholiday;