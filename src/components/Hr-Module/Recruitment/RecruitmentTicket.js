import React from 'react';
import Grid from '@material-ui/core/Grid';
import './RecruitmentAddForm.css'
import { Tag } from 'antd'
import Dropdownantd from '../../../formcomponent/dropdownantd';
import Inputantd from '../../../formcomponent/inputantd';
import Button from 'react-bootstrap/Button';
import ValidationLibrary from "../../../validationlibrary/validation.js";
import { connect } from 'react-redux';
import {
    getLanguages, getSpecialization, getCertification,
    getLicenses, getQualification, generateTicket,
    createTemplate, getTemplateName, getTemplateData, generateTicketWithoutId
} from './RecruitmentAction';
import { getSkills, getDesignations } from '../create_resume/action/CreateResumeAction';

import CreatableSelect from 'react-select/creatable';

import axios from 'axios';
import { apiurl } from '../../../App';



class RecruitmentTicket extends React.Component {

    state = {
        templateName: null,
        templateData: null,
        selectedcolor: undefined,

        expcount: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
            26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],

        certification: ['-', '-'],
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
                id: 3,
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
            }
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
                validation: [{ 'name': 'required' }, { 'name': '' }],
                error: null,
                errmsg: null
            },
            'minage':
            {
                'value': '',
                validation: [{ 'name': 'required' }, { name: 'allowNumaricOnlyWithZero' }],
                error: null,
                errmsg: null
            },
            'maxage':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: 'allowNumaricOnlyWithZero' }],
                error: null,
                errmsg: null
            },
            'minexp':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: 'allowNumaricOnlyWithZero' }],
                error: null,
                errmsg: null
            },
            'maxexp':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: 'allowNumaricOnlyWithZero' }],
                error: null,
                errmsg: null
            },
            'noOfcandidates':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: 'allowNumaricOnly' }],
                error: null,
                errmsg: null
            },
            'searchIn':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'gender':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'certId':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'langId':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'specId':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'liceId':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'skillId':
            {
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            },
            'designationId':{
                'value': '',
                validation: [{ name: 'required' }, { name: '' }],
                error: null,
                errmsg: null
            }
        }
    }

    componentWillMount() {
        this.props.dispatch(getLanguages());
        this.props.dispatch(getSpecialization());
        this.props.dispatch(getCertification())
        this.props.dispatch(getLicenses());
        this.props.dispatch(getQualification())
        this.props.dispatch(getSkills())
        this.props.dispatch(getDesignations())

    }


    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var recruitmentTicketData = this.state.recruitmentTicketData;
        var targetkeys = Object.keys(recruitmentTicketData);

        var errorcheck = ValidationLibrary.checkValidation(data, recruitmentTicketData[key].validation);
        recruitmentTicketData[key].value = data;
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

    callroot = (saveTicket) => {
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
            this.generateTicketApi(saveTicket)
            var keys = Object.keys(this.state.recruitmentTicketData)
            for (var i in keys) {
                this.state.recruitmentTicketData[keys[i]].value = ""
            }
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


    generateTicketApi = (generateTicketApi) => {
        // alert(generateTicketApi)
        var recruitmentTicketData = {}
        var ticketKeys = Object.keys(this.state.recruitmentTicketData)
        var ticketData = ticketKeys.slice(7)
        var key1 = [`${generateTicketApi !== false ? 'tempId' : 'tempname'}`, "qualifyId", "minage", "maxage", "minexp", "maxexp", "noOfcandidates"]
        var myKey = ["searchIn", "gender", "certId", "langId", "specId", "liceId", "skillId"]
        var generateTag = [];
        var arr = {}
        for (var i = 0; i <= 6; i++) {
            arr[key1[i]] = this.state.recruitmentTicketData[ticketKeys[i]].value
        }
        var arr1 = {}
        for (var i in ticketData) {
            arr1[myKey[i]] = this.state.recruitmentTicketData[ticketData[i]].value.toString()
        }

        arr.forthepost = this.state.recruitmentTicketData.designationId.value;

        var data = {
            empId: 1,
            ...arr,
            generateTicket: [
                arr1
            ]
        }

        // alert(JSON.stringify(data))
        console.log("asdfjalskf", generateTicketApi,data)
        if (generateTicketApi === false) {
            data.tempname = this.state.templateName
            data.istemp= 0
            // alert(JSON.stringify(data))
            this.props.dispatch(createTemplate(data)) // for Ticket Genereate Button
        } else {
            data.istemp= 1
            this.props.dispatch(generateTicket(data)) // Save as template button
            // if(typeof this.state.recruitmentTicketData.tempId.value === "number"){
            //     // this.props.dispatch(generateTicket(data))
            //     alert(JSON.stringify(data))
            // }else{
            //     alert(JSON.stringify(data))
            //     // this.props.dispatch(generateTicketWithoutId(data))
            // }
        }
        // this.props.dispatch(getTemplateName());
    }


    handleChange = (newValue: any, actionMeta: any) => {
        console.group('Value Changed');
        console.log(newValue, "newValuedsf");
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        if (newValue !== null) {
            if (newValue.id) {
                this.setState({ templateName: newValue.label })
                this.state.recruitmentTicketData.tempId.value = newValue.label;
                this.state.recruitmentTicketData.tempId.error = false;
                this.state.recruitmentTicketData.tempId.errmsg = '';
                this.getTemplateData(newValue.id);
            } else {
                this.setState({ templateName: newValue.label })
                this.state.recruitmentTicketData.tempId.value = newValue.label;
                this.state.recruitmentTicketData.tempId.error = false;
                this.state.recruitmentTicketData.tempId.errmsg = '';
            }
        } else {
            this.formResetBlock()
        }
        this.setState({})

    };

    handleInputChange = (inputValue: any, actionMeta: any) => {
        console.group('Input Changed', inputValue);
        console.log(inputValue);
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        // alert("Hey")
    };

    getTemplateData = (templateId) => {
        axios({
            method: 'POST',
            url: apiurl + '/generateTicketList',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                generateTicketId: templateId
            }
        }).then((response) => {
            console.log(response, "okk")
            this.setState({
                templateData: response.data.data
            }, () => this.setTemplateWithData(this.state.templateData))
        })
    }

    setTemplateWithData = (templateData) => {
        // alert(JSON.stringify(templateData));
        console.log(templateData, "fasdfafds")
        this.state.recruitmentTicketData.qualifyId.value = templateData[0].QualifyId;
        this.state.recruitmentTicketData.certId.value = templateData[0].CertId.split(",").map(Number);
        this.state.recruitmentTicketData.minage.value = templateData[0].MinAge;
        this.state.recruitmentTicketData.maxage.value = templateData[0].MaxAge;
        this.state.recruitmentTicketData.minexp.value = templateData[0].MinExp;
        this.state.recruitmentTicketData.maxexp.value = templateData[0].MaxExp;
        this.state.recruitmentTicketData.searchIn.value = templateData[0].SearchIn.split(",");
        this.state.recruitmentTicketData.gender.value = templateData[0].Gender.split(",")
        this.state.recruitmentTicketData.langId.value = templateData[0].LangId.split(",").map(Number);
        this.state.recruitmentTicketData.specId.value = templateData[0].SpecId.split(",").map(Number);
        this.state.recruitmentTicketData.liceId.value = templateData[0].LiceId.split(",").map(Number);
        this.state.recruitmentTicketData.skillId.value = templateData[0].SkillId.split(",").map(Number);
        this.state.recruitmentTicketData.noOfcandidates.value = templateData[0].NoOfCandidates;
        this.setState({})
        this.formFieldsError()
    }

    formFieldsError = () => {
        var formKeys = Object.keys(this.state.recruitmentTicketData)
        // alert(JSON.stringify(formKeys))
        for (var i in formKeys) {
            this.state.recruitmentTicketData[formKeys[i]].error = false
            this.state.recruitmentTicketData[formKeys[i]].errmsg = ''
        }
        this.setState({})
    }


    formResetBlock = () => {
        var formKeys = Object.keys(this.state.recruitmentTicketData)
        // alert(JSON.stringify(formKeys))
        for (var i in formKeys) {
            this.state.recruitmentTicketData[formKeys[i]].value = ''
        }
        this.setState({})
    }

    componentDidMount() {
        this.props.dispatch(getTemplateName());
    }

    render() {
        console.log(this.state.recruitmentTicketData, "checkingData")
        const { languages, certification, licenses, specialization, qualification, skills, templatesName, designation } = this.props;

        return (
            <React.Fragment>
                <div className="card top_move-ticket">
                    <div className="card-body">
                        <Grid container spacing={4} className="mt-3 ">
                            <Grid item md={12} sm={5} className="d-flex justify-content-between">
                                <div className="w-25">
                                    <label>For the Post</label>
                                    <Dropdownantd className="w-100 "
                                        option={designation && designation.length > 0 && designation.map(val => val.DesigName)}
                                        changeData={(data) => this.changeDynamic(data, 'designationId')}
                                        value={this.state.recruitmentTicketData.designationId.value}
                                        error={this.state.recruitmentTicketData.designationId.error}
                                        errmsg={this.state.recruitmentTicketData.designationId.errmsg}
                                        showSearch
                                    />
                                </div>
                                <h6 className='pt-4'>Requestor Name: Prasanth</h6>
                            </Grid>
                            <Grid item md={3} sm={5} className="w-100">
                                <p>Template</p>
                                <CreatableSelect
                                    className={this.state.recruitmentTicketData.tempId.error === true && "template_error"}
                                    isClearable
                                    onChange={this.handleChange}
                                    changeData={(data) => this.changeDynamic(data, 'template')}
                                    onInputChange={this.handleInputChange}
                                    options={this.props.templatesName && this.props.templatesName.map((val) => { return { value: val.TempId, label: val.TempId, id: val.JobIndentId } })}
                                />
                                {
                                    this.state.recruitmentTicketData.tempId.error === true &&
                                    <p className="template_errormsg">Field Required</p>
                                }
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Qualification"
                                    option={qualification.length > 0 && qualification.map(val => val.Qualifyname)}
                                    changeData={(data) => this.changeDynamic(data, 'qualifyId')}
                                    value={this.state.recruitmentTicketData.qualifyId.value}
                                    error={this.state.recruitmentTicketData.qualifyId.error}
                                    errmsg={this.state.recruitmentTicketData.qualifyId.errmsg}
                                    showSearch
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Certifications"
                                    option={certification.length > 0 && certification.map(val => val.CourseName)}
                                    changeData={(data) => this.changeDynamic(data, 'certId')}
                                    value={this.state.recruitmentTicketData.certId.value}
                                    error={this.state.recruitmentTicketData.certId.error}
                                    errmsg={this.state.recruitmentTicketData.certId.errmsg}
                                    mode={"multiple"}
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
                                    <Inputantd
                                        className="max_width mt-2" placeholder="Max"
                                        changeData={(data) => this.changeDynamic(data, 'maxage')}
                                        value={this.state.recruitmentTicketData.maxage.value}
                                        error={this.state.recruitmentTicketData.maxage.error}
                                        errmsg={this.state.recruitmentTicketData.maxage.errmsg} />
                                </div>
                            </Grid>

                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="">
                                <>
                                    <Grid container spacing={1}>
                                        <Grid item md={6} sm={6}>
                                            <Inputantd className="w-100" label="Experience"
                                                placeholder={"Min"}
                                                // option={this.state.expcount.map((val) => val)}
                                                changeData={(data) => this.changeDynamic(data, 'minexp')}
                                                value={this.state.recruitmentTicketData.minexp.value}
                                                error={this.state.recruitmentTicketData.minexp.error}
                                                errmsg={this.state.recruitmentTicketData.minexp.errmsg} />
                                            <span>(Min)</span>
                                        </Grid>
                                        <Grid item md={6} sm={6}>
                                            <Inputantd className="w-100 mt-2"
                                                placeholder={"Max"}
                                                // option={this.state.expcount.map((val) => val)}
                                                changeData={(data) => this.changeDynamic(data, 'maxexp')}
                                                value={this.state.recruitmentTicketData.maxexp.value}
                                                error={this.state.recruitmentTicketData.maxexp.error}
                                                errmsg={this.state.recruitmentTicketData.maxexp.errmsg}
                                            />
                                            <span>(Max)</span>
                                        </Grid>
                                    </Grid>
                                </>
                            </Grid>

                            <Grid md={1} />


                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Search In"
                                    option={this.state.searchIn.length > 0 && this.state.searchIn.map(val => val.value)}
                                    changeData={(data) => this.changeDynamic(data, 'searchIn')}
                                    value={this.state.recruitmentTicketData.searchIn.value}
                                    error={this.state.recruitmentTicketData.searchIn.error}
                                    errmsg={this.state.recruitmentTicketData.searchIn.errmsg}
                                    defaultValue={this.state.searchIn.length > 0 && this.state.searchIn.map(val => val.value)}
                                    mode={"multiple"}
                                    convertString
                                />
                            </Grid>

                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Gender"
                                    option={this.state.gender.length > 0 && this.state.gender.map(val => val.value)}
                                    changeData={(data) => this.changeDynamic(data, 'gender')}
                                    value={this.state.recruitmentTicketData.gender.value}
                                    error={this.state.recruitmentTicketData.gender.error}
                                    errmsg={this.state.recruitmentTicketData.gender.errmsg}
                                    defaultValue={this.state.gender.length > 0 && this.state.gender.map(val => val.value)}
                                    mode={"multiple"}
                                    convertString
                                />
                            </Grid>
                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Language"
                                    option={languages.length > 0 && languages.map(val => val.LangName)}
                                    changeData={(data) => this.changeDynamic(data, 'langId')}
                                    value={this.state.recruitmentTicketData.langId.value}
                                    error={this.state.recruitmentTicketData.langId.error}
                                    errmsg={this.state.recruitmentTicketData.langId.errmsg}
                                    mode={"multiple"}
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd label="Specialization" className="w-100"
                                    option={specialization.length > 0 && specialization.map(val => val.SpecName)}
                                    changeData={(data) => this.changeDynamic(data, 'specId')}
                                    value={this.state.recruitmentTicketData.specId.value}
                                    error={this.state.recruitmentTicketData.specId.error}
                                    errmsg={this.state.recruitmentTicketData.specId.errmsg}
                                    mode={"multiple"}
                                />
                            </Grid>


                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Licenses"
                                    option={licenses.length > 0 && licenses.map(val => val.LiceName)}
                                    changeData={(data) => this.changeDynamic(data, 'liceId')}
                                    value={this.state.recruitmentTicketData.liceId.value}
                                    error={this.state.recruitmentTicketData.liceId.error}
                                    errmsg={this.state.recruitmentTicketData.liceId.errmsg}
                                    mode={"multiple"}
                                />
                            </Grid>
                            <Grid md={1} />

                            <Grid item md={3} sm={5} className="w-100">
                                <Dropdownantd className="w-100 " label="Skills"
                                    option={skills != null && skills.data.map(val => val.skillname)}
                                    changeData={(data) => this.changeDynamic(data, 'skillId')}
                                    value={this.state.recruitmentTicketData.skillId.value}
                                    error={this.state.recruitmentTicketData.skillId.error}
                                    errmsg={this.state.recruitmentTicketData.skillId.errmsg}
                                    mode={"multiple"}
                                />
                            </Grid>

                            <Grid md={1} />
                            <Grid item md={3} sm={5} className="">
                                <Inputantd className="w-100" label="Required No.of.Candidates"
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
                                    <Button size="lg" className="btnmargin btnclr w-100" onClick={() => this.callroot(false)}>Generate Ticket</Button>
                                </Grid>
                                <Grid item className="ml-4" >
                                    <Button size="lg" className="btnclr_outline w-100" onClick={() => this.callroot(true)}>Save as Template</Button>
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
    designation: state.resumeReducer.designations,
    languages: state.recruitment.languages,
    certification: state.recruitment.certification,
    specialization: state.recruitment.specialization,
    licenses: state.recruitment.licenses,
    qualification: state.recruitment.qualification,
    skills: state.resumeReducer.skills,
    templatesName: state.recruitment.templatesName,
    templateData: state.recruitment.templateData,
})

export default connect(mapStateToProps)(RecruitmentTicket);