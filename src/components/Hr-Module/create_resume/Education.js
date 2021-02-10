import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../formcomponent/inputantd';
import Inputnumber from '../../../formcomponent/inputnumberantd';
import './Createresume.css';
import Dropdownantd from '../../../formcomponent/dropdownantd';
import ValidationLibrary from '../../../validationlibrary/validation'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { addEducationDetails, resumeTab, educationTab, updateEducationDetails } from './action/CreateResumeAction';
import DatePickerMui from '../../../formcomponent/DatePickerMUI';
import { connect } from 'react-redux';
import { message } from 'antd';

class NewEducation extends React.Component {
    state = {
        count: 0,
        educationEntryData: [],
        educationData: [],
        educationEntryValue: [
            {
                educationEntry0: {
                    'InstitutionName':
                    {
                        'value': '',
                        validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                        error: null,
                        errmsg: null
                    },
                    'QualifyId':
                    {
                        'value': '',
                        validation: [{ 'name': 'required' }],
                        error: null,
                        errmsg: null
                    },
                    'yearofpassing':
                    {
                        'value': '',
                        validation: [],
                        error: null,
                        errmsg: null
                    },
                    'percentage': {
                        'value': '',
                        validation: [{ 'name': 'required' }],
                        error: null,
                        errmsg: null
                    },
                    'certNo': {
                        'value': '',
                        validation: [{ 'name': 'required' }, { 'name': 'alphaNumaricOnly' }],
                        error: null,
                        errmsg: null
                    },
                }
            }
        ]
    }



    componentDidMount() {
        if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].Education.length > 0)
            this.setState({
                educationEntryData: this.props.resumeEditData[0].Education
            }, () => this.setFormRow())
    }

    setFormRow = () => {
        var formKeys = this.state.educationEntryValue.map((val, index) => {
            return (
                Object.keys(val[`educationEntry${index}`])
            )
        })
        console.log(formKeys[0][0], "formKeys")
        if (this.state.educationEntryData && this.state.educationEntryData.length > 0) {
            console.log(this.state.educationEntryData, "mykeysvasd")
            this.state.educationEntryData.map((val, index) => {
                if (index > 0) {
                    this.addRow(index)
                    this.setState({ count: index })
                    var countForm = index + 1
                    if (this.state.educationEntryData.length === countForm) {
                        this.setFormValues()
                    }
                }
            })
        }
        if (this.state.educationEntryData.length === 1) {
            this.setFormValues()
        }
        this.setState({})
    }

    setFormValues = () => {
        this.state.educationEntryData.map((val, index) => {
            return (
                this.state.educationEntryValue[index][`educationEntry${index}`].InstitutionName.value = val.InstitutionName,
                this.state.educationEntryValue[index][`educationEntry${index}`].QualifyId.value = this.props.qualificationList && this.props.qualificationList.find(qual => qual.Qualifyname === val.Qualifyname).QualifyId,
                this.state.educationEntryValue[index][`educationEntry${index}`].yearofpassing.value = val.Yearofpassing,
                this.state.educationEntryValue[index][`educationEntry${index}`].percentage.value = val.Percentage,
                this.state.educationEntryValue[index][`educationEntry${index}`].certNo.value = val.CertNo
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
            var educationEntry = `educationEntry${index}`; // For multiple row's adding based on medicineList
        } else {
            var educationEntry = `educationEntry${count}`; // Single Row Adding
        }

        this.state.educationEntryValue.push({
            [educationEntry]: {
                'InstitutionName':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }, { name: 'alphabetsOnly' }],
                    error: null,
                    errmsg: null
                },
                'QualifyId':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'yearofpassing':
                {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'percentage': {
                    'value': '',
                    validation: [{ 'name': 'required' }],
                    error: null,
                    errmsg: null
                },
                'certNo': {
                    'value': '',
                    validation: [{ 'name': 'required' }, { 'name': 'alphaNumaricOnly' }],
                    error: null,
                    errmsg: null
                },
            }
        })
    };


    checkValidation = (index, isTrue) => {
        // alert(index)
        var educationEntry = this.state.educationEntryValue[index][`educationEntry${index}`];
        var educationEntryKeys = Object.keys(educationEntry);
        console.log(educationEntryKeys);
        for (var i in educationEntryKeys) {
            var errorcheck = ValidationLibrary.checkValidation(
                educationEntry[educationEntryKeys[i]].value,
                educationEntry[educationEntryKeys[i]].validation
            );
            console.log(errorcheck, "error");
            educationEntry[educationEntryKeys[i]].error = !errorcheck.state;
            educationEntry[educationEntryKeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = educationEntryKeys.filter(
            (obj) => educationEntry[obj].error == true
        );
        console.log(educationEntry, filtererr.length, "filtererrorLength");
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
        this.setState({ educationEntry });
    };


    changeDynamic = (data, key, index) => {
        // data - input value
        //key - input key name
        //index - state prescription index value
        // this.state.educationEntryValue[index][`educationEntry${index}`] - it will look like this this.state.educationEntryValue[0].educationEntry0

        if (index !== undefined) {
            var educationEntry = this.state.educationEntryValue[index][`educationEntry${index}`]
        } else {
            var educationEntry = this.state.educationEntry;
        }
        console.log(this.state.educationEntryValue[index][`educationEntry${index}`], "sadfjkasjd")
        console.log(educationEntry, "educationEntrysadfjkasjd")


        var errorcheck = ValidationLibrary.checkValidation(data, this.state.educationEntryValue[index][`educationEntry${index}`][key].validation, index);
        educationEntry[key].value = data;
        educationEntry[key].error = !errorcheck.state;
        educationEntry[key].errmsg = errorcheck.msg;
        console.log(this.state.educationEntryValue[index], "sdfasdfasd")
        if (index !== undefined) {
            this.state.educationEntryValue[index][`educationEntry${index}`] = educationEntry
        } else {
            this.setState({ educationEntry });
        }
        this.setState({})
    };

    sendApi = (isTrue) => {
        // alert("sendapi")
        var errorCount = false
        this.state.educationEntryValue.map((val, index) => {
            if (
                val[`educationEntry${index}`].InstitutionName.error === true ||
                val[`educationEntry${index}`].QualifyId.error === true ||
                val[`educationEntry${index}`].yearofpassing.error === true ||
                val[`educationEntry${index}`].percentage.error === true ||
                val[`educationEntry${index}`].certNo.error === true
            ) {
                errorCount = true
            }
        })
        if (errorCount === false) {
            this.educationApiData()
        }
    }

    educationApiData = () => {
        var educationFinalData = [];

        if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].Education.length > 0) {
            //Update Api
            var resId=this.props.resumeEditData[0].ResId;
            this.state.educationEntryValue.map((val, index) => {
                return (
                    educationFinalData.push({
                        "resId": resId,
                        "isedit":index > this.props.resumeEditData[0].Education.length-1 ? false : true,
                        "resqualifyId": index > this.props.resumeEditData[0].Education.length-1 ? null : this.props.resumeEditData[0].Education[index].ResQualifId,
                        "InstitutionName": val[`educationEntry${index}`].InstitutionName.value,
                        "QualifyId": val[`educationEntry${index}`].QualifyId.value,
                        "yearofpassing": val[`educationEntry${index}`].yearofpassing.value,
                        "percentage": val[`educationEntry${index}`].percentage.value,
                        "certNo": val[`educationEntry${index}`].certNo.value,
                    })
                )
            })
            this.props.dispatch(updateEducationDetails(educationFinalData, this.props.skipTab === false ? 2 : 3, this.props.propFunc, resId))
        } else {
            //Insert Api
            var resId = this.props.resumeId;
            this.state.educationEntryValue.map((val, index) => {
                return (
                    educationFinalData.push({
                        "resId": resId,
                        "InstitutionName": val[`educationEntry${index}`].InstitutionName.value,
                        "QualifyId": val[`educationEntry${index}`].QualifyId.value,
                        "yearofpassing": val[`educationEntry${index}`].yearofpassing.value,
                        "percentage": val[`educationEntry${index}`].percentage.value,
                        "certNo": val[`educationEntry${index}`].certNo.value,
                    })
                )
            })
            this.props.dispatch(addEducationDetails(educationFinalData, this.props.skipTab === false ? 2 : 3, this.props.propFunc, this.props.resumeId))
        }
    }


    render() {
        console.log(this.state, this.props, 'asdfasdfasdxcxe')
        const { tags, inputVisible, inputValue } = this.state;
        const { qualificationList } = this.props;
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <div className="newExp_heading">
                            <h5 className='mt-2'>Education</h5>
                            <div>
                                <AddCircleOutlineOutlinedIcon onClick={() => this.checkValidation(this.state.count)} className="newExp_addicon" />
                            </div>
                        </div>

                        {
                            this.state.educationEntryValue.map((val, index) => {
                                return (
                                    <Grid container spacing={1} className="education_card_new">
                                        <Grid item md={8} sm={6}>
                                            <Inputantd
                                                label="Institution Name"
                                                changeData={(data) => this.changeDynamic(data, 'InstitutionName', index)}
                                                value={val[`educationEntry${index}`].InstitutionName.value}
                                                error={val[`educationEntry${index}`].InstitutionName.error}
                                                errmsg={val[`educationEntry${index}`].InstitutionName.errmsg}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={5}>
                                            <Dropdownantd
                                                label="Qualification"
                                                className="w-100"
                                                changeData={(data) => this.changeDynamic(data, 'QualifyId', index)}
                                                option={qualificationList && qualificationList.map(val => val.Qualifyname)}
                                                value={val[`educationEntry${index}`].QualifyId.value}
                                                error={val[`educationEntry${index}`].QualifyId.error}
                                                errmsg={val[`educationEntry${index}`].QualifyId.errmsg}
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={5}>
                                            <DatePickerMui
                                                label='Year of Passing'
                                                changeData={(data) => this.changeDynamic(data, 'yearofpassing', index)}
                                                value={val[`educationEntry${index}`].yearofpassing.value}
                                                error={val[`educationEntry${index}`].yearofpassing.error}
                                                errmsg={val[`educationEntry${index}`].yearofpassing.errmsg}
                                                disableFuture
                                                blockDate={new Date()}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={5}>
                                            <Inputnumber
                                                label="Percentage/CGPA"
                                                className="w-100"
                                                changeData={(data) => this.changeDynamic(data, 'percentage', index)}
                                                value={val[`educationEntry${index}`].percentage.value}
                                                error={val[`educationEntry${index}`].percentage.error}
                                                errmsg={val[`educationEntry${index}`].percentage.errmsg}
                                                required
                                            />
                                        </Grid>
                                        <Grid item md={4} sm={5}>
                                            <Inputantd
                                                label="Certificate No"
                                                className="w-100"
                                                changeData={(data) => this.changeDynamic(data, 'certNo', index)}
                                                value={val[`educationEntry${index}`].certNo.value}
                                                error={val[`educationEntry${index}`].certNo.error}
                                                errmsg={val[`educationEntry${index}`].certNo.errmsg}
                                                required
                                            />
                                        </Grid>
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
                                <Button className="btnwidth btnclr" onClick={() => this.props.propFunc(0)}>Prev</Button>
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
            </React.Fragment >
        )

    }
}



const mapStateToProps = (state) => ({
    qualificationList: state.fixers.qualificationList,
    educationData: state.resumeReducer.educationData,
    educationId: state.resumeReducer.educationId,
    resumeEditData: state.resumeReducer.resume,
    resumeId: state.resumeReducer.resumeId,
    experienceData: state.resumeReducer.experienceData
})

export default connect(mapStateToProps)(NewEducation);