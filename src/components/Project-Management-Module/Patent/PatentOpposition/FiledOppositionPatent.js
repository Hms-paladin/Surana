import React from "react";
import "../../TradeMark/OppositionTradeMark/TradeMarkOpposition.css";
import Inputantd from "../../../../formcomponent/inputantd";
import Dropdownantd from "../../../../formcomponent/dropdownantd";
import Grid from "@material-ui/core/Grid";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import { IoMdInformationCircle } from "react-icons/io";
// import Button from 'react-bootstrap/Button';
import { Popover } from "antd";
import { Upload, Icon, message, Button } from "antd";
import { Tooltip } from "antd";
import { Table } from "antd";
import Calenderbox from "../../../../formcomponent/calenderbox";
import ValidationLibrary from "../../../../validationlibrary/validation";
import {
  getStagelist,
  getSubStagelist,
  getProjectName
} from "../../TradeMark/OppositionTradeMark/Action/TMOppositionAction";
import { connect } from "react-redux";
import { getEmployees, getClient } from "../../../../fixers/fixersAction";
import { UploadOutlined } from "@ant-design/icons";
import { apiurl } from "../../../../App";
import moment from "moment";
import { notification } from "antd";
// import FiledOppositionList from './FiledOppositionList';
import PatentFiledList from "./PatentFiledList";
import { getcaseCompany } from "../../../Case-Module/NewCase/Action/CaseAction";

const axios = require("axios");

const text = <span>+ 4Days</span>;
const columns = [
  {
    title: "Stages",
    dataIndex: "stage",
  },
  {
    title: "Sub Stages",
    dataIndex: "substage",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Actual Date",
    dataIndex: "actualdate",
  },
];
const data = [
  {
    key: "1",
    stage: "ER Received",
    substage: "-",
    date: "14 July 2020",
    actualdate: "14 July 2020",
  },
  {
    key: "2",
    stage: "ER Reply",
    substage: "Formality Check Fail Yes",
    date: "18 July 2020",
    actualdate: "18 July 2020",
  },
];

const content = (
  <div>
    <p className="popover_content_edit">+ 4Days</p>
  </div>
);
class FiledOppositionPatent extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: "",
    errordummy: true,
    FiledOPP_Patent_data: {
      projectname:{
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      client_opp_name: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      opp_filed_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      types_grant: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      patent_app_num: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      Stages: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      sub_stages: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      patent_title: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      publication_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      app_agent: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      further_action: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      patent_applicant: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      hearing_date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      date: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
    },
  };

  async componentDidMount() {
    await this.props.getStagelist();
    await this.props.getSubStagelist();
    await this.props.getcaseCompany();
    await this.props.getProjectName()
  }

  checkValidation = () => {
    var mainvalue = {};
    var FiledOPP_Patent_data = this.state.FiledOPP_Patent_data;
    var targetkeys = Object.keys(FiledOPP_Patent_data);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        FiledOPP_Patent_data[targetkeys[i]].value,
        FiledOPP_Patent_data[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      FiledOPP_Patent_data[targetkeys[i]].error = !errorcheck.state;
      FiledOPP_Patent_data[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = FiledOPP_Patent_data[targetkeys[i]].value;
      console.log(FiledOPP_Patent_data[targetkeys[i]].error, "error");
    }
    var filtererr = targetkeys.filter(
      (obj) => FiledOPP_Patent_data[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: false });
    } else {
      this.setState({ error: true });
      var self = this;
      var date = this.state.FiledOPP_Patent_data.date.value._d;
      var convertedDate =
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let PatentFiledData = {
        clientnameopp:this.state.FiledOPP_Patent_data.client_opp_name.value,
        OppfiledDate:moment(this.state.FiledOPP_Patent_data.opp_filed_date.value).format('YYYY-MM-DD'),
        Typesofgrant:this.state.FiledOPP_Patent_data.types_grant.value,
        Patentappno:this.state.FiledOPP_Patent_data.patent_app_num.value,
        PatentTitle:this.state.FiledOPP_Patent_data.patent_title.value,
        Publicationdate:moment(this.state.FiledOPP_Patent_data.publication_date.value).format('YYYY-MM-DD'),
        Patentapplicant:this.state.FiledOPP_Patent_data.patent_applicant.value,
        Appagent:this.state.FiledOPP_Patent_data.app_agent.value,
        furtheraction:this.state.FiledOPP_Patent_data.further_action.value,
        dateofhearing:moment(this.state.FiledOPP_Patent_data.hearing_date.value).format('YYYY-MM-DD'),
        Stages:this.state.FiledOPP_Patent_data.Stages.value,
        Substages:this.state.FiledOPP_Patent_data.sub_stages.value,
        date:convertedDate,
      };

      axios({
        method: "post",
        url: apiurl + "/addpatentfiled",
        data: PatentFiledData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");
          notification.warning({
            message: `Opposition Filed Patentdata submitted successfully`,
            duration: 3.5,
            placement: "topRight",
            className: "notification_dayreport",
          });
          // self.state.FiledOPP_Patent_data.further.value = "";
          // self.state.FiledOPP_Patent_data.our_reference.value = "";
          // self.state.FiledOPP_Patent_data.stages.value = "";
          // self.state.FiledOPP_Patent_data.sub_stages.value = "";
          // self.state.FiledOPP_Patent_data.ClientRef.value = "";
          // self.state.FiledOPP_Patent_data.File_cover.value = "";
          // self.state.FiledOPP_Patent_data.Status.value = "";
          // self.state.FiledOPP_Patent_data.app_date.value = "";
          // self.state.FiledOPP_Patent_data.application_num.value = "";
          // self.state.FiledOPP_Patent_data.application_type.value = "";
          // self.state.FiledOPP_Patent_data.associate.value = "";
          // self.state.FiledOPP_Patent_data.class.value = "";
          // self.state.FiledOPP_Patent_data.comments.value = "";
          // self.state.FiledOPP_Patent_data.country.value = "";
          // self.state.FiledOPP_Patent_data.date.value = "";
          // self.state.FiledOPP_Patent_data.deadline.value = "";
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }

    this.setState({
      // mainvalue,
      FiledOPP_Patent_data,
    });
  };
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var FiledOPP_Patent_data = this.state.FiledOPP_Patent_data;
    var targetkeys = Object.keys(FiledOPP_Patent_data);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      FiledOPP_Patent_data[key].validation
    );
    FiledOPP_Patent_data[key].value = data;
    FiledOPP_Patent_data[key].error = !errorcheck.state;
    FiledOPP_Patent_data[key].errmsg = errorcheck.msg;
    this.setState({ FiledOPP_Patent_data });
    var filtererr = targetkeys.filter(
      (obj) =>
        FiledOPP_Patent_data[obj].error == true ||
        FiledOPP_Patent_data[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({ error: true, errordummy: false });
    } else {
      this.setState({ error: false });
    }
  };

  cancelClick=()=>{
    this.state.FiledOPP_Patent_data.Stages.value=""
    this.state.FiledOPP_Patent_data.app_agent.value=""
    this.state.FiledOPP_Patent_data.client_opp_name.value=""
    this.state.FiledOPP_Patent_data.date.value=""
    this.state.FiledOPP_Patent_data.further_action.value=""
    this.state.FiledOPP_Patent_data.hearing_date.value=""
    this.state.FiledOPP_Patent_data.opp_filed_date.value=""
    this.state.FiledOPP_Patent_data.patent_app_num.value=""
    this.state.FiledOPP_Patent_data.patent_applicant.value=""
    this.state.FiledOPP_Patent_data.patent_title.value=""
    this.state.FiledOPP_Patent_data.publication_date.value=""
    this.state.FiledOPP_Patent_data.sub_stages.value=""
    this.state.FiledOPP_Patent_data.types_grant.value=""
    this.setState({})
  }
  render() {
    console.log(this.state, "state");
    const params = new URLSearchParams(window.location.search)
    const status = params.get("status")
    console.log(this.state.FiledOPP_Patent_data.date.value, "date");
    return (
      <React.Fragment>
        <>
          <div className="InterFilingOPP_main">
            {/* Grid content Start */}

            <Grid container spacing={2} className="mt-3">
            <Grid item md={3} sm={5}>

            <Dropdownantd
                label={"Project Name"}
                className="w-75"
                option={
                  this.props.ProjectName &&
                  this.props.ProjectName.map((val) => val.ProjectName)
                }
                changeData={(data) =>this.changeDynamic(data, "projectname")}
                disabled={status==="editable" ? true : false}
                value={this.state.FiledOPP_Patent_data.projectname.value}
                error={this.state.FiledOPP_Patent_data.projectname.error}
                errmsg={this.state.FiledOPP_Patent_data.projectname.errmsg}
              />

              </Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd
                  label="Client Name Opponent"
                  className="w-75"
                  option={
                    this.props.caseCompany &&
                    this.props.caseCompany.map((val) => val.ClientName)
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "client_opp_name")
                  }
                  value={this.state.FiledOPP_Patent_data.client_opp_name.value}
                  error={this.state.FiledOPP_Patent_data.client_opp_name.error}
                  errmsg={
                    this.state.FiledOPP_Patent_data.client_opp_name.errmsg
                  }
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Opposition Filed Date"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "opp_filed_date")
                  }
                  value={this.state.FiledOPP_Patent_data.opp_filed_date.value}
                  error={this.state.FiledOPP_Patent_data.opp_filed_date.error}
                  errmsg={this.state.FiledOPP_Patent_data.opp_filed_date.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Types of grant"}
                  className="w-75"
                  changeData={(data) => this.changeDynamic(data, "types_grant")}
                  value={this.state.FiledOPP_Patent_data.types_grant.value}
                  error={this.state.FiledOPP_Patent_data.types_grant.error}
                  errmsg={this.state.FiledOPP_Patent_data.types_grant.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Patent Application Number"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "patent_app_num")
                  }
                  value={this.state.FiledOPP_Patent_data.patent_app_num.value}
                  error={this.state.FiledOPP_Patent_data.patent_app_num.error}
                  errmsg={this.state.FiledOPP_Patent_data.patent_app_num.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Patent Title"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "patent_title")
                  }
                  value={this.state.FiledOPP_Patent_data.patent_title.value}
                  error={this.state.FiledOPP_Patent_data.patent_title.error}
                  errmsg={this.state.FiledOPP_Patent_data.patent_title.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Publication Date"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "publication_date")
                  }
                  value={this.state.FiledOPP_Patent_data.publication_date.value}
                  error={this.state.FiledOPP_Patent_data.publication_date.error}
                  errmsg={
                    this.state.FiledOPP_Patent_data.publication_date.errmsg
                  }
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Patent Applicant"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "patent_applicant")
                  }
                  value={this.state.FiledOPP_Patent_data.patent_applicant.value}
                  error={this.state.FiledOPP_Patent_data.patent_applicant.error}
                  errmsg={
                    this.state.FiledOPP_Patent_data.patent_applicant.errmsg
                  }
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Application agent"}
                  className="w-75"
                  changeData={(data) => this.changeDynamic(data, "app_agent")}
                  value={this.state.FiledOPP_Patent_data.app_agent.value}
                  error={this.state.FiledOPP_Patent_data.app_agent.error}
                  errmsg={this.state.FiledOPP_Patent_data.app_agent.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd
                  label={"Further Action"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "further_action")
                  }
                  value={this.state.FiledOPP_Patent_data.further_action.value}
                  error={this.state.FiledOPP_Patent_data.further_action.error}
                  errmsg={this.state.FiledOPP_Patent_data.further_action.errmsg}
                />
              </Grid>
              <Grid item md={3} sm={5}>
                <Calenderbox
                  label={"Date of Hearing"}
                  className="w-75"
                  changeData={(data) =>
                    this.changeDynamic(data, "hearing_date")
                  }
                  value={this.state.FiledOPP_Patent_data.hearing_date.value}
                  error={this.state.FiledOPP_Patent_data.hearing_date.error}
                  errmsg={this.state.FiledOPP_Patent_data.hearing_date.errmsg}
                />
              </Grid>

              {/* <Grid item md={3} sm={5} className="interfil_update mt-3 ">
                        <div className="flex">
                        <label  className="mr-1">Upload</label>

                        </div>
                    <Upload {...props}>
                        <Button
                            
                        >
                            <UploadOutlined />Click to upload
                        </Button>
                        </Upload>
                </Grid> */}
              {/* <Grid item md={3} sm={5}>
                    <Dropdownantd label="Class" className="w-75"
                          // option={this.props.GetClassList &&
                          // this.props.GetClassList.map((val) => {return({name:val.classname,id:val.classId})})}
                          changeData={(data)=>this.changeDynamic(data,'Class')} 
                          value={this.state.FiledOPP_Patent_data.Class.value} 
                          error={this.state.FiledOPP_Patent_data.Class.error} 
                          errmsg={this.state.FiledOPP_Patent_data.Class.errmsg}/>
                </Grid> */}
            </Grid>

            <div className="border_edit" />
            <div className="circle_icon_par">
              <Grid container spacing={2}>
                <Grid item md={4} sm={5}>
                  <Dropdownantd
                    label={"Stages"}
                    option={
                      this.props.GetStageList &&
                      this.props.GetStageList.map((val) => val.Stage)
                    }
                    changeData={(data) => this.changeDynamic(data, "Stages")}
                    value={this.state.FiledOPP_Patent_data.Stages.value}
                    error={this.state.FiledOPP_Patent_data.Stages.error}
                    errmsg={this.state.FiledOPP_Patent_data.Stages.errmsg}
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={4} sm={5}>
                  <Dropdownantd
                    label={"Sub Stages"}
                    option={
                      this.props.GetsubStageList &&
                      this.props.GetsubStageList.map((val) => val.Substage)
                    }
                    changeData={(data) =>
                      this.changeDynamic(data, "sub_stages")
                    }
                    value={this.state.FiledOPP_Patent_data.sub_stages.value}
                    error={this.state.FiledOPP_Patent_data.sub_stages.error}
                    errmsg={this.state.FiledOPP_Patent_data.sub_stages.errmsg}
                    className="w-75"
                  ></Dropdownantd>
                </Grid>
                <Grid item md={3} sm={5}>
                  <Calenderbox
                    label={"Date"}
                    className="w-75"
                    changeData={(data) => this.changeDynamic(data, "date")}
                    value={this.state.FiledOPP_Patent_data.date.value}
                    error={this.state.FiledOPP_Patent_data.date.error}
                    errmsg={this.state.FiledOPP_Patent_data.date.errmsg}
                  />
                </Grid>
                <Grid item md={1} sm={1}>
                  <span className="circle_icon_edit">
                    <AddCircleOutline
                      className="Interfil_addicon"
                      onClick={this.checkValidation}
                    />
                  </span>
                </Grid>
              </Grid>
            </div>
            {/* Grid content End */}

            {/* Table content start */}
            <div className="table_info_par">
              {/* <div className="table_class">
                        <h5 className="previous_text_edit">Previous Stages Items</h5>
                        <Table columns={columns} dataSource={data} bordered pagination={false}/>
                    </div> */}
              <div>
                <PatentFiledList/>
              </div>
              <div className="demo">
                <div>
                  <Tooltip
                    placement="topLeft"
                    title={text}
                    className="info_icon_edit"
                  >
                    <IoMdInformationCircle />
                  </Tooltip>
                </div>
              </div>
            </div>
            {/* Table content end */}

            {/* Button Part Start */}
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
              className="mt-5"
              spacing={3}
            >
              <Grid item>
                <Button className="btnwidth btnclr_outline" onClick={this.cancelClick}>Cancel</Button>
              </Grid>
              <Grid item>
                <Button
                  className="btnwidth btnclr"
                  onClick={() => this.checkValidation()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
            {/* Button Part End */}
          </div>
        </>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in trademark opposition", state);

  return {
    GetStageList: state.trademarkopp.getstageList,
    GetsubStageList: state.trademarkopp.getsubStageList,
    caseCompany: state.case.getCompanyclient,
    ProjectName:state.tradeapp.getprojectName
  };
};
export default connect(mapStateToProps, {
  getStagelist,
  getSubStagelist,
  getcaseCompany,
  getProjectName
})(FiledOppositionPatent);
