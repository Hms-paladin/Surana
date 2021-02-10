import React from "react"
import { Modal, Button, message } from 'antd';
import "./viewmodel.css"
import Grid from '@material-ui/core/Grid'
import axios from 'axios';
import { apiurl } from "../../../../App";


class Modalreact extends React.Component {
    state = { visible: this.props.modalopen };


    showModal = () => {
        this.props.onclickok && this.props.onclickok()
    };

    // handleOk = e => {
    //   console.log(e);
    // this.setState({
    //   visible: false,
    // });
    // };


    handleCancel = e => {
        this.props.onclickok && this.props.onclickok()
    };

    searchCandidates = () => {
        console.log("sadfasdfasdfasdfaad", this.props.Requirementdata)
        axios({
            method: 'POST',
            url: apiurl + '/recruitmentsearch',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                fromage: this.props.Requirementdata.MinAge,
                toage: this.props.Requirementdata.MaxAge,
                qualifyId:this.props.Requirementdata.QualifyId.toString().split(',').map(val => Number(val)),
                // location: 'Chennai',
                minexp: this.props.Requirementdata.MinExp,
                maxexp: this.props.Requirementdata.MaxExp,
            }
        }).then((response) => {
            if (response.data.data.length === 0) {
                message.warning("No Result Found")
            } else {
                this.props.listdata && this.props.listdata(response.data.data)
                this.setState({visible:false})
                this.props.propsFunc && this.props.propsFunc(2)
            }
        }).catch((error) => {
            // alert("Oops")
        })
    }

    render() {
        console.log(this.props.Requirementdata, "Requirementdata")
        const { Requirementdata } = this.props;
        return (
            <div>
                {/* <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button> */}
                <Modal
                    title="VIEW"
                    visible={this.state.visible}
                    onOk={this.props.onclickok}
                    onCancel={this.handleCancel}
                    className={this.props.modelclassName}
                // cancelText= 'No'
                // okText= 'Yes'
                // okType= 'danger'
                >
                    <div className="row">
                        <div className={"textcontainermodel col-lg-6 col-md-12 col-sm-12"}>
                            <div className="">
                                <div className="details">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5 className="details-tag">For Designation:</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label className="details_ticket">{Requirementdata.Forthepost !== null ? Requirementdata.Forthepost : '-'}</label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <h5 className="details-tag">Template:</h5>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label className="details_ticket">{Requirementdata.TemplateName}</label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label><span className="details-tag">Age:</span></label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label className="details_ticket">{Requirementdata.MinAge}-{Requirementdata.MaxAge}</label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label><span className="details-tag">Gender:</span></label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label className="details_ticket">{Requirementdata.Gender}</label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label><span className="details-tag">Licenses:</span></label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div>
                                                <label className="details_ticket">
                                                    {
                                                        Requirementdata.licence.length > 0 && Requirementdata.licence.map((val, index) => {
                                                            return (
                                                                val !== null ? Requirementdata.licence.length !== index + 1 ? val.LiceName + "," : val.LiceName : '-'
                                                            )
                                                        })
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div><label><span className="details-tag">Certifications:</span></label></div>
                                        </div>
                                        <div className="col-md-6">
                                            <div>
                                                <label className="details_ticket">
                                                    {
                                                        Requirementdata.certification.map((val, index) => {
                                                            return (
                                                                val !== null ? Requirementdata.certification.length !== index + 1 ? val.CertName + "," : val.CertName : ''
                                                            )
                                                        })
                                                    }
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="details">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5 className="details-tag">Requestor Name:</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label className="details_ticket">{Requirementdata.Requestorname !== null ? Requirementdata.Requestorname : '-'}</label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Qualifications:</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label className="details_ticket">{Requirementdata.Qualifyname}</label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Experience:</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label className="details_ticket">{Requirementdata.MinExp}-{Requirementdata.MaxExp}</label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Languages:</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <label className="details_ticket">
                                                {
                                                    Requirementdata.language.map((val, index) => {
                                                        return (
                                                            Requirementdata.language.length !== index + 1 ? val.LangName + "," : val.LangName
                                                        )
                                                    })
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Skill Set:</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div>
                                            <label className="details_ticket">
                                                {
                                                    Requirementdata.skill.map((val, index) => {
                                                        return (
                                                            Requirementdata.skill.length !== index + 1 ? val.Skillname + "," : val.Skillname
                                                        )
                                                    })
                                                }
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Search In :</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label className="details_ticket">{Requirementdata.SearchIn}</label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label><span className="details-tag">Required No of Candidates:</span></label></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div><label className="details_ticket">{Requirementdata.NoOfCandidates}</label></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Grid container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className="gridbtnalign display_block"
                            spacing={3}>
                            <Grid item >
                                <Button size="lg" className="btnmargin btnwidth btnclr" onClick={() => this.searchCandidates()}>Search</Button>
                            </Grid>

                        </Grid>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default Modalreact;




