import React from 'react';
import Inputantd from '../../formcomponent/inputantd';
import Grid from '@material-ui/core/Grid';
import Dropdownantd from '../../formcomponent/dropdownantd';
import Textareaantd from '../../formcomponent/textareaantd';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../validationlibrary/validation.js"
import { tempAction, tempReset } from '../../tempData/tempAction';
import { connect } from 'react-redux';

class Addtm extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      errordummy:true,
      targetdata:
      {'applicant':
      {'value':this.props.addtmData.applicant ? this.props.addtmData.applicant : '',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'app_no':
      {'value':this.props.addtmData.app_no ? this.props.addtmData.app_no : '',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'trademark':
      {'value':this.props.addtmData.trademark ? this.props.addtmData.trademark : '',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'Form':
      {'value':this.props.addtmData.Form ? this.props.addtmData.Form : '',
      validation:[{'name':'required'},{name:'alphabetsOnly'}],
      error:null,
      errmsg:null
    },
    'class':
      {'value':this.props.addtmData.class ? this.props.addtmData.class : '',
      validation:[],
    },

    'details':
      {'value':this.props.addtmData.details ? this.props.addtmData.details : "",
      validation:[{'name':'required'},{"name":"custommaxLength","params":"5"}],
      error:null,
      errmsg:null
    },
  },
};
  }

    

checkValidation=()=>{
    var mainvalue={}
    var targetdata=this.state.targetdata;
    var targetkeys=Object.keys(targetdata);
    console.log(targetkeys,"targetkeys");
    for(var i in targetkeys){
    var errorcheck=ValidationLibrary.checkValidation(targetdata[targetkeys[i]].value,targetdata[targetkeys[i]].validation);
    console.log(errorcheck,"errorcheck");
    targetdata[targetkeys[i]].error=!errorcheck.state;
    targetdata[targetkeys[i]].errmsg=errorcheck.msg;
    mainvalue[targetkeys[i]] =targetdata[targetkeys[i]].value // DB Final Data
    }
    var filtererr=targetkeys.filter((obj)=>
      targetdata[obj].error==true);
    console.log(filtererr.length)
    if(filtererr.length>0){
      this.setState({error:true})
    }else{
      this.setState({error:false})
      

    }
    console.log("mainvalue",mainvalue) // DB Final Data
    
    this.setState({
      mainvalue,
      targetdata,
    })
    console.log(filtererr.length,"filter_error")

    if(filtererr.length===0){
      this.props.dispatch(tempReset())
      var targetdata=this.state.targetdata;
      var targetkeys=Object.keys(targetdata);
      for(var i in targetkeys){
          targetdata[targetkeys[i]].value=""
        }
    }
}
changeDynamic=(data,key)=>{
    console.log("key",key);   
    console.log("data",data); 
    var targetdata=this.state.targetdata;
     var targetkeys=Object.keys(targetdata);
     
       var errorcheck=ValidationLibrary.checkValidation(data,targetdata[key].validation);
        targetdata[key].value=data;
        targetdata[key].error=!errorcheck.state;
        targetdata[key].errmsg=errorcheck.msg;
        var errorCheck= targetdata[key].error
        var errorMsg = targetdata[key].errmsg
        this.setState({targetdata});
         var filtererr=targetkeys.filter((obj)=>
        targetdata[obj].error==true || targetdata[obj].error==null );
       
        var filterError=false;

        if(filtererr.length>0){
            this.setState({error:true,
                errordummy:false})
                filterError=true
                
        }else{
            filterError=false
            this.setState({error:false})
        }
        const dataval = {
          [key]:data,
          // [key+"error"]:errorCheck,
          // [key+"_errorMsg"]:errorMsg,
        }
        this.props.dispatch(tempAction(dataval))

  }


    render(){
      console.log(this.state.error,"error",this.state.targetdata)
        return(
            <React.Fragment>
            
            <div className="card top_move">
             <div className="card-body">
             <form>
               <Grid container spacing={3} className=" mt-2">
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Inputantd 
                          label={"Applicant"} 
                          className={"w-100"} 
                          changeData={(data)=>this.changeDynamic(data,'applicant')} 
                          value={this.state.targetdata.applicant.value} 
                          error={this.state.targetdata.applicant.error} 
                          errmsg={this.state.targetdata.applicant.errmsg}
                        />
                    </Grid>
                      <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Inputantd 
                            label={"Trademark"}
                            className={"w-100"}
                            changeData={(data)=>this.changeDynamic(data,'trademark')}
                            value={this.state.targetdata.trademark.value}
                            error={this.state.targetdata.trademark.error}
                            errmsg={this.state.targetdata.trademark.errmsg}
                        />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 ">
                        <Inputantd 
                                label={"App No"}
                                className={"w-100"}
                                changeData={(data)=>this.changeDynamic(data,'app_no')}
                                value={this.state.targetdata.app_no.value}
                                error={this.state.targetdata.app_no.error}
                                errmsg={this.state.targetdata.app_no.errmsg}
                            />
                    </Grid>

                    <Grid item md={3} sm={6} className="w-100 mt-4 ">
                        <Inputantd 
                                label={"Form"}
                                className={"w-100"}
                                changeData={(data)=>this.changeDynamic(data,'Form')}
                                value={this.state.targetdata.Form.value}
                                error={this.state.targetdata.Form.error}
                                errmsg={this.state.targetdata.Form.errmsg}
                        />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="w-100 mt-4">
                        <Dropdownantd 
                            label={"Class"} 
                            className={"w-100"}
                            option={["Class A","Class B"]}
                            changeData={(data)=>this.changeDynamic(data,'class')}
                            value={this.state.targetdata.class.value}
                        />
                    </Grid>
                    <Grid md={1}></Grid>
                    <Grid item md={3} sm={6} className="address w-100 mt-3">
                        <Textareaantd
                            className={"w-100 customresize "}
                            label="Details"/>
                    </Grid>
                    <Grid md={3}></Grid>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center" 
                        className="gridbtnalign"
                         spacing={3}>
                        <Grid item >

                        <Button size="lg" className="btnmargin btnwidth btnclr" 
                           
                          onClick={()=>this.checkValidation()}>
                            Save
                        </Button>
                     </Grid>
                       <Grid item >
                            <Button size="lg" className="btnwidth btnclr_outline">Cancel</Button>
                    </Grid>
               </Grid>
                </Grid>
                </form>
                </div>
                </div>
                
                </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => ({
  addtmData: state.tempReducer
})


export default connect(mapStateToProps)(Addtm);
