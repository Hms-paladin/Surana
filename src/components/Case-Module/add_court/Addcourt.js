import React from 'react';
import Grid from '@material-ui/core/Grid';
import Textareaantd from '../../../formcomponent/textareaantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../formcomponent/inputantd';
import ValidationLibrary from "../../../validationlibrary/validation.js"
import { getcourtName, getcityName } from "../Action/CourtAction";
import { apiurl } from "../../../App";
import { connect } from "react-redux";
import axios from "axios";
import {notification} from 'antd';
import './court.css';
import DayreportDropDown from '../../../formcomponent/dayreportDropDown';

class Addcourt extends React.Component{
    constructor(props) {
      super(props);
    
      this.state = {
        saveBtnClick:false,
        courtNameId:"",
        crtShortName:"",
        editId:"",
        btnChange:false,
        errordummy:true,
        addcourtdata:
        {
      'court_name':
        {'value':'',
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
      },
      'city':
        {'value':'',
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
      },
      'address':
        {'value':'',
        validation:[{'name':'required'}],
        error:null,
        errmsg:null
      },
    },
  };
    }
    async componentDidMount() {
      await this.props.getcourtName();
      await this.props.getcityName();     
      console.log(this.props.tabValue,"tabValue")
     }
  
      
  
  checkValidation=()=>{
      var mainvalue={}
      var addcourtdata=this.state.addcourtdata;
      var targetkeys=Object.keys(addcourtdata);
      console.log(targetkeys,"targetkeys");
      for(var i in targetkeys){
      var errorcheck=ValidationLibrary.checkValidation(addcourtdata[targetkeys[i]].value,addcourtdata[targetkeys[i]].validation);
      console.log(errorcheck,"errorcheck");
      addcourtdata[targetkeys[i]].error=!errorcheck.state;
      addcourtdata[targetkeys[i]].errmsg=errorcheck.msg;
      mainvalue[targetkeys[i]] =addcourtdata[targetkeys[i]].value
      }
      var filtererr=targetkeys.filter((obj)=>
        addcourtdata[obj].error==true);
      console.log(filtererr.length)
      if(filtererr.length>0){
        this.setState({error:true})
      }else{
        this.setState({
          error:false,
          saveBtnClick:true

        })
        //btn changes
        if(this.state.btnChange === false){
        var self = this;
        console.log(this.state.btnChange ,"errorcheckerrorcheck");
        let courtData={
          "courtshortname":this.state.crtShortName,
          "courtId":this.state.addcourtdata.court_name.value,
          "courtaddress":this.state.addcourtdata.address.value,
          "cityId":this.state.addcourtdata.city.value
        }
  
      
  
        axios({
          method: "post",
          url: apiurl + "/addcourt",
          data: courtData
              
          
        })
          .then(function (response) {
            console.log(response.data.data, "responseresponse");
            notification.warning({
              message: `Court Data is submitted successfully`,
              duration: 3.5,
              placement: "topRight",
              className:"notification_court"
            })
           
            self.state.crtShortName=""
            self.state.addcourtdata.court_name.value=""
            self.state.addcourtdata.address.value=""
            self.state.addcourtdata.city.value=""
            
            self.setState({
              saveBtnClick:false
            });
          })
          .catch(function (error) {
            console.log(error, "error");
          });  
      
          }//button save end
          //button update start
          else if(this.state.btnChange === true){
            console.log("sdfkjhsdalfkjhasdj",this.state.btnChange)

            //court name id
            var Court_Name=this.props.courtName.map((val) => {
              if(val.CourtId === this.state.addcourtdata.court_name.value){
                // alert(val.CourtName)
                console.log(val.CourtName,"nix")
                console.log(this.state.addcourtdata.court_name.value,"nix")

                return val.CourtId
              } else
              return val.CourtId
            
          })
          for(let i = 0;i<Court_Name.length;i++){
            if(Court_Name[i]){
              var CourtNameId = Court_Name[i]
              break;
            }
          }
          //city name id
          var City_Name=this.props.courtCityName.map((val) => {
       
            if(val.CityId === this.state.addcourtdata.city.value){
              console.log(val.CityId,"nix")
              console.log(this.state.addcourtdata.court_name.value,"nix")

              return val.CityId
            } else 
            return val.CityId
          
        })
        for(let i = 0;i<City_Name.length;i++){
          if(City_Name[i]){
            var CityNameId = City_Name[i]
            break;
          }
        }
            var self = this
           
            let putcourtData={
              "courtshortname":this.state.crtShortName,
              "courtId":CourtNameId,              
              "courtaddress":this.state.addcourtdata.address.value,
              "cityId":CityNameId,
              "addcourtId":this.state.editId
            }
      
          
      
            axios({
              method: "PUT",
              url: apiurl + "/updatecourt",
              data: putcourtData                 
              
            })
              .then(function (response) {
                console.log(response.data.data, "responseresponse");
                self.state.crtShortName=""                
                self.state.addcourtdata.court_name.value=""
                self.state.addcourtdata.address.value=""
                self.state.addcourtdata.city.value=""
                notification.warning({
                  message: `Court Data is Updated successfully`,
                  duration: 3.5,
                  placement: "topRight",
                  className:"notification_court"
                })
                
                // self.state.addcourtdata.amount.value=""
                // self.props.showclose && self.props.showclose()
                self.setState({
                  btnChange:false,
                  saveBtnClick:false
                });

                self.props.updateTabValue(1)
              })
              .catch(function (error) {
                console.log(error, "error");
              });  
          }
      this.setState({
        // mainvalue,
        addcourtdata,

      })
  
      }
     
    }
        
  
  changeDynamic=(data,key)=>{
      console.log("key",key);   
      console.log("data",data);  
     if(key=="court_name"){
    this.setState({
      courtNameId:data
    },()=>this.courtshortName())
     } 
     console.log(this.state.courtNameId,"courtNameId")

      var addcourtdata=this.state.addcourtdata;
       var targetkeys=Object.keys(addcourtdata);
       
         var errorcheck=ValidationLibrary.checkValidation(data,addcourtdata[key].validation);
          addcourtdata[key].value=data;
          addcourtdata[key].error=!errorcheck.state;
          addcourtdata[key].errmsg=errorcheck.msg;
          this.setState({addcourtdata});
           var filtererr=targetkeys.filter((obj)=>
          addcourtdata[obj].error==true || addcourtdata[obj].error==null );
          if(filtererr.length>0){
              this.setState({error:true,
                  errordummy:false})
          }else{
              this.setState({
                error:false,
                cancel:data
              })
          }
    }

    courtshortName = () =>{  
      axios({
        method: "POST",
        url: apiurl + "/courtshortnameapi",
        data: {
          id:this.state.courtNameId
        }                 
        
      }).then((response) => {
        console.log(response.data.data[0].Court_short_name,"responseresponse")
        this.setState({
          crtShortName:response.data.data[0].Court_short_name
        })
      })    
    }
    

    UNSAFE_componentWillReceiveProps(newProps){
      if(newProps.tableRowData){
        console.log(newProps.tableRowData,"tabValue")
      this.state.crtShortName = newProps.tableRowData.data.court_code
      this.state.addcourtdata.court_name.value = newProps.tableRowData.data.court_name
      this.state.addcourtdata.city.value=newProps.tableRowData.data.court_city
      this.state.addcourtdata.address.value=newProps.tableRowData.data.court_address
      this.state.editId=newProps.tableRowData.data.id
      this.setState({btnChange:true})
    }
    }

    cancelClick=()=>{
      this.state.crtShortName = ""
      this.state.addcourtdata.court_name.value=""
      this.state.addcourtdata.city.value=""
      this.state.addcourtdata.address.value=""
      console.log(this.state.crtShortName,"courtname")
      this.setState({})
    }

    render(){
      console.log(this.state.crtShortName,"courtShortName")

        return(
            <React.Fragment>
                  <div className="card top_move">
                     <div className="card-body">
                  <Grid container spacing={2}>
                      <Grid item md={3} sm={6}>
                      <DayreportDropDown label="Court name" className="w-100"
                          option={this.props.courtName &&
                          this.props.courtName.map((val) => {return({name:val.CourtName,id:val.CourtId})})}
                          changeData={(data)=>this.changeDynamic(data,'court_name')} 
                          value={this.state.addcourtdata.court_name.value} 
                          error={this.state.addcourtdata.court_name.error} 
                          errmsg={this.state.addcourtdata.court_name.errmsg}
                          showSearch={true}
                          required/>

                        
                      </Grid>
                      <Grid md={1}/>
                      <Grid item md={3} sm={6}>
                
                      <Inputantd 
                          label="Court Short Name"  
                          span=" (Auto Generate)"
                          className="w-100"
                          value={this.state.crtShortName} 
                         />

                      </Grid>
                      <Grid md={1}/>
                      <Grid item md={3} sm={6}>
                          <DayreportDropDown label="City" className="w-100" 
                          option={this.props.courtCityName &&
                            this.props.courtCityName.map((val) => {return({name:val.CityName,id:val.CityId})})}
                          changeData={(data)=>this.changeDynamic(data,'city')} 
                          value={this.state.addcourtdata.city.value} 
                          error={this.state.addcourtdata.city.error} 
                          errmsg={this.state.addcourtdata.city.errmsg}
                          required/>
                      </Grid>
                      
                      <Grid item md={3} sm={6}>
                          <Textareaantd label="Address "                           
                           className="w-100"
                           changeData={(data)=>this.changeDynamic(data,'address')} 
                           value={this.state.addcourtdata.address.value} 
                           error={this.state.addcourtdata.address.error} 
                           errmsg={this.state.addcourtdata.address.errmsg}
                           required/>
                      </Grid>
                      <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center" 
                                className="mt-5"
                                spacing={3}>
                                <Grid item >
                                <Button className="btnwidth btnclr" 
                                // onClick={()=>this.checkValidation()}
                                onClick={!this.state.saveBtnClick ? this.checkValidation : null}
                                >
                                  {this.state.btnChange === true ? "Update" : "Save"}
                                  </Button>
                                </Grid>
                                <Grid item >
                                <Button className="btnwidth btnclr_outline" onClick={this.cancelClick}>Cancel</Button>
                        </Grid>
</Grid>
                  </Grid>
                  </div>
                  </div>
                              </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
  console.log("state in court", state);

  return {
    // addexpensedata: state.resumeReducer.addexpensedata,
    courtName:state.court.getcourtOptions,
    courtCityName:state.court.getcityOptions,
    courtEditData:state.court.editcourtdata
  };
};
export default connect(mapStateToProps, {
  getcourtName,getcityName
})(Addcourt);
