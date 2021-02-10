import React from "react";
import { Grid } from "@material-ui/core";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import DayreportDropDown from "../../../formcomponent/dayreportDropDown"
import Inputantd from "../../../formcomponent/inputantd";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { getIntNum, getCourtNum,getCaseView } from "./Action/DayAction";
import { getClient,getEmployees } from '../../../fixers/fixersAction';
import axios from 'axios';
import {notification, Select} from 'antd';
import { apiurl } from '../../../App';
import './dayreport.css';

// import{getcaseClient} from '../Action/CourtAction'
const { Option } = Select;


class Dayreport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courtClients:[],
      courtClientserror: "",
      selectedClient:"",

      internalCaseNo:[],
      intCaseerror: "",
      selectedInterCno:"",

      CourtCaseNo:[],
      CourtCaseerror: "",
      selectedCourtCno:"",

      DraName:'',
      courtAttorney:[],
      clienterror: "",

      selectedAttorney:"",
      courtAttorney:[],
      courtAttorneyerror:"",

      errordummy: true,
   
    };
  }


    componentWillMount() {
    this.getCourtClients();
    this.getCourtEmployees();
  }

  validation = () => {
    let clienterror = "";
    let intCaseerror = "";
    let CourtCaseerror = "";
    let courtAttorneyerror = "";
  
    if(this.state.selectedClient === "") {
      
      clienterror = "Field Required"
    }
    if(this.state.selectedInterCno === "") {
      
      intCaseerror = "Field Required"
    }
    if(this.state.selectedCourtCno === "") {
      
      CourtCaseerror = "Field Required"
    }
    if (this.state.selectedAttorney === "") {
      courtAttorneyerror = "Field Required";
    }
   
    if (
      clienterror    ||
      intCaseerror ||
      CourtCaseerror ||
      courtAttorneyerror 
    ) {
      this.setState({
        clienterror,
      intCaseerror,
      CourtCaseerror,
      courtAttorneyerror 
      });

      return false;
    }
    return true
  }

  handleSubmit = ()=>{
    var validate=this.validation()
    var self=this
    if(validate==true){
      let dayData={
        "clientname":this.state.selectedClient,
        "InternalcaseNo":this.state.selectedInterCno,
        "courtcaseNo":this.state.selectedCourtCno,
        "Dra":this.state.DraName,
        "counselassigned":this.state.selectedAttorney
      }

  axios({
    method: "post",
    url: apiurl + "/addDayreport",
    data: dayData
        
    
  })
    .then(function (response) {
      console.log(response.data, "responseresponse");
      if(response.data.status==0){
      notification.success({
        message: `DayReport Saved successfully`,
        duration: 3.5,
        placement: "topRight",
        className:"notification_dayreport"
      })
      self.state.DraName=""
      self.state.selectedClient=""
      self.state.selectedInterCno=""
      self.state.selectedCourtCno=""
      self.state.selectedAttorney=""
    
    }
    if(response.data.status==1){
      notification.warning({
        message: `DayReport Save Failed`,
        duration: 3.5,
        placement: "topRight",
        className:"notification_dayreport"
      })
    }
    
      self.setState({});
    })
    .catch(function (error) {
      console.log(error, "error");
    });
    
  }
}   

  cancelClick=()=>{
   
    this.state.DraName=""
    this.state.selectedClient=""
    this.state.selectedInterCno=""
    this.state.selectedCourtCno=""
    this.state.selectedAttorney=""
    this.setState({})
  }


  //Client Name
  storeClientValue = (event) => {
    console.log(event,"selectedClient")
    this.setState(
      {
        selectedClient: event,
        clienterror:false,
        selectedInterCno:""
      },
      () => this.getIntCaseNo(this.state.selectedClient)
    );
  };

  clientList = () => {
    let clients = [];

    if (this.state.courtClients.length > 0) {
      for (let i = 0; i < this.state.courtClients.length; i++) {
        clients.push(
          <Option key={i + 1} value={this.state.courtClients[i].ClientId}>
            {this.state.courtClients[i].ClientName}
          </Option>
        );
      }
      return clients;
    }

    console.log("fsdfjhsdfjhsdjfhjsdf", clients);
  };

  getCourtClients = () => {
    fetch(apiurl + "/listofclients", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            courtClients: responseJson.data,
          },
          () =>
            console.log(
              "sfjsdhfsdhfljsdhfjsdhfjsdfh",
              this.state.courtClients
            )
        );
      });
  };

  //InternalCaseNo
  storeIntCaseValue = (event) => {
    console.log("selectedInterCno",event)
    this.setState(
      {
        selectedInterCno: event,
        intCaseerror:false,
        selectedCourtCno:""
      },
      () => this.getCourtCaseNo(this.state.selectedInterCno)
    );
  };

  internCaseList = () => {
    let internalCase = [];

    if (this.state.internalCaseNo.length > 0) {
      for (let i = 0; i < this.state.internalCaseNo.length; i++) {
        internalCase.push(
          <Option key={i + 1} value={this.state.internalCaseNo[i].InternalCaseNo}>
            {this.state.internalCaseNo[i].InternalCaseNo}
          </Option>
        );
      }
      return internalCase;
    }

    console.log("fsdfjhsdfjhsdjfhjsdf", internalCase);
  };

  getIntCaseNo = (data) => {
    console.log(data,"bvmxbcvmcb")
    fetch(apiurl + "/getInternalcasenobasedonclient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ClientId: data }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            internalCaseNo: responseJson.data,
          },
          () =>
            console.log(
              "sfjsdhfsdhfljsdhfjsdhfjsdfh",
              this.state.internalCaseNo
            )
        );
      });
  };


    //CourtCaseNo
    storeCourtCaseValue = (event) => {
      console.log(event,"selectedCourtCno")
      console.log(JSON.stringify(event),"selectedCourtCno")
      this.setState(
        {
          selectedCourtCno: event,
          CourtCaseerror:false
        },
        () => this.getDRA(this.state.selectedCourtCno)
      );
    };
  
    courtCaseList = () => {
      let CourtCase = [];
  
      if (this.state.CourtCaseNo.length > 0) {
        for (let i = 0; i < this.state.CourtCaseNo.length; i++) {
          CourtCase.push(
            <Option key={i + 1} value={this.state.CourtCaseNo[i].CourtCaseNo}>
              {this.state.CourtCaseNo[i].CourtCaseNo}
            </Option>
          );
        }
        return CourtCase;
      }
  
      console.log("fsdfjhsdfjhsdjfhjsdf", CourtCase);
    };
  
    getCourtCaseNo = (data) => {
      fetch(apiurl + "/getcourtcasenobasedonInternalcase", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ InternalCaseNo: data }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              CourtCaseNo: responseJson.data,
            },
            () =>
              console.log(
                "sfjsdhfsdhfljsdhfjsdhfjsdfh",
                this.state.CourtCaseNo
              )
          );
        });
    };

    //DRA AUTO GENERATE
    getDRA = (data) => {
      console.log(data,"bvmxbcvmcb")
      fetch(apiurl + "/getDRAnobasedonCourtcaseno ", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ CourtCaseNo: data }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson.data,"dradrarard")
          responseJson.data.map((val) => {
            console.log("xvfjghdk",val.DRAClientName)
            this.setState({
              DraName:val.DRAClientName
            })
          })
     
        });
    };

  //Attorney Name
  storeAttorneyValue = (event) => {
    console.log(event,"selectedAttorney")
    this.setState(
      {
        selectedAttorney: event,
        courtAttorneyerror:false
      },
      () => this.getIntCaseNo(this.state.selectedAttorney)
    );
  };

  attorneyList = () => {
    let attorney = [];

    if (this.state.courtAttorney.length > 0) {
      for (let i = 0; i < this.state.courtAttorney.length; i++) {
        attorney.push(
          <Option key={i + 1} value={this.state.courtAttorney[i].EmpId}>
            {this.state.courtAttorney[i].EmpFirstName}
          </Option>
        );
      }
      return attorney;
    }

    console.log("fsdfjhsdfjhsdjfhjsdf", attorney);
  };

  getCourtEmployees = () => {
    fetch(apiurl + "/listofemployees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            courtAttorney: responseJson.data,
          },
          () =>
            console.log(
              "sfjsdhfsdhfljsdhfjsdhfjsdfh",
              this.state.courtAttorney
            )
        );
      });
  };


  render() {
 
    console.log(this.props,"caseview")
    console.log(this.state.DraName,"dra")
    return (
      <React.Fragment>
        <div className="  card card-min-height top_move">
          <div className="card-body ">
            <Grid container spacing={3}>
              <Grid item md={3} sm={5} className="w-100">
          
                  <div>
                  <label>
                    Client Name <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                value={this.state.selectedClient}
                  style={{ width: "100%" }}
                  onChange={(event) => this.storeClientValue(event)}
                >
                  {this.clientList()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.clienterror && this.state.clienterror}
                </div>
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5}>
            
                  <div>
                  <label>
                   Internal Case no <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                value={this.state.selectedInterCno}
                  style={{ width: "100%" }}
                  onChange={(event) => this.storeIntCaseValue(event)}
                >
                  {this.internCaseList()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.intCaseerror && this.state.intCaseerror}
                </div>
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5}>
             
                 <div>
                  <label>
                   Court Case no <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                value={this.state.selectedCourtCno}
                  style={{ width: "100%" }}
                  onChange={(event) => this.storeCourtCaseValue(event)}
                >
                  {this.courtCaseList()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.CourtCaseerror && this.state.CourtCaseerror}
                </div>
              </Grid>
              <Grid item md={3} sm={5} className="w-100">
                <Inputantd
                  label="DRA"
                  span=" (Auto Generate)"
                  className="w-100"
                  value={this.state.DraName}                  
                />
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5} >
          
                   <div>
                  <label>
                  Attorney<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                value={this.state.selectedAttorney}
                  style={{ width: "100%" }}
                  onChange={(event) => this.storeAttorneyValue(event)}
                >
                  {this.attorneyList()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.courtAttorneyerror && this.state.courtAttorneyerror}
                </div>
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                className="gridbtnalign"
                spacing={3}
              >
                <Grid item>
                  <Button
                    size="lg"
                    className="btnmargin btnwidth btnclr"
                    onClick={() => this.handleSubmit()}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item>
                  <Button size="lg" className="btnwidth btnclr_outline" onClick={this.cancelClick}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);
  return {
    dayreportdata: state.resumeReducer.dayreportdata,
    internalCaseno: state.day.getinterNum,
    courtCaseno: state.day.getCourtCaseNum,
    clientNames:state.fixers.clients,
    counselassigned:state.fixers.employees,
    caseView:state.day.getcaseview,
  };
};
export default connect(mapStateToProps, {
  getCourtNum,
  getIntNum,
  getCaseView,
  getClient,
  getEmployees
})(Dayreport);