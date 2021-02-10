
import React from 'react';
import tableschema from "./CandidateTestList.json";
import { apiurl } from '../../../App';
import CandidatesTestTable from "./candidatesTestTable/DynTable";
import dateformat from 'dateformat';
import CalendarRagePicker from '../../../formcomponent/calendarRangePicker.js';
import moment from 'moment';
import './AddQuestion.css';
import MyVerticallyCenteredModal from '../create_resume/Sendemail.js';
import SMSsend from '../create_resume/Sendsms.js';

const axios = require('axios');

class CandidateTestList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(new Date(), "yyyy-mm-dd"),
            endDate: moment(new Date(), "yyyy-mm-dd"),
            userdata: null,
            edituserdata: null,
            modalvisible: false,
            usertabledata: [],
            edit: null,
            modalShow: false,
            modalShowsms: false,
            search: null,
            openDateRange: false,

        };
    }

    componentWillMount() {
        this.getTableData()
    }

    dayReport = (data, firstOpen) => {
        console.log(data, "itemdaterange")
        this.setState({
            startDate: data[0],
            endDate: data[1]
        }, () => this.getTableData())
    }

    getTableData = () => {
        var self = this
        axios({
            method: 'POST',
            url: apiurl + "/scoreprecentage",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                "From_date": dateformat(this.state.startDate, 'yyyy-mm-dd'),
                "To_date": dateformat(this.state.endDate, 'yyyy-mm-dd')
            }
        })
            .then(function (response) {
                console.log(response.data.data, "resdata")
                var usertabledata = []
                response.data.data.map((val, index) => {
                    usertabledata.push({ CandidateName: val.Candidatelist_Designation, score: val.Scorepercentage, id: val.ResId })
                })
                self.setState({ usertabledata: usertabledata })
            })
            .catch(function (error) {
                console.log(error, "error");
            });
    }
    checkData = (e) => {
        console.log(e, 'adfcjhkasdfj')
    }

    render() {
        const { usertabledata } = this.state;
        return (
            <>
                <div className=" cand_tablemain">
                    <div className="table_x_scroll">
                        <div style={{ display: 'flex', float: 'right', marginTop: '23px', marginRight: '10px' }}>
                            <CalendarRagePicker
                                changeData={(e) => this.dayReport(e)}
                                value={[this.state.startDate, this.state.endDate]}
                            />
                        </div>
                        <CandidatesTestTable
                            editData={(data) => this.editData(data)}
                            deleteData={(data) => this.deleteData(data)}
                            tabledata={usertabledata}
                            primaryKey="userId"
                            tableschema={tableschema.fields}
                            multideleteData={(data) => this.multideleteData(data)}
                            editclose={"editicon"}
                            mainclassName={"userwidth"}
                            tablehead={"Online Test List"}
                        />
                        {/* <MyVerticallyCenteredModal
                            show={this.state.modalShow}
                            onHide={() => this.setModalShow(false)}
                        />
                        <SMSsend
                            show={this.state.modalShowsms}
                            onHide={() => this.setModalShowsms(false)}
                        /> */}
                    </div>
                </div>
            </>
        )
    }
}
export default CandidateTestList;
