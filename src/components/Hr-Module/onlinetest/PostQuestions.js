import React from "react";
import Grid from "@material-ui/core/Grid";
import "./PostQuestions.css";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import Button from "react-bootstrap/Button";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { postQuestion,clearStore } from "./Action";
import { Select,notification } from "antd";
import { connect } from 'react-redux';
import { apiurl } from "../../../App"

const { Option } = Select;

const initialState = {
  catError: "",
  subcatError: "",
  numquestionError: "",
  equalError: "",
  totqlQuestionError: "",
  durationError: "",
};

let filteredcats = [];
var filteredsubcats = [];
var NoOfquestions = "";

class PostQuestions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      add: 1,
      count: 1,
      postData: [0],
      myData: {},
      FinalData: [],
      errordummy: true,
      maxQuestion: "",
      duration: "",
      templateName: "",
      quesdata: [
        {
          quescatId: "",
          quesubcatId: "",
          NoOfquestions: "",
        },
      ],
      initialState,
      whichIndex: "",
      errorState: false,
      numMsg: "",
      maxError: "",
    };
  }

  getTotlalQuestions = () => {
    let totalQuestions = [];
    for (let t = 0; t < this.props.questions.length; t++) {
      totalQuestions.push(
        <Option key={t + 1} value={t + 1}>
          {t + 1}
        </Option>
      );
    }

    return totalQuestions;
  };

  validation = () => {
    let maximumquestions = 0;
    let catError = "";
    let subcatError = "";
    let numquestionError = "";
    let equalError = "";
    let totalQuestionError = "";
    let durationError = "";
    let templateError = "";
    let maximumquestionsError = "";

    for (let i = 0; i < this.state.quesdata.length; i++) {
      maximumquestions += this.state.quesdata[i].NoOfquestions;
    }
    if (this.state.maxQuestion=="") {
      maximumquestionsError = "Field required";
      
    }
    this.state.quesdata.map((value, index) => {
      if (value.quescatId === "") {
        catError = "Field required";
      }
      if (value.quesubcatId === "") {
        subcatError = "Field required";
      }
      if (value.NoOfquestions === "") {
        numquestionError = "Field required";
      }
    });

    if (this.state.maxQuestion === "") {
      totalQuestionError = "Field required";
    }

    if (this.state.duration === "") {
      durationError = "Field required";
    }

    if (this.state.templateName === "") {
      templateError = "Field required";
    }

    if (
      catError ||
      subcatError ||
      maximumquestionsError ||
      numquestionError ||
      equalError ||
      totalQuestionError ||
      durationError ||
      templateError
    ) {
      this.setState({
        catError,
        subcatError,
        numquestionError,
        durationError,
        totalQuestionError,
        equalError,
        templateError,
      });
      return false;
    } else {
      return true;
    }
  };

  checkValidation = () => {
    var mainvalue = {};
    var postquestiondata = this.state.postquestiondata;
    var targetkeys = Object.keys(postquestiondata);
    console.log(targetkeys, "targetkeys");
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        postquestiondata[targetkeys[i]].value,
        postquestiondata[targetkeys[i]].validation
      );
      console.log(errorcheck, "errorcheck");
      postquestiondata[targetkeys[i]].error = !errorcheck.state;
      postquestiondata[targetkeys[i]].errmsg = errorcheck.msg;
      mainvalue[targetkeys[i]] = postquestiondata[targetkeys[i]].value;
    }
    var filtererr = targetkeys.filter(
      (obj) => postquestiondata[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }

    if (filtererr.length === 0) {
      // alert("Api")
      this.onDutyApi();
    } else {
      // alert("not Ok")
    }
    this.setState({
      mainvalue,
      postquestiondata,
    });
  };

  changeDynamic = (data, key, index) => {
    if (key === "max_question") {
      if (data > this.props.questions.length) {
        this.setState({
          errorState: true,
          numMsg: "Maximum Questions Exceeded",
        });
      } else {
        this.setState({ errorState: false });
      }
    }
    if (index != undefined) {
      this.state.FinalData[index][key].value = data; // Dynamic Final Data
    }
    var postquestiondata = this.state.postquestiondata;

    var targetkeys = Object.keys(postquestiondata);

    var errorcheck = ValidationLibrary.checkValidation(
      data,
      postquestiondata[key].validation
    );
    postquestiondata[key].value = data;
    postquestiondata[key].error = !errorcheck.state;
    postquestiondata[key].errmsg = errorcheck.msg;
    this.setState({ postquestiondata }, () =>
      console.log("thoonnu", this.state.postquestiondata)
    );
    var filtererr = targetkeys.filter(
      (obj) =>
        postquestiondata[obj].error == true ||
        postquestiondata[obj].error == null
    );

    if (filtererr.length > 0) {
      console.log("hwhsdfiosdf", filtererr);
      this.setState({
        error: true,
        errordummy: false,
      });
    } else {
      this.setState({ error: false });
    }
  };

  addQuestions = () => {
    this.setState(
      {
        quesdata: [
          ...this.state.quesdata,
          { quescatId: "", quesubcatId: "", NoOfquestions: "" },
        ],
      },
      () => console.log("sdfsjdfjsdfksdfjsdfkds", this.state.quesdata)
    );
  };

  deleteQuestions = (index) => {
    let list = this.state.quesdata;
    list.splice(index, 1);
    this.setState({ list });
  };

  getQuestionCats = () => {
    let storecats = [];
    filteredcats = [];

    for (let i = 0; i < this.props.questions.length; i++) {
      console.log("sadfjsdfsdfkjsdafkdsfsd", this.props.questions);
      storecats.push({
        name: this.props.questions[i].QuescatName,
        id: this.props.questions[i].QuesCatId,
      });
    }

    let newArray = [];
    let uniqueObject = {};

    for (var k in storecats) {
      let storeId = storecats[k]["id"];
      uniqueObject[storeId] = storecats[k];
    }

    for (k in uniqueObject) {
      newArray.push(uniqueObject[k]);
    }

    for (let m = 0; m < newArray.length; m++) {
      filteredcats.push(
        <Option key={m + 1} value={newArray[m].id}>
          {newArray[m].name}
        </Option>
      );
    }
    console.log("sdfkjhsdfjhsdjfhsdfjh", filteredcats);
    return filteredcats;
  };

  storeWhatCat = (event, num) => {
    this.state.quesdata.map((val, index) => {
      console.log(val,"fjkhgduhguds")
      if (num === index) {
        val.quescatId = event;
        this.setState(
          {
            quescatId: val,
            whichIndex: num,
          },
          () => this.getQuestionSubCats()
        );
        this.setState({catError:false})
      }
    });
    console.log(this.state.quesdata,"fjkhgduhguds")

  }; 
  

  storeWhatSubCat = (event, num) => {
    this.state.quesdata.map((val, index) => {
      if (num === index) {
        val.quesubcatId = event;
        this.setState(
          {
            quesubcatId: val,
            whichIndex: num,
          },
          () => this.numofquestions()
        );
        this.setState({subcatError:false})
      }
    });
  };

  storeNumber = (event, num) => {
    this.state.quesdata.map((val, index) => {
      if (num === index) {
        val.NoOfquestions = event;
        this.setState({
          NoOfquestions: val,
          whichIndex: num,
        });
        this.setState({numquestionError:false})

      }
    });
  };

  // removeNumberOfQuestions = () => {

  //   for(let m=0;m<this.props.questions.length;m++){

  //     if(this.props.questions[m].QuesubcatId === this.state.quesubcatId.quesubcatId){
  //       console.log("sdfjhsdjfhsdjfkhsd",this.props.questions[m].QuesubcatId)
  //         // this.props.questions.splice(m,this.props.questions[m].QuesubcatId)
  //     }
  //     console.log("sfjhsfjsdhfjshfsd",this.props.questions)
  //   }

  //   // this.props.questions&&this.props.questions.map((quest,index) => {
  //   //   if(quest.QuesubcatId === this.state.quesubcatId.quesubcatId){
  //   //     console.log("sdfjhsdfjhsdjfhsdjfhdsjfhds",this.props.questions)
  //   //       NoOfquestions = index - this.state.NoOfquestions.NoOfquestions;

  //   //       console.log("hisdfdsifsjdfsdf",this.props.questions)
  //   //   }

  //   // })

  //   console.log("sdfjhsdfjhsdjfhsdjfhdsjfhds",this.props.questions)

  // }

  // removeCategory = () => {
  //   var list = "";
  //
  //   console.log("sdfjhdsjfhdsjfhds",this.props.questions)
  //   this.props.questions.map((value,index) => {
  //     // console.log("sdfjhsdfjhsdjfhlsdf",this.state.QuesubcatId.QuesubcatId)
  //     if(value.QuesCatId === this.state.quescatId.quescatId){
  //        console.log("sdfjhsdfjhdsjlfhdsf",index)
  //         if(this.state.whichIndex === 0){
  //           return this.props.questions
  //         }else{
  //           return this.props.questions.splice(index)
  //         }
  //     }
  //   })

  //   console.log("sdfjhdsjfhdsjfhds",this.props.questions)
  // }

  getQuestionSubCats = () => {
    console.log(
      "fsdkfjdskfjsdklfj",
      this.state.quesdata.map((val) => val.quescatId)
    );
    var subcat = [];
    filteredsubcats = [];
    this.props.questions &&
      this.props.questions.map((value, index) => {
        this.state.quesdata.map((val, index) => {
          if (
            value.QuesCatId === val.quescatId &&
            index === this.state.whichIndex
          ) {
            subcat.push({ name: value.QuesubcatName, id: value.QuesubcatId });
          }
        });
      });

    let storesubcats = [];
    let unique = {};

    for (var j in subcat) {
      let storesubcatid = subcat[j]["id"];
      unique[storesubcatid] = subcat[j];
    }

    for (j in unique) {
      storesubcats.push(unique[j]);
    }

    for (let n = 0; n < storesubcats.length; n++) {
      filteredsubcats.push(
        <Option key={n + 1} value={storesubcats[n].id}>
          {storesubcats[n].name}
        </Option>
      );
    }

    console.log("sdkjfhsdjfhsdjfhsddkj", filteredsubcats);

    return filteredsubcats;
  };

  numofquestions = () => {
    let numberofquestions = [];
    var totalquestions = [];
    var num = 1;
    while (num <= this.props.questions.length) {
      this.props.questions.map((val) => {
        this.state.quesdata.map((value, index) => {
          if (
            val.QuesubcatId === value.quesubcatId &&
            index === this.state.whichIndex
          ) {
            numberofquestions.push(num);
          }
        });

        num++;
      });
    }

    for (let i = 1; i <= numberofquestions.length; i++) {
      totalquestions.push(
        <Option key={i} value={i}>
          {i}
        </Option>
      );
    }
    return totalquestions;
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

  onDutyApi = () => {
    const isValid = this.validation();

    let maximumquestions=0;
    for (let i = 0; i < this.state.quesdata.length; i++) {
      maximumquestions += this.state.quesdata[i].NoOfquestions;
    }
    if(isValid && maximumquestions !== this.state.maxQuestion){
      this.alertGenerate("Maximum Questions and Total No of Questions Do Not Match")   
    }
    else if(isValid && maximumquestions == this.state.maxQuestion){
      fetch(apiurl + "/postquestion", {  
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
  
        },
        body: JSON.stringify({    
          postquestion: this.state.quesdata,
          duration: this.state.duration,
          maximumquestions: this.state.maxQuestion,
          templateName: this.state.templateName, 
        })
        
      }).then((response) => response.json())
      .then((responseJson) => {
       console.log(responseJson,"sdmsnfbms" )
       if(responseJson.status==0){
         let empty=[{
          quescatId:"",
          quesubcatId:"",
          NoOfquestions:""
                 }]
         this.generateAlert("Questions posted successfully")
         this.state.templateName="";
        this.state.maxQuestion="";
        this.state.duration="";
        this.state.quesdata=empty;
        this.setState({})
       }
   
      });      
    }
   
     
  };

  getDuration = () => {
    let duration = 5;
    let durationmins = [];
    while (duration <= 120) {
      durationmins.push(
        <Option key={duration} value={duration}>
          {duration}
        </Option>
      );
      duration += 5;
    }

    return durationmins;
  };

  handleChange = (data, key) => {
    if (key === "totalquestion") {
      this.setState(
        {
          maxQuestion: data,
        },
        () =>
          this.state.maxQuestion !== ""
            ? this.setState({ totalQuestionError: true })
            : this.setState({ totalQuestionError: false })
      );
    }

    if (key === "duration") {
      this.setState({ duration: data }, () =>
        this.state.duration !== ""
          ? this.setState({ durationError: true })
          : this.setState({ durationError: false })
      );
    }
  };

  template = (e, data) => {
    if (data === "templateName") {
      this.setState({ templateName: e.target.value }
        ,() =>
    this.state.templateName !== ""
      ? this.setState({ templateError: true })
      : this.setState({ templateError: false }));
    }
  };

  cancel = () => {
    this.state.templateName="";
    this.state.maxQuestion="";
    this.state.duration="";
    this.state.quesdata.quescatId="";
    this.state.quesdata.quesubcatId="";
    this.state.quesdata.NoOfquestions="";
    let empty=[{
      quescatId:"",
      quesubcatId:"",
      NoOfquestions:""
    }]
    this.state.quesdata=empty;
    this.setState({});
  };

  render() {
    console.log(this.props,"dfvbdjfbjbjfd");

    const {
      questionCategory,
      questionSubCategory,
      questionType,
      questions,
    } = this.props;
    return (
      <React.Fragment>
        <div className="card  top_move">
          <div className="card card-body">
            <Grid container spacing={4} className="mt-4">
              <Grid item md={3} sm={5}>
                <div className="lable__style">
                  {" "}
                  <lable>
                    Template Name{" "}
                  </lable> <span className="star">*</span>{" "}
                </div>
                <div className="lable__container">
                  <input
                    type="text"
                    className="lable__type "
                    value={this.state.templateName}
                    onChange={(e) => this.template(e, "templateName")}
                  />
                </div>

                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.templateError && this.state.templateError}
                </div>
              </Grid>

              <Grid md={1} sm={2}>
                {" "}
              </Grid>

              <Grid item md={3} sm={5}>
                <div>
                  <lable>Maximum Questions</lable>{" "}
                  <span className="star">*</span>{" "}
                </div>
                <Select
                value={this.state.maxQuestion}
                  onChange={(event) =>
                    this.handleChange(event, "totalquestion")
                  }
                  style={{ width: "100%", marginTop: ".8rem" }}
                >
                  {this.getTotlalQuestions()}
                </Select>

                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.totalQuestionError &&
                    this.state.totalQuestionError}
                </div>
              </Grid>

              <Grid md={1} sm={5}></Grid>

              <Grid item md={3} sm={5}>
                <div>
                  <lable> Duration(in mins)</lable>{" "}
                  <span className="star">*</span>{" "}
                </div>
                <Select
                  value={this.state.duration}
                  onChange={(event) => this.handleChange(event, "duration")}
                  style={{ width: "100%", marginTop: ".8rem" }}
                >
                  {this.getDuration()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.durationError && this.state.durationError}
                </div>
              </Grid>

              {this.state.quesdata.map((val, index) => {
                return (
                  <>
                    {/* {index === 0 && <Grid md={4}></Grid> } */}
                    <Grid item md={3} sm={5} className="">
                      <div>
                        <lable>Category</lable> <span className="star">*</span>{" "}
                      </div>

                      <Select
                      value={val.quescatId}
                        onChange={(event) => this.storeWhatCat(event, index)}
                        style={{ width: "100%", marginTop: ".8rem" }}
                      >
                        {this.getQuestionCats()}
                      </Select>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.catError && this.state.catError}
                      </div>
                    </Grid>
                    <Grid md={1} />
                    <Grid item md={3} sm={5} className="">
                      <div>
                        <lable>SubCategory</lable>{" "}
                        <span className="star">*</span>{" "}
                      </div>
                      <Select
                        value={val.quesubcatId}
                        onChange={(event) => this.storeWhatSubCat(event, index)}
                        style={{ width: "100%", marginTop: ".8rem" }}
                      >
                        {this.getQuestionSubCats()}
                      </Select>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.subcatError && this.state.subcatError}
                      </div>
                    </Grid>

                    <Grid md={1} />

                    <Grid item md={3} sm={5}>
                      <lable>
                        No of Question <span className="star">*</span>{" "}
                      </lable>
                      <Select
                        value={val.NoOfquestions}
                        onChange={(event) => this.storeNumber(event, index)}
                        style={{ width: "100%", marginTop: ".8rem" }}
                      >
                        {this.numofquestions()}
                      </Select>
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {this.state.numquestionError &&
                          this.state.numquestionError}
                      </div>
                    </Grid>

                    <>
                      <Grid item md={1} sm={5} className="addbox">
                        {index === 0 ? (
                          <AddBoxOutlinedIcon
                            className="addbox-height mt-4"
                            onClick={this.addQuestions}
                          />
                        ) : (
                          <button
                            className="btn btn-primary btn-sm postdelbtn"
                            onClick={() => this.deleteQuestions(index)}
                          >
                            Delete
                          </button>
                        )}
                      </Grid>
                    </>
                  </>
                );
              })}
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              className="mt-3"
              spacing={3}
            >
              <Grid item>
                <Button
                  size="lg"
                  className="btnmargin btnwidth btnclr"
                  onClick={this.onDutyApi}
                >
                  Submit
                </Button>
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
      </React.Fragment>
    );
  }
}




export default PostQuestions;
// export default connect(mapStateToProps)(PostQuestions);