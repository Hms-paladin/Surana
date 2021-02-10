import React from "react";
import Textareaantd from "../../../formcomponent/textareaantd";
import Inputantd from "../../../formcomponent/inputantd";
import Dropdownantd from "../../../formcomponent/dropdownantd";
import Grid from "@material-ui/core/Grid";
import ValidationLibrary from "../../../validationlibrary/validation.js";
import "./AddQuestion.css";
import Button from "react-bootstrap/Button";
import { Modal, notification } from "antd";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import uuid from "uuid";
import { addQuestion, getQuestionSubCategory } from "./Action";
import { Select, Table, Input } from "antd";
import { apiurl } from "../../../App";

const { Option } = Select;

const initialState = {
  caterror: "",
  subcaterror: "",
};

class Education extends React.Component {
  state = {
    Questions: [],
    editQuestion: false,
    errordummy: true,
    selectedSubCategory: "",
    questionCategory: [],
    questionSubCategory: [],
    selectedCategory: "",
    initialState,
    addedQuestions: [],
    addquestiondata: {
      questiontype: {
        value: "",
        validation: [{ name: "required" }, { name: "lettersOnly " }],
        error: null,
        errmsg: null,
      },
      question: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      answer: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
      choice: {
        value: "",
        validation: [{ name: "required" }],
        error: null,
        errmsg: null,
      },
    },
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

  changeDynamic = (data, key, catid) => {
    console.log("key", key);
    console.log("data", data);

    //     this.props.questions&&this.props.questions.filter((catid) => {
    //       console.log("sdfsdjfklsdfklsdjf",catid)
    //       var subcat = [{"subname":catid.QuesubcatName,"catid":catid.QuesubcatId}]
    // })

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

  validation = () => {
    let caterror = "";
    let subcaterror = "";
    if (this.state.selectedCategory === "") {
      caterror = "Field Required";
    }

    if (this.state.selectedSubCategory === "") {
      subcaterror = "Field Required";
    }

    if (caterror || subcaterror) {
      this.setState({
        caterror,
        subcaterror,
      });
      return false;
    }
    return true;
  };

  callroot = () => {
    if (this.state.Questions && this.state.Questions.length > 0) {
      // alert("yes")
      this.addEducationAPI();
    } else {
      // alert("no")

      notification.warning({
        message: `Please Add Education Details`,
        duration: 3.5,
        placement: "topRight",
      });
    }
  };

  addEducationAPI = () => {
    var question = [...this.state.Questions];
    console.log("fsdklfjlsdkfjksad", question);
    // this.props.dispatch(addQuestion(question));
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
              question: this.state.addquestiondata.question.value,
              choice: this.state.addquestiondata.choice.value,
              answer: this.state.addquestiondata.answer.value,
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

  editQuestion = (id) => {
    this.setState({ editQuestion: true });
    var educationKeys = Object.keys(this.state.addquestiondata);
    for (var i in educationKeys) {
      this.state.addquestiondata[educationKeys[i]].error = false;
      this.state.addquestiondata[educationKeys[i]].errmsg = false;
    }
    var data = this.state.Questions.filter((val) => val.id === id);
    var educationkeys = Object.keys(this.state.addquestiondata);
    var editEducationData = [];
    data.map((val) => {
      return (editEducationData = Object.values(val));
    });
    console.log(editEducationData);

    for (var i in educationkeys) {
      this.state.addquestiondata[educationkeys[i]].value = editEducationData[i];
      console.log(editEducationData[educationkeys[i]]);
    }
    this.setState({ id: id });
    this.setState({});
  };

  deleteQuestion = (id) => {
    var UpdatedDate = this.state.Questions.filter((val) => val.id !== id).map(
      (valData) => valData
    );
    this.setState({ Questions: UpdatedDate });
    var educationKeys = Object.keys(this.state.addquestiondata);
    for (var i in educationKeys) {
      this.state.addquestiondata[educationKeys[i]].value = "";
    }
    this.setState({ editEducation: false });
  };

  editQuestionData = (id) => {
    for (var i in educationKeys) {
      this.state.addquestiondata[educationKeys[i]].error = false;
    }

    var educationKeys = Object.keys(this.state.addquestiondata);
    var educationValues = Object.values(this.state.addquestiondata);
    var data = this.state.Questions.filter((val) => val.id === id);

    var data = this.state.Questions.map((val) => val.id).indexOf(id);

    var educationValues = Object.values(this.state.addquestiondata);
    var educationData = [];
    educationValues.map((val) => {
      return educationData.push(val.value);
    });

    if (this.state.error === false) {
      educationKeys.map((val, index) => {
        return (
          (this.state.Questions[data][val] = educationData[index]),
          console.log((this.state.Questions[data].val = educationData[index]))
        );
      });
    }

    if (this.state.error === false) {
      this.setState({ editQuestion: false });
      for (var i in educationKeys) {
        this.state.addquestiondata[educationKeys[i]].value = "";
      }
    }
    this.setState({});
  };

  moreQuestions = (id) => {
    console.log("checking", id);
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
  cancel = () => {
    this.state.addquestiondata.answer.value = "";
    this.state.addquestiondata.choice.value = "";
    this.state.addquestiondata.question.value = "";
    this.state.addquestiondata.questiontype.value = "";
    this.state.selectedCategory = [];
    this.state.selectedSubCategory = [];
    this.setState({});
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
        caterror: false
      },
      () => this.getSubCategory(this.state.selectedCategory)
    );
  };

  storeSubCategoryValue = (event) => {
    console.log("ejfhdsjfhjsdfhdjsfh", event);
    this.setState(
      {
        selectedSubCategory: event,
        subcaterror: false
      },
      () => console.log("sdfjsdhflsdfhsjdfsd", this.state.selectedSubCategory)
    );
  };

  render() {
    console.log(this.props.questionSubCategory, "Questions");
    const { questionCategory, questionSubCategory, questionType } = this.props;

    return (
      <>
        <div className="card top_move">
          <div className="card-body">
            <Grid container spacing={2} className="mt-2  case">
              <Grid item md={3} sm={5}>
                <div>
                  <label>
                    Category <span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <Select
                  value={this.state.selectedCategory}
                  style={{ width: "100%" }}
                  onChange={(event) => this.storeCategoryValue(event)}
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
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
                  showSearch
                  filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.subCategoryList()}
                </Select>
                <div style={{ color: "red", fontSize: "12px" }}>
                  {this.state.subcaterror && this.state.subcaterror}
                </div>
              </Grid>
              <Grid item md={1}></Grid>
              <Grid item md={3} sm={12}>
                <Dropdownantd
                  label="Question Type"
                  className="w-100"
                  showSearch
                  option={
                    questionType &&
                    questionType.map((val) => [val.Questypename])
                  }
                  changeData={(data) =>
                    this.changeDynamic(data, "questiontype")
                  }
                  value={this.state.addquestiondata.questiontype.value}
                  error={this.state.addquestiondata.questiontype.error}
                  errmsg={this.state.addquestiondata.questiontype.errmsg}
                />
              </Grid>

              <Grid item md={7} sm={11} className=" mt-4">
                <Textareaantd
                  className={"w-100 question-move "}
                  label={"Type Question"}
                  changeData={(data) => this.changeDynamic(data, "question")}
                  value={this.state.addquestiondata.question.value}
                  error={this.state.addquestiondata.question.error}
                  errmsg={this.state.addquestiondata.question.errmsg}
                />
              </Grid>

              <Grid item md={1}>
                {" "}
              </Grid>
              <Grid item md={3} sm={6} className="answercase w-100 mt-4">
                <Inputantd
                  className={"w-100"}
                  label={"Answer"}
                  changeData={(data) => this.changeDynamic(data, "answer")}
                  value={this.state.addquestiondata.answer.value}
                  error={this.state.addquestiondata.answer.error}
                  errmsg={this.state.addquestiondata.answer.errmsg}
                  required
                />
              </Grid>

              <Grid item md={7} sm={6} className="mt-4 w-100">
                <Inputantd
                  className={"w-100"}
                  label={"Answer Options"}
                  changeData={(data) => this.changeDynamic(data, "choice")}
                  value={this.state.addquestiondata.choice.value}
                  error={this.state.addquestiondata.choice.error}
                  errmsg={this.state.addquestiondata.choice.errmsg}
                  required
                />
                <p className="hint_font">
                  (For E.g Option1,Option2,Option3...)
                </p>
              </Grid>
              {/* <Button className=" add_btn_question btnclr_outline"
                onClick={this.state.editQuestion ? () => this.editQuestionData(this.state.id) : this.addEducation}
              >
                {
                  this.state.editQuestion === true ? "Edit" : "Add"
                }
              </Button> */}
            </Grid>
            {/* <Grid item md={7} sm={6}>
              <a onClick={this.moreQuestions}>Your Questions</a>
            </Grid> */}
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
                  className=" btnwidth btnclr"
                  onClick={() => this.addEducation()}
                >
                  Submit
                </Button>
              </Grid>

              <Grid item>
                <Button onClick={this.cancel} className="btnwidth btnclr_outline">Cancel</Button>
              </Grid>
            </Grid>
          </div>
        </div>

        {
          <Modal
            className="modal_questions"
            title="Questions"
            style={{ top: 20 }}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}
          >
            <table class="table">
              <thead className="ques_clr_table">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Category</th>
                  <th scope="col">SubCategory</th>
                  <th scope="col">Question Type</th>
                  <th scope="col">Questions</th>
                  <th scope="col">Answer</th>
                  <th scope="col">Answer Options</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.Questions.map((val, Index) => {
                  return (
                    <>
                      <tr scope="row">
                        <td>{Index + 1}</td>
                        <td>{val.quescatId}</td>
                        <td>{val.quessubcatId}</td>
                        <td>{val.questiontype}</td>
                        <td>{val.question}</td>
                        <td>{val.answer}</td>
                        <td>{val.choice}</td>
                        <EditIcon onClick={(e) => this.editQuestion(val.id)} />
                        <DeleteIcon
                          className="ques_edit_icon"
                          onClick={() => this.deleteQuestion(val.id)}
                        />
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Modal>
        }
      </>
    );
  }
}

export default Education;
