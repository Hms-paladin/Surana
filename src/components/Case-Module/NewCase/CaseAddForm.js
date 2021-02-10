import React from "react";
import Grid from "@material-ui/core/Grid";
import Inputantd from "../../../formcomponent/inputantd";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Textareaantd from "../../../formcomponent/textareaantd";
import { Radio } from "antd";
import Button from "react-bootstrap/Button";
import "./Case.css";
import Calenderbox from "../../../formcomponent/calenderbox";
import Inputnumberantd from "../../../formcomponent/inputantd";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Modal, Select, option } from "antd";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import { DatePicker } from "antd";
import moment from "moment";
import {
  getcaseName,
  getcaseType,
  getcaseCity,
  getcaseAdjournment,
  getcaseBilling,
  getcaseSub,
  getcaseFiled,
  getcaseClient,
  addCaseData,
  getcaseCompany,
  getstatusUpdate,
  getProjectName
} from "./Action/CaseAction";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { apiurl } from "../../../App";
import { notification } from "antd";
import DatePickerMui from "../../../formcomponent/DatePickerMUI";
import { Divider } from "@material-ui/core";
const Axios = require("axios");
var whichindex = null;
var alldata = "";
const { Option } = Select;
class CaseAddForm extends React.Component {
  // state = {
  //     value: 1,
  //   };

  onChange = (e) => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  constructor(props) {
    super(props);

    this.state = {
      rowIndex:[],
      rowIndex1:[],

      counselIndex:[],
      counselIndex2:[],

      outsidelIndex1:[],
      outsideIndex2:[],

      amterror: false,
      data: [{ key: 1 }],
      allerror: false,
      allerrormsg: null,

      caseoppallerror: false,
      caseoppallerrormsg: null,

      casecounselallerror: false,
      casecounselallerrormsg: null,

      caseoutsideallerror: false,
      caseoutsideallerrormsg: null,

      interimallerror: false,
      interimallerrormsg: null,

      caseopp: [
        {
          name: "",
          email: "",
          phone: "",
          address: "",
          // invalidEmail:"",
        },
      ],
      casecounsel: [
        {
          name: "",
          email: "",
          phone: "",
          address: "",
          // invalidEmail:"",
        },
      ],
      caseoppCouncil:[
        {
          name: "",
          email: "",
          phone: "",
          address: "",
          // invalidEmail:"",
        },
      ],
      councilName: [],
      caseoutside: [
        {
          name: "",
          email: "",
          phone: "",
          address: "",
          // invalidEmail:"",
        },
      ],
      interim: [
        {
          Interimname: "",
          Interimappno: "",
          Interimdate: "",
          Interimdetails: "",
        },
      ],
      emailError:"",
      invalidNumber1:"",
      invalidNumber2:"",
      invalidNumber3:"",
      invalidEmail:"",
      interimNoLength:false,
      visible: false,
      value: 1,
      errordummy: true,
      casedata: {
        clientname: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },

        projectname: {
          value: "",
          validation:[{ name: "required" }],
          error: null,
          errmsg: null,
        },
        case_type: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },

        court_name: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        billing_cycle: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        suit_amount: {
          value: "",
          validation: [{  name: "allowNumaricOnly" },{name: "required" }],
          error: null,
          errmsg: null,
        },
        courtcase_no: {
          value: "",
          validation: [{name: "required" },{  name: "alphaNumaricOnly" },{name:"custommaxLength",params:"50"}],
          error: null,
          errmsg: null,
        },
        court_city: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },

        dra: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        ddra: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        ddra_two: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        due_date: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        next_hearing: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        out_status: {
          value: "",
          error: null,
          validation: [{ name: "required" }],
          errmsg: null,
        },
        ad_taken: {
          value: "",

          error: null,
          errmsg: null,
        },
        ad_takendate: {
          value: "",
          // validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        no_of_ad: {
          value: "",
          validation: [{ name: "allowNumaricOnly" },{ name: "characlimit",params:"2" }],
          error: null,
          errmsg: null,
        },

        ad_details: {
          value: "",

          error: null,
          errmsg: null,
        },
        billing_type: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        ad_billingcircle: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        subcase: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        case_description: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        case_filedby: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        billing_name: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        internal_casenum: {
          value: "",
          validation: [{name: "required" },{  name: "alphaNumaricOnly" },{name:"custommaxLength",params:"50"}],
          error: null,
          errmsg: null,
        },
      },
      whichindex: null,
    };
  }
  async componentDidMount() {
    await this.props.getcaseType();
    await this.props.getstatusUpdate();
    await this.props.getcaseName();
    await this.props.getcaseCity();
    await this.props.getcaseAdjournment();
    await this.props.getcaseBilling();
    await this.props.getcaseFiled();
    await this.props.getcaseSub();
    await this.props.getcaseClient();
    await this.props.getcaseCompany();
    await this.props.getProjectName()
    this.getEmployees();
  }
  // checkValidation = () => {
  //   var mainvalue = {};
  //   var casedata = this.state.casedata;
  //   var targetkeys = Object.keys(casedata);
  //   console.log(targetkeys, "targetkeys");
  //   for (var i in targetkeys) {
  //     var errorcheck = ValidationLibrary.checkValidation(
  //       casedata[targetkeys[i]].value,
  //       casedata[targetkeys[i]].validation
  //     );
  //     console.log(errorcheck, "errorcheck");
  //     casedata[targetkeys[i]].error = !errorcheck.state;
  //     casedata[targetkeys[i]].errmsg = errorcheck.msg;
  //     mainvalue[targetkeys[i]] = casedata[targetkeys[i]].value;
  //   }
  //   var filtererr = targetkeys.filter((obj) => casedata[obj].error == true);
  //   console.log(filtererr.length);
  //   if (filtererr.length > 0) {
  //     this.setState({ error: true });
  //   } else {
  //     this.setState({ error: false });
  //   }
  //   this.setState({
  //     mainvalue,
  //     casedata,
  //   });
  // };
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var casedata = this.state.casedata;
    var targetkeys = Object.keys(casedata);

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      casedata[key].validation
    );
    casedata[key].value = data;
    casedata[key].error = !errorcheck.state;
    casedata[key].errmsg = errorcheck.msg;
    this.setState({ casedata });
    var filtererr = targetkeys.filter(
      (obj) => casedata[obj].error == true || casedata[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  generateAlert = (description) => {
    notification.success({
      message: "Success",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  alertGenerate = (description) => {
    notification.warning({
      message: "Failed",
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  check = () => {
    var allowdata = {
      project_name: this.state.casedata.projectname.value,
      ClientId: this.state.casedata.clientname.value,
      CaseTypeId: this.state.casedata.case_type.value,
      InternalCaseNo: this.state.casedata.internal_casenum.value,
      CourtId: this.state.casedata.court_name.value,
      CourtCaseNo: this.state.casedata.courtcase_no.value,
      CityId: this.state.casedata.court_city.value,
      DRA: this.state.casedata.dra.value,
      DDRA1: this.state.casedata.ddra.value,
      DDRA2: this.state.casedata.ddra_two.value,
      DueDate: this.state.casedata.due_date.value,
      Nexthearing: this.state.casedata.next_hearing.value,
      Status: this.state.casedata.out_status.value,
      AdjournmentId: this.state.casedata.ad_taken.value,
      ATDate: this.state.casedata.ad_takendate.value,
      NoOfAdjournment: this.state.casedata.no_of_ad.value,
      Details: this.state.casedata.ad_details.value,
      BillingTypeId: this.state.casedata.billing_type.value,
      CasefiledId: this.state.casedata.case_filedby.value,
      Name: this.state.casedata.billing_name.value,
      SubcaseId: this.state.casedata.subcase.value,
      Billingcycle: this.state.casedata.billing_cycle.value,
      CaseDescription: this.state.casedata.case_description.value,
      SuitAmount: this.state.casedata.suit_amount.value,
      caseopp: this.state.caseopp,
      casecounsel: this.state.casecounsel,
      caseoutside: this.state.caseoutside,
      Interim: this.state.interim,
      caseoppcounsel:this.state.caseoppCouncil,
      // 'ClientIndustry':this.state.client_industry.value
    };
    // generateAlert = (description) => {
    //   notification.success({
    //     message: "Success",
    //     description,
    //     onClick: () => {
    //       console.log("Notification Clicked!");
    //     },
    //   });
    // };
    // Axios.post()
    //   this.props.dispatch(addCaseData(allowdata))
    // console.log('see',this.props)
    //   console.log("sdfsdlfjsdfdsf", allowdata)
    Axios({
      method: "POST",
      url: apiurl + "/addcase",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: allowdata,
    })
      .then((response) => {
        console.log(response.status,"dnmcbsdbckjsdb")
        if(response.data.status == 1){
       
        this.generateAlert("Case Added Successfully")
        this.state.casedata.case_type.value = "";
        this.state.casedata.clientname.value = "";
        this.state.casedata.internal_casenum.value = "";
        this.state.casedata.court_name.value = "";
        this.state.casedata.courtcase_no.value = "";
        this.state.casedata.court_city.value = "";
        // this.state.caseopp=""
        this.state.casedata.dra.value = "";
        this.state.casedata.ddra.value = "";
        this.state.casedata.ddra_two.value = "";
        this.state.casedata.due_date.value = "";
        this.state.casedata.next_hearing.value = "";
        this.state.casedata.out_status.value = "";
        this.state.casedata.ad_taken.value = "";
        this.state.casedata.ad_takendate.value = "";
        this.state.casedata.no_of_ad.value = "";
        this.state.casedata.ad_details.value = "";
        this.state.casedata.billing_type.value = "";
        this.state.casedata.case_filedby.value = "";
        this.state.casedata.billing_name.value = "";
        this.state.casedata.subcase.value = "";
        this.state.casedata.billing_cycle.value = "";
        this.state.casedata.case_description.value = "";
        this.state.casedata.suit_amount.value = "";
        
        this.state.caseopp.length = 1;
        this.state.caseopp.name="";
        this.state.caseopp.phone="";
        this.state.caseopp.address="";
        this.state.caseopp.email="";
        this.state.caseopp.invalidEmail="";
      
        this.state.casecounsel.length = 1;
        this.state.casecounsel.name="";
        this.state.casecounsel.phone="";
        this.state.casecounsel.address="";
        this.state.casecounsel.email="";
        
      
        this.state.caseoutside.length = 1;
        this.state.caseoutside.name="";
        this.state.caseoutside.phone="";
        this.state.caseoutside.address="";
        this.state.caseoutside.email="";
        this.state.caseoutside.invalidEmail="";
      
        this.state.interim.length = 1;
        this.state.interim.Interimname="";
        this.state.interim.Interimappno="";
        this.state.interim.Interimdate="";
        this.state.interim.Interimdetails="";
        this.setState({});
   } 
   if(response.data.status == 0 && response.data.msg=="failed"){
  this.alertGenerate("Case Could Not Be Added")
     
  }
  if(response.data.status == 0 && response.data.msg=="This InternalCaseno is AlreadyInserted"){
    this.alertGenerate("Internal Caseno Exist Already")
  }
  if(response.data.status == 0 && response.data.msg=="This CourtCaseno is AlreadyInserted"){
    this.alertGenerate("Court Caseno Exist Already")
  }
  
  })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };


  callroot = () => {
    this.state.caseopp.map((val) => {
      if (val.name === "") {
        this.setState({ caseoppallerror: true, caseoppallerrormsg: "Field Required" });
      } else if (val.phone === "") {
        this.setState({ caseoppallerror: true, caseoppallerrormsg: "Field Required" });
      } else if (val.email) {
        this.setState({ caseoppallerror: true, caseoppallerror: "Field Required" });
      } else if (val.address) {
        this.setState({ caseoppallerror: true, caseoppallerror: "Field Required" });
      } else {
        this.setState({ caseoppallerror: false });
      }
    });
    this.state.casecounsel.map((val) => {
      if (val.name === "") {
        this.setState({ casecounselallerror: true, casecounselallerrormsg: "Field Required" });
      } else if (val.phone === "") {
        this.setState({ casecounselallerror: true, casecounselallerrormsg: "Field Required" });
      } else if (val.email) {
        this.setState({ casecounselallerror: true, casecounselallerror: "Field Required" });
      } else if (val.address) {
        this.setState({ casecounselallerror: true, casecounselallerror: "Field Required" });
      } else {
        this.setState({ casecounselallerror: false });
      }
    });
    this.state.caseoutside.map((val) => {
      if (val.name === "") {
        this.setState({ caseoutsideallerror: true, caseoutsideallerrormsg: "Field Required" });
      } else if (val.phone === "") {
        this.setState({ caseoutsideallerror: true, caseoutsideallerrormsg: "Field Required" });
      } else if (val.email) {
        this.setState({ caseoutsideallerror: true, caseoutsideallerror: "Field Required" });
      } else if (val.address) {
        this.setState({ caseoutsideallerror: true, caseoutsideallerror: "Field Required" });
      } else {
        this.setState({ caseoutsideallerror: false });
      }
    });
    this.state.interim.map((val) => {
      if (val.Interimname === "") {
        this.setState({ interimallerror: true, interimallerrormsg: "Field Required" });
      } else if (val.Interimappno === "") {
        this.setState({ interimallerror: true, interimallerrormsg: "Field Required" });
      } else if (val.Interimdate) {
        this.setState({ interimallerror: true, interimallerror: "Field Required" });
      } else if (val.Interimdetails) {
        this.setState({ interimallerror: true, interimallerror: "Field Required" });
      } else {
        this.setState({ interimallerror: false });
      }
    });
    var mainvalue = {};
    var casedata = this.state.casedata;
    var targetkeys = Object.keys(casedata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        casedata[targetkeys[i]].value,
        casedata[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      casedata[targetkeys[i]].error = !errorcheck.state;
      casedata[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = casedata[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter((obj) => casedata[obj].error == true);
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
    if (filtererr.length === 0 && !this.state.amterror) {
      this.setState({
        casedata,
      });
    }
    console.log("filter", filtererr.length);
    console.log("amt", this.state.amterror);

    this.check();

    console.log(casedata, "casedata");
  };

  cancel = () => {
    this.state.casedata.subcase.value = "";
    this.state.casedata.subcase.error = null;
    this.state.casedata.subcase.errmsg = null;

    this.state.casedata.ad_billingcircle.value = "";
    this.state.casedata.ad_billingcircle.error = null;
    this.state.casedata.ad_billingcircle.errmsg = null;

    this.state.casedata.ad_details.value = "";
    this.state.casedata.ad_details.error = null;
    this.state.casedata.ad_details.errmsg = null;

    this.state.casedata.ad_taken.value = "";
    this.state.casedata.ad_taken.error = null;
    this.state.casedata.ad_taken.errmsg = null;

    this.state.casedata.billing_cycle.value = "";
    this.state.casedata.billing_cycle.error = null;
    this.state.casedata.billing_cycle.errmsg = null;

    this.state.casedata.billing_name.value = "";
    this.state.casedata.billing_name.error = null;
    this.state.casedata.billing_name.errmsg = null;

    this.state.casedata.billing_type.value = "";
    this.state.casedata.billing_type.error = null;
    this.state.casedata.billing_type.errmsg = null;

    this.state.casedata.case_description.value = "";
    this.state.casedata.case_description.error = null;
    this.state.casedata.case_description.errmsg = null;

    this.state.casedata.case_filedby.value = "";
    this.state.casedata.case_filedby.error = null;
    this.state.casedata.case_filedby.errmsg = null;

    this.state.casedata.case_type.value = "";
    this.state.casedata.case_type.error = null;
    this.state.casedata.case_type.errmsg = null;

    // this.state.casedata.client_industry.value = "";
    // this.state.casedata.client_industry.error = null;
    // this.state.casedata.client_industry.errmsg = null;

    this.state.casedata.clientname.value = "";
    this.state.casedata.clientname.error = null;
    this.state.casedata.clientname.errmsg = null;

    this.state.casedata.court_city.value = "";
    this.state.casedata.court_city.error = null;
    this.state.casedata.court_city.errmsg = null;

    this.state.casedata.court_name.value = "";
    this.state.casedata.court_name.error = null;
    this.state.casedata.court_name.errmsg = null;

    this.state.casedata.courtcase_no.value = "";
    this.state.casedata.courtcase_no.error = null;
    this.state.casedata.courtcase_no.errmsg = null;

    this.state.casedata.ddra.value = "";
    this.state.casedata.ddra.error = null;
    this.state.casedata.ddra.errmsg = null;

    this.state.casedata.ddra_two.value = "";
    this.state.casedata.ddra_two.error = null;
    this.state.casedata.ddra_two.errmsg = null;

    this.state.casedata.dra.value = "";
    this.state.casedata.dra.error = null;
    this.state.casedata.dra.errmsg = null;

    this.state.casedata.due_date.value = "";
    this.state.casedata.due_date.error = null;
    this.state.casedata.due_date.errmsg = null;

    this.state.casedata.internal_casenum.value = "";
    this.state.casedata.internal_casenum.error = null;
    this.state.casedata.internal_casenum.errmsg = null;

    this.state.casedata.next_hearing.value = "";
    this.state.casedata.next_hearing.error = null;
    this.state.casedata.next_hearing.errmsg = null;

    this.state.casedata.no_of_ad.value = "";
    this.state.casedata.no_of_ad.error = null;
    this.state.casedata.no_of_ad.errmsg = null;

    this.state.casedata.out_status.value = "";
    this.state.casedata.out_status.error = null;
    this.state.casedata.out_status.errmsg = null;

    this.state.casedata.subcase.value = "";
    this.state.casedata.subcase.error = null;
    this.state.casedata.subcase.errmsg = null;

    this.state.casedata.suit_amount.value = "";
    this.state.casedata.suit_amount.error = null;
    this.state.casedata.suit_amount.errmsg = null;

  
    this.state.caseopp.length = 1;
    this.state.caseopp.name="";
    this.state.caseopp.phone="";
    this.state.caseopp.address="";
    this.state.caseopp.email="";
    // this.state.caseopp.invalidEmail="";

    this.state.casecounsel.length = 1;
    this.state.casecounsel.name="";
    this.state.casecounsel.phone="";
    this.state.casecounsel.address="";
    this.state.casecounsel.email="";
    

    this.state.caseoutside.length = 1;
    this.state.caseoutside.name="";
    this.state.caseoutside.phone="";
    this.state.caseoutside.address="";
    this.state.caseoutside.email="";
    // this.state.caseoutside.invalidEmail="";

    this.state.interim.length = 1;
    this.state.interim.Interimname="";
    this.state.interim.Interimappno="";
    this.state.interim.Interimdate="";
    this.state.interim.Interimdetails="";

    // this.state.caseoppCouncil[0].phone="";
    // this.state.caseoppCouncil[0].name="";
    // this.state.caseoppCouncil[0].email="";
    // this.state.caseoppCouncil[0].address="";
  
    this.setState({caseoppCouncil:[
      {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
    ]});
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  addOpposite = () => {
    this.setState(
      {
        caseopp: [
          ...this.state.caseopp,
          { name: "", phone: "", email: "", address: "" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.caseopp)
    );
  };
  addOppositeCouncil = () => {
    this.setState(
      {
        caseoppCouncil: [
          ...this.state.caseoppCouncil,
          { name: "", phone: "", email: "", address: "" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.caseoppCouncil)
    );
  };
  addInterim = () => {
    this.setState(
      {
        interim: [
          ...this.state.interim,
          {
            Interimname: "",
            Interimappno: "",
            Interimdate: "",
            Interimdetails: "",
          },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.interim)
    );
  };
  addCouncilCase = () => {
    this.setState(
      {
        casecounsel: [
          ...this.state.casecounsel,
          { name: "", phone: "", email: "", address: "" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.casecounsel)
    );
  };
  addOutside = () => {
    this.setState(
      {
        caseoutside: [
          ...this.state.caseoutside,
          { name: "", phone: "", email: "", address: "" },
        ],
      },
      () => console.log("sdfdsfljdsf", this.state.caseoutside)
    );
  };
  removeItems = (index) => {
    let list = this.state.caseopp;
    list.splice(index, 1);
    this.setState({ list });
  };

  removeCaseOppCouncil = (index) => {
    let list = this.state.caseoppCouncil;
    list.splice(index, 1);
    this.setState({ list });
  };

  removeCouncil = (index) => {
    let list = this.state.casecounsel;
    list.splice(index, 1);
    this.setState({ list });
  };
  removeOutside = (index) => {
    let list = this.state.caseoutside;
    list.splice(index, 1);
    this.setState({ list });
  };
  removeInterim = (index) => {
    let list = this.state.interim;
    list.splice(index, 1);
    this.setState({ list });
  };

  handleChange = (e, key, index) => {
    console.log("checkingindex", key,index);
  
    let Opposite = this.state.caseopp;
    let getOpposite = Opposite[index];
    console.log("Opposite[index]",Opposite);
    if (key === "opp_name") {
      getOpposite.name = e.target.value;
      console.log("empty", getOpposite.name);
      getOpposite.name !== "" && this.setState({ allerror: false });
    } else if (key === "opp_phoneno"  ) {
      getOpposite.phone = e.target.value;
      this.invalidateNumber1(getOpposite.phone,index)
      console.log("number", getOpposite.phone);
    } else if (key === "opp_mail") {
      getOpposite.email = e.target.value;
      this.validateEmail1(getOpposite.email,index)
      console.log("maill", getOpposite.email);
    } else if (key === "opp_address") {
      getOpposite.address = e.target.value;
      console.log("addresss", getOpposite.address);
    }
    this.setState({ caseopp: Opposite });
  };

  validateEmail1 = (data,index) => {
    console.log("emailField", data)
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(reg.test(data)) {
      if(this.state.rowIndex1.includes(index)){
        
        const rowIndex1 = this.state.rowIndex1.filter(close => close !== index)
        this.setState({rowIndex1})
        console.log(rowIndex1,"thisstatecloseCasefilter")
       
      }
    
    console.log("nvmbnkgn",data,index)
  
      this.setState({invalidEmail1:false,rowno1:index})
  }else{
    console.log("sadfjgasdfjkasdf",this.state.rowIndex1.find(item => item !== index))
    if(this.state.rowIndex1.length === 0){
   
      this.state.rowIndex1.push(index)
    }else if(this.state.rowIndex1.every(item => item !== index)){
    
      this.state.rowIndex1.push(index)
    }

    this.setState({invalidEmail1:true, rowno1:index})
    
  }

    // return true;
  };

  invalidateNumber1 = (data,index) => {
    var reg = /^([0-9][0-9]{7,14})$/;

  
    console.log(this.state.rowIndex,"rowINdex")

    
    if(reg.test(data)) {
     

      if(this.state.rowIndex.includes(index)){
        
          const rowIndex = this.state.rowIndex.filter(close => close !== index)
          this.setState({rowIndex})
          console.log(rowIndex,"thisstatecloseCasefilter")
         
        }
      
      console.log("nvmbnkgn",data,index)
      this.setState({invalidNumber1:false,rowno:index})

    

    }else{
      console.log("sadfjgasdfjkasdf",this.state.rowIndex.find(item => item !== index))
      if(this.state.rowIndex.length === 0){
     
        this.state.rowIndex.push(index)
      }else if(this.state.rowIndex.every(item => item !== index)){
      
        this.state.rowIndex.push(index)
      }

      this.setState({invalidNumber1:true, rowno:index})
      
    }

  
  }

  handleCouncil = (e, key, index) => {
    e.preventDefault();
 
    let Council = this.state.casecounsel;
    let getCouncil = Council[index];
    if (key === "name") {
      getCouncil.name = e.target.value;
      console.log("empty", getCouncil.name);
      getCouncil.name !== "" && this.setState({ allerror: false });
    } else if (key === "phone") {
      getCouncil.phone = e.target.value;
      this.invalidateNumber2(getCouncil.phone,index)
      console.log("number", getCouncil.phone);
    } else if (key === "email") {
      getCouncil.email = e.target.value;
      this.validateEmail2(getCouncil.email,index)
      console.log("maill", getCouncil.email);
    } else if (key === "council_address") {
      getCouncil.address = e.target.value;
      console.log("addresss", getCouncil.address);
    }
    this.setState({ casecounsel: Council });
  };

  validateEmail2 = (data,index) => {
    console.log("emailField", data)
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(reg.test(data)) {
      console.log("cmvdgfdj",data)
      if(this.state.counselIndex2.includes(index)){
        
        const counselIndex2 = this.state.counselIndex2.filter(close => close !== index)
        this.setState({counselIndex2})
        console.log(counselIndex2,"thisstatecloseCasefilter")
       
      }
    
    console.log("nvmbnkgn",data,index)
  
      this.setState({invalidEmail2:false,rowno1:index})
  }else{
    console.log("sadfjgasdfjkasdf",this.state.counselIndex2.find(item => item !== index))
    if(this.state.counselIndex2.length === 0){
   
      this.state.counselIndex2.push(index)
    }else if(this.state.counselIndex2.every(item => item !== index)){
    
      this.state.counselIndex2.push(index)
    }

    this.setState({invalidEmail2:true, rowno1:index})
    
  }

    // return true;
  };

  invalidateNumber2 = (data,index) => {
    var reg = /^([0-9][0-9]{7,14})$/;

    if(reg.test(data)) {
      if(this.state.counselIndex.includes(index)){
        
        const counselIndex = this.state.counselIndex.filter(close => close !== index)
        this.setState({counselIndex})
        console.log(counselIndex,"thisstatecloseCasefilter")
       
      }
    
    console.log("nvmbnkgn",data,index)
    this.setState({invalidNumber2:false,counselrowno:index})

    }else{
      console.log("sadfjgasdfjkasdf",this.state.counselIndex.find(item => item !== index))
      if(this.state.counselIndex.length === 0){
     
        this.state.counselIndex.push(index)
      }else if(this.state.counselIndex.every(item => item !== index)){
      
        this.state.counselIndex.push(index)
      }

      this.setState({invalidNumber2:true, counselrowno:index})
     
    }

  }

  handleOutside = (e, key, index) => {
    e.preventDefault();
 
    let Outside = this.state.caseoutside;
    let getOutside = Outside[index];
    if (key === "name") {
      getOutside.name = e.target.value;
      console.log("empty", getOutside.name);
      getOutside.name !== "" && this.setState({ allerror: false });
    } else if (key === "phone") {
      getOutside.phone = e.target.value;
      this.invalidateNumber3(getOutside.phone,index)
      console.log("number", getOutside.phone);
    } else if (key === "email") {
      getOutside.email = e.target.value;
      this.validateEmail3(getOutside.email,index)
      console.log("maill", getOutside.email);
    } else if (key === "address") {
      getOutside.address = e.target.value;
      console.log("addresss", getOutside.address);
    }
    this.setState({ caseoutside: Outside });
  };
  validateEmail3 = (data,index) => {
    console.log("emailField", data)
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if(reg.test(data)) {
      if(this.state.outsideIndex2.includes(index)){
        
        const outsideIndex2 = this.state.outsideIndex2.filter(close => close !== index)
        this.setState({outsideIndex2})
        console.log(outsideIndex2,"thisstatecloseCasefilter")
       
      }
    
    console.log("nvmbnkgn",data,index)
  
      this.setState({invalidEmail3:false,rowno1:index})
  }else{
    console.log("sadfjgasdfjkasdf",this.state.outsideIndex2.find(item => item !== index))
    if(this.state.outsideIndex2.length === 0){
   
      this.state.outsideIndex2.push(index)
    }else if(this.state.outsideIndex2.every(item => item !== index)){
    
      this.state.outsideIndex2.push(index)
    }
       this.setState({invalidEmail3:true,rowno1:index})
  }

    // return true;
  };
  invalidateNumber3 = (data,index) => {
    var reg = /^([0-9][0-9]{7,14})$/;

    if(reg.test(data)) {
      if(this.state.outsidelIndex1.includes(index)){
        
        const outsidelIndex1 = this.state.outsidelIndex1.filter(close => close !== index)
        this.setState({outsidelIndex1})
        console.log(outsidelIndex1,"thisstatecloseCasefilter")
       
      }
    
    console.log("nvmbnkgn",data,index)
    this.setState({invalidNumber3:false,counselrowno:index})
    }else{
      console.log("sadfjgasdfjkasdf",this.state.outsidelIndex1.find(item => item !== index))
      if(this.state.outsidelIndex1.length === 0){
     
        this.state.outsidelIndex1.push(index)
      }else if(this.state.outsidelIndex1.every(item => item !== index)){
      
        this.state.outsidelIndex1.push(index)
      }

      this.setState({invalidNumber3:true, counselrowno:index})
     
    }

  }
  handleInterim = (e, key, num,data) => {
    console.log("sdfjshdfjsdhf", e, key, num)
    e.preventDefault();
  

    let Interim = this.state.interim;
    let getInterim = Interim[num];
    if (key === "Interimname") {
      getInterim.Interimname = e.target.value;
      console.log("empty", getInterim.Interimname);
      getInterim.Interimname !== "" && this.setState({ allerror: false });
    } else if (key === "int_num") {
      getInterim.Interimappno = e.target.value;
      // console.log("numbernumber", getInterim.Interimappno.length > 10);
    } 
    if (key === "int_num" && getInterim.Interimappno.length > 10) {
      
      this.state.interimNoLength=true
      console.log("numbernumber",  this.state.interimNoLength);
    }
    if (key === "int_num" && getInterim.Interimappno.length < 10 ) {
      
      this.state.interimNoLength=false
      console.log("numbernumber",  this.state.interimNoLength);
    }
     else if (key === "int_date") {
      getInterim.Interimdate = data;
      console.log("maill", getInterim.Interimdate);
    } else if (key === "int_detail") {
      getInterim.Interimdetails = e.target.value;
      console.log("addresss", getInterim.Interimdetails);
    }
    this.setState({ interim: Interim });
  };

  simple = (data, index) => {
    console.log(data,index,"fooewkrjtj")
    if(index==index){
     this.state.interim[index].Interimdate=data
     
    }
    this.setState({})
    console.log(this.state.interim[index],"fooewkrjtj")
    // let selectedDate = data !== null ? data._d : "";

    // if (selectedDate === "") {
    //   var convertDate = "";
    // } else {
    //   var convertDate =
    //     selectedDate.getFullYear() +
    //     "-" +
    //     (selectedDate.getMonth() + 1) +
    //     "-" +
    //     selectedDate.getDate();
    // }

    // this.state.interim.map((val, index) => {
    //   if (num === index) {
    //     val.Interimdate = convertDate;
    //     console.log("sadfkjsahfajkherkjhaskjdf", val);

    //     this.setState(
    //       {
    //         Interimdate: val,
    //       },
    //       () =>
    //         console.log("safkjsdhfjshfjsdfh", this.state.interim[0].Interimdate)
    //     );
    //   }
    // });

    // this.setState({});
  };
  getEmployees = () => {
    fetch(apiurl + "/listofemployees", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("sdflkjsdlkfjsdfkdfdsjdf", responseJson);
        this.setState({
          councilName: responseJson.data,
        });
      });
  };
  nameList = () => {
    var councilName = [];
    for (let i = 0; i < this.state.councilName.length; i++) {
      console.log(this.state.councilName, "councilName");
      councilName.push(
        <Option key={i + 1} value={this.state.councilName[i].EmpFirstName}>
          {this.state.councilName[i].EmpFirstName}
        </Option>
      );
    }
    return councilName;
  };
  nameSelect = (event, num) => {
    let allerror = "";
    this.state.casecounsel.map((val, index) => {
      whichindex = index;
      if (val.councilName === "") {
        allerror = "Field Required";
      }
      if (num === index) {
        val.name = event;
        this.state.casecounsel[num].name=event
        // console.log("sdfjkshdfjhdsjfhsdfj", val);
        this.setState({
          // name: val,
        });
      }
    });
  };

  oppcouncil=(e,name,index)=>{
    this.state.caseoppCouncil[index][name] = e.target.value
    this.setState({})
  }

  render() {
   console.log(this.state.caseoppCouncil,"caseoppCouncil")
    return (
      <React.Fragment>
        <div className="card card-min-height mt-3">
          <div className="card card-body">
            <Grid container spacing={2}>
            <Grid item sm={5} md={3} >
              {/* onClick={this.showModal} */}
                <Dropdownantd
                  label={"Project Name"}
                  className={"w-75"}
                  option={
                    this.props.projectName &&
                    this.props.projectName.map((val) => val.ProjectName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "projectname")
                  }
                  value={this.state.casedata.projectname.value}
                  error={this.state.casedata.projectname.error}
                  errmsg={this.state.casedata.projectname.errmsg}
                />
              </Grid>
              <Grid item sm={5} md={3}>
                <Dropdownantd
                  label={"Client Name"}
                  className={"w-75"}
                  option={
                    this.props.caseCompany &&
                    this.props.caseCompany.map((val) => val.ClientName)
                  }
                  changeData={(data) => this.changeDynamic(data, "clientname")}
                  value={this.state.casedata.clientname.value}
                  error={this.state.casedata.clientname.error}
                  errmsg={this.state.casedata.clientname.errmsg}
                />
              </Grid>
              <Grid item sm={5} md={3}>
                <Dropdownantd
                  label={"Case Type"}
                  className={"w-75 case_type"}
                  option={
                    this.props.caseType &&
                    this.props.caseType.map((val) => val.CaseTypeName)
                  }
                  changeData={(data) => this.changeDynamic(data, "case_type")}
                  value={this.state.casedata.case_type.value}
                  error={this.state.casedata.case_type.error}
                  errmsg={this.state.casedata.case_type.errmsg}
                />
              </Grid>
              <Grid item sm={5} md={3}>
                <Inputantd
                  label={"Internal Case Number"}
                  className={"w-75"}
                  changeData={(data) =>
                    this.changeDynamic(data, "internal_casenum")
                  }
                  value={this.state.casedata.internal_casenum.value}
                  error={this.state.casedata.internal_casenum.error}
                  errmsg={this.state.casedata.internal_casenum.errmsg}
                />
              </Grid>
              </Grid>
            <Grid container spacing={2} className="mt-4">
              <Grid item sm={12} md={12}>
                <h6 className="form-subheading">Court</h6>
              </Grid>
              <Grid item sm={6} md={3}>
                <Dropdownantd
                  label={"Court Name"}
                  className={"w-100"}
                  option={
                    this.props.caseName &&
                    this.props.caseName.map((val) => val.CourtName)
                  }
                  changeData={(data) => this.changeDynamic(data, "court_name")}
                  value={this.state.casedata.court_name.value}
                  error={this.state.casedata.court_name.error}
                  errmsg={this.state.casedata.court_name.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={6} md={3}>
                <Inputantd
                  label={"Court Case No"}
                  className={"w-100"}
                  changeData={(data) =>
                    this.changeDynamic(data, "courtcase_no")
                  }
                  value={this.state.casedata.courtcase_no.value}
                  error={this.state.casedata.courtcase_no.error}
                  errmsg={this.state.casedata.courtcase_no.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={6} md={3}>
                <Dropdownantd
                  label={"Court City"}
                  className={"w-100"}
                  option={
                    this.props.caseCity &&
                    this.props.caseCity.map((val) => val.CityName)
                  }
                  changeData={(data) => this.changeDynamic(data, "court_city")}
                  value={this.state.casedata.court_city.value}
                  error={this.state.casedata.court_city.error}
                  errmsg={this.state.casedata.court_city.errmsg}
                />
              </Grid>
            </Grid>
            
            <Grid container spacing={2} className="mt-4">
              <Grid item sm={6} md={3}>
                <Dropdownantd
                  label={"DRA"}
                  span="(Direct Responsible Attorney)"
                  className={"w-100"}
                  option={
                    this.props.caseClient &&
                    this.props.caseClient.map((val) => val.EmpFirstName)
                  }
                  changeData={(data) => this.changeDynamic(data, "dra")}
                  value={this.state.casedata.dra.value}
                  error={this.state.casedata.dra.error}
                  errmsg={this.state.casedata.dra.errmsg}
                  required
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={6} md={3} >
                <Dropdownantd
                  label={"DDRA"}
                  span="(Deputy DRA)"
                  className={"w-100"}
                  option={
                    this.props.caseClient &&
                    this.props.caseClient.map((val) => val.EmpFirstName)
                  }
                  changeData={(data) => this.changeDynamic(data, "ddra")}
                  value={this.state.casedata.ddra.value}
                  error={this.state.casedata.ddra.error}
                  errmsg={this.state.casedata.ddra.errmsg}
                  required
                />
                 </Grid>
                 <Grid md={1} />
              <Grid item sm={6} md={3}>
                <Dropdownantd
                  className={"w-100"}
                  label={"Responsible Attorney"}
                  option={
                    this.props.caseClient &&
                    this.props.caseClient.map((val) => val.EmpFirstName)
                  }
                  changeData={(data) => this.changeDynamic(data, "ddra_two")}
                  value={this.state.casedata.ddra_two.value}
                  error={this.state.casedata.ddra_two.error}
                  errmsg={this.state.casedata.ddra_two.errmsg}
                  required
                />
              </Grid>
              </Grid>
            
            <Grid container spacing={2} className="mt-4 ">
              <Grid item sm={5} md={3} className="adding_case">
                <DatePickerMui
                  label={"Due Date"}
                  className={"w-75 mt-4"}
                  datefmt="yyyy-mm-dd"
                  changeData={(data) => this.changeDynamic(data, "due_date")}
                  value={this.state.casedata.due_date.value}
                  error={this.state.casedata.due_date.error}
                  errmsg={this.state.casedata.due_date.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={5} md={3} className="adding_case">
                <DatePickerMui
                  label={"Next Hearing"}
                  className={"w-100"}
                  datefmt="yyyy-mm-dd"
                  changeData={(data) =>
                    this.changeDynamic(data, "next_hearing")
                  }
                  value={this.state.casedata.next_hearing.value}
                  error={this.state.casedata.next_hearing.error}
                  errmsg={this.state.casedata.next_hearing.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item sm={5} md={3} className="adding_case">
                <Dropdownantd
                  label={"Status"}
                  className={"w-100"}
                  option={
                    this.props.statusType &&
                    this.props.statusType.map(
                      (val) => val.Status
                    )
                  }
                  changeData={(data) => this.changeDynamic(data, "out_status")}
                  value={this.state.casedata.out_status.value}
                  error={this.state.casedata.out_status.error}
                  errmsg={this.state.casedata.out_status.errmsg}
                />
              </Grid>
            </Grid>
        

            <Grid container spacing={2}>
              <Grid item sm={12} md={12}>
                <div>
                  <h6 className="form-subheading">Our Counsel</h6>
                </div>
                <div className="card top_move">
                  <div className="card-body">
                    <div className="newExp_border">
                      <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addCouncilCase}
                          className="newExp_addicon"
                        />
                      </div>
                      {this.state.casecounsel.map((val, index) => {
                        return (
                          <div className="flex">
                            <Grid item sm={6} md={3} className="mt-2">
                        
                              <div>
                                <label>Name</label>
                              </div>
                              <Select
                                onChange={(event) =>
                                  this.nameSelect(event, index)
                                }
                                value={this.state.casecounsel[index].name}
                                style={{ width: "100%" }}
                              >
                                {this.nameList()}
                              </Select>

                              <div>
                                {this.state.casecounselallerror &&
                                  this.state.casecounsel[index].name == "" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.casecounselallerrormsg}
                                    </span>
                                  )}
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                        
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Phone No</label>
                                </div>
                                <input
                                  type="number"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleCouncil(e, "phone", index)
                                  }
                                  value={this.state.casecounsel.phone}
                                />
                                <div>
                                  {this.state.casecounselallerror &&
                                    this.state.casecounsel[index].phone ==
                                      "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.casecounselallerrormsg}
                                      </span>
                                    )}
                                </div>
                                <div className="texterrmsg">{ this.state.counselIndex.length > 0  && this.state.counselIndex.includes(index) && <span>Please Enter 8 to 15 digit Mobile Number</span>}</div>

                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                      
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Email</label>
                                </div>
                                <input
                                  type="email"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleCouncil(e, "email", index)
                                  }
                                  value={this.state.casecounsel.email}
                                />
                                 {/* <div className="texterrmsg">{this.state.allerrormsg }</div> */}
                                <div>
                                  {this.state.casecounselallerror &&
                                    this.state.casecounsel[index].email ==
                                      "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.casecounselallerrormsg}
                                      </span>
                                    )}
                                </div>
                                <div className="texterrmsg">{ this.state.counselIndex2.length > 0  && this.state.counselIndex2.includes(index) && "Invalid Email"}</div>

                              </div>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item sm={6} md={3}>
                      
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Address</label>
                                </div>
                                <textarea
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "60px",
                                    resize: "none",
                                  }}
                                  onChange={(e) =>
                                    this.handleCouncil(
                                      e,
                                      "council_address",
                                      index
                                    )
                                  }
                                  value={this.state.casecounsel.address}
                                />
                                <div>
                                  {this.state.casecounselallerror &&
                                    this.state.casecounsel[index].address ==
                                      "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.casecounselallerrormsg}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </Grid>
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeCouncil(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <div>
                  <h6 className="form-subheading">Our External Counsel</h6>
                </div>
                <div className="card top_move">
                  <div className="card-body">
                    <div className="newExp_border">
                      <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addOutside}
                          className="newExp_addicon"
                        />
                      </div>
                      {this.state.caseoutside.map((val, index) => {
                        return (
                          <div className="d-flex">
                            <Grid item sm={6} md={3}>
                     
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Name</label>
                                </div>
                                <input
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleOutside(e, "name", index)
                                  }
                                  value={this.state.caseoutside.name}
                                />
                                <div>
                                  {this.state.caseoutsideallerror && this.state.caseoutside[index].name =="" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoutsideallerrormsg}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                         
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Phone No</label>
                                </div>
                                <input
                                  type="number"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleOutside(e, "phone", index)
                                  }
                                  value={this.state.caseoutside.phone}
                                />
                                <div>
                                  {this.state.caseoutsideallerror && this.state.caseoutside[index].phone =="" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoutsideallerrormsg}
                                    </span>
                                  )}
                                </div>
                                <div className="texterrmsg">{ this.state.outsidelIndex1.length > 0  && this.state.outsidelIndex1.includes(index) && <span>Please Enter 8 to 15 digit Mobile Number</span>}</div>

                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                      
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Email</label>
                                </div>
                                <input
                                  type="email"
                                  onblur={this.validateEmail}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleOutside(e, "email", index)
                                  }
                                  value={this.state.caseoutside.email}
                                  required
                                />
                                 {/* <div className="texterrmsg">{this.state.allerrormsg }</div> */}
                                <div>
                                  {this.state.caseoutsideallerror && this.state.caseoutside[index].email =="" &&(
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoutsideallerrormsg}
                                    </span>
                                  )}
                                </div>
                                <div className="texterrmsg">{ this.state.outsideIndex2.length > 0  && this.state.outsideIndex2.includes(index) && "Invalid Email"}</div>

                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={10} md={3}>
                              {/* <Textareaantd
                            label={"Address"}
                            className={"w-100"}
                            changeData={(data) =>
                              this.changeDynamic(data, "address")
                            }
                            value={this.state.casedata.address.value}
                            error={this.state.casedata.address.error}
                            errmsg={this.state.casedata.address.errmsg}
                          /> */}
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Address</label>
                                </div>
                                <textarea
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "60px",
                                    resize: "none",
                                  }}
                                  onChange={(e) =>
                                    this.handleOutside(e, "address", index)
                                  }
                                  value={this.state.caseoutside.address}
                                />
                                <div>
                                  {this.state.caseoutsideallerror && this.state.caseoutside[index].address =="" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoutsideallerrormsg}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeOutside(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
           
            <Grid container spacing={2}>
              <Grid item sm={12} md={12}>
                <div>
                  <h6 className="form-subheading">Opposite Party</h6>
                </div>
                <div className="card top_move">
                  <div className="card-body">
                    <div className="newExp_border">
                      <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addOpposite}
                          className="newExp_addicon"
                        />
                      </div>
                      {this.state.caseopp.map((val, index) => {

                        console.log("asdfkjhsdfjs",this.state.rowIndex.includes(index))
                        return (
                          <div className="flex">
                            <Grid item sm={6} md={3}>
                     
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Name</label>
                                </div>
                                <input
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "opp_name", index)
                                  }
                                  value={this.state.caseopp.name}
                                />
                                <div>
                                  {this.state.caseoppallerror &&
                                    this.state.caseopp[index].name == "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.caseoppallerrormsg}
                                      </span>
                                    )}
                                </div>
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                         
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Phone No</label>
                                </div>
                                <input
                                  type="number"
                                  id="phone"
                                  name="phone"
                                  maxlength="15"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "opp_phoneno", index)
                                  }
                                  value={this.state.caseopp.phone}
                                />

                                <div>
                                  {this.state.caseoppallerror &&
                                    this.state.caseopp[index].phone == "" && (
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {this.state.caseoppallerrormsg}
                                      </span>
                                    )}
                                </div>
                                <div className="texterrmsg">{ this.state.rowIndex.length > 0  && this.state.rowIndex.includes(index) && <span>Please Enter 8 to 15 digit Mobile Number</span>}</div>

                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Email</label>
                                </div>
                                <input
                                  type="email"
                                  id="email"
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                  title="Invalid email address"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "opp_mail", index)
                                  }
                                  value={this.state.caseopp.email}
                                />
                                {/* <div className="texterrmsg">{this.state.allerrormsg }</div> */}
                                <div>
                                  {this.state.caseoppallerror&& 
                                  this.state.caseopp[index].email =="" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoppallerrormsg}
                                    </span>
                                  )}
                                </div>
                                <div className="texterrmsg">{ this.state.rowIndex1.length > 0  && this.state.rowIndex1.includes(index) && "Invalid Email"}</div>

                              </div>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Address</label>
                                </div>
                                <textarea
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "60px",
                                    resize: "none",
                                  }}
                                  onChange={(e) =>
                                    this.handleChange(e, "opp_address", index)
                                  }
                                  value={this.state.caseopp.address}
                                />
                                <div>
                                  {this.state.caseoppallerror && this.state.caseopp[index].address ==""&& (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.caseoppallerrormsg}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeItems(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>


            <Grid container spacing={2}>
              <Grid item sm={12} md={12}>
                <div>
                  <h6 className="form-subheading">Opposite Party Counsel</h6>
                </div>
                <div className="card top_move">
                  <div className="card-body">
                    <div className="newExp_border">
                      <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addOppositeCouncil}
                          className="newExp_addicon"
                        />
                      </div>
                      {this.state.caseoppCouncil.map((val, index) => {

                        console.log("asdfkjhsdfjs",this.state.rowIndex.includes(index))
                        return (
                          <div className="flex">
                            <Grid item sm={6} md={3}>
                     
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Name</label>
                                </div>
                                <input
                                onChange={(e) =>
                                  this.oppcouncil(e, "name",index)
                                }
                                value={this.state.caseoppCouncil[index].name}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                
                                />
                            
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                         
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Phone No</label>
                                </div>
                                <input
                                  type="number"
                                  id="phone"
                                  name="phone"
                                  maxlength="15"
                                  onChange={(e) =>
                                    this.oppcouncil(e, "phone",index)
                                  }
                                  value={this.state.caseoppCouncil[index].phone}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                
                                />

                             
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Email</label>
                                </div>
                                <input
                                  onChange={(e) =>
                                    this.oppcouncil(e, "email",index)
                                  }
                                  value={this.state.caseoppCouncil[index].email}
                                  type="email"
                                  id="email"
                                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                  title="Invalid email address"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                 
                                />
                                {/* <div className="texterrmsg">{this.state.allerrormsg }</div> */}
                             
                              </div>
                            </Grid>
                            <Grid item md={1} />
                            <Grid item sm={6} md={3}>
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Address</label>
                                </div>
                                <textarea
                                  onChange={(e) =>
                                    this.oppcouncil(e, "address",index)
                                  }
                                  value={this.state.caseoppCouncil[index].address}
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "60px",
                                    resize: "none",
                                  }}
                                
                                />
                             
                              </div>
                            </Grid>
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeCaseOppCouncil(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                      
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid>
              <div className="court_divider" />
            </Grid>

            <Grid container spacing={2} >
            <Grid item sm={12} md={12}>
              <h6 className="form-subheading">Adjourment</h6>
            </Grid>
           
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label={"Adjourment Taken"}
                  className={"w-100"}
                  option={
                    this.props.caseAdjournment &&
                    this.props.caseAdjournment.map(
                      (val) => val.AdjournmentTaken
                    )
                  }
                  changeData={(data) => this.changeDynamic(data, "ad_taken")}
                  value={this.state.casedata.ad_taken.value}
                  error={this.state.casedata.ad_taken.error}
                  errmsg={this.state.casedata.ad_taken.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5}>
                <DatePickerMui
                  label={"Adjourment Taken Date"}
                  className={"w-100"}
                  datefmt="yyyy-mm-dd"
                  changeData={(data) =>
                    this.changeDynamic(data, "ad_takendate")
                  }
                  value={this.state.casedata.ad_takendate.value}
                  error={this.state.casedata.ad_takendate.error}
                  errmsg={this.state.casedata.ad_takendate.errmsg}
                />
              </Grid>
              <Grid md={1} />
              <Grid item md={3} sm={5}>
                <Inputnumberantd
                  label={"No of Adjourment"}
                  className={"w-100"}
                  changeData={(data) => this.changeDynamic(data, "no_of_ad")}
                  value={this.state.casedata.no_of_ad.value}
                  error={this.state.casedata.no_of_ad.error}
                  errmsg={this.state.casedata.no_of_ad.errmsg}
                />
              </Grid>
              <Grid item md={6} sm={5} className="ad_details_adjust">
                <Textareaantd
                  label={"Details"}
                  className={"w-100"}
                  changeData={(data) => this.changeDynamic(data, "ad_details")}
                  value={this.state.casedata.ad_details.value}
                  error={this.state.casedata.ad_details.error}
                  errmsg={this.state.casedata.ad_details.errmsg}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} >
              <Grid item md={12} sm={12}>
                <div>
                  <h6 className="form-subheading"> Add Case</h6>
                </div>
              </Grid>

            
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Case Filed by"
                  className="w-75 adding_case"
                  option={
                    this.props.caseFiled &&
                    this.props.caseFiled.map((val) => val.Casefiledby)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "case_filedby")
                  }
                  value={this.state.casedata.case_filedby.value}
                  error={this.state.casedata.case_filedby.error}
                  errmsg={this.state.casedata.case_filedby.errmsg}
                />
              </Grid>
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Name"
                  className="w-75 adding_case"
                  option={
                    this.props.caseClient &&
                    this.props.caseClient.map((val) => val.EmpFirstName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "billing_name")
                  }
                  value={this.state.casedata.billing_name.value}
                  error={this.state.casedata.billing_name.error}
                  errmsg={this.state.casedata.billing_name.errmsg}
                />
              </Grid>
              <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Subcase of"
                  className="w-75 adding_case"
                  option={
                    this.props.caseSub &&
                    this.props.caseSub.map((val) => val.Subcasename)
                  }
                  changeData={(data) => this.changeDynamic(data, "subcase")}
                  value={this.state.casedata.subcase.value}
                  error={this.state.casedata.subcase.error}
                  errmsg={this.state.casedata.subcase.errmsg}
                />
              </Grid>

              <Grid md={6} sm={5} style={{marginLeft:"5px",marginTop:"1.1rem"}}>
                <Textareaantd
                  label={"Case Description"}
                  className={"w-100"}
                  changeData={(data) =>
                    this.changeDynamic(data, "case_description")
                  }
                  value={this.state.casedata.case_description.value}
                  error={this.state.casedata.case_description.error}
                  errmsg={this.state.casedata.case_description.errmsg}
                />
              </Grid>

            </Grid>

            <Grid container spacing={2} className="caseaddform">
            <Grid item md={12} sm={12}>
                <div>
                  <h6 className="form-subheading "> Add Billing</h6>
                </div>
              </Grid>
              
                <Grid item md={4} sm={5}>
                <Dropdownantd
                  label="Billing Type"
                  className="w-75 adding_case"
                  option={
                    this.props.caseBilling &&
                    this.props.caseBilling.map((val) => val.BillingTypeName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "billing_type")
                  }
                  value={this.state.casedata.billing_type.value}
                  error={this.state.casedata.billing_type.error}
                  errmsg={this.state.casedata.billing_type.errmsg}
                />
              </Grid>
                  <Grid item md={4} sm={5}>
                    <Inputantd
                      label={"Billing Cycle"}
                      className={"w-75 adding_case "}
                      changeData={(data) =>
                        this.changeDynamic(data, "billing_cycle")
                      }
                      value={this.state.casedata.billing_cycle.value}
                      error={this.state.casedata.billing_cycle.error}
                      errmsg={this.state.casedata.billing_cycle.errmsg}
                    />
                  </Grid>
                  <Grid md={4} sm={5} style={{marginTop:"7px"}}>
                    <Inputantd
                      label={"Suit Amount"}
                      className={"w-75 adding_case"}
                      changeData={(data) =>
                        this.changeDynamic(data, "suit_amount")
                      }
                      value={this.state.casedata.suit_amount.value}
                      error={this.state.casedata.suit_amount.error}
                      errmsg={this.state.casedata.suit_amount.errmsg}
                    />
                  </Grid>
               
              
              <Grid md={1} sm={6} />
           
            </Grid>


            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <div>
                  <h6 className="form-subheading"> Add Interim Application</h6>
                </div>
                <div className="card top_move">
                  <div className="card-body">
                    <div className="newExp_border">
                      <div>
                        <AddCircleOutlineOutlinedIcon
                          onClick={this.addInterim}
                          className="newExp_addicon"
                        />
                      </div>
                      {this.state.interim.map((val, index) => {
                        console.log("jisjlsjks", val.Interimdate);
                        return (
                          <div className="d-flex">
                            <Grid item sm={6} md={3}>
                              {/* <Inputantd
                            label={"Name"}
                            className={"w-100"}
                            changeData={(data) =>
                              this.changeDynamic(data, "name")
                            }
                            value={this.state.casedata.name.value}
                            error={this.state.casedata.name.error}
                            errmsg={this.state.casedata.name.errmsg}
                          /> */}
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Interim Name</label>
                                </div>
                                <input
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                  }}
                                  onChange={(e) =>
                                    this.handleInterim(e, "Interimname", index)
                                  }
                                  value={this.state.interim.Interimname}
                                />
                                <div>
                                  {this.state.interimallerror && this.state.interim[index].Interimname =="" &&(
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.interimallerrormsg}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3}>
                              {/* <Inputantd
                            label={"Phone No"}
                            className={"w-100"}
                            changeData={(data) =>
                              this.changeDynamic(data, "out_phone")
                            }
                            value={this.state.casedata.out_phone.value}
                            error={this.state.casedata.out_phone.error}
                            errmsg={this.state.casedata.out_phone.errmsg}
                          /> */}
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Interim App no</label>
                                </div>
                                <input
                                // maxlength="10"
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "34px",
                                    
                                  }}
                                  onChange={(e) =>
                                    this.handleInterim(e, "int_num", index)
                                  }
                                  value={this.state.interim.Interimappno}
                                />
                                <div>
                                  {this.state.interimallerror && this.state.interim[index].Interimappno =="" &&(
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.interimallerrormsg}
                                    </span>
                                  )}
                                  {this.state.interimNoLength ? <span style={{ color: "red", fontSize: "12px" }}>Length more than 10 Characters</span> : ""}
                                </div> 
                              </div>
                            </Grid>
                            <Grid md={1} />
                            <Grid item sm={6} md={3} style={{ marginTop: "9px" }}>
                         
                     
                         
                          <DatePickerMui
                          label={"Interim Date"}
                        className={"w-100"}

                        value={
                          this.state.interim[index].Interimdate 
                        }
                        // changeData={(data) => this.simple(data, index)}
                        changeData={(data) =>
                          this.simple(data, index)
                        }
                        />

                        <div>
                          {this.state.interimallerror  && this.state.interim[index].Interimdate =="" && (
                            <span
                              style={{ color: "red", fontSize: "12px" }}
                            >
                              {this.state.interimallerrormsg}
                            </span>
                          ),console.log(this.state.interim.Interimdate,"dfhskghortyor")}
                        </div> 
                       
                            
                         
                            </Grid>
                        
                            <Grid md={1} />
                            <Grid item sm={10} md={3}>
                
                              <div style={{ marginTop: "5%" }}>
                                <div>
                                  <label>Interim Details</label>
                                </div>
                                <textarea
                                  style={{
                                    width: "100%",
                                    paddingLeft: "5px",
                                    height: "60px",
                                    resize: "none",
                                  }}
                                  onChange={(e) =>
                                    this.handleInterim(e, "int_detail", index)
                                  }
                                  value={this.state.interim.Interimdetails}
                                />
                                <div>
                                  {this.state.interimallerror && this.state.interim[index].Interimdetails =="" && (
                                    <span
                                      style={{ color: "red", fontSize: "12px" }}
                                    >
                                      {this.state.interimallerrormsg}
                                    </span>
                                  )}
                                </div> 
                              </div>
                            </Grid>
                            <Grid>
                              {index === 0 ? null : (
                                <IconButton
                                  aria-label="delete"
                                  className="button_align "
                                  onClick={() => this.removeInterim(index)}
                                >
                                  <DeleteIcon className="mt-4" />
                                </IconButton>
                              )}
                            </Grid>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className="mt-5"
              spacing={3}
            >
              <Grid item>
                <Button
                  className="btnwidth btnclr"
                  onClick={() => this.callroot()}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button className="btnwidth btnclr">Send Mail</Button>
              </Grid>
              <Grid item>
                <Button
                  className="btnwidth btnclr_outline"
                  onClick={this.cancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>

        <Modal
          className="overall_modal_edit"
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <div className="industry_content_align">
            <h6>
              Industry should not belong to prohibited business like alcohol,
              meat, gambling or tobacco.
            </h6>
          </div>
          <div className="button_dialog_edit">
            <Button className="ok_edit" onClick={this.handleOk}>
              Ok
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("stateeee", state);

  return {
    casedata: state.resumeReducer.casedata,
    caseType: state.case.getTypecase,
    statusType:state.case.getStatuscase,
    caseName: state.case.getNamecase,
    caseCity: state.case.getCitycase,
    caseAdjournment: state.case.getAdjournmentcase,
    caseBilling: state.case.getBillingcase,
    caseFiled: state.case.getFiledcase,
    caseSub: state.case.getSubcase,
    caseClient: state.case.getClientcase,
    caseCompany: state.case.getCompanyclient,
    projectName:state.case.getProjectName
  };
};
export default connect(mapStateToProps, {
  getcaseName,
  getcaseType,
  getcaseCity,
  getcaseAdjournment,
  getcaseBilling,
  getcaseFiled,
  getcaseSub,
  getcaseClient,
  getcaseCompany,
  addCaseData,
  getstatusUpdate,
  getProjectName
})(CaseAddForm);
