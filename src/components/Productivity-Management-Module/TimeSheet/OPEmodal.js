import React from "react";
import { Grid, Checkbox } from "@material-ui/core";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Inputantd from "../../../formcomponent/inputantd";
import Textareaantd from "../../../formcomponent/textareaantd";
import Svgfile from "../../../images/attach.svg";
import ValidationLibrary from "../../../validationlibrary/validation";
import axios from "axios";
import { apiurl } from "../../../App";
import { connect } from "react-redux";
import { getmodeofpayment, getexpensetype } from "../Action/TimesheetAction";
import "./timesheet.css";
import { Button, Upload, Icon, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
var fileListData = [];

const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      console.log("asdfjkasdfjsd", info.fileList);
      message.success(`${info.file.name} file uploaded successfully`);
      fileListData = info.fileList;
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
  },
};
class OPEmodal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      changeval: true,
      checked: false,
      tsId: 1,
      file: [],
      balance: 5000,
      income: 5000,
      outcome: 0,
      opemodaldata: {
        expamount: {
          value: "",
          validation: [{ name: "required" }, { name: "allowNumaricOnly" }],
          error: null,
          errmsg: null,
        },
        exptypeId: {
          value: "",
          validation: [{ name: "required" }],
          error: null,
          errmsg: null,
        },
        expPaymode: {
          value: "",
          validation: [{ name: "required" }, { name: "" }],
          error: null,
          errmsg: null,
        },
        expdescription: {
          value: "",
          validation: [{ name: "required" }, { name: "" }],
          error: null,
          errmsg: null,
        },
      },
    };
    console.log("booboo", this.props);
  }
  handleChangeBalance(e) {
    this.setState({ [e.target.name]: e.target.value }, function () {
      this.setState({ balance: this.state.income - this.state.outcome });
    });
  }

  async componentDidMount() {
    await this.props.getmodeofpayment();
    await this.props.getexpensetype();
  }

  checkValidation = () => {
    this.setState({ changeval: false });
    var opemodaldata = this.state.opemodaldata;
    var targetkeys = Object.keys(opemodaldata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        opemodaldata[targetkeys[i]].value,
        opemodaldata[targetkeys[i]].validation
      );
      console.log(errorcheck);
      opemodaldata[targetkeys[i]].error = !errorcheck.state;
      opemodaldata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) => opemodaldata[obj].error == true);
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      var self = this;
      console.log("fsdfjhdsfjhdsf", this.state.opemodaldata.expamount.value);

      var formData = new FormData();
      formData.append("imageArray", fileListData[0].originFileObj);
      formData.set("tsId", this.state.tsId);
      formData.set("expamount", this.state.opemodaldata.expamount.value);
      formData.set("exptypeId", this.state.opemodaldata.exptypeId.value);
      formData.set("expPaymode", this.state.opemodaldata.expPaymode.value);
      formData.set(
        "expdescription",
        this.state.opemodaldata.expdescription.value
      );
      axios({
        method: "post",
        url: apiurl + "/timesheetOpe",
        data: formData,
      })
        .then(function (response) {
          console.log(response.data.data, "responseresponse");

          // self.state.opemodaldata.amount.value=""
          // self.props.showclose && self.props.showclose()
          self.setState({});
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
    this.setState({ opemodaldata });
  };
  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var opemodaldata = this.state.opemodaldata;
    var targetkeys = Object.keys(opemodaldata);

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      opemodaldata[key].validation
    );
    opemodaldata[key].value = data;
    opemodaldata[key].error = !errorcheck.state;
    opemodaldata[key].errmsg = errorcheck.msg;
    this.setState({ opemodaldata });
    var filtererr = targetkeys.filter(
      (obj) =>
        opemodaldata[obj].error == true || opemodaldata[obj].error == null
    );
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }

    if (key == "expamount") {
      let balance = data ? Number(5000) - Number(data) : 5000;
      this.setState({ balance });
    }
    if (Number(data) >= 5000) {
      alert("Should not exceed available amount");
    }
  };
  onFileChange = (e) => {
    console.log("sdfjsdhfjdshflsdf", e.target.files[0]);
    this.setState({
      file: e.target.files[0],
    });
  };
  // OnchangeCheck =(e)=>{
  //   console.log("hhh",e.target.checked)
  //   this.setState({checked:e.target.checked})
  // }
  handleChange = () => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    console.log("this.props.timesheet.mode_ofpayment", this.props);
    const { ExpenseType } = this.props;
    return (
      <div>
        <h5 className="text-center_ope">Project Name-Client Name</h5>
        <h5 className="text-center_amt">
          Available Advance:{this.state.balance}
        </h5>
        <Grid container spacing={2}>
          <Grid item md={5} sm={5}>
            <Dropdownantd
              className="w-100"
              label="Expense Type"
              option={
                this.props.timeSheet &&
                this.props.timeSheet.map((val) => val.ExpTypeName)
              }
              changeData={(data) => this.changeDynamic(data, "exptypeId")}
              value={this.state.opemodaldata.exptypeId.value}
              error={this.state.opemodaldata.exptypeId.error}
              errmsg={this.state.opemodaldata.exptypeId.errmsg}
              required
            />
          </Grid>
          <Grid item md={5} sm={5} className="ml-3">
            <Inputantd
              className="w-100"
              label="Amount"
              changeData={(data) => this.changeDynamic(data, "expamount")}
              value={this.state.opemodaldata.expamount.value}
              error={this.state.opemodaldata.expamount.error}
              errmsg={this.state.opemodaldata.expamount.errmsg}
              required
            />
          </Grid>
          <Grid item md={5} sm={5}>
            <Dropdownantd
              className="w-100"
              label="Mode of Payment"
              option={
                this.props.TimePay &&
                this.props.TimePay.map((val) => val.PaymentType)
              }
              changeData={(data) => this.changeDynamic(data, "expPaymode")}
              value={this.state.opemodaldata.expPaymode.value}
              error={this.state.opemodaldata.expPaymode.error}
              errmsg={this.state.opemodaldata.expPaymode.errmsg}
              required
            />
          </Grid>
          <Grid item md={12} sm={5}>
            <Textareaantd
              className="w-100"
              label="Expense Description"
              changeData={(data) => this.changeDynamic(data, "expdescription")}
              value={this.state.opemodaldata.expdescription.value}
              error={this.state.opemodaldata.expdescription.error}
              errmsg={this.state.opemodaldata.expdescription.errmsg}
            />
          </Grid>
          <Grid item md={6} sm={6} className="opeModal_uploadMain d-flex">
            <div className="d-flex">
              <Checkbox
                color="primary"
                onChange={this.handleChange}
                checked={this.state.checked}
                className="opeModal_checkbox mr-2"
              />
              <div className="ml-5 bill_top">Bill</div>
            </div>
            {this.state.checked !== false ? (
              // <Upload {this.props} className="opemodal_uploadcontents">
              //   <Button></Button>
              //   <div className="d-flex">
              //     <Inputantd
              //       disabled={this.state.checked}
              //       placeholder={"click to upload"}
              //       onClick={this.handleClick}
              //       className="opemodal_uploadinput w-100 ml-3"
              //     />
              //     <img
              //       src={Svgfile}
              //       className="opeattach"
              //       onChange={this.onFileChange}
              //       ref={(input) => (this.inputElement = input)}
              //     />
              //   </div>
              // </Upload>
              <div  >
                
                <div className="d-flex right_remove">
                  
                <Upload  {...props}>
                  <div className="display_align">
                  <Button className="ope-upload" >
                  </Button>
                  <img
                      src={Svgfile}
                      className="Upload_img"
                    />
                    </div>
                </Upload>
                    </div>
              </div>
            ) : null}
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className="mt-2 "
            spacing={3}
          >
            <Grid item md={2} sm={2}>
              <Button
                size="sm"
                className="emailbtnclr"
                onClick={() => this.checkValidation()}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state in ope", state);

  return {
    opemodaldata: state.resumeReducer.opemodaldata,
    TimePay: state.timesheet.mode_ofpayment,
    timeSheet: state.timesheet.expense_type,
  };
};

export default connect(mapStateToProps, {
  getmodeofpayment,
  getexpensetype,
})(OPEmodal);
