import React from 'react';
import Calenderbox from '../../../formcomponent/calenderbox';
import Grid from "@material-ui/core/Grid";
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiurl } from '../../../App';
import { connect } from 'react-redux';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import ReactSelect from '../../../formcomponent/ReactSelect';

class RecruitmentAddForm extends React.Component {
  state = {
    changeval: true,
    minexp: [0, 1],
    maxexp: [3, 4, 5,],
    qualification: [],
    qualificationId: [],
    recruitmentdata:
    {
      'age_from':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { "name": "allowNumaricOnly" },{"name":"custommaxLength","params":"2"}],
        error: "",
        errmsg: null
      },
      'age_to':
      {
        'value': '',
        validation: [{ 'name': 'required' }, { "name": "allowNumaricOnly" },{"name":"custommaxLength","params":"2"}],
        error: null,
        errmsg: null
      },
      'qualifications':
      {
        'value': '',
        validation: [{ name: 'required' }],
        error: null,
        errmsg: null
      },
      'location':
      {
        'value': '',
        validation: [{ name: 'required' },{ name: 'alphabetsOnly' }],
        error: null,
        errmsg: null
      },
      'experience_min':
      {
        'value': '',
        validation: [{ name: 'required' }, { "name": "allowNumaricOnlyWithZero" },{"name":"custommaxLength","params":"2"}],
        error: null,
        errmsg: null
      },
      'experience_max':
      {
        'value': '',
        validation: [{ "name": "allowNumaricOnlyWithZero" },{"name":"custommaxLength","params":"2"}],
        error: null,
        errmsg: null
      },
    }
  }

  componentDidMount() {
    var self = this
    axios({
      method: 'GET',
      url: apiurl + '/listofqualifications',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      console.log(response.data.data, "listofqualifications")
      var qualification = []
      var QualifyId = []
      response.data.data.map(data => {
        qualification.push(data.Qualifyname)
        QualifyId.push(data.QualifyId)
      })
      self.setState({ qualification: qualification, qualificationId: QualifyId })
    })
  }



  changeDynamic = (data, key) => {
    console.log("key", key);
    console.log("data", data);
    var recruitmentdata = this.state.recruitmentdata;
    var targetkeys = Object.keys(recruitmentdata);

    var errorcheck = ValidationLibrary.checkValidation(data, recruitmentdata[key].validation);
    recruitmentdata[key].value = data;
    recruitmentdata[key].error = !errorcheck.state;
    recruitmentdata[key].errmsg = errorcheck.msg;
    this.setState({ recruitmentdata });
    var filtererr = targetkeys.filter((obj) =>
      recruitmentdata[obj].error == true || recruitmentdata[obj].error == null);
    if (filtererr.length > 0) {
      this.setState({
        error: true,
        errordummy: false
      })
    } else {
      this.setState({ error: false })
    }
  }

  callroot = () => {
    this.setState({ changeval: false })

    var recruitmentdata = this.state.recruitmentdata;
    var targetkeys = Object.keys(recruitmentdata);
    console.log(targetkeys);
    for (var i in targetkeys) {
      var errorcheck = ValidationLibrary.checkValidation(recruitmentdata[targetkeys[i]].value, recruitmentdata[targetkeys[i]].validation);
      console.log(errorcheck);
      recruitmentdata[targetkeys[i]].error = !errorcheck.state;
      recruitmentdata[targetkeys[i]].errmsg = errorcheck.msg;
    }
    var filtererr = targetkeys.filter((obj) =>
      recruitmentdata[obj].error == true);
    console.log(filtererr.length)
    if (filtererr.length > 0) {
      this.setState({ error: true })
    } else {
      this.setState({ error: false })



      var self = this
      axios({
        method: 'post',
        url: apiurl + '/recruitmentsearch',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          fromage: this.state.recruitmentdata.age_from.value,
          toage: this.state.recruitmentdata.age_to.value,
          // qualifyId: this.state.qualificationId[this.state.recruitmentdata.qualifications.value - 1], // Ranjith Code
          qualifyId: this.state.recruitmentdata.qualifications.value, // Currently changing the code for multi select purpose //Ashwin
          location: this.state.recruitmentdata.location.value,
          minexp: this.state.recruitmentdata.experience_min.value,
          maxexp: this.state.recruitmentdata.experience_max.value === "" ? this.state.recruitmentdata.experience_min.value : this.state.recruitmentdata.experience_max.value,
        }
      }).then((response) => {
        console.log(response.data.data, "recruitmentsearch")

        if (response.data.data.length === 0) {
          alert("No Result Found")
        } else {
          this.props.listdata && this.props.listdata(response.data.data)
          this.props.propsFunc && this.props.propsFunc(1)

        }

        this.state.recruitmentdata.age_from.value = ""
        this.state.recruitmentdata.age_to.value = ""

        this.state.recruitmentdata.qualifications.value = ""
        this.state.recruitmentdata.qualifications.error = ""
        this.state.recruitmentdata.qualifications.errmsg = ""

        this.state.recruitmentdata.location.value = ""
        this.state.recruitmentdata.experience_min.value = ""
        this.state.recruitmentdata.experience_max.value = ""
        this.setState({})

      })

    }
    this.setState({ recruitmentdata })

    // let changenext=[]
    // let j=0
    // for(j=0;j<targetkeys.length;j++){
    //   changenext.push(this.state.recruitmentdata[targetkeys[j]].error)
    // }

    // let nextvalue=changenext.every( (val) => val === false )

    // if(nextvalue===true){
    //   this.props.propFunc && this.props.propFunc(2)
    // }

  }

  cancel = () => {
    this.state.recruitmentdata.age_from.value = ""
    this.state.recruitmentdata.age_to.value = ""

    this.state.recruitmentdata.qualifications.value = ""
    this.state.recruitmentdata.qualifications.error = ""
    this.state.recruitmentdata.qualifications.errmsg = ""

    this.state.recruitmentdata.location.value = ""
    this.state.recruitmentdata.experience_min.value = ""
    this.state.recruitmentdata.experience_max.value = ""
    this.setState({})
  }

  render() {
    console.log(this.props,"sdfkasdfjksa")
    return (
      <React.Fragment>
        <div className="card top_move">
          <div className="card-body">
            <Grid container spacing={4} className="mt-3 ">
              <Grid item md={3} sm={5} className="w-100">

                <Inputantd className="w-100" label="Age From"
                  changeData={(data) => this.changeDynamic(data, 'age_from')}
                  value={this.state.recruitmentdata.age_from.value}
                  error={this.state.recruitmentdata.age_from.error}
                  errmsg={this.state.recruitmentdata.age_from.errmsg}
                  required
                />

              </Grid>
              <Grid md={1}></Grid>
              <Grid item md={3} sm={5} className="w-100">
                <Inputantd className="w-100 age-move" label="Age To"
                  changeData={(data) => this.changeDynamic(data, 'age_to')}
                  value={this.state.recruitmentdata.age_to.value}
                  error={this.state.recruitmentdata.age_to.error}
                  errmsg={this.state.recruitmentdata.age_to.errmsg}
                  required
                />

              </Grid>
              <Grid md={1}></Grid>
              <Grid item md={3} sm={5}>
                <Dropdownantd label={"Qualification"} className="w-100 qualification-height"
                  option={this.state.qualification}
                  changeData={(data) => this.changeDynamic(data, 'qualifications')}
                  value={this.state.recruitmentdata.qualifications.value}
                  error={this.state.recruitmentdata.qualifications.error}
                  errmsg={this.state.recruitmentdata.qualifications.errmsg}
                  mode={"multiple"}
                  required
                />
                {/* <ReactSelect className="w-100" label="Qualification"
                                    option={this.state.qualification}
                                    changeData={(data)=>this.changeDynamic(data,'qualifications')} 
                                    value={this.state.recruitmentdata.qualifications.value} 
                                    error={this.state.recruitmentdata.qualifications.error} 
                                    errmsg={this.state.recruitmentdata.qualifications.errmsg}
                                      required
                                    closeMenuOnSelect
                                /> */}

              </Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Location"} className={"w-100  location-move"}
                  changeData={(data) => this.changeDynamic(data, 'location')}
                  value={this.state.recruitmentdata.location.value}
                  error={this.state.recruitmentdata.location.error}
                  errmsg={this.state.recruitmentdata.location.errmsg}
                  required

                />
              </Grid>
              <Grid md={1}></Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Experience(Min)"} className="w-100 qualification-height"
                  option={this.state.minexp}
                  changeData={(data) => this.changeDynamic(data, 'experience_min')}
                  value={this.state.recruitmentdata.experience_min.value}
                  error={this.state.recruitmentdata.experience_min.error}
                  errmsg={this.state.recruitmentdata.experience_min.errmsg}
                  required

                />
              </Grid>
              <Grid md={1}></Grid>
              <Grid item md={3} sm={5}>
                <Inputantd label={"Experience(Max)"} className="w-100 qualification-height"
                  option={this.state.maxexp}
                  changeData={(data) => this.changeDynamic(data, 'experience_max')}
                  value={this.state.recruitmentdata.experience_max.value}
                  error={this.state.recruitmentdata.experience_max.error}
                  errmsg={this.state.recruitmentdata.experience_max.errmsg}
                />

              </Grid>
              <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                className="gridbtnalign"
                spacing={3}>
                <Grid item >
                  <Button size="lg" className="btnmargin btnwidth btnclr" onClick={() => this.callroot()}>Search</Button>
                </Grid>
                <Grid item >
                  <Button size="lg" className="btnwidth btnclr_outline" onClick={this.cancel}>Cancel</Button>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}




export default RecruitmentAddForm;