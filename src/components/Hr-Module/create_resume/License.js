import React from 'react';
import Grid from '@material-ui/core/Grid'
import Button from 'react-bootstrap/Button';
import Inputantd from '../../../formcomponent/inputantd';
import Inputnumber from '../../../formcomponent/inputnumberantd';
import './Createresume.css';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ValidationLibrary from '../../../validationlibrary/validation';
import { addlicenseDetails, resumeTab, licenseTab, updatelicenseDetails, updateLicenseDetails, deleteLicenseApi } from './action/CreateResumeAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux'


class License extends React.Component {
    state = {
        editLicenseId: undefined,
        localEditId: null,
        localEdit: false,
        count: -1,
        licenseDetails: [],
        license: [],
        licenseData:
        {
            'license': {
                'value': '',
                validation: [{ 'name': '' }],
                error: null,
                errmsg: null
            },
            'licenseNumber': {
                'value': '',
                validation: [{ 'name': 'alphaNumaricOnly' }],
                error: null,
                errmsg: null
            }
        },
    }

    componentDidMount() {
        if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].license.length > 0) {
            this.props.resumeEditData[0].license.map((val) => {
                return (
                    this.state.license.push({
                        "license": val.LiceName,
                        "licenseNumber": val.LiceNumber,
                        "LicId": val.LicId,
                        "resId": val.ResId
                    })
                )
            })
            this.setState({})
        }
    }


    changeDynamic = (data, key) => {
        console.log("key", key);
        console.log("data", data);
        var licenseData = this.state.licenseData;
        var targetkeys = Object.keys(licenseData);
        var errorcheck = ValidationLibrary.checkValidation(data, licenseData[key].validation);
        licenseData[key].value = data;
        licenseData[key].error = !errorcheck.state;
        licenseData[key].errmsg = errorcheck.msg;
        this.setState({ licenseData });
        var filtererr = targetkeys.filter((obj) =>
            licenseData[obj].error == true || licenseData[obj].error == null);
        if (filtererr.length > 0) {
            this.setState({
                error: true,
                errordummy: false
            })
        } else {
            this.setState({ error: false })
        }
    }

    deleteLicense = (indexval, deleteId) => {
        if (deleteId !== undefined) {
            this.props.dispatch(deleteLicenseApi(deleteId))
        }
        var license = this.state.license.filter((val, index) => index !== indexval)
        // this.state.license.splice(this.state.license.indexOf(index), 1);
        this.setState({ license })
    }

    editLicense = (id, editLicenseId) => {
        this.setState({ localEditId: id, editLicenseId, localEdit: true })
        var editData = this.state.license.find((val, index) => index === id)
        this.state.licenseData.license.value = editData.license;
        this.state.licenseData.licenseNumber.value = editData.licenseNumber;
    }

    saveLicense = () => {
        if (this.state.localEdit === true) {
            var item = {
                "license": this.state.licenseData.license.value,
                "licenseNumber": this.state.licenseData.licenseNumber.value,
            }
            if (this.state.editLicenseId !== undefined) {
                item.LicId = this.state.editLicenseId
            }

            this.state.license[this.state.localEditId] = item;
            this.state.licenseData.license.value = "";
            this.state.licenseData.licenseNumber.value = "";
            this.setState({ localEdit: false, localEditId: null, editLicenseId: undefined })

        } else {
            var license = this.state.licenseData.license.value;
            var licenseNumber = this.state.licenseData.licenseNumber.value;
            if (license !== "" && licenseNumber !== "") {
                this.state.license.push({ license, licenseNumber, resqualifyId: this.props.resumeId, resId: this.props.resumeId });
                console.log(this.state.license, "mylicense");
                this.state.licenseData.license.value = "";
                this.state.licenseData.licenseNumber.value = "";
                this.setState({})
            }
        }

    }

    sendDataApi = () => {
        if (this.state.license.length > 0) {
            if (this.props.resumeEditData && this.props.resumeEditData.length > 0 && this.props.resumeEditData[0].license.length > 0) {
                //Update Api
                var licenseUpdateData = []
                this.state.license.map((val) => {
                    return (
                        licenseUpdateData.push({
                            "isedit": val.LicId === undefined ? false : true,
                            "LicId": val.LicId === undefined ? 0 : val.LicId,
                            "license": val.license,
                            "licenseNumber": val.licenseNumber,
                            "resqualifyId": this.props.resumeEditData[0].ResId,
                            "resId": this.props.resumeEditData[0].ResId,

                        })
                    )
                })
                this.props.dispatch(updateLicenseDetails(licenseUpdateData, 5, this.props.propFunc, this.props.resumeEditData[0].ResId))
            } else {
                //Insert Api
                var licenseInsertData = []
                this.state.license.map((val) => {
                    return (
                        licenseInsertData.push({
                            "license": val.license,
                            "licenseNumber": val.licenseNumber,
                            "resqualifyId":this.props.resumeId,
                            "resId":this.props.resumeId
                        })
                    )
                })
                this.props.dispatch(addlicenseDetails(licenseInsertData, 5, this.props.propFunc, this.props.resumeId))
            }
        } else {
            this.props.propFunc(5)
        }

    }



    render() {
        console.log(this.state, 'fasfasdkfhaskjfhakdfh')
        return (
            <React.Fragment>
                <div className="card top_move">
                    <div className="card-body">
                        <div className="newExp_border">
                            <div className="newExp_heading">
                                License
                            </div>
                            <Grid container spacing={1} className="mt-2">
                                <Grid item md={4} sm={5}>
                                    <Inputantd
                                        label="License Name"
                                        className="w-100"
                                        changeData={(data) => this.changeDynamic(data, 'license')}
                                        value={this.state.licenseData.license && this.state.licenseData.license.value}
                                        error={this.state.licenseData.license && this.state.licenseData.license.error}
                                        errmsg={this.state.licenseData.license && this.state.licenseData.license.errmsg}
                                    />
                                </Grid>
                                <Grid item md={4} sm={5}>
                                    <Inputantd
                                        label="License Number"
                                        className="w-100"
                                        changeData={(data) => this.changeDynamic(data, 'licenseNumber')}
                                        value={this.state.licenseData.licenseNumber && this.state.licenseData.licenseNumber.value}
                                        error={this.state.licenseData.licenseNumber && this.state.licenseData.licenseNumber.error}
                                        errmsg={this.state.licenseData.licenseNumber && this.state.licenseData.licenseNumber.errmsg}
                                    />
                                </Grid>
                                <Grid item md={1} sm={1}>
                                    <AddCircleOutlineIcon className="addIconLicense" onClick={() => this.saveLicense()} />
                                </Grid>
                            </Grid>

                            {
                                this.state.license.length > 0 &&
                                <div className='card licence_card-arrange'>
                                    <div className='card-body'>
                                        {
                                            this.state.license.map((val, index) => {
                                                return (
                                                    <div className='license_box_values'>
                                                        <p style={{width:'250px'}}>{val.license}</p>
                                                        <p>{val.licenseNumber}</p>
                                                        <div>
                                                            <DeleteIcon className="license_icons" onClick={() => this.deleteLicense(index, val.LicId)} />
                                                            <EditIcon className="license_icons" onClick={() => this.editLicense(index, val.LicId)} /> 
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            }
                            <Grid container className="check-css-profile"
                                direction="row"
                                justify="center"
                                alignItems="center"
                                className="mt-3"
                                spacing={3}>
                                <Grid item >
                                    <Button className="btnwidth btnclr" onClick={() => this.props.propFunc(3)}>Prev</Button>
                                </Grid>
                                <Grid item >
                                    <Button className="btnwidth btnclr" onClick={() => this.sendDataApi()}>
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
    resumeEditData: state.resumeReducer.resume,
    resumeId: state.resumeReducer.resumeId,
})

export default connect(mapStateToProps)(License);