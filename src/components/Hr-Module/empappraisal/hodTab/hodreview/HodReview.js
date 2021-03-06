import React from 'react';
import Textareaantd from "../../../../../formcomponent/textareaantd";
import Button from 'react-bootstrap/Button';
import { Grid } from '@material-ui/core';
import ValidationLibrary from "../../../../../validationlibrary/validation";

class HodReview extends React.Component{
    constructor(props) {
        super(props);
      
        this.state = {
          errordummy:true,
          managingpartnerdata:
          {'frist_textarea_advicetoappraisee':
          {'value':'',
          validation:[{'name':'required'},{name:'alphabetwithspace'}],
          error:null,
          errmsg:null
        },
        'sec_textarea_advicetohod':
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
        var managingpartnerdata=this.state.managingpartnerdata;
        var managingpartnerkeys=Object.keys(managingpartnerdata);
        console.log(managingpartnerkeys,"managingpartnerkeys");
        for(var i in managingpartnerkeys){
        var errorcheck=ValidationLibrary.checkValidation(managingpartnerdata[managingpartnerkeys[i]].value,managingpartnerdata[managingpartnerkeys[i]].validation);
        console.log(errorcheck,"errorcheck");
        managingpartnerdata[managingpartnerkeys[i]].error=!errorcheck.state;
        managingpartnerdata[managingpartnerkeys[i]].errmsg=errorcheck.msg;
        mainvalue[managingpartnerkeys[i]] =managingpartnerdata[managingpartnerkeys[i]].value
        }
        var filtererr=managingpartnerkeys.filter((obj)=>
          managingpartnerdata[obj].error==true);
        console.log(filtererr.length)
        if(filtererr.length>0){
          this.setState({error:true})
        }else{
          this.setState({error:false})    
        }
        this.setState({
          mainvalue,
          managingpartnerdata
        })   
    }

    changeDynamic=(data,key)=>{
        console.log("key",key);   
        console.log("data",data);   
        var managingpartnerdata=this.state.managingpartnerdata;
         var managingpartnerkeys=Object.keys(managingpartnerdata);
         
           var errorcheck=ValidationLibrary.checkValidation(data,managingpartnerdata[key].validation);
            managingpartnerdata[key].value=data;
            managingpartnerdata[key].error=!errorcheck.state;
            managingpartnerdata[key].errmsg=errorcheck.msg;
            this.setState({managingpartnerdata});
             var filtererr=managingpartnerkeys.filter((obj)=>
            managingpartnerdata[obj].error==true || managingpartnerdata[obj].error==null );
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
               <div>
                <div className = "card mt-3">
                <div className ="card-body">
 
  {/*Content of Managing Review  */}
                    <div className="mt-2">
                        <Textareaantd  label ="Advice / Instructions to & response of the appraisee"
                             changeData={(data)=>this.changeDynamic(data,'frist_textarea_advicetoappraisee')} 
                             value={this.state.managingpartnerdata.frist_textarea_advicetoappraisee.value} 
                             error={this.state.managingpartnerdata.frist_textarea_advicetoappraisee.error} 
                             errmsg={this.state.managingpartnerdata.frist_textarea_advicetoappraisee.errmsg}
                         />
                    </div>
                    <div>
                        <Textareaantd label ="Advice to HOD, If any"
                           changeData={(data)=>this.changeDynamic(data,'sec_textarea_advicetohod')} 
                           value={this.state.managingpartnerdata.sec_textarea_advicetohod.value} 
                           error={this.state.managingpartnerdata.sec_textarea_advicetohod.error} 
                           errmsg={this.state.managingpartnerdata.sec_textarea_advicetohod.errmsg}
                         />
                    </div>
    {/* Submit Button */}
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
export default HodReview;




