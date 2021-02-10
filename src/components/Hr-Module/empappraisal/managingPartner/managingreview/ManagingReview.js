import React from 'react';
import Textareaantd from "../../../../../formcomponent/textareaantd";
import { Grid } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../../../validationlibrary/validation";

class ManagingReview extends React.Component{

    state = {
        changeval:true,
        managingdata:
        {
        'advice_instructions':
        {'value':'',
        validation:[{'name':'required'},{name:'alphabetsOnly'}],
        error:"",
        errmsg:null
        },
        'advice_hod_if':
        {'value':'',
        validation:[{'name':''},{name:'alphabetsOnly'}],
        error:null,
        errmsg:null
      },  
      'instuctions_head':
      {'value':'',
      validation:[{'name':''},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },        
    }
}
    
      checkValidation=()=>{
          var mainvalue={}
          var managingdata=this.state.managingdata;
          var managingkeys=Object.keys(managingdata);
          console.log(managingkeys,"managingkeys");
          for(var i in managingkeys){
          var errorcheck=ValidationLibrary.checkValidation(managingdata[managingkeys[i]].value,managingdata[managingkeys[i]].validation);
          console.log(errorcheck,"errorcheck");
          managingdata[managingkeys[i]].error=!errorcheck.state;
          managingdata[managingkeys[i]].errmsg=errorcheck.msg;
          mainvalue[managingkeys[i]] =managingdata[managingkeys[i]].value
          }
          var filtererr=managingkeys.filter((obj)=>
            managingdata[obj].error==true);
          console.log(filtererr.length)
          if(filtererr.length>0){
            this.setState({error:true})
          }else{
            this.setState({error:false})
      
          }
          this.setState({
            mainvalue,
            managingdata
          })   
      }
  
      changeDynamic=(data,key)=>{
          console.log("key",key);   
          console.log("data",data);   
          var managingdata=this.state.managingdata;
           var managingkeys=Object.keys(managingdata);
           
             var errorcheck=ValidationLibrary.checkValidation(data,managingdata[key].validation);
              managingdata[key].value=data;
              managingdata[key].error=!errorcheck.state;
              managingdata[key].errmsg=errorcheck.msg;
              this.setState({managingdata});
               var filtererr=managingkeys.filter((obj)=>
              managingdata[obj].error==true || managingdata[obj].error==null );
              if(filtererr.length>0){
                  this.setState({error:true,
                      errordummy:false})
              }else{
                  this.setState({error:false})
              }
        }
    render(){
        return(
            <React.Fragment>
              <div className="card">
                <div className="card-body">
   
    {/* BODY OF THE HOD */}
    '
                  <div className="mt-4">
                      <Textareaantd label="Advidce/instructions to & response of the appraisee"
                       changeData={(data)=>this.changeDynamic(data,'advice_instructions')} 
                       value={this.state.managingdata.advice_instructions.value} 
                       error={this.state.managingdata.advice_instructions.error} 
                       errmsg={this.state.managingdata.advice_instructions.errmsg}
                       ></Textareaantd>
                      <Textareaantd label="Advidce to HOD, if any"
                        changeData={(data)=>this.changeDynamic(data,'advice_hod_if')} 
                        value={this.state.managingdata.advice_hod_if.value} 
                        error={this.state.managingdata.advice_hod_if.error} 
                        errmsg={this.state.managingdata.advice_hod_if.errmsg}
                    ></Textareaantd>
                        <Textareaantd label="Instructions to the head Admin & HOD for action to be taken"
                        changeData={(data)=>this.changeDynamic(data,'instuctions_head')} 
                        value={this.state.managingdata.instuctions_head.value} 
                        error={this.state.managingdata.instuctions_head.error} 
                        errmsg={this.state.managingdata.instuctions_head.errmsg}
                    ></Textareaantd>

         {/* Button Submit */}
                         <Grid container  direction="row" justify="center" alignItems="center" className="mt-2" spacing={3}>
                            <Grid item >
                                <Button className="btnwidth btnclr" onClick={()=>this.checkValidation()}>Submit</Button>
                            </Grid>
                        </Grid>

                  </div>

                 
                   

                </div>
              </div>
          </React.Fragment>
        )
    }
}
export default ManagingReview;