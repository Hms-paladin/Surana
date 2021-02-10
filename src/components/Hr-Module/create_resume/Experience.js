import React from 'react';
import './Experience.css'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Grid } from '@material-ui/core';
import Inputantd from '../../../formcomponent/inputantd';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Textareaantd from '../../../formcomponent/textareaantd';
import { Button } from 'react-bootstrap';
import ValidationLibrary from "../../../validationlibrary/validation";
import { addExperienceDetails, experienceTab, updateExperienceDetails } from './action/CreateResumeAction';
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import { connect } from 'react-redux';
import { buttonDisableAction } from '../../../fixers/fixersAction';
import { apiurl } from '../../../App';
import Axios from 'axios'

class NewExperience extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cityList: [],
            experienceDetails: [],
            count: 0,
            experienceEntryData: [],
            experienceData: [],
            experienceEntryValue: [
                {
                    experienceEntry0:
                    {
                        'typeofIndustry':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }],
                            error: null,
                            errmsg: null
                        },
                        'organisation':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                            error: null,
                            errmsg: null
                        },
                        'cityId':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }],
                            error: null,
                            errmsg: null
                        },
                        'deptId':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                            error: null,
                            errmsg: null
                        },
                        'designId': {
                            'value': '',
                            validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                            error: null,
                            errmsg: null
                        },
                        'fromdate':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }],
                            error: null,
                            errmsg: null
                        },
                        'todate':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }],
                            error: null,
                            errmsg: null
                        },
                        'responsibilities':
                        {
                            'value': '',
                            validation: [{ 'name': 'required' }],
                            error: null,
                            errmsg: null
                        },
                    },
                }
            ]

        };
    }
    componentWillMount() {

    }

    getCityList = () => {
        Axios({
            method: 'GET',
            url: apiurl + '/city',
        }).then((response) => {
            this.setState({
                cityList: response.data.data
            })
        }).catch((error) => {

        })
    }

    componentDidMount() {
        this.getCityList()
        if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].Experience.length > 0)
            this.setState({
                experienceEntryData: this.props.resumeEditData[0].Experience
            }, () => this.setFormRow())
    }

    setFormRow = () => {
        var formKeys = this.state.experienceEntryValue.map((val, index) => {
            return (
                Object.keys(val[`experienceEntry${index}`])
            )
        })
        console.log(formKeys[0][0], "formKeys")
        if (this.state.experienceEntryData && this.state.experienceEntryData.length > 0) {
            console.log(this.state.experienceEntryData, "mykeysvasd")
            this.state.experienceEntryData.map((val, index) => {
                if (index > 0) {
                    this.addRow(index)
                    this.setState({ count: index })
                    var countForm = index + 1
                    if (this.state.experienceEntryData.length === countForm) {
                        this.setFormValues()
                    }
                }
            })
        }
        if (this.state.experienceEntryData.length === 1) {
            this.setFormValues()
        }
        this.setState({})
    }

    setFormValues = () => {
        this.state.experienceEntryData.map((val, index) => {
            return (
                this.state.experienceEntryValue[index][`experienceEntry${index}`].typeofIndustry.value = val.TypeofIndustry,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].organisation.value = val.Organisation,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].cityId.value = val.CityId,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].deptId.value = val.DeptName,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].designId.value = val.DesigName,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].fromdate.value = val.FromDate,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].todate.value = val.ToDate,
                this.state.experienceEntryValue[index][`experienceEntry${index}`].responsibilities.value = val.Responsibilities
            )
        })
        this.setState({})
    }

    addRow = (index) => {
        var count = this.state.count + 1
        this.setState({
            count: count
        })
        if (index != undefined) {
            var experienceEntry = `experienceEntry${index}`; // For multiple row's adding based on experience
        } else {
            var experienceEntry = `experienceEntry${count}`; // Single Row Adding
        }

        this.state.experienceEntryValue.push({
            [experienceEntry]: {
                'typeofIndustry':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'organisation':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                    error: null,
                    errmsg: null
                },
                'cityId':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'deptId':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                    error: null,
                    errmsg: null
                },
                'designId': {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                    error: null,
                    errmsg: null
                },
                'fromdate':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'todate':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'responsibilities':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
            }
        })
    };

    checkValidation = (index, isTrue) => {
        // alert(index)
        var experienceEntry = this.state.experienceEntryValue[index][`experienceEntry${index}`];
        var experienceEntryKeys = Object.keys(experienceEntry);
        console.log(experienceEntryKeys);
        for (var i in experienceEntryKeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                experienceEntry[experienceEntryKeys[i]].value,
                experienceEntry[experienceEntryKeys[i]].validation
            );
            console.log(errorcheck, "error");
            experienceEntry[experienceEntryKeys[i]].error = !errorcheck.state;
            experienceEntry[experienceEntryKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = experienceEntryKeys.filter(
            (obj) => experienceEntry[obj].error == true
        );
        console.log(experienceEntry, filtererr.length, "filtererrorLength");
        if (filtererr.length > 0) {
            this.setState({ error: true });
        } else {
            this.setState({ error: false });
            if (isTrue !== undefined) {
                this.sendApi(isTrue) // To send values to api
            } else {
                this.addRow(); // For Adding New Row
            }
        }
        this.setState({ experienceEntry });
    };

    changeDynamic = (data, key, index) => {
        // data - input value
        //key - input key name
        //index - state prescription index value
        // this.state.educationEntryValue[index][`educationEntry${index}`] - it will look like this this.state.educationEntryValue[0].educationEntry0

        if (index !== undefined) {
            var experienceEntry = this.state.experienceEntryValue[index][`experienceEntry${index}`]
        } else {
            var experienceEntry = this.state.experienceEntry;
        }
        console.log(this.state.experienceEntryValue[index][`experienceEntry${index}`], "sadfjkasjd")
        console.log(experienceEntry, "experienceEntry")


        var errorcheck = ValidationLibrary.checkValidation(data, this.state.experienceEntryValue[index][`experienceEntry${index}`][key].validation, index);
        experienceEntry[key].value = data;
        experienceEntry[key].error = !errorcheck.state;
        experienceEntry[key].errmsg = errorcheck.msg;
        console.log(this.state.experienceEntryValue[index], "sdfasdfasd")
        if (index !== undefined) {
            this.state.experienceEntryValue[index][`experienceEntry${index}`] = experienceEntry
        } else {
            this.setState({ experienceEntry });
        }
        this.setState({})
    };

    sendApi = (isTrue) => {
        // alert("sendapi")
        var errorCount = false
        this.state.experienceEntryValue.map((val, index) => {
            if (
                val[`experienceEntry${index}`].typeofIndustry.error === true ||
                val[`experienceEntry${index}`].organisation.error === true ||
                val[`experienceEntry${index}`].cityId.error === true ||
                val[`experienceEntry${index}`].deptId.error === true ||
                val[`experienceEntry${index}`].designId.error === true ||
                val[`experienceEntry${index}`].fromdate.error === true ||
                val[`experienceEntry${index}`].todate.error === true ||
                val[`experienceEntry${index}`].responsibilities.error === true
            ) {
                errorCount = true
            }
        })
        if (errorCount === false) {
            this.experienceApiData()
        }
    }

    experienceApiData = () => {
        var experienceFinalData = [];
        if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].Experience.length > 0) {
            //Update Api
            var resId = this.props.resumeEditData[0].ResId;
            this.state.experienceEntryValue.map((val, index) => {
                return (
                    experienceFinalData.push({
                        "resId": resId,
                        "isedit":index > this.props.resumeEditData[0].Experience.length-1 ? false : true,
                        "resworkexpId": index > this.props.resumeEditData[0].Experience.length-1 ? null : this.props.resumeEditData[0].Experience[index].ResWorkExpId,
                        "typeofIndustry": val[`experienceEntry${index}`].typeofIndustry.value,
                        "organisation": val[`experienceEntry${index}`].organisation.value,
                        "cityId": val[`experienceEntry${index}`].cityId.value,
                        "deptId": val[`experienceEntry${index}`].deptId.value,
                        "designId": val[`experienceEntry${index}`].designId.value,
                        "fromdate": val[`experienceEntry${index}`].fromdate.value,
                        "todate": val[`experienceEntry${index}`].todate.value,
                        "responsibilities": val[`experienceEntry${index}`].responsibilities.value
                    })
                )
            })
            this.props.dispatch(updateExperienceDetails(experienceFinalData, 3, this.props.propFunc, resId))
        } else {
            //Insert Api
            var resId = this.props.resumeId;
            this.state.experienceEntryValue.map((val, index) => {
                return (
                    experienceFinalData.push({
                        "resId": resId,
                        "typeofIndustry": val[`experienceEntry${index}`].typeofIndustry.value,
                        "organisation": val[`experienceEntry${index}`].organisation.value,
                        "cityId": val[`experienceEntry${index}`].cityId.value,
                        "deptId": val[`experienceEntry${index}`].deptId.value,
                        "designId": val[`experienceEntry${index}`].designId.value,
                        "fromdate": val[`experienceEntry${index}`].fromdate.value,
                        "todate": val[`experienceEntry${index}`].todate.value,
                        "responsibilities": val[`experienceEntry${index}`].responsibilities.value
                    })
                )
            })

            this.props.dispatch(addExperienceDetails(experienceFinalData, 3, this.props.propFunc, this.props.resumeId))
        }

    }


    render() {
        console.log(this.state, this.props, "typeofIndustry");
        const { typeofIndustry } = this.props;
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <div className="newExp_border">
                            <div className="newExp_heading">
                                <h5 className='mt-2'>Experience</h5>
                                <div>
                                    <AddCircleOutlineOutlinedIcon onClick={() => this.checkValidation(this.state.count)} className="newExp_addicon" />
                                </div>
                            </div>
                            {
                                this.state.experienceEntryValue.map((val, index) => {
                                    return (
                                        <Grid container spacing={1} className="education_card_new">
                                            <Grid item md={3} sm={5}>
                                                <Dropdownantd label={"Type of Industry"} className={"w-100"}
                                                    option={typeofIndustry !== null && typeofIndustry.map(val => val.typename)}
                                                    changeData={(data) => this.changeDynamic(data, 'typeofIndustry', index)}
                                                    value={val[`experienceEntry${index}`].typeofIndustry.value}
                                                    error={val[`experienceEntry${index}`].typeofIndustry.error}
                                                    errmsg={val[`experienceEntry${index}`].typeofIndustry.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                            <Grid item md={3} sm={5}>
                                                <Inputantd
                                                    label="Company Name"
                                                    className="w-100"
                                                    changeData={(data) => this.changeDynamic(data, 'organisation', index)}
                                                    value={val[`experienceEntry${index}`].organisation.value}
                                                    error={val[`experienceEntry${index}`].organisation.error}
                                                    errmsg={val[`experienceEntry${index}`].organisation.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                            <Grid item md={3} sm={5}>
                                                <Dropdownantd label={"City"} className={"w-100"}
                                                    option={this.state.cityList.map(val => val.CityName)}
                                                    changeData={(data) => this.changeDynamic(data, 'cityId', index)}
                                                    value={val[`experienceEntry${index}`].cityId.value}
                                                    error={val[`experienceEntry${index}`].cityId.error}
                                                    errmsg={val[`experienceEntry${index}`].cityId.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                            <Grid item md={3} sm={5}>
                                                <Inputantd
                                                    label="Department"
                                                    className="w-100"
                                                    changeData={(data) => this.changeDynamic(data, 'deptId', index)}
                                                    value={val[`experienceEntry${index}`].deptId.value}
                                                    error={val[`experienceEntry${index}`].deptId.error}
                                                    errmsg={val[`experienceEntry${index}`].deptId.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                            <Grid item md={3} sm={5}>
                                                <Inputantd
                                                    label="Designation"
                                                    className="w-100"
                                                    changeData={(data) => this.changeDynamic(data, 'designId', index)}
                                                    value={val[`experienceEntry${index}`].designId.value}
                                                    error={val[`experienceEntry${index}`].designId.error}
                                                    errmsg={val[`experienceEntry${index}`].designId.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={4} />
                                            <Grid item md={3} sm={5}>
                                                <DatePickerMui label="Period From" className={"w-100"}
                                                    changeData={(data) => this.changeDynamic(data, 'fromdate', index)}
                                                    value={val[`experienceEntry${index}`].fromdate.value}
                                                    error={val[`experienceEntry${index}`].fromdate.error}
                                                    errmsg={val[`experienceEntry${index}`].fromdate.errmsg}
                                                    disableFuture
                                                    blockDate={new Date()}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                            <Grid item md={3} sm={5}>
                                                <DatePickerMui label="Period To" className={"w-100"}
                                                    changeData={(data) => this.changeDynamic(data, 'todate', index)}
                                                    value={val[`experienceEntry${index}`].todate.value}
                                                    error={val[`experienceEntry${index}`].todate.error}
                                                    errmsg={val[`experienceEntry${index}`].todate.errmsg}
                                                    blockDate={new Date()}
                                                    disableFuture
                                                    minDate={val[`experienceEntry${index}`].fromdate.value}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={4} />
                                            <Grid item md={7} sm={5}>
                                                <Textareaantd
                                                    label="Responsibilities"
                                                    className="w-100"
                                                    changeData={(data) => this.changeDynamic(data, 'responsibilities', index)}
                                                    value={val[`experienceEntry${index}`].responsibilities.value}
                                                    error={val[`experienceEntry${index}`].responsibilities.error}
                                                    errmsg={val[`experienceEntry${index}`].responsibilities.errmsg}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item md={1} />
                                        </Grid>
                                    )
                                })
                            }
                            <Grid
                                container
                                className="check-css-profile"
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="mt-3"
                                spacing={3}
                            >
                                <Grid item >
                                    <Button className="btnwidth btnclr" onClick={() => this.props.propFunc(1)}>Prev</Button>
                                </Grid>
                                <Grid item >
                                    <Button className="btnwidth btnclr" onClick={() => this.checkValidation(this.state.count, true)}>
                                        {
                                            this.props.edit ? "Update" : "Next"
                                        }
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    typeofIndustry: state.fixers.industryMaster,
    experienceData: state.resumeReducer.experienceData,
    resumeEditData: state.resumeReducer.resume,

})

export default connect(mapStateToProps)(NewExperience);