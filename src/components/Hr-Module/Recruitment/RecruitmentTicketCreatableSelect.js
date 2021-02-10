import React from 'react';
import Grid from '@material-ui/core/Grid';
import './RecruitmentAddForm.css'
import { Tag } from 'antd'
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import ReactSelect from '../../../formcomponent/ReactSelect';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { connect } from 'react-redux';
import { getLanguages, getSpecialization, getCertification, getLicenses, getQualification, generateTicket } from './RecruitmentAction';
import { getSkills } from '../create_resume/CreateResumeAction';

class RecruitmentTicket extends React.Component {

    state = {
        placeholderMin:"Min",
        placeholderMax:"Max",
        certification: ['-', '-'],
        expcount_one:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
        expcount_two:[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50],
        expcount:[expcount_one + expcount_two],
        template: [
            {
                id: 1,
                value: 'Senior Counsel'
            },
            {
                id: 2,
                value: 'Junior Counsel'
            }
        ],
        searchIn: [
            {
                id: 1,
                value: 'Database'
            },
            {
                id: 2,
                value: 'Ex Employee'
            },
            {
                id: 2,
                value: 'Interns'
            }
        ],
        gender: [
            {
                id: 1,
                value: 'Male'
            },
            {
                id: 2,
                value: 'Female'
            },
        ],
        languages: ['Tamil', 'English',],
        specilization: ['-', '-', '-'],
        licenses: ['-', '-', '-'],
        skillset: ['Labour Law', 'Arbitration'],
        changeval: true,
        recruitmentTicketData:
        {
            'tempId':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { 'name': '' }],
                error: "",
                errmsg: null
            },
            'qualifyId':
            {
                'value': '',
                validation: [{ 'name': '' }],
                error: null,
                errmsg: null
            },
            'minage':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'maxage':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'minexp':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'maxexp':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'noOfcandidates':
            {
                'value': '',
                validation: [{ name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'searchIn':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'gender':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'certId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'langId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'specId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'liceId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
            'skillId':
            {
                'value': '',
                validation: [{ name: '' }],
                error: null,
                errmsg: null
            },
        }
    }

    componentWillMount() {
        this.props.dispatch(getLanguages());
        this.props.dispatch(getSpecialization());
        this.props.dispatch(getCertification())
        this.props.dispatch(getLicenses());
        this.props.dispatch(getQualification())
        this.props.dispatch(getSkills())
    }


    changeDynamic = (data, key) => {
        var myKey = ["searchIn", "gender", "certId", "langId", "specId", "liceId", "skillId"]

        console.log("key", key);
        console.log("data", data);
        var recruitmentTicketData = this.state.recruitmentTicketData;
        var targetkeys = Object.keys(recruitmentTicketData);

        var errorcheck = ValidationLibrary.checkValidation(data, recruitmentTicketData[key].validation);
        recruitmentTicketData[key].value = data;
        // for (var i in myKey) {
        //     if (key === myKey[i]) {
        //         recruitmentTicketData[key].value = data.map(val => val.id);
        //         alert(JSON.stringify(recruitmentTicketData[key].value=data.map(val => val.id)))
        //     }
        // }
        recruitmentTicketData[key].error = !errorcheck.state;
        recruitmentTicketData[key].errmsg = errorcheck.msg;
        this.setState({ recruitmentTicketData });
        var filtererr = targetkeys.filter((obj) =>
            recruitmentTicketData[obj].error == true || recruitmentTicketData[obj].error == null);
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

        var recruitmentTicketData = this.state.recruitmentTicketData;
        var targetkeys = Object.keys(recruitmentTicketData);
        console.log(targetkeys);
        for (var i in targetkeys) {
            var errorcheck = ValidationLibrary.checkValidation(recruitmentTicketData[targetkeys[i]].value, recruitmentTicketData[targetkeys[i]].validation);
            console.log(errorcheck);
            recruitmentTicketData[targetkeys[i]].error = !errorcheck.state;
            recruitmentTicketData[targetkeys[i]].errmsg = errorcheck.msg;
        }
        var filtererr = targetkeys.filter((obj) =>
            recruitmentTicketData[obj].error == true);
        console.log(filtererr.length)
        if (filtererr.length > 0) {
            this.setState({ error: true })
        } else {
            this.setState({ error: false })

        }
        this.setState({ recruitmentTicketData })

        if (filtererr.length === 0) {
            // alert("Hey")
            this.generateTicketApi()
        }

        let changenext = []
        let j = 0
        for (j = 0; j < targetkeys.length; j++) {
            changenext.push(this.state.recruitmentTicketData[targetkeys[j]].error)
        }
        let nextvalue = changenext.every((val) => val === false)

        if (nextvalue === true) {
            this.props.propFunc && this.props.propFunc(2)
        }

    }

    generateTicketApi = () => {
        var recruitmentTicketData = {}
        var ticketKeys = Object.keys(this.state.recruitmentTicketData)
        var ticketData = ticketKeys.slice(7)
        var key1 = ["tempId", "qualifyId", "minage", "maxage", "minexp", "maxexp", "noOfnoOfcandidates"]
        var myKey = ["searchIn", "gender", "certId", "langId", "specId", "liceId", "skillId"]
        var generateTag = [];
        var arr = {}
        for (var i = 0; i <= 6; i++) {
            arr[key1[i]] = this.state.recruitmentTicketData[ticketKeys[i]].value
        }
        // alert(JSON.stringify(this.state.recruitmentTicketData))
        var arr1 = {}
        for (var i in ticketData) {
            // alert(JSON.stringify(this.state.recruitmentTicketData[ticketData[i]].value))
            arr1[myKey[i]] = this.state.recruitmentTicketData[ticketData[i]].value.map(val => val.id)
        }

        // alert(JSON.stringify(arr1))

        var data = {
            empId: 1,
            ...arr,
            generateTicket: [
                arr1
            ]
        }
        // alert(JSON.stringify(data))
        // this.props.dispatch(generateTicket(data))

    }

    render() {

        const { languages, certification, licenses, specialization, qualification, skills } = this.props;
        console.log(this.state.recruitmentTicketData)
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <Grid container spacing={4} className="mt-3 ">
                            <Grid item md={3} sm={5} className="w-100">

                                <ReactSelect className="w-100" label="Template"
                                    options={this.state.template.map((val) => { return { value: val.value, label: val.value, id:val.CourseId } })}
                                    changeData={(data) => this.changeDynamic(data, 'tempId')}
                                    value={this.state.recruitmentTicketData.tempId.value}
                                    error={this.state.recruitmentTicketData.tempId.error}
                                    errmsg={this.state.recruitmentTicketData.tempId.errmsg}
                                    required
                                    closeMenuOnSelect
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Qualification"
                                    options={qualification.length > 0 && qualification.map((val) => { return { value: val.Qualifyname, label: val.Qualifyname,id:val.QualifyId } })}
                                    changeData={(data) => this.changeDynamic(data, 'qualifyId')}
                                    value={this.state.recruitmentTicketData.qualifyId.value}
                                    error={this.state.recruitmentTicketData.qualifyId.error}
                                    errmsg={this.state.recruitmentTicketData.qualifyId.errmsg}
                                    closeMenuOnSelect
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Certifications"
                                    options={certification.length > 0 && certification.map((val) => { return { value: val.CourseName, label: val.CourseName, id: val.CourseId } })}
                                    // options={certification.length > 0 && certification.map(val => [val.CourseName]).map( (valSelect) => { return({value:valSelect,label:valSelect})} )}
                                    changeData={(data) => this.changeDynamic(data, 'certId')}
                                    value={this.state.recruitmentTicketData.certId.value}
                                    error={this.state.recruitmentTicketData.certId.error}
                                    errmsg={this.state.recruitmentTicketData.certId.errmsg}
                                    isMulti
                                />
                            </Grid>

                            <Grid md={1} />

                            <Grid item md={3} sm={5}>
                                <div className="d-flex">
                                    <Inputantd className="min_width" label="Age" placeholder="Min"
                                        changeData={(data) => this.changeDynamic(data, 'minage')}

                                        value={this.state.recruitmentTicketData.minage.value}
                                        error={this.state.recruitmentTicketData.minage.error}
                                        errmsg={this.state.recruitmentTicketData.minage.errmsg} />
                                    <Inputantd className="max_width mt-2" placeholder="Max"
                                        changeData={(data) => this.changeDynamic(data, 'maxage')}
                                        value={this.state.recruitmentTicketData.maxage.value}
                                        error={this.state.recruitmentTicketData.maxage.error}
                                        errmsg={this.state.recruitmentTicketData.maxage.errmsg} />
                                </div>
                            </Grid>

                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="">
                                <div className="d-flex">
                                    <Dropdownantd className="min_width" label="Experience" 
                                        placeholder={"Min"}
                                        option={this.state.expcount.map((val)=>val)}
                                        changeData={(data) => this.changeDynamic(data, 'minexp')}
                                        value={this.state.recruitmentTicketData.minexp.value}
                                        error={this.state.recruitmentTicketData.minexp.error}
                                        errmsg={this.state.recruitmentTicketData.minexp.errmsg} />

                                    <Dropdownantd className="max_width mt-2" 
                                        placeholder={"Max"}
                                        changeData={(data) => this.changeDynamic(data, 'maxexp')}
                                        value={this.state.recruitmentTicketData.maxexp.value}
                                        error={this.state.recruitmentTicketData.maxexp.error}
                                        errmsg={this.state.recruitmentTicketData.maxexp.errmsg}
                                    />
                                </div>
                            </Grid>

                            <Grid md={1} />


                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Search In"
                                    options={this.state.searchIn.map((val) => { return { value: val.value, label: val.value, id:val.id } })}
                                    changeData={(data) => this.changeDynamic(data, 'searchIn')}
                                    value={this.state.recruitmentTicketData.searchIn.value}
                                    error={this.state.recruitmentTicketData.searchIn.error}
                                    errmsg={this.state.recruitmentTicketData.searchIn.errmsg}
                                    defaultValue={this.state.searchIn.length > 0 && this.state.searchIn.map(val => val.value)}
                                    isMulti
                                />
                            </Grid>

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Gender"
                                    options={this.state.gender.map((val) => { return { value: val.value, label: val.value, id:val.id } })}
                                    changeData={(data) => this.changeDynamic(data, 'gender')}
                                    value={this.state.recruitmentTicketData.gender.value}
                                    error={this.state.recruitmentTicketData.gender.error}
                                    errmsg={this.state.recruitmentTicketData.gender.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Language"
                                    options={languages.length > 0 && languages.map((val) => { return { value: val.LangName, label: val.LangName,id:val.LangId } })}
                                    changeData={(data) => this.changeDynamic(data, 'langId')}
                                    value={this.state.recruitmentTicketData.langId.value}
                                    error={this.state.recruitmentTicketData.langId.error}
                                    errmsg={this.state.recruitmentTicketData.langId.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect label="Specialization" className="w-100"
                                    options={specialization.length > 0 && specialization.map((val) => { return { value: val.SpecName, label: val.SpecName, id:val.SpecId } })}
                                    changeData={(data) => this.changeDynamic(data, 'specId')}
                                    value={this.state.recruitmentTicketData.specId.value}
                                    error={this.state.recruitmentTicketData.specId.error}
                                    errmsg={this.state.recruitmentTicketData.specId.errmsg}
                                    isMulti
                                />
                            </Grid>


                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="License"
                                    options={licenses.length > 0 && licenses.map((val) => { return { value: val.LiceName, label: val.LiceName,id:val.LiceId } })}
                                    changeData={(data) => this.changeDynamic(data, 'liceId')}
                                    value={this.state.recruitmentTicketData.liceId.value}
                                    error={this.state.recruitmentTicketData.liceId.error}
                                    errmsg={this.state.recruitmentTicketData.liceId.errmsg}
                                    isMulti
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <ReactSelect className="w-100 " label="Skills"
                                    options={skills != null && skills.map((val) => { return { value: val.CLName, label: val.CLName,id:val.CLId } })}
                                    changeData={(data) => this.changeDynamic(data, 'skillId')}
                                    value={this.state.recruitmentTicketData.skillId.value}
                                    error={this.state.recruitmentTicketData.skillId.error}
                                    errmsg={this.state.recruitmentTicketData.skillId.errmsg}
                                    isMulti
                                />
                            </Grid>

                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="">
                                <Inputantd className="w-100" label="Required Number of noOfcandidates"
                                    changeData={(data) => this.changeDynamic(data, 'noOfcandidates')}
                                    value={this.state.recruitmentTicketData.noOfcandidates.value}
                                    error={this.state.recruitmentTicketData.noOfcandidates.error}
                                    errmsg={this.state.recruitmentTicketData.noOfcandidates.errmsg}
                                />
                            </Grid>


                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="mb-2"
                                spacing={3}>
                                <Grid item className="mr-2">
                                    <Button size="lg" className="btnmargin btnwidth btnclr w-100" onClick={() => this.callroot()}>Generate Ticket</Button>
                                </Grid>
                                <Grid item className="ml-4" >
                                    <Button size="lg" className="btnwidth btnclr_outline w-100">Save as Template</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    languages: state.recruitment.languages,
    certification: state.recruitment.certification,
    specialization: state.recruitment.specialization,
    licenses: state.recruitment.licenses,
    qualification: state.recruitment.qualification,
    skills: state.resumeReducer.skills
})

export default connect(mapStateToProps)(RecruitmentTicket);

