import React from 'react';
import { Select } from 'antd';
import "./OnlineTestCandidates.css";
import Grid from "@material-ui/core/Grid";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { apiurl } from '../../../App';
import Onlineinstructionlist from './Onlineinstructionlist';


const { Option } = Select;



class OnlineTestCandidates extends React.Component {

    state = {
        candidateList: [],
        templateList: [],
        designationList: [],
        candidateId: null,
        templateId: null,
        designationId: null,
        visible: false,
        questionBank: [],
        showDetails: true
    }


    onlineTestCandidateList = async () => {
        const url = `${apiurl}/onlineTestCandidateList`

        const response = await axios.post(url)

        this.setState({ candidateList: response.data.data })

    }

    templateList = async () => {
        const url = `${apiurl}/onlineTestTemplateList`
        const response = await axios.post(url)
        this.setState({ templateList: response.data.data })
        console.log("sdafkjhsdakjflhasjkdfhs", this.state.templateList)
    }

    designationList = async () => {
        axios({
            method: 'GET',
            url: apiurl + '/listofdesignations',
        }).then((response) => {
            this.setState({ designationList: response.data.data })
        })
    }

    componentWillMount() {
        this.onlineTestCandidateList()
        this.templateList()
        this.designationList()
    }


    handleChange = (data, key) => {

        if (key === "candidate") {
            this.setState({ candidateId: data }, () => this.setState({ candidateError: false }))
        }

        if (key === "template") {
            this.setState({ templateId: data }, () => this.setState({ templateError: false }))
        }
        if (key === "designation") {
            this.setState({ designationId: data }, () => this.setState({ designationError: false }))
        }
    }

    resetForm = () => {
        this.setState({ candidateId: null, templateId: null, designationId: null })
    }

    getCandidateList = () => {

        let candidates = [];
        for (let t = 0; t < this.state.candidateList.length; t++) {

            candidates.push(<Option value={this.state.candidateList[t].resumeId}>{this.state.candidateList[t].FirstName}</Option>)

            console.log("sdfjsdahfkjlhasdfja", candidates)
        }

        return candidates;
    }

    getTemplateList = () => {
        let templates = [];
        for (let i = 0; i < this.state.templateList.length; i++) {
            templates.push(<Option value={this.state.templateList[i].TestTempId}>{this.state.templateList[i].TestTempName}</Option>)
        }

        return templates;
    }

    getDesignationList = () => {
        let designation = [];
        for (let i = 0; i < this.state.designationList.length; i++) {
            designation.push(<Option value={this.state.designationList[i].DesigId}>{this.state.designationList[i].DesigName}</Option>)
        }

        return designation;
    }

    sendDetails = async () => {
        const isValid = this.checkValidation()

        if (isValid) {
            const url = `${apiurl}/getOnlineTestQuestionBasedOnTemplate`
            const payload = { testTemplateId: this.state.templateId }

            const response = await axios.post(url, payload)



            this.setState({ visible: true, questionBank: response.data.data })


        }
    }

    checkValidation = () => {
        let templateError = "";
        let candidateError = "";
        let designationError = "";

        if (this.state.templateId === null) {
            templateError = "Field Required"
        }

        if (this.state.candidateId === null) {
            candidateError = "Field Required"
        }
        if (this.state.designationId === null) {
            designationError = "Field Required"
        }

        if (templateError || candidateError || designationError) {
            this.setState({ templateError, candidateError, designationError })
            return false
        }

        return true
    }

    changeState = () => {
        this.setState({ showDetails: false })
    }
    render() {
        const { candidateId, templateId, designationId } = this.state
        return (
            <React.Fragment>
                {this.state.showDetails && <div className="card  top_move">
                    <div className="card card-body">
                        <div className="online__details">
                            <div className="online__container">
                                <div className='w-100 mr-2'>
                                    <lable>Candidate Name</lable>
                                    <Select style={{ width: '100%', marginTop: '.8rem' }}
                                        onChange={(data) => this.handleChange(data, "candidate")}
                                        value={candidateId}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.getCandidateList()}
                                    </Select>
                                    <div style={{ color: "red", fontSize: "12px" }}>{this.state.candidateError && this.state.candidateError}</div>
                                </div>

                                <div className='w-100 mr-2'>
                                    <lable>Designation</lable>
                                    <Select
                                        style={{ width: '100%', marginTop: '.8rem' }}
                                        onChange={(data) => this.handleChange(data, "designation")}
                                        value={designationId}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {this.getDesignationList()}
                                    </Select>
                                    <div style={{ color: "red", fontSize: "12px" }}>{this.state.designationError && this.state.designationError}</div>
                                </div>

                                <div className="w-100">
                                    <lable>Template Name</lable>
                                    <Select
                                        style={{ width: '100%', marginTop: '.8rem' }}
                                        onChange={(data) => this.handleChange(data, "template")}
                                        value={templateId}
                                        showSearch
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >

                                        {this.getTemplateList()}
                                    </Select>
                                    <div style={{ color: "red", fontSize: "12px" }}>{this.state.templateError && this.state.templateError}</div>

                                </div>
                            </div>
                        </div>


                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="mt-3"
                            spacing={3}
                        >

                            <Grid item >
                                <Button className="btnwidth btnclr_outline" onClick={this.resetForm}>Cancel</Button>
                            </Grid>
                            <Grid item >
                                <Button size="lg" className="btnmargin btnwidth btnclr" onClick={this.sendDetails}>Submit</Button>
                            </Grid>
                        </Grid>
                    </div>

                </div>}

                {this.state.visible && <Onlineinstructionlist
                    dispatch={this.props.dispatch} history={this.props.history} questionBank={this.state.questionBank} candidateId={this.state.candidateId} designationId={this.state.designationId} changeState={this.changeState} />}
            </React.Fragment>
        )
    }
}


export default OnlineTestCandidates;
