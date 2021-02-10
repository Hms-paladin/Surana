import React from 'react';
import Textareaantd from '../../../formcomponent/textareaantd';
import './FollowReport.css';
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";

class FollowReport extends React.Component{
     constructor(props) {
      super(props);
    
      this.state = {
        errordummy:true,
        followreportdata:
        {'corrective_correction':
        {'value':'',
        validation:[{'name':'required'},{name:'alphabetwithspace'}],
        error:null,
        errmsg:null
      },
      
    },
  };
    }
  
    checkValidation=()=>{
        var mainvalue={}
        var followreportdata=this.state.followreportdata;
        var followreportkeys=Object.keys(followreportdata);
        console.log(followreportkeys,"followreportkeys");
        for(var i in followreportkeys){
        var errorcheck=ValidationLibrary.checkValidation(followreportdata[followreportkeys[i]].value,followreportdata[followreportkeys[i]].validation);
        console.log(errorcheck,"errorcheck");
        followreportdata[followreportkeys[i]].error=!errorcheck.state;
        followreportdata[followreportkeys[i]].errmsg=errorcheck.msg;
        mainvalue[followreportkeys[i]] =followreportdata[followreportkeys[i]].value
        }
        var filtererr=followreportkeys.filter((obj)=>
          followreportdata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})
    
        }
        this.setState({
          mainvalue,
          followreportdata
        })   
    }

    changeDynamic=(data,key)=>{
        console.log("key",key);   
        console.log("data",data);   
        var followreportdata=this.state.followreportdata;
         var followreportkeys=Object.keys(followreportdata);
         
           var errorcheck=ValidationLibrary.checkValidation(data,followreportdata[key].validation);
            followreportdata[key].value=data;
            followreportdata[key].error=!errorcheck.state;
            followreportdata[key].errmsg=errorcheck.msg;
            this.setState({followreportdata});
             var filtererr=followreportkeys.filter((obj)=>
            followreportdata[obj].error==true || followreportdata[obj].error==null );
            if(filtererr.length>0){
                this.setState({error:true,
                    errordummy:false})
            }else{
                this.setState({error:false})
            }
      }
    render(){
        return(
            <div>
                <div className ="card mt-3">
                    <div className = "card-body">
                        <div className ="follow_heading mt-3 mb-5">
                            <h5>Follow Up Reports</h5> 
                        </div> 
     {/* Content of the Follow Report */}
                        <div className ="d-flex">
                            <h6>By the Head - Admin & HRD</h6>
                            <p> (Should include  objective Action Taken  Report)</p>
                        </div>
                        <Textareaantd  label="Corrective Action"
                        className="w-100"
                        changeData={(data)=>this.changeDynamic(data,'corrective_correction')} 
                        value={this.state.followreportdata.corrective_correction.value} 
                        error={this.state.followreportdata.corrective_correction.error} 
                        errmsg={this.state.followreportdata.corrective_correction.errmsg}
                        required
                        />
                        
     {/* Button Submit */}
                        <Grid container  direction="row" justify="center" alignItems="center" className="mt-2" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={()=>this.checkValidation()}>Submit</Button>
                            </Grid>
                        </Grid>
                         
                    </div>
                    
                     
                </div>
            </div>
           
        
        )
    }
}
export default FollowReport;