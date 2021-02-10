import React from 'react';
import { Grid } from '@material-ui/core';
import Dropdownantd from '../../../../formcomponent/dropdownantd';
import Collapse from '@material-ui/core/Collapse';
import {
  AppBar, Toolbar, IconButton,
  Drawer, CssBaseline, ListItem, ListItemIcon,
  ListItemText, List, MenuList, MenuItem
} from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './QuestionView.css';
import Deletemodal from './deletemodel';
import { Select } from 'antd';
import { addQuestion, getQuestionType } from "../Action";
import { apiurl } from "../../../../App"
import ValidationLibrary from "../../../../validationlibrary/validation.js";
import { connect } from 'react-redux'
import uuid from "uuid";
import { data } from 'jquery';
import { IdcardFilled } from '@ant-design/icons';
import Typography from '@material-ui/core/Typography';
import { FaCaretDown } from "react-icons/fa";

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';


import axios from 'axios';

// const axios = require('axios');

const { Option } = Select;
class QuestionView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      expand: false,
      expand2: false,
      expand3: false,
      expand4: false,
      expand5: false,
      deletemodal: false,
      editopen: false,
      selectedSubCategory: "",
      selectquesType: "",
      questionCategory: [],
      questionSubCategory: [],
      questionType: [],
      selectedCategory: "",
      callAPI: false,
      QnA: [],
      deleteQues: "",
      addquestiondata: {
        questiontype: {
          value: "",
          validation: [{ name: "required" }, { name: "lettersOnly " }],
          error: null,
          errmsg: null,
        },
      }
    }
  }
  collapse = (id) => {
    console.log(id, "cxbcnx")

    if (id == id) {
      this.setState({ expand: !this.state.expand })
    }

    this.setState({})
  }
  closemodal = () => {
    this.setState({ editopen: false, deletemodal: false })
  }
  deleteModal = (data) => {

    this.setState({
      deletemodal: true,
      deleteQues: data
    })
  }

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

    if (maximumquestions !== this.state.maxQuestion) {
      alert("Maximum Questions Exceeded");
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
  async componentDidMount() {
    await this.props.getQuestionType();
  }
  changeDynamic = (data, key, catid) => {
    console.log("key", key);
    console.log("data", data);



    var addquestiondata = this.state.addquestiondata;
    var targetkeys = Object.keys(addquestiondata);
    var errorcheck = ValidationLibrary.checkValidation(
      data,
      addquestiondata[key].validation
    );
    addquestiondata[key].value = data;
    addquestiondata[key].error = !errorcheck.state;
    addquestiondata[key].errmsg = errorcheck.msg;
    this.setState({ addquestiondata }, () =>
      console.log("asdfdsfyersdfsd", this.state.addquestiondata)
    );
    var filtererr = targetkeys.filter(
      (obj) =>
        addquestiondata[obj].error == true || addquestiondata[obj].error == null
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
  addEducation = () => {
    console.log(
      "sdlfjsdklfjsdklfjskdlfj",
      this.state.addquestiondata.questiontype.value
    );
    this.setState({ error: true });
    var addquestiondata = this.state.addquestiondata;
    var targetkeys = Object.keys(addquestiondata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(
        addquestiondata[targetkeys[i]].value,
        addquestiondata[targetkeys[i]].validation
      );
      console.log(errorcheck);
      addquestiondata[targetkeys[i]].error = !errorcheck.state;
      addquestiondata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter(
      (obj) => addquestiondata[obj].error == true
    );
    console.log(filtererr.length);
    if (filtererr.length > 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
    this.setState({ addquestiondata });
    this.setState({ editQuestion: false });
    var educationKeys = Object.keys(this.state.addquestiondata);
    var educationValues = Object.values(this.state.addquestiondata);
    var educationData = [];
    educationValues.map((val) => {
      return educationData.push(val.value);
    });
    console.log(this.state.educationData);
    var arr1 = {};
    for (var i in educationKeys) {
      arr1[educationKeys[i]] = educationData[i];
    }
    arr1.id = uuid();
    arr1.resId = 55;
    const isValid = this.validation();

    console.log("sdfjhsdfjdhsfjhsdfj", isValid);

    if (filtererr.length === 0 && isValid) {
      this.setState(
        {
          addedQuestions: [
            ...this.state.addedQuestions,
            {
              quescatId: this.state.selectedCategory,
              quesubcatId: this.state.selectedSubCategory,
              questiontype: this.state.addquestiondata.questiontype.value,


            },
          ],
        },
        () => this.props.dispatch(addQuestion(this.state.addedQuestions))
      );

      // this.state.Questions.push(arr1)
      // this.callroot(this.state.Questions)
    } else {
      // alert("sorry")
    }
    this.setState({});

    if (filtererr.length === 0) {
      for (var i in educationKeys) {
        this.state.addquestiondata[educationKeys[i]].value = "";
      }
    }
  };

  getQuestionCategory = () => {
    fetch(apiurl + "/category", {
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
            questionCategory: responseJson.data,
          },
          () =>
            console.log(
              "sfjsdhfsdhfljsdhfjsdhfjsdfh",
              this.state.questionCategory
            )
        );
      });
  };

  componentWillMount() {
    this.getQuestionCategory();
  }
  categoryList = () => {
    let categories = [];

    if (this.state.questionCategory.length > 0) {
      for (let i = 0; i < this.state.questionCategory.length; i++) {
        categories.push(
          <Option key={i + 1} value={this.state.questionCategory[i].QuescatId}>
            {this.state.questionCategory[i].QuescatName}
          </Option>
        );
      }
      return categories;
    }

    console.log("fsdfjhsdfjhsdjfhjsdf", categories);
  };
  getSubCategory = (data) => {
    fetch(apiurl + "/subcategory", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: data }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          questionSubCategory: responseJson.data,
        });
      });
  };

  storeCategoryValue = (event) => {
    this.setState(
      {
        selectedCategory: event,
        selectedSubCategory: [],
        selectquesType: [],
        QnA: []
      },
      () => this.getSubCategory(this.state.selectedCategory)
    );
  };
  storeSubCategoryValue = (event) => {
    console.log("ejfhdsjfhjsdfhdjsfh", event);
    this.setState(
      {
        selectedSubCategory: event,
        selectquesType: [],
        QnA: []
      },
      () => this.getQuestionType(this.state.selectedSubCategory)
    );
  };
  subCategoryList = () => {
    let subCategories = [];
    if (this.state.questionSubCategory.length > 0) {
      for (let i = 0; i < this.state.questionSubCategory.length; i++) {
        subCategories.push(
          <Option
            key={i + 1}
            value={this.state.questionSubCategory[i].QuesubcatId}
          >
            {this.state.questionSubCategory[i].QuesubcatName}
          </Option>
        );
      }
      return subCategories;
    }
  };

  getQuestionType = (data) => {
    fetch(apiurl + "/questiontype", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          questionType: responseJson.data,
        });

      });
  };
  storeQuesTypeValue = (event) => {
    console.log("ejfhdsjfhjsdfhdjsfh", event);
    this.setState(
      {
        selectquesType: event,
      },
      () => this.getAvailableQuestions()
    );
  };
  questiontypelist = () => {
    let questiontype = [];
    if (this.state.questionType.length > 0) {
      for (let i = 0; i < this.state.questionType.length; i++) {
        questiontype.push(
          <Option
            key={i + 1}
            value={this.state.questionType[i].QuestypeId}
          >
            {this.state.questionType[i].Questypename}
          </Option>
        );
      }
      return questiontype;
    }
  };


  getAvailableQuestions = () => {
    // console.log(this.state.callAPI,"skjdgnkjsn")
    // if(this.state.callAPI==true){

    axios({
      method:"POST",
      url:'http://54.198.55.249:8159/api/v1/viewaddedquestions',
      data:{
        "quescatId": this.state.selectedCategory,
        "quesubcatId": this.state.selectedSubCategory,
        "questiontype": this.state.selectquesType
      }
    }).then((response)=>{
        console.log(response, "sdmsnfbms")
      this.setState({
        QnA:response.data.data
      })
    }).catch((error)=>{

    })

    // fetch(apiurl + "/viewaddedquestions", {

    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",

    //   },
    //   body: JSON.stringify({
    //     "quescatId": this.state.selectedCategory,
    //     "quesubcatId": this.state.selectedSubCategory,
    //     "questiontype": this.state.selectquesType
    //   })

    // }).then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson, "sdmsnfbms")
    //     this.setState({
    //       QnA: responseJson.data,
    //     })
    //   });



  }

  editQuestion = () => {

  }

  render() {
    const { classes, children } = this.props;
    console.log(this.state, "Questionssdf");
    const { questionCategory, questionSubCategory, questionType } = this.props;

    return (
      <div className="card top_move">
        <div className="card-body">
          <div className="card question_viewmain">
            <div className="card-body">
              <h4>Questions View</h4>
              <Grid container spacing={3}>
                <Grid item md={3} sm={5}>
                  <div>
                    <label>
                      Category <span style={{ color: "red" }}>*</span>
                    </label>
                  </div>
                  <Select
                    style={{ width: "100%" }}
                    onChange={(event) => this.storeCategoryValue(event)}
                  >
                    {this.categoryList()}
                  </Select>
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {this.state.caterror && this.state.caterror}
                  </div>
                </Grid>
                <Grid item md={1} sm={2}></Grid>
                <Grid item md={3} sm={5}>
                  <div>
                    <label>SubCategory</label>
                  </div>
                  <Select
                    value={this.state.selectedSubCategory}
                    onChange={(event) => this.storeSubCategoryValue(event)}
                    style={{ width: "100%" }}
                  >
                    {this.subCategoryList()}
                  </Select>
                  <div style={{ color: "red", fontSize: "12px" }}>
                    {this.state.subcaterror && this.state.subcaterror}
                  </div>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item md={3} sm={12}>
                  <div>
                    <label>Question Type</label>
                  </div>
                  <Select
                    value={this.state.selectquesType}
                    onChange={(event) => this.storeQuesTypeValue(event)}
                    style={{ width: "100%" }}
                  >
                    {this.questiontypelist()}
                  </Select>
                </Grid>
              </Grid>
            </div>
          </div>
          {this.state.QnA && this.state.QnA.length > 0 && this.state.QnA.map((Qa, index) => {
            console.log(Qa, "dnvdrgg")
            return (

              <div className="card mt-4 question_main">
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<FaCaretDown className="advertise_icon" />} >

                    <div className="main_wrap">
                      <Typography>{Qa.Question}</Typography>
                      <div className="wrapping_icons">
                        {/* <EditIcon className="question_icon1"  onClick={()=>this.editQuestion()}/> */}
                        <> <DeleteIcon className="question_icon" onClick={() => this.deleteModal(Qa.QuesId)} /></>
                      </div>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <p>{Qa.Answer}</p>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {/* <MenuList>
                      <MenuItem button  className="question_border">                            
                            <ListItemText onClick={()=> this.collapse(Qa.QuesId)}>
                        <h5>{Qa.Question}</h5>
                            </ListItemText>
                            <ListItemIcon>
                                <EditIcon className="question_icon" />
                            </ListItemIcon>
                            <ListItemIcon>
                                <DeleteIcon className="question_icon" onClick={()=>this.deleteModal(Qa.QuesId)}/>
                            </ListItemIcon>
                            {this.state.expand ? <ExpandLess onClick={() => this.collapse(Qa.QuesId)}/> : <ExpandMore onClick={()=> this.collapse(Qa.QuesId)}/>}
                        </MenuItem>

                        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <MenuItem button>                                    
                                    <ListItemText className="question_wrap">
                                        <p>{Qa.Answer}</p>
                                    </ListItemText>
                                </MenuItem>
                            </List>
                        </Collapse>
                      </MenuList> */}

                {
                  this.state.deletemodal === true ?
                    <Deletemodal
                      deleteQues={this.state.deleteQues}
                      closemodal={this.closemodal}
                      getAvailableQuestions={this.getAvailableQuestions} />
                    : ""
                }
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("stateeee", state);
  return {
    questionType: state.resumeReducer.questiontype
  };
};
export default connect(mapStateToProps, {
  getQuestionType
})(QuestionView);